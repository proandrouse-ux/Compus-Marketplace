/**
 * Mock marketplace listings data
 * Design: Modern Professional Trust - Clean, trustworthy product cards with verification badges
 */

export interface Listing {
  id: string;
  title: string;
  category: "Laptops" | "Smartphones" | "Houses" | "Books";
  price: number;
  description: string;
  sellerContact: string;
  image: string;
  verified: boolean;
  approved: boolean; // Admin approval status
  submittedAt?: number; // Timestamp when submitted
}

export const listings: Listing[] = [
  // Laptops
  {
    id: "laptop-1",
    title: "Dell XPS 13 - Like New",
    category: "Laptops",
    price: 800000,
    description: "Excellent condition, minimal use. Perfect for students. Intel i7, 16GB RAM, 512GB SSD.",
    sellerContact: "+250788123456",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/laptop-dell-xps-86cANUTrv4JVzH8fe2B233.webp",
    verified: true,
    approved: true,
  },
  {
    id: "laptop-2",
    title: "MacBook Air M1 2021",
    category: "Laptops",
    price: 1200000,
    description: "Pristine condition, original box and charger included. 8GB RAM, 256GB SSD.",
    sellerContact: "+250789654321",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/laptop-macbook-m1-JFefv8vvgiY9SW6MzAGSvu.webp",
    verified: true,
    approved: true,
  },
  {
    id: "laptop-3",
    title: "HP Pavilion 15 - Budget Friendly",
    category: "Laptops",
    price: 550000,
    description: "Good working condition. AMD Ryzen 5, 8GB RAM, 256GB SSD. Great for coursework.",
    sellerContact: "+250790111222",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/laptop-hp-pavilion-EKiGbBAaXBrfnD5pKkUW4u.webp",
    verified: true,
    approved: true,
  },
  {
    id: "laptop-4",
    title: "Lenovo ThinkPad X1 Carbon",
    category: "Laptops",
    price: 950000,
    description: "Business-class laptop, excellent for professionals. Intel Core i7, 16GB RAM, 512GB SSD.",
    sellerContact: "+250790222333",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/laptop-lenovo-thinkpad-gXg5o2huoJBf2SEpsvoeXS.webp",
    verified: true,
    approved: true,
  },

  // Smartphones
  {
    id: "phone-1",
    title: "iPhone 14 Pro - Midnight Black",
    category: "Smartphones",
    price: 750000,
    description: "Excellent condition, no scratches. Battery health 95%. Comes with charger and case.",
    sellerContact: "+250788222333",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/phone-iphone-14-YiBZB2Exb2QouXZpyaPQ8Y.webp",
    verified: true,
    approved: true,
  },
  {
    id: "phone-2",
    title: "Samsung Galaxy S23 Ultra",
    category: "Smartphones",
    price: 680000,
    description: "Very good condition. 12GB RAM, 256GB storage. Fast charging and stylus included.",
    sellerContact: "+250789333444",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/phone-samsung-s23-TJfGtqEqmZMKAaUqag6p4t.webp",
    verified: true,
    approved: true,
  },
  {
    id: "phone-3",
    title: "Google Pixel 8 Pro",
    category: "Smartphones",
    price: 620000,
    description: "Mint condition. 12GB RAM, 256GB storage. Advanced camera system. Original box included.",
    sellerContact: "+250790444555",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/phone-google-pixel-Z2xpyBoWHRmm3oqfsXuwWi.webp",
    verified: true,
    approved: true,
  },

  // Houses (Student Accommodation)
  {
    id: "house-1",
    title: "Modern Dorm Room - Shared",
    category: "Houses",
    price: 120000,
    description: "Fully furnished dorm room with study desk. WiFi, water, utilities included. Available immediately.",
    sellerContact: "+250788555666",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/accommodation-dorm-gCFn4ag7HWnZemM8GcA9De.webp",
    verified: true,
    approved: true,
  },
  {
    id: "house-2",
    title: "Studio Apartment - City Center",
    category: "Houses",
    price: 180000,
    description: "Compact studio apartment with kitchenette. Modern amenities, secure building. Monthly rent.",
    sellerContact: "+250789666777",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/accommodation-studio-HJBJKtPdXroyzykvb566vh.webp",
    verified: true,
    approved: true,
  },
  {
    id: "house-3",
    title: "Luxury 1-Bedroom Apartment",
    category: "Houses",
    price: 280000,
    description: "Premium furnished apartment with AC, TV, and modern amenities. Walking distance to campus.",
    sellerContact: "+250790777888",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/accommodation-apartment-hQrqcVyuLTJrEPVPonMmKJ.webp",
    verified: true,
    approved: true,
  },

  // Books
  {
    id: "book-1",
    title: "Academic Textbooks Bundle",
    category: "Books",
    price: 45000,
    description: "Collection of essential textbooks for STEM students. Biology, Chemistry, Physics, and Mathematics.",
    sellerContact: "+250788888999",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/books-stack-LV4KCas6GDubLDtmByy7mB.webp",
    verified: true,
    approved: true,
  },
  {
    id: "book-2",
    title: "Calculus & Advanced Mathematics",
    category: "Books",
    price: 28000,
    description: "Comprehensive mathematics textbooks. Includes Calculus, Organic Chemistry, and Physics.",
    sellerContact: "+250789999000",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/books-textbooks-QMhuCkKzK2aEk8a8idCrmD.webp",
    verified: true,
    approved: true,
  },
  {
    id: "book-3",
    title: "Business & Economics Texts",
    category: "Books",
    price: 32000,
    description: "Business Management, Economics, and Finance textbooks. Perfect for commerce students.",
    sellerContact: "+250790000111",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/books-textbooks-QMhuCkKzK2aEk8a8idCrmD.webp",
    verified: true,
    approved: true,
  },
];
