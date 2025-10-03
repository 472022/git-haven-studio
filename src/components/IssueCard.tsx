import { MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Issue } from '@/data/demoData';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface IssueCardProps {
  issue: Issue;
}

export const IssueCard = ({ issue }: IssueCardProps) => {
  const isOpen = issue.state === 'open';

  return (
    <Card className="p-4 hover:bg-accent/50 transition-colors">
      <div className="flex gap-3">
        <div className="pt-1">
          {isOpen ? (
            <AlertCircle className="w-5 h-5 text-success" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-purple" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer">
              {issue.title}
            </h3>
            {issue.labels.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {issue.labels.map((label) => (
                  <Badge
                    key={label.name}
                    variant="outline"
                    className="text-xs"
                    style={{ borderColor: label.color, color: label.color }}
                  >
                    {label.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>#{issue.number}</span>
            <span>opened {issue.createdAt} by {issue.author}</span>
            {issue.comments > 0 && (
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{issue.comments}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
