"use client";

import { templates } from "@/components/templates/templateData";
import TemplateCard from "@/components/templates/TemplateCard";

export default function TemplatesPage() {
  const handlePay = async (interval: "monthly" | "yearly", templateId: string) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateId, draftId: templateId, billingInterval: interval }),
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>Choose Your Website Template</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {templates.map((template) => (
          <div key={template.id} style={{ border: "1px solid #ccc", padding: "20px", width: "300px" }}>
            <img src={template.thumbnail} alt={template.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <h2 style={{ fontSize: "24px", margin: "10px 0" }}>{template.name}</h2>
            <p>{template.description}</p>
            <p><strong>Tier:</strong> {template.tier}</p>
            {/* NO more single payment */}
            <button
              style={{ marginTop: "10px", padding: "10px 20px", backgroundColor: "black", color: "white", border: "none", cursor: "pointer" }}
              onClick={() => handlePay("monthly", template.id)}
            >
              Buy Monthly ($30/mo)
            </button>
            <button
              style={{ marginTop: "10px", marginLeft: "10px", padding: "10px 20px", backgroundColor: "gray", color: "white", border: "none", cursor: "pointer" }}
              onClick={() => handlePay("yearly", template.id)}
            >
              Buy Yearly ($100/year)
            </button>
            <div style={{ marginTop: "10px" }}>
              <a href={`/templates/${template.id}/preview`} style={{ color: "#00f", fontSize: "14px", textDecoration: "underline" }}>
                Preview
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
