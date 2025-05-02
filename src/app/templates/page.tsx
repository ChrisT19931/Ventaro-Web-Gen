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
