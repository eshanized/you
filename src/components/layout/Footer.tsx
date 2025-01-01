import { DeveloperInfo } from './DeveloperInfo';

export function Footer() {
  return (
    <footer className="glass border-t border-slate-700/50 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <DeveloperInfo />
          {/* <div className="flex gap-4 text-slate-400">
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}