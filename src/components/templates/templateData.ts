export interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  description: string;
  tags: string[];
  features: string[];
  price: number;
  tier: 'basic' | 'standard' | 'premium' | 'elite' | 'ultimate';
  title?: string;
}

export const templates = [
  {
    id: 'fashion-portfolio-1',
    name: 'Fashion Portfolio Elite',
    category: 'fashion',
    thumbnail: '/assets/templates/fashion1.jpg',
    description: 'A premium portfolio template for fashion influencers',
    tags: ['portfolio', 'fashion', 'influencer'],
    features: ['Responsive design', 'Gallery section', 'Contact form', 'Social media integration'],
    price: 50.00,
    tier: 'elite',
    title: 'Fashion Portfolio'
  },
  {
    id: 'beauty-blog-1',
    name: 'Beauty Blog Premium',
    category: 'beauty',
    thumbnail: '/assets/templates/beauty1.jpg',
    description: 'Elegant blog template for beauty influencers',
    tags: ['blog', 'beauty', 'influencer'],
    features: ['Blog layout', 'Comment section', 'Newsletter signup', 'Instagram feed'],
    price: 40.00,
    tier: 'premium',
    title: 'Beauty Blog'
  },
  {
    id: 'fitness-coach-1',
    name: 'Fitness Coach Pro',
    category: 'fitness',
    thumbnail: '/assets/templates/fitness1.jpg',
    description: 'Professional template for fitness coaches and trainers',
    tags: ['fitness', 'coach', 'health'],
    features: ['Program showcase', 'Testimonials', 'Booking form', 'Before/after gallery'],
    price: 30.00,
    tier: 'standard',
    title: 'Fitness Coach'
  },
  {
    id: 'travel-blog-1',
    name: 'Travel Explorer',
    category: 'travel',
    thumbnail: '/assets/templates/travel1.jpg',
    description: 'Dynamic blog template for travel influencers',
    tags: ['travel', 'blog', 'adventure'],
    features: ['Map integration', 'Photo gallery', 'Destination guides', 'Travel tips section'],
    price: 20.00,
    tier: 'standard',
    title: 'Travel Explorer'
  },
  {
    id: 'gaming-streamer-1',
    name: 'Gaming Streamer Hub',
    category: 'gaming',
    thumbnail: '/assets/templates/gaming1.jpg',
    description: 'Interactive template for gaming streamers',
    tags: ['gaming', 'streamer', 'esports'],
    features: ['Stream embed', 'Schedule display', 'Game showcase', 'Merch store'],
    price: 10.00,
    tier: 'basic',
    title: 'Gaming Hub'
  },
  {
    id: 'fashion-portfolio-2',
    name: 'Fashion Portfolio Ultimate',
    category: 'fashion',
    thumbnail: '/assets/templates/fashion2.jpg',
    description: 'Our most advanced portfolio template for fashion influencers',
    tags: ['portfolio', 'fashion', 'influencer', 'premium'],
    features: ['Responsive design', 'Gallery section', 'Contact form', 'Social media integration', 'Advanced animations', 'E-commerce integration'],
    price: 100.00,
    tier: 'ultimate',
    title: 'Fashion Portfolio Pro'
  }
];

export const getTierFeatures = (tier: string) => {
  switch(tier) {
    case 'basic':
      return [
        'Responsive design',
        'Basic customization',
        'Contact form',
        'Social media links'
      ];
    case 'standard':
      return [
        'All Basic features',
        'Advanced customization',
        'SEO optimization',
        'Newsletter integration',
        'Google Analytics'
      ];
    case 'premium':
      return [
        'All Standard features',
        'Premium design elements',
        'Animation effects',
        'Custom forms',
        'Priority support'
      ];
    case 'elite':
      return [
        'All Premium features',
        'Advanced animations',
        'E-commerce ready',
        'Custom code access',
        'Performance optimization'
      ];
    case 'ultimate':
      return [
        'All Elite features',
        'Custom branding',
        'Advanced e-commerce',
        'Membership functionality',
        'VIP support',
        'Monthly updates'
      ];
    default:
      return [];
  }
};
