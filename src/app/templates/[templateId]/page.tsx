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
