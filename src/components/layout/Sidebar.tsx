
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  children: React.ReactNode;
  title?: string;
  position?: 'left' | 'right';
  initialExpanded?: boolean;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
  title,
  position = 'right',
  initialExpanded = true,
  className,
}) => {
  const [expanded, setExpanded] = useState(initialExpanded);

  return (
    <aside
      className={cn(
        'h-[calc(100vh-3.5rem)] flex flex-col border-border transition-all duration-300 bg-sidebar',
        position === 'right' ? 'border-l' : 'border-r',
        expanded ? 'w-72' : 'w-10',
        className
      )}
    >
      <div className="flex items-center justify-between px-3 py-2 h-10 border-b border-border">
        {expanded && title && (
          <span className="font-medium truncate">{title}</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-6 w-6 rounded-full',
            !expanded && 'mx-auto'
          )}
          onClick={() => setExpanded(!expanded)}
        >
          {position === 'right' ? (
            expanded ? <ChevronRight size={16} /> : <ChevronLeft size={16} />
          ) : (
            expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />
          )}
        </Button>
      </div>
      
      <div 
        className={cn(
          'flex-1 overflow-auto',
          expanded ? 'opacity-100' : 'opacity-0'
        )}
      >
        {expanded && children}
      </div>
    </aside>
  );
};

export default Sidebar;
