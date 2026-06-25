/**
 * ProductCard Component
 * Design: Modern Professional Trust
 * - Displays product with verification badge
 * - Shows price in RWF
 * - Contact seller button with WhatsApp integration
 */

import { Listing } from "@/lib/listings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface ProductCardProps {
  listing: Listing;
  onClick: () => void;
}

export default function ProductCard({ listing, onClick }: ProductCardProps) {
  return (
    <div className="group bg-card text-card-foreground rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:scale-105 transform" onClick={onClick}>
      {/* Image Container */}
      <div className="relative overflow-hidden bg-secondary h-48 sm:h-56">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Verification Badge */}
        {listing.verified && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-full flex items-center gap-1 text-xs font-semibold shadow-md">
            <CheckCircle2 className="w-3 h-3" />
            Verified
          </div>
        )}

        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-primary text-primary-foreground">
            {listing.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col h-full">
        <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {listing.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-grow">
          {listing.description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-teal-700">
            FRw{listing.price.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">Click to view details</p>
        </div>

        {/* View Details Hint */}
        <p className="text-xs text-center text-muted-foreground font-medium py-2 bg-secondary/50 rounded">
          Tap to view full details
        </p>
      </div>
    </div>
  );
}
