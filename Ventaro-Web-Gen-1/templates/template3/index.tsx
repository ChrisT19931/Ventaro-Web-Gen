export default function Template3({ headline = "Welcome to Template 3", subtext = "This template uses a grid layout with a light color theme.", buttonText = "Get Started" }) {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{headline}</h1>
          <p className="text-lg mb-6">{subtext}</p>
          <button className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-lg text-lg font-medium text-white">
            {buttonText}
          </button>
        </div>
        <div className="flex items-center justify-center">
          <img src="/path/to/image.jpg" alt="Template 3" className="rounded-lg shadow-lg" />
        </div>
      </div>
    </main>
  );
}