
import React from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  FileCode, 
  File, 
  Clock, 
  User, 
  MessageSquare,
  ArrowLeftRight,
  RotateCcw,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type FileType = 'pdf' | 'image' | 'text' | 'code';

interface FileCardProps {
  id: string;
  name: string;
  type: FileType;
  version: string | number;
  changeSummary: string;
  author: string;
  updatedAt: string | Date;
  feedbackRating?: number;
  className?: string;
}

const FileCard: React.FC<FileCardProps> = ({
  id,
  name,
  type,
  version,
  changeSummary,
  author,
  updatedAt,
  feedbackRating,
  className,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileTypeIcon = () => {
    switch (type) {
      case 'pdf':
        return <File className="text-red-500" />;
      case 'image':
        return <ImageIcon className="text-blue-500" />;
      case 'code':
        return <FileCode className="text-green-500" />;
      case 'text':
      default:
        return <FileText className="text-yellow-500" />;
    }
  };

  const getCardGradient = () => {
    switch (type) {
      case 'pdf':
        return 'from-red-500/5 to-orange-500/5';
      case 'image':
        return 'from-blue-500/5 to-purple-500/5';
      case 'code':
        return 'from-green-500/5 to-teal-500/5';
      case 'text':
      default:
        return 'from-yellow-500/5 to-amber-500/5';
    }
  };

  const formatDate = (date: string | Date) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <Card className={cn(
      "hover:shadow-md transition-all duration-300 animate-fade-in",
      "border border-border hover:border-workloop-purple/40",
      "transform hover:-translate-y-1",
      `bg-gradient-to-br ${getCardGradient()}`,
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1 p-2 bg-white/40 dark:bg-gray-800/40 rounded-lg transition-colors duration-200 group-hover:bg-workloop-purple/10">
              {fileTypeIcon()}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-base line-clamp-1">{name}</h3>
                <Badge variant="outline" className="text-xs bg-white/30 dark:bg-gray-800/30">v{version}</Badge>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">{changeSummary}</p>
              
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User size={12} />
                  <span>{author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{formatDate(updatedAt)}</span>
                </div>
                {feedbackRating !== undefined && (
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-amber-500" />
                    <span>{feedbackRating}/5</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 bg-white/20 dark:bg-gray-800/20 flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 transition-colors hover:bg-workloop-purple/10 hover:text-workloop-purple"
          onClick={() => navigate(`/files/${id}`)}
        >
          <ArrowLeftRight size={14} />
          <span>Compare</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 transition-colors hover:bg-workloop-purple/10 hover:text-workloop-purple"
          onClick={() => {
            // Dispatch a frontend-only revert event that the Files page listens to
            try {
              window.dispatchEvent(new CustomEvent('revert-file', { detail: { id } }));
              toast({ title: 'Revert requested', description: `Revert initiated for ${name}` });
            } catch (e) {
              console.error(e);
            }
          }}
        >
          <RotateCcw size={14} />
          <span>Revert</span>
        </Button>
        
        <Button asChild variant="ghost" size="sm" className="gap-1 ml-auto transition-colors hover:bg-workloop-purple/10 hover:text-workloop-purple">
          <Link to={`/feedback/${id}`}>
            <MessageSquare size={14} />
            <span>AI Feedback</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
