import React, { useState, useEffect } from 'react';
import { profile, skills, projects, achievements, publications, currentlyLearning, experience, education, certifications, type Project } from '../data';

// 1. HELP OUTPUT COMPONENT
export const HelpOutput: React.FC = () => {
  const commands = [
    { cmd: 'help', desc: 'Show all available commands' },
    { cmd: 'about', desc: 'About me' },
    { cmd: 'skills', desc: 'Technical skills' },
    { cmd: 'projects', desc: 'View my projects' },
    { cmd: 'contact', desc: 'Contact information' },
    { cmd: 'resume', desc: 'Resume summary and options' },
    { cmd: 'view resume', desc: 'Display full resume in terminal' },
    { cmd: 'download resume', desc: 'Download PDF resume' },
    { cmd: 'social', desc: 'Social media links' },
    { cmd: 'education', desc: 'Educational background' },
    { cmd: 'experience', desc: 'Work experience' },
    { cmd: 'certs', desc: 'Certifications' },
    { cmd: 'achievements', desc: 'Achievements & Hackathons' },
    { cmd: 'publications', desc: 'Research Publications' },
    { cmd: 'learning', desc: 'Currently learning topics' },
    { cmd: 'stack', desc: 'Technical stack breakdown' },
    { cmd: 'clear', desc: 'Clear terminal' },
    { cmd: 'whoami', desc: 'Fun command' },
    { cmd: 'pwd', desc: 'Show current location' },
    { cmd: 'ls', desc: 'List available files' },
    { cmd: 'tree', desc: 'Show portfolio structure' },
    { cmd: 'neofetch', desc: 'Display developer profile' },
    { cmd: 'theme', desc: 'Switch terminal themes (ubuntu, matrix, dracula, kali)' },
  ];

  return (
    <div className="space-y-2">
      <div className="text-yellow-400 font-bold">Available commands:</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 font-mono text-sm max-w-2xl">
        {commands.map((c, i) => (
          <div key={i} className="flex">
            <span className="text-[#8be9fd] w-28 flex-shrink-0 font-bold">{c.cmd}</span>
            <span className="text-gray-300">- {c.desc}</span>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Pro tip: Navigation commands like <span className="text-[#50fa7b]">cd</span>, <span className="text-[#50fa7b]">ls [dir]</span>, <span className="text-[#50fa7b]">cat [file]</span>, <span className="text-[#50fa7b]">pwd</span>, and <span className="text-[#50fa7b]">tree</span> are also fully supported!
      </div>
    </div>
  );
};

// 2. NEOFETCH OUTPUT COMPONENT
export const NeofetchOutput: React.FC = () => {
  const [resolution, setResolution] = useState(`${window.innerWidth}x${window.innerHeight}`);

  useEffect(() => {
    const handleResize = () => {
      setResolution(`${window.innerWidth}x${window.innerHeight}`);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const asciiArt = `
      .---.
     /     \\
     \\.@-@./
     /\`\\_/\`\\
    //  _  \\\\
   | \\     / |
  / \\_\`---\`_/ \\\\
  \\__/[_i_i_]\\__/
`;

  return (
    <div className="flex flex-col md:flex-row font-mono text-sm gap-6 p-2 leading-relaxed">
      <div className="text-[#50fa7b] font-bold pre-formatted whitespace-pre select-none">
        {asciiArt}
      </div>
      <div className="space-y-1">
        <div className="text-[#ff79c6] font-bold text-base">guest@pradheeban-portfolio</div>
        <div className="text-gray-400">--------------------------</div>
        <div><span className="text-[#8be9fd] font-semibold">OS</span>: Linux Mint (Vercel Host)</div>
        <div><span className="text-[#8be9fd] font-semibold">Host</span>: {profile.name}'s Digital Terminal</div>
        <div><span className="text-[#8be9fd] font-semibold">Kernel</span>: React v19.2 + TypeScript</div>
        <div><span className="text-[#8be9fd] font-semibold">Uptime</span>: 4m 20s (Active Session)</div>
        <div><span className="text-[#8be9fd] font-semibold">Shell</span>: Antigravity-sh 1.2</div>
        <div><span className="text-[#8be9fd] font-semibold">Resolution</span>: {resolution}</div>
        <div><span className="text-[#8be9fd] font-semibold">DE</span>: Web Terminal UX</div>
        <div><span className="text-[#8be9fd] font-semibold">WM</span>: TailwindCSS Engine</div>
        <div><span className="text-[#8be9fd] font-semibold">Terminal</span>: Custom-React-Terminal</div>
        <div><span className="text-[#8be9fd] font-semibold">CPU</span>: {profile.role} Brain (AMD Ryzen 9)</div>
        <div><span className="text-[#8be9fd] font-semibold">Experience</span>: {profile.experienceYears} Years</div>
        <div><span className="text-[#8be9fd] font-semibold">Location</span>: {profile.location}</div>
        <div><span className="text-[#8be9fd] font-semibold">Interests</span>: Linux, Cloud, DevOps, Backend, AI</div>
        
        {/* Color Blocks */}
        <div className="flex gap-1.5 mt-3 select-none">
          <span className="w-5 h-4 bg-black"></span>
          <span className="w-5 h-4 bg-[#ff5555]"></span>
          <span className="w-5 h-4 bg-[#50fa7b]"></span>
          <span className="w-5 h-4 bg-[#f1fa8c]"></span>
          <span className="w-5 h-4 bg-[#bd93f9]"></span>
          <span className="w-5 h-4 bg-[#ff79c6]"></span>
          <span className="w-5 h-4 bg-[#8be9fd]"></span>
          <span className="w-5 h-4 bg-white"></span>
        </div>
      </div>
    </div>
  );
};

// 3. SKILLS OUTPUT COMPONENT
export const SkillsOutput: React.FC = () => {
  return (
    <div className="space-y-4 font-mono text-sm max-w-xl">
      <div className="text-yellow-400 font-bold">Technical Skills Index:</div>
      {skills.map((skillGroup, idx) => {
        // Calculate a mock percentage for visuals
        let percentage = 90;
        if (skillGroup.category.includes("Languages")) percentage = 95;
        else if (skillGroup.category.includes("DevOps")) percentage = 85;
        else if (skillGroup.category.includes("Databases")) percentage = 90;
        
        const barsCount = Math.floor(percentage / 5);
        const barStr = '='.repeat(barsCount) + ' '.repeat(20 - barsCount);

        return (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-[#8be9fd] font-semibold">
              <span>{skillGroup.category}</span>
              <span>{percentage}%</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <span className="text-[#50fa7b]">[{barStr}]</span>
              <span className="text-xs text-gray-400">({skillGroup.items.join(', ')})</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 4. PROJECTS LIST/DETAILS COMPONENT
interface ProjectsOutputProps {
  project?: Project;
}

export const ProjectsOutput: React.FC<ProjectsOutputProps> = ({ project }) => {
  if (project) {
    return (
      <div className="space-y-2 max-w-2xl font-mono text-sm border-l-2 border-[#50fa7b] pl-4 py-1">
        <div>
          <span className="text-yellow-300 font-bold">📁 Project:</span>{' '}
          <span className="text-white font-bold">{project.name}</span>
        </div>
        <div>
          <span className="text-[#8be9fd] font-semibold">Description:</span>{' '}
          <span className="text-gray-300">{project.description}</span>
        </div>
        <div>
          <span className="text-[#8be9fd] font-semibold">Technologies:</span>{' '}
          <span className="text-xs bg-gray-800 text-gray-200 px-1.5 py-0.5 rounded font-bold">
            {project.technologies.join(', ')}
          </span>
        </div>
        <div className="flex gap-4 pt-1 flex-wrap">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ff79c6] hover:underline font-bold flex items-center gap-1"
          >
            🐙 GitHub
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#50fa7b] hover:underline font-bold flex items-center gap-1"
            >
              🌐 Live Demo
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 font-mono text-sm max-w-2xl">
      <div className="text-yellow-400 font-bold">📁 Featured Projects:</div>
      <div className="space-y-2">
        {projects.map((proj, idx) => (
          <div key={proj.id} className="border border-gray-800 p-2.5 rounded bg-gray-950/40 hover:border-gray-700 transition">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold">{proj.name}</span>
              <span className="text-xs text-gray-500 font-semibold">{proj.technologies.slice(0, 3).join(', ')}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{proj.description}</p>
            <div className="text-xs text-[#8be9fd] mt-1.5">
              Read: <code className="text-[#50fa7b] font-bold bg-gray-900 px-1 rounded">cat projects/project{idx + 1}.md</code>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Type <span className="text-[#50fa7b]">ls projects</span> to view the projects directory, or use <span className="text-[#50fa7b]">cat projects/project1.md</span> to view the raw markdown.
      </div>
    </div>
  );
};

// 5. SUDO HIRE ME OUTPUT COMPONENT
export const SudoHireMeOutput: React.FC = () => {
  return (
    <div className="space-y-3 font-mono text-sm border border-emerald-500/30 bg-emerald-950/20 p-4 rounded max-w-xl">
      <div className="text-emerald-400 font-bold flex items-center gap-2">
        <span>Access Granted ✅</span>
      </div>
      
      <div className="text-yellow-300 font-semibold text-base mt-2">Why Hire Me?</div>
      <ul className="space-y-2 text-gray-200">
        <li className="flex items-start gap-2">
          <span className="text-[#50fa7b] font-bold">✔</span>
          <span><strong>Strong Problem-Solving:</strong> Experience design in backend distributed architectures, cloud orchestration, and automated test frameworks.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#50fa7b] font-bold">✔</span>
          <span><strong>Passionate Learner:</strong> Keeping on top of recent trends including container orchestrations, cloud architecture, and modern application state.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#50fa7b] font-bold">✔</span>
          <span><strong>Modern Development Stack:</strong> Expert workflow involving Git, Docker, Kubernetes, React/TS, and Node.js.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-[#50fa7b] font-bold">✔</span>
          <span><strong>Linux Enthusiast:</strong> Deep understanding of UNIX models, terminal automation, shell scripting, and self-hosted environments.</span>
        </li>
      </ul>
      <div className="text-xs text-gray-400 mt-3 border-t border-emerald-500/20 pt-2 flex justify-between items-center">
        <span>Pradheeban - Developer Portfolio</span>
        <span className="text-emerald-400 font-bold">ready_for_action</span>
      </div>
    </div>
  );
};

const coffeeSteps = [
  { text: 'Brewing coffee ☕...', delay: 0 },
  { text: '  [ ] Grinding fresh coffee beans...', delay: 800 },
  { text: '  [..] Heating pure filtered water...', delay: 1600 },
  { text: '  [::] Dripping double shot espresso...', delay: 2400 },
  { text: 'Done. Enjoy your freshly brewed hot cup of coffee! ☕', delay: 3200 }
];

// 6. COFFEE BREWING ANIMATION COMPONENT
export const CoffeeOutput: React.FC = () => {

  const [displayedSteps, setDisplayedSteps] = useState<string[]>([]);

  useEffect(() => {
    coffeeSteps.forEach((s) => {
      const timer = setTimeout(() => {
        setDisplayedSteps((prev) => [...prev, s.text]);
      }, s.delay);
      return () => clearTimeout(timer);
    });
  }, []);

  return (
    <div className="space-y-1 font-mono text-sm text-[#ffb86c]">
      {displayedSteps.map((line, idx) => (
        <div key={idx} className={idx === displayedSteps.length - 1 ? "text-emerald-400 font-bold" : ""}>
          {line}
        </div>
      ))}
    </div>
  );
};

// 7. ACHIEVEMENTS OUTPUT COMPONENT
export const AchievementsOutput: React.FC = () => {
  return (
    <div className="space-y-3 font-mono text-sm text-gray-200">
      <div className="text-[#8be9fd] font-bold">Achievements & Hackathons:</div>
      {achievements.map((ach, idx) => (
        <div key={idx} className="border-l border-yellow-400 pl-3 py-0.5">
          <div className="text-white font-bold">{ach.title}</div>
          <div className="text-xs text-gray-400 mt-0.5">{ach.details}</div>
        </div>
      ))}
    </div>
  );
};

// 8. PUBLICATIONS OUTPUT COMPONENT
export const PublicationsOutput: React.FC = () => {
  return (
    <div className="space-y-4 font-mono text-sm text-gray-200">
      <div className="text-[#8be9fd] font-bold">Research Publications:</div>
      {publications.map((pub, idx) => (
        <div key={idx} className="border-l border-[#ff79c6] pl-3 py-1 space-y-1">
          <div className="text-[#50fa7b] font-bold leading-relaxed">{pub.title}</div>
          <div className="text-xs text-gray-300">Published in: <span className="font-semibold text-white">{pub.publisher}</span> ({pub.year})</div>
          <div className="text-xs text-[#8be9fd]">DOI: <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{pub.doi}</a></div>
        </div>
      ))}
    </div>
  );
};

// 9. LEARNING OUTPUT COMPONENT
export const LearningOutput: React.FC = () => {
  return (
    <div className="space-y-3 font-mono text-sm max-w-xl">
      <div className="text-[#ff79c6] font-bold">Currently Learning:</div>
      <ul className="space-y-1 text-gray-300">
        {currentlyLearning.map((topic, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="text-[#8be9fd] font-bold">*</span>
            <span>{topic}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 10. STACK OUTPUT COMPONENT
export const StackOutput: React.FC = () => {
  // We can group skills or hardcode based on the prompt's requested format
  // Since we already have the modular skills object, let's format it.
  return (
    <div className="space-y-4 font-mono text-sm max-w-xl text-gray-200">
      <div className="text-[#50fa7b] font-bold underline">Tech Stack</div>
      <div className="space-y-3">
        {skills.map((group, i) => (
          <div key={i}>
            <div className="text-[#ffb86c] font-semibold mb-1">{group.category}:</div>
            <ul className="pl-2">
              {group.items.map((item, j) => (
                <li key={j} className="flex items-center gap-2 text-gray-300">
                  <span className="text-[#8be9fd] text-xs">*</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

// 11. RESUME SUMMARY OUTPUT COMPONENT
export const ResumeSummaryOutput: React.FC = () => {
  return (
    <div className="font-mono text-sm max-w-2xl border-l-2 border-[#ff79c6] pl-4 py-2 space-y-4 bg-gray-900/30 rounded-r-md">
      <div className="text-yellow-400 font-bold tracking-widest border-b border-gray-700 pb-2">
        RESUME SUMMARY
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-200">
        <div className="space-y-1">
          <div><span className="text-[#8be9fd] font-bold">Name:</span> {profile.name}</div>
          <div><span className="text-[#8be9fd] font-bold">Role:</span> {profile.role}</div>
          <div><span className="text-[#8be9fd] font-bold">Experience:</span> {profile.experienceYears}+ Years</div>
        </div>
        <div className="space-y-1">
          <div><span className="text-[#50fa7b] font-bold">Projects:</span> {projects.length}</div>
          <div><span className="text-[#50fa7b] font-bold">Publications:</span> {publications.length}</div>
          <div><span className="text-[#50fa7b] font-bold">Certifications:</span> {certifications.length}</div>
        </div>
      </div>
      <div className="pt-2 border-t border-gray-700">
        <div className="text-yellow-300 font-bold mb-1">Available Commands:</div>
        <ul className="list-disc list-inside text-gray-300 space-y-1 ml-2">
          <li><code className="text-[#ffb86c] font-bold">view resume</code> - Read full resume here</li>
          <li><code className="text-[#ffb86c] font-bold">download resume</code> - Download the PDF version</li>
        </ul>
      </div>
    </div>
  );
};

// 12. VIEW RESUME OUTPUT COMPONENT
export const ViewResumeOutput: React.FC = () => {
  return (
    <div className="font-mono text-sm max-w-3xl space-y-8 bg-black/60 p-6 rounded-md border border-[#8be9fd]/30 shadow-[0_0_15px_rgba(139,233,253,0.05)]">
      {/* Header */}
      <div className="text-center border-b border-[#8be9fd]/30 pb-4">
        <div className="text-2xl font-bold text-[#8be9fd] tracking-widest">{profile.name}</div>
        <div className="text-[#ff79c6] font-semibold">{profile.role}</div>
        <div className="text-gray-400 text-xs mt-2 flex justify-center gap-4">
          <span>{profile.email}</span>
          <span>{profile.location}</span>
          <span>{profile.portfolioUrl.replace('https://', '')}</span>
        </div>
      </div>

      {/* About */}
      <div className="space-y-2">
        <div className="text-[#50fa7b] font-bold uppercase tracking-wider border-b border-gray-700 pb-1">About</div>
        <p className="text-gray-300 leading-relaxed text-sm">{profile.about}</p>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <div className="text-[#50fa7b] font-bold uppercase tracking-wider border-b border-gray-700 pb-1">Skills</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {skills.map((skillGroup, idx) => (
            <div key={idx}>
              <span className="text-[#ffb86c] font-bold">{skillGroup.category}: </span>
              <span className="text-gray-300">{skillGroup.items.join(', ')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-3">
        <div className="text-[#50fa7b] font-bold uppercase tracking-wider border-b border-gray-700 pb-1">Experience</div>
        {experience.map((exp, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-start">
              <div className="text-[#8be9fd] font-bold">{exp.role} <span className="text-gray-400">@ {exp.company}</span></div>
              <div className="text-xs text-gray-500 whitespace-nowrap">{exp.period}</div>
            </div>
            <ul className="list-disc list-outside ml-4 text-gray-300 text-sm space-y-1">
              {exp.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="space-y-3">
        <div className="text-[#50fa7b] font-bold uppercase tracking-wider border-b border-gray-700 pb-1">Education</div>
        {education.map((edu, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-start">
              <div className="text-[#f1fa8c] font-bold">{edu.degree}</div>
              <div className="text-xs text-gray-500 whitespace-nowrap">{edu.period}</div>
            </div>
            <div className="text-gray-300 text-sm">{edu.institution}</div>
            {edu.details && <div className="text-gray-400 text-xs italic">{edu.details}</div>}
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="space-y-3">
        <div className="text-[#50fa7b] font-bold uppercase tracking-wider border-b border-gray-700 pb-1">Key Projects</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-[#ff79c6] font-bold flex items-center justify-between">
                {proj.name}
                <span className="text-xs text-gray-500 font-normal">{proj.technologies.slice(0, 2).join(', ')}</span>
              </div>
              <p className="text-gray-300 text-xs">{proj.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* End */}
      <div className="text-center text-gray-600 text-xs mt-8 pt-4 border-t border-gray-800 border-dashed">
        EOF
      </div>
    </div>
  );
};
