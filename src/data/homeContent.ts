import {
  ShieldCheck,
  RotateCcw,
  Banknote,
  Truck,
  type LucideIcon,
} from 'lucide-react'

export const HERO_VIDEO =
  'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-on-a-highway-4154-large.mp4'

export const HERO_POSTER =
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1920&q=85'

export interface TrustFeature {
  icon: LucideIcon
  title: string
  description: string
}

export const TRUST_FEATURES: TrustFeature[] = [
  {
    icon: ShieldCheck,
    title: '300 Point Inspection',
    description: 'Every vehicle passes rigorous multi-point quality checks by certified technicians.',
  },
  {
    icon: RotateCcw,
    title: '7 Day Return Policy',
    description: 'Not satisfied? Return within 7 days for a hassle-free refund process.',
  },
  {
    icon: Banknote,
    title: 'Instant Financing',
    description: 'Get pre-approved in minutes with competitive rates from top lending partners.',
  },
  {
    icon: Truck,
    title: 'Doorstep Delivery',
    description: 'Premium white-glove delivery to your home or office, anywhere in India.',
  },
]

export const FAQ_ITEMS = [
  {
    q: 'How does AutoXchange verify cars?',
    a: 'Each vehicle undergoes a 300-point inspection covering engine, transmission, body, electronics, and documentation. Only certified cars are listed.',
  },
  {
    q: 'Can I get a loan through AutoXchange?',
    a: 'Yes. Our instant financing partners offer pre-approval in under 10 minutes with rates starting from 8.5% APR.',
  },
  {
    q: 'What is the return policy?',
    a: 'You have 7 days or 500 km (whichever comes first) to return your car if it does not meet our quality promise.',
  },
  {
    q: 'How does selling my car work?',
    a: 'Get an AI-powered instant valuation, book a free doorstep inspection, and receive payment within 24 hours of approval.',
  },
  {
    q: 'Do you offer exchange / trade-in?',
    a: 'Absolutely. Trade your current car and apply the value directly toward your next purchase with zero paperwork hassle.',
  },
  {
    q: 'Is doorstep delivery available nationwide?',
    a: 'We deliver to 40+ cities across India with expansion ongoing. Check availability at checkout.',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    role: 'Bought BMW X5',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
    rating: 5,
    quote: 'Seamless from search to delivery. The inspection report gave me complete confidence. Best car buying experience I have had.',
  },
  {
    name: 'Priya Mehta',
    role: 'Sold Honda City',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
    rating: 5,
    quote: 'Sold my car in 48 hours with instant payment. The valuation was fair and the process incredibly smooth.',
  },
  {
    name: 'Arjun Patel',
    role: 'Bought Mercedes GLC',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80',
    rating: 5,
    quote: 'Premium service throughout. Financing approved in minutes and the car delivered to my doorstep within a week.',
  },
  {
    name: 'Sneha Reddy',
    role: 'Exchanged Kia Seltos',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
    rating: 5,
    quote: 'Traded up to a luxury SUV with zero hassle. AutoXchange handled everything — I just picked up the keys.',
  },
]
