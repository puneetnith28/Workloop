
import React from 'react';
import { 
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  Check,
  Sparkles,
  MessageSquare,
  XCircle,
  CircleAlert,
  Paintbrush,
  Gauge
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface FeedbackItem {
  id: string;
  type: 'suggestion' | 'improvement' | 'warning';
  category: 'design' | 'content' | 'accessibility' | 'performance';
  title: string;
  description: string;
  location?: string;
}

interface AIFeedbackPanelProps {
  fileId: string;
  fileName: string;
  feedbackItems: FeedbackItem[];
  className?: string;
}

const AIFeedbackPanel: React.FC<AIFeedbackPanelProps> = ({
  fileId,
  fileName,
  feedbackItems,
  className,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'design':
        return <Paintbrush size={14} />;
      case 'content':
        return <MessageSquare size={14} />;
      case 'accessibility':
        return <CircleAlert size={14} />;
      case 'performance':
        return <Gauge size={14} />;
      default:
        return <Sparkles size={14} />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'suggestion':
        return <Lightbulb size={16} className="text-amber-400" />;
      case 'improvement':
        return <ThumbsUp size={16} className="text-green-500" />;
      case 'warning':
        return <ThumbsDown size={16} className="text-red-500" />;
      default:
        return <Sparkles size={16} className="text-workloop-purple" />;
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'suggestion':
        return 'bg-amber-500/10 border-amber-500/20';
      case 'improvement':
        return 'bg-green-500/10 border-green-500/20';
      case 'warning':
        return 'bg-red-500/10 border-red-500/20';
      default:
        return 'bg-workloop-purple/10 border-workloop-purple/20';
    }
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles size={18} className="text-workloop-purple" />
          AI Feedback
        </h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{feedbackItems.length} insights</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-1 text-sm">
          <span>Overall Quality</span>
          <span className="font-medium">85%</span>
        </div>
        <Progress value={85} className="h-2" />
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="space-y-3">
          {feedbackItems.map((item) => (
            <Card 
              key={item.id} 
              className={cn("border", getTypeColor(item.type), "animate-fade-in")}
            >
              <CardHeader className="p-3 pb-0 flex flex-row items-start space-y-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  </div>
                  {item.location && (
                    <p className="text-xs text-muted-foreground mt-1">{item.location}</p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <div className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded text-xs",
                    "bg-secondary text-secondary-foreground"
                  )}>
                    {getCategoryIcon(item.category)}
                    <span className="ml-1 capitalize">{item.category}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-2">
                <p className="text-sm">{item.description}</p>
                
                <div className="flex justify-end mt-2 gap-2">
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    Dismiss
                  </Button>
                  <Button 
                    size="sm" 
                    className="h-7 px-2 text-xs gap-1 bg-workloop-purple hover:bg-workloop-dark-purple"
                  >
                    <Check size={12} />
                    Apply Suggestion
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIFeedbackPanel;
