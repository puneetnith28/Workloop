
import React, { useState } from 'react';
import {
  MessageSquare,
  Star,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface FeedbackItem {
  id: string;
  fileId: string;
  fileName: string;
  fileType: string;
  message: string;
  category: 'design' | 'content' | 'accessibility' | 'performance';
  author: string;
  createdAt: string;
  status: 'open' | 'resolved' | 'in-progress';
  priority: 'low' | 'medium' | 'high';
}

const mockFeedbackItems: FeedbackItem[] = [
  {
    id: 'fb1',
    fileId: '1',
    fileName: 'Landing Page Design',
    fileType: 'image',
    message: 'The contrast ratio of the text on the hero section doesn\'t meet WCAG standards. Consider increasing the contrast or changing the color combination.',
    category: 'accessibility',
    author: 'WorkLoop AI',
    createdAt: '2025-04-12T10:30:00',
    status: 'open',
    priority: 'high'
  },
  {
    id: 'fb2',
    fileId: '1',
    fileName: 'Landing Page Design',
    fileType: 'image',
    message: 'The headline could be more concise and action-oriented. Consider using active voice and reducing word count by 30%.',
    category: 'content',
    author: 'Rajat Aggarwal',
    createdAt: '2025-04-11T15:45:00',
    status: 'in-progress',
    priority: 'medium'
  },
  {
    id: 'fb3',
    fileId: '2',
    fileName: 'Project Proposal.pdf',
    fileType: 'pdf',
    message: 'This budget section would benefit from a visual breakdown chart to make the information more digestible.',
    category: 'design',
    author: 'Maya Rodriguez',
    createdAt: '2025-04-10T09:20:00',
    status: 'resolved',
    priority: 'low'
  },
  {
    id: 'fb4',
    fileId: '3',
    fileName: 'Blog Post - AI Trends',
    fileType: 'text',
    message: 'Some of the images in this post are quite large and may slow down page load times. Consider optimizing them.',
    category: 'performance',
    author: 'WorkLoop AI',
    createdAt: '2025-04-09T14:15:00',
    status: 'open',
    priority: 'medium'
  },
  {
    id: 'fb5',
    fileId: '4',
    fileName: 'Homepage Redesign Mockup',
    fileType: 'image',
    message: 'The mobile version has some elements that are too small for touch targets. Increase button sizes for better usability.',
    category: 'design',
    author: 'WorkLoop AI',
    createdAt: '2025-04-08T11:30:00',
    status: 'in-progress',
    priority: 'high'
  },
];

const Feedback = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'in-progress' | 'resolved'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  // Filter feedback items based on current filters
  const getFilteredItems = () => {
    return mockFeedbackItems.filter(item => {
      // Filter by search query
      if (searchQuery && !item.message.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !item.fileName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by status tab
      if (activeTab !== 'all' && item.status !== activeTab) {
        return false;
      }
      
      // Filter by category
      if (categoryFilter && item.category !== categoryFilter) {
        return false;
      }
      
      // Filter by priority
      if (priorityFilter && item.priority !== priorityFilter) {
        return false;
      }
      
      return true;
    });
  };

  const filteredItems = getFilteredItems();
  
  // Get category badge color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'design':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'content':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'accessibility':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'performance':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="ml-2">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 border-amber-200">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="ml-2">Low</Badge>;
      default:
        return null;
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="workloop-container animate-fade-in">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold">Feedback</h1>
            
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
              <Filter size={16} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
          
          <div className="mb-6">
            <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="all" className="gap-2">
                    <MessageSquare size={16} />
                    All
                  </TabsTrigger>
                  <TabsTrigger value="open" className="gap-2">
                    <ChevronDown size={16} className="text-amber-500" />
                    Open
                  </TabsTrigger>
                  <TabsTrigger value="in-progress" className="gap-2">
                    <Star size={16} className="text-blue-500" />
                    In Progress
                  </TabsTrigger>
                  <TabsTrigger value="resolved" className="gap-2">
                    <Check size={16} className="text-green-500" />
                    Resolved
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>
          
          {showFilters && (
            <div className="mb-6 bg-secondary p-4 rounded-lg animate-fade-in">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder="Search in feedback..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="md:w-48">
                  <Select value={categoryFilter || ''} onValueChange={value => setCategoryFilter(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="content">Content</SelectItem>
                      <SelectItem value="accessibility">Accessibility</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:w-48">
                  <Select value={priorityFilter || ''} onValueChange={value => setPriorityFilter(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Priorities</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4 mb-8">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-secondary/30 rounded-lg">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No feedback found</h3>
                <p className="text-muted-foreground">Try changing your search or filters</p>
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <div 
                  key={item.id}
                  className={cn(
                    "border rounded-lg p-4 bg-card hover:shadow-md transition-all animate-fade-in",
                    item.status === 'resolved' && "bg-secondary/30 hover:bg-secondary/50"
                  )}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="font-medium">
                      {item.fileName}
                      {getPriorityBadge(item.priority)}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={cn(
                        getCategoryColor(item.category)
                      )}>
                        {item.category}
                      </Badge>
                      
                      <Badge variant={item.status === 'resolved' ? 'secondary' : 'outline'}>
                        {item.status === 'open' && <ChevronDown size={14} className="mr-1 text-amber-500" />}
                        {item.status === 'in-progress' && <Star size={14} className="mr-1 text-blue-500" />}
                        {item.status === 'resolved' && <Check size={14} className="mr-1 text-green-500" />}
                        {item.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{item.message}</p>
                  
                  <div className="flex flex-wrap justify-between items-center text-xs text-muted-foreground">
                    <div>
                      By {item.author === 'WorkLoop AI' ? (
                        <span className="font-medium text-workloop-purple flex items-center gap-1">
                          <Star size={12} /> WorkLoop AI
                        </span>
                      ) : item.author}
                    </div>
                    
                    <div>{formatDate(item.createdAt)}</div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t flex justify-end gap-2">
                    {item.status !== 'resolved' ? (
                      <>
                        <Button variant="outline" size="sm">Respond</Button>
                        <Button variant="secondary" size="sm" className="gap-1">
                          <Check size={14} />
                          Mark as Resolved
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="sm" className="gap-1">
                        <X size={14} />
                        Reopen
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Feedback;
