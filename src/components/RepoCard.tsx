import { Star, GitFork, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Repository } from '@/data/demoData';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RepoCardProps {
  repo: Repository;
}

export const RepoCard = ({ repo }: RepoCardProps) => {
  return (
    <Card className="p-4 hover:bg-accent/50 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Link
              to={`/repo/${repo.owner}/${repo.name}`}
              className="text-primary font-semibold hover:underline text-lg truncate"
            >
              {repo.owner}/{repo.name}
            </Link>
            {repo.isPrivate && (
              <Badge variant="outline" className="gap-1">
                <Lock className="w-3 h-3" />
                Private
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {repo.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: repo.languageColor }}
              />
              <span className="text-foreground">{repo.language}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star className="w-4 h-4" />
              <span>{repo.stars.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <GitFork className="w-4 h-4" />
              <span>{repo.forks}</span>
            </div>
            <span className="text-muted-foreground">Updated {repo.updatedAt}</span>
          </div>
          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {repo.topics.map((topic) => (
                <Badge key={topic} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <Button variant="outline" size="sm" className="shrink-0 gap-2">
          <Star className="w-4 h-4" />
          Star
        </Button>
      </div>
    </Card>
  );
};
