import React from 'react';
import { GitHubUser } from '../types/github';
import { CopyMarkdownButton } from './CopyMarkdownButton';
import { generateUserProfileMarkdown } from '../utils/markdown';
import { 
  Users, 
  MapPin, 
  Building, 
  Link as LinkIcon, 
  Twitter, 
  Mail, 
  Calendar,
  BookOpen,
  GitFork
} from 'lucide-react';
import { format } from 'date-fns';

interface UserProfileProps {
  user: GitHubUser;
}

export function UserProfile({ user }: UserProfileProps) {
  const socialLinks = [
    user.twitter_username && {
      icon: <Twitter size={16} className="text-[#1DA1F2]" />,
      label: `@${user.twitter_username}`,
      url: `https://twitter.com/${user.twitter_username}`
    },
    user.blog && {
      icon: <LinkIcon size={16} className="text-indigo-400" />,
      label: user.blog.replace(/^https?:\/\//, ''),
      url: user.blog.startsWith('http') ? user.blog : `https://${user.blog}`
    },
    user.email && {
      icon: <Mail size={16} className="text-green-400" />,
      label: user.email,
      url: `mailto:${user.email}`
    }
  ].filter(Boolean);

  const stats = [
    {
      icon: <BookOpen className="text-purple-400" size={16} />,
      label: 'Repositories',
      value: user.public_repos
    },
    {
      icon: <Users className="text-blue-400" size={16} />,
      label: 'Followers',
      value: user.followers
    },
    {
      icon: <GitFork className="text-green-400" size={16} />,
      label: 'Following',
      value: user.following
    }
  ];

  return (
    <div className="glass-card p-8 max-w-2xl w-full hover-glow">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              className="w-32 h-32 rounded-full ring-4 ring-indigo-500/20 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass px-4 py-2 rounded-full text-sm hover:bg-slate-700/50 transition-colors flex items-center gap-2"
          >
            View Profile
          </a>
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
              <p className="text-slate-400">@{user.login}</p>
            </div>
            <CopyMarkdownButton getMarkdown={() => generateUserProfileMarkdown(user)} />
          </div>

          {user.bio && (
            <p className="text-slate-300 leading-relaxed">{user.bio}</p>
          )}

          <div className="space-y-3">
            {/* Location, Company, Join Date */}
            <div className="flex flex-wrap gap-4">
              {user.location && (
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <MapPin size={14} className="text-red-400" />
                  {user.location}
                </div>
              )}
              {user.company && (
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Building size={14} className="text-blue-400" />
                  {user.company}
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Calendar size={14} className="text-purple-400" />
                Joined {format(new Date(user.created_at), 'MMMM yyyy')}
              </div>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(link => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 hover:bg-slate-700/50 transition-colors"
                  >
                    {link.icon}
                    <span className="text-slate-300">{link.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map(({ icon, label, value }) => (
              <div key={label} className="glass p-3 rounded-lg text-center group hover:bg-slate-700/30 transition-colors">
                <div className="flex items-center justify-center gap-2 mb-1">
                  {icon}
                  <span className="text-lg font-semibold">{value}</span>
                </div>
                <div className="text-xs text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}