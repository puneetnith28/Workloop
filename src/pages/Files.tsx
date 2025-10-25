import React, { useState, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Upload, Search, Filter } from 'lucide-react';
import { FileList, SearchFilter } from '@/components/dashboard';
import { mockFiles as defaultMockFiles } from '@/components/dashboard/FileList';
import { useToast } from '@/hooks/use-toast';

const Files = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    console.log('Searching for:', query);
  };

  const handleFilterChange = (filters: string[]) => {
    console.log('Active filters:', filters);
  };

  const handleSortChange = (sort: string) => {
    console.log('Sort by:', sort);
  };

  // Explicit handler for the onFilter prop 
  // to match the expected SearchFilter component props
  const handleFilter = () => {
    console.log('Filter button clicked');
  };

  // Local front-end-only file state so buttons appear to work
  type LocalFile = {
    id: string;
    name: string;
    type: 'pdf' | 'image' | 'text' | 'code';
    version: string | number;
    changeSummary: string;
    author: string;
    updatedAt: string | Date;
    feedbackRating?: number;
  };

  const [files, setFiles] = useState<LocalFile[]>(() => defaultMockFiles as unknown as LocalFile[]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const createFolder = async () => {
    const name = window.prompt('Folder name');
    if (!name) return;
    const newFolder = {
      id: `folder-${Date.now()}`,
      name,
      type: 'text' as const,
      version: '1.0',
      changeSummary: 'New folder created',
      author: 'You',
      updatedAt: new Date().toISOString(),
    };
    setFiles((prev) => [newFolder, ...prev]);
    toast({ title: 'Folder created', description: `"${name}" was created.` });
  };

  const onUploadButton = () => {
    fileInputRef.current?.click();
  };

  const handleFilesSelected: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;
  const added: LocalFile[] = [];
    Array.from(selected).forEach((f, i) => {
      const ext = f.name.split('.').pop()?.toLowerCase() || '';
      let type: 'image' | 'pdf' | 'text' | 'code' = 'text';
      if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(ext)) type = 'image';
      else if (ext === 'pdf') type = 'pdf';
      else if (['js','ts','jsx','tsx','py','java','c','cpp'].includes(ext)) type = 'code';

      added.push({
        id: `u-${Date.now()}-${i}`,
        name: f.name,
        type,
        version: '1.0',
        changeSummary: 'Uploaded file',
        author: 'You',
        updatedAt: new Date().toISOString(),
        feedbackRating: undefined,
      });
    });

    setFiles((prev) => [...added, ...prev]);
    toast({ title: 'Files uploaded', description: `${selected.length} file(s) added.` });
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Listen for frontend revert events dispatched by FileCard
  React.useEffect(() => {
    const onRevert = (e: Event) => {
      const custom = e as CustomEvent<{ id: string }>;
      const fileId = custom?.detail?.id;
      if (!fileId) return;
      setFiles((prev) => {
        const found = prev.find((f) => f.id === fileId);
        if (!found) return prev;
        // create a new 'reverted' version entry
        const currentVer = Number(String(found.version)) || 1;
        const newVer = +(Math.round((currentVer + 0.1) * 10) / 10).toFixed(1);
        const newItem: LocalFile = {
          ...found,
          id: `rev-${Date.now()}`,
          version: String(newVer),
          changeSummary: 'Reverted to previous version',
          updatedAt: new Date().toISOString(),
          author: 'You',
        };
        toast({ title: 'Reverted', description: `${found.name} was reverted to v${newItem.version}` });
        return [newItem, ...prev];
      });
    };

    window.addEventListener('revert-file', onRevert as EventListener);
    return () => window.removeEventListener('revert-file', onRevert as EventListener);
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Navbar />
      
      <main className="flex-1">
        <div className="workloop-container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Files</h1>
              <p className="text-muted-foreground">
                Manage and organize your creative assets
              </p>
            </div>
            
            <div className="flex gap-2 self-end">
              <Button
                variant="outline"
                onClick={createFolder}
                className="gap-2 border-workloop-purple/30 hover:border-workloop-purple"
              >
                <PlusCircle size={16} />
                New Folder
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFilesSelected}
                className="hidden"
                aria-label="Upload files"
                title="Upload files"
              />

              <Button
                onClick={onUploadButton}
                className="gap-2 bg-gradient-purple hover:bg-workloop-dark-purple"
              >
                <Upload size={16} />
                Upload Files
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="all">All Files</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="shared">Shared with Me</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <SearchFilter 
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                className="mb-4"
              />
              
              <TabsContent value="all" className="mt-0">
                  <FileList files={files as unknown as typeof defaultMockFiles} />
              </TabsContent>
              
              <TabsContent value="recent" className="mt-0">
                <FileList files={[]} />
              </TabsContent>
              
              <TabsContent value="shared" className="mt-0">
                <FileList files={[]} />
              </TabsContent>
              
              <TabsContent value="favorites" className="mt-0">
                <FileList files={[]} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Files;
