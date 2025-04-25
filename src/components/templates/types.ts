export type TemplateCategory = 'fashion' | 'fitness' | 'beauty' | 'travel' | 'lifestyle' | 'gaming';

export interface TemplateFilter {
  categories: TemplateCategory[];
  tags: string[];
  featured: boolean;
  search: string;
}

export interface TemplatePreviewProps {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  features: string[];
}

export interface TemplatePageProps {
  templates: any[];
  categories: TemplateCategory[];
  popularTags: string[];
}
