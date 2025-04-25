"use client";

import { templates } from "../../../../components/templates/templateData";
import WebsiteGeneratorService from "../../../../components/generator/WebsiteGeneratorService";

export default function TemplateCustomizePage({ params }: { params: { id: string } }) {
  // Find the template by ID
  const template = templates.find(t => t.id === params.id) || templates[0];
  
  const [colorScheme, setColorScheme] = useState('dark');
  const [typography, setTypography] = useState('modern');
  const [layout, setLayout] = useState('default');
  const [sections, setSections] = useState({
    header: { enabled: true },
    hero: { enabled: true },
    about: { enabled: true },
    portfolio: { enabled: true },
    services: { enabled: true },
    testimonials: { enabled: true },
    contact: { enabled: true },
    footer: { enabled: true }
  });
  const [websiteTitle, setWebsiteTitle] = useState(template.title || template.name);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [previewHtml, setPreviewHtml] = useState('');
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const generatorService = new WebsiteGeneratorServiceImpl();
  
  // Handle section toggle
  const toggleSection = (sectionName: string) => {
    setSections(prev => ({
      ...prev,
      [sectionName]: { 
        ...prev[sectionName as keyof typeof prev],
        enabled: !prev[sectionName as keyof typeof prev].enabled 
      }
    }));
  };
  
  // Generate preview when customizations change
  useEffect(() => {
    const generatePreview = async () => {
      try {
        const customizations = {
          colorScheme,
          typography,
          layout,
          sections,
          title: websiteTitle,
          category: template.category
        };
        
        // Generate the website code
        const generated = await generatorService.generateWebsite(template, customizations);
        
        // Create a preview HTML that combines everything
        const fullHtml = `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${websiteTitle}</title>
              <style>${generated.css}</style>
            </head>
            <body>
              ${generated.html}
              <script>${generated.js}</script>
            </body>
          </html>
        `;
        
        setPreviewHtml(fullHtml);
        
        // Update the iframe content if it exists
        if (iframeRef.current) {
          const iframe = iframeRef.current;
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          
          if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(fullHtml);
            iframeDoc.close();
          }
        }
      } catch (error) {
        console.error('Error generating website preview:', error);
      }
    };
    
    generatePreview();
  }, [template, colorScheme, typography, layout, sections, websiteTitle]);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">Customize Template</h1>
          <p className="text-gray-400">Personalize {template.name} to match your brand</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">Design Options</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Color Scheme</label>
                  <select
                    value={colorScheme}
                    onChange={(e) => setColorScheme(e.target.value)}
                    className="w-full p-2 bg-black border border-dark-purple rounded-md"
                  >
                    <option value="dark">Dark Theme</option>
                    <option value="light">Light Theme</option>
                    <option value="colorful">Colorful</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Typography</label>
                  <select
                    value={typography}
                    onChange={(e) => setTypography(e.target.value)}
                    className="w-full p-2 bg-black border border-dark-purple rounded-md"
                  >
                    <option value="modern">Modern</option>
                    <option value="classic">Classic</option>
                    <option value="bold">Bold</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Layout</label>
                  <select
                    value={layout}
                    onChange={(e) => setLayout(e.target.value)}
                    className="w-full p-2 bg-black border border-dark-purple rounded-md"
                  >
                    <option value="default">Default</option>
                    <option value="alternative">Alternative</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">Content Sections</h2>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="section-header" 
                    className="mr-2" 
                    checked={sections.header.enabled}
                    onChange={() => toggleSection('header')}
                  />
                  <label htmlFor="section-header">Header</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="section-hero" 
                    className="mr-2" 
                    checked={sections.hero.enabled}
                    onChange={() => toggleSection('hero')}
                  />
                  <label htmlFor="section-hero">Hero Section</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="section-about" 
                    className="mr-2" 
                    checked={sections.about.enabled}
                    onChange={() => toggleSection('about')}
                  />
                  <label htmlFor="section-about">About</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="section-portfolio" 
                    className="mr-2" 
                    checked={sections.portfolio.enabled}
                    onChange={() => toggleSection('portfolio')}
                  />
                  <label htmlFor="section-portfolio">Portfolio</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="section-services" 
                    className="mr-2" 
                    checked={sections.services.enabled}
                    onChange={() => toggleSection('services')}
                  />
                  <label htmlFor="section-services">Services</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="section-testimonials" 
                    className="mr-2" 
                    checked={sections.testimonials.enabled}
                    onChange={() => toggleSection('testimonials')}
                  />
                  <label htmlFor="section-testimonials">Testimonials</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="section-contact" 
                    className="mr-2" 
                    checked={sections.contact.enabled}
                    onChange={() => toggleSection('contact')}
                  />
                  <label htmlFor="section-contact">Contact</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="section-footer" 
                    className="mr-2" 
                    checked={sections.footer.enabled}
                    onChange={() => toggleSection('footer')}
                  />
                  <label htmlFor="section-footer">Footer</label>
                </div>
              </div>
            </div>
            
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">Template Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Website Title</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-black border border-dark-purple rounded-md"
                    placeholder="My Fashion Portfolio"
                    value={websiteTitle}
                    onChange={(e) => setWebsiteTitle(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-grey rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-heading font-bold">Preview</h2>
                <div className="flex space-x-2">
                  <button 
                    className={`px-3 py-1 rounded text-sm ${previewMode === 'desktop' ? 'bg-neon-blue text-black' : 'bg-dark-purple'}`}
                    onClick={() => setPreviewMode('desktop')}
                  >
                    Desktop
                  </button>
                  <button 
                    className={`px-3 py-1 rounded text-sm ${previewMode === 'tablet' ? 'bg-neon-blue text-black' : 'bg-dark-purple'}`}
                    onClick={() => setPreviewMode('tablet')}
                  >
                    Tablet
                  </button>
                  <button 
                    className={`px-3 py-1 rounded text-sm ${previewMode === 'mobile' ? 'bg-neon-blue text-black' : 'bg-dark-purple'}`}
                    onClick={() => setPreviewMode('mobile')}
                  >
                    Mobile
                  </button>
                </div>
              </div>
              
              <div className="bg-black rounded-lg h-[600px] overflow-hidden">
                <iframe
                  ref={iframeRef}
                  className={`w-full h-full border-0 ${
                    previewMode === 'desktop' ? 'scale-100' : 
                    previewMode === 'tablet' ? 'scale-75 max-w-[768px] mx-auto' : 
                    'scale-50 max-w-[375px] mx-auto'
                  }`}
                  title="Template Preview"
                  sandbox="allow-same-origin allow-scripts"
                ></iframe>
              </div>
              
              <div className="flex justify-between mt-6">
                <a 
                  href={`/templates/${params.id}`}
                  className="px-4 py-2 bg-dark-purple rounded hover:bg-opacity-80"
                >
                  Back to Template
                </a>
                <a 
                  href={`/generator/${params.id}`}
                  className="px-4 py-2 bg-neon-blue text-black rounded font-bold"
                >
                  Generate Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
