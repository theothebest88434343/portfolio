const projects = [
  {
    name: 'Collab',
    desc: 'Full-stack project management platform with kanban drag-and-drop, real-time comments, AI project generation, and team collaboration.',
    tags: ['Next.js', 'Supabase', 'Groq AI', 'TypeScript'],
    live: 'https://creator-collab-app.vercel.app',
    github: 'https://github.com/theothebest88434343/creator-collab-app',
    gradient: 'from-purple-500/20 to-blue-500/20',
    border: 'border-purple-500/20',
  },
  {
    name: 'Linktab',
    desc: 'Link-in-bio SaaS with a custom profile page per user, link editor, click tracking, and a 7-day analytics dashboard.',
    tags: ['Next.js', 'Supabase', 'PostgreSQL', 'TailwindCSS'],
    live: 'https://linktab.vercel.app',
    github: 'https://github.com/theothebest88434343/linktab',
    gradient: 'from-pink-500/20 to-orange-500/20',
    border: 'border-pink-500/20',
  },
  {
    name: 'MindVault',
    desc: 'AI-powered knowledge base with semantic search using sentence transformers and vector embeddings over 1k+ notes.',
    tags: ['Python', 'FastAPI', 'React', 'PostgreSQL'],
    live: null,
    github: 'https://github.com/theothebest88434343',
    gradient: 'from-green-500/20 to-teal-500/20',
    border: 'border-green-500/20',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-4 max-w-5xl mx-auto">
      <div className="mb-16">
        <p className="text-purple-400 text-sm font-medium mb-2">Work</p>
        <h2 className="text-4xl font-bold text-white">Projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map(p => (
          <div
            key={p.name}
            className={`relative bg-gradient-to-br ${p.gradient} border ${p.border} rounded-2xl p-6 flex flex-col gap-4 hover:scale-[1.02] transition-transform`}
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{p.name}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {p.tags.map(tag => (
                <span key={tag} className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded-full">{tag}</span>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-auto pt-2">
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-xs text-white font-medium hover:text-white/70 transition-colors">
                  Live →
                </a>
              )}
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-xs text-white/40 hover:text-white/70 transition-colors">
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}