
import React, { useState } from 'react';

interface SidebarProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  return (
    <div className="w-full lg:w-96 glass-morphism h-full p-8 border-r flex flex-col gap-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
          S
        </div>
        <h1 className="text-2xl font-bold text-slate-800">SiteCraft AI</h1>
      </div>

      <p className="text-slate-500 text-sm">
        Describe your business or project, and we'll generate a complete website design, copy, and visuals.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            What are you building?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A luxury coffee brand called 'Bean & Soul' focusing on organic imports and sustainable packaging."
            className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 ${
            isLoading 
            ? 'bg-slate-400 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Architecting...
            </span>
          ) : (
            'Generate Website'
          )}
        </button>
      </form>

      <div className="mt-auto border-t pt-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Examples</h3>
        <div className="flex flex-col gap-2">
          {['Cybersecurity platform', 'Pet grooming service', 'Portfolio for a 3D artist'].map((ex) => (
            <button
              key={ex}
              onClick={() => setPrompt(ex)}
              className="text-left text-sm text-slate-600 hover:text-indigo-600 transition-colors"
            >
              • {ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
