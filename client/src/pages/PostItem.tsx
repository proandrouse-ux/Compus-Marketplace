/**
 * Post Item Page
 * Design: Modern Professional Trust
 * - Form to submit new listings
 * - Image upload with preview
 * - Checkout modal with WhatsApp integration
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, X, CheckCircle, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useAdmin } from "@/contexts/AdminContext";
import { Card } from "@/components/ui/card";

interface FormData {
  title: string;
  category: string;
  price: string;
  description: string;
  sellerContact: string;
  image: string | null;
}

export default function PostItem() {
  const { addListing } = useAdmin();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    price: "",
    description: "",
    sellerContact: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setImagePreview(base64);
        setFormData((prev) => ({ ...prev, image: base64 }));
        toast.success("Image uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.price || !formData.description || !formData.sellerContact) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    // Create listing with pending approval
    const newListing = {
      id: `listing-${Date.now()}`,
      title: formData.title,
      category: formData.category as any,
      price: parseInt(formData.price),
      description: formData.description,
      sellerContact: formData.sellerContact,
      image: formData.image || "https://via.placeholder.com/400?text=No+Image",
      verified: true,
      approved: false, // New listings start as pending
      submittedAt: Date.now(),
    };

    addListing(newListing);
    setLoading(false);

    setShowCheckout(true);
  };

  const handleCompleteViaWhatsApp = () => {
    const message = `Hello! I just submitted a listing on Campus Marketplace: "${formData.title}" for ${formData.price} RWF. Please confirm receipt and let me know the next steps for verification.`;
    const whatsappUrl = `https://wa.me/250796388207?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setShowCheckout(false);
    toast.success("Your listing has been submitted for approval!");
    
    // Reset form
    setFormData({
      title: "",
      category: "",
      price: "",
      description: "",
      sellerContact: "",
      image: null,
    });
    setImagePreview(null);
  };

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">Post an Item</h1>
          <p className="text-muted-foreground">
            List your product on Campus Marketplace. It's quick, easy, and secure.
          </p>
        </div>

        <Card className="p-8 border-2 border-primary/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Item Title */}
            <div>
              <Label htmlFor="title" className="text-base font-medium mb-2 block">
                Item Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Dell XPS 13 Laptop"
                value={formData.title}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full"
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category" className="text-base font-medium mb-2 block">
                Category
              </Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger disabled={loading}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Laptops">Laptops</SelectItem>
                  <SelectItem value="Smartphones">Smartphones</SelectItem>
                  <SelectItem value="Houses">Student Accommodation</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price" className="text-base font-medium mb-2 block">
                Price (RWF)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="e.g., 500000"
                value={formData.price}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-base font-medium mb-2 block">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your item in detail. Condition, features, etc."
                value={formData.description}
                onChange={handleInputChange}
                disabled={loading}
                rows={4}
                className="w-full"
              />
            </div>

            {/* Seller Contact */}
            <div>
              <Label htmlFor="sellerContact" className="text-base font-medium mb-2 block">
                Your Contact Number
              </Label>
              <Input
                id="sellerContact"
                name="sellerContact"
                placeholder="e.g., +250788123456"
                value={formData.sellerContact}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full"
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label className="text-base font-medium mb-2 block">Product Image</Label>
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg border border-border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={loading}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-full hover:bg-opacity-90 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center w-full h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload image</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={loading}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-medium py-3 hover:bg-opacity-90 transition-all transform active:scale-95"
            >
              {loading ? "Submitting..." : "Continue to Checkout"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              ✓ Your listing will be reviewed and approved by our admin team
            </p>
          </form>
        </Card>
      </div>

      {/* Checkout Modal */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent" />
              Listing Submitted for Review
            </DialogTitle>
            <DialogDescription>
              Your item has been submitted and is pending admin approval
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 space-y-2">
              <p className="font-medium text-sm">What happens next?</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ Admin reviews your listing</li>
                <li>✓ Listing appears on homepage once approved</li>
                <li>✓ Buyers can contact you via WhatsApp</li>
              </ul>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm font-medium mb-2">Verification Fee</p>
              <p className="text-2xl font-bold text-primary">500 RWF</p>
              <p className="text-xs text-muted-foreground mt-1">
                One-time fee to verify your listing
              </p>
            </div>

            <Button
              onClick={handleCompleteViaWhatsApp}
              className="w-full bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Pay via WhatsApp
            </Button>

            <Button
              onClick={() => setShowCheckout(false)}
              variant="outline"
              className="w-full"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
