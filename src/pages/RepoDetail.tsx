import { useParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { FileTree } from '@/components/FileTree';
import { IssueCard } from '@/components/IssueCard';
import { PullRequestCard } from '@/components/PullRequestCard';
import { CommitList } from '@/components/CommitList';
import { CodeViewer } from '@/components/CodeViewer';
import { repositories, fileTree, issues, pullRequests, commits, readmeContent } from '@/data/demoData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, GitFork, Eye, Code, AlertCircle, GitPullRequest, GitCommit, Settings, Upload, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const RepoDetail = () => {
  const { owner, repo: repoName } = useParams();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isPushing, setIsPushing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [fileContent, setFileContent] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState(false);
  
  const repo = repositories.find(r => r.owner === owner && r.name === repoName);
  const repoFullName = `${owner}/${repoName}`;

  // Load file content from database or use demo content
  useEffect(() => {
    const loadFileContent = async () => {
      const currentFile = selectedFile || 'README.md';
      
      const { data, error } = await supabase
        .from('file_contents')
        .select('content')
        .eq('repository', repoFullName)
        .eq('file_path', currentFile)
        .maybeSingle();

      if (data) {
        setFileContent(data.content);
      } else {
        // Use demo content if not in database
        const demoContent = selectedFile 
          ? `// ${selectedFile}\n\nconst example = "File content would be displayed here";\n\nexport default example;`
          : readmeContent;
        setFileContent(demoContent);
      }
    };

    loadFileContent();
  }, [selectedFile, owner, repoName, repoFullName]);

  const handlePush = async () => {
    if (!isEditMode) {
      toast.info('No changes to push', {
        description: 'Enter edit mode and make changes before pushing.'
      });
      return;
    }

    setIsPushing(true);
    try {
      const currentFile = selectedFile || 'README.md';
      
      const { error } = await supabase
        .from('file_contents')
        .upsert({
          repository: repoFullName,
          file_path: currentFile,
          content: fileContent
        }, {
          onConflict: 'repository,file_path'
        });

      if (error) throw error;

      toast.success('Changes pushed successfully!', {
        description: 'Your changes have been saved to the repository.'
      });
      setIsEditMode(false);
    } catch (error) {
      console.error('Push error:', error);
      toast.error('Push failed', {
        description: 'Unable to push changes. Please try again.'
      });
    } finally {
      setIsPushing(false);
    }
  };

  const handlePull = async () => {
    setIsPulling(true);
    try {
      const currentFile = selectedFile || 'README.md';
      
      const { data, error } = await supabase
        .from('file_contents')
        .select('content')
        .eq('repository', repoFullName)
        .eq('file_path', currentFile)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setFileContent(data.content);
        toast.success('Repository updated!', {
          description: 'Latest changes pulled from remote repository.'
        });
      } else {
        toast.info('No remote changes', {
          description: 'This file has not been pushed yet.'
        });
      }
    } catch (error) {
      console.error('Pull error:', error);
      toast.error('Pull failed', {
        description: 'Unable to pull changes. Please try again.'
      });
    } finally {
      setIsPulling(false);
    }
  };

  if (!repo) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Repository not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">
                  <span className="text-muted-foreground">{repo.owner}</span>
                  <span className="mx-2">/</span>
                  <span>{repo.name}</span>
                </h1>
                <Badge variant="outline">{repo.isPrivate ? 'Private' : 'Public'}</Badge>
              </div>
              <p className="text-muted-foreground">{repo.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Star className="w-4 h-4" />
                Star
                <Badge variant="secondary">{repo.stars.toLocaleString()}</Badge>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <GitFork className="w-4 h-4" />
                Fork
                <Badge variant="secondary">{repo.forks}</Badge>
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.languageColor }} />
              <span>{repo.language}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>Watching</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="code" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="code" className="gap-2">
              <Code className="w-4 h-4" />
              Code
            </TabsTrigger>
            <TabsTrigger value="issues" className="gap-2">
              <AlertCircle className="w-4 h-4" />
              Issues
              <Badge variant="secondary">{issues.filter(i => i.state === 'open').length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="pulls" className="gap-2">
              <GitPullRequest className="w-4 h-4" />
              Pull Requests
              <Badge variant="secondary">{pullRequests.filter(pr => pr.state === 'open').length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="commits" className="gap-2">
              <GitCommit className="w-4 h-4" />
              Commits
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="code">
            <div className="mb-4 flex items-center justify-between">
              <Button 
                variant={isEditMode ? "outline" : "default"}
                size="sm" 
                onClick={() => setIsEditMode(!isEditMode)}
              >
                {isEditMode ? 'View Mode' : 'Edit Mode'}
              </Button>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={handlePull}
                  disabled={isPulling}
                >
                  <Download className="w-4 h-4" />
                  {isPulling ? 'Pulling...' : 'Pull'}
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="gap-2"
                  onClick={handlePush}
                  disabled={isPushing}
                >
                  <Upload className="w-4 h-4" />
                  {isPushing ? 'Pushing...' : 'Push'}
                </Button>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <h3 className="font-semibold mb-3">Files</h3>
                <FileTree nodes={fileTree} onFileSelect={setSelectedFile} />
              </div>
              <div className="lg:col-span-2">
                <h3 className="font-semibold mb-3">
                  {selectedFile || 'README.md'}
                </h3>
                <CodeViewer 
                  content={fileContent}
                  language={selectedFile?.endsWith('.md') ? 'markdown' : 'typescript'}
                  isEditable={isEditMode}
                  onContentChange={setFileContent}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="issues">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Issues</h2>
              <Button className="gap-2">
                <AlertCircle className="w-4 h-4" />
                New Issue
              </Button>
            </div>
            <div className="space-y-4">
              {issues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pulls">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Pull Requests</h2>
              <Button className="gap-2">
                <GitPullRequest className="w-4 h-4" />
                New Pull Request
              </Button>
            </div>
            <div className="space-y-4">
              {pullRequests.map((pr) => (
                <PullRequestCard key={pr.id} pr={pr} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="commits">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Commit History</h2>
              <p className="text-muted-foreground text-sm">
                Recent commits to the main branch
              </p>
            </div>
            <CommitList commits={commits} />
          </TabsContent>

          <TabsContent value="settings">
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold mb-6">Repository Settings</h2>
              <div className="space-y-6">
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">General</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage your repository settings and configurations
                  </p>
                  <Button variant="outline">Edit Settings</Button>
                </div>
                <div className="border border-destructive rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-destructive">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Irreversible actions that require careful consideration
                  </p>
                  <Button variant="destructive">Delete Repository</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RepoDetail;
