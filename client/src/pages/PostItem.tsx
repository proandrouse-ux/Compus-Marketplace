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
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  title: string;
  category: string;
  price: string;
  description: string;
  sellerContact: string;
  image: string | null;
}

export default function PostItem() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.price || !formData.description || !formData.sellerContact) {
      toast.error("Please fill in all fields");
      return;
    }

    setShowCheckout(true);
  };

  const handleCompleteViaWhatsApp = () => {
    const whatsappMessage = `Hello ANDROUS ALBERTO AKILE, I have transferred 500 RWF for my listing. Here are the details:
- Title: ${formData.title}
- Category: ${formData.category}
- Price: ${formData.price} RWF
- Description: ${formData.description}
- My Contact: ${formData.sellerContact}
(Note: Please attach your product picture directly to this message before hitting send!)`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/250796388207?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    setShowCheckout(false);
    toast.success("Opening WhatsApp. Please complete the submission there.");
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

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-6">
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
              className="w-full"
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="text-base font-medium mb-2 block">
              Category
            </Label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full">
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
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-medium py-3 hover:bg-opacity-90 transition-all transform active:scale-95"
          >
            Continue to Checkout
          </Button>
        </form>
      </div>

      {/* Checkout Modal */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Listing</DialogTitle>
            <DialogDescription>
              Verify your listing with a 500 RWF payment
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Listing Summary */}
            <div className="bg-secondary rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Title:</span>
                <span className="font-medium">{formData.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium">{formData.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-medium">{formData.price} RWF</span>
              </div>
              <div className="border-t border-border pt-2 mt-2 flex justify-between text-sm font-semibold">
                <span>Verification Fee:</span>
                <span className="text-primary">500 RWF</span>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="bg-accent/10 border border-accent rounded-lg p-4 text-sm">
              <p className="font-semibold text-accent-foreground mb-2">Payment Instructions:</p>
              <p className="text-accent-foreground/90 mb-3">
                To make your listing live with its product image, please transfer a <strong>500 RWF verification fee</strong> via Mobile Money (MoMo) to the Platform Administrator:
              </p>
              <div className="bg-white rounded p-2 text-center font-bold text-primary mb-3">
                ANDROUS ALBERTO AKILE<br />
                +250796388207
              </div>
              <p className="text-accent-foreground/90 text-xs">
                After completing the transaction, click below to finalize your submission.
              </p>
            </div>

            {/* WhatsApp Button */}
            <Button
              onClick={handleCompleteViaWhatsApp}
              className="w-full bg-green-600 text-white hover:bg-green-700 font-medium py-3 transition-all transform active:scale-95"
            >
              Complete Submission via WhatsApp
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              You'll be redirected to WhatsApp. Please attach your product picture before sending.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
