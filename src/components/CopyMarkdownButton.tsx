import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/markdown';

interface CopyMarkdownButtonProps {
  getMarkdown: () => string;
}

export function CopyMarkdownButton({ getMarkdown }: CopyMarkdownButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(getMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="glass p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
      title="Copy as Markdown"
    >
      {copied ? (
        <Check size={16} className="text-green-400" />
      ) : (
        <Copy size={16} className="text-indigo-400" />
      )}
    </button>
  );
}