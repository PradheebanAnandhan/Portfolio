export interface FileNode {
  type: 'file';
  name: string;
  content: string;
  isOpenable?: boolean;
}

export interface DirectoryNode {
  type: 'directory';
  name: string;
  children: { [name: string]: VNode };
}

export type VNode = FileNode | DirectoryNode;

export interface VFSState {
  root: DirectoryNode;
  currentPath: string[]; // e.g. [] for root, ['projects'] for /projects
}
