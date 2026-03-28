export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 text-white/60 text-xs font-medium px-4 py-2 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Open to internships · Waterloo, ON
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">Theo</span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Steinstrasser</span>
        </h1>

        <p className="text-lg text-white/50 max-w-md leading-relaxed">
          4th year CS student at Wilfrid Laurier. Building full-stack apps with Next.js, Supabase, and AI.
        </p>

        <div className="flex items-center gap-3 mt-2">
          <a href="#projects" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
            See my work
          </a>
          <a href="https://linkedin.com/in/theosteinstrasser" target="_blank" className="border border-white/10 text-white/70 px-6 py-3 rounded-full font-medium hover:border-white/30 hover:text-white transition-all">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}