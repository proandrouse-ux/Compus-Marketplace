/**
 * Home Page
 * Design: Modern Professional Trust
 * - Hero banner with marketplace overview
 * - Category filter buttons
 * - Product grid with listings
 */

import { useState } from "react";
import { type Listing } from "@/lib/listings";
import { useAdmin } from "@/contexts/AdminContext";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Laptop, Smartphone, Home as HomeIcon, BookOpen } from "lucide-react";

type Category = "Laptops" | "Smartphones" | "Houses" | "Books" | "All";

const categories: { name: Category; icon: React.ReactNode; label: string }[] = [
  { name: "All", icon: null, label: "All Items" },
  { name: "Laptops", icon: <Laptop className="w-5 h-5" />, label: "Laptops" },
  { name: "Smartphones", icon: <Smartphone className="w-5 h-5" />, label: "Smartphones" },
  { name: "Houses", icon: <HomeIcon className="w-5 h-5" />, label: "Accommodation" },
  { name: "Books", icon: <BookOpen className="w-5 h-5" />, label: "Books" },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const { approvedListings } = useAdmin();

  const filteredListings: Listing[] =
    selectedCategory === "All"
      ? approvedListings
      : approvedListings.filter((item) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative w-full h-64 sm:h-80 overflow-hidden">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/hero-banner-MJU3cqGrMFxLZ5WtARSJ6H.webp"
          alt="Campus Marketplace Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
              Find Everything You Need
            </h1>
            <p className="text-lg text-white/90 max-w-md">
              Buy and sell laptops, smartphones, accommodation, and books. All verified and secured.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container py-8">
        <h2 className="text-2xl font-heading font-bold mb-6">Browse by Category</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              variant={selectedCategory === cat.name ? "default" : "outline"}
              className={`flex items-center gap-2 transition-all ${
                selectedCategory === cat.name
                  ? "bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              }`}
              asChild={false}
            >
              {cat.icon}
              {cat.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Listings Grid */}
      <section className="container py-12">
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <ProductCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No listings found in this category.</p>
          </div>
        )}
      </section>

      {/* Trust Section */}
      <section className="bg-secondary py-12 mt-12">
        <div className="container text-center">
          <h2 className="text-2xl font-heading font-bold mb-4">Why Trust Campus Marketplace?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-3">✓</div>
              <h3 className="font-semibold mb-2">Verified Listings</h3>
              <p className="text-sm text-muted-foreground">
                Every item is verified and processed under the personal oversight of Androus Alberto Akile.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-semibold mb-2">Secure Platform</h3>
              <p className="text-sm text-muted-foreground">
                Direct WhatsApp communication ensures transparent and secure transactions.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">📱</div>
              <h3 className="font-semibold mb-2">Easy to Use</h3>
              <p className="text-sm text-muted-foreground">
                Browse, filter, and contact sellers instantly. Post your items in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
