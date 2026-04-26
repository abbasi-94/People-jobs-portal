import { CheckCircle, AlertCircle, Info, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';

// Toast
export function Toasts({ toasts }: { toasts: { id: number; msg: string; type: 'success' | 'error' | 'info' }[] }) {
  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      {toasts.map((t) => (
        <div key={t.id} className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-slide-in ${
          t.type === 'success' ? 'bg-green-600 text-white' : t.type === 'error' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
        }`}>
          {t.type === 'success' ? <CheckCircle className="w-4 h-4" /> : t.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
          {t.msg}
        </div>
      ))}
    </div>
  );
}

// Theme Toggle
export function ThemeToggle({ theme, toggle }: { theme: string; toggle: () => void }) {
  return (
    <button onClick={toggle} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Toggle theme">
      {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
}

// Pagination
export function Pagination({ page, total, perPage, onChange }: { page: number; total: number; perPage: number; onChange: (p: number) => void }) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button onClick={() => onChange(page - 1)} disabled={page <= 1} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"><ChevronLeft className="w-5 h-5" /></button>
      {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
        let p: number;
        if (pages <= 7) p = i + 1;
        else if (page <= 4) p = i + 1;
        else if (page >= pages - 3) p = pages - 6 + i;
        else p = page - 3 + i;
        return (
          <button key={p} onClick={() => onChange(p)} className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{p}</button>
        );
      })}
      <button onClick={() => onChange(page + 1)} disabled={page >= pages} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"><ChevronRight className="w-5 h-5" /></button>
    </div>
  );
}

// Salary format
export function formatSalary(min: number, max: number, currency: string, period: string): string {
  if (!min && !max) return 'Salary not disclosed';
  const c = currency || 'USD';
  if (min && max) return `${c} ${min.toLocaleString()} - ${max.toLocaleString()} ${period}`;
  if (min) return `From ${c} ${min.toLocaleString()} ${period}`;
  return `Up to ${c} ${max.toLocaleString()} ${period}`;
}

// Time ago
export function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return mins <= 1 ? 'Just now' : `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
