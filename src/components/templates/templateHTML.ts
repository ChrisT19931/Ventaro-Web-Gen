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
  