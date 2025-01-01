import React from 'react';
import { Filter, Search } from 'lucide-react';

interface RepositoryFiltersProps {
  onSortChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  languages: string[];
  searchTerm: string;
}

export function RepositoryFilters({
  onSortChange,
  onLanguageChange,
  onSearchChange,
  languages,
  searchTerm
}: RepositoryFiltersProps) {
  return (
    <div className="glass-card p-4 mb-6 flex flex-col sm:flex-row gap-4">
      <div className="flex-1 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search repositories..."
          className="glass-input w-full pl-10"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
      </div>
      
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-indigo-400" />
          <select
            onChange={(e) => onSortChange(e.target.value)}
            className="glass-input py-1.5"
          >
            <option value="updated">Recently Updated</option>
            <option value="stars">Most Stars</option>
            <option value="forks">Most Forks</option>
            <option value="size">Largest Size</option>
          </select>
        </div>

        <select
          onChange={(e) => onLanguageChange(e.target.value)}
          className="glass-input py-1.5"
        >
          <option value="">All Languages</option>
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
    </div>
  );
}