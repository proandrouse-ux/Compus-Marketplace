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
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/category-laptops-BwtmaUXFCGp6JnNzg8AXpW.webp",
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
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/category-laptops-BwtmaUXFCGp6JnNzg8AXpW.webp",
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
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/category-laptops-BwtmaUXFCGp6JnNzg8AXpW.webp",
    verified: true,
    approved: true,
  },

  // Smartphones
  {
    id: "phone-1",
    title: "iPhone 12 - 128GB Blue",
    category: "Smartphones",
    price: 450000,
    description: "Excellent condition, no scratches. Battery health 92%. Comes with charger.",
    sellerContact: "+250788222333",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/category-phones-QsJzUTFUKudtVUtaNSvi44.webp",
    verified: true,
    approved: true,
  },
  {
    id: "phone-2",
    title: "Samsung Galaxy A52 - Black",
    category: "Smartphones",
    price: 280000,
    description: "Very good condition. 6GB RAM, 128GB storage. Fast charging included.",
    sellerContact: "+250789333444",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/category-phones-QsJzUTFUKudtVUtaNSvi44.webp",
    verified: true,
    approved: true,
  },
  {
    id: "phone-3",
    title: "OnePlus 9 - 5G Enabled",
    category: "Smartphones",
    price: 380000,
    description: "Mint condition. 8GB RAM, 128GB storage. Original packaging included.",
    sellerContact: "+250790444555",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/category-phones-QsJzUTFUKudtVUtaNSvi44.webp",
    verified: true,
    approved: true,
  },

  // Houses (Student Accommodation)
  {
    id: "house-1",
    title: "Modern Studio Apartment - City Center",
    category: "Houses",
    price: 150000,
    description: "Fully furnished studio near campus. WiFi, water, utilities included. Available immediately.",
    sellerContact: "+250788555666",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/category-accommodation-2q8SM72RfP7vXxGurWp3Es.webp",
    verified: true,
    approved: true,
  },
  {
    id: "house-2",
    title: "Shared Hostel Room - 2 Beds",
    category: "Houses",
    price: 80000,
    description: "Clean, secure hostel with 24/7 security. Shared kitchen and common area. Monthly rent.",
    sellerContact: "+250789666777",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/category-accommodation-2q8SM72RfP7vXxGurWp3Es.webp",
    verified: true,
    approved: true,
  },
  {
    id: "house-3",
    title: "Luxury 1-Bedroom Apartment",
    category: "Houses",
    price: 250000,
    description: "Premium furnished apartment with AC, TV, and modern amenities. Walking distance to campus.",
    sellerContact: "+250790777888",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/category-accommodation-2q8SM72RfP7vXxGurWp3Es.webp",
    verified: true,
    approved: true,
  },

  // Books
  {
    id: "book-1",
    title: "Introduction to Computer Science - Textbook",
    category: "Books",
    price: 25000,
    description: "Used but in good condition. Covers fundamentals and algorithms. Perfect for CS students.",
    sellerContact: "+250788888999",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/category-books-JaJnXwSt6gxA89ZMZ2YRF5.webp",
    verified: true,
    approved: true,
  },
  {
    id: "book-2",
    title: "Calculus II - Advanced Mathematics",
    category: "Books",
    price: 18000,
    description: "Excellent condition. Includes all notes and highlights. Covers integration and series.",
    sellerContact: "+250789999000",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/category-books-JaJnXwSt6gxA89ZMZ2YRF5.webp",
    verified: true,
    approved: true,
  },
  {
    id: "book-3",
    title: "Business Management - Case Studies",
    category: "Books",
    price: 22000,
    description: "Good condition with minimal markings. Essential for business students. Latest edition.",
    sellerContact: "+250790000111",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663460938614/8YNdYvgR6vdjRc569WJJdm/category-books-JaJnXwSt6gxA89ZMZ2YRF5.webp",
    verified: true,
    approved: true,
  },
];
