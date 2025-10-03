import { File, Folder, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { FileNode } from '@/data/demoData';

interface FileTreeProps {
  nodes: FileNode[];
  onFileSelect?: (path: string) => void;
}

interface FileTreeNodeProps {
  node: FileNode;
  level: number;
  onFileSelect?: (path: string) => void;
}

const FileTreeNode = ({ node, level, onFileSelect }: FileTreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(level === 0);

  const handleClick = () => {
    if (node.type === 'folder') {
      setIsOpen(!isOpen);
    } else {
      onFileSelect?.(node.path);
    }
  };

  return (
    <div>
      <div
        className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent rounded cursor-pointer group"
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
      >
        {node.type === 'folder' && (
          <div className="w-4 h-4 flex items-center justify-center text-muted-foreground">
            {isOpen ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </div>
        )}
        {node.type === 'folder' ? (
          <Folder className="w-4 h-4 text-info shrink-0" />
        ) : (
          <File className="w-4 h-4 text-muted-foreground shrink-0 ml-4" />
        )}
        <span className="text-sm truncate">{node.name}</span>
      </div>
      {node.type === 'folder' && isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.path}
              node={child}
              level={level + 1}
              onFileSelect={onFileSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileTree = ({ nodes, onFileSelect }: FileTreeProps) => {
  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      {nodes.map((node) => (
        <FileTreeNode key={node.path} node={node} level={0} onFileSelect={onFileSelect} />
      ))}
    </div>
  );
};
