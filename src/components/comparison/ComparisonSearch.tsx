import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface ComparisonSearchProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export function ComparisonSearch({ onSearch, isLoading, disabled }: ComparisonSearchProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
      setUsername('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username to compare..."
          className="glass-input w-full pl-12 pr-32"
          disabled={isLoading || disabled}
        />
        <Search className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
        <button
          type="submit"
          disabled={isLoading || disabled || !username.trim()}
          className="btn-primary absolute right-2 top-2"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding...
            </span>
          ) : (
            'Add User'
          )}
        </button>
      </div>
    </form>
  );
}