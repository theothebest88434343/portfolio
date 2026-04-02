'use client'

import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-white/5">
      <div className="flex items-center justify-between px-8 py-5">
        <span className="font-bold text-white">Theo Steinstrasser</span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#projects" className="text-sm text-white/50 hover:text-white transition-colors">Projects</a>
          <a href="#skills" className="text-sm text-white/50 hover:text-white transition-colors">Skills</a>
          <a href="#contact" className="text-sm text-white/50 hover:text-white transition-colors">Contact</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">Resume</a>
          <a href="https://github.com/theothebest88434343" target="_blank" rel="noopener noreferrer" className="text-sm bg-white text-black px-4 py-1.5 rounded-full font-medium hover:bg-white/90 transition-colors">GitHub</a>
        </div>

        {/* Hamburger button */}
        <button
          onClick={() => setOpen(prev => !prev)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-transform duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col px-8 pb-6 gap-4 border-t border-white/5">
          <a href="#projects" onClick={() => setOpen(false)} className="text-sm text-white/50 hover:text-white transition-colors pt-4">Projects</a>
          <a href="#skills" onClick={() => setOpen(false)} className="text-sm text-white/50 hover:text-white transition-colors">Skills</a>
          <a href="#contact" onClick={() => setOpen(false)} className="text-sm text-white/50 hover:text-white transition-colors">Contact</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">Resume</a>
          <a href="https://github.com/theothebest88434343" target="_blank" rel="noopener noreferrer" className="text-sm bg-white text-black px-4 py-1.5 rounded-full font-medium hover:bg-white/90 transition-colors w-fit">GitHub</a>
        </div>
      )}
    </nav>
  )
}
