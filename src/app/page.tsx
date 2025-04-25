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
