import React from 'react';
import { Filter, Search } from 'lucide-react';

interface RepositoryFiltersProps {
  onSortChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  languages: string[];
  searchTerm: string;
  onClearFilters: () => void;  // Optional clear filter functionality
}

export function RepositoryFilters({
  onSortChange,
  onLanguageChange,
  onSearchChange,
  languages,
  searchTerm,
  onClearFilters
}: RepositoryFiltersProps) {
  return (
    <div className="glass-card p-6 mb-8 flex flex-col sm:flex-row gap-6">
      {/* Search Filter */}
      <div className="flex-1 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search repositories..."
          className="glass-input w-full pl-10 py-2.5 text-sm"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
      </div>

      {/* Sorting and Language Filters */}
      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-3">
          <Filter size={18} className="text-indigo-400" />
          <select
            onChange={(e) => onSortChange(e.target.value)}
            className="glass-input py-2.5 text-sm w-40"
          >
            <option value="updated">Recently Updated</option>
            <option value="stars">Most Stars</option>
            <option value="forks">Most Forks</option>
            <option value="size">Largest Size</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="language-select" className="text-slate-400 text-sm">Language</label>
          <select
            onChange={(e) => onLanguageChange(e.target.value)}
            className="glass-input py-2.5 text-sm w-40"
            id="language-select"
          >
            <option value="">All Languages</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Optional Clear Filters Button */}
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="text-indigo-500 hover:text-indigo-400 transition-colors text-sm font-medium"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
