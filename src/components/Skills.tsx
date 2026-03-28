const skills = {
  'Languages': ['TypeScript', 'Python', 'JavaScript', 'SQL', 'Java'],
  'Frontend': ['React', 'Next.js', 'TailwindCSS', 'HTML/CSS'],
  'Backend': ['Node.js', 'FastAPI', 'Express', 'PostgreSQL', 'Supabase'],
  'AI / Data': ['Groq', 'PyTorch', 'Scikit-learn', 'Pandas', 'Sentence Transformers'],
  'Tools': ['Git', 'Vercel', 'Supabase', 'VS Code'],
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-4 max-w-5xl mx-auto">
      <div className="mb-16">
        <p className="text-blue-400 text-sm font-medium mb-2">Stack</p>
        <h2 className="text-4xl font-bold text-white">Skills</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="border border-white/5 bg-white/[0.02] rounded-2xl p-6">
            <p className="text-sm font-medium text-white/40 mb-4">{category}</p>
            <div className="flex flex-wrap gap-2">
              {items.map(skill => (
                <span key={skill} className="text-sm text-white/80 bg-white/5 px-3 py-1.5 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}