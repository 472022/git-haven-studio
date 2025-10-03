import { GitCommit } from 'lucide-react';
import { Commit } from '@/data/demoData';
import { Card } from '@/components/ui/card';

interface CommitListProps {
  commits: Commit[];
}

export const CommitList = ({ commits }: CommitListProps) => {
  return (
    <div className="space-y-2">
      {commits.map((commit) => (
        <Card key={commit.id} className="p-4 hover:bg-accent/50 transition-colors">
          <div className="flex gap-3">
            <GitCommit className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground mb-1">{commit.message}</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="font-mono text-xs bg-secondary px-2 py-0.5 rounded">
                  {commit.hash}
                </span>
                <span>{commit.author}</span>
                <span>committed {commit.date}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
