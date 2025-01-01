import React from 'react';
import { Github, Twitter, Globe } from 'lucide-react';

export function DeveloperInfo() {
  return (
    <div className="flex items-center gap-4">
      <span className="text-slate-400">Created by</span>
      <div className="flex gap-2">
        <a
          href="https://github.com/eshanized"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-300 hover:text-indigo-400 transition-colors"
          title="GitHub"
        >
          <Github size={16} />
        </a>
        <a
          href="https://twitter.com/eshanized"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-300 hover:text-indigo-400 transition-colors"
          title="Twitter"
        >
          <Twitter size={16} />
        </a>
        <a
          href="https://eshanized.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-300 hover:text-indigo-400 transition-colors"
          title="Website"
        >
          <Globe size={16} />
        </a>
      </div>
    </div>
  );
}