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
