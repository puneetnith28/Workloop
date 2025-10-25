
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FileDiff from '@/components/viewer/FileDiff';
import Sidebar from '@/components/layout/Sidebar';
import AIFeedbackPanel from '@/components/feedback/AIFeedbackPanel';

// Mock version history data
const mockVersions = [
  { id: 'v1', number: '1.0', date: '2025-04-08T09:15:00' },
  { id: 'v2', number: '1.1', date: '2025-04-08T14:30:00' },
  { id: 'v3', number: '1.5', date: '2025-04-09T10:45:00' },
  { id: 'v4', number: '2.0', date: '2025-04-09T16:20:00' },
  { id: 'v5', number: '2.1', date: '2025-04-10T11:20:00' },
];

// Match the FeedbackItem type exactly as expected in AIFeedbackPanel
type FeedbackItemType = 'suggestion' | 'improvement' | 'warning';
type FeedbackCategory = 'content' | 'design' | 'accessibility' | 'performance';

interface FeedbackItem {
  id: string;
  type: FeedbackItemType;
  category: FeedbackCategory;
  title: string;
  description: string;
  location: string;
}

const mockFeedback: FeedbackItem[] = [
  {
    id: 'f1',
    type: 'suggestion',
    category: 'design',
    title: 'Increase color contrast',
    description: 'The text on the hero section has insufficient contrast with the background, making it difficult to read.',
    location: 'Hero Section'
  },
  {
    id: 'f2',
    type: 'improvement',
    category: 'content',
    title: 'Clarify headline',
    description: 'The main headline could be more specific about the product benefits.',
    location: 'Header'
  },
  {
    id: 'f3',
    type: 'warning',
    category: 'accessibility',
    title: 'Add alt text to images',
    description: 'Several images are missing alt text, which is important for screen readers.',
    location: 'Gallery Section'
  },
  {
    id: 'f4',
    type: 'suggestion',
    category: 'performance',
    title: 'Optimize image sizes',
    description: 'The background image is larger than necessary and could be compressed.',
    location: 'Background'
  }
];

const FileViewer = () => {
  const { id } = useParams();
  const [leftVersion, setLeftVersion] = useState(mockVersions[3].id);
  const [rightVersion, setRightVersion] = useState(mockVersions[4].id);
  const [showFeedback, setShowFeedback] = useState(true);
  const fileName = "Landing Page Design"; // Mock file name

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navbar />
      
      <div className="flex-1 overflow-hidden flex">
        <main className="flex-1 overflow-auto">
          <div className="workloop-container">
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" asChild>
                  <Link to="/">
                    <ArrowLeft size={18} />
                  </Link>
                </Button>
                <h1 className="text-2xl font-bold">File Comparison</h1>
              </div>
              
              <Button variant="outline" className="gap-2 border-workloop-purple/30 hover:border-workloop-purple">
                <Download size={16} />
                Export Differences
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                <div className="w-full sm:w-auto">
                  <label className="block text-sm mb-1">Before</label>
                  <Select value={leftVersion} onValueChange={setLeftVersion}>
                    <SelectTrigger className="w-full sm:w-44">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockVersions.map((version) => (
                        <SelectItem key={version.id} value={version.id}>
                          v{version.number} ({formatDate(version.date)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full sm:w-auto">
                  <label className="block text-sm mb-1">After</label>
                  <Select value={rightVersion} onValueChange={setRightVersion}>
                    <SelectTrigger className="w-full sm:w-44">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockVersions.map((version) => (
                        <SelectItem key={version.id} value={version.id}>
                          v{version.number} ({formatDate(version.date)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1"></div>
                
                <Button 
                  variant="outline"
                  className="w-full sm:w-auto border-workloop-purple/30 hover:border-workloop-purple"
                  onClick={() => setShowFeedback(!showFeedback)}
                >
                  {showFeedback ? 'Hide Feedback' : 'Show Feedback'}
                </Button>
              </div>
              
              <div className="gradient-panel overflow-hidden">
                <FileDiff />
              </div>
            </div>
          </div>
        </main>
        
        {showFeedback && (
          <Sidebar title="AI Feedback" position="right" initialExpanded={true}>
            <div className="p-4">
              <AIFeedbackPanel 
                feedbackItems={mockFeedback}
                fileId={id || '1'}
                fileName={fileName} 
              />
            </div>
          </Sidebar>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default FileViewer;
