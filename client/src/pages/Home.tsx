/**
 * Home Page
 * Design: Modern Professional Trust
 * - Hero banner with marketplace overview
 * - Full-text search bar
 * - Category filter buttons
 * - Product grid with clickable listings
 * - Product detail modal
 */

import { useState } from "react";
import { type Listing } from "@/lib/listings";
import { useAdmin } from "@/contexts/AdminContext";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Laptop, Smartphone, Home as HomeIcon, BookOpen, Search, X } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Listing | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const { approvedListings } = useAdmin();

  // Filter by category
  let filteredListings: Listing[] =
    selectedCategory === "All"
      ? approvedListings
      : approvedListings.filter((item) => item.category === selectedCategory);

  // Filter by search query (full-text search)
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredListings = filteredListings.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }

  const handleProductClick = (product: Listing) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

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

      {/* Search Bar */}
      <section className="container py-8 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by title, category, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 py-3 text-base"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-sm text-muted-foreground mt-2">
            Found {filteredListings.length} result{filteredListings.length !== 1 ? "s" : ""} for "{searchQuery}"
          </p>
        )}
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
              <ProductCard
                key={listing.id}
                listing={listing}
                onClick={() => handleProductClick(listing)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              {searchQuery
                ? `No listings found matching "${searchQuery}"`
                : "No listings found in this category."}
            </p>
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
                All items are reviewed and verified by our admin team
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-semibold mb-2">Secure Transactions</h3>
              <p className="text-sm text-muted-foreground">
                Direct WhatsApp contact with verified sellers
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-semibold mb-2">Student Community</h3>
              <p className="text-sm text-muted-foreground">
                Built by students, for students on campus
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductDetail
        product={selectedProduct}
        open={showDetail}
        onOpenChange={setShowDetail}
      />
    </main>
  );
}
