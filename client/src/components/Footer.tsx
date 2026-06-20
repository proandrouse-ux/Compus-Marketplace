/**
 * Footer Component
 * Design: Modern Professional Trust
 * - Reinforces owner branding and trust messaging
 * - Contact information prominently displayed
 */

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-lg font-bold mb-2">Campus Marketplace</h3>
            <p className="text-sm opacity-90">
              The trusted platform for students to buy and sell laptops, smartphones, accommodation, and books.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li><a href="/" className="hover:opacity-100 transition-opacity">Browse Listings</a></li>
              <li><a href="/post-item" className="hover:opacity-100 transition-opacity">Post an Item</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">How It Works</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Contact & Support</h4>
            <p className="text-sm opacity-90 mb-2">
              <strong>Platform Administrator:</strong><br />
              ANDROUS ALBERTO AKILE
            </p>
            <p className="text-sm opacity-90 font-medium">
              📱 +250796388207
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-center text-sm opacity-75">
            © 2026 Campus Marketplace. Managed & Secured by ANDROUS ALBERTO AKILE | Support: +250796388207
          </p>
        </div>
      </div>
    </footer>
  );
}
