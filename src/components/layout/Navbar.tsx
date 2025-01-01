import { Github } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="glass border-b border-slate-700/50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Github className="h-6 w-6 text-indigo-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              GitHubStats | eshanized
            </span>
          </div>
          <a
            href="https://github.com/eshanized/you"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass"
          >
            Visit GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}