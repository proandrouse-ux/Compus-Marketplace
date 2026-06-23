/**
 * Admin Context
 * Manages admin authentication state and listing management with approval system
 */

import { createContext, useContext, useState, useEffect } from "react";
import { Listing, listings as defaultListings } from "@/lib/listings";

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  listings: Listing[];
  pendingListings: Listing[];
  approvedListings: Listing[];
  addListing: (listing: Listing) => void;
  updateListing: (id: string, listing: Listing) => void;
  deleteListing: (id: string) => void;
  approveListing: (id: string) => void;
  rejectListing: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PASSWORD = "admin123"; // Change this to your desired password
const STORAGE_KEY = "campus_marketplace_listings";

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);

  // Load listings from localStorage on mount
  useEffect(() => {
    const savedListings = localStorage.getItem(STORAGE_KEY);
    if (savedListings) {
      try {
        setListings(JSON.parse(savedListings));
      } catch (error) {
        console.error("Failed to load listings from localStorage:", error);
      }
    } else {
      // Initialize with default listings
      setListings(defaultListings);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultListings));
    }

    // Check if already authenticated (from sessionStorage)
    const authToken = sessionStorage.getItem("admin_authenticated");
    if (authToken === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Save listings to localStorage whenever they change
  useEffect(() => {
    if (listings.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
    }
  }, [listings]);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
  };

  const addListing = (listing: Listing) => {
    // New listings are created as pending (not approved)
    const newListing = { ...listing, approved: false, submittedAt: Date.now() };
    setListings((prev) => [...prev, newListing]);
  };

  const updateListing = (id: string, updatedListing: Listing) => {
    setListings((prev) =>
      prev.map((item) => (item.id === id ? updatedListing : item))
    );
  };

  const deleteListing = (id: string) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  const approveListing = (id: string) => {
    setListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, approved: true } : item))
    );
  };

  const rejectListing = (id: string) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  const pendingListings = listings.filter((item) => !item.approved);
  const approvedListings = listings.filter((item) => item.approved);

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        listings,
        pendingListings,
        approvedListings,
        addListing,
        updateListing,
        deleteListing,
        approveListing,
        rejectListing,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
