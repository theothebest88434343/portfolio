import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Nav from '@/components/Nav'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />
      <Hero />
      <Projects />
      <Skills />
      <Contact />
    </main>
  )
}