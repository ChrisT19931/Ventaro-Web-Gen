exports.id=782,exports.ids=[782],exports.modules={7723:(e,t,o)=>{Promise.resolve().then(o.t.bind(o,3219,23)),Promise.resolve().then(o.t.bind(o,4863,23)),Promise.resolve().then(o.t.bind(o,5155,23)),Promise.resolve().then(o.t.bind(o,802,23)),Promise.resolve().then(o.t.bind(o,9350,23)),Promise.resolve().then(o.t.bind(o,8530,23)),Promise.resolve().then(o.t.bind(o,8921,23))},8339:(e,t,o)=>{Promise.resolve().then(o.t.bind(o,6959,23)),Promise.resolve().then(o.t.bind(o,3875,23)),Promise.resolve().then(o.t.bind(o,8903,23)),Promise.resolve().then(o.t.bind(o,7174,23)),Promise.resolve().then(o.t.bind(o,4178,23)),Promise.resolve().then(o.t.bind(o,7190,23)),Promise.resolve().then(o.t.bind(o,1365,23))},5423:()=>{},3671:()=>{},1412:(e,t,o)=>{"use strict";o.d(t,{A:()=>r});class r{async generateWebsite(e,t){return{html:this.generateHtml(e,t),css:this.generateCss(e,t),js:this.generateJs(e,t),assets:this.getRequiredAssets(e,t)}}async exportWebsite(e,t){return(t.minify&&(e.html=this.minifyHtml(e.html),e.css=this.minifyCss(e.css),e.js=this.minifyJs(e.js)),"zip"===t.format)?this.createZipPackage(e,t.includeAssets):this.deployWebsite(e)}validateCustomization(e,t){return!0}getTemplateStructure(e){return{id:e.id,name:e.title,sections:[{id:"header",name:"Header",required:!0},{id:"hero",name:"Hero Section",required:!0},{id:"about",name:"About",required:!1},{id:"portfolio",name:"Portfolio/Gallery",required:!1},{id:"services",name:"Services",required:!1},{id:"testimonials",name:"Testimonials",required:!1},{id:"contact",name:"Contact Form",required:!0},{id:"footer",name:"Footer",required:!0}],layouts:["default","alternative","minimal"],colorSchemes:["dark","light","colorful","minimal"],typography:["modern","classic","bold","elegant"]}}generateHtml(e,t){let o=t.layout||"default";return`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${e.title} - Your Website</title>
    <link rel="stylesheet" href="styles.css">
    ${"modern"===t.typography?'<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&family=Montserrat:wght@700&display=swap" rel="stylesheet">':""}
</head>
<body class="layout-${o} scheme-${t.colorScheme} typography-${t.typography}">
    ${t.sections.header?.enabled?`<header class="site-header">
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
      </header>`:""}
    
    ${t.sections.hero?.enabled?`<section id="home" class="hero-section">
        <div class="container">
          <h1>Your Name</h1>
          <p>Professional ${e.category.charAt(0).toUpperCase()+e.category.slice(1)} Influencer</p>
          <a href="#portfolio" class="btn primary-btn">View My Work</a>
        </div>
      </section>`:""}
    
    ${t.sections.about?.enabled?`<section id="about" class="about-section">
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
      </section>`:""}
    
    ${t.sections.portfolio?.enabled?`<section id="portfolio" class="portfolio-section">
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
      </section>`:""}
    
    ${t.sections.contact?.enabled?`<section id="contact" class="contact-section">
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
      </section>`:""}
    
    ${t.sections.footer?.enabled?`<footer class="site-footer">
        <div class="container">
          <p>&copy; ${new Date().getFullYear()} Your Name. All rights reserved.</p>
          <div class="social-links">
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">YouTube</a>
            <a href="#">TikTok</a>
          </div>
        </div>
      </footer>`:""}
    
    <script src="main.js"></script>
</body>
</html>
    `}generateCss(e,t){let o=t.colorScheme||"dark",r=t.typography||"modern",i={primary:"#2D1B69",secondary:"#00FFFF",background:"#000000",text:"#FFFFFF",accent:"#333333"};"light"===o?i={primary:"#6247AA",secondary:"#00FFFF",background:"#FFFFFF",text:"#333333",accent:"#F5F5F5"}:"colorful"===o&&(i={primary:"#FF3366",secondary:"#33CCFF",background:"#111111",text:"#FFFFFF",accent:"#444444"});let a={heading:"'Montserrat', sans-serif",body:"'Nunito Sans', sans-serif"};"classic"===r?a={heading:"'Georgia', serif",body:"'Times New Roman', serif"}:"bold"===r&&(a={heading:"'Roboto', sans-serif",body:"'Roboto', sans-serif"});let s=`
/* Base Styles */
:root {
  --color-primary: ${i.primary};
  --color-secondary: ${i.secondary};
  --color-background: ${i.background};
  --color-text: ${i.text};
  --color-accent: ${i.accent};
  --font-heading: ${a.heading};
  --font-body: ${a.body};
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
    `;return t.customCss?`${s}

/* Custom CSS */
${t.customCss}`:s}generateJs(e,t){let o=`
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
    `;return t.customJs?`${o}

/* Custom JavaScript */
${t.customJs}`:o}getRequiredAssets(e,t){return["profile.jpg","portfolio1.jpg","portfolio2.jpg","portfolio3.jpg","portfolio4.jpg","portfolio5.jpg","portfolio6.jpg"]}minifyHtml(e){return e.replace(/\s+/g," ").replace(/>\s+</g,"><").trim()}minifyCss(e){return e.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s+/g," ").replace(/\s*({|}|:|;|,)\s*/g,"$1").replace(/;}/,"}").trim()}minifyJs(e){return e.replace(/\/\/.*$/gm,"").replace(/\/\*[\s\S]*?\*\//g,"").replace(/\s+/g," ").trim()}async createZipPackage(e,t){return"/api/download/website.zip"}async deployWebsite(e){return"https://your-website.example.com"}}},1354:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>a,metadata:()=>i});var r=o(2740);o(1135);let i={title:"Website Generator Platform",description:"Create professional websites for influencers with our easy-to-use platform"};function a({children:e}){return(0,r.jsx)("html",{lang:"en",children:(0,r.jsx)("body",{children:(0,r.jsx)("main",{className:"min-h-screen",children:e})})})}},440:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>i});var r=o(8077);let i=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,r.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},1135:()=>{}};