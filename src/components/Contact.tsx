export default function Contact() {
  return (
    <section id="contact" className="py-32 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-pink-400 text-sm font-medium mb-2">Get in touch</p>
        <h2 className="text-4xl font-bold text-white mb-4">{"Let's work together"}</h2>
        <p className="text-white/40 mb-10">
          {"I'm actively looking for internships for Summer 2026. If you have an opportunity or just want to connect, reach out."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="mailto:steinstrasser@gmail.com" className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-opacity">
            steinstrasser@gmail.com
          </a>
          <a href="https://linkedin.com/in/theosteinstrasser" target="_blank" className="w-full sm:w-auto border border-white/10 text-white/70 px-8 py-4 rounded-full font-medium hover:border-white/30 hover:text-white transition-all">
            LinkedIn
          </a>
        </div>
      </div>
      <p className="text-center text-white/20 text-xs mt-24">© 2026 Theo Steinstrasser</p>
    </section>
  )
}