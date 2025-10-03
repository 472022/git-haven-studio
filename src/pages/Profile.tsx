import { Header } from '@/components/Header';
import { RepoCard } from '@/components/RepoCard';
import { demoUser, repositories } from '@/data/demoData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Link as LinkIcon, Twitter, Users, BookOpen, Star, GitFork } from 'lucide-react';

const Profile = () => {
  const userRepos = repositories.filter(r => r.owner === demoUser.username);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-4xl mb-4">
                  {demoUser.avatar}
                </div>
                <h2 className="text-2xl font-bold mb-1">{demoUser.name}</h2>
                <p className="text-muted-foreground">@{demoUser.username}</p>
              </div>

              <p className="text-sm text-foreground mb-6">{demoUser.bio}</p>

              <Button className="w-full mb-6">Edit Profile</Button>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <LinkIcon className="w-4 h-4" />
                  <a href="#" className="text-primary hover:underline">
                    example.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Twitter className="w-4 h-4" />
                  <a href="#" className="text-primary hover:underline">
                    @{demoUser.username}
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>
                    <strong>{demoUser.followers}</strong> followers ·{' '}
                    <strong>{demoUser.following}</strong> following
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-4 mt-4">
              <h3 className="font-semibold mb-4">Contributions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Repositories</span>
                  </div>
                  <span className="font-semibold">{demoUser.repositories}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Stars</span>
                  </div>
                  <span className="font-semibold">
                    {repositories.reduce((acc, r) => acc + r.stars, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GitFork className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Total Forks</span>
                  </div>
                  <span className="font-semibold">
                    {repositories.reduce((acc, r) => acc + r.forks, 0)}
                  </span>
                </div>
              </div>
            </Card>
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Popular Repositories</h1>
              <p className="text-muted-foreground">
                {userRepos.length} repositories created
              </p>
            </div>

            <div className="space-y-4">
              {userRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
