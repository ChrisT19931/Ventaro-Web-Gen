export default function Template5({ 
  headline = "Welcome to Template 5", 
  subtext = "This template features a sidebar layout.", 
  buttonText = "Learn More" 
}) {
  return (
    <div className="flex min-h-screen bg-blue-50">
      <aside className="w-1/4 bg-blue-200 p-4">
        <h2 className="text-lg font-semibold">Sidebar</h2>
        <ul>
          <li className="my-2"><a href="#" className="text-blue-600">Link 1</a></li>
          <li className="my-2"><a href="#" className="text-blue-600">Link 2</a></li>
          <li className="my-2"><a href="#" className="text-blue-600">Link 3</a></li>
        </ul>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-4">{headline}</h1>
        <p className="text-lg text-gray-700 mb-6">{subtext}</p>
        <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-lg font-medium text-white">
          {buttonText}
        </button>
      </main>
    </div>
  );
}