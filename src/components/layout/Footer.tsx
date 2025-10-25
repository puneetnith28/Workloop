
import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  className?: string;
  versionSummary?: string;
}

const Footer: React.FC<FooterProps> = ({ 
  className, 
  versionSummary = "No changes detected in this version." 
}) => {
  return (
    <footer className={cn(
      "border-t border-border py-3 bg-gradient-to-t from-secondary/30 to-background/80 backdrop-blur-md",
      className
    )}>
      <div className="workloop-container flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} WorkLoop
        </div>
        
        {versionSummary && (
          <div className="flex items-center gap-2 text-sm px-3 py-1.5 bg-gradient-to-r from-white/50 to-secondary/30 dark:from-gray-900/50 dark:to-gray-800/30 rounded-full">
            <Sparkles size={14} className="text-workloop-purple" />
            <span>{versionSummary}</span>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
