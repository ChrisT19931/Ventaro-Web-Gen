export default function CustomTemplate({
  headline = "Build Your Next Project",
  subtext = "Launch faster with this clean business-focused template.",
  ctaText = "Get Started",
}) {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-5xl font-bold text-black mb-4 text-center">{headline}</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">{subtext}</p>
      <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-lg font-medium text-white">
        {ctaText}
      </button>
    </main>
  );
}