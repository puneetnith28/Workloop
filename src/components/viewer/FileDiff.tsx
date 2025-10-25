
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  ArrowLeftRight,
  Code, 
  Highlighter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface Version {
  id: string;
  number: string | number;
  date: Date | string;
}

interface FileDiffProps {
  fileId: string;
  fileName: string;
  fileType: 'image' | 'text' | 'code' | 'pdf';
  versions: Version[];
  currentVersionIndex: number;
  previousVersionIndex: number;
  onVersionChange: (current: number, previous: number) => void;
  className?: string;
}

const FileDiff: React.FC<FileDiffProps> = ({
  fileId,
  fileName,
  fileType,
  versions,
  currentVersionIndex,
  previousVersionIndex,
  onVersionChange,
  className,
}) => {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'overlay'>('side-by-side');
  
  const currentVersion = versions[currentVersionIndex];
  const previousVersion = versions[previousVersionIndex];
  
  // For demo purposes, we'll use placeholder images and text for our diff views
  const renderContent = () => {
    if (fileType === 'image') {
      if (viewMode === 'side-by-side') {
        return (
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="border rounded-lg p-4 bg-secondary/30 flex flex-col">
              <div className="text-sm text-muted-foreground mb-2">
                Version {previousVersion.number}
              </div>
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
            <div className="border rounded-lg p-4 bg-secondary/30 flex flex-col">
              <div className="text-sm text-muted-foreground mb-2">
                Version {currentVersion.number}
              </div>
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="border rounded-lg p-4 bg-secondary/30 flex flex-col h-full">
            <div className="text-sm text-muted-foreground mb-2 flex justify-center gap-4">
              <span>Version {previousVersion.number}</span>
              <span>↔</span>
              <span>Version {currentVersion.number}</span>
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="w-full h-60 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        );
      }
    } else if (fileType === 'text' || fileType === 'code') {
      return (
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="border rounded-lg p-4 bg-secondary/30 flex flex-col">
            <div className="text-sm text-muted-foreground mb-2">
              Version {previousVersion.number}
            </div>
            <pre className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-md p-4 text-sm overflow-auto">
              {`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

Duis aute irure dolor in reprehenderit in voluptate velit esse.
Excepteur sint occaecat cupidatat non proident.`}
            </pre>
          </div>
          <div className="border rounded-lg p-4 bg-secondary/30 flex flex-col">
            <div className="text-sm text-muted-foreground mb-2">
              Version {currentVersion.number}
            </div>
            <pre className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-md p-4 text-sm overflow-auto">
              <span className="bg-red-100 dark:bg-red-900/30 line-through">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
              <span className="bg-green-100 dark:bg-green-900/30">Lorem ipsum dolor sit amet, consectetur adipiscing elit - updated intro.</span>
              {`
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.

`}
              <span className="bg-green-100 dark:bg-green-900/30">New paragraph with additional context for the document.
This helps provide more information to the reader.</span>
              {`

Duis aute irure dolor in reprehenderit in voluptate velit esse.
Excepteur sint occaecat cupidatat non proident.`}
            </pre>
          </div>
        </div>
      );
    } else {
      // PDF
      return (
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="border rounded-lg p-4 bg-secondary/30 flex flex-col">
            <div className="text-sm text-muted-foreground mb-2">
              Version {previousVersion.number}
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="w-full h-80 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-secondary/30 flex flex-col">
            <div className="text-sm text-muted-foreground mb-2">
              Version {currentVersion.number}
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="w-full h-80 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      );
    }
  };
  
  const handlePreviousVersionChange = (increment: number) => {
    const newIndex = (previousVersionIndex + increment + versions.length) % versions.length;
    if (newIndex !== currentVersionIndex) {
      onVersionChange(currentVersionIndex, newIndex);
    } else {
      // Skip current version
      handlePreviousVersionChange(increment * 2);
    }
  };
  
  const handleCurrentVersionChange = (increment: number) => {
    const newIndex = (currentVersionIndex + increment + versions.length) % versions.length;
    if (newIndex !== previousVersionIndex) {
      onVersionChange(newIndex, previousVersionIndex);
    } else {
      // Skip previous version
      handleCurrentVersionChange(increment * 2);
    }
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{fileName}</h2>
        
        {fileType === 'image' && (
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'side-by-side' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('side-by-side')}
              className="text-xs"
            >
              Side by Side
            </Button>
            <Button
              variant={viewMode === 'overlay' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('overlay')}
              className="text-xs"
            >
              Overlay
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePreviousVersionChange(-1)}
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="text-sm">
            Version {previousVersion.number}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePreviousVersionChange(1)}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onVersionChange(previousVersionIndex, currentVersionIndex)}
          className="mx-2"
        >
          <ArrowLeftRight size={16} />
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleCurrentVersionChange(-1)}
          >
            <ChevronLeft size={16} />
          </Button>
          <span className="text-sm">
            Version {currentVersion.number}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleCurrentVersionChange(1)}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 min-h-0">
        <Tabs defaultValue="visual" className="h-full flex flex-col">
          <div className="flex justify-center mb-4">
            <TabsList>
              <TabsTrigger value="visual" className="flex items-center gap-1">
                <Highlighter size={14} />
                <span>Visual Diff</span>
              </TabsTrigger>
              {(fileType === 'text' || fileType === 'code') && (
                <TabsTrigger value="code" className="flex items-center gap-1">
                  <Code size={14} />
                  <span>Code View</span>
                </TabsTrigger>
              )}
            </TabsList>
          </div>
          
          <TabsContent value="visual" className="flex-1 min-h-0">
            {renderContent()}
          </TabsContent>
          
          {(fileType === 'text' || fileType === 'code') && (
            <TabsContent value="code" className="flex-1 min-h-0">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="border rounded-lg p-4 bg-secondary/30 h-full">
                  <div className="text-sm text-muted-foreground mb-2">
                    Version {previousVersion.number} - Raw Text
                  </div>
                  <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 text-sm h-60 overflow-auto">
                    {`/* Version ${previousVersion.number} */
function calculateTotal(items) {
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += items[i].price;
  }
  return sum;
}`}
                  </pre>
                </div>
                <div className="border rounded-lg p-4 bg-secondary/30 h-full">
                  <div className="text-sm text-muted-foreground mb-2">
                    Version {currentVersion.number} - Raw Text
                  </div>
                  <pre className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 text-sm h-60 overflow-auto">
                    {`/* Version ${currentVersion.number} */
function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + item.price;
  }, 0);
}`}
                  </pre>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default FileDiff;
