import { Card } from '@/components/ui/card';

interface CodeViewerProps {
  content: string;
  language?: string;
}

export const CodeViewer = ({ content, language = 'typescript' }: CodeViewerProps) => {
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
