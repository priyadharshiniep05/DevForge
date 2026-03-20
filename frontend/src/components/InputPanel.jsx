import React, { useState } from 'react';
import { Rocket, Settings, ChevronDown, ChevronUp } from 'lucide-react';

export default function InputPanel({ onSubmit, isProcessing }) {
  const [prompt, setPrompt] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [techStack, setTechStack] = useState("");

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    onSubmit({ user_prompt: prompt, tech_stack_override: techStack });
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl mb-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      <h2 className="text-xl font-bold mb-4 flex items-center text-slate-100"><Rocket className="mr-2 text-blue-400" /> DevForge Orchestrator</h2>
      <textarea
        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-mono text-sm resize-y"
        rows="4"
        placeholder="Describe your project in plain English... (e.g. Build a REST API for a todo app with create, read, update, delete endpoints using FastAPI and SQLite.)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isProcessing}
      />
      
      <div className="mt-4">
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors"
        >
          <Settings className="w-4 h-4 mr-1" /> Advanced Settings
          {showSettings ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
        </button>
        
        {showSettings && (
          <div className="mt-3 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
             <div>
               <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Tech Stack Override</label>
               <input 
                 type="text" 
                 value={techStack}
                 onChange={(e)=>setTechStack(e.target.value)}
                 className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all" 
                 placeholder="e.g. Django, React, Postgres"
                 disabled={isProcessing}
               />
             </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!prompt.trim() || isProcessing}
          className={`flex items-center px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
            !prompt.trim() || isProcessing 
            ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:-translate-y-0.5'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center space-x-2">
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              <span>Processing...</span>
            </div>
          ) : (
            <>
              <Rocket className="w-5 h-5 mr-2" />
              Build Project
            </>
          )}
        </button>
      </div>
    </div>
  );
}
