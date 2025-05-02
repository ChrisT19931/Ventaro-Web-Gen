import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

export default function EditTemplate({
  params,
}: {
  params: { templateId: string };
}) {
  const [headline, setHeadline] = useState("Default Headline");
  const [subtext, setSubtext] = useState("Default Subtext");
  const [buttonText, setButtonText] = useState("Default Button");

  const templateLoader = dynamic(() =>
    import(`../../../../templates/${params.templateId}/index`)
  );

  const TemplateComponent = templateLoader;

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
            className="w-full p-2 border border-gray-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Subtext</label>
          <input
            type="text"
            value={subtext}
            onChange={(e) => setSubtext(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Button Text</label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded"
          />
        </div>
      </div>
      <div className="w-2/3 p-4">
        <h2 className="text-lg font-bold mb-4">Live Preview</h2>
        <TemplateComponent headline={headline} subtext={subtext} buttonText={buttonText} />
      </div>
    </div>
  );
}