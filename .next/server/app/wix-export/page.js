(()=>{var e={};e.id=34,e.ids=[34],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},9551:e=>{"use strict";e.exports=require("url")},771:(e,t,o)=>{"use strict";o.r(t),o.d(t,{GlobalError:()=>a.a,__next_app__:()=>m,pages:()=>d,routeModule:()=>x,tree:()=>c});var r=o(260),s=o(8203),i=o(5155),a=o.n(i),n=o(7292),l={};for(let e in n)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);o.d(t,l);let c=["",{children:["wix-export",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(o.bind(o,7197)),"/home/ubuntu/website-generator/website-generator-app/src/app/wix-export/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(o.bind(o,440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(o.bind(o,1354)),"/home/ubuntu/website-generator/website-generator-app/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(o.t.bind(o,9937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(o.t.bind(o,9116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(o.t.bind(o,1485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(o.bind(o,440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/home/ubuntu/website-generator/website-generator-app/src/app/wix-export/page.tsx"],m={require:o,loadChunk:()=>Promise.resolve()},x=new r.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/wix-export/page",pathname:"/wix-export",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},1186:(e,t,o)=>{Promise.resolve().then(o.bind(o,7197))},8042:(e,t,o)=>{Promise.resolve().then(o.bind(o,193))},193:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>a});var r=o(5512),s=o(8009),i=o(1412);function a(){let[e,t]=(0,s.useState)(""),[o,a]=(0,s.useState)("idle"),[n,l]=(0,s.useState)(1),c=async()=>{a("generating");try{new i.A;let e=`
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
      `;await new Promise(e=>setTimeout(e,1e3)),t(e),a("success")}catch(e){console.error("Error generating Wix code:",e),a("error")}};return(0,r.jsx)("div",{className:"min-h-screen bg-black text-white",children:(0,r.jsxs)("div",{className:"max-w-7xl mx-auto px-4 py-8",children:[(0,r.jsxs)("div",{className:"mb-8",children:[(0,r.jsx)("h1",{className:"text-4xl font-heading font-bold",children:"Export for Wix"}),(0,r.jsx)("p",{className:"text-gray-400",children:"Generate and export your website code for Wix integration"})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[(0,r.jsx)("div",{className:"lg:col-span-2",children:(0,r.jsxs)("div",{className:"bg-grey rounded-lg p-6",children:[(0,r.jsx)("h2",{className:"text-2xl font-heading font-bold mb-4",children:"Website Code"}),"idle"===o&&(0,r.jsxs)("div",{className:"bg-black rounded-lg p-8 flex flex-col items-center justify-center h-96",children:[(0,r.jsx)("p",{className:"text-gray-400 mb-6",children:"Click the button below to generate your website code for Wix"}),(0,r.jsx)("button",{onClick:c,className:"px-6 py-3 bg-neon-blue text-black rounded-md font-bold",children:"Generate Wix Code"})]}),"generating"===o&&(0,r.jsxs)("div",{className:"bg-black rounded-lg p-8 flex flex-col items-center justify-center h-96",children:[(0,r.jsx)("div",{className:"animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neon-blue mb-4"}),(0,r.jsx)("p",{className:"text-gray-400",children:"Generating your website code..."})]}),"success"===o&&(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex justify-between items-center mb-4",children:[(0,r.jsx)("h3",{className:"text-xl font-medium",children:"HTML Code"}),(0,r.jsxs)("div",{className:"flex space-x-2",children:[(0,r.jsx)("button",{onClick:()=>{navigator.clipboard.writeText(e).then(()=>{alert("Code copied to clipboard!")}).catch(e=>{console.error("Failed to copy code:",e)})},className:"px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80",children:"Copy Code"}),(0,r.jsx)("button",{onClick:()=>{let t=new Blob([e],{type:"text/html"}),o=URL.createObjectURL(t),r=document.createElement("a");r.href=o,r.download="website-for-wix.html",document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(o)},className:"px-3 py-1 bg-dark-purple rounded text-sm hover:bg-opacity-80",children:"Download File"})]})]}),(0,r.jsx)("div",{className:"bg-black p-4 rounded-lg h-96 overflow-auto",children:(0,r.jsx)("pre",{className:"text-gray-300 text-sm whitespace-pre-wrap",children:e})})]}),"error"===o&&(0,r.jsxs)("div",{className:"bg-black rounded-lg p-8 flex flex-col items-center justify-center h-96",children:[(0,r.jsx)("div",{className:"text-red-500 mb-4",children:(0,r.jsx)("svg",{className:"h-16 w-16",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})})}),(0,r.jsx)("p",{className:"text-red-400 mb-6",children:"Error generating website code"}),(0,r.jsx)("button",{onClick:c,className:"px-6 py-3 bg-neon-blue text-black rounded-md font-bold",children:"Try Again"})]})]})}),(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsxs)("div",{className:"bg-grey rounded-lg p-6",children:[(0,r.jsx)("h2",{className:"text-2xl font-heading font-bold mb-4",children:"Wix Integration Guide"}),(0,r.jsxs)("div",{className:"space-y-6",children:[(0,r.jsx)("div",{className:`${1===n?"bg-dark-purple":"bg-black"} p-4 rounded-lg`,children:(0,r.jsxs)("div",{className:"flex items-start",children:[(0,r.jsx)("div",{className:"flex-shrink-0 h-6 w-6 text-neon-blue mr-2",children:(0,r.jsx)("span",{className:"flex items-center justify-center h-6 w-6 rounded-full bg-neon-blue text-black font-bold text-sm",children:"1"})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"font-medium mb-2",children:"Generate the HTML Code"}),(0,r.jsx)("p",{className:"text-gray-300 text-sm",children:'Click the "Generate Wix Code" button to create the HTML code for your website.'}),1===n&&(0,r.jsx)("button",{onClick:()=>l(2),className:"mt-3 text-neon-blue text-sm hover:underline",children:"Next Step →"})]})]})}),(0,r.jsx)("div",{className:`${2===n?"bg-dark-purple":"bg-black"} p-4 rounded-lg`,children:(0,r.jsxs)("div",{className:"flex items-start",children:[(0,r.jsx)("div",{className:"flex-shrink-0 h-6 w-6 text-neon-blue mr-2",children:(0,r.jsx)("span",{className:"flex items-center justify-center h-6 w-6 rounded-full bg-neon-blue text-black font-bold text-sm",children:"2"})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"font-medium mb-2",children:"Log in to Your Wix Account"}),(0,r.jsx)("p",{className:"text-gray-300 text-sm",children:"Go to ventarosales.com and log in to your Wix account to access the editor."}),2===n&&(0,r.jsxs)("div",{className:"flex justify-between mt-3",children:[(0,r.jsx)("button",{onClick:()=>l(1),className:"text-gray-400 text-sm hover:underline",children:"← Previous"}),(0,r.jsx)("button",{onClick:()=>l(3),className:"text-neon-blue text-sm hover:underline",children:"Next Step →"})]})]})]})}),(0,r.jsx)("div",{className:`${3===n?"bg-dark-purple":"bg-black"} p-4 rounded-lg`,children:(0,r.jsxs)("div",{className:"flex items-start",children:[(0,r.jsx)("div",{className:"flex-shrink-0 h-6 w-6 text-neon-blue mr-2",children:(0,r.jsx)("span",{className:"flex items-center justify-center h-6 w-6 rounded-full bg-neon-blue text-black font-bold text-sm",children:"3"})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"font-medium mb-2",children:"Add HTML iFrame Component"}),(0,r.jsx)("p",{className:"text-gray-300 text-sm",children:'In the Wix editor, click the "+" button to add a new element, then search for "HTML iFrame" and add it to your page.'}),3===n&&(0,r.jsxs)("div",{className:"flex justify-between mt-3",children:[(0,r.jsx)("button",{onClick:()=>l(2),className:"text-gray-400 text-sm hover:underline",children:"← Previous"}),(0,r.jsx)("button",{onClick:()=>l(4),className:"text-neon-blue text-sm hover:underline",children:"Next Step →"})]})]})]})}),(0,r.jsx)("div",{className:`${4===n?"bg-dark-purple":"bg-black"} p-4 rounded-lg`,children:(0,r.jsxs)("div",{className:"flex items-start",children:[(0,r.jsx)("div",{className:"flex-shrink-0 h-6 w-6 text-neon-blue mr-2",children:(0,r.jsx)("span",{className:"flex items-center justify-center h-6 w-6 rounded-full bg-neon-blue text-black font-bold text-sm",children:"4"})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"font-medium mb-2",children:"Paste Your HTML Code"}),(0,r.jsx)("p",{className:"text-gray-300 text-sm",children:"Click on the HTML iFrame component to edit it, then paste the generated HTML code into the editor."}),4===n&&(0,r.jsxs)("div",{className:"flex justify-between mt-3",children:[(0,r.jsx)("button",{onClick:()=>l(3),className:"text-gray-400 text-sm hover:underline",children:"← Previous"}),(0,r.jsx)("button",{onClick:()=>l(5),className:"text-neon-blue text-sm hover:underline",children:"Next Step →"})]})]})]})}),(0,r.jsx)("div",{className:`${5===n?"bg-dark-purple":"bg-black"} p-4 rounded-lg`,children:(0,r.jsxs)("div",{className:"flex items-start",children:[(0,r.jsx)("div",{className:"flex-shrink-0 h-6 w-6 text-neon-blue mr-2",children:(0,r.jsx)("span",{className:"flex items-center justify-center h-6 w-6 rounded-full bg-neon-blue text-black font-bold text-sm",children:"5"})}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h3",{className:"font-medium mb-2",children:"Publish Your Wix Site"}),(0,r.jsx)("p",{className:"text-gray-300 text-sm",children:'Click the "Publish" button in the top-right corner of the Wix editor to make your changes live.'}),5===n&&(0,r.jsxs)("div",{className:"flex justify-between mt-3",children:[(0,r.jsx)("button",{onClick:()=>l(4),className:"text-gray-400 text-sm hover:underline",children:"← Previous"}),(0,r.jsx)("button",{onClick:()=>l(1),className:"text-neon-blue text-sm hover:underline",children:"Start Over"})]})]})]})})]})]}),(0,r.jsxs)("div",{className:"bg-grey rounded-lg p-6",children:[(0,r.jsx)("h2",{className:"text-xl font-heading font-bold mb-4",children:"Need Help?"}),(0,r.jsx)("p",{className:"text-gray-300 mb-4",children:"If you need assistance with integrating your website into Wix, feel free to contact our support team."}),(0,r.jsx)("a",{href:"/templates",className:"block w-full px-4 py-2 bg-dark-purple border border-neon-blue rounded text-center hover:bg-opacity-80",children:"Back to Templates"})]})]})]})]})})}},7197:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>r});let r=(0,o(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/ubuntu/website-generator/website-generator-app/src/app/wix-export/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/ubuntu/website-generator/website-generator-app/src/app/wix-export/page.tsx","default")}};var t=require("../../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),r=t.X(0,[638,403,77,782],()=>o(771));module.exports=r})();