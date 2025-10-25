
import React, { useState } from 'react';
import { PlusCircle, Upload, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SearchFilter } from '@/components/dashboard';
import { FileList } from '@/components/dashboard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('updated');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleUpload = () => {
    console.log('Upload file');
    // Handle file upload
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navbar />
      
      <main className="flex-1">
        <div className="workloop-container">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your files and view version history
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <Button
                onClick={handleUpload}
                className="gap-2 bg-gradient-purple hover:bg-workloop-dark-purple"
              >
                <Upload size={16} />
                Upload File
              </Button>
              
              <Button variant="outline" className="gap-2 border-workloop-purple/30 hover:border-workloop-purple">
                <PlusCircle size={16} />
                New Project
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-8 gap-6">
            <div className="md:col-span-6">
              <SearchFilter 
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                className="mb-6"
              />
              
              <FileList />
            </div>
            
            <div className="hidden md:block md:col-span-2">
              <div className="gradient-panel p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Storage</h3>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    Manage
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <HardDrive size={16} className="text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    2.4GB of 10GB used
                  </div>
                </div>
                
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="bg-gradient-purple h-full w-1/4 rounded-full" />
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="font-medium mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      className="text-sm p-3 rounded-md border bg-gradient-to-br from-white/80 to-secondary/30 dark:from-gray-900/80 dark:to-gray-800/30"
                    >
                      <p className="font-medium">File updated</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Landing Page Design was updated by Rajat Aggarawal
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        10 minutes ago
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer versionSummary="5 files updated in the last 24 hours" />
    </div>
  );
};

export default Index;
