import { useState } from 'react';
import type { DirectoryNode, FileNode } from '../types/fs';
import { initializeVFS, resolvePath, getNodeAtPath, generateTreeString } from '../utils/fileSystem';
import { profile, education, experience, certifications, projects } from '../data';

export interface TerminalLine {
  id: string;
  dir: string;
  command?: string;
  output?: React.ReactNode;
  isError?: boolean;
}

export const useTerminal = (
  setTheme: (t: string) => void
) => {
  const [vfs] = useState<DirectoryNode>(initializeVFS());
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'welcome',
      dir: '~',
      output: (
        <div className="space-y-1 mt-2">
          <div className="text-yellow-400 font-bold text-base md:text-lg">
            Welcome to Pradheeban's Terminal Portfolio
          </div>
          <div className="text-gray-300">
            Type <span className="text-[#50fa7b] font-bold">help</span> to explore my portfolio.
          </div>
        </div>
      )
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const getPathString = (path: string[]) => {
    return path.length === 0 ? '~' : `~/${path.join('/')}`;
  };

  const getSuggestions = (input: string): string => {
    if (!input.trim()) return '';

    const commands = [
      'help', 'about', 'skills', 'projects', 'contact', 'resume',
      'education', 'experience', 'certs', 'clear', 'whoami', 'pwd', 'ls',
      'tree', 'neofetch', 'theme', 'sudo hire-me', 'hack nasa', 'coffee',
      'achievements', 'publications', 'learning', 'stack', 'analytics',
      'view resume', 'download resume', 'github', 'linkedin', 'email'
    ];

    const parts = input.split(/\s+/);
    const cmd = parts[0].toLowerCase();

    // 1. Suggesting commands
    if (parts.length === 1) {
      const match = commands.find(c => c.startsWith(cmd) && c !== cmd);
      if (match) {
        return match;
      }
      return '';
    }

    // 2. Suggesting files/directories for cd, cat, ls
    if (['cd', 'cat', 'ls'].includes(cmd) && parts.length === 2) {
      const arg = parts[1];
      const currentNode = getNodeAtPath(vfs, currentPath);
      if (!currentNode) return '';

      const lastSlashIdx = arg.lastIndexOf('/');
      let dirPath = '';
      let searchPrefix = arg;

      if (lastSlashIdx !== -1) {
        dirPath = arg.substring(0, lastSlashIdx);
        searchPrefix = arg.substring(lastSlashIdx + 1);
      }

      // Resolve targeted dir to search children within
      const resolved = resolvePath(vfs, currentPath, dirPath || '.');
      if (resolved.node && resolved.node.type === 'directory') {
        const children = (resolved.node as DirectoryNode).children;
        const keys = Object.keys(children);

        const match = keys.find(key => {
          const isDir = children[key].type === 'directory';
          if (cmd === 'cd' && !isDir) return false; // cd only autocompletes directories
          return key.startsWith(searchPrefix) && key !== searchPrefix;
        });

        if (match) {
          const completedPath = dirPath ? `${dirPath}/${match}` : match;
          return `${parts[0]} ${completedPath}`;
        }
      }
    }

    return '';
  };

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) {
      // Just print a blank line with the prompt
      setLines(prev => [
        ...prev,
        { id: Math.random().toString(), dir: getPathString(currentPath), command: '' }
      ]);
      return;
    }

    // Save history
    setHistory(prev => {
      const filtered = prev.filter(h => h !== trimmed);
      return [...filtered, trimmed];
    });
    setHistoryIndex(-1);

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const lineId = Math.random().toString();
    const promptLine: TerminalLine = {
      id: lineId,
      dir: getPathString(currentPath),
      command: trimmed
    };

    let output: React.ReactNode = null;
    let isError = false;
    let newPath = [...currentPath];

    // Dynamic Imports or direct renders for Rich Components
    import('../components/TerminalOutputs').then(({ HelpOutput, NeofetchOutput, SkillsOutput, ProjectsOutput, SudoHireMeOutput, CoffeeOutput, AchievementsOutput, PublicationsOutput, LearningOutput, StackOutput, ResumeSummaryOutput, ViewResumeOutput, WhoAmIOutput }) => {
      import('../components/AnalyticsOutput').then(({ AnalyticsOutput }) => {
        switch (command) {
        case 'help':
          output = <HelpOutput />;
          break;
        case 'about':
          output = (
            <div className="text-gray-200 leading-relaxed font-mono">
              {profile.about}
            </div>
          );
          break;
        case 'skills':
          output = <SkillsOutput />;
          break;
        case 'projects': {
          output = <ProjectsOutput />;
          break;
        }
        case 'contact':
          output = (
            <div className="space-y-4 font-mono text-gray-200 max-w-xl">
              <div>
                <div className="text-[#8be9fd] font-bold tracking-widest mb-1">CONTACT INFORMATION</div>
                <div className="text-gray-500">{'─'.repeat(18)}</div>
              </div>
              
              <div className="space-y-1">
                <div className="flex">
                  <span className="w-32 text-[#ffb86c]">Email</span>
                  <span className="text-gray-400 mr-2">:</span>
                  <a href={`mailto:${profile.email}`} className="text-[#ff79c6] hover:underline font-bold">
                    {profile.email}
                  </a>
                </div>
                <div className="flex">
                  <span className="w-32 text-[#ffb86c]">Location</span>
                  <span className="text-gray-400 mr-2">:</span>
                  <span className="text-gray-300">{profile.location}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-[#ffb86c]">Availability</span>
                  <span className="text-gray-400 mr-2">:</span>
                  <span className="text-[#50fa7b] font-bold">Open to Opportunities 🚀</span>
                </div>
              </div>

              <div>
                <div className="text-[#8be9fd] mb-1">Preferred Roles:</div>
                <ul className="space-y-0.5">
                  <li className="flex"><span className="text-gray-400 mr-2">•</span><span className="text-gray-300">AI/ML Engineer</span></li>
                  <li className="flex"><span className="text-gray-400 mr-2">•</span><span className="text-gray-300">Software Developer</span></li>
                  <li className="flex"><span className="text-gray-400 mr-2">•</span><span className="text-gray-300">Backend Developer</span></li>
                </ul>
              </div>

              <div>
                <div className="text-[#8be9fd] mb-1">Response Time:</div>
                <div className="text-gray-300">&lt; 24 Hours</div>
              </div>
            </div>
          );
          break;
        case 'resume':
          output = <ResumeSummaryOutput />;
          break;
        case 'view':
          if (args[0] === 'resume') {
            output = <ViewResumeOutput />;
          } else {
            output = <div className="text-red-400 font-mono">Usage: view resume</div>;
            isError = true;
          }
          break;
        case 'download':
          if (args[0] === 'resume') {
            output = (
              <div className="text-[#50fa7b] font-mono">
                Initiating resume download... 📄
              </div>
            );
            const link = document.createElement('a');
            link.href = '/resume.pdf';
            link.download = 'Pradheeban_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            output = <div className="text-red-400 font-mono">Usage: download resume</div>;
            isError = true;
          }
          break;
        case 'github':
          window.open(profile.github, '_blank');
          output = <div className="text-[#50fa7b] font-mono">Opening GitHub profile... 🐙</div>;
          break;
        case 'linkedin':
          window.open(profile.linkedin, '_blank');
          output = <div className="text-[#50fa7b] font-mono">Opening LinkedIn profile... 💼</div>;
          break;
        case 'email':
          navigator.clipboard.writeText(profile.email).catch(() => {});
          output = <div className="text-[#50fa7b] font-mono">Email copied to clipboard ✓</div>;
          break;
        case 'education':
          output = (
            <div className="space-y-2 font-mono text-gray-200">
              <div className="text-[#8be9fd] font-bold">Education History:</div>
              {education.map((edu, i) => (
                <div key={i} className="border-l border-gray-700 pl-3">
                  <div className="text-white font-bold">{edu.degree}</div>
                  <div className="text-xs text-gray-400">{edu.institution} | {edu.period}</div>
                  {edu.details && <div className="text-xs text-gray-300 mt-1">{edu.details}</div>}
                </div>
              ))}
            </div>
          );
          break;
        case 'experience':
          output = (
            <div className="space-y-3 font-mono text-gray-200">
              <div className="text-[#8be9fd] font-bold">Work Experience:</div>
              {experience.map((exp, i) => (
                <div key={i} className="border-l border-[#ff79c6] pl-3 py-0.5">
                  <div className="text-white font-bold">{exp.role} <span className="text-gray-500">@</span> <span className="text-[#50fa7b]">{exp.company}</span></div>
                  <div className="text-xs text-gray-400 font-semibold">{exp.period}</div>
                  <ul className="list-disc list-inside text-xs text-gray-300 mt-1.5 space-y-1">
                    {exp.points.map((pt, idx) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          );
          break;
        case 'certs':
          output = (
            <div className="space-y-2 font-mono text-gray-200">
              <div className="text-[#8be9fd] font-bold">Certifications:</div>
              {certifications.map((c, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-white font-bold">🏅 {c.name}</span>
                  <span className="text-xs text-gray-400">{c.issuer} ({c.year})</span>
                </div>
              ))}
            </div>
          );
          break;
        case 'achievements':
          output = <AchievementsOutput />;
          break;
        case 'publications':
          output = <PublicationsOutput />;
          break;
        case 'learning':
          output = <LearningOutput />;
          break;
        case 'stack':
          output = <StackOutput />;
          break;
        case 'analytics':
          output = <AnalyticsOutput />;
          break;
        case 'clear':
          setLines([]);
          return;
        case 'whoami':
          output = <WhoAmIOutput />;
          break;
        case 'pwd':
          output = <div className="text-gray-300 font-mono">/{currentPath.join('/')}</div>;
          break;
        case 'ls': {
          const targetDir = args[0] || '.';
          const resolved = resolvePath(vfs, currentPath, targetDir);
          if (resolved.error) {
            output = <div className="text-red-400 font-mono">{resolved.error}</div>;
            isError = true;
          } else if (resolved.node?.type === 'file') {
            output = <div className="text-gray-300 font-mono">{resolved.node.name}</div>;
          } else if (resolved.node?.type === 'directory') {
            const dirNode = resolved.node as DirectoryNode;
            const childrenKeys = Object.keys(dirNode.children);
            output = (
              <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-sm">
                {childrenKeys.map(key => {
                  const isDir = dirNode.children[key].type === 'directory';
                  return (
                    <span
                      key={key}
                      className={isDir ? 'text-[#8be9fd] font-bold' : 'text-gray-300'}
                    >
                      {key}{isDir && '/'}
                    </span>
                  );
                })}
                {childrenKeys.length === 0 && <span className="text-gray-500 italic">empty directory</span>}
              </div>
            );
          }
          break;
        }
        case 'cd': {
          const target = args[0] || '/';
          const resolved = resolvePath(vfs, currentPath, target);
          if (resolved.error) {
            output = <div className="text-red-400 font-mono">{resolved.error}</div>;
            isError = true;
          } else if (resolved.node?.type === 'file') {
            output = <div className="text-red-400 font-mono">cd: not a directory: {resolved.node.name}</div>;
            isError = true;
          } else if (resolved.path) {
            newPath = resolved.path;
            setCurrentPath(newPath);
          }
          break;
        }
        case 'cat': {
          if (!args[0]) {
            output = <div className="text-red-400 font-mono">usage: cat [file_name]</div>;
            isError = true;
            break;
          }
          const target = args[0];
          const resolved = resolvePath(vfs, currentPath, target);
          if (resolved.error) {
            output = <div className="text-red-400 font-mono">{resolved.error}</div>;
            isError = true;
          } else if (resolved.node?.type === 'directory') {
            output = <div className="text-red-400 font-mono">cat: {target}: Is a directory</div>;
            isError = true;
          } else if (resolved.node?.type === 'file') {
            // Check if this is a project markdown file to render as rich ProjectOutput
            const isProjectFile = resolved.path?.includes('projects') && target.endsWith('.md');
            if (isProjectFile) {
              const fileNode = resolved.node as FileNode;
              const projIndex = projects.findIndex(p => fileNode.content.includes(p.name));
              const proj = projIndex !== -1 ? projects[projIndex] : projects[0];
              output = <ProjectsOutput project={proj} />;
            } else {
              output = (
                <div className="text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">
                  {(resolved.node as FileNode).content}
                </div>
              );
            }
          }
          break;
        }
        case 'tree': {
          const treeStr = generateTreeString(vfs);
          output = (
            <div className="text-gray-300 font-mono whitespace-pre leading-relaxed select-none">
              {treeStr}
            </div>
          );
          break;
        }
        case 'neofetch':
          output = <NeofetchOutput />;
          break;
        case 'theme': {
          const selectedTheme = args[0]?.toLowerCase();
          if (!selectedTheme) {
            output = (
              <div className="text-gray-300 font-mono space-y-1">
                <div>Usage: <code className="text-[#50fa7b] font-bold">theme [theme-name]</code></div>
                <div>Available themes: <span className="text-[#8be9fd]">ubuntu</span>, <span className="text-[#8be9fd]">matrix</span>, <span className="text-[#8be9fd]">dracula</span>, <span className="text-[#8be9fd]">kali</span></div>
              </div>
            );
          } else if (['ubuntu', 'matrix', 'dracula', 'kali'].includes(selectedTheme)) {
            setTheme(selectedTheme);
            output = (
              <div className="text-[#50fa7b] font-mono">
                Theme changed to <span className="font-bold">{selectedTheme}</span>!
              </div>
            );
          } else {
            output = (
              <div className="text-red-400 font-mono">
                Unknown theme: {selectedTheme}. Choose from: ubuntu, matrix, dracula, kali
              </div>
            );
            isError = true;
          }
          break;
        }
        case 'sudo': {
          if (args[0]?.toLowerCase() === 'hire-me') {
            output = <SudoHireMeOutput />;
          } else {
            output = (
              <div className="text-red-400 font-mono">
                Access Denied 🚫. Did you mean <span className="text-[#50fa7b] font-bold">sudo hire-me</span>?
              </div>
            );
            isError = true;
          }
          break;
        }
        case 'hack': {
          if (args[0]?.toLowerCase() === 'nasa') {
            output = (
              <div className="text-red-400 font-bold font-mono animate-pulse">
                Access Denied 🚫
                <div className="text-xs text-gray-400 mt-1 font-normal">Nice try.</div>
              </div>
            );
          } else {
            output = <div className="text-red-400 font-mono">Permission denied. Unable to hack.</div>;
            isError = true;
          }
          break;
        }
        case 'coffee':
          setIsExecuting(true);
          output = <CoffeeOutput onComplete={() => setIsExecuting(false)} />;
          break;
        default:
          output = (
            <div className="text-red-400 font-mono">
              -bash: {command}: command not found. Type <span className="text-[#50fa7b] font-bold">help</span> to list available commands.
            </div>
          );
          isError = true;
      }

      setLines(prev => [...prev, promptLine, { id: Math.random().toString(), dir: getPathString(newPath), output, isError }]);
      });
    });
  };

  return {
    lines,
    currentInput,
    setCurrentInput,
    executeCommand,
    currentPath: getPathString(currentPath),
    history,
    historyIndex,
    setHistoryIndex,
    getSuggestions,
    isExecuting
  };
};
