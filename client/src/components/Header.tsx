/**
 * Header Component
 * Design: Modern Professional Trust
 * - Sticky header with owner branding prominently displayed
 * - Trust ribbon banner at top
 * - Logo and navigation
 */

import { Link } from "wouter";

export default function Header() {
  return (
    <>
      {/* Trust Ribbon Banner */}
      <div className="w-full bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-medium">
        <span>✓ Managed & Secured by ANDROUS ALBERTO AKILE | Support: +250796388207</span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 w-full bg-background border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          {/* Logo & Branding */}
          <Link href="/">
            <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/logo-shield-VrQqusW54kzPTJLiThaZMz.webp"
                alt="Campus Marketplace"
                className="w-10 h-10"
              />
              <div>
                <h1 className="text-xl font-bold text-primary">CAMPUS MARKETPLACE</h1>
                <p className="text-xs text-muted-foreground">Trusted by Students</p>
              </div>
            </a>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link href="/">
              <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Browse
              </a>
            </Link>
            <Link href="/post-item">
              <a className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-all transform active:scale-95">
                Post an Item
              </a>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
