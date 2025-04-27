"use client";

import { templateHTML } from "@/components/templates/templateHTML";

export default function PreviewTemplatePage({ params }: { params: { id: string } }) {
  const site = templateHTML[params.id];

  if (!site) {
    return <div className="p-10 text-red-500">Template not found.</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-10">
      <iframe
        srcDoc={`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${site.css}</style>
          </head>
          <body>
            ${site.html}
            <script>${site.js}</script>
          </body>
          </html>
        `}
        className="w-full max-w-4xl h-[800px] border rounded-lg"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
}
