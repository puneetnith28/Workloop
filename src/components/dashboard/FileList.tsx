
import React from 'react';
import { FileCard } from '@/components/dashboard';
import { cn } from '@/lib/utils';

// Mock data for files
export const mockFiles = [
  {
    id: '1',
    name: 'Landing Page Design',
    type: 'image' as const,
    version: '3.2',
    changeSummary: 'Updated hero section with new illustration and adjusted color contrast',
    author: 'Puneet Yadav',
    updatedAt: '2025-04-12T14:30:00',
    feedbackRating: 4.5,
  },
  {
    id: '2',
    name: 'Project Proposal.pdf',
    type: 'pdf' as const,
    version: '1.8',
    changeSummary: 'Added section on budget allocation and timeline estimates',
    author: 'Maya Rodriguez',
    updatedAt: '2025-04-11T09:15:00',
    feedbackRating: 4.2,
  },
  {
    id: '3',
    name: 'Blog Post - AI Trends',
    type: 'text' as const,
    version: '2.4',
    changeSummary: 'Revised introduction and added two new sections on recent advancements',
    author: 'Jamie Lee',
    updatedAt: '2025-04-10T16:45:00',
    feedbackRating: 4.8,
  },
  {
    id: '4',
    name: 'Homepage Redesign Mockup',
    type: 'image' as const,
    version: '5.1',
    changeSummary: 'Implemented dark mode version and refined mobile responsive elements',
    author: 'Tyler Smith',
    updatedAt: '2025-04-09T11:20:00',
    feedbackRating: 3.9,
  },
  {
    id: '5',
    name: 'API Documentation',
    type: 'code' as const,
    version: '2.0',
    changeSummary: 'Updated authentication methods and added new endpoints documentation',
    author: 'Chris Wong',
    updatedAt: '2025-04-08T14:50:00',
    feedbackRating: 4.0,
  },
];

interface FileListProps {
  files?: typeof mockFiles;
  className?: string;
}

const FileList: React.FC<FileListProps> = ({
  files = mockFiles,
  className,
}) => {
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground mb-2">No files found</p>
        <p className="text-sm text-muted-foreground">
          Upload a file or change your filters to see results
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-1 gap-4", className)}>
      {files.map((file) => (
        <FileCard
          key={file.id}
          id={file.id}
          name={file.name}
          type={file.type}
          version={file.version}
          changeSummary={file.changeSummary}
          author={file.author}
          updatedAt={file.updatedAt}
          feedbackRating={file.feedbackRating}
        />
      ))}
    </div>
  );
};

export default FileList;
