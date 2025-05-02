import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

export default function EditTemplatePage({ params }: { params: { templateId: string } }) {
  const [headline, setHeadline] = useState("");
  const [subtext, setSubtext] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [TemplateComponent, setTemplateComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const loader = () => import(`../../../../templates/${params.templateId}/index`);
    loader()
      .then((mod) => setTemplateComponent(() => mod.default))
      .catch(() => notFound());
  }, [params.templateId]);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/3 p-4 bg-gray-800 text-white">
        <h2 className="text-lg font-bold mb-4">Edit Template</h2>
        <div className="mb-4">
          <label className="block mb-1">Headline</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Subtext</label>
          <input
            type="text"
            value={subtext}
            onChange={(e) => setSubtext(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Button Text</label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
      </div>
      <div className="w-2/3 p-4 bg-gray-900 text-white">
        {TemplateComponent ? (
          <TemplateComponent headline={headline} subtext={subtext} buttonText={buttonText} />
        ) : (
          <p>Loading template...</p>
        )}
      </div>
    </div>
  );
}