import { Github, Twitter, Globe } from 'lucide-react';

export function DeveloperInfo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-white text-sm sm:text-base">Created by eshanized @</span>
      <div className="flex gap-3">
        <a
          href="https://github.com/eshanized"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-indigo-400 transition-transform transform hover:scale-110"
          aria-label="GitHub profile of eshanized"
          title="GitHub"
        >
          <Github size={18} />
        </a>
        <a
          href="https://twitter.com/eshanized"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-indigo-400 transition-transform transform hover:scale-110"
          aria-label="Twitter profile of eshanized"
          title="Twitter"
        >
          <Twitter size={18} />
        </a>
        <a
          href="https://eshanized.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-indigo-400 transition-transform transform hover:scale-110"
          aria-label="Website of eshanized"
          title="Website"
        >
          <Globe size={18} />
        </a>
      </div>
    </div>
  );
}
