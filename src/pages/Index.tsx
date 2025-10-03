import { Header } from '@/components/Header';
import { RepoCard } from '@/components/RepoCard';
import { repositories } from '@/data/demoData';
import { Button } from '@/components/ui/button';
import { Book, Star, GitFork } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const publicRepos = repositories.filter(r => !r.isPrivate);
  const privateRepos = repositories.filter(r => r.isPrivate);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="space-y-2 sticky top-24">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Book className="w-4 h-4" />
                Repositories
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Star className="w-4 h-4" />
                Starred
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <GitFork className="w-4 h-4" />
                Forks
              </Button>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Repositories</h1>
              <p className="text-muted-foreground">
                Manage and explore your code repositories
              </p>
            </div>

            <Tabs defaultValue="public" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="public">
                  Public Repositories ({publicRepos.length})
                </TabsTrigger>
                <TabsTrigger value="private">
                  Private Repositories ({privateRepos.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="public" className="space-y-4">
                {publicRepos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </TabsContent>

              <TabsContent value="private" className="space-y-4">
                {privateRepos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
