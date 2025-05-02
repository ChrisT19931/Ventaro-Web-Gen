# Full project dump — copy & paste below
## File: src/app/counter.ts
```
'use server'
// import { getCloudflareContext } from '@opennextjs/cloudflare'
import { headers } from 'next/headers'
import { cookies } from 'next/headers'

/**
 * Increment counter and log access
 *
 * Database connection instructions:
 * 1. Uncomment the import { getCloudflareContext } line
 * 2. Uncomment the const cf = await getCloudflareContext() line
 * 3. Uncomment the database operation code
 * 4. Make sure D1 database binding is configured in wrangler.toml
 * 5. Required database tables:
 *    - counters table: name(TEXT), value(INTEGER)
 *    - access_logs table: ip(TEXT), path(TEXT), accessed_at(DATETIME)
 */
export async function incrementAndLog() {
  // const cf = await getCloudflareContext()
  const headersList = headers()
  const cookieStore = await cookies()

  // Get current count from cookie or start at 0
  let currentCount = parseInt(cookieStore.get('page_views')?.value || '0')

  // Increment count
  currentCount += 1

  // Store updated count in cookie (expires in 1 year)
  cookieStore.set('page_views', currentCount.toString(), {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    path: '/'
  })

  // Log this access in memory (will be lost on restart)
  const accessTime = new Date().toISOString()
  const recentAccessList = JSON.parse(cookieStore.get('recent_access')?.value || '[]')
  recentAccessList.unshift({ accessed_at: accessTime })

  // Keep only the 5 most recent accesses
  while (recentAccessList.length > 5) {
    recentAccessList.pop()
  }

  // Store recent access list in cookie
  cookieStore.set('recent_access', JSON.stringify(recentAccessList), {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
    path: '/'
  })

  // Database operation example (commented out):
  // const { results: countResults } = await cf.env.DB.prepare(
  //   'INSERT INTO counters (name, value) VALUES (?, 1) ON CONFLICT (name) DO UPDATE SET value = value + 1 RETURNING value'
  // )
  //   .bind('page_views')
  //   .all()

  // await cf.env.DB.prepare('INSERT INTO access_logs (ip, path, accessed_at) VALUES (?, ?, datetime())')
  //   .bind(
  //     headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown',
  //     headersList.get('x-forwarded-host') || '/'
  //   )
  //   .run()

  // const { results: logs } = await cf.env.DB.prepare('SELECT * FROM access_logs ORDER BY accessed_at DESC LIMIT 5').all()

  return {
    count: currentCount,
    recentAccess: recentAccessList
  }
}

/**
 * Get current counter value and recent access logs
 *
 * Database query instructions:
 * 1. When using database, get Cloudflare context with getCloudflareContext()
 * 2. Use cf.env.DB.prepare to execute SQL queries
 * 3. For local development, you can use wrangler to simulate the database
 */
export async function getStats() {
  const cookieStore = await cookies()

  // Get current count from cookie or default to 0
  const currentCount = parseInt(cookieStore.get('page_views')?.value || '0')

  // Get recent access list from cookie or default to empty array
  const recentAccessList = JSON.parse(cookieStore.get('recent_access')?.value || '[]')

  // Database query example (commented out):
  // const cf = await getCloudflareContext()
  // const { results: count } = await cf.env.DB.prepare('SELECT value FROM counters WHERE name = ?')
  //   .bind('page_views')
  //   .all()

  // const { results: logs } = await cf.env.DB.prepare(
  //   'SELECT accessed_at FROM access_logs ORDER BY accessed_at DESC LIMIT 5'
  // ).all()

  return {
    count: currentCount,
    recentAccess: recentAccessList
  }
}```

## File: src/app/wix-export/page.tsx
```
"use client";

import React, { useState } from 'react';
import WebsiteGeneratorService from '../../components/generator/WebsiteGeneratorService';


export default function WixExportPage() {
  const [htmlCode, setHtmlCode] = useState('');
  const [exportStatus, setExportStatus] = useState('idle');
  const [integrationStep, setIntegrationStep] = useState(1);
  
  const generateWixCode = async () => {
    setExportStatus('generating');
    
    try {
      // Simulate generating code for Wix
      const generatorService = new WebsiteGeneratorService();
      
      // Create a combined HTML file with inline CSS and JS
      const wixHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Website</title>
  <style>
    /* Base styles */
    :root {
      --color-primary: #2D1B69;
      --color-secondary: #00FFFF;
      --color-background: #000000;
      --color-text: #FFFFFF;
      --font-heading: 'Montserrat', sans-serif;
      --font-body: 'Nunito Sans', sans-serif;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: var(--font-body);
      background-color: var(--color-background);
      color: var(--color-text);
      line-height: 1.6;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-heading);
      font-weight: 700;
      margin-bottom: 1rem;
    }
    
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    /* Header styles */
    .site-header {
      padding: 1.5rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .site-header .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    nav ul {
      display: flex;
      list-style: none;
    }
    
    nav ul li {
      margin-left: 2rem;
    }
    
    nav ul li a {
      color: var(--color-text);
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    nav ul li a:hover {
      color: var(--color-secondary);
    }
    
    /* Hero section */
    .hero-section {
      padding: 8rem 0;
      text-align: center;
    }
    
    .hero-section h1 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
    }
    
    .hero-section p {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      opacity: 0.8;
    }
    
    .btn {
      display: inline-block;
      padding: 0.8rem 1.5rem;
      background-color: var(--color-primary);
      color: white;
      border: 2px solid var(--color-secondary);
      border-radius: 4px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
    }
    
    .btn:hover {
      background-color: var(--color-secondary);
      color: var(--color-background);
    }
    
    /* About section */
    .about-section {
      padding: 5rem 0;
    }
    
    .about-section h2 {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .about-content {
      display: flex;
      align-items: center;
      gap: 3rem;
    }
    
    .profile-image {
      flex: 0 0 300px;
    }
    
    .profile-image img {
      width: 100%;
      border-radius: 50%;
    }
    
    .about-text {
      flex: 1;
    }
    
    /* Portfolio section */
    .portfolio-section {
      padding: 5rem 0;
    }
    
    .portfolio-section h2 {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .portfolio-item {
      overflow: hidden;
      border-radius: 8px;
      transition: transform 0.3s ease;
    }
    
    .portfolio-item:hover {
      transform: translateY(-5px);
    }
    
    .portfolio-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    /* Contact section */
    .contact-section {
      padding: 5rem 0;
      text-align: center;
    }
    
    .contact-section h2 {
      margin-bottom: 3rem;
    }
    
    .contact-form {
      max-width: 600px;
      margin: 0 auto;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 1rem;
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      color: var(--color-text);
    }
    
    .form-group textarea {
      min-height: 150px;
      resize: vertical;
    }
    
    /* Footer */
    .site-footer {
      padding: 3rem 0;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .social-links {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 1.5rem;
    }
    
    .social-links a {
      color: var(--color-text);
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .social-links a:hover {
      color: var(--color-secondary);
    }
    
    /* Responsive styles */
    @media (max-width: 768px) {
      .about-content {
        flex-direction: column;
        text-align: center;
      }
      
      .profile-image {
        margin-bottom: 2rem;
      }
      
      nav ul {
        display: none;
      }
      
      .hero-section h1 {
        font-size: 2.5rem;
      }
    }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="container">
      <div class="logo">Your Brand</div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
  
  <section id="home" class="hero-section">
    <div class="container">
      <h1>Your Name</h1>
      <p>Professional Influencer</p>
      <a href="#portfolio" class="btn">View My Work</a>
    </div>
  </section>
  
  <section id="about" class="about-section">
    <div class="container">
      <h2>About Me</h2>
      <div class="about-content">
        <div class="profile-image">
          <img src="https://via.placeholder.com/300" alt="Your Name">
        </div>
        <div class="about-text">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </div>
    </div>
  </section>
  
  <section id="portfolio" class="portfolio-section">
    <div class="container">
      <h2>My Work</h2>
      <div class="portfolio-grid">
        <div class="portfolio-item"><img src="https://via.placeholder.com/400x300" alt="Portfolio Item 1"></div>
        <div class="portfolio-item"><img src="https://via.placeholder.com/400x300" alt="Portfolio Item 2"></div>
        <div class="portfolio-item"><img src="https://via.placeholder.com/400x300" alt="Portfolio Item 3"></div>
        <div class="portfolio-item"><img src="https://via.placeholder.com/400x300" alt="Portfolio Item 4"></div>
        <div class="portfolio-item"><img src="https://via.placeholder.com/400x300" alt="Portfolio Item 5"></div>
        <div class="portfolio-item"><img src="https://via.placeholder.com/400x300" alt="Portfolio Item 6"></div>
      </div>
    </div>
  </section>
  
  <section id="contact" class="contact-section">
    <div class="container">
      <h2>Get In Touch</h2>
      <p>Interested in working together? Fill out the form below to get started.</p>
      <form class="contact-form">
        <div class="form-group">
          <input type="text" placeholder="Your Name" required>
        </div>
        <div class="form-group">
          <input type="email" placeholder="Your Email" required>
        </div>
        <div class="form-group">
          <textarea placeholder="Your Message" required></textarea>
        </div>
        <button type="submit" class="btn">Send Message</button>
      </form>
    </div>
  </section>
  
  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2025 Your Name. All rights reserved.</p>
      <div class="social-links">
        <a href="#">Instagram</a>
        <a href="#">Twitter</a>
        <a href="#">YouTube</a>
        <a href="#">TikTok</a>
      </div>
    </div>
  </footer>
  
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            window.scrollTo({
              top: target.offsetTop,
              behavior: 'smooth'
            });
          }
        });
      });
      
      // Form submission handler
      const contactForm = document.querySelector('.contact-form');
      if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // In a real implementation, this would send the form data to a server
          console.log('Form submitted');
          
          // Show success message
          alert('Thank you for your message! We will get back to you soon.');
          
          // Reset form
          contactForm.reset();
        });
      }
    });
  </script>
</body>
</html>
      `;
      
      // Wait a moment to simulate processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHtmlCode(wixHtml);
      setExportStatus('success');
    } catch (error) {
      console.error('Error generating Wix code:', error);
      setExportStatus('error');
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlCode)
      .then(() => {
        alert('Code copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy code:', err);
      });
  };
  
  const downloadHtmlFile = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'website-for-wix.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold">Export for Wix</h1>
          <p className="text-gray-400">Generate and export your website code for Wix integration</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-2xl font-heading font-bold mb-4">Website Code</h2>
              
              {exportStatus === 'idle' && (
                <div className="bg-black rounded-lg p-8 flex flex-col items-center justify-center h-96">
                  <p className="text-gray-400 mb-6">Click the button below to generate your website code for Wix</p>
                  <button
                    onClick={generateWixCode}
                    className="px-6 py-3 bg-neon-blue text-black rounded-md font-bold"
                  >
                    Generate Wix Code
                  </button>
                </div>
              )}
              
              {exportStatus === 'generating' && (
                <div className="bg-black rounded-lg p-8 flex flex-col items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neon-blue mb-4"></div>
                  <p className="text-gray-400">Generating your website code...</p>
                </div>
              )}
              
              {exportStatus === 'success' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium">HTML Code</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={copyToClipboard}
                        className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80"
                      >
                        Copy Code
                      </button>
                      <button
                        onClick={downloadHtmlFile}
                        className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80"
                      >
                        Download File
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-black p-4 rounded-lg h-96 overflow-auto">
                    <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                      {htmlCode}
                    </pre>
                  </div>
                </div>
              )}
              
              {exportStatus === 'error' && (
                <div className="bg-black rounded-lg p-8 flex flex-col items-center justify-center h-96">
                  <div className="text-red-500 mb-4">
                    <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-red-400 mb-6">Error generating website code</p>
                  <button
                    onClick={generateWixCode}
                    className="px-6 py-3 bg-neon-blue text-black rounded-md font-bold"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-2xl font-heading font-bold mb-4">Wix Integration Guide</h2>
              
              <div className="space-y-6">
                <div className={`${integrationStep === 1 ? 'bg-dark-purple' : 'bg-black'} p-4 rounded-lg`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-neon-blue mr-2">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-neon-blue text-black font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Generate the HTML Code</h3>
                      <p className="text-gray-300 text-sm">
                        Click the "Generate Wix Code" button to create the HTML code for your website.
                      </p>
                      {integrationStep === 1 && (
                        <button
                          onClick={() => setIntegrationStep(2)}
                          className="mt-3 text-neon-blue text-sm hover:underline"
                        >
                          Next Step →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className={`${integrationStep === 2 ? 'bg-dark-purple' : 'bg-black'} p-4 rounded-lg`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-neon-blue mr-2">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-neon-blue text-black font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Log in to Your Wix Account</h3>
                      <p className="text-gray-300 text-sm">
                        Go to ventarosales.com and log in to your Wix account to access the editor.
                      </p>
                      {integrationStep === 2 && (
                        <div className="flex justify-between mt-3">
                          <button
                            onClick={() => setIntegrationStep(1)}
                            className="text-gray-400 text-sm hover:underline"
                          >
                            ← Previous
                          </button>
                          <button
                            onClick={() => setIntegrationStep(3)}
                            className="text-neon-blue text-sm hover:underline"
                          >
                            Next Step →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className={`${integrationStep === 3 ? 'bg-dark-purple' : 'bg-black'} p-4 rounded-lg`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-neon-blue mr-2">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-neon-blue text-black font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Add HTML iFrame Component</h3>
                      <p className="text-gray-300 text-sm">
                        In the Wix editor, click the "+" button to add a new element, then search for "HTML iFrame" and add it to your page.
                      </p>
                      {integrationStep === 3 && (
                        <div className="flex justify-between mt-3">
                          <button
                            onClick={() => setIntegrationStep(2)}
                            className="text-gray-400 text-sm hover:underline"
                          >
                            ← Previous
                          </button>
                          <button
                            onClick={() => setIntegrationStep(4)}
                            className="text-neon-blue text-sm hover:underline"
                          >
                            Next Step →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className={`${integrationStep === 4 ? 'bg-dark-purple' : 'bg-black'} p-4 rounded-lg`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-neon-blue mr-2">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-neon-blue text-black font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Paste Your HTML Code</h3>
                      <p className="text-gray-300 text-sm">
                        Click on the HTML iFrame component to edit it, then paste the generated HTML code into the editor.
                      </p>
                      {integrationStep === 4 && (
                        <div className="flex justify-between mt-3">
                          <button
                            onClick={() => setIntegrationStep(3)}
                            className="text-gray-400 text-sm hover:underline"
                          >
                            ← Previous
                          </button>
                          <button
                            onClick={() => setIntegrationStep(5)}
                            className="text-neon-blue text-sm hover:underline"
                          >
                            Next Step →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className={`${integrationStep === 5 ? 'bg-dark-purple' : 'bg-black'} p-4 rounded-lg`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-neon-blue mr-2">
                      <span className="flex items-center justify-center h-6 w-6 rounded-full bg-neon-blue text-black font-bold text-sm">5</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Publish Your Wix Site</h3>
                      <p className="text-gray-300 text-sm">
                        Click the "Publish" button in the top-right corner of the Wix editor to make your changes live.
                      </p>
                      {integrationStep === 5 && (
                        <div className="flex justify-between mt-3">
                          <button
                            onClick={() => setIntegrationStep(4)}
                            className="text-gray-400 text-sm hover:underline"
                          >
                            ← Previous
                          </button>
                          <button
                            onClick={() => setIntegrationStep(1)}
                            className="text-neon-blue text-sm hover:underline"
                          >
                            Start Over
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">Need Help?</h2>
              <p className="text-gray-300 mb-4">
                If you need assistance with integrating your website into Wix, feel free to contact our support team.
              </p>
              <a
                href="/templates"
                className="block w-full px-4 py-2 bg-dark-purple border border-neon-blue rounded text-center hover:bg-opacity-80"
              >
                Back to Templates
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/app/auth/page.tsx
```
"use client";

import React, { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full bg-grey p-8 rounded-lg">
        <h1 className="text-3xl font-heading font-bold mb-6 text-center">
          {isLogin ? 'Log In' : 'Sign Up'}
        </h1>
        
        <form className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                className="w-full p-3 bg-black border border-dark-purple rounded-md"
                placeholder="John Doe"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-black border border-dark-purple rounded-md"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-black border border-dark-purple rounded-md"
              placeholder="••••••••"
            />
          </div>
          
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full p-3 bg-black border border-dark-purple rounded-md"
                placeholder="••••••••"
              />
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 bg-neon-blue text-black rounded-md font-bold"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-neon-blue hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
```

## File: src/app/auth/login/page.tsx
```
"use client";

import React from 'react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full bg-grey p-8 rounded-lg">
        <h1 className="text-3xl font-heading font-bold mb-6 text-center">Log In</h1>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-black border border-dark-purple rounded-md"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-black border border-dark-purple rounded-md"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 bg-black border-dark-purple rounded"
              />
              <label htmlFor="remember-me" className="ml-2 text-sm">
                Remember me
              </label>
            </div>
            
            <a href="#" className="text-sm text-neon-blue hover:underline">
              Forgot password?
            </a>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-neon-blue text-black rounded-md font-bold"
          >
            Log In
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/auth" className="text-neon-blue hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
```

## File: src/app/admin/payments/page.tsx
```
"use client";

import { useState } from 'react';

export default function PaymentsPage() {
  const [dateRange, setDateRange] = useState('all');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock payment data
  const payments = [
    {
      id: 'PAY-001',
      date: '2025-04-20',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: 50.00,
      status: 'completed',
      website: 'Fashion Portfolio Elite'
    },
    {
      id: 'PAY-002',
      date: '2025-04-15',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      amount: 45.00, // With discount
      status: 'completed',
      website: 'Beauty Blog Premium'
    },
    {
      id: 'PAY-003',
      date: '2025-04-10',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      amount: 50.00,
      status: 'processing',
      website: 'Fitness Coach Pro'
    },
    {
      id: 'PAY-004',
      date: '2025-04-05',
      customer: 'Sarah Williams',
      email: 'sarah@example.com',
      amount: 50.00,
      status: 'completed',
      website: 'Travel Blog Elite'
    },
    {
      id: 'PAY-005',
      date: '2025-04-01',
      customer: 'David Brown',
      email: 'david@example.com',
      amount: 50.00,
      status: 'failed',
      website: 'Gaming Streamer Pro'
    }
  ];
  
  const filteredPayments = payments.filter(payment => {
    // Filter by date range
    if (dateRange !== 'all') {
      const paymentDate = new Date(payment.date);
      const today = new Date();
      
      if (dateRange === 'today') {
        const isToday = paymentDate.toDateString() === today.toDateString();
        if (!isToday) return false;
      } else if (dateRange === 'week') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
        if (paymentDate < oneWeekAgo) return false;
      } else if (dateRange === 'month') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);
        if (paymentDate < oneMonthAgo) return false;
      }
    }
    
    // Filter by payment status
    if (paymentStatus !== 'all' && payment.status !== paymentStatus) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        payment.id.toLowerCase().includes(query) ||
        payment.customer.toLowerCase().includes(query) ||
        payment.email.toLowerCase().includes(query) ||
        payment.website.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const totalRevenue = filteredPayments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">Payments</h1>
          <p className="text-gray-400">Manage and track all payment transactions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-grey rounded-lg p-6">
            <h3 className="text-lg font-heading font-bold mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-neon-blue">${totalRevenue.toFixed(2)}</p>
            <p className="text-sm text-gray-400">From {filteredPayments.filter(p => p.status === 'completed').length} completed payments</p>
          </div>
          
          <div className="bg-grey rounded-lg p-6">
            <h3 className="text-lg font-heading font-bold mb-2">Pending Payments</h3>
            <p className="text-3xl font-bold text-yellow-500">
              {filteredPayments.filter(p => p.status === 'processing').length}
            </p>
            <p className="text-sm text-gray-400">Payments awaiting processing</p>
          </div>
          
          <div className="bg-grey rounded-lg p-6">
            <h3 className="text-lg font-heading font-bold mb-2">Failed Payments</h3>
            <p className="text-3xl font-bold text-red-500">
              {filteredPayments.filter(p => p.status === 'failed').length}
            </p>
            <p className="text-sm text-gray-400">Payments that failed to process</p>
          </div>
        </div>
        
        <div className="bg-grey rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full md:w-auto p-2 bg-black border border-dark-purple rounded-md"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full md:w-auto p-2 bg-black border border-dark-purple rounded-md"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, customer, email..."
                className="w-full md:w-64 p-2 bg-black border border-dark-purple rounded-md"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-purple">
                  <th className="py-3 text-left">ID</th>
                  <th className="py-3 text-left">Date</th>
                  <th className="py-3 text-left">Customer</th>
                  <th className="py-3 text-left">Website</th>
                  <th className="py-3 text-left">Amount</th>
                  <th className="py-3 text-left">Status</th>
                  <th className="py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map(payment => (
                  <tr key={payment.id} className="border-b border-dark-purple">
                    <td className="py-3">{payment.id}</td>
                    <td className="py-3">{new Date(payment.date).toLocaleDateString()}</td>
                    <td className="py-3">
                      <div>{payment.customer}</div>
                      <div className="text-xs text-gray-400">{payment.email}</div>
                    </td>
                    <td className="py-3">{payment.website}</td>
                    <td className="py-3 font-bold">${payment.amount.toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        payment.status === 'completed' 
                          ? 'bg-green-900 text-green-500' 
                          : payment.status === 'processing'
                            ? 'bg-yellow-900 text-yellow-500'
                            : 'bg-red-900 text-red-500'
                      }`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3">
                      <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPayments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No payments found matching your filters</p>
            </div>
          )}
        </div>
        
        <div className="bg-grey rounded-lg p-6">
          <h2 className="text-xl font-heading font-bold mb-6">Payment Analytics</h2>
          
          <div className="h-64 bg-black rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Payment analytics chart will display here</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400">Conversion Rate</p>
              <p className="text-xl font-bold">92%</p>
            </div>
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400">Avg. Order Value</p>
              <p className="text-xl font-bold">$49.00</p>
            </div>
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400">Monthly Growth</p>
              <p className="text-xl font-bold text-green-500">+15%</p>
            </div>
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400">Refund Rate</p>
              <p className="text-xl font-bold text-green-500">0%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/app/admin/layout.tsx
```
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <div className="w-64 bg-grey border-r border-dark-purple">
        <div className="p-4 border-b border-dark-purple">
          <h1 className="text-xl font-heading font-bold text-neon-blue">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/admin" className="block p-2 rounded hover:bg-dark-purple">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/templates" className="block p-2 rounded hover:bg-dark-purple">
                Templates
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="block p-2 rounded hover:bg-dark-purple">
                Users
              </Link>
            </li>
            <li>
              <Link href="/admin/payments" className="block p-2 rounded hover:bg-dark-purple">
                Payments
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="block p-2 rounded hover:bg-dark-purple">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-grey border-b border-dark-purple p-4 flex justify-between items-center">
          <h2 className="text-lg font-heading">Website Generator Admin</h2>
          <div className="flex items-center space-x-4">
            <span>Admin User</span>
            <button className="p-2 rounded hover:bg-dark-purple">Logout</button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 bg-black">
          {children}
        </main>
      </div>
    </div>
  );
}
```

## File: src/app/admin/users/page.tsx
```
"use client";

import { useState } from 'react';

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  // Mock user data
  const users = [
    {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      websites: 3,
      joined: '2025-03-15',
      lastActive: '2025-04-23'
    },
    {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      status: 'active',
      websites: 2,
      joined: '2025-03-10',
      lastActive: '2025-04-22'
    },
    {
      id: 'user-3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'user',
      status: 'inactive',
      websites: 1,
      joined: '2025-03-05',
      lastActive: '2025-04-10'
    },
    {
      id: 'user-4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'admin',
      status: 'active',
      websites: 5,
      joined: '2025-02-28',
      lastActive: '2025-04-24'
    },
    {
      id: 'user-5',
      name: 'David Brown',
      email: 'david@example.com',
      role: 'user',
      status: 'pending',
      websites: 0,
      joined: '2025-04-20',
      lastActive: '2025-04-20'
    }
  ];
  
  const filteredUsers = users.filter(user => {
    // Filter by status/role
    if (activeTab === 'active' && user.status !== 'active') {
      return false;
    } else if (activeTab === 'inactive' && user.status !== 'inactive') {
      return false;
    } else if (activeTab === 'pending' && user.status !== 'pending') {
      return false;
    } else if (activeTab === 'admin' && user.role !== 'admin') {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.joined).getTime() - new Date(a.joined).getTime();
    } else if (sortBy === 'active') {
      return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
    } else if (sortBy === 'websites') {
      return b.websites - a.websites;
    }
    return 0;
  });
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">Users</h1>
          <p className="text-gray-400">Manage user accounts and permissions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-grey rounded-lg p-6 text-center">
            <h3 className="text-lg font-heading font-bold mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-neon-blue">{users.length}</p>
            <p className="text-sm text-gray-400">Registered accounts</p>
          </div>
          
          <div className="bg-grey rounded-lg p-6 text-center">
            <h3 className="text-lg font-heading font-bold mb-2">Active Users</h3>
            <p className="text-3xl font-bold text-green-500">
              {users.filter(u => u.status === 'active').length}
            </p>
            <p className="text-sm text-gray-400">Currently active accounts</p>
          </div>
          
          <div className="bg-grey rounded-lg p-6 text-center">
            <h3 className="text-lg font-heading font-bold mb-2">Websites Created</h3>
            <p className="text-3xl font-bold text-neon-blue">
              {users.reduce((sum, user) => sum + user.websites, 0)}
            </p>
            <p className="text-sm text-gray-400">Total websites by all users</p>
          </div>
          
          <div className="bg-grey rounded-lg p-6 text-center">
            <h3 className="text-lg font-heading font-bold mb-2">Admins</h3>
            <p className="text-3xl font-bold text-purple-500">
              {users.filter(u => u.role === 'admin').length}
            </p>
            <p className="text-sm text-gray-400">Administrator accounts</p>
          </div>
        </div>
        
        <div className="bg-grey rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-heading font-bold">User Management</h2>
            <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">
              Add New User
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
            <div className="flex overflow-x-auto pb-2 md:pb-0">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'all' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                All Users
              </button>
              <button 
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'active' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Active
              </button>
              <button 
                onClick={() => setActiveTab('inactive')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'inactive' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Inactive
              </button>
              <button 
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'pending' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Pending
              </button>
              <button 
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'admin' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Admins
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 bg-black border border-dark-purple rounded-md"
                >
                  <option value="newest">Newest</option>
                  <option value="active">Recently Active</option>
                  <option value="websites">Most Websites</option>
                </select>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="w-full md:w-64 p-2 pl-8 bg-black border border-dark-purple rounded-md"
                />
                <svg className="w-4 h-4 absolute left-2 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-purple">
                  <th className="py-3 text-left">User</th>
                  <th className="py-3 text-left">Role</th>
                  <th className="py-3 text-left">Status</th>
                  <th className="py-3 text-left">Websites</th>
                  <th className="py-3 text-left">Joined</th>
                  <th className="py-3 text-left">Last Active</th>
                  <th className="py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map(user => (
                  <tr key={user.id} className="border-b border-dark-purple">
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-dark-purple flex items-center justify-center mr-3">
                          <span className="text-sm font-bold">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <div>{user.name}</div>
                          <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'admin' 
                          ? 'bg-purple-900 text-purple-500' 
                          : 'bg-dark-purple text-gray-300'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'active' 
                          ? 'bg-green-900 text-green-500' 
                          : user.status === 'inactive'
                            ? 'bg-red-900 text-red-500'
                            : 'bg-yellow-900 text-yellow-500'
                      }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3">{user.websites}</td>
                    <td className="py-3">{new Date(user.joined).toLocaleDateString()}</td>
                    <td className="py-3">{new Date(user.lastActive).toLocaleDateString()}</td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 bg-dark-purple rounded text-xs hover:bg-opacity-80">
                          View
                        </button>
                        <button className="px-2 py-1 bg-dark-purple rounded text-xs hover:bg-opacity-80">
                          Edit
                        </button>
                        <button className="px-2 py-1 bg-neon-blue text-black rounded text-xs font-bold">
                          Manage
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {sortedUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No users found matching your filters</p>
            </div>
          )}
        </div>
        
        <div className="bg-grey rounded-lg p-6">
          <h2 className="text-xl font-heading font-bold mb-6">User Activity</h2>
          
          <div className="h-64 bg-black rounded-lg flex items-center justify-center">
            <p className="text-gray-400">User activity chart will display here</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400">Avg. Websites per User</p>
              <p className="text-xl font-bold">
                {(users.reduce((sum, user) => sum + user.websites, 0) / users.length).toFixed(1)}
              </p>
            </div>
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400">User Growth</p>
              <p className="text-xl font-bold text-green-500">+24%</p>
            </div>
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400">Retention Rate</p>
              <p className="text-xl font-bold">85%</p>
            </div>
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-sm text-gray-400">Active Today</p>
              <p className="text-xl font-bold">3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/app/admin/templates/page.tsx
```
"use client";

import { useState } from 'react';

export default function TemplatesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  // Mock template data
  const templates = [
    {
      id: 'template-1',
      name: 'Fashion Portfolio Elite',
      category: 'fashion',
      thumbnail: '/assets/templates/fashion1.jpg',
      downloads: 245,
      rating: 4.8,
      date: '2025-03-15'
    },
    {
      id: 'template-2',
      name: 'Beauty Blog Premium',
      category: 'beauty',
      thumbnail: '/assets/templates/beauty1.jpg',
      downloads: 189,
      rating: 4.7,
      date: '2025-03-10'
    },
    {
      id: 'template-3',
      name: 'Fitness Coach Pro',
      category: 'fitness',
      thumbnail: '/assets/templates/fitness1.jpg',
      downloads: 156,
      rating: 4.6,
      date: '2025-03-05'
    },
    {
      id: 'template-4',
      name: 'Travel Explorer',
      category: 'travel',
      thumbnail: '/assets/templates/travel1.jpg',
      downloads: 132,
      rating: 4.5,
      date: '2025-02-28'
    },
    {
      id: 'template-5',
      name: 'Gaming Streamer Hub',
      category: 'gaming',
      thumbnail: '/assets/templates/gaming1.jpg',
      downloads: 118,
      rating: 4.4,
      date: '2025-02-20'
    }
  ];
  
  const filteredTemplates = templates.filter(template => {
    // Filter by category
    if (activeTab !== 'all' && template.category !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return template.name.toLowerCase().includes(query);
    }
    
    return true;
  });
  
  // Sort templates
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'popular') {
      return b.downloads - a.downloads;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">Templates</h1>
          <p className="text-gray-400">Manage and create website templates</p>
        </div>
        
        <div className="bg-grey rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-heading font-bold">Template Library</h2>
            <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">
              Add New Template
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
            <div className="flex overflow-x-auto pb-2 md:pb-0">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'all' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveTab('fashion')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'fashion' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Fashion
              </button>
              <button 
                onClick={() => setActiveTab('beauty')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'beauty' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Beauty
              </button>
              <button 
                onClick={() => setActiveTab('fitness')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'fitness' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Fitness
              </button>
              <button 
                onClick={() => setActiveTab('travel')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'travel' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Travel
              </button>
              <button 
                onClick={() => setActiveTab('gaming')}
                className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                  activeTab === 'gaming' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Gaming
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 bg-black border border-dark-purple rounded-md"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="w-full md:w-64 p-2 pl-8 bg-black border border-dark-purple rounded-md"
                />
                <svg className="w-4 h-4 absolute left-2 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTemplates.map(template => (
              <div key={template.id} className="bg-black rounded-lg overflow-hidden">
                <div className="h-40 bg-dark-purple flex items-center justify-center">
                  <span className="text-neon-blue font-bold">{template.name}</span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-heading font-bold">{template.name}</h3>
                    <span className="px-2 py-1 bg-dark-purple rounded-full text-xs capitalize">
                      {template.category}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 mb-4">
                    <span>{template.downloads} downloads</span>
                    <span>★ {template.rating}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                      Edit
                    </button>
                    <button className="flex-1 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                      Preview
                    </button>
                    <button className="flex-1 py-1 bg-neon-blue text-black rounded text-sm font-bold">
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {sortedTemplates.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No templates found matching your filters</p>
            </div>
          )}
        </div>
        
        <div className="bg-grey rounded-lg p-6">
          <h2 className="text-xl font-heading font-bold mb-6">Template Analytics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-black rounded-lg p-4">
              <h3 className="font-heading font-bold mb-2">Most Popular Template</h3>
              <p className="text-lg">{templates.sort((a, b) => b.downloads - a.downloads)[0].name}</p>
              <p className="text-sm text-gray-400">{templates.sort((a, b) => b.downloads - a.downloads)[0].downloads} downloads</p>
            </div>
            
            <div className="bg-black rounded-lg p-4">
              <h3 className="font-heading font-bold mb-2">Highest Rated Template</h3>
              <p className="text-lg">{templates.sort((a, b) => b.rating - a.rating)[0].name}</p>
              <p className="text-sm text-gray-400">★ {templates.sort((a, b) => b.rating - a.rating)[0].rating}</p>
            </div>
            
            <div className="bg-black rounded-lg p-4">
              <h3 className="font-heading font-bold mb-2">Total Templates</h3>
              <p className="text-lg">{templates.length}</p>
              <p className="text-sm text-gray-400">Across {new Set(templates.map(t => t.category)).size} categories</p>
            </div>
          </div>
          
          <div className="h-64 bg-black rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Template analytics chart will display here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/app/admin/page.tsx
```
export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <button className="btn-primary px-4 py-2 rounded-md">Create New Template</button>
          <button className="bg-dark-purple px-4 py-2 rounded-md border border-neon-blue">View Analytics</button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-grey p-6 rounded-lg border-l-4 border-neon-blue">
          <h3 className="text-lg font-heading mb-2">Total Users</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-grey p-6 rounded-lg border-l-4 border-dark-purple">
          <h3 className="text-lg font-heading mb-2">Active Websites</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-grey p-6 rounded-lg border-l-4 border-neon-blue">
          <h3 className="text-lg font-heading mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold">$0</p>
        </div>
        <div className="bg-grey p-6 rounded-lg border-l-4 border-dark-purple">
          <h3 className="text-lg font-heading mb-2">Templates</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-grey rounded-lg p-6">
        <h2 className="text-xl font-heading font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <p className="text-gray-400 italic">No recent activity</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-grey rounded-lg p-6">
          <h2 className="text-xl font-heading font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-dark-purple rounded-lg hover:bg-opacity-80 transition-all">
              <span className="block text-lg font-bold mb-2">Add Template</span>
              <span className="text-sm">Upload a new website template</span>
            </button>
            <button className="p-4 bg-dark-purple rounded-lg hover:bg-opacity-80 transition-all">
              <span className="block text-lg font-bold mb-2">User Management</span>
              <span className="text-sm">Manage user accounts</span>
            </button>
            <button className="p-4 bg-dark-purple rounded-lg hover:bg-opacity-80 transition-all">
              <span className="block text-lg font-bold mb-2">Site Settings</span>
              <span className="text-sm">Configure platform settings</span>
            </button>
            <button className="p-4 bg-dark-purple rounded-lg hover:bg-opacity-80 transition-all">
              <span className="block text-lg font-bold mb-2">View Reports</span>
              <span className="text-sm">Analytics and reporting</span>
            </button>
          </div>
        </div>
        
        <div className="bg-grey rounded-lg p-6">
          <h2 className="text-xl font-heading font-bold mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Server Status</span>
              <span className="px-2 py-1 bg-green-500 text-black rounded-full text-xs">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Database</span>
              <span className="px-2 py-1 bg-green-500 text-black rounded-full text-xs">Connected</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Storage</span>
              <span className="px-2 py-1 bg-green-500 text-black rounded-full text-xs">0% Used</span>
            </div>
            <div className="flex justify-between items-center">
              <span>API Services</span>
              <span className="px-2 py-1 bg-green-500 text-black rounded-full text-xs">Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <div className="bg-dark-purple rounded-lg p-6 border border-neon-blue">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center">
            <span className="text-black font-bold">AI</span>
          </div>
          <h2 className="text-xl font-heading font-bold">AI Assistant</h2>
        </div>
        <p className="mb-4">Use our AI assistant to help manage your platform and generate content.</p>
        <div className="flex">
          <input 
            type="text" 
            placeholder="Ask the AI assistant..." 
            className="flex-1 p-3 rounded-l-md bg-grey border-0 focus:ring-2 focus:ring-neon-blue"
          />
          <button className="bg-neon-blue text-black px-4 py-2 rounded-r-md font-bold">Ask</button>
        </div>
      </div>
    </div>
  );
}
```

## File: src/app/admin/editor/page.tsx
```
"use client";

import { useState } from 'react';

export default function WebsiteEditor() {
  const [activeTab, setActiveTab] = useState('design');
  const [selectedElement, setSelectedElement] = useState(null);
  const [showCode, setShowCode] = useState(false);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">Website Editor</h1>
          <p className="text-gray-400">Customize your website design and content</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 space-y-6">
            <div className="bg-grey rounded-lg p-4">
              <h3 className="font-heading font-bold mb-4">Tools</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('design')}
                  className={`w-full py-2 px-3 rounded-md text-left ${
                    activeTab === 'design' 
                      ? 'bg-neon-blue text-black font-bold' 
                      : 'bg-dark-purple hover:bg-opacity-80'
                  }`}
                >
                  Design
                </button>
                <button 
                  onClick={() => setActiveTab('elements')}
                  className={`w-full py-2 px-3 rounded-md text-left ${
                    activeTab === 'elements' 
                      ? 'bg-neon-blue text-black font-bold' 
                      : 'bg-dark-purple hover:bg-opacity-80'
                  }`}
                >
                  Elements
                </button>
                <button 
                  onClick={() => setActiveTab('pages')}
                  className={`w-full py-2 px-3 rounded-md text-left ${
                    activeTab === 'pages' 
                      ? 'bg-neon-blue text-black font-bold' 
                      : 'bg-dark-purple hover:bg-opacity-80'
                  }`}
                >
                  Pages
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full py-2 px-3 rounded-md text-left ${
                    activeTab === 'settings' 
                      ? 'bg-neon-blue text-black font-bold' 
                      : 'bg-dark-purple hover:bg-opacity-80'
                  }`}
                >
                  Settings
                </button>
                <button 
                  onClick={() => setShowCode(!showCode)}
                  className={`w-full py-2 px-3 rounded-md text-left ${
                    showCode 
                      ? 'bg-neon-blue text-black font-bold' 
                      : 'bg-dark-purple hover:bg-opacity-80'
                  }`}
                >
                  Code Editor
                </button>
              </div>
            </div>
            
            {activeTab === 'design' && (
              <div className="bg-grey rounded-lg p-4">
                <h3 className="font-heading font-bold mb-4">Design Options</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Color Scheme</label>
                    <select className="w-full p-2 bg-black border border-dark-purple rounded-md">
                      <option value="dark">Dark Theme</option>
                      <option value="light">Light Theme</option>
                      <option value="colorful">Colorful</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Typography</label>
                    <select className="w-full p-2 bg-black border border-dark-purple rounded-md">
                      <option value="modern">Modern</option>
                      <option value="classic">Classic</option>
                      <option value="bold">Bold</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Layout</label>
                    <select className="w-full p-2 bg-black border border-dark-purple rounded-md">
                      <option value="default">Default</option>
                      <option value="alternative">Alternative</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'elements' && (
              <div className="bg-grey rounded-lg p-4">
                <h3 className="font-heading font-bold mb-4">Elements</h3>
                <div className="space-y-2">
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Header
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Hero Section
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    About Section
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Gallery
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Services
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Testimonials
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Contact Form
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Footer
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'pages' && (
              <div className="bg-grey rounded-lg p-4">
                <h3 className="font-heading font-bold mb-4">Pages</h3>
                <div className="space-y-2">
                  <div className="p-2 bg-neon-blue text-black rounded-md font-bold">
                    Home
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    About
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Services
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Portfolio
                  </div>
                  <div className="p-2 bg-dark-purple rounded-md cursor-pointer hover:bg-opacity-80">
                    Contact
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full py-2 bg-dark-purple rounded-md hover:bg-opacity-80">
                    + Add New Page
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="bg-grey rounded-lg p-4">
                <h3 className="font-heading font-bold mb-4">Website Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Website Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 bg-black border border-dark-purple rounded-md"
                      placeholder="My Fashion Portfolio"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Tagline</label>
                    <input 
                      type="text" 
                      className="w-full p-2 bg-black border border-dark-purple rounded-md"
                      placeholder="Fashion Influencer & Stylist"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Favicon</label>
                    <button className="w-full py-2 bg-dark-purple rounded-md hover:bg-opacity-80">
                      Upload Favicon
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">SEO Settings</label>
                    <button className="w-full py-2 bg-dark-purple rounded-md hover:bg-opacity-80">
                      Configure SEO
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="bg-grey rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                    Desktop
                  </button>
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                    Tablet
                  </button>
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                    Mobile
                  </button>
                </div>
                <div>
                  <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">
                    Preview
                  </button>
                </div>
              </div>
              
              {!showCode ? (
                <div className="bg-black rounded-lg h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-400 mb-4">Website Preview</p>
                    <p className="text-sm text-gray-500">Visual editor will display here</p>
                  </div>
                </div>
              ) : (
                <div className="bg-black rounded-lg h-[600px] p-4">
                  <div className="flex space-x-2 mb-4">
                    <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                      HTML
                    </button>
                    <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                      CSS
                    </button>
                    <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                      JavaScript
                    </button>
                  </div>
                  <div className="font-mono text-sm text-gray-300 overflow-auto h-[520px] p-2">
                    <pre>{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fashion Portfolio</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <div class="container">
      <h1>Fashion Portfolio</h1>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <section id="hero">
    <div class="container">
      <h2>Fashion Influencer & Stylist</h2>
      <p>Creating trends and inspiring styles since 2020</p>
      <a href="#portfolio" class="btn">View My Work</a>
    </div>
  </section>

  <!-- More sections would be here -->

  <footer>
    <div class="container">
      <p>&copy; 2025 Fashion Portfolio. All rights reserved.</p>
    </div>
  </footer>
  
  <script src="script.js"></script>
</body>
</html>`}</pre>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-4">
                <button className="px-4 py-2 bg-dark-purple rounded hover:bg-opacity-80">
                  Save Draft
                </button>
                <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/app/checkout/page.tsx
```
"use client";

import React, { useState } from 'react';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">Checkout</h1>
          <p className="text-gray-400">Complete your purchase</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-grey rounded-lg p-6">
              <div className="flex items-center mb-8">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-neon-blue text-black' : 'bg-dark-purple text-white'}`}>
                  1
                </div>
                <div className={`h-1 flex-1 mx-2 ${step >= 2 ? 'bg-neon-blue' : 'bg-dark-purple'}`}></div>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-neon-blue text-black' : 'bg-dark-purple text-white'}`}>
                  2
                </div>
              </div>
              
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-heading font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-4 bg-black rounded-lg">
                      <div className="flex items-center">
                        <div className="h-16 w-16 bg-dark-purple rounded flex items-center justify-center mr-4">
                          <span className="text-neon-blue">Template</span>
                        </div>
                        <div>
                          <h3 className="font-medium">Fashion Portfolio Elite</h3>
                          <p className="text-sm text-gray-400">Premium template for fashion influencers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-neon-blue font-bold">$50.00</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-dark-purple pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>$50.00</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-neon-blue">$50.00</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-3 bg-neon-blue text-black rounded-md font-bold"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}
              
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-heading font-bold mb-4">Payment Information</h2>
                  
                  <form className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        className="w-full p-3 bg-black border border-dark-purple rounded-md"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiration Date</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-black border border-dark-purple rounded-md"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVC</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-black border border-dark-purple rounded-md"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Name on Card</label>
                      <input
                        type="text"
                        className="w-full p-3 bg-black border border-dark-purple rounded-md"
                        placeholder="John Doe"
                      />
                    </div>
                  </form>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 bg-dark-purple border border-neon-blue rounded-md"
                    >
                      Back
                    </button>
                    <button
                      className="flex-1 py-3 bg-neon-blue text-black rounded-md font-bold"
                    >
                      Complete Purchase
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$50.00</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-neon-blue">$50.00</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-dark-purple">
                <h3 className="font-medium mb-2">Have a coupon?</h3>
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 p-2 bg-black border border-dark-purple rounded-l-md"
                    placeholder="Enter code"
                  />
                  <button className="px-4 py-2 bg-dark-purple rounded-r-md">
                    Apply
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">Need Help?</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about your purchase, feel free to contact our support team.
              </p>
              <a
                href="/templates"
                className="block w-full px-4 py-2 bg-dark-purple border border-neon-blue rounded text-center hover:bg-opacity-80"
              >
                Back to Templates
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/app/dashboard/page.tsx
```
"use client";

import React from 'react';
import { useAuth } from '../../components/auth/AuthContext';
import UserProfile from '../../components/auth/UserProfile';
import OrderHistory from '../../components/payment/OrderHistory';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
        <header className="py-6 px-4 border-b border-dark-purple">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-heading font-bold text-neon-blue">
              Website Generator
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/templates" className="hover:text-neon-blue">
                Templates
              </Link>
              <Link href="/dashboard" className="hover:text-neon-blue">
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="px-4 py-2 bg-dark-purple rounded hover:bg-opacity-80"
              >
                Log Out
              </button>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
            <p className="text-gray-400">Manage your websites and account</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-grey rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold mb-6">My Websites</h2>
                
                <div className="space-y-4">
                  <div className="bg-black rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-heading font-bold">Fashion Portfolio Elite</h3>
                      <span className="px-2 py-1 bg-green-900 text-green-500 text-xs rounded-full">Live</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">fashion-portfolio.example.com</p>
                    <div className="flex space-x-3">
                      <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                        Preview
                      </button>
                      <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">
                        Manage
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-black rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-heading font-bold">Beauty Blog Premium</h3>
                      <span className="px-2 py-1 bg-green-900 text-green-500 text-xs rounded-full">Live</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">beauty-blog.example.com</p>
                    <div className="flex space-x-3">
                      <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                        Preview
                      </button>
                      <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">
                        Manage
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-black rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-heading font-bold">Fitness Coach Pro</h3>
                      <span className="px-2 py-1 bg-yellow-900 text-yellow-500 text-xs rounded-full">In Progress</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">Not published yet</p>
                    <div className="flex space-x-3">
                      <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80">
                        Preview
                      </button>
                      <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Link 
                    href="/templates" 
                    className="px-4 py-2 bg-neon-blue text-black rounded font-bold inline-block"
                  >
                    Create New Website
                  </Link>
                </div>
              </div>
              
              <OrderHistory userId={user?.id} />
            </div>
            
            <div className="lg:col-span-1 space-y-8">
              <UserProfile userId={user?.id} />
              
              <div className="bg-grey rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold mb-6">Quick Stats</h2>
                
                <div className="space-y-4">
                  <div className="bg-black rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Websites</span>
                      <span className="font-bold">3</span>
                    </div>
                  </div>
                  
                  <div className="bg-black rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Published Websites</span>
                      <span className="font-bold">2</span>
                    </div>
                  </div>
                  
                  <div className="bg-black rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Visitors</span>
                      <span className="font-bold">1,245</span>
                    </div>
                  </div>
                  
                  <div className="bg-black rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Account Status</span>
                      <span className="px-2 py-1 bg-green-900 text-green-500 text-xs rounded-full">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="py-6 px-4 border-t border-dark-purple">
          <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Website Generator. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
```

## File: src/app/generator/[id]/page.tsx
```
"use client";

import React, { useState, useEffect } from 'react';
import { templates } from '../../../components/templates/templateData';
import { WebsiteGeneratorServiceImpl } from '../../../components/generator/WebsiteGeneratorService';

export default function GeneratorPage({ params }: { params: { id: string } }) {
  // Find the template by ID
  const template = templates.find(t => t.id === params.id) || templates[0];
  
  const [activeTab, setActiveTab] = useState('preview');
  const [generatedCode, setGeneratedCode] = useState({
    html: '',
    css: '',
    js: ''
  });
  const [customizations, setCustomizations] = useState({
    colorScheme: 'dark',
    typography: 'modern',
    layout: 'default',
    sections: {
      header: { enabled: true },
      hero: { enabled: true },
      about: { enabled: true },
      portfolio: { enabled: true },
      gallery: { enabled: true },
      services: { enabled: true },
      testimonials: { enabled: true },
      contact: { enabled: true },
      footer: { enabled: true }
    },
    title: template.title || template.name,
    category: template.category
  });
  
  const generatorService = new WebsiteGeneratorServiceImpl();
  
  // Generate website code on component mount
  useEffect(() => {
    const generateWebsite = async () => {
      try {
        const generated = await generatorService.generateWebsite(template, customizations);
        setGeneratedCode({
          html: generated.html,
          css: generated.css,
          js: generated.js
        });
      } catch (error) {
        console.error('Error generating website:', error);
      }
    };
    
    generateWebsite();
  }, [template, customizations]);
  
  // Handle customization changes
  const handleCustomizationChange = (key: string, value: any) => {
    setCustomizations(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Handle section toggle
  const toggleSection = (sectionName: string) => {
    setCustomizations(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionName]: { 
          ...prev.sections[sectionName as keyof typeof prev.sections],
          enabled: !prev.sections[sectionName as keyof typeof prev.sections].enabled 
        }
      }
    }));
  };
  
  // Export code for Wix
  const exportForWix = () => {
    // Create a combined HTML file with inline CSS and JS
    const wixHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${customizations.title}</title>
  <style>
${generatedCode.css}
  </style>
</head>
<body>
${generatedCode.html}
  <script>
${generatedCode.js}
  </script>
</body>
</html>
    `;
    
    // Create a download link
    const blob = new Blob([wixHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.id}-for-wix.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">{template.name}</h1>
          <p className="text-gray-400">Customize and generate your website</p>
        </div>
        
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded ${activeTab === 'customize' ? 'bg-neon-blue text-black' : 'bg-dark-purple'}`}
              onClick={() => setActiveTab('customize')}
            >
              Customize
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === 'preview' ? 'bg-neon-blue text-black' : 'bg-dark-purple'}`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === 'code' ? 'bg-neon-blue text-black' : 'bg-dark-purple'}`}
              onClick={() => setActiveTab('code')}
            >
              Code
            </button>
          </div>
        </div>
        
        {activeTab === 'customize' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-grey rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold mb-4">Template Options</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Color Scheme</label>
                    <select
                      value={customizations.colorScheme}
                      onChange={(e) => handleCustomizationChange('colorScheme', e.target.value)}
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
                      value={customizations.typography}
                      onChange={(e) => handleCustomizationChange('typography', e.target.value)}
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
                      value={customizations.layout}
                      onChange={(e) => handleCustomizationChange('layout', e.target.value)}
                      className="w-full p-2 bg-black border border-dark-purple rounded-md"
                    >
                      <option value="default">Default</option>
                      <option value="alternative">Alternative</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-grey rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold mb-4">Sections</h2>
                
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(customizations.sections).map((section) => (
                    <div key={section} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`section-${section}`}
                        className="mr-2"
                        checked={customizations.sections[section as keyof typeof customizations.sections].enabled}
                        onChange={() => toggleSection(section)}
                      />
                      <label htmlFor={`section-${section}`} className="capitalize">
                        {section}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'preview' && (
          <div className="bg-grey rounded-lg p-6">
            <div className="bg-black rounded-lg h-[600px] overflow-hidden">
              <iframe
                srcDoc={`
                  <!DOCTYPE html>
                  <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${customizations.title}</title>
                    <style>${generatedCode.css}</style>
                  </head>
                  <body>
                    ${generatedCode.html}
                    <script>${generatedCode.js}</script>
                  </body>
                  </html>
                `}
                className="w-full h-full border-0"
                title="Website Preview"
                sandbox="allow-same-origin allow-scripts"
              ></iframe>
            </div>
          </div>
        )}
        
        {activeTab === 'code' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">HTML</h2>
              <div className="bg-black p-4 rounded-lg h-[400px] overflow-auto">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                  {generatedCode.html}
                </pre>
              </div>
            </div>
            
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">CSS</h2>
              <div className="bg-black p-4 rounded-lg h-[400px] overflow-auto">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                  {generatedCode.css}
                </pre>
              </div>
            </div>
            
            <div className="bg-grey rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">JavaScript</h2>
              <div className="bg-black p-4 rounded-lg h-[400px] overflow-auto">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                  {generatedCode.js}
                </pre>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8 flex justify-between">
          <a
            href={`/templates/${params.id}/customize`}
            className="px-4 py-2 bg-dark-purple rounded hover:bg-opacity-80"
          >
            Back to Customization
          </a>
          
          <button
            onClick={exportForWix}
            className="px-4 py-2 bg-neon-blue text-black rounded font-bold"
          >
            Export for Wix
          </button>
        </div>
      </div>
    </div>
  );
}
```

## File: src/app/edit/[templateId]/page.tsx
```
"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useState } from "react";

const templateMap: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
    template1: () => import("../../../../templates/template1"),
    template2: () => import("../../../../templates/template2"),
    template3: () => import("../../../../templates/template3"),
    template4: () => import("../../../../templates/template4"),
    template5: () => import("../../../../templates/template5"),
};

export default function TemplateEditorPage() {
  const { templateId } = useParams();

  const [headline, setHeadline] = useState("Your Headline Here");
  const [subtext, setSubtext] = useState("Your Subtext Here");
  const [buttonText, setButtonText] = useState("Click Me");

  // Ensure templateId is a string
  const loader = typeof templateId === "string" ? templateMap[templateId] : undefined;
  const TemplateComponent = loader ? dynamic(loader, { ssr: false }) : null;

  if (!TemplateComponent) return <div className="p-10 text-red-500">Template not found</div>;

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-3 bg-black text-white">
      {/* Sidebar inputs */}
      <aside className="p-6 bg-gray-900 border-r border-gray-800 space-y-6">
        <h2 className="text-xl font-bold">Edit Template</h2>
        <div>
          <label className="block text-sm mb-1">Headline</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Subtext</label>
          <textarea
            value={subtext}
            onChange={(e) => setSubtext(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Button Text</label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>
      </aside>

      {/* Live preview */}
      <section className="col-span-2 p-10">
        {/* Pass both buttonText and ctaText for compatibility */}
        <TemplateComponent
          headline={headline}
          subtext={subtext}
          buttonText={buttonText}
          ctaText={buttonText}
        />
      </section>
    </main>
  );
}

```

## File: src/app/layout.tsx
```
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Website Generator Platform",
  description: "Create professional websites for influencers with our easy-to-use platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
```

## File: src/app/templates/[templateId]/page.tsx
```
// File: src/app/edit/[templateId]/page.tsx
"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useState } from "react";

const templateMap: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
  template1: () => import("@/../templates/template1"),
  template2: () => import("@/../templates/template2"),
  template3: () => import("@/../templates/template3"),
  template4: () => import("@/../templates/template4"),
  template5: () => import("@/../templates/template5"),
};

  
  

export default function TemplateEditorPage() {
  const { templateId } = useParams();

  const [headline, setHeadline] = useState("Your Headline Here");
  const [subtext, setSubtext] = useState("Your Subtext Here");
  const [buttonText, setButtonText] = useState("Click Me");

  const loader = templateMap[templateId as string];
  const TemplateComponent = loader ? dynamic(loader) : null;

  if (!TemplateComponent) return <div className="p-10 text-red-500">Template not found</div>;

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-3 bg-black text-white">
      {/* Sidebar inputs */}
      <aside className="p-6 bg-gray-900 border-r border-gray-800 space-y-6">
        <h2 className="text-xl font-bold">Edit Template</h2>
        <div>
          <label className="block text-sm mb-1">Headline</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Subtext</label>
          <textarea
            value={subtext}
            onChange={(e) => setSubtext(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Button Text</label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
          />
        </div>
      </aside>

      // ...existing code...
      {/* Live preview */}
      <section className="col-span-2 p-10">
        <TemplateComponent
          headline={headline}
          subtext={subtext}
          buttonText={buttonText}
          ctaText={buttonText} // Added for compatibility with templates expecting ctaText
        />
      </section>
    </main>
  );
}
// ...existing code...
```

## File: src/app/templates/page.tsx
```
// File: src/app/templates/page.tsx
"use client";

import { useRouter } from "next/navigation";

const templates = [
  {
    id: "template1",
    name: "Clean Hero",
    image: "https://source.unsplash.com/random/600x400?web,hero",
  },
  {
    id: "template2",
    name: "Business Starter",
    image: "https://source.unsplash.com/random/600x400?office",
  },
  {
    id: "template3",
    name: "Minimal Landing",
    image: "https://source.unsplash.com/random/600x400?minimal",
  },
  {
    id: "template4",
    name: "Portfolio Grid",
    image: "https://source.unsplash.com/random/600x400?portfolio",
  },
  {
    id: "template5",
    name: "Dark Agency",
    image: "https://source.unsplash.com/random/600x400?agency",
  },
];

export default function TemplatesPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Choose a Template</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-gray-800 rounded-xl p-4 cursor-pointer hover:shadow-xl hover:scale-105 transition"
            onClick={() => router.push(`/templates/${template.id}`)}
          >
            <img
              src={template.image}
              alt={template.name}
              className="rounded-lg mb-4 object-cover w-full h-40"
            />
            <h2 className="text-xl font-semibold">{template.name}</h2>
          </div>
        ))}
      </div>
    </main>
  );
}
```

## File: src/app/page.tsx
```
"use client";

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
            Create Professional Websites <span className="text-neon-blue">in Minutes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            The ultimate website generator for influencers. Choose from 30+ templates, customize to match your brand, and export to Wix with one click.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/templates" 
              className="px-8 py-4 bg-neon-blue text-black rounded-md font-bold text-lg hover:bg-opacity-90 transition-all"
            >
              Browse Templates
            </Link>
            <Link 
              href="/wix-export" 
              className="px-8 py-4 bg-dark-purple border border-neon-blue rounded-md text-lg hover:bg-opacity-90 transition-all"
            >
              Wix Integration
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-grey">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center mb-16">
            Powerful Features for Influencers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-black p-8 rounded-lg">
              <div className="h-16 w-16 bg-dark-purple rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="h-8 w-8 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-center mb-4">30+ Premium Templates</h3>
              <p className="text-gray-300 text-center">
                Choose from a wide range of professionally designed templates specifically created for influencers across various niches.
              </p>
            </div>
            
            <div className="bg-black p-8 rounded-lg">
              <div className="h-16 w-16 bg-dark-purple rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="h-8 w-8 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-center mb-4">Easy Customization</h3>
              <p className="text-gray-300 text-center">
                Personalize your website with intuitive controls for colors, typography, layout, and content without any coding knowledge.
              </p>
            </div>
            
            <div className="bg-black p-8 rounded-lg">
              <div className="h-16 w-16 bg-dark-purple rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="h-8 w-8 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-bold text-center mb-4">Wix Integration</h3>
              <p className="text-gray-300 text-center">
                Export your customized website directly to Wix with one click, complete with step-by-step integration guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Template Categories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center mb-16">
            Templates for Every Niche
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-dark-purple rounded-lg overflow-hidden">
              <div className="h-48 bg-grey flex items-center justify-center">
                <h3 className="text-2xl font-heading text-neon-blue">Fashion</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">
                  Showcase your style with elegant portfolio templates designed for fashion influencers.
                </p>
                <Link 
                  href="/templates?category=fashion" 
                  className="text-neon-blue hover:underline"
                >
                  View Fashion Templates →
                </Link>
              </div>
            </div>
            
            <div className="bg-dark-purple rounded-lg overflow-hidden">
              <div className="h-48 bg-grey flex items-center justify-center">
                <h3 className="text-2xl font-heading text-neon-blue">Beauty</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">
                  Perfect for makeup artists and beauty bloggers with specialized sections for tutorials and product reviews.
                </p>
                <Link 
                  href="/templates?category=beauty" 
                  className="text-neon-blue hover:underline"
                >
                  View Beauty Templates →
                </Link>
              </div>
            </div>
            
            <div className="bg-dark-purple rounded-lg overflow-hidden">
              <div className="h-48 bg-grey flex items-center justify-center">
                <h3 className="text-2xl font-heading text-neon-blue">Fitness</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">
                  Designed for fitness coaches and wellness influencers with features for workout programs and nutrition plans.
                </p>
                <Link 
                  href="/templates?category=fitness" 
                  className="text-neon-blue hover:underline"
                >
                  View Fitness Templates →
                </Link>
              </div>
            </div>
            
            <div className="bg-dark-purple rounded-lg overflow-hidden">
              <div className="h-48 bg-grey flex items-center justify-center">
                <h3 className="text-2xl font-heading text-neon-blue">Travel</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">
                  Share your adventures with travel blog templates featuring map integration and destination guides.
                </p>
                <Link 
                  href="/templates?category=travel" 
                  className="text-neon-blue hover:underline"
                >
                  View Travel Templates →
                </Link>
              </div>
            </div>
            
            <div className="bg-dark-purple rounded-lg overflow-hidden">
              <div className="h-48 bg-grey flex items-center justify-center">
                <h3 className="text-2xl font-heading text-neon-blue">Gaming</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">
                  Built for streamers and gaming content creators with stream embedding and schedule displays.
                </p>
                <Link 
                  href="/templates?category=gaming" 
                  className="text-neon-blue hover:underline"
                >
                  View Gaming Templates →
                </Link>
              </div>
            </div>
            
            <div className="bg-dark-purple rounded-lg overflow-hidden">
              <div className="h-48 bg-grey flex items-center justify-center">
                <h3 className="text-2xl font-heading text-neon-blue">Lifestyle</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">
                  Versatile templates for lifestyle influencers covering multiple content categories in one beautiful site.
                </p>
                <Link 
                  href="/templates" 
                  className="text-neon-blue hover:underline"
                >
                  View All Templates →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-grey">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center mb-16">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-dark-purple rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-neon-blue">1</span>
              </div>
              <h3 className="text-xl font-heading font-bold mb-4">Choose a Template</h3>
              <p className="text-gray-300">
                Browse our collection of 30+ professionally designed templates for influencers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-dark-purple rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-neon-blue">2</span>
              </div>
              <h3 className="text-xl font-heading font-bold mb-4">Customize Design</h3>
              <p className="text-gray-300">
                Personalize colors, typography, layout, and content to match your brand.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-dark-purple rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-neon-blue">3</span>
              </div>
              <h3 className="text-xl font-heading font-bold mb-4">Generate Website</h3>
              <p className="text-gray-300">
                Preview your website and generate the complete code with one click.
              </p>
            </div>
            
            <div className="text-center">
              <div className="h-16 w-16 bg-dark-purple rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-neon-blue">4</span>
              </div>
              <h3 className="text-xl font-heading font-bold mb-4">Export to Wix</h3>
              <p className="text-gray-300">
                Export your website to Wix with our simple integration guide.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link 
              href="/templates" 
              className="px-8 py-4 bg-neon-blue text-black rounded-md font-bold text-lg hover:bg-opacity-90 transition-all"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Ready to Create Your Professional Website?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of influencers who have created stunning websites with our platform.
          </p>
          <Link 
            href="/templates" 
            className="px-8 py-4 bg-neon-blue text-black rounded-md font-bold text-lg hover:bg-opacity-90 transition-all"
          >
            Browse Templates
          </Link>
        </div>
      </section>
    </div>
  );
}
```

## File: src/app/globals.css
```
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,200..1000;1,200..1000&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 0, 0, 0;
  --background-end-rgb: 0, 0, 0;
  
  /* Custom color palette */
  --color-black: #000000;
  --color-grey: #333333;
  --color-dark-purple: #2D1B69;
  --color-neon-blue: #00FFFF;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
  font-family: 'Nunito Sans', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
}

.btn-primary {
  background-color: var(--color-dark-purple);
  color: white;
  border: 2px solid var(--color-neon-blue);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: var(--color-neon-blue);
  color: var(--color-black);
}

.admin-panel {
  background-color: var(--color-grey);
  border: 1px solid var(--color-neon-blue);
}

.editor-container {
  border: 1px solid var(--color-dark-purple);
  background-color: rgba(45, 27, 105, 0.1);
}

.template-card {
  border: 1px solid var(--color-grey);
  transition: all 0.3s ease;
}

.template-card:hover {
  border-color: var(--color-neon-blue);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
}
```

## File: src/styles/main.css
```
```

## File: src/components/ui/aspect-ratio.tsx
```
"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }
```

## File: src/components/ui/alert-dialog.tsx
```
"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
```

## File: src/components/ui/pagination.tsx
```
import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
```

## File: src/components/ui/tabs.tsx
```
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
```

## File: src/components/ui/card.tsx
```
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

## File: src/components/ui/slider.tsx
```
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
```

## File: src/components/ui/popover.tsx
```
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
```

## File: src/components/ui/progress.tsx
```
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
```

## File: src/components/ui/toaster.tsx
```
"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
```

## File: src/components/ui/input-otp.tsx
```
"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
```

## File: src/components/ui/chart.tsx
```
"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
```

## File: src/components/ui/hover-card.tsx
```
"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
```

## File: src/components/ui/sheet.tsx
```
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
```

## File: src/components/ui/scroll-area.tsx
```
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
```

## File: src/components/ui/resizable.tsx
```
"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
```

## File: src/components/ui/label.tsx
```
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
```

## File: src/components/ui/sonner.tsx
```
"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
```

## File: src/components/ui/navigation-menu.tsx
```
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
```

## File: src/components/ui/accordion.tsx
```
"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

## File: src/components/ui/drawer.tsx
```
"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
```

## File: src/components/ui/tooltip.tsx
```
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```

## File: src/components/ui/alert.tsx
```
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
```

## File: src/components/ui/switch.tsx
```
"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
```

## File: src/components/ui/calendar.tsx
```
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
```

## File: src/components/ui/breadcrumb.tsx
```
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
```

## File: src/components/ui/radio-group.tsx
```
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3.5 w-3.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
```

## File: src/components/ui/command.tsx
```
"use client"

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
```

## File: src/components/ui/toggle-group.tsx
```
"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
```

## File: src/components/ui/avatar.tsx
```
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
```

## File: src/components/ui/menubar.tsx
```
"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const MenubarMenu = MenubarPrimitive.Menu

const MenubarGroup = MenubarPrimitive.Group

const MenubarPortal = MenubarPrimitive.Portal

const MenubarSub = MenubarPrimitive.Sub

const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
```

## File: src/components/ui/dialog.tsx
```
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
```

## File: src/components/ui/badge.tsx
```
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

## File: src/components/ui/sidebar.tsx
```
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [setOpenProp, open]
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className="group peer hidden md:block text-sidebar-foreground"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
          )}
        />
        <div
          className={cn(
            "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      )}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state } = useSidebar()

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )

    if (!tooltip) {
      return button
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      }
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    showOnHover?: boolean
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("rounded-md h-8 flex gap-2 px-2 items-center", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 flex-1 max-w-[--skeleton-width]"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean
    size?: "sm" | "md"
    isActive?: boolean
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
```

## File: src/components/ui/table.tsx
```
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
```

## File: src/components/ui/separator.tsx
```
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
```

## File: src/components/ui/button.tsx
```
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

## File: src/components/ui/toggle.tsx
```
"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
```

## File: src/components/ui/toast.tsx
```
"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold [&+div]:text-xs", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
```

## File: src/components/ui/checkbox.tsx
```
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
```

## File: src/components/ui/collapsible.tsx
```
"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
```

## File: src/components/ui/dropdown-menu.tsx
```
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
```

## File: src/components/ui/select.tsx
```
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
```

## File: src/components/ui/textarea.tsx
```
import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
```

## File: src/components/ui/input.tsx
```
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

## File: src/components/ui/skeleton.tsx
```
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
```

## File: src/components/ui/context-menu.tsx
```
"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
```

## File: src/components/ui/form.tsx
```
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
```

## File: src/components/ui/carousel.tsx
```
"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
```

## File: src/components/auth/UserProfile.tsx
```
import React, { useState, useEffect } from 'react';

interface UserProfileProps {
  userId?: string;
}

export default function UserProfile({ userId }: UserProfileProps) {
  // Mock user data
  const [user, setUser] = useState({
    id: userId || 'user-123',
    name: 'John Doe',
    email: 'john@example.com',
    profileImage: '/assets/profile-placeholder.jpg',
    createdAt: '2025-01-15',
    websites: 3,
    role: 'user'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  useEffect(() => {
    // Reset form data when user changes or edit mode toggles
    setFormData({
      name: user.name,
      email: user.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }, [user, isEditing]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    // Validate form
    if (!formData.name || !formData.email) {
      setMessage({
        type: 'error',
        text: 'Name and email are required'
      });
      return;
    }
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'New passwords do not match'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real implementation, this would call an API to update the user profile
    // For now, we'll simulate a delay and successful update
    setTimeout(() => {
      setUser({
        ...user,
        name: formData.name,
        email: formData.email
      });
      
      setIsSubmitting(false);
      setIsEditing(false);
      setMessage({
        type: 'success',
        text: 'Profile updated successfully'
      });
    }, 1500);
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-heading font-bold">My Profile</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-dark-purple rounded hover:bg-opacity-80"
          >
            Edit Profile
          </button>
        )}
      </div>
      
      {message && (
        <div className={`p-3 rounded-lg mb-4 ${
          message.type === 'success' 
            ? 'bg-green-900 bg-opacity-30 border border-green-500 text-green-500' 
            : 'bg-red-900 bg-opacity-30 border border-red-500 text-red-500'
        }`}>
          <p className="text-sm">{message.text}</p>
        </div>
      )}
      
      {!isEditing ? (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-dark-purple flex items-center justify-center">
              <span className="text-2xl font-bold">{user.name.charAt(0)}</span>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg">{user.name}</h3>
              <p className="text-sm text-gray-400">{user.email}</p>
              <p className="text-xs text-gray-400">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-neon-blue">{user.websites}</p>
              <p className="text-sm">Websites</p>
            </div>
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-neon-blue">Premium</p>
              <p className="text-sm">Account Type</p>
            </div>
            <div className="bg-black rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-neon-blue">Active</p>
              <p className="text-sm">Status</p>
            </div>
          </div>
          
          <div className="bg-black rounded-lg p-4">
            <h3 className="font-heading font-bold mb-4">Account Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span>{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Password:</span>
                <span>••••••••</span>
              </div>
            </div>
          </div>
          
          <div className="bg-black rounded-lg p-4">
            <h3 className="font-heading font-bold mb-4">Preferences</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Email notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                </label>
              </div>
              <div className="flex justify-between items-center">
                <span>Two-factor authentication</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-dark-purple flex items-center justify-center">
              <span className="text-2xl font-bold">{formData.name.charAt(0)}</span>
            </div>
            <div>
              <button className="px-3 py-1 bg-dark-purple rounded text-sm">
                Change Photo
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
              />
            </div>
          </div>
          
          <div className="bg-black rounded-lg p-4">
            <h3 className="font-heading font-bold mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
                  placeholder="••••••••"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-dark-purple rounded hover:bg-opacity-80"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-neon-blue text-black rounded font-bold"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
```

## File: src/components/auth/ProtectedRoute.tsx
```
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if user is authenticated and has the right permissions
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.push('/auth/login');
      } else if (adminOnly && user?.role !== 'admin') {
        // Redirect to dashboard if user is not an admin but admin route is required
        router.push('/dashboard');
      } else {
        // User is authorized to view this route
        setIsAuthorized(true);
      }
    }
  }, [isLoading, isAuthenticated, user, adminOnly, router]);

  // Show loading state while checking authentication
  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-neon-blue border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Render children if user is authorized
  return <>{children}</>;
}
```

## File: src/components/auth/AuthForm.tsx
```
"use client";

import React from 'react';

export default function AuthForm({ isLogin = true, onSubmit }) {
  return (
    <div className="space-y-4">
      {!isLogin && (
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            className="w-full p-3 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
            placeholder="John Doe"
          />
        </div>
      )}
      
      <div>
        <label className="block text-sm font-medium mb-2">Email Address</label>
        <input
          type="email"
          className="w-full p-3 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
          placeholder="your@email.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          className="w-full p-3 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
          placeholder="••••••••"
        />
      </div>
      
      {!isLogin && (
        <div>
          <label className="block text-sm font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-full p-3 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
            placeholder="••••••••"
          />
        </div>
      )}
      
      <button
        type="submit"
        className="w-full py-3 bg-neon-blue text-black rounded-md font-bold"
        onClick={onSubmit}
      >
        {isLogin ? 'Log In' : 'Create Account'}
      </button>
    </div>
  );
}
```

## File: src/components/auth/AuthContext.tsx
```
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// User type
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps the app and makes auth object available
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    // In a real app, this would check for a token in localStorage
    // and validate it with the backend
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // In a real app, this would make an API call to authenticate
    // For now, we'll simulate a successful login
    const mockUser: User = {
      id: 'user-1',
      name: 'John Doe',
      email,
      role: email.includes('admin') ? 'admin' : 'user',
    };
    
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // In a real app, this would make an API call to register
    // For now, we'll simulate a successful registration
    const mockUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'user',
    };
    
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    // Remove user from localStorage
    localStorage.removeItem('user');
    setUser(null);
  };

  // Value object that will be passed to consumers
  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
```

## File: src/components/payment/PaymentProcessing.tsx
```
"use client";

import React, { useState } from 'react';

interface PaymentProcessingProps {
  amount: number;
  productName: string;
  onSuccess?: (transactionId: string) => void;
  onCancel?: () => void;
}

export default function PaymentProcessing({ amount, productName, onSuccess, onCancel }: PaymentProcessingProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [transactionId, setTransactionId] = useState('');
  
  // Card payment form state
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  
  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };
  
  const formatExpiry = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    
    return digits;
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };
  
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardExpiry(formatExpiry(e.target.value));
  };
  
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limit to 3-4 digits
    const cvc = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardCvc(cvc);
  };
  
  const processPayment = () => {
    setIsProcessing(true);
    
    // In a real implementation, this would call a payment processing service
    // For now, we'll simulate a delay and set the status to success
    setTimeout(() => {
      setPaymentStatus('success');
      setTransactionId(`TX-${Date.now()}`);
      setIsProcessing(false);
      
      if (onSuccess) {
        onSuccess(`TX-${Date.now()}`);
      }
    }, 2000);
  };
  
  const validateCardForm = () => {
    return (
      cardName.trim() !== '' &&
      cardNumber.replace(/\s/g, '').length === 16 &&
      cardExpiry.length === 5 &&
      cardCvc.length >= 3
    );
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <h2 className="text-xl font-heading font-bold mb-6">Checkout</h2>
      
      {paymentStatus === 'pending' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center p-4 bg-black rounded-lg">
            <div>
              <h3 className="font-heading font-bold">{productName}</h3>
              <p className="text-sm text-gray-400">Website Template Package</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold">${amount.toFixed(2)}</p>
              <p className="text-xs text-gray-400">One-time payment</p>
            </div>
          </div>
          
          <div className="bg-black rounded-lg p-4">
            <h3 className="font-heading font-bold mb-4">Payment Method</h3>
            
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-3 rounded-md ${
                  paymentMethod === 'card' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                Credit Card
              </button>
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`flex-1 py-3 rounded-md ${
                  paymentMethod === 'paypal' 
                    ? 'bg-neon-blue text-black font-bold' 
                    : 'bg-dark-purple hover:bg-opacity-80'
                }`}
              >
                PayPal
              </button>
            </div>
            
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry Date</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      className="w-full p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">CVC</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={handleCvcChange}
                      placeholder="123"
                      className="w-full p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    onClick={processPayment}
                    disabled={isProcessing || !validateCardForm()}
                    className={`w-full py-3 rounded-md font-bold ${
                      isProcessing || !validateCardForm()
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-neon-blue text-black'
                    }`}
                  >
                    {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
                  </button>
                </div>
                
                <p className="text-xs text-gray-400 text-center">
                  Your payment information is secure and encrypted
                </p>
              </div>
            )}
            
            {paymentMethod === 'paypal' && (
              <div className="space-y-4">
                <div className="p-6 text-center">
                  <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
                  <button
                    onClick={processPayment}
                    disabled={isProcessing}
                    className={`w-full py-3 rounded-md font-bold ${
                      isProcessing
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-neon-blue text-black'
                    }`}
                  >
                    {isProcessing ? 'Processing...' : 'Continue to PayPal'}
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm">Secure Checkout</span>
            </div>
          </div>
        </div>
      )}
      
      {paymentStatus === 'success' && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-xl font-heading font-bold mb-2">Payment Successful!</h3>
          <p className="text-gray-400 mb-6">Thank you for your purchase.</p>
          
          <div className="bg-black rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm">Amount Paid:</span>
              <span className="font-bold">${amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Transaction ID:</span>
              <span className="text-xs text-gray-400">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Date:</span>
              <span className="text-sm">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="px-6 py-3 bg-neon-blue text-black rounded-md font-bold"
          >
            Go to Dashboard
          </button>
        </div>
      )}
      
      {paymentStatus === 'failed' && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h3 className="text-xl font-heading font-bold mb-2">Payment Failed</h3>
          <p className="text-gray-400 mb-6">There was an issue processing your payment. Please try again.</p>
          
          <button
            onClick={() => setPaymentStatus('pending')}
            className="px-6 py-3 bg-neon-blue text-black rounded-md font-bold"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
```

## File: src/components/payment/OrderSummary.tsx
```
import React, { useState } from 'react';

interface OrderSummaryProps {
  templateId: string;
  templateName: string;
  templatePrice: number;
  onCheckout: () => void;
  onCancel: () => void;
}

export default function OrderSummary({ 
  templateId, 
  templateName, 
  templatePrice, 
  onCheckout, 
  onCancel 
}: OrderSummaryProps) {
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  const applyCoupon = () => {
    // In a real implementation, this would validate the coupon code with a backend service
    // For now, we'll simulate a valid coupon code "LAUNCH50" for 10% off
    if (couponCode.toUpperCase() === 'LAUNCH50') {
      setDiscount(templatePrice * 0.1);
      setCouponApplied(true);
    } else {
      setDiscount(0);
      setCouponApplied(false);
      alert('Invalid coupon code');
    }
  };
  
  const removeCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    setCouponApplied(false);
  };
  
  const calculateTotal = () => {
    return templatePrice - discount;
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <h2 className="text-xl font-heading font-bold mb-6">Order Summary</h2>
      
      <div className="space-y-6">
        <div className="bg-black rounded-lg overflow-hidden">
          <div className="h-40 bg-dark-purple flex items-center justify-center">
            <span className="text-neon-blue font-bold">{templateName}</span>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-heading font-bold">{templateName}</h3>
              <span className="text-neon-blue font-bold">${templatePrice.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Complete website package with all premium features
            </p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">✓</span>
                <span>Fully customizable template</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">✓</span>
                <span>Responsive design for all devices</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">✓</span>
                <span>SEO optimization included</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">✓</span>
                <span>Premium assets and features</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-black rounded-lg p-4">
          <h3 className="font-heading font-bold mb-4">Have a Coupon?</h3>
          
          {!couponApplied ? (
            <div className="flex space-x-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 p-2 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
              />
              <button
                onClick={applyCoupon}
                disabled={!couponCode}
                className={`px-4 py-2 rounded-md ${
                  !couponCode ? 'bg-gray-600 cursor-not-allowed' : 'bg-neon-blue text-black font-bold'
                }`}
              >
                Apply
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center p-2 bg-dark-purple rounded-md">
              <div>
                <span className="text-sm font-medium">{couponCode.toUpperCase()}</span>
                <span className="text-xs text-green-500 ml-2">Applied</span>
              </div>
              <button
                onClick={removeCoupon}
                className="text-xs text-red-500 hover:text-red-400"
              >
                Remove
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-black rounded-lg p-4">
          <h3 className="font-heading font-bold mb-4">Price Details</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Template Price</span>
              <span>${templatePrice.toFixed(2)}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between text-green-500">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="border-t border-dark-purple my-2 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
          
          <button
            onClick={onCheckout}
            className="w-full py-3 bg-neon-blue text-black rounded-md font-bold"
          >
            Proceed to Checkout
          </button>
        </div>
        
        <div className="text-center">
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
```

## File: src/components/payment/OrderHistory.tsx
```
import React, { useState } from 'react';

interface OrderHistoryProps {
  userId?: string;
}

export default function OrderHistory({ userId }: OrderHistoryProps) {
  // Mock order data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      date: '2025-04-20',
      templateName: 'Fashion Portfolio Elite',
      amount: 50.00,
      status: 'completed',
      websiteUrl: 'https://fashion-portfolio.example.com'
    },
    {
      id: 'ORD-002',
      date: '2025-04-15',
      templateName: 'Beauty Blog Premium',
      amount: 45.00, // With discount
      status: 'completed',
      websiteUrl: 'https://beauty-blog.example.com'
    },
    {
      id: 'ORD-003',
      date: '2025-04-10',
      templateName: 'Fitness Coach Pro',
      amount: 50.00,
      status: 'processing',
      websiteUrl: null
    }
  ]);
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <h2 className="text-xl font-heading font-bold mb-6">Order History</h2>
      
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-black rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-heading font-bold">{order.templateName}</h3>
                  <p className="text-xs text-gray-400">Order ID: {order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${order.amount.toFixed(2)}</p>
                  <p className="text-xs">{new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'completed' 
                      ? 'bg-green-900 text-green-500' 
                      : 'bg-yellow-900 text-yellow-500'
                  }`}>
                    {order.status === 'completed' ? 'Completed' : 'Processing'}
                  </span>
                </div>
                
                <div className="flex space-x-3">
                  {order.websiteUrl && (
                    <a 
                      href={order.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80"
                    >
                      View Website
                    </a>
                  )}
                  
                  <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">
                    {order.status === 'completed' ? 'Download Files' : 'View Details'}
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-center">
            <button className="px-4 py-2 bg-dark-purple rounded hover:bg-opacity-80">
              View All Orders
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">You haven't placed any orders yet.</p>
          <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">
            Browse Templates
          </button>
        </div>
      )}
    </div>
  );
}
```

## File: src/components/generator/types.ts
```
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
```

## File: src/components/generator/WebsiteExporter.tsx
```
import React, { useState } from 'react';
import { WebsiteGeneratorServiceImpl } from './WebsiteGeneratorService';
import { TemplateCustomization, ExportOptions } from './types';
import { Template } from '../templates/templateData';

interface WebsiteExporterProps {
  template: Template;
  customization: TemplateCustomization;
}

export default function WebsiteExporter({ template, customization }: WebsiteExporterProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportUrl, setExportUrl] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  
  const generatorService = new WebsiteGeneratorServiceImpl();
  
  const handleExport = async (options: ExportOptions) => {
    try {
      setIsExporting(true);
      setExportError(null);
      
      // Generate the website
      const generatedWebsite = await generatorService.generateWebsite(template, customization);
      
      // Export the website
      const url = await generatorService.exportWebsite(generatedWebsite, options);
      
      setExportUrl(url);
      setIsExporting(false);
    } catch (error) {
      setExportError('Failed to export website. Please try again.');
      setIsExporting(false);
      console.error('Export error:', error);
    }
  };
  
  const exportAsZip = () => {
    handleExport({
      format: 'zip',
      includeAssets: true,
      minify: true
    });
  };
  
  const deployWebsite = () => {
    handleExport({
      format: 'deploy',
      includeAssets: true,
      minify: true
    });
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <h2 className="text-xl font-heading font-bold mb-4">Export Your Website</h2>
      
      <div className="space-y-6">
        <div>
          <p className="mb-4">Choose how you want to export your customized website:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-dark-purple rounded-lg">
              <h3 className="font-heading font-bold mb-2">Download as ZIP</h3>
              <p className="text-sm mb-4">Get all the files needed to host your website anywhere.</p>
              <button 
                onClick={exportAsZip}
                disabled={isExporting}
                className="w-full py-2 bg-neon-blue text-black rounded font-bold"
              >
                {isExporting ? 'Preparing Download...' : 'Download ZIP'}
              </button>
            </div>
            
            <div className="p-4 bg-dark-purple rounded-lg">
              <h3 className="font-heading font-bold mb-2">Deploy Online</h3>
              <p className="text-sm mb-4">Publish your website online with one click.</p>
              <button 
                onClick={deployWebsite}
                disabled={isExporting}
                className="w-full py-2 bg-neon-blue text-black rounded font-bold"
              >
                {isExporting ? 'Deploying...' : 'Deploy Website'}
              </button>
            </div>
          </div>
        </div>
        
        {exportError && (
          <div className="p-4 bg-red-900 text-white rounded-lg">
            {exportError}
          </div>
        )}
        
        {exportUrl && (
          <div className="p-4 bg-green-900 text-white rounded-lg">
            <p className="mb-2">Your website is ready!</p>
            <a 
              href={exportUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neon-blue font-bold hover:underline"
            >
              {exportUrl.includes('download') ? 'Download Now' : 'Visit Your Website'}
            </a>
          </div>
        )}
        
        <div className="border-t border-dark-purple pt-4">
          <h3 className="font-heading font-bold mb-2">Advanced Options</h3>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="minify-code" className="mr-2" defaultChecked />
              <label htmlFor="minify-code">Minify code for faster loading</label>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="include-assets" className="mr-2" defaultChecked />
              <label htmlFor="include-assets">Include all assets (images, fonts, etc.)</label>
            </div>
            
            <div className="flex items-center">
              <input type="checkbox" id="include-source" className="mr-2" />
              <label htmlFor="include-source">Include source files for future editing</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/components/generator/WebsiteGenerator.tsx
```
"use client";

import React, { useState, useEffect } from 'react';
import { WebsiteGeneratorServiceImpl } from './WebsiteGeneratorService';

interface WebsiteGeneratorProps {
  templateId: string;
  customizations: any;
  onPreviewUpdate?: (previewHtml: string) => void;
}

export default function WebsiteGenerator({ templateId, customizations, onPreviewUpdate }: WebsiteGeneratorProps) {
  const [generatedCode, setGeneratedCode] = useState({
    html: '',
    css: '',
    js: ''
  });
  
  const generatorService = new WebsiteGeneratorServiceImpl();
  
  useEffect(() => {
    const generatePreview = async () => {
      try {
        // Find the template from the templateId
        const template = {
          id: templateId,
          name: customizations.title || 'Website Template',
          category: customizations.category || 'general',
          title: customizations.title || 'Website Template'
        };
        
        // Generate the website code
        const generated = await generatorService.generateWebsite(template, customizations);
        
        setGeneratedCode({
          html: generated.html,
          css: generated.css,
          js: generated.js
        });
        
        // Create a preview HTML that combines everything
        const previewHtml = `
          <html>
            <head>
              <style>${generated.css}</style>
            </head>
            <body>
              ${generated.html}
              <script>${generated.js}</script>
            </body>
          </html>
        `;
        
        // Call the callback with the preview HTML if provided
        if (onPreviewUpdate) {
          onPreviewUpdate(previewHtml);
        }
      } catch (error) {
        console.error('Error generating website preview:', error);
      }
    };
    
    generatePreview();
  }, [templateId, customizations]);
  
  return (
    <div className="hidden">
      {/* This is a utility component that doesn't render UI */}
    </div>
  );
}
```

## File: src/components/generator/CodeEditor.tsx
```
import React, { useState } from 'react';
import { Template } from '../templates/templateData';
import { TemplateCustomization } from './types';

interface CodeEditorProps {
  template: Template;
  customization: TemplateCustomization;
  onCodeChange: (type: 'html' | 'css' | 'js', code: string) => void;
}

export default function CodeEditor({ template, customization, onCodeChange }: CodeEditorProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [htmlCode, setHtmlCode] = useState(customization.customHtml || '');
  const [cssCode, setCssCode] = useState(customization.customCss || '');
  const [jsCode, setJsCode] = useState(customization.customJs || '');
  
  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setHtmlCode(newCode);
    onCodeChange('html', newCode);
  };
  
  const handleCssChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCssCode(newCode);
    onCodeChange('css', newCode);
  };
  
  const handleJsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setJsCode(newCode);
    onCodeChange('js', newCode);
  };
  
  return (
    <div className="bg-grey rounded-lg overflow-hidden">
      <div className="border-b border-dark-purple">
        <nav className="flex">
          <button
            className={`py-3 px-4 font-medium ${
              activeTab === 'html' 
                ? 'bg-dark-purple text-neon-blue border-b-2 border-neon-blue' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('html')}
          >
            HTML
          </button>
          <button
            className={`py-3 px-4 font-medium ${
              activeTab === 'css' 
                ? 'bg-dark-purple text-neon-blue border-b-2 border-neon-blue' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('css')}
          >
            CSS
          </button>
          <button
            className={`py-3 px-4 font-medium ${
              activeTab === 'js' 
                ? 'bg-dark-purple text-neon-blue border-b-2 border-neon-blue' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('js')}
          >
            JavaScript
          </button>
        </nav>
      </div>
      
      <div className="p-4">
        {activeTab === 'html' && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-heading font-bold">HTML Editor</h3>
              <div className="flex space-x-2">
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">Format</button>
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">Reset</button>
              </div>
            </div>
            <textarea
              value={htmlCode}
              onChange={handleHtmlChange}
              className="w-full h-96 bg-black text-white font-mono p-4 border border-dark-purple rounded"
              placeholder="Enter custom HTML here..."
            ></textarea>
          </div>
        )}
        
        {activeTab === 'css' && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-heading font-bold">CSS Editor</h3>
              <div className="flex space-x-2">
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">Format</button>
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">Reset</button>
              </div>
            </div>
            <textarea
              value={cssCode}
              onChange={handleCssChange}
              className="w-full h-96 bg-black text-white font-mono p-4 border border-dark-purple rounded"
              placeholder="Enter custom CSS here..."
            ></textarea>
          </div>
        )}
        
        {activeTab === 'js' && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-heading font-bold">JavaScript Editor</h3>
              <div className="flex space-x-2">
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">Format</button>
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">Reset</button>
              </div>
            </div>
            <textarea
              value={jsCode}
              onChange={handleJsChange}
              className="w-full h-96 bg-black text-white font-mono p-4 border border-dark-purple rounded"
              placeholder="Enter custom JavaScript here..."
            ></textarea>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-dark-purple bg-black">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xs text-gray-400">
              {activeTab === 'html' ? 'HTML' : activeTab === 'css' ? 'CSS' : 'JavaScript'} Editor
            </span>
          </div>
          <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
}
```

## File: src/components/generator/WebsiteGeneratorService.ts
```
import { Template } from '../templates/templateData';
import { TemplateCustomization, GeneratedWebsite, ExportOptions } from './types';

export default class  WebsiteGeneratorServiceImpl {
  /**
   * Generates a complete website based on template and customizations
   */
  async generateWebsite(template: Template, customization: TemplateCustomization): Promise<GeneratedWebsite> {
    // In a real implementation, this would:
    // 1. Load the base template files
    // 2. Apply all customizations (colors, fonts, layout, content)
    // 3. Process sections based on enabled/disabled status
    // 4. Apply custom CSS and JS if provided
    // 5. Optimize and prepare final output
    
    // For now, we'll create a simplified implementation
    
    const baseHtml = this.generateHtml(template, customization);
    const baseCss = this.generateCss(template, customization);
    const baseJs = this.generateJs(template, customization);
    
    return {
      html: baseHtml,
      css: baseCss,
      js: baseJs,
      assets: this.getRequiredAssets(template, customization)
    };
  }
  
  /**
   * Exports the generated website in the requested format
   */
  async exportWebsite(generatedWebsite: GeneratedWebsite, options: ExportOptions): Promise<string> {
    // In a real implementation, this would:
    // 1. Package all files (HTML, CSS, JS, assets) based on the format
    // 2. Minify code if requested
    // 3. Create a zip file or deploy to hosting
    // 4. Return a download URL or deployment URL
    
    if (options.minify) {
      // Minify code
      generatedWebsite.html = this.minifyHtml(generatedWebsite.html);
      generatedWebsite.css = this.minifyCss(generatedWebsite.css);
      generatedWebsite.js = this.minifyJs(generatedWebsite.js);
    }
    
    if (options.format === 'zip') {
      return this.createZipPackage(generatedWebsite, options.includeAssets);
    } else {
      return this.deployWebsite(generatedWebsite);
    }
  }
  
  /**
   * Validates that the customization is compatible with the template
   */
  validateCustomization(template: Template, customization: TemplateCustomization): boolean {
    // Check if all required sections are present
    // Validate color schemes, layouts, etc.
    return true; // Simplified for now
  }
  
  /**
   * Returns the structure of the template for the editor
   */
  getTemplateStructure(template: Template): any {
    // Return a structured representation of the template
    // including available sections, customization options, etc.
    return {
      id: template.id,
      name: template.title,
      sections: [
        { id: 'header', name: 'Header', required: true },
        { id: 'hero', name: 'Hero Section', required: true },
        { id: 'about', name: 'About', required: false },
        { id: 'portfolio', name: 'Portfolio/Gallery', required: false },
        { id: 'services', name: 'Services', required: false },
        { id: 'testimonials', name: 'Testimonials', required: false },
        { id: 'contact', name: 'Contact Form', required: true },
        { id: 'footer', name: 'Footer', required: true }
      ],
      layouts: ['default', 'alternative', 'minimal'],
      colorSchemes: ['dark', 'light', 'colorful', 'minimal'],
      typography: ['modern', 'classic', 'bold', 'elegant']
    };
  }
  
  // Private helper methods
  
  private generateHtml(template: Template, customization: TemplateCustomization): string {
    // Generate HTML based on template and customization
    const layout = customization.layout || 'default';
    
    // This is a simplified example - in a real implementation, this would be much more complex
    // and would use actual template files
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.title} - Your Website</title>
    <link rel="stylesheet" href="styles.css">
    ${customization.typography === 'modern' ? 
      '<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&family=Montserrat:wght@700&display=swap" rel="stylesheet">' : 
      ''}
</head>
<body class="layout-${layout} scheme-${customization.colorScheme} typography-${customization.typography}">
    ${customization.sections.header?.enabled ? 
      `<header class="site-header">
        <div class="container">
          <div class="logo">Your Brand</div>
          <nav>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>` : ''}
    
    ${customization.sections.hero?.enabled ? 
      `<section id="home" class="hero-section">
        <div class="container">
          <h1>Your Name</h1>
          <p>Professional ${template.category.charAt(0).toUpperCase() + template.category.slice(1)} Influencer</p>
          <a href="#portfolio" class="btn primary-btn">View My Work</a>
        </div>
      </section>` : ''}
    
    ${customization.sections.about?.enabled ? 
      `<section id="about" class="about-section">
        <div class="container">
          <h2>About Me</h2>
          <div class="about-content">
            <div class="profile-image">
              <img src="profile.jpg" alt="Your Name">
            </div>
            <div class="about-text">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
        </div>
      </section>` : ''}
    
    ${customization.sections.portfolio?.enabled ? 
      `<section id="portfolio" class="portfolio-section">
        <div class="container">
          <h2>My Work</h2>
          <div class="portfolio-grid">
            <div class="portfolio-item"><img src="portfolio1.jpg" alt="Portfolio Item 1"></div>
            <div class="portfolio-item"><img src="portfolio2.jpg" alt="Portfolio Item 2"></div>
            <div class="portfolio-item"><img src="portfolio3.jpg" alt="Portfolio Item 3"></div>
            <div class="portfolio-item"><img src="portfolio4.jpg" alt="Portfolio Item 4"></div>
            <div class="portfolio-item"><img src="portfolio5.jpg" alt="Portfolio Item 5"></div>
            <div class="portfolio-item"><img src="portfolio6.jpg" alt="Portfolio Item 6"></div>
          </div>
        </div>
      </section>` : ''}
    
    ${customization.sections.contact?.enabled ? 
      `<section id="contact" class="contact-section">
        <div class="container">
          <h2>Get In Touch</h2>
          <p>Interested in working together? Fill out the form below to get started.</p>
          <form class="contact-form">
            <div class="form-group">
              <input type="text" placeholder="Your Name" required>
            </div>
            <div class="form-group">
              <input type="email" placeholder="Your Email" required>
            </div>
            <div class="form-group">
              <textarea placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" class="btn primary-btn">Send Message</button>
          </form>
        </div>
      </section>` : ''}
    
    ${customization.sections.footer?.enabled ? 
      `<footer class="site-footer">
        <div class="container">
          <p>&copy; ${new Date().getFullYear()} Your Name. All rights reserved.</p>
          <div class="social-links">
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">YouTube</a>
            <a href="#">TikTok</a>
          </div>
        </div>
      </footer>` : ''}
    
    <script src="main.js"></script>
</body>
</html>
    `;
  }
  
  private generateCss(template: Template, customization: TemplateCustomization): string {
    // Generate CSS based on template and customization
    const colorScheme = customization.colorScheme || 'dark';
    const typography = customization.typography || 'modern';
    
    // Define color variables based on scheme
    let colors = {
      primary: '#2D1B69',
      secondary: '#00FFFF',
      background: '#000000',
      text: '#FFFFFF',
      accent: '#333333'
    };
    
    if (colorScheme === 'light') {
      colors = {
        primary: '#6247AA',
        secondary: '#00FFFF',
        background: '#FFFFFF',
        text: '#333333',
        accent: '#F5F5F5'
      };
    } else if (colorScheme === 'colorful') {
      colors = {
        primary: '#FF3366',
        secondary: '#33CCFF',
        background: '#111111',
        text: '#FFFFFF',
        accent: '#444444'
      };
    }
    
    // Define typography based on selection
    let fonts = {
      heading: "'Montserrat', sans-serif",
      body: "'Nunito Sans', sans-serif"
    };
    
    if (typography === 'classic') {
      fonts = {
        heading: "'Georgia', serif",
        body: "'Times New Roman', serif"
      };
    } else if (typography === 'bold') {
      fonts = {
        heading: "'Roboto', sans-serif",
        body: "'Roboto', sans-serif"
      };
    }
    
    // This is a simplified example - in a real implementation, this would be much more complex
    // and would use actual template CSS files with variable substitution
    const baseCSS = `
/* Base Styles */
:root {
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-background: ${colors.background};
  --color-text: ${colors.text};
  --color-accent: ${colors.accent};
  --font-heading: ${fonts.heading};
  --font-body: ${fonts.body};
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-background);
  color: var(--color-text);
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
  margin-bottom: 1rem;
}

a {
  color: var(--color-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
}

a:hover {
  opacity: 0.8;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-btn {
  background-color: var(--color-primary);
  color: white;
  border: 2px solid var(--color-secondary);
}

.primary-btn:hover {
  background-color: var(--color-secondary);
  color: var(--color-background);
}

/* Layout Styles */
.site-header {
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.site-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
}

nav ul {
  display: flex;
  list-style: none;
}

nav ul li {
  margin-left: 2rem;
}

section {
  padding: 5rem 0;
}

.hero-section {
  text-align: center;
  padding: 8rem 0;
}

.hero-section h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.about-section h2,
.portfolio-section h2,
.contact-section h2 {
  text-align: center;
  margin-bottom: 3rem;
}

.about-content {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.profile-image {
  flex: 0 0 300px;
}

.profile-image img {
  width: 100%;
  border-radius: 50%;
}

.about-text {
  flex: 1;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.portfolio-item {
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.portfolio-item:hover {
  transform: translateY(-5px);
}

.portfolio-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact-section {
  text-align: center;
}

.contact-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--color-accent);
  border-radius: 4px;
  color: var(--color-text);
}

.form-group textarea {
  min-height: 150px;
  resize: vertical;
}

.site-footer {
  text-align: center;
  padding: 3rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-image {
    margin-bottom: 2rem;
  }
  
  nav ul {
    display: none;
  }
}
    `;
    
    // Add custom CSS if provided
    const finalCSS = customization.customCss 
      ? `${baseCSS}\n\n/* Custom CSS */\n${customization.customCss}` 
      : baseCSS;
    
    return finalCSS;
  }
  
  private generateJs(template: Template, customization: TemplateCustomization): string {
    // Generate JavaScript based on template and customization
    
    // This is a simplified example - in a real implementation, this would be much more complex
    // and would use actual template JS files
    const baseJS = `
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the website
  console.log('Website initialized');
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form submission handler
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // In a real implementation, this would send the form data to a server
      console.log('Form submitted');
      
      // Show success message
      alert('Thank you for your message! We will get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
  }
});
    `;
    
    // Add custom JS if provided
    const finalJS = customization.customJs 
      ? `${baseJS}\n\n/* Custom JavaScript */\n${customization.customJs}` 
      : baseJS;
    
    return finalJS;
  }
  
  private getRequiredAssets(template: Template, customization: TemplateCustomization): string[] {
    // Determine which assets are needed based on the template and customization
    const assets = [
      'profile.jpg',
      'portfolio1.jpg',
      'portfolio2.jpg',
      'portfolio3.jpg',
      'portfolio4.jpg',
      'portfolio5.jpg',
      'portfolio6.jpg'
    ];
    
    return assets;
  }
  
  private minifyHtml(html: string): string {
    // In a real implementation, this would use a proper HTML minifier
    // For now, we'll do some basic minification
    return html
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  }
  
  private minifyCss(css: string): string {
    // In a real implementation, this would use a proper CSS minifier
    // For now, we'll do some basic minification
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ')
      .replace(/\s*({|}|:|;|,)\s*/g, '$1')
      .replace(/;}/, '}')
      .trim();
  }
  
  private minifyJs(js: string): string {
    // In a real implementation, this would use a proper JS minifier
    // For now, we'll do some basic minification
    return js
      .replace(/\/\/.*$/gm, '') // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  private async createZipPackage(website: GeneratedWebsite, includeAssets: boolean): Promise<string> {
    // In a real implementation, this would create a zip file with all the website files
    // For now, we'll just return a placeholder URL
    return '/api/download/website.zip';
  }
  
  private async deployWebsite(website: GeneratedWebsite): Promise<string> {
    // In a real implementation, this would deploy the website to a hosting service
    // For now, we'll just return a placeholder URL
    return 'https://your-website.example.com';
  }
}
```

## File: src/components/generator/ResponsivePreview.tsx
```
import React, { useState } from 'react';
import { Template } from '../templates/templateData';
import { TemplateCustomization } from './types';

interface ResponsivePreviewProps {
  template: Template;
  customization: TemplateCustomization;
  previewHtml: string;
}

export default function ResponsivePreview({ template, customization, previewHtml }: ResponsivePreviewProps) {
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  const getPreviewWidth = () => {
    switch (deviceType) {
      case 'desktop':
        return 'w-full max-w-6xl';
      case 'tablet':
        return 'w-full max-w-md';
      case 'mobile':
        return 'w-full max-w-xs';
    }
  };
  
  return (
    <div className="bg-grey rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button 
            onClick={() => setDeviceType('desktop')}
            className={`p-2 rounded ${
              deviceType === 'desktop' ? 'bg-dark-purple text-neon-blue' : 'hover:bg-dark-purple'
            }`}
          >
            Desktop
          </button>
          <button 
            onClick={() => setDeviceType('tablet')}
            className={`p-2 rounded ${
              deviceType === 'tablet' ? 'bg-dark-purple text-neon-blue' : 'hover:bg-dark-purple'
            }`}
          >
            Tablet
          </button>
          <button 
            onClick={() => setDeviceType('mobile')}
            className={`p-2 rounded ${
              deviceType === 'mobile' ? 'bg-dark-purple text-neon-blue' : 'hover:bg-dark-purple'
            }`}
          >
            Mobile
          </button>
        </div>
        <button className="p-2 bg-dark-purple rounded">
          Preview Live
        </button>
      </div>
      
      <div className="flex-1 p-4 overflow-auto bg-black">
        <div className={`mx-auto ${getPreviewWidth()}`}>
          <div className="bg-white text-black rounded overflow-hidden">
            <iframe
              srcDoc={previewHtml}
              className="w-full min-h-[800px] border-0"
              title="Website Preview"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-4 border-t border-dark-purple">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm">
              Previewing: <span className="text-neon-blue">{template.title}</span>
            </span>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-dark-purple rounded border border-neon-blue">
              Edit Template
            </button>
            <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">
              Export Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/components/templates/templateData.ts
```
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
```

## File: src/components/templates/TemplateFilterBar.tsx
```
import React, { useState } from 'react';
import { TemplateCategory } from './types';

interface TemplateFilterBarProps {
  categories: TemplateCategory[];
  popularTags: string[];
  onFilterChange: (filter: any) => void;
}

export default function TemplateFilterBar({ 
  categories, 
  popularTags, 
  onFilterChange 
}: TemplateFilterBarProps) {
  const [selectedCategories, setSelectedCategories] = useState<TemplateCategory[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  
  const handleCategoryToggle = (category: TemplateCategory) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };
  
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFeaturedToggle = () => {
    setShowFeaturedOnly(prev => !prev);
  };
  
  const applyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      tags: selectedTags,
      featured: showFeaturedOnly,
      search: searchTerm
    });
  };
  
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSearchTerm('');
    setShowFeaturedOnly(false);
    onFilterChange({
      categories: [],
      tags: [],
      featured: false,
      search: ''
    });
  };
  
  return (
    <div className="bg-grey rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold mb-4 md:mb-0">Filter Templates</h2>
        <div className="flex space-x-4">
          <button 
            onClick={applyFilters}
            className="btn-primary px-4 py-2 rounded-md"
          >
            Apply Filters
          </button>
          <button 
            onClick={resetFilters}
            className="bg-dark-purple px-4 py-2 rounded-md border border-neon-blue"
          >
            Reset
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-2">Search</label>
          <input 
            type="text" 
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search templates..." 
            className="w-full p-3 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
          />
        </div>
        
        {/* Categories */}
        <div>
          <label className="block text-sm font-medium mb-2">Categories</label>
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center">
                <input 
                  type="checkbox" 
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="mr-2"
                />
                <label htmlFor={`category-${category}`} className="capitalize">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Popular Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">Popular Tags</label>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-xs ${
                  selectedTags.includes(tag)
                    ? 'bg-neon-blue text-black'
                    : 'bg-dark-purple text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        {/* Featured */}
        <div>
          <label className="block text-sm font-medium mb-2">Options</label>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="featured-only"
              checked={showFeaturedOnly}
              onChange={handleFeaturedToggle}
              className="mr-2"
            />
            <label htmlFor="featured-only">
              Featured templates only
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/components/templates/types.ts
```
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
```

## File: src/components/templates/templateHTML.ts
```
// src/components/templates/templateHTML.ts

export const templateHTML: Record<string, { html: string; css: string; js: string }> = {
    "fashion-portfolio-1": {
      html: `
        <header class="header"><h1>Fashion Elite</h1></header>
        <section><p>Showcasing the best in fashion design and modeling.</p></section>
        <footer>© 2025 Elite Fashion</footer>
      `,
      css: `
        body { font-family: 'Poppins', sans-serif; margin: 0; background: black; color: white; }
        .header { background: #0ff; padding: 20px; text-align: center; }
        section { padding: 20px; }
        footer { background: #111; padding: 10px; text-align: center; }
      `,
      js: `console.log('Loaded Fashion Portfolio Elite')`
    },
  
    "beauty-blog-1": {
      html: `
        <header class="header"><h1>Beauty Blog Premium</h1></header>
        <section><p>Trends, skincare, makeup and more.</p></section>
        <footer>© 2025 Beauty Premium</footer>
      `,
      css: `
        body { font-family: 'Roboto', sans-serif; background: #fff0f5; color: #333; }
        .header { background: pink; padding: 20px; text-align: center; }
        section { padding: 20px; }
        footer { background: #c71585; padding: 10px; text-align: center; color: white; }
      `,
      js: `console.log('Loaded Beauty Blog Premium')`
    },
  
    "fitness-coach-1": {
      html: `
        <header class="header"><h1>Fitness Coach Pro</h1></header>
        <section><p>Your journey to fitness excellence starts here.</p></section>
        <footer>© 2025 Fitness Pro</footer>
      `,
      css: `
        body { font-family: 'Open Sans', sans-serif; background: #e0ffe0; color: #222; }
        .header { background: #00c853; padding: 20px; text-align: center; }
        section { padding: 20px; }
        footer { background: #007f33; padding: 10px; text-align: center; color: white; }
      `,
      js: `console.log('Loaded Fitness Coach Pro')`
    },
  
    "travel-blog-1": {
      html: `
        <header class="header"><h1>Travel Explorer</h1></header>
        <section><p>Adventure awaits - explore the world with us.</p></section>
        <footer>© 2025 Explorer</footer>
      `,
      css: `
        body { font-family: 'Merriweather', serif; background: #f0f8ff; color: #222; }
        .header { background: #1e88e5; padding: 20px; text-align: center; }
        section { padding: 20px; }
        footer { background: #1565c0; padding: 10px; text-align: center; color: white; }
      `,
      js: `console.log('Loaded Travel Explorer')`
    },
  
    "gaming-streamer-1": {
      html: `
        <header class="header"><h1>Gaming Hub</h1></header>
        <section><p>Stream, play, and conquer!</p></section>
        <footer>© 2025 Gaming Hub</footer>
      `,
      css: `
        body { font-family: 'Orbitron', sans-serif; background: #0d0d0d; color: #0ff; }
        .header { background: #222; padding: 20px; text-align: center; }
        section { padding: 20px; }
        footer { background: #000; padding: 10px; text-align: center; color: #0ff; }
      `,
      js: `console.log('Loaded Gaming Hub')`
    },
  };
  ```

## File: src/components/templates/TemplateGrid.tsx
```
"use client";

import TemplateCard from "@/components/templates/TemplateCard";
import { templates } from "@/components/templates/templateData";

export default function TemplateGrid() {
  return (
    <div className="flex flex-wrap gap-8 justify-center p-8">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          id={template.id}
          title={template.title || template.name} // Use title if it exists, fallback to name
          description={template.description}
          category={template.category}
          imageUrl={template.thumbnail} // <-- THIS IS THE FIX
          price={template.price}
          featured={template.tier === "elite" || template.tier === "ultimate"}
        />
      ))}
    </div>
  );
}
```

## File: src/components/templates/TemplateCard.tsx
```
import React from 'react';
import Link from 'next/link';

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
  featured?: boolean;
}

export default function TemplateCard({
  id,
  title,
  description,
  category,
  imageUrl,
  price,
  featured = false,
}: TemplateCardProps) {
  return (
    <div className={`template-card bg-grey rounded-lg overflow-hidden transition-all duration-300 ${
      featured ? 'border-2 border-neon-blue' : ''
    }`}>
      <div 
        className="h-48 bg-dark-purple relative overflow-hidden"
        style={{
          backgroundImage: imageUrl ? \`url(\${imageUrl})\` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {!imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-neon-blue font-bold">Template Preview</span>
          </div>
        )}
        {featured && (
          <div className="absolute top-0 right-0 bg-neon-blue text-black px-3 py-1 text-xs font-bold">
            Featured
          </div>
        )}
        <div className="absolute top-2 left-2 bg-dark-purple bg-opacity-80 text-white px-2 py-1 text-xs rounded">
          {category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-heading font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-neon-blue font-bold">\${price}</span>
          <div className="flex space-x-2">
            <Link 
              href={\`/templates/\${id}/preview\`}
              className="p-2 bg-dark-purple rounded hover:bg-opacity-80 text-sm"
            >
              Preview
            </Link>
            <Link 
              href={\`/templates/\${id}/customize\`}
              className="p-2 bg-neon-blue text-black rounded hover:bg-opacity-80 text-sm font-medium"
            >
              Customize
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/components/premium/SocialMediaIntegration.tsx
```
import React, { useState } from 'react';

interface SocialMediaIntegrationProps {
  websiteId?: string;
}

export default function SocialMediaIntegration({ websiteId }: SocialMediaIntegrationProps) {
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const connectAccount = (platform: string) => {
    setIsConnecting(true);
    
    // In a real implementation, this would open OAuth flow for the platform
    // For now, we'll simulate a delay and add the platform to connected accounts
    setTimeout(() => {
      setConnectedAccounts(prev => [...prev, platform]);
      setIsConnecting(false);
    }, 1500);
  };
  
  const disconnectAccount = (platform: string) => {
    setConnectedAccounts(prev => prev.filter(p => p !== platform));
  };
  
  const isConnected = (platform: string) => {
    return connectedAccounts.includes(platform);
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center">
          <span className="text-black font-bold">SM</span>
        </div>
        <h2 className="text-xl font-heading font-bold">Social Media Integration</h2>
      </div>
      
      <p className="mb-6">
        Connect your social media accounts to enhance your website with live feeds, automatic post sharing,
        and seamless content integration.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Instagram */}
        <div className="bg-black rounded-lg p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 via-pink-500 to-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">IG</span>
            </div>
            <div>
              <h3 className="font-heading font-bold">Instagram</h3>
              <p className="text-sm text-gray-400">Connect your Instagram feed</p>
            </div>
          </div>
          
          {isConnected('instagram') ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-green-500">Connected</span>
                <button 
                  onClick={() => disconnectAccount('instagram')}
                  className="text-xs px-2 py-1 bg-dark-purple rounded hover:bg-opacity-80"
                >
                  Disconnect
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Display latest posts</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Show post captions</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Auto-share new website content</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => connectAccount('instagram')}
              disabled={isConnecting}
              className="w-full py-2 bg-dark-purple border border-neon-blue rounded font-medium hover:bg-opacity-80"
            >
              {isConnecting ? 'Connecting...' : 'Connect Instagram'}
            </button>
          )}
        </div>
        
        {/* TikTok */}
        <div className="bg-black rounded-lg p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">TT</span>
            </div>
            <div>
              <h3 className="font-heading font-bold">TikTok</h3>
              <p className="text-sm text-gray-400">Embed your TikTok videos</p>
            </div>
          </div>
          
          {isConnected('tiktok') ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-green-500">Connected</span>
                <button 
                  onClick={() => disconnectAccount('tiktok')}
                  className="text-xs px-2 py-1 bg-dark-purple rounded hover:bg-opacity-80"
                >
                  Disconnect
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Display latest videos</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Autoplay videos</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Show video stats</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => connectAccount('tiktok')}
              disabled={isConnecting}
              className="w-full py-2 bg-dark-purple border border-neon-blue rounded font-medium hover:bg-opacity-80"
            >
              {isConnecting ? 'Connecting...' : 'Connect TikTok'}
            </button>
          )}
        </div>
        
        {/* YouTube */}
        <div className="bg-black rounded-lg p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">YT</span>
            </div>
            <div>
              <h3 className="font-heading font-bold">YouTube</h3>
              <p className="text-sm text-gray-400">Showcase your YouTube channel</p>
            </div>
          </div>
          
          {isConnected('youtube') ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-green-500">Connected</span>
                <button 
                  onClick={() => disconnectAccount('youtube')}
                  className="text-xs px-2 py-1 bg-dark-purple rounded hover:bg-opacity-80"
                >
                  Disconnect
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Display latest videos</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Show video descriptions</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Enable channel subscription</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => connectAccount('youtube')}
              disabled={isConnecting}
              className="w-full py-2 bg-dark-purple border border-neon-blue rounded font-medium hover:bg-opacity-80"
            >
              {isConnecting ? 'Connecting...' : 'Connect YouTube'}
            </button>
          )}
        </div>
        
        {/* Twitter/X */}
        <div className="bg-black rounded-lg p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border border-gray-700">
              <span className="text-white font-bold">X</span>
            </div>
            <div>
              <h3 className="font-heading font-bold">Twitter/X</h3>
              <p className="text-sm text-gray-400">Display your Twitter feed</p>
            </div>
          </div>
          
          {isConnected('twitter') ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-green-500">Connected</span>
                <button 
                  onClick={() => disconnectAccount('twitter')}
                  className="text-xs px-2 py-1 bg-dark-purple rounded hover:bg-opacity-80"
                >
                  Disconnect
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Display latest tweets</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Show retweets</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Auto-share new website content</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-dark-purple rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => connectAccount('twitter')}
              disabled={isConnecting}
              className="w-full py-2 bg-dark-purple border border-neon-blue rounded font-medium hover:bg-opacity-80"
            >
              {isConnecting ? 'Connecting...' : 'Connect Twitter/X'}
            </button>
          )}
        </div>
      </div>
      
      <div className="bg-dark-purple rounded-lg p-6">
        <h3 className="font-heading font-bold mb-4">Social Feed Preview</h3>
        
        {connectedAccounts.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-black aspect-square rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-400">Post Preview {item}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm">Connected accounts: {connectedAccounts.length}</span>
              </div>
              <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">
                Customize Layout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Connect at least one social media account to preview your feed</p>
            <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">
              Connect Accounts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

## File: src/components/premium/MarketingToolkit.tsx
```
import React, { useState } from 'react';

interface MarketingToolkitProps {
  websiteId?: string;
}

export default function MarketingToolkit({ websiteId }: MarketingToolkitProps) {
  const [activeTab, setActiveTab] = useState<'email' | 'social' | 'seo'>('email');
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center">
          <span className="text-black font-bold">MT</span>
        </div>
        <h2 className="text-xl font-heading font-bold">Marketing Toolkit</h2>
      </div>
      
      <p className="mb-6">
        Promote your influencer website with our comprehensive marketing toolkit.
        Create email templates, social media graphics, and optimize your content for maximum reach.
      </p>
      
      <div className="mb-6">
        <div className="flex border-b border-dark-purple">
          <button
            onClick={() => setActiveTab('email')}
            className={`py-3 px-4 font-medium ${
              activeTab === 'email' 
                ? 'border-b-2 border-neon-blue text-neon-blue' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Email Templates
          </button>
          <button
            onClick={() => setActiveTab('social')}
            className={`py-3 px-4 font-medium ${
              activeTab === 'social' 
                ? 'border-b-2 border-neon-blue text-neon-blue' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Social Media Graphics
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`py-3 px-4 font-medium ${
              activeTab === 'seo' 
                ? 'border-b-2 border-neon-blue text-neon-blue' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            SEO Content
          </button>
        </div>
      </div>
      
      {activeTab === 'email' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="h-40 bg-dark-purple flex items-center justify-center">
                <span className="text-neon-blue font-bold">Welcome Email</span>
              </div>
              <div className="p-4">
                <h4 className="font-heading font-bold mb-2">Welcome Email</h4>
                <p className="text-sm text-gray-300 mb-4">Introduce yourself and your brand to new subscribers.</p>
                <div className="flex justify-between items-center">
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm">Preview</button>
                  <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">Use Template</button>
                </div>
              </div>
            </div>
            
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="h-40 bg-dark-purple flex items-center justify-center">
                <span className="text-neon-blue font-bold">New Content Alert</span>
              </div>
              <div className="p-4">
                <h4 className="font-heading font-bold mb-2">New Content Alert</h4>
                <p className="text-sm text-gray-300 mb-4">Notify subscribers about your latest content or products.</p>
                <div className="flex justify-between items-center">
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm">Preview</button>
                  <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">Use Template</button>
                </div>
              </div>
            </div>
            
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="h-40 bg-dark-purple flex items-center justify-center">
                <span className="text-neon-blue font-bold">Promotional Email</span>
              </div>
              <div className="p-4">
                <h4 className="font-heading font-bold mb-2">Promotional Email</h4>
                <p className="text-sm text-gray-300 mb-4">Promote your services, products, or special offers.</p>
                <div className="flex justify-between items-center">
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm">Preview</button>
                  <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">Use Template</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-purple rounded-lg p-4 mb-6">
            <h3 className="font-heading font-bold mb-2">Email Marketing Tips</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">→</span>
                <span>Personalize your emails with the subscriber's name</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">→</span>
                <span>Write compelling subject lines to improve open rates</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">→</span>
                <span>Include a clear call-to-action in every email</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-blue mr-2">→</span>
                <span>Optimize for mobile devices as most people check email on their phones</span>
              </li>
            </ul>
          </div>
          
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-dark-purple rounded">View All Templates</button>
            <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">Create Custom Email</button>
          </div>
        </div>
      )}
      
      {activeTab === 'social' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="h-40 bg-dark-purple flex items-center justify-center">
                <span className="text-neon-blue font-bold">Instagram Post</span>
              </div>
              <div className="p-4">
                <h4 className="font-heading font-bold mb-2">Instagram Post</h4>
                <p className="text-sm text-gray-300 mb-4">Square format graphics optimized for Instagram feed.</p>
                <div className="flex justify-between items-center">
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm">Preview</button>
                  <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">Create</button>
                </div>
              </div>
            </div>
            
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="h-40 bg-dark-purple flex items-center justify-center">
                <span className="text-neon-blue font-bold">Instagram Story</span>
              </div>
              <div className="p-4">
                <h4 className="font-heading font-bold mb-2">Instagram Story</h4>
                <p className="text-sm text-gray-300 mb-4">Vertical graphics designed for Instagram stories.</p>
                <div className="flex justify-between items-center">
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm">Preview</button>
                  <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">Create</button>
                </div>
              </div>
            </div>
            
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="h-40 bg-dark-purple flex items-center justify-center">
                <span className="text-neon-blue font-bold">Twitter/X Post</span>
              </div>
              <div className="p-4">
                <h4 className="font-heading font-bold mb-2">Twitter/X Post</h4>
                <p className="text-sm text-gray-300 mb-4">Graphics optimized for Twitter/X feed.</p>
                <div className="flex justify-between items-center">
                  <button className="px-3 py-1 bg-dark-purple rounded text-sm">Preview</button>
                  <button className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold">Create</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-purple rounded-lg p-4 mb-6">
            <h3 className="font-heading font-bold mb-2">Social Media Caption Generator</h3>
            <p className="text-sm mb-4">
              Generate engaging captions for your social media posts with our AI-powered caption generator.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Post Type</label>
                <select className="w-full p-2 bg-black border border-dark-purple rounded-md">
                  <option value="product">Product Showcase</option>
                  <option value="lifestyle">Lifestyle Content</option>
                  <option value="tutorial">Tutorial/How-To</option>
                  <option value="announcement">Announcement</option>
                  <option value="behind-scenes">Behind the Scenes</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Tone</label>
                <select className="w-full p-2 bg-black border border-dark-purple rounded-md">
                  <option value="professional">Professional</option>
                  <option value="casual">Casual & Friendly</option>
                  <option value="inspirational">Inspirational</option>
                  <option value="humorous">Humorous</option>
                  <option value="educational">Educational</option>
                </select>
              </div>
              
              <button className="w-full py-2 bg-neon-blue text-black rounded font-bold">
                Generate Caption
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-dark-purple rounded">View All Templates</button>
            <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">Custom Design</button>
          </div>
        </div>
      )}
      
      {activeTab === 'seo' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-black rounded-lg p-4">
              <h3 className="font-heading font-bold mb-4">SEO Content Generator</h3>
              <p className="text-sm mb-4">
                Generate SEO-optimized content for your website to improve search engine rankings.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Content Type</label>
                  <select className="w-full p-2 bg-dark-purple border border-dark-purple rounded-md">
                    <option value="about">About Me Page</option>
                    <option value="services">Services Page</option>
                    <option value="blog">Blog Post</option>
                    <option value="product">Product Description</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Keyword</label>
                  <input
                    type="text"
                    placeholder="e.g., fashion influencer, fitness coach"
                    className="w-full p-2 bg-dark-purple border border-dark-purple rounded-md"
                  />
                </div>
                
                <button className="w-full py-2 bg-neon-blue text-black rounded font-bold">
                  Generate Content
                </button>
              </div>
            </div>
            
            <div className="bg-black rounded-lg p-4">
              <h3 className="font-heading font-bold mb-4">Keyword Research</h3>
              <p className="text-sm mb-4">
                Find the best keywords for your niche to improve your website's visibility.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Niche</label>
                  <select className="w-full p-2 bg-dark-purple border border-dark-purple rounded-md">
                    <option value="fashion">Fashion</option>
                    <option value="beauty">Beauty</option>
                    <option value="fitness">Fitness</option>
                    <option value="travel">Travel</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="gaming">Gaming</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Seed Keyword</label>
                  <input
                    type="text"
                    placeholder="e.g., sustainable fashion, makeup tutorials"
                    className="w-full p-2 bg-dark-purple border border-dark-purple rounded-md"
                  />
                </div>
                
                <button className="w-full py-2 bg-neon-blue text-black rounded font-bold">
                  Find Keywords
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-purple rounded-lg p-4 mb-6">
            <h3 className="font-heading font-bold mb-2">SEO Checklist</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="meta-tags" className="mr-2" />
                <label htmlFor="meta-tags" className="text-sm">Optimize meta title and description</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="headings" className="mr-2" />
                <label htmlFor="headings" className="text-sm">Use proper heading structure (H1, H2, H3)</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="alt-text" className="mr-2" />
                <label htmlFor="alt-text" className="text-sm">Add alt text to all images</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="internal-links" className="mr-2" />
                <label htmlFor="internal-links" className="text-sm">Include internal links to other pages</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="mobile-friendly" className="mr-2" />
                <label htmlFor="mobile-friendly" className="text-sm">Ensure website is mobile-friendly</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="page-speed" className="mr-2" />
                <label htmlFor="page-speed" className="text-sm">Optimize page loading speed</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="social-meta" className="mr-2" />
                <label htmlFor="social-meta" className="text-sm">Add social media meta tags</label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button className="px-4 py-2 bg-dark-purple rounded">SEO Guide</button>
            <button className="px-4 py-2 bg-neon-blue text-black rounded font-bold">Run SEO Audit</button>
          </div>
        </div>
      )}
    </div>
  );
}
```

## File: src/components/premium/CollaborationFeatures.tsx
```
import React, { useState } from 'react';

interface CollaborationFeaturesProps {
  websiteId?: string;
}

export default function CollaborationFeatures({ websiteId }: CollaborationFeaturesProps) {
  const [collaborators, setCollaborators] = useState<any[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'editor', status: 'active' }
  ]);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('viewer');
  const [isInviting, setIsInviting] = useState(false);
  
  const inviteCollaborator = () => {
    if (!newEmail) return;
    
    setIsInviting(true);
    
    // In a real implementation, this would send an invitation email
    // For now, we'll simulate a delay and add the collaborator
    setTimeout(() => {
      const newCollaborator = {
        id: collaborators.length + 2,
        name: newEmail.split('@')[0],
        email: newEmail,
        role: newRole,
        status: 'pending'
      };
      
      setCollaborators([...collaborators, newCollaborator]);
      setNewEmail('');
      setIsInviting(false);
    }, 1500);
  };
  
  const removeCollaborator = (id: number) => {
    setCollaborators(collaborators.filter(c => c.id !== id));
  };
  
  const changeRole = (id: number, role: string) => {
    setCollaborators(collaborators.map(c => 
      c.id === id ? { ...c, role } : c
    ));
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center">
          <span className="text-black font-bold">CO</span>
        </div>
        <h2 className="text-xl font-heading font-bold">Collaboration Features</h2>
      </div>
      
      <p className="mb-6">
        Invite team members to collaborate on your website. Assign different roles to control what they can edit.
      </p>
      
      <div className="space-y-6">
        <div className="bg-black rounded-lg p-4">
          <h3 className="font-heading font-bold mb-4">Invite Collaborators</h3>
          
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 mb-4">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
            />
            
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="md:w-1/4 p-3 bg-dark-purple border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
            
            <button
              onClick={inviteCollaborator}
              disabled={!newEmail || isInviting}
              className="md:w-1/4 py-3 bg-neon-blue text-black rounded-md font-bold"
            >
              {isInviting ? 'Sending...' : 'Invite'}
            </button>
          </div>
          
          <div className="text-xs text-gray-400 space-y-1">
            <p>• Admin: Full access to edit and publish</p>
            <p>• Editor: Can edit content but not publish</p>
            <p>• Viewer: Can view but not edit</p>
          </div>
        </div>
        
        <div className="bg-black rounded-lg p-4">
          <h3 className="font-heading font-bold mb-4">Current Collaborators</h3>
          
          {collaborators.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-dark-purple">
                    <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Name</th>
                    <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Email</th>
                    <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Role</th>
                    <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Status</th>
                    <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {collaborators.map(collaborator => (
                    <tr key={collaborator.id} className="border-b border-dark-purple">
                      <td className="py-3 text-sm">{collaborator.name}</td>
                      <td className="py-3 text-sm">{collaborator.email}</td>
                      <td className="py-3 text-sm">
                        <select
                          value={collaborator.role}
                          onChange={(e) => changeRole(collaborator.id, e.target.value)}
                          className="bg-dark-purple border border-dark-purple rounded p-1 text-xs"
                        >
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </td>
                      <td className="py-3 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          collaborator.status === 'active' 
                            ? 'bg-green-900 text-green-500' 
                            : 'bg-yellow-900 text-yellow-500'
                        }`}>
                          {collaborator.status === 'active' ? 'Active' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 text-sm">
                        <button
                          onClick={() => removeCollaborator(collaborator.id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">No collaborators yet</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black rounded-lg p-4">
            <h3 className="font-heading font-bold mb-4">Activity Log</h3>
            
            <div className="space-y-3">
              <div className="border-l-2 border-neon-blue pl-3">
                <p className="text-sm">John edited the homepage</p>
                <p className="text-xs text-gray-400">Today, 2:30 PM</p>
              </div>
              
              <div className="border-l-2 border-dark-purple pl-3">
                <p className="text-sm">You updated the about section</p>
                <p className="text-xs text-gray-400">Today, 11:15 AM</p>
              </div>
              
              <div className="border-l-2 border-dark-purple pl-3">
                <p className="text-sm">You invited john@example.com</p>
                <p className="text-xs text-gray-400">Yesterday, 4:45 PM</p>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2 bg-dark-purple rounded text-sm">
              View All Activity
            </button>
          </div>
          
          <div className="bg-black rounded-lg p-4">
            <h3 className="font-heading font-bold mb-4">Version History</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 hover:bg-dark-purple rounded cursor-pointer">
                <div>
                  <p className="text-sm">Current Version</p>
                  <p className="text-xs text-gray-400">Today, 2:30 PM</p>
                </div>
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">
                  Current
                </button>
              </div>
              
              <div className="flex justify-between items-center p-2 hover:bg-dark-purple rounded cursor-pointer">
                <div>
                  <p className="text-sm">Version 2</p>
                  <p className="text-xs text-gray-400">Today, 11:15 AM</p>
                </div>
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">
                  Restore
                </button>
              </div>
              
              <div className="flex justify-between items-center p-2 hover:bg-dark-purple rounded cursor-pointer">
                <div>
                  <p className="text-sm">Version 1</p>
                  <p className="text-xs text-gray-400">Yesterday, 4:45 PM</p>
                </div>
                <button className="text-xs px-2 py-1 bg-dark-purple rounded">
                  Restore
                </button>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2 bg-dark-purple rounded text-sm">
              View All Versions
            </button>
          </div>
        </div>
        
        <div className="bg-dark-purple rounded-lg p-4">
          <h3 className="font-heading font-bold mb-2">Collaboration Settings</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Enable real-time collaboration</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-black rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Show edit history</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-black rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Auto-save changes</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-black rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
              </label>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Email notifications for changes</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-black rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon-blue"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/components/premium/CustomDomainConnection.tsx
```
import React, { useState } from 'react';

interface CustomDomainProps {
  websiteId?: string;
}

export default function CustomDomainConnection({ websiteId }: CustomDomainProps) {
  const [domain, setDomain] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'none' | 'pending' | 'verified' | 'error'>('none');
  const [errorMessage, setErrorMessage] = useState('');
  
  const connectDomain = () => {
    if (!domain) return;
    
    setIsConnecting(true);
    setConnectionStatus('pending');
    
    // In a real implementation, this would initiate the domain connection process
    // For now, we'll simulate a delay and set the status to pending
    setTimeout(() => {
      setIsConnecting(false);
    }, 1500);
  };
  
  const verifyDomain = () => {
    setIsVerifying(true);
    
    // In a real implementation, this would check DNS records
    // For now, we'll simulate a delay and set the status to verified
    setTimeout(() => {
      setConnectionStatus('verified');
      setIsVerifying(false);
    }, 2000);
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center">
          <span className="text-black font-bold">CD</span>
        </div>
        <h2 className="text-xl font-heading font-bold">Custom Domain Connection</h2>
      </div>
      
      <p className="mb-6">
        Connect your own domain name to your website for a professional online presence.
        Your visitors will see your custom domain instead of our default URL.
      </p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Domain Name</label>
          <div className="flex">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="yourdomain.com"
              className="flex-1 p-3 bg-black border border-dark-purple rounded-l-md focus:ring-2 focus:ring-neon-blue"
              disabled={connectionStatus === 'pending' || connectionStatus === 'verified'}
            />
            <button
              onClick={connectDomain}
              disabled={!domain || isConnecting || connectionStatus === 'verified'}
              className="px-4 py-3 bg-neon-blue text-black rounded-r-md font-bold"
            >
              {isConnecting ? 'Connecting...' : 'Connect'}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Enter your domain without 'http://' or 'www.' (e.g., yourdomain.com)
          </p>
        </div>
        
        {connectionStatus === 'pending' && (
          <div className="bg-black rounded-lg p-4">
            <h3 className="font-heading font-bold mb-4">DNS Configuration</h3>
            <p className="text-sm mb-4">
              To connect your domain, you'll need to update your DNS records at your domain registrar.
              Add the following records:
            </p>
            
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-dark-purple">
                    <th className="py-2 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Type</th>
                    <th className="py-2 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Name</th>
                    <th className="py-2 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Value</th>
                    <th className="py-2 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">TTL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-dark-purple">
                    <td className="py-2 text-sm">A</td>
                    <td className="py-2 text-sm">@</td>
                    <td className="py-2 text-sm">192.168.100.1</td>
                    <td className="py-2 text-sm">3600</td>
                  </tr>
                  <tr className="border-b border-dark-purple">
                    <td className="py-2 text-sm">CNAME</td>
                    <td className="py-2 text-sm">www</td>
                    <td className="py-2 text-sm">{domain}</td>
                    <td className="py-2 text-sm">3600</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm">TXT</td>
                    <td className="py-2 text-sm">@</td>
                    <td className="py-2 text-sm">website-verification=abc123</td>
                    <td className="py-2 text-sm">3600</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-sm mb-4">
              DNS changes can take up to 48 hours to propagate. Once you've updated your DNS records,
              click the Verify button to check if your domain is properly connected.
            </p>
            
            <button
              onClick={verifyDomain}
              disabled={isVerifying}
              className="w-full py-2 bg-dark-purple border border-neon-blue rounded font-medium"
            >
              {isVerifying ? 'Verifying...' : 'Verify Connection'}
            </button>
          </div>
        )}
        
        {connectionStatus === 'verified' && (
          <div className="bg-green-900 bg-opacity-30 border border-green-500 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="font-heading font-bold text-green-500">Domain Successfully Connected!</h3>
            </div>
            
            <p className="text-sm mb-4">
              Your domain {domain} is now connected to your website. Visitors can access your site at:
            </p>
            
            <div className="bg-black p-3 rounded mb-4">
              <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">
                https://{domain}
              </a>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">SSL Certificate</span>
                <span className="px-2 py-1 bg-green-900 text-green-500 text-xs rounded-full">Active</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Domain Status</span>
                <span className="px-2 py-1 bg-green-900 text-green-500 text-xs rounded-full">Active</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">DNS Propagation</span>
                <span className="px-2 py-1 bg-green-900 text-green-500 text-xs rounded-full">Complete</span>
              </div>
            </div>
          </div>
        )}
        
        {connectionStatus === 'error' && (
          <div className="bg-red-900 bg-opacity-30 border border-red-500 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <h3 className="font-heading font-bold text-red-500">Connection Error</h3>
            </div>
            
            <p className="text-sm mb-4">
              {errorMessage || "We couldn't connect your domain. Please check your DNS settings and try again."}
            </p>
            
            <button
              onClick={() => setConnectionStatus('none')}
              className="w-full py-2 bg-dark-purple border border-neon-blue rounded font-medium"
            >
              Try Again
            </button>
          </div>
        )}
        
        <div className="bg-dark-purple rounded-lg p-4">
          <h3 className="font-heading font-bold mb-2">Domain Benefits</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">✓</span>
              <span>Professional branding with your own domain name</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">✓</span>
              <span>Free SSL certificate for secure browsing</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">✓</span>
              <span>Improved SEO and search engine visibility</span>
            </li>
            <li className="flex items-start">
              <span className="text-neon-blue mr-2">✓</span>
              <span>Email forwarding options (coming soon)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
```

## File: src/components/premium/SEOTools.tsx
```
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
```

## File: src/components/premium/AIRecommendationEngine.tsx
```
import React, { useState } from 'react';
import { Template } from '../templates/templateData';

interface AIRecommendationProps {
  userPreferences?: {
    industry?: string;
    style?: string;
    goals?: string[];
    audience?: string;
  };
  onRecommendationSelected: (templateId: string) => void;
}

export default function AIRecommendationEngine({ userPreferences, onRecommendationSelected }: AIRecommendationProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [recommendations, setRecommendations] = useState<Template[]>([]);
  
  const generateRecommendations = async () => {
    setIsGenerating(true);
    
    // In a real implementation, this would call an AI service
    // For now, we'll simulate a delay and return mock recommendations
    setTimeout(() => {
      // Mock recommendations based on user input
      const mockRecommendations = [
        {
          id: 'fashion-portfolio-1',
          title: 'Fashion Portfolio Elite',
          description: 'Recommended based on your style preferences and audience demographics.',
          category: 'fashion',
          imageUrl: '/templates/fashion-portfolio-1.jpg',
          price: 50,
          featured: true,
          tags: ['fashion', 'portfolio', 'minimalist', 'elegant']
        },
        {
          id: 'lifestyle-blog-1',
          title: 'Lifestyle Blog Elite',
          description: 'This template aligns with your content goals and engagement strategy.',
          category: 'lifestyle',
          imageUrl: '/templates/lifestyle-blog-1.jpg',
          price: 50,
          featured: true,
          tags: ['lifestyle', 'blog', 'versatile', 'multi-niche']
        },
        {
          id: 'beauty-portfolio-1',
          title: 'Beauty Portfolio',
          description: 'Based on your audience demographics and content style.',
          category: 'beauty',
          imageUrl: '/templates/beauty-portfolio-1.jpg',
          price: 50,
          featured: true,
          tags: ['beauty', 'portfolio', 'makeup', 'skincare']
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsGenerating(false);
    }, 2000);
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center">
          <span className="text-black font-bold">AI</span>
        </div>
        <h2 className="text-xl font-heading font-bold">AI Template Recommendations</h2>
      </div>
      
      <p className="mb-6">
        Our AI can analyze your needs and recommend the perfect template for your influencer website.
        Describe your content, style preferences, and audience to get personalized recommendations.
      </p>
      
      <div className="space-y-4 mb-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your influencer niche, content style, and what you want to achieve with your website..."
          className="w-full p-4 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue h-32"
        ></textarea>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Primary Niche</label>
            <select className="w-full p-3 bg-black border border-dark-purple rounded-md">
              <option value="">Select your niche</option>
              <option value="fashion">Fashion</option>
              <option value="beauty">Beauty</option>
              <option value="fitness">Fitness</option>
              <option value="travel">Travel</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="gaming">Gaming</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Content Focus</label>
            <select className="w-full p-3 bg-black border border-dark-purple rounded-md">
              <option value="">Select content type</option>
              <option value="photos">Photography</option>
              <option value="videos">Video Content</option>
              <option value="blog">Written Content</option>
              <option value="products">Product Showcase</option>
              <option value="services">Services</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Audience Age</label>
            <select className="w-full p-3 bg-black border border-dark-purple rounded-md">
              <option value="">Select age range</option>
              <option value="teens">13-17</option>
              <option value="young-adults">18-24</option>
              <option value="adults">25-34</option>
              <option value="mature">35-50</option>
              <option value="senior">50+</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={generateRecommendations}
          disabled={isGenerating}
          className="w-full py-3 bg-neon-blue text-black rounded-md font-bold"
        >
          {isGenerating ? 'Analyzing Your Needs...' : 'Get AI Recommendations'}
        </button>
      </div>
      
      {recommendations.length > 0 && (
        <div className="border-t border-dark-purple pt-6">
          <h3 className="font-heading font-bold mb-4">Recommended Templates for You</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((template) => (
              <div key={template.id} className="bg-black rounded-lg overflow-hidden border border-dark-purple">
                <div className="h-40 bg-dark-purple flex items-center justify-center">
                  <span className="text-neon-blue font-bold">Template Preview</span>
                </div>
                <div className="p-4">
                  <h4 className="font-heading font-bold mb-2">{template.title}</h4>
                  <p className="text-sm text-gray-300 mb-4">{template.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-neon-blue font-bold">${template.price}</span>
                    <button
                      onClick={() => onRecommendationSelected(template.id)}
                      className="px-3 py-1 bg-neon-blue text-black rounded text-sm font-bold"
                    >
                      Select Template
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-dark-purple rounded-lg">
            <h4 className="font-heading font-bold mb-2">Why These Templates?</h4>
            <p className="text-sm">
              Our AI analyzed your requirements and found these templates to be the best match for your influencer profile.
              They align with your content style, audience demographics, and business goals.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
```

## File: src/components/premium/AssetLibrary.tsx
```
import React, { useState } from 'react';

interface AssetLibraryProps {
  websiteId?: string;
}

export default function AssetLibrary({ websiteId }: AssetLibraryProps) {
  const [activeCategory, setActiveCategory] = useState('images');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  
  // Mock asset data
  const assets = {
    images: [
      { id: 'img1', name: 'Fashion Model 1', category: 'fashion', thumbnail: '/assets/fashion1.jpg', premium: true },
      { id: 'img2', name: 'Fashion Model 2', category: 'fashion', thumbnail: '/assets/fashion2.jpg', premium: true },
      { id: 'img3', name: 'Fitness Trainer', category: 'fitness', thumbnail: '/assets/fitness1.jpg', premium: true },
      { id: 'img4', name: 'Travel Landscape', category: 'travel', thumbnail: '/assets/travel1.jpg', premium: true },
      { id: 'img5', name: 'Beauty Product', category: 'beauty', thumbnail: '/assets/beauty1.jpg', premium: true },
      { id: 'img6', name: 'Gaming Setup', category: 'gaming', thumbnail: '/assets/gaming1.jpg', premium: true },
      { id: 'img7', name: 'Lifestyle Shot', category: 'lifestyle', thumbnail: '/assets/lifestyle1.jpg', premium: false },
      { id: 'img8', name: 'Food Photography', category: 'food', thumbnail: '/assets/food1.jpg', premium: false },
    ],
    icons: [
      { id: 'icon1', name: 'Social Media Icons', category: 'social', thumbnail: '/assets/icons1.jpg', premium: true },
      { id: 'icon2', name: 'E-commerce Icons', category: 'ecommerce', thumbnail: '/assets/icons2.jpg', premium: true },
      { id: 'icon3', name: 'UI Elements', category: 'ui', thumbnail: '/assets/icons3.jpg', premium: true },
      { id: 'icon4', name: 'Line Icons', category: 'line', thumbnail: '/assets/icons4.jpg', premium: false },
    ],
    fonts: [
      { id: 'font1', name: 'Montserrat', category: 'sans-serif', thumbnail: '/assets/font1.jpg', premium: true },
      { id: 'font2', name: 'Nunito Sans', category: 'sans-serif', thumbnail: '/assets/font2.jpg', premium: true },
      { id: 'font3', name: 'Playfair Display', category: 'serif', thumbnail: '/assets/font3.jpg', premium: true },
      { id: 'font4', name: 'Roboto', category: 'sans-serif', thumbnail: '/assets/font4.jpg', premium: false },
    ],
    graphics: [
      { id: 'graphic1', name: 'Abstract Shapes', category: 'abstract', thumbnail: '/assets/graphic1.jpg', premium: true },
      { id: 'graphic2', name: 'Background Patterns', category: 'patterns', thumbnail: '/assets/graphic2.jpg', premium: true },
      { id: 'graphic3', name: 'Gradients', category: 'gradients', thumbnail: '/assets/graphic3.jpg', premium: true },
      { id: 'graphic4', name: 'Textures', category: 'textures', thumbnail: '/assets/graphic4.jpg', premium: false },
    ]
  };
  
  const getFilteredAssets = () => {
    const categoryAssets = assets[activeCategory as keyof typeof assets] || [];
    
    if (!searchQuery) return categoryAssets;
    
    return categoryAssets.filter(asset => 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const toggleAssetSelection = (assetId: string) => {
    if (selectedAssets.includes(assetId)) {
      setSelectedAssets(selectedAssets.filter(id => id !== assetId));
    } else {
      setSelectedAssets([...selectedAssets, assetId]);
    }
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center">
          <span className="text-black font-bold">AL</span>
        </div>
        <h2 className="text-xl font-heading font-bold">Premium Asset Library</h2>
      </div>
      
      <p className="mb-6">
        Access our curated collection of premium assets to enhance your website.
        High-quality images, icons, fonts, and graphics designed specifically for influencers.
      </p>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex overflow-x-auto pb-2 md:pb-0">
            <button 
              onClick={() => setActiveCategory('images')}
              className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                activeCategory === 'images' 
                  ? 'bg-neon-blue text-black font-bold' 
                  : 'bg-dark-purple hover:bg-opacity-80'
              }`}
            >
              Images
            </button>
            <button 
              onClick={() => setActiveCategory('icons')}
              className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                activeCategory === 'icons' 
                  ? 'bg-neon-blue text-black font-bold' 
                  : 'bg-dark-purple hover:bg-opacity-80'
              }`}
            >
              Icons
            </button>
            <button 
              onClick={() => setActiveCategory('fonts')}
              className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                activeCategory === 'fonts' 
                  ? 'bg-neon-blue text-black font-bold' 
                  : 'bg-dark-purple hover:bg-opacity-80'
              }`}
            >
              Fonts
            </button>
            <button 
              onClick={() => setActiveCategory('graphics')}
              className={`px-4 py-2 rounded-md mr-2 whitespace-nowrap ${
                activeCategory === 'graphics' 
                  ? 'bg-neon-blue text-black font-bold' 
                  : 'bg-dark-purple hover:bg-opacity-80'
              }`}
            >
              Graphics
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeCategory}...`}
              className="w-full md:w-64 p-2 pl-8 bg-black border border-dark-purple rounded-md focus:ring-2 focus:ring-neon-blue"
            />
            <svg className="w-4 h-4 absolute left-2 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {getFilteredAssets().map(asset => (
            <div 
              key={asset.id}
              onClick={() => toggleAssetSelection(asset.id)}
              className={`bg-black rounded-lg overflow-hidden cursor-pointer transition-all ${
                selectedAssets.includes(asset.id) ? 'ring-2 ring-neon-blue' : 'hover:bg-dark-purple'
              }`}
            >
              <div className="h-32 bg-dark-purple flex items-center justify-center">
                <span className="text-neon-blue font-bold">{asset.name}</span>
              </div>
              <div className="p-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium truncate">{asset.name}</h4>
                  {asset.premium && (
                    <span className="px-2 py-0.5 bg-neon-blue text-black rounded text-xs font-bold">
                      PRO
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 capitalize">{asset.category}</p>
              </div>
            </div>
          ))}
        </div>
        
        {getFilteredAssets().length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No assets found matching your search</p>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm">{selectedAssets.length} assets selected</span>
          </div>
          <div className="flex space-x-3">
            <button 
              disabled={selectedAssets.length === 0}
              className={`px-4 py-2 rounded-md ${
                selectedAssets.length > 0 
                  ? 'bg-dark-purple hover:bg-opacity-80' 
                  : 'bg-dark-purple opacity-50 cursor-not-allowed'
              }`}
            >
              Preview
            </button>
            <button 
              disabled={selectedAssets.length === 0}
              className={`px-4 py-2 rounded-md ${
                selectedAssets.length > 0 
                  ? 'bg-neon-blue text-black font-bold' 
                  : 'bg-dark-purple opacity-50 cursor-not-allowed'
              }`}
            >
              Add to Website
            </button>
          </div>
        </div>
        
        <div className="bg-dark-purple rounded-lg p-4">
          <h3 className="font-heading font-bold mb-2">Premium Assets</h3>
          <p className="text-sm mb-4">
            Our premium asset library includes over 5,000 high-quality assets specifically designed for influencer websites.
            All assets are licensed for commercial use and regularly updated with new content.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div>
              <p className="font-bold text-2xl text-neon-blue">2,500+</p>
              <p>Stock Photos</p>
            </div>
            <div>
              <p className="font-bold text-2xl text-neon-blue">1,000+</p>
              <p>Icons</p>
            </div>
            <div>
              <p className="font-bold text-2xl text-neon-blue">200+</p>
              <p>Premium Fonts</p>
            </div>
            <div>
              <p className="font-bold text-2xl text-neon-blue">1,500+</p>
              <p>Graphics & Elements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## File: src/components/premium/AnalyticsDashboard.tsx
```
import React, { useState } from 'react';

interface AnalyticsDashboardProps {
  websiteId?: string;
  dateRange?: 'day' | 'week' | 'month' | 'year';
}

export default function AnalyticsDashboard({ websiteId, dateRange = 'month' }: AnalyticsDashboardProps) {
  const [selectedDateRange, setSelectedDateRange] = useState(dateRange);
  const [selectedMetric, setSelectedMetric] = useState('visitors');
  
  // In a real implementation, this would fetch actual analytics data
  // For now, we'll use mock data
  const analyticsData = {
    visitors: {
      total: 1254,
      change: 12.5,
      data: [120, 145, 160, 180, 210, 205, 234]
    },
    pageviews: {
      total: 3842,
      change: 8.2,
      data: [350, 420, 480, 510, 590, 620, 872]
    },
    bounceRate: {
      total: 42.3,
      change: -5.1,
      data: [48, 46, 45, 44, 43, 42, 42.3]
    },
    avgTime: {
      total: 2.4,
      change: 15.3,
      data: [1.8, 1.9, 2.1, 2.2, 2.3, 2.4, 2.4]
    }
  };
  
  const getMetricData = () => {
    return analyticsData[selectedMetric as keyof typeof analyticsData];
  };
  
  const getMetricUnit = () => {
    switch (selectedMetric) {
      case 'visitors':
      case 'pageviews':
        return '';
      case 'bounceRate':
        return '%';
      case 'avgTime':
        return ' min';
      default:
        return '';
    }
  };
  
  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'visitors':
        return 'Unique Visitors';
      case 'pageviews':
        return 'Page Views';
      case 'bounceRate':
        return 'Bounce Rate';
      case 'avgTime':
        return 'Avg. Time on Site';
      default:
        return selectedMetric;
    }
  };
  
  return (
    <div className="bg-grey rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-heading font-bold">Website Analytics Dashboard</h2>
        <div className="flex space-x-4">
          <select 
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value as any)}
            className="p-2 bg-black border border-dark-purple rounded"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-4 py-2 bg-dark-purple rounded border border-neon-blue">
            Export Report
          </button>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {Object.entries(analyticsData).map(([key, value]) => (
          <div 
            key={key}
            onClick={() => setSelectedMetric(key)}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              selectedMetric === key 
                ? 'bg-dark-purple border-2 border-neon-blue' 
                : 'bg-black hover:bg-dark-purple'
            }`}
          >
            <h3 className="text-sm font-medium mb-2 capitalize">
              {key === 'avgTime' ? 'Avg. Time on Site' : key.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold">
                {value.total}{key === 'bounceRate' ? '%' : key === 'avgTime' ? ' min' : ''}
              </p>
              <p className={`text-sm ${value.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {value.change >= 0 ? '+' : ''}{value.change}%
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Chart */}
      <div className="bg-black rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-heading font-bold">{getMetricLabel()}</h3>
          <div className="flex space-x-4">
            <button className="text-xs px-2 py-1 bg-dark-purple rounded">Daily</button>
            <button className="text-xs px-2 py-1 bg-dark-purple rounded">Weekly</button>
            <button className="text-xs px-2 py-1 bg-neon-blue text-black rounded">Monthly</button>
          </div>
        </div>
        
        <div className="h-64 flex items-end space-x-2">
          {getMetricData().data.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className={`w-full ${index === getMetricData().data.length - 1 ? 'bg-neon-blue' : 'bg-dark-purple'}`} 
                style={{ height: `${(value / Math.max(...getMetricData().data)) * 80}%` }}
              ></div>
              <div className="text-xs mt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Traffic Sources & Visitor Demographics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-black rounded-lg p-6">
          <h3 className="font-heading font-bold mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-neon-blue rounded-full mr-2"></div>
                <span>Social Media</span>
              </div>
              <span>45%</span>
            </div>
            <div className="w-full bg-dark-purple rounded-full h-2">
              <div className="bg-neon-blue h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span>Direct</span>
              </div>
              <span>30%</span>
            </div>
            <div className="w-full bg-dark-purple rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                <span>Search</span>
              </div>
              <span>15%</span>
            </div>
            <div className="w-full bg-dark-purple rounded-full h-2">
              <div className="bg-pink-500 h-2 rounded-full" style={{ width: '15%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Referral</span>
              </div>
              <span>10%</span>
            </div>
            <div className="w-full bg-dark-purple rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-black rounded-lg p-6">
          <h3 className="font-heading font-bold mb-4">Visitor Demographics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Age Groups</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>18-24</span>
                  <span>35%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>25-34</span>
                  <span>42%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>35-44</span>
                  <span>15%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>45+</span>
                  <span>8%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Devices</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Mobile</span>
                  <span>68%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Desktop</span>
                  <span>27%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Tablet</span>
                  <span>5%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Gender</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Female</span>
                  <span>62%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Male</span>
                  <span>36%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Other</span>
                  <span>2%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Top Locations</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>United States</span>
                  <span>45%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>United Kingdom</span>
                  <span>12%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Canada</span>
                  <span>8%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Australia</span>
                  <span>6%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popular Content */}
      <div className="mt-8 bg-black rounded-lg p-6">
        <h3 className="font-heading font-bold mb-4">Popular Content</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-dark-purple">
                <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Page</th>
                <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Views</th>
                <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Avg. Time</th>
                <th className="py-3 text-left text-xs font-medium text-neon-blue uppercase tracking-wider">Bounce Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-dark-purple">
                <td className="py-3 text-sm">/home</td>
                <td className="py-3 text-sm">1,245</td>
                <td className="py-3 text-sm">2:15</td>
                <td className="py-3 text-sm">32%</td>
              </tr>
              <tr className="border-b border-dark-purple">
                <td className="py-3 text-sm">/portfolio</td>
                <td className="py-3 text-sm">876</td>
                <td className="py-3 text-sm">3:42</td>
                <td className="py-3 text-sm">28%</td>
              </tr>
              <tr className="border-b border-dark-purple">
                <td className="py-3 text-sm">/about</td>
                <td className="py-3 text-sm">654</td>
                <td className="py-3 text-sm">1:50</td>
                <td className="py-3 text-sm">45%</td>
              </tr>
              <tr className="border-b border-dark-purple">
                <td className="py-3 text-sm">/contact</td>
                <td className="py-3 text-sm">432</td>
                <td className="py-3 text-sm">1:05</td>
                <td className="py-3 text-sm">38%</td>
              </tr>
              <tr>
                <td className="py-3 text-sm">/blog/latest-post</td>
                <td className="py-3 text-sm">321</td>
                <td className="py-3 text-sm">4:20</td>
                <td className="py-3 text-sm">22%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
```

## File: src/hooks/use-mobile.tsx
```
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```

## File: src/hooks/use-toast.ts
```
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }
```

## File: src/lib/utils.ts
```
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## File: src/templates/template2/index.tsx
```
export default function CustomTemplate({
  headline = "Build Your Next Project",
  subtext = "Launch faster with this clean business-focused template.",
  ctaText = "Get Started",
}) {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-5xl font-bold text-black mb-4 text-center">{headline}</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">{subtext}</p>
      <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-lg font-medium text-white">
        {ctaText}
      </button>
    </main>
  );
}```

## File: package.json
```
{
  "name": "website-generator-app",
  "version": "0.1.0",
  "private": true,
  "workspaces": [
    ".",
    "worker"
  ],
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@plasmicapp/loader-nextjs": "^1.0.422",
    "@radix-ui/react-accordion": "^1.2.2",
    "@radix-ui/react-alert-dialog": "^1.1.4",
    "@radix-ui/react-aspect-ratio": "^1.1.1",
    "@radix-ui/react-avatar": "^1.1.2",
    "@radix-ui/react-checkbox": "^1.1.3",
    "@radix-ui/react-collapsible": "^1.1.2",
    "@radix-ui/react-context-menu": "^2.2.4",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-hover-card": "^1.1.4",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-menubar": "^1.1.4",
    "@radix-ui/react-navigation-menu": "^1.2.3",
    "@radix-ui/react-popover": "^1.1.4",
    "@radix-ui/react-progress": "^1.1.1",
    "@radix-ui/react-radio-group": "^1.2.2",
    "@radix-ui/react-scroll-area": "^1.2.2",
    "@radix-ui/react-select": "^2.1.4",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slider": "^1.2.2",
    "@radix-ui/react-slot": "^1.1.1",
    "@radix-ui/react-switch": "^1.1.2",
    "@radix-ui/react-tabs": "^1.1.2",
    "@radix-ui/react-toast": "^1.2.4",
    "@radix-ui/react-toggle": "^1.1.1",
    "@radix-ui/react-toggle-group": "^1.1.1",
    "@radix-ui/react-tooltip": "^1.1.6",
    "@stripe/react-stripe-js": "^3.6.0",
    "@stripe/stripe-js": "^7.2.0",
    "caniuse-lite": "1.0.30001281",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "1.0.0",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.5.2",
    "framer-motion": "^12.9.4",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.364.0",
    "next": "^15.1.4",
    "next-themes": "^0.4.4",
    "react": "^19.1.0",
    "react-day-picker": "8.10.1",
    "react-dom": "^19.1.0",
    "react-hook-form": "^7.54.2",
    "react-resizable-panels": "^2.1.7",
    "recharts": "^2.12.4",
    "sonner": "^1.7.2",
    "stripe": "^18.0.0",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^1.1.2",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20250109.0",
    "@eslint/eslintrc": "^3",
    "@opennextjs/cloudflare": "^0.3.8",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.1.4",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "turbo": "^2.3.3",
    "typescript": "^5",
    "wrangler": "^3.102.0"
  },
  "packageManager": "pnpm@10.0.0-rc.2+sha512.b6e59b96f90ca92449ac2f6dca9b430880448fc97d21f0fa9200e3d5ddb5289ad535255400554f7f3486e2d60058492161aaa9b58828e81f50c096718be9d156"
}
```

## File: tsconfig.json
```
{
  "compilerOptions": {
    "target": "ES2017",
    "types": [
      "@cloudflare/workers-types/2023-07-01"
    ],
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
  },
  "include": [
    "next-env.d.ts",
    "env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    "next.config.mjs"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## File: next.config.ts
```
/** next.config.js */
module.exports = {
  experimental: {
    cache: false,               // turn off webpack’s file-based cache
  },
};
```

## File: tailwind.config.ts
```
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        grey: '#333333',
        'dark-purple': '#2D1B69',
        'neon-blue': '#00FFFF',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
```

## File: postcss.config.mjs
```
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
```

## File: eslint.config.mjs
```
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

## File: README.md
```
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
```

