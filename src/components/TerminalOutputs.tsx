import React, { useState, useEffect, useRef } from 'react';
import { profile, skills, projects, achievements, publications, currentlyLearning, experience, education, certifications, type Project } from '../data';
import { generateSlug } from '../utils/fileSystem';

// 1. HELP OUTPUT COMPONENT
export const HelpOutput: React.FC = () => {
  const categories = [
    {
      title: "Navigation",
      commands: [
        { cmd: 'pwd', desc: 'Show current location' },
        { cmd: 'ls', desc: 'List available files' },
        { cmd: 'cd', desc: 'Change directory' },
        { cmd: 'tree', desc: 'Show portfolio structure' },
        { cmd: 'cat', desc: 'Read file contents' },
        { cmd: 'clear', desc: 'Clear terminal' },
      ]
    },
    {
      title: "Profile",
      commands: [
        { cmd: 'about', desc: 'About me' },
        { cmd: 'whoami', desc: 'Fun command identifying yourself' },
        { cmd: 'neofetch', desc: 'Display developer profile' },
        { cmd: 'resume', desc: 'Resume summary and options' },
        { cmd: 'view resume', desc: 'Display full resume in terminal' },
        { cmd: 'download resume', desc: 'Download PDF resume' },
        { cmd: 'education', desc: 'Educational background' },
        { cmd: 'experience', desc: 'Work experience' },
        { cmd: 'contact', desc: 'Contact information' },
        { cmd: 'github', desc: 'Open GitHub profile' },
        { cmd: 'linkedin', desc: 'Open LinkedIn profile' },
        { cmd: 'email', desc: 'Copy email address' },
      ]
    },
    {
      title: "Portfolio",
      commands: [
        { cmd: 'projects', desc: 'View my projects' },
        { cmd: 'achievements', desc: 'Achievements & Hackathons' },
        { cmd: 'publications', desc: 'Research Publications' },
        { cmd: 'certs', desc: 'Certifications' },
        { cmd: 'learning', desc: 'Currently learning topics' },
        { cmd: 'stack', desc: 'Technical stack breakdown' },
        { cmd: 'skills', desc: 'Technical skills' },
      ]
    },
    {
      title: "Utilities",
      commands: [
        { cmd: 'help', desc: 'Show all available commands' },
        { cmd: 'theme', desc: 'Switch terminal themes' },
        { cmd: 'analytics', desc: 'View portfolio statistics' },
        { cmd: 'history', desc: 'Show command history' },
        { cmd: 'date', desc: 'Show current date and time' },
        { cmd: 'status', desc: 'Candidate availability status' },
      ]
    },
    {
      title: "Fun Commands",
      commands: [
        { cmd: 'coffee', desc: 'Brew a virtual coffee' },
        { cmd: 'hack nasa', desc: 'Simulate a hacking sequence' },
        { cmd: 'sudo hire-me', desc: 'Recruiter shortcut' },
      ]
    }
  ];

  return (
    <div className="space-y-5 font-mono text-sm max-w-3xl">
      <div className="text-yellow-400 font-bold">Available commands:</div>

      {categories.map((category, idx) => (
        <div key={idx} className="space-y-1">
          <div className="text-[#ff79c6] font-bold mb-2 uppercase tracking-widest border-b border-gray-800 pb-1">
            {category.title}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
            {category.commands.map((c, i) => (
              <div key={i} className="flex">
                <span className="text-[#8be9fd] w-36 flex-shrink-0 font-bold">{c.cmd}</span>
                <span className="text-gray-300">- {c.desc}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-xs text-gray-500 mt-4 border-t border-gray-800 border-dashed pt-3">
        Pro tip: Navigation commands like <span className="text-[#50fa7b]">cd</span>, <span className="text-[#50fa7b]">ls [dir]</span>, <span className="text-[#50fa7b]">cat [file]</span>, <span className="text-[#50fa7b]">pwd</span> and <span className="text-[#50fa7b]">tree</span> are fully supported!
      </div>
    </div>
  );
};

// 2. NEOFETCH OUTPUT COMPONENT
export const NeofetchOutput: React.FC = () => {
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
    <div className="flex flex-col md:flex-row font-mono text-sm gap-6 p-2 leading-relaxed text-gray-300">
      <div className="text-[#50fa7b] font-bold pre-formatted whitespace-pre select-none flex-shrink-0">
        {asciiArt}
      </div>

      <div className="flex-1 w-full max-w-2xl">
        <div className="text-[#ff79c6] font-bold text-base tracking-wide">pradheeban@portfolio</div>
        <div className="text-gray-600 mb-2">--------------------</div>

        <div className="space-y-1 mb-4">
          <div className="flex items-center"><span className="text-[#8be9fd] font-semibold w-32">OS</span><span className="mr-2 text-gray-500">:</span><span className="text-white">PortfolioOS v2026</span></div>
          <div className="flex items-center"><span className="text-[#8be9fd] font-semibold w-32">Host</span><span className="mr-2 text-gray-500">:</span><span className="text-white">pradheeban.vercel.app</span></div>
          <div className="flex items-center"><span className="text-[#8be9fd] font-semibold w-32">Kernel</span><span className="mr-2 text-gray-500">:</span><span className="text-white">React 19 + TypeScript</span></div>
        </div>

        <div className="space-y-1 mb-4">
          <div className="flex items-center"><span className="text-[#8be9fd] font-semibold w-32">Role</span><span className="mr-2 text-gray-500">:</span><span className="text-[#50fa7b] font-bold border border-[#50fa7b]/30 bg-[#50fa7b]/10 px-1.5 py-0.5 rounded text-[11px] uppercase tracking-wider">AI/ML Engineer</span></div>
          <div className="flex items-center"><span className="text-[#8be9fd] font-semibold w-32">Experience</span><span className="mr-2 text-gray-500">:</span><span>Generative AI + Frontend Engineering</span></div>
          <div className="flex items-center"><span className="text-[#8be9fd] font-semibold w-32">Research</span><span className="mr-2 text-gray-500">:</span><span className="text-[#ffb86c] font-bold border border-[#ffb86c]/30 bg-[#ffb86c]/10 px-1.5 py-0.5 rounded text-[11px] uppercase tracking-wider">IEEE Published Researcher</span></div>
          <div className="flex items-center"><span className="text-[#8be9fd] font-semibold w-32">Projects</span><span className="mr-2 text-gray-500">:</span><span>PrepWise | ASTRA | Anomaly Detection</span></div>
        </div>

        <div className="mb-4">
          <div className="flex"><span className="text-[#8be9fd] font-semibold w-32">Specialties</span><span className="mr-2 text-gray-500">:</span></div>
          <ul className="pl-[8.5rem] space-y-0.5 -mt-5">
            <li className="flex"><span className="text-gray-500 mr-2">•</span>LLM Applications</li>
            <li className="flex"><span className="text-gray-500 mr-2">•</span>RAG Pipelines</li>
            <li className="flex"><span className="text-gray-500 mr-2">•</span>Agentic AI Systems</li>
            <li className="flex"><span className="text-gray-500 mr-2">•</span>Full-Stack Development</li>
          </ul>
        </div>

        <div className="mb-4">
          <div className="flex"><span className="text-[#8be9fd] font-semibold w-32">Achievements</span><span className="mr-2 text-gray-500">:</span></div>
          <ul className="pl-[8.5rem] space-y-0.5 -mt-5">
            <li className="flex"><span className="text-gray-500 mr-2">•</span>Top 30 / 250+ @ KGeN.io</li>
            <li className="flex"><span className="text-gray-500 mr-2">•</span>Ideathon Winner</li>
            <li className="flex"><span className="text-gray-500 mr-2">•</span>Multiple Hackathon Awards</li>
          </ul>
        </div>

        <div className="space-y-1 mb-4 mt-2">
          <div className="flex items-center"><span className="text-[#8be9fd] font-semibold w-32">Status</span><span className="mr-2 text-gray-500">:</span><span className="text-[#8be9fd] font-bold border border-[#8be9fd]/30 bg-[#8be9fd]/10 px-1.5 py-0.5 rounded text-[11px] uppercase tracking-wider">Open to Opportunities</span></div>
          <div className="flex items-center"><span className="text-[#8be9fd] font-semibold w-32">Current Goal</span><span className="mr-2 text-gray-500">:</span><span className="text-white">Building Production AI Systems</span></div>
        </div>

        <div className="space-y-1 mb-4">
          <div className="flex items-center"><span className="text-[#8be9fd] font-semibold w-32">Skills</span><span className="mr-2 text-gray-500">:</span><span>Python • React • Node.js • LangChain</span></div>
          <div className="flex items-center"><span className="text-[#8be9fd] font-semibold w-32">Location</span><span className="mr-2 text-gray-500">:</span><span>India</span></div>
        </div>

        {/* Color Blocks */}
        <div className="flex gap-1.5 mt-5 select-none">
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
    <div className="space-y-5 font-mono text-sm max-w-2xl">
      <div className="text-yellow-400 font-bold mb-1">Technical Skills Index</div>
      {skills.map((skillGroup, idx) => (
        <div key={idx} className="space-y-1.5">
          <div className="text-[#8be9fd] font-bold">
            <span className="text-[#50fa7b] mr-2">►</span>
            {skillGroup.category}
          </div>
          <div className="text-gray-300 break-words leading-relaxed">
            {skillGroup.items.join(' • ')}
          </div>
        </div>
      ))}
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
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ff79c6] hover:underline font-bold flex items-center gap-1"
            >
              🐙 GitHub
            </a>
          ) : (
            <span className="text-gray-600 font-mono text-xs border border-gray-700 px-1.5 py-0.5 rounded">
              🔒 Private Repository
            </span>
          )}
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
        {projects.map((proj) => (
          <div key={proj.id} className="border border-gray-800 p-2.5 rounded bg-gray-950/40 hover:border-gray-700 transition">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold">{proj.name}</span>
              <span className="text-xs text-gray-500 font-semibold">{proj.technologies.slice(0, 3).join(', ')}</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">{proj.description}</p>
            <div className="text-xs text-[#8be9fd] mt-1.5">
              Read: <code className="text-[#50fa7b] font-bold bg-gray-900 px-1 rounded">cat projects/{generateSlug(proj.name)}.md</code>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Type <span className="text-[#50fa7b]">ls projects</span> to view the projects directory, then use <span className="text-[#50fa7b]">cat projects/&lt;project-name&gt;.md</span> to inspect a project.
      </div>
    </div>
  );
};

// 5. SUDO HIRE ME OUTPUT COMPONENT
export const SudoHireMeOutput: React.FC = () => {
  return (
    <div className="space-y-4 font-mono text-sm border border-emerald-500/30 bg-emerald-950/20 p-4 rounded max-w-xl">
      <div className="text-emerald-400 font-bold flex items-center gap-2">
        <span>Access Granted ✅</span>
      </div>

      <div>
        <div className="text-yellow-300 font-semibold text-base mb-2 border-b border-emerald-500/30 pb-1 inline-block">Why Hire Me?</div>
        <ul className="space-y-2 text-gray-200">
          <li className="flex items-start gap-2">
            <span className="text-[#50fa7b] font-bold">✔</span>
            <span><strong className="text-white">AI/ML Engineering:</strong> Expertise in Generative AI, RAG pipelines, Agentic systems and LLM applications.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#50fa7b] font-bold">✔</span>
            <span><strong className="text-white">Research & Innovation:</strong> IEEE-published researcher with 2 active publications pushing the boundaries of AI.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#50fa7b] font-bold">✔</span>
            <span><strong className="text-white">Real-World Engineering:</strong> Industry experience at Telesoft Technologies building software for Cybersecurity & Telecom.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#50fa7b] font-bold">✔</span>
            <span><strong className="text-white">Full-Stack Development:</strong> Strong foundation in React, TypeScript, Node.js, REST APIs and modern architectures.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#50fa7b] font-bold">✔</span>
            <span><strong className="text-white">Problem Solver:</strong> Proven track record as a multiple hackathon/ideathon winner and Top 30 @ KGeN.io out of 250+.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#50fa7b] font-bold">✔</span>
            <span><strong className="text-white">Continuous Learner:</strong> Always exploring cutting-edge AI developments and transitioning research to production.</span>
          </li>
        </ul>
      </div>

      <div className="border border-emerald-500/20 bg-black/40 p-3 rounded">
        <div className="text-[#8be9fd] font-bold mb-1">Recruiter Summary:</div>
        <div className="grid grid-cols-[140px_1fr] gap-y-1 text-gray-300">
          <span className="text-[#ffb86c]">Publications</span>
          <span>: 2</span>
          <span className="text-[#ffb86c]">Projects</span>
          <span>: 3+ (PrepWise, ASTRA, Anomaly Detection)</span>
          <span className="text-[#ffb86c]">Industry Exp.</span>
          <span>: Cybersecurity & Telecom</span>
          <span className="text-[#ffb86c]">Specialization</span>
          <span>: AI/ML Engineering</span>
          <span className="text-[#ffb86c]">Status</span>
          <span className="text-[#50fa7b] font-bold">: Open to Opportunities 🚀</span>
        </div>
      </div>

      <div className="text-xs text-gray-400 mt-3 border-t border-emerald-500/20 pt-2 flex justify-between items-center">
        <span>Pradheeban - Developer Portfolio</span>
        <span className="text-emerald-400 font-bold animate-pulse">open_to_opportunities</span>
      </div>
    </div>
  );
};

const coffeeSteps = [
  { text: '[✓] Grinding beans', delay: 800 },
  { text: '[✓] Heating water', delay: 1600 },
  { text: '[✓] Extracting espresso', delay: 2400 },
  { text: '[✓] Pouring coffee', delay: 3200 }
];

interface CoffeeOutputProps {
  onComplete?: () => void;
}

// 6. COFFEE BREWING ANIMATION COMPONENT
export const CoffeeOutput: React.FC<CoffeeOutputProps> = ({ onComplete }) => {
  const [displayedSteps, setDisplayedSteps] = useState<string[]>([]);
  const completedRef = useRef(false);

  useEffect(() => {
    let isCancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    coffeeSteps.forEach((s) => {
      const timer = setTimeout(() => {
        if (!isCancelled) {
          setDisplayedSteps((prev) => {
            if (!prev.includes(s.text)) return [...prev, s.text];
            return prev;
          });
        }
      }, s.delay);
      timers.push(timer);
    });

    return () => {
      isCancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (displayedSteps.length === coffeeSteps.length && onComplete && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  }, [displayedSteps, onComplete]);

  return (
    <div className="space-y-2 font-mono text-sm max-w-lg mt-1">
      <div className="text-[#8be9fd] mb-3">Initializing Coffee Engine v1.0...</div>

      {displayedSteps.length > 0 && (
        <div className="space-y-1 text-gray-300">
          {displayedSteps.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      )}

      {displayedSteps.length === coffeeSteps.length && (
        <div className="mt-4 pt-2 border-t border-gray-800 space-y-1">
          <div className="text-[#50fa7b] font-bold">Coffee successfully brewed ☕</div>
          <div className="text-[#ff79c6] font-bold">Productivity increased +25%</div>
        </div>
      )}
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
  const [openAbstract, setOpenAbstract] = useState<number | null>(null);

  return (
    <div className="space-y-6 font-mono text-sm text-gray-200 max-w-3xl">
      <div className="text-[#8be9fd] font-bold tracking-widest border-b border-gray-800 pb-2">
        RESEARCH PUBLICATIONS
      </div>

      {publications.map((pub, idx) => (
        <div
          key={idx}
          className="border-l-2 border-[#ff79c6] pl-4 py-1 space-y-3"
        >
          <div className="space-y-1">
            <div className="text-[#50fa7b] font-bold leading-relaxed break-words">
              {pub.title}
            </div>

            <div className="text-xs text-gray-300 flex flex-wrap gap-x-4 gap-y-1">
              <div>
                Published in:{" "}
                <span className="font-semibold text-white">
                  {pub.publisher}
                </span>{" "}
                ({pub.year})
              </div>
              <div className="text-[#8be9fd]">
                DOI:{" "}
                <a
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline inline-flex items-center gap-1"
                >
                  🔗 {pub.doi}
                </a>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-1">
            <div className="text-[#ff79c6] font-semibold text-xs tracking-wide">Summary:</div>
            <div className="text-gray-300 leading-relaxed text-sm">
              {pub.summary}
            </div>
          </div>

          {/* Terminal-style toggle */}
          <div>
            <button
              onClick={() =>
                setOpenAbstract(openAbstract === idx ? null : idx)
              }
              className="text-[#f1fa8c] font-mono font-bold text-xs hover:text-white transition-colors duration-200"
            >
              {openAbstract === idx
                ? "$ collapse abstract"
                : "$ cat abstract.txt"}
            </button>
          </div>

          {/* Abstract */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${openAbstract === idx ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
              }`}
          >
            <div className="bg-[#0f1419] border border-gray-800 rounded p-4 text-sm text-gray-400 leading-loose shadow-inner">
              <div className="text-[#8be9fd] font-bold mb-2 text-xs uppercase tracking-widest border-b border-gray-800 pb-1 inline-block">Abstract</div>
              <div className="text-gray-300">{pub.abstract}</div>
            </div>
          </div>
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

// 10. STACK OUTPUT COMPONENT — shows tooling, frameworks and dev environment
export const StackOutput: React.FC = () => {
  const stackGroups = [
    {
      label: 'AI / ML Tooling',
      icon: '🤖',
      tools: ['Python', 'LangChain', 'LangGraph', 'Hugging Face', 'Streamlit', 'Ollama']
    },
    {
      label: 'Frontend',
      icon: '🖥️',
      tools: ['React.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'HTML/CSS']
    },
    {
      label: 'Backend & APIs',
      icon: '⚙️',
      tools: ['Node.js', 'Express.js', 'REST APIs', 'Supabase', 'PostgreSQL']
    },
    {
      label: 'Dev & Ops',
      icon: '🛠️',
      tools: ['Git', 'GitHub', 'Docker', 'VS Code', 'Linux']
    },
    {
      label: 'Cloud & Infra',
      icon: '☁️',
      tools: ['AWS (Cloud Practitioner)', 'Google Cloud ML APIs']
    }
  ];

  return (
    <div className="space-y-4 font-mono text-sm max-w-2xl">
      <div className="text-[#50fa7b] font-bold tracking-widest border-b border-gray-800 pb-1">TECH STACK</div>
      <div className="text-gray-500 text-xs mb-2">Tools, frameworks and environments I actively work with.</div>
      <div className="space-y-3">
        {stackGroups.map((group, i) => (
          <div key={i} className="grid grid-cols-[160px_1fr] items-start">
            <span className="text-[#ffb86c] font-semibold">{group.icon} {group.label}</span>
            <span className="text-gray-300">{group.tools.join(' · ')}</span>
          </div>
        ))}
      </div>
      <div className="text-gray-600 text-xs border-t border-gray-800 pt-2">
        See also: <span className="text-[#50fa7b]">skills</span> — for a categorized skills index
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
          <div><span className="text-[#8be9fd] font-bold">Experience:</span> {experience.length > 0 ? `${Math.max(1, new Date().getFullYear() - parseInt(experience[experience.length - 1].period.match(/\b\d{4}\b/)?.[0] || String(new Date().getFullYear())))}+ Years` : '1+ Years'}</div>
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
          {projects.map((proj) => (
            <div key={proj.id} className="space-y-1">
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

// 13. WHOAMI OUTPUT COMPONENT
export const WhoAmIOutput: React.FC = () => {
  return (
    <div className="font-mono text-sm max-w-lg space-y-4 bg-gray-900/40 p-4 rounded-md border border-gray-700/50 shadow-sm relative overflow-hidden mt-1">
      <div className="absolute top-0 left-0 w-1 h-full bg-[#50fa7b]"></div>

      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2 border-b border-gray-800/60 pb-2">
        <span className="text-[#50fa7b] animate-pulse">●</span>
        <span className="tracking-widest uppercase font-semibold">Authentication Successful</span>
      </div>

      <div className="text-[#8be9fd] font-bold text-base mt-2">
        recruiter@pradheeban.vercel.app
      </div>

      <div className="space-y-1 mt-4">
        <div className="flex">
          <span className="w-32 text-[#ffb86c]">Access Level</span>
          <span className="text-gray-400 mr-2">:</span>
          <span className="text-gray-200">Portfolio Explorer</span>
        </div>
        <div className="flex">
          <span className="w-32 text-[#ffb86c]">Current Task</span>
          <span className="text-gray-400 mr-2">:</span>
          <span className="text-gray-200">Evaluating Candidate</span>
        </div>
        <div className="flex">
          <span className="w-32 text-[#ffb86c]">Status</span>
          <span className="text-gray-400 mr-2">:</span>
          <span className="text-[#ff79c6] font-bold">Looking for reasons to hire</span>
        </div>
      </div>
    </div>
  );
};
