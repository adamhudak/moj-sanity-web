import Link from 'next/link';

export default function NotFound() {
  return (

    <div className="flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-9xl font-bold text-slate-200">404</h1>
        <div className="relative">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Stránka nenájdená</h2>
          <p className="text-slate-600 mb-8 max-w-md">
            Prepáčte, ale stránka, ktorú hľadáte, neexistuje.
          </p>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-block">
            Späť na domov
          </Link>
        </div>
      </main>
    </div>
  );
}