import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  FileText, 
  Image as ImageIcon, 
  FileCode, 
  File, 
  Calendar, 
  User, 
  X,
  Star,
  ArrowDownAZ,
  ArrowDown10
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Popover,
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

interface FilterOption {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface SortOption {
  id: string;
  label: string;
  icon: React.ElementType;
}

const fileTypeFilters: FilterOption[] = [
  { id: 'image', label: 'Images', icon: ImageIcon },
  { id: 'pdf', label: 'PDFs', icon: File },
  { id: 'text', label: 'Text', icon: FileText },
  { id: 'code', label: 'Code', icon: FileCode },
];

const dateFilters: FilterOption[] = [
  { id: 'today', label: 'Today', icon: Calendar },
  { id: 'week', label: 'This Week', icon: Calendar },
  { id: 'month', label: 'This Month', icon: Calendar },
];

const sortOptions: SortOption[] = [
  { id: 'updated', label: 'Last Updated', icon: Calendar },
  { id: 'name', label: 'Alphabetical', icon: ArrowDownAZ },
  { id: 'version', label: 'Version Number', icon: ArrowDown10 },
  { id: 'rating', label: 'Feedback Rating', icon: Star },
];

interface SearchFilterProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: string[]) => void;
  onSortChange?: (sort: string) => void;
  className?: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearch,
  onFilterChange,
  onSortChange,
  className,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>('updated');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => {
      const newFilters = prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId];
      
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const handleSortChange = (sortId: string) => {
    setSelectedSort(sortId);
    onSortChange?.(sortId);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    onFilterChange?.([]);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <SlidersHorizontal size={16} />
              {selectedFilters.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-workloop-purple text-white text-[10px] rounded-full flex items-center justify-center">
                  {selectedFilters.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">File Type</h4>
                  {selectedFilters.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters} 
                      className="h-6 px-2 text-xs"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {fileTypeFilters.map(filter => (
                    <Badge 
                      key={filter.id}
                      variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                      className="cursor-pointer flex items-center gap-1"
                      onClick={() => toggleFilter(filter.id)}
                    >
                      <filter.icon size={12} />
                      {filter.label}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Date</h4>
                <div className="flex flex-wrap gap-2">
                  {dateFilters.map(filter => (
                    <Badge 
                      key={filter.id}
                      variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                      className="cursor-pointer flex items-center gap-1"
                      onClick={() => toggleFilter(filter.id)}
                    >
                      <filter.icon size={12} />
                      {filter.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 whitespace-nowrap">
              {React.createElement(sortOptions.find(opt => opt.id === selectedSort)?.icon || Calendar, { size: 14 })}
              <span className="hidden sm:inline">Sort: </span>
              {sortOptions.find(opt => opt.id === selectedSort)?.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {sortOptions.map(sort => (
              <DropdownMenuItem
                key={sort.id}
                onClick={() => handleSortChange(sort.id)}
                className={cn(
                  "flex items-center gap-2",
                  selectedSort === sort.id && "bg-accent"
                )}
              >
                {React.createElement(sort.icon, { size: 16 })}
                {sort.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </form>
      
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedFilters.map(filterId => {
            const filter = [...fileTypeFilters, ...dateFilters].find(f => f.id === filterId);
            if (!filter) return null;
            
            return (
              <Badge 
                key={filterId}
                className="cursor-pointer pl-2 flex items-center gap-1 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={() => toggleFilter(filterId)}
              >
                {React.createElement(filter.icon, { size: 12 })}
                {filter.label}
                <X size={12} className="ml-1" />
              </Badge>
            );
          })}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters} 
            className="h-6 px-2 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
