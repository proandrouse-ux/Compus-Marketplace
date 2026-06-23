/**
 * Admin Dashboard
 * Manage marketplace listings with approval system
 */

import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Check,
  X,
  Plus,
  Trash2,
  LogOut,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useLocation } from "wouter";

export default function AdminDashboard() {
  const { isAuthenticated, logout, listings, pendingListings, approvedListings, approveListing, rejectListing, addListing, deleteListing } = useAdmin();
  const [, setLocation] = useLocation();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Laptops",
    price: "",
    description: "",
    sellerContact: "",
  });

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <X className="w-12 h-12 mx-auto text-destructive mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You need to be logged in to access this page.
          </p>
          <Button onClick={() => setLocation("/admin/login")}>
            Go to Login
          </Button>
        </Card>
      </main>
    );
  }

  const handleAddListing = () => {
    if (!formData.title || !formData.category || !formData.price || !formData.description || !formData.sellerContact) {
      toast.error("Please fill in all fields");
      return;
    }

    const newListing = {
      id: `listing-${Date.now()}`,
      title: formData.title,
      category: formData.category as any,
      price: parseInt(formData.price),
      description: formData.description,
      sellerContact: formData.sellerContact,
      image: "https://via.placeholder.com/400?text=Listing",
      verified: true,
      approved: true,
      submittedAt: Date.now(),
    };

    addListing(newListing);
    toast.success("Listing added successfully!");
    setFormData({
      title: "",
      category: "Laptops",
      price: "",
      description: "",
      sellerContact: "",
    });
    setShowAddForm(false);
  };

  const handleLogout = () => {
    logout();
    setLocation("/");
    toast.success("Logged out successfully");
  };

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage marketplace listings and approvals</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Listings</p>
                <p className="text-3xl font-bold">{listings.length}</p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-primary/20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Pending Approval</p>
                <p className="text-3xl font-bold text-accent">{pendingListings.length}</p>
              </div>
              <Clock className="w-10 h-10 text-accent/20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Approved</p>
                <p className="text-3xl font-bold text-green-600">{approvedListings.length}</p>
              </div>
              <Check className="w-10 h-10 text-green-600/20" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Pending ({pendingListings.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              Approved ({approvedListings.length})
            </TabsTrigger>
          </TabsList>

          {/* Pending Listings Tab */}
          <TabsContent value="pending" className="space-y-4">
            {pendingListings.length === 0 ? (
              <Card className="p-8 text-center">
                <Clock className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">No pending listings</p>
              </Card>
            ) : (
              pendingListings.map((listing) => (
                <Card key={listing.id} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Title</p>
                      <p className="font-medium">{listing.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Category</p>
                      <p className="font-medium">{listing.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Price</p>
                      <p className="font-medium">{listing.price.toLocaleString()} RWF</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Contact</p>
                      <p className="font-medium text-sm">{listing.sellerContact}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{listing.description}</p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => approveListing(listing.id)}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-4 h-4" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => rejectListing(listing.id)}
                      variant="destructive"
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Approved Listings Tab */}
          <TabsContent value="approved" className="space-y-4">
            {approvedListings.length === 0 ? (
              <Card className="p-8 text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">No approved listings</p>
              </Card>
            ) : (
              approvedListings.map((listing) => (
                <Card key={listing.id} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Title</p>
                      <p className="font-medium">{listing.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Category</p>
                      <p className="font-medium">{listing.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Price</p>
                      <p className="font-medium">{listing.price.toLocaleString()} RWF</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Contact</p>
                      <p className="font-medium text-sm">{listing.sellerContact}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{listing.description}</p>
                  <Button
                    onClick={() => {
                      deleteListing(listing.id);
                      toast.success("Listing deleted");
                    }}
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Add Listing Button */}
        <div className="fixed bottom-8 right-8">
          <Button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 shadow-lg"
            size="lg"
          >
            <Plus className="w-5 h-5" />
            Add Listing
          </Button>
        </div>

        {/* Add Listing Dialog */}
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Listing</DialogTitle>
              <DialogDescription>
                Create a new marketplace listing
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="add-title" className="text-sm">Title</Label>
                <Input
                  id="add-title"
                  placeholder="Item title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="add-category" className="text-sm">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laptops">Laptops</SelectItem>
                    <SelectItem value="Smartphones">Smartphones</SelectItem>
                    <SelectItem value="Houses">Accommodation</SelectItem>
                    <SelectItem value="Books">Books</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="add-price" className="text-sm">Price (RWF)</Label>
                <Input
                  id="add-price"
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="add-description" className="text-sm">Description</Label>
                <Textarea
                  id="add-description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="add-contact" className="text-sm">Contact</Label>
                <Input
                  id="add-contact"
                  placeholder="Phone number"
                  value={formData.sellerContact}
                  onChange={(e) =>
                    setFormData({ ...formData, sellerContact: e.target.value })
                  }
                />
              </div>

              <Button
                onClick={handleAddListing}
                className="w-full"
              >
                Add Listing
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
