import type { VNode, DirectoryNode } from '../types/fs';
import { profile, skills, experience, education, projects, achievements, publications, currentlyLearning } from '../data';

// Helper to format skills list
const formatSkills = (): string => {
  return skills
    .map(cat => `${cat.category}:\n${cat.items.map(item => `  * ${item}`).join('\n')}`)
    .join('\n\n');
};

// Helper to format experience
const formatExperience = (): string => {
  return experience
    .map(exp => `Role: ${exp.role}\nCompany: ${exp.company} (${exp.period})\n${exp.points.map(pt => `  * ${pt}`).join('\n')}`)
    .join('\n\n');
};

// Helper to format education
const formatEducation = (): string => {
  return education
    .map(edu => `Degree: ${edu.degree}\nInstitution: ${edu.institution} (${edu.period})${edu.details ? `\nDetails: ${edu.details}` : ''}`)
    .join('\n\n');
};

// Helper to format achievements
const formatAchievements = (): string => {
  return achievements
    .map(ach => `* ${ach.title}\n  ${ach.details}`)
    .join('\n\n');
};

// Helper to format publications
const formatPublications = (): string => {
  return publications
    .map(pub => `Title: ${pub.title}\nPublisher: ${pub.publisher} (${pub.year})\nDOI: ${pub.doi}`)
    .join('\n\n');
};

// Helper to format contact
const formatContact = (): string => {
  return `Contact Information:
* Email: ${profile.email}
* LinkedIn: ${profile.linkedin}
* GitHub: ${profile.github}
* Portfolio: ${profile.portfolioUrl}`;
};

export const initializeVFS = (): DirectoryNode => {
  const root: DirectoryNode = {
    type: 'directory',
    name: 'root',
    children: {
      'about.txt': {
        type: 'file',
        name: 'about.txt',
        content: profile.about
      },
      'skills.txt': {
        type: 'file',
        name: 'skills.txt',
        content: formatSkills()
      },
      'education.txt': {
        type: 'file',
        name: 'education.txt',
        content: formatEducation()
      },
      'experience.txt': {
        type: 'file',
        name: 'experience.txt',
        content: formatExperience()
      },
      'contact.txt': {
        type: 'file',
        name: 'contact.txt',
        content: formatContact()
      },
      'achievements.txt': {
        type: 'file',
        name: 'achievements.txt',
        content: formatAchievements()
      },
      'publications.txt': {
        type: 'file',
        name: 'publications.txt',
        content: formatPublications()
      },
      'learning.txt': {
        type: 'file',
        name: 'learning.txt',
        content: currentlyLearning.join('\n')
      },
      'stack.txt': {
        type: 'file',
        name: 'stack.txt',
        content: 'Run the stack command to see the details.'
      },
      'resume.pdf': {
        type: 'file',
        name: 'resume.pdf',
        content: `[PDF Document] Pradheeban_Resume.pdf\n\nRun the 'resume' command to download/open the full PDF version of my resume.`,
        isOpenable: true
      },
      'projects': {
        type: 'directory',
        name: 'projects',
        children: {
          'project1.md': {
            type: 'file',
            name: 'project1.md',
            content: projects[0].content
          },
          'project2.md': {
            type: 'file',
            name: 'project2.md',
            content: projects[1].content
          },
          'project3.md': {
            type: 'file',
            name: 'project3.md',
            content: projects[2].content
          }
        }
      }
    }
  };
  return root;
};

// Traverse paths and resolve node
export const resolvePath = (
  root: DirectoryNode,
  currentPath: string[],
  targetPath: string
): { node: VNode | null; path: string[] | null; error?: string } => {
  if (!targetPath) {
    return { node: getNodeAtPath(root, currentPath), path: currentPath };
  }

  const segments = targetPath.split('/').filter(s => s.length > 0);
  const workingPath = targetPath.startsWith('/') ? [] : [...currentPath];

  // Get node at starting working path
  const startNode = getNodeAtPath(root, workingPath);
  if (!startNode) return { node: null, path: null, error: 'Path resolution failed' };
  let currentNode: VNode = startNode;

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];

    if (segment === '.') {
      continue;
    }

    if (segment === '..') {
      if (workingPath.length > 0) {
        workingPath.pop();
        const nextNode = getNodeAtPath(root, workingPath);
        if (nextNode) currentNode = nextNode;
      }
      continue;
    }

    if (currentNode.type !== 'directory') {
      return { node: null, path: null, error: `cat: ${currentNode.name}: Not a directory` };
    }

    const nextNode: VNode = currentNode.children[segment];
    if (!nextNode) {
      return { node: null, path: null, error: `No such file or directory: ${segment}` };
    }

    currentNode = nextNode;
    if (nextNode.type === 'directory') {
      workingPath.push(segment);
    } else {
      // It's a file. If it's not the last segment, error: directory expected
      if (i < segments.length - 1) {
        return { node: null, path: null, error: `Not a directory: ${segment}` };
      }
      // If it is the last segment, we return this file
      return { node: nextNode, path: [...workingPath, segment] };
    }
  }

  return { node: currentNode, path: workingPath };
};

// Helper to get node at a path represented by an array of directory names
export const getNodeAtPath = (root: DirectoryNode, path: string[]): DirectoryNode | null => {
  let current: DirectoryNode = root;
  for (const dirName of path) {
    const nextNode = current.children[dirName];
    if (!nextNode || nextNode.type !== 'directory') {
      return null;
    }
    current = nextNode;
  }
  return current;
};

// Generate tree print-out
export const generateTreeString = (node: VNode, nameOverride = '/'): string => {
  const lines: string[] = [];

  const traverse = (currentNode: VNode, prefix: string, isLast: boolean, name: string) => {
    const currentName = name;
    const connector = isLast ? '└── ' : '├── ';
    lines.push(prefix + (prefix ? connector : '') + currentName);

    if (currentNode.type === 'directory') {
      const childrenKeys = Object.keys(currentNode.children);
      const newPrefix = prefix + (prefix ? (isLast ? '    ' : '│   ') : '');
      childrenKeys.forEach((key, idx) => {
        const childNode = currentNode.children[key];
        traverse(childNode, newPrefix, idx === childrenKeys.length - 1, key);
      });
    }
  };

  traverse(node, '', true, nameOverride);
  return lines.join('\n');
};
