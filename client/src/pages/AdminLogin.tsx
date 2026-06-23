/**
 * Admin Login Page
 * Password-protected access to admin dashboard
 */

import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const { login } = useAdmin();
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (login(password)) {
      toast.success("Logged in successfully!");
      setLocation("/admin/dashboard");
    } else {
      toast.error("Invalid password");
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-12">
      <div className="container max-w-md">
        <Card className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-heading font-bold text-center mb-2">
            Admin Access
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            Manage Campus Marketplace listings
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-base font-medium mb-2 block">
                Admin Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full"
                autoFocus
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Logging in..." : "Access Dashboard"}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Only authorized administrators can access this page.
          </p>
        </Card>
      </div>
    </main>
  );
}
