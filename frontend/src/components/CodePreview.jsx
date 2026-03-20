import React, { useState, useEffect } from 'react';
import { Code2, TerminalSquare } from 'lucide-react';

export default function CodePreview({ files }) {
  if (!files || files.length === 0) return null;
  const [activeTab, setActiveTab] = useState(0);

  // Automatically switch to the newest file tab when files update
  useEffect(() => {
    setActiveTab(files.length - 1);
  }, [files.length]);

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-xl mb-6 overflow-hidden flex flex-col h-[600px] animate-in fade-in zoom-in-95 duration-300">
      <div className="p-4 border-b border-slate-700 flex items-center justify-between shrink-0 bg-slate-800/80 backdrop-blur-sm z-10">
        <h3 className="text-lg font-bold text-slate-100 flex items-center">
          <Code2 className="mr-2 text-cyan-400" /> Code Generation 
          <span className="ml-3 text-xs font-mono bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded-full border border-cyan-500/20">
            {files.length} file{files.length !== 1 ? 's' : ''} generated
          </span>
        </h3>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Tabs */}
        <div className="w-64 bg-slate-900 border-r border-slate-700 overflow-y-auto shrink-0">
          <div className="p-2 space-y-1">
            {files.map((file, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-mono truncate transition-colors ${
                  activeTab === idx 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
                }`}
                title={file.path}
              >
                {file.path}
              </button>
            ))}
          </div>
        </div>
        
        {/* Editor View */}
        <div className="flex-1 bg-slate-950 overflow-auto relative">
          {files[activeTab] ? (
            <pre className="p-4 text-sm font-mono text-slate-300">
              <code>{files[activeTab].content}</code>
            </pre>
          ) : (
             <div className="flex items-center justify-center h-full text-slate-600">
               <TerminalSquare className="w-12 h-12 mr-3 opacity-20" />
               <span className="font-medium text-lg opacity-50">Waiting for code generation...</span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
