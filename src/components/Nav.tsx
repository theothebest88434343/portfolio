export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-white/5">
      <span className="font-bold text-white">Theo Steinstrasser</span>
      <div className="flex items-center gap-6">
        <a href="#projects" className="text-sm text-white/50 hover:text-white transition-colors">Projects</a>
        <a href="#skills" className="text-sm text-white/50 hover:text-white transition-colors">Skills</a>
        <a href="#contact" className="text-sm text-white/50 hover:text-white transition-colors">Contact</a>
        <a href="https://github.com/theothebest88434343" target="_blank" className="text-sm bg-white text-black px-4 py-1.5 rounded-full font-medium hover:bg-white/90 transition-colors">GitHub</a>
      </div>
    </nav>
  )
}