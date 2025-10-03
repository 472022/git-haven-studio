import { GitPullRequest, GitMerge, MessageCircle, Plus, Minus } from 'lucide-react';
import { PullRequest } from '@/data/demoData';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface PullRequestCardProps {
  pr: PullRequest;
}

export const PullRequestCard = ({ pr }: PullRequestCardProps) => {
  const getStateIcon = () => {
    switch (pr.state) {
      case 'merged':
        return <GitMerge className="w-5 h-5 text-purple" />;
      case 'closed':
        return <GitPullRequest className="w-5 h-5 text-destructive" />;
      default:
        return <GitPullRequest className="w-5 h-5 text-success" />;
    }
  };

  const getStateBadge = () => {
    switch (pr.state) {
      case 'merged':
        return <Badge className="bg-purple text-white">Merged</Badge>;
      case 'closed':
        return <Badge variant="destructive">Closed</Badge>;
      default:
        return <Badge className="bg-success text-white">Open</Badge>;
    }
  };

  return (
    <Card className="p-4 hover:bg-accent/50 transition-colors">
      <div className="flex gap-3">
        <div className="pt-1">{getStateIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer">
              {pr.title}
            </h3>
            {getStateBadge()}
          </div>
          <div className="flex items-center flex-wrap gap-3 text-sm text-muted-foreground mb-2">
            <span>#{pr.number}</span>
            <span>opened {pr.createdAt} by {pr.author}</span>
            {pr.comments > 0 && (
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{pr.comments}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1 text-success">
              <Plus className="w-3 h-3" />
              <span>{pr.additions} additions</span>
            </div>
            <div className="flex items-center gap-1 text-destructive">
              <Minus className="w-3 h-3" />
              <span>{pr.deletions} deletions</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {pr.branch}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
