import { Template } from '../templates/templateData';

export interface TemplateCustomization {
  layout: string;
  colorScheme: string;
  typography: string;
  sections: {
    [key: string]: {
      enabled: boolean;
      content?: any;
    }
  };
  customCss?: string;
  customJs?: string;
}

export interface GeneratedWebsite {
  html: string;
  css: string;
  js: string;
  assets: string[];
}

export interface ExportOptions {
  format: 'zip' | 'deploy';
  includeAssets: boolean;
  minify: boolean;
}

export interface WebsiteGeneratorService {
  generateWebsite: (template: Template, customization: TemplateCustomization) => Promise<GeneratedWebsite>;
  exportWebsite: (generatedWebsite: GeneratedWebsite, options: ExportOptions) => Promise<string>;
  validateCustomization: (template: Template, customization: TemplateCustomization) => boolean;
  getTemplateStructure: (template: Template) => any;
}
