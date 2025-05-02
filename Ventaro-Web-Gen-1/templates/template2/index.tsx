// filepath: /Ventaro-Web-Gen/Ventaro-Web-Gen/templates/template2/index.tsx
export default function Template1() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to Your Website</h1>
        <p className="text-xl text-gray-300">This is a beautiful template built for speed and simplicity.</p>
      </header>

      <section className="bg-gray-800 rounded-2xl p-6 max-w-3xl w-full shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="text-gray-400 mb-6">
          Edit this template using the Web Gen builder. Change text, colors, and layout in seconds.
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-lg text-lg font-medium">
          Customize Now
        </button>
      </section>

      <footer className="mt-16 text-sm text-gray-500">
        Powered by <strong>Ventaro Web Gen</strong>
      </footer>
    </main>
  );
}