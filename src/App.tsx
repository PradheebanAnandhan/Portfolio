import React, { useState, useEffect } from 'react';
import { BootSequence } from './components/BootSequence';
import { Terminal } from './components/Terminal';
import { MatrixRain } from './components/MatrixRain';
import { profile, skills, experience, education, projects, certifications } from './data';

import { useTracker } from './hooks/useTracker';

export const App: React.FC = () => {
  const [booting, setBooting] = useState(true);
  const [theme, setTheme] = useState('dracula');

  // Track visits
  useTracker();

  // Set the theme attribute on body for global class application if needed
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Determine global background colors based on active theme
  const getBackgroundStyles = () => {
    switch (theme) {
      case 'ubuntu':
        return 'bg-[#4f1937] bg-[radial-gradient(ellipse_at_center,_#4f1937_0%,_#300A24_100%)]';
      case 'matrix':
        return 'bg-black';
      case 'kali':
        return 'bg-[#0b0e14] bg-[radial-gradient(ellipse_at_top,_#1c2536_0%,_#0b0e14_100%)]';
      case 'dracula':
      default:
        return 'bg-[#282a36] bg-[radial-gradient(ellipse_at_center,_#343746_0%,_#1e1f29_100%)]';
    }
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 transition-all duration-500 overflow-hidden relative ${getBackgroundStyles()}`}>
      {/* Matrix rain canvas animation (runs only when Matrix theme is active) */}
      <MatrixRain isActive={theme === 'matrix'} />

      {booting ? (
        <BootSequence onComplete={() => setBooting(false)} />
      ) : (
        <div className="w-full max-w-4xl z-10 flex flex-col items-center">
          <Terminal theme={theme} setTheme={setTheme} />
          
          {/* Quick instructions indicator under terminal */}
          <div className="text-[10px] md:text-xs text-gray-500 font-mono mt-3 select-none text-center">
            Press <span className="text-[#8be9fd] font-bold">Tab</span> to autocomplete commands/paths | Try <span className="text-[#50fa7b] font-bold">theme matrix</span> or <span className="text-[#50fa7b] font-bold">sudo hire-me</span>
          </div>
        </div>
      )}

      {/* Hidden Semantic HTML for Search Engine Optimization (SEO) */}
      <div className="sr-only" aria-hidden="true" style={{ display: 'none' }}>
        <header>
          <h1>{profile.name} - {profile.role}</h1>
          <p>{profile.about}</p>
        </header>

        <section>
          <h2>About Me</h2>
          <p>{profile.about}</p>
          <p>Location: {profile.location}</p>
          <p>Contact Email: {profile.email}</p>
          <p>GitHub Profile: <a href={profile.github}>{profile.github}</a></p>
          <p>LinkedIn Profile: <a href={profile.linkedin}>{profile.linkedin}</a></p>
          <p>Website: <a href={profile.portfolioUrl}>{profile.portfolioUrl}</a></p>
        </section>

        <section>
          <h2>Technical Skills</h2>
          {skills.map((skillGroup, idx) => (
            <div key={idx}>
              <h3>{skillGroup.category}</h3>
              <ul>
                {skillGroup.items.map((item, id) => (
                  <li key={id}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Work Experience</h2>
          {experience.map((exp, idx) => (
            <article key={idx}>
              <h3>{exp.role} at {exp.company}</h3>
              <p>{exp.period}</p>
              <ul>
                {exp.points.map((pt, id) => (
                  <li key={id}>{pt}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section>
          <h2>Education</h2>
          {education.map((edu, idx) => (
            <article key={idx}>
              <h3>{edu.degree}</h3>
              <p>{edu.institution} - {edu.period}</p>
              <p>{edu.details}</p>
            </article>
          ))}
        </section>

        <section>
          <h2>Featured Projects</h2>
          {projects.map((proj) => (
            <article key={proj.id}>
              <h3>{proj.name}</h3>
              <p>{proj.description}</p>
              <p>Technologies used: {proj.technologies.join(', ')}</p>
              <p>GitHub Repository: <a href={proj.githubUrl}>{proj.githubUrl}</a></p>
              {proj.demoUrl && <p>Live Demo: <a href={proj.demoUrl}>{proj.demoUrl}</a></p>}
            </article>
          ))}
        </section>

        <section>
          <h2>Certifications</h2>
          <ul>
            {certifications.map((c, idx) => (
              <li key={idx}>
                <strong>{c.name}</strong> - Issued by {c.issuer} ({c.year})
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default App;
