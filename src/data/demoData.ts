export interface Repository {
  id: string;
  name: string;
  owner: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  isPrivate: boolean;
  updatedAt: string;
  topics: string[];
}

export interface Issue {
  id: string;
  number: number;
  title: string;
  author: string;
  state: 'open' | 'closed';
  comments: number;
  labels: { name: string; color: string }[];
  createdAt: string;
}

export interface PullRequest {
  id: string;
  number: number;
  title: string;
  author: string;
  state: 'open' | 'closed' | 'merged';
  comments: number;
  additions: number;
  deletions: number;
  createdAt: string;
  branch: string;
}

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
}

export interface Commit {
  id: string;
  message: string;
  author: string;
  hash: string;
  date: string;
}

export const demoUser = {
  username: 'demo-user',
  name: 'Demo User',
  bio: 'Full-stack developer passionate about open source',
  avatar: '👤',
  followers: 234,
  following: 189,
  repositories: 42,
  contributions: 1247,
};

export const repositories: Repository[] = [
  {
    id: '1',
    name: 'awesome-react-app',
    owner: 'demo-user',
    description: 'A modern React application with TypeScript and Tailwind CSS',
    stars: 1243,
    forks: 234,
    language: 'TypeScript',
    languageColor: '#3178c6',
    isPrivate: false,
    updatedAt: '2 hours ago',
    topics: ['react', 'typescript', 'tailwind'],
  },
  {
    id: '2',
    name: 'nodejs-api-boilerplate',
    owner: 'demo-user',
    description: 'Production-ready Node.js API with authentication and testing',
    stars: 856,
    forks: 167,
    language: 'JavaScript',
    languageColor: '#f1e05a',
    isPrivate: false,
    updatedAt: '1 day ago',
    topics: ['nodejs', 'express', 'api'],
  },
  {
    id: '3',
    name: 'ml-image-classifier',
    owner: 'demo-user',
    description: 'Deep learning model for image classification using TensorFlow',
    stars: 2341,
    forks: 456,
    language: 'Python',
    languageColor: '#3572A5',
    isPrivate: false,
    updatedAt: '3 days ago',
    topics: ['machine-learning', 'tensorflow', 'python'],
  },
  {
    id: '4',
    name: 'design-system',
    owner: 'demo-user',
    description: 'Comprehensive design system with reusable components',
    stars: 567,
    forks: 89,
    language: 'CSS',
    languageColor: '#563d7c',
    isPrivate: false,
    updatedAt: '5 days ago',
    topics: ['design-system', 'css', 'components'],
  },
  {
    id: '5',
    name: 'private-project',
    owner: 'demo-user',
    description: 'Internal tooling for team productivity',
    stars: 12,
    forks: 3,
    language: 'Go',
    languageColor: '#00ADD8',
    isPrivate: true,
    updatedAt: '1 week ago',
    topics: ['golang', 'tooling'],
  },
];

export const issues: Issue[] = [
  {
    id: '1',
    number: 234,
    title: 'Add dark mode support to settings page',
    author: 'contributor-1',
    state: 'open',
    comments: 5,
    labels: [
      { name: 'enhancement', color: '#a2eeef' },
      { name: 'good first issue', color: '#7057ff' },
    ],
    createdAt: '2 days ago',
  },
  {
    id: '2',
    number: 233,
    title: 'Fix memory leak in file upload component',
    author: 'bug-hunter',
    state: 'open',
    comments: 12,
    labels: [
      { name: 'bug', color: '#d73a4a' },
      { name: 'priority: high', color: '#b60205' },
    ],
    createdAt: '3 days ago',
  },
  {
    id: '3',
    number: 232,
    title: 'Update documentation for API endpoints',
    author: 'docs-team',
    state: 'closed',
    comments: 3,
    labels: [{ name: 'documentation', color: '#0075ca' }],
    createdAt: '1 week ago',
  },
  {
    id: '4',
    number: 231,
    title: 'Implement search functionality with filters',
    author: 'feature-dev',
    state: 'open',
    comments: 8,
    labels: [
      { name: 'enhancement', color: '#a2eeef' },
      { name: 'feature request', color: '#d876e3' },
    ],
    createdAt: '1 week ago',
  },
];

export const pullRequests: PullRequest[] = [
  {
    id: '1',
    number: 145,
    title: 'Add TypeScript support for utility functions',
    author: 'ts-contributor',
    state: 'open',
    comments: 7,
    additions: 234,
    deletions: 89,
    createdAt: '1 day ago',
    branch: 'feature/typescript-utils',
  },
  {
    id: '2',
    number: 144,
    title: 'Refactor authentication flow',
    author: 'security-team',
    state: 'merged',
    comments: 15,
    additions: 456,
    deletions: 234,
    createdAt: '3 days ago',
    branch: 'refactor/auth-flow',
  },
  {
    id: '3',
    number: 143,
    title: 'Fix responsive layout on mobile devices',
    author: 'ui-dev',
    state: 'open',
    comments: 4,
    additions: 67,
    deletions: 23,
    createdAt: '5 days ago',
    branch: 'fix/mobile-responsive',
  },
];

export const fileTree: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    path: 'src',
    children: [
      {
        name: 'components',
        type: 'folder',
        path: 'src/components',
        children: [
          { name: 'Button.tsx', type: 'file', path: 'src/components/Button.tsx' },
          { name: 'Card.tsx', type: 'file', path: 'src/components/Card.tsx' },
          { name: 'Header.tsx', type: 'file', path: 'src/components/Header.tsx' },
        ],
      },
      {
        name: 'utils',
        type: 'folder',
        path: 'src/utils',
        children: [
          { name: 'auth.ts', type: 'file', path: 'src/utils/auth.ts' },
          { name: 'helpers.ts', type: 'file', path: 'src/utils/helpers.ts' },
        ],
      },
      { name: 'App.tsx', type: 'file', path: 'src/App.tsx' },
      { name: 'index.tsx', type: 'file', path: 'src/index.tsx' },
    ],
  },
  {
    name: 'public',
    type: 'folder',
    path: 'public',
    children: [
      { name: 'index.html', type: 'file', path: 'public/index.html' },
      { name: 'favicon.ico', type: 'file', path: 'public/favicon.ico' },
    ],
  },
  { name: 'package.json', type: 'file', path: 'package.json' },
  { name: 'README.md', type: 'file', path: 'README.md' },
  { name: 'tsconfig.json', type: 'file', path: 'tsconfig.json' },
];

export const commits: Commit[] = [
  {
    id: '1',
    message: 'feat: add user authentication',
    author: 'demo-user',
    hash: 'a3f2b1c',
    date: '2 hours ago',
  },
  {
    id: '2',
    message: 'fix: resolve memory leak in upload handler',
    author: 'demo-user',
    hash: 'b2c3d4e',
    date: '5 hours ago',
  },
  {
    id: '3',
    message: 'docs: update API documentation',
    author: 'contributor-1',
    hash: 'c4d5e6f',
    date: '1 day ago',
  },
  {
    id: '4',
    message: 'refactor: improve code structure',
    author: 'demo-user',
    hash: 'd5e6f7g',
    date: '2 days ago',
  },
  {
    id: '5',
    message: 'feat: implement dark mode',
    author: 'ui-dev',
    hash: 'e6f7g8h',
    date: '3 days ago',
  },
];

export const readmeContent = `# Awesome React App

A modern React application built with TypeScript and Tailwind CSS.

## Features

- ⚡️ Lightning fast development with Vite
- 🎨 Beautiful UI with Tailwind CSS
- 📝 Type-safe with TypeScript
- 🧪 Comprehensive test coverage
- 📦 Optimized build size

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) for details.
`;
