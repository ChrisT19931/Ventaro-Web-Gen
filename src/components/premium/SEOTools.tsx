import React, { useState } from 'react';

interface SEOToolsProps {
  websiteId?: string;
  url?: string;
}

export default function SEOTools({ websiteId, url }: SEOToolsProps) {
  const [pageUrl, setPageUrl] = useState(url || '');
  const [keyword, setKeyword] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [seoResults, setSeoResults] = useState<any>(null);
  
  const analyzeSEO = () => {
    setIsAnalyzing(true);
    
    // In a real implementation, this would call an SEO analysis service
    // For now, we'll simulate a delay and return mock results
    setTimeout(() => {
      const mockResults = {
        score: 78,
        title: {
          score: 85,
          text: 'Fashion Portfolio | Jane Doe - Professional Fashion Influencer',
          length: 58,
          issues: ['Title is slightly long (recommended: under 55 characters)']
        },
        meta: {
          score: 90,
          description: 'Jane Doe is a professional fashion influencer specializing in sustainable fashion and lifestyle content.',
          length: 92,
          issues: []
        },
        headings: {
          score: 75,
          h1Count: 1,
          h2Count: 4,
          h3Count: 6,
          issues: ['Consider adding more H2 headings for better structure']
        },
        content: {
          score: 70,
          wordCount: 1245,
          keywordDensity: 2.3,
          issues: ['Keyword density could be improved (recommended: 1-3%)']
        },
        images: {
          score: 65,
          total: 12,
          withAlt: 8,
          issues: ['4 images missing alt text']
        },
        links: {
          score: 85,
          internal: 8,
          external: 4,
          issues: []
        },
        mobile: {
          score: 90,
          issues: []
        },
        performance: {
          score: 72,
          loadTime: '2.4s',
          issues: ['Consider optimizing images further']
        }
      };
      
      setSeoResults(mockResults);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center">
          <span className="text-black font-bold">SEO</span>
        </div>
        <h2 className="text-xl font-heading font-bold">SEO Optimization Tools</h2>
      </div>
      
      <p className="mb-6">
        Optimize your website for search engines to increase visibility and attract more visitors.
        Our SEO tools analyze your content and provide actionable recommendations.
      </p>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Website URL</label>
          <input
            type="text"
            value={pageUrl}
            onChange={(e) => setPageUrl(e.target.value)}
            placeholder="https://your-website.com"
            className="w-full p-3 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Target Keyword</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., fashion influencer, beauty tips, fitness coach"
            className="w-full p-3 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
          />
        </div>
        
        <button
          onClick={analyzeSEO}
          disabled={isAnalyzing || !pageUrl}
          className="w-full py-3 bg-neon-blue text-black rounded-md font-bold"
        >
          {isAnalyzing ? 'Analyzing Your Website...' : 'Analyze SEO'}
        </button>
      </div>
      
      {seoResults && (
        <div className="border-t border-dark-purple pt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-heading font-bold">SEO Analysis Results</h3>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full border-4 border-neon-blue flex items-center justify-center mr-2">
                <span className={`text-xl font-bold ${getScoreColor(seoResults.score)}`}>{seoResults.score}</span>
              </div>
              <span>Overall Score</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title & Meta */}
            <div className="bg-black rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Title Tag</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${getScoreColor(seoResults.title.score)}`}>
                  {seoResults.title.score}/100
                </span>
              </div>
              <p className="text-sm mb-2 border-l-2 border-dark-purple pl-2">{seoResults.title.text}</p>
              <p className="text-xs text-gray-400 mb-2">{seoResults.title.length} characters</p>
              {seoResults.title.issues.map((issue: string, index: number) => (
                <p key={index} className="text-xs text-yellow-500">• {issue}</p>
              ))}
            </div>
            
            <div className="bg-black rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Meta Description</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${getScoreColor(seoResults.meta.score)}`}>
                  {seoResults.meta.score}/100
                </span>
              </div>
              <p className="text-sm mb-2 border-l-2 border-dark-purple pl-2">{seoResults.meta.description}</p>
              <p className="text-xs text-gray-400 mb-2">{seoResults.meta.length} characters</p>
              {seoResults.meta.issues.map((issue: string, index: number) => (
                <p key={index} className="text-xs text-yellow-500">• {issue}</p>
              ))}
            </div>
            
            {/* Content & Headings */}
            <div className="bg-black rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Content Analysis</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${getScoreColor(seoResults.content.score)}`}>
                  {seoResults.content.score}/100
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <p className="text-xs text-gray-400">Word Count</p>
                  <p className="text-sm">{seoResults.content.wordCount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Keyword Density</p>
                  <p className="text-sm">{seoResults.content.keywordDensity}%</p>
                </div>
              </div>
              {seoResults.content.issues.map((issue: string, index: number) => (
                <p key={index} className="text-xs text-yellow-500">• {issue}</p>
              ))}
            </div>
            
            <div className="bg-black rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Headings Structure</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${getScoreColor(seoResults.headings.score)}`}>
                  {seoResults.headings.score}/100
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div>
                  <p className="text-xs text-gray-400">H1</p>
                  <p className="text-sm">{seoResults.headings.h1Count}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">H2</p>
                  <p className="text-sm">{seoResults.headings.h2Count}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">H3</p>
                  <p className="text-sm">{seoResults.headings.h3Count}</p>
                </div>
              </div>
              {seoResults.headings.issues.map((issue: string, index: number) => (
                <p key={index} className="text-xs text-yellow-500">• {issue}</p>
              ))}
            </div>
            
            {/* Images & Links */}
            <div className="bg-black rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Images</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${getScoreColor(seoResults.images.score)}`}>
                  {seoResults.images.score}/100
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <p className="text-xs text-gray-400">Total Images</p>
                  <p className="text-sm">{seoResults.images.total}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">With Alt Text</p>
                  <p className="text-sm">{seoResults.images.withAlt}</p>
                </div>
              </div>
              {seoResults.images.issues.map((issue: string, index: number) => (
                <p key={index} className="text-xs text-yellow-500">• {issue}</p>
              ))}
            </div>
            
            <div className="bg-black rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Links</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${getScoreColor(seoResults.links.score)}`}>
                  {seoResults.links.score}/100
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <p className="text-xs text-gray-400">Internal Links</p>
                  <p className="text-sm">{seoResults.links.internal}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">External Links</p>
                  <p className="text-sm">{seoResults.links.external}</p>
                </div>
              </div>
              {seoResults.links.issues.map((issue: string, index: number) => (
                <p key={index} className="text-xs text-yellow-500">• {issue}</p>
              ))}
            </div>
            
            {/* Mobile & Performance */}
            <div className="bg-black rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Mobile Friendliness</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${getScoreColor(seoResults.mobile.score)}`}>
                  {seoResults.mobile.score}/100
                </span>
              </div>
              {seoResults.mobile.issues.length > 0 ? (
                seoResults.mobile.issues.map((issue: string, index: number) => (
                  <p key={index} className="text-xs text-yellow-500">• {issue}</p>
                ))
              ) : (
                <p className="text-xs text-green-500">• Your website is mobile-friendly</p>
              )}
            </div>
            
            <div className="bg-black rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Performance</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${getScoreColor(seoResults.performance.score)}`}>
                  {seoResults.performance.score}/100
                </span>
              </div>
              <div className="mb-2">
                <p className="text-xs text-gray-400">Load Time</p>
                <p className="text-sm">{seoResults.performance.loadTime}</p>
              </div>
              {seoResults.performance.issues.map((issue: string, index: number) => (
                <p key={index} className="text-xs text-yellow-500">• {issue}</p>
              ))}
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-dark-purple rounded-lg">
            <h4 className="font-heading font-bold mb-2">SEO Recommendations</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">→</span>
                <span>Optimize your title tag to be under 55 characters while maintaining keywords.</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">→</span>
                <span>Add alt text to all images to improve accessibility and SEO.</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">→</span>
                <span>Improve your heading structure with more H2 headings for better content organization.</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">→</span>
                <span>Optimize images to improve page load speed.</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">→</span>
                <span>Consider adding more content around your target keyword.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
