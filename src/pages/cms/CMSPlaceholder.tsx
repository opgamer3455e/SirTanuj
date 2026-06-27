
export default function CMSPlaceholder({ title }: { title: string }) {
  return (
    <div>
      <header className="mb-10">
        <h1 className="text-4xl font-bold font-['Cinzel']">{title}</h1>
        <p className="text-zinc-400 mt-2">This module is part of the extreme customization suite.</p>
      </header>
      <div className="p-8 border border-white/10 rounded-2xl bg-white/5 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#FC642D]/20 text-[#FC642D] flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">{title} under construction</h2>
        <p className="text-zinc-400">This feature will be fully hooked up to the secure backend soon.</p>
      </div>
    </div>
  );
}
