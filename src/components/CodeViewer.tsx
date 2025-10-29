import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface CodeViewerProps {
  content: string;
  language?: string;
  isEditable?: boolean;
  onContentChange?: (newContent: string) => void;
}

export const CodeViewer = ({ 
  content, 
  language = 'typescript',
  isEditable = false,
  onContentChange
}: CodeViewerProps) => {
  if (isEditable) {
    return (
      <Card className="overflow-hidden">
        <Textarea
          value={content}
          onChange={(e) => onContentChange?.(e.target.value)}
          className="min-h-[500px] font-mono text-sm resize-none border-0 focus-visible:ring-0 rounded-none"
          placeholder="Edit your code here..."
        />
      </Card>
    );
  }

  const lines = content.split('\n');

  return (
    <Card className="overflow-hidden">
      <div className="bg-code-bg border border-code-border">
        <div className="overflow-x-auto">
          <pre className="p-4">
            <code className="text-sm">
              {lines.map((line, index) => (
                <div key={index} className="flex gap-4">
                  <span className="text-muted-foreground select-none w-8 text-right shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{line || ' '}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </Card>
  );
};
