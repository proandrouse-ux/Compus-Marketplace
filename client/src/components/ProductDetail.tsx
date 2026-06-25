/**
 * ProductDetail Modal Component
 * Design: Modern Professional Trust - Displays full product information in a modal
 */

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { Listing } from "@/lib/listings";

interface ProductDetailProps {
  product: Listing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductDetail({
  product,
  open,
  onOpenChange,
}: ProductDetailProps) {
  if (!product) return null;

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in your "${product.title}" listed for FRw${product.price.toLocaleString()}. Can we discuss?`;
    const whatsappUrl = `https://wa.me/${product.sellerContact.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Image */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge className="bg-teal-600">{product.category}</Badge>
              {product.verified && (
                <Badge className="bg-amber-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </Badge>
              )}
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-lg">
            <p className="text-gray-600 text-sm mb-2">Price</p>
            <p className="text-4xl font-bold text-teal-700">
              FRw{product.price.toLocaleString()}
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Seller Information */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4">Seller Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div>
                <p className="text-gray-600 text-sm">Contact</p>
                <p className="font-mono text-lg text-teal-700">{product.sellerContact}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Managed by</p>
                <p className="font-semibold text-gray-900">ANDROUS ALBERTO AKILE</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleWhatsApp}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Contact on WhatsApp
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
