import React, { useState } from 'react';
import { FolderTree, FileCode, CheckSquare, ChevronDown, ChevronRight, FileJson } from 'lucide-react';

export default function ArchitectureViewer({ architecture }) {
  if (!architecture) return null;
  const [expandedFiles, setExpandedFiles] = useState({});

  const toggleFile = (path) => {
    setExpandedFiles(prev => ({...prev, [path]: !prev[path]}));
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl mb-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <h3 className="text-xl font-bold text-slate-100 flex items-center mb-6">
        <FolderTree className="mr-2 text-emerald-400" /> System Architecture
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ASCII Tree */}
        <div className="col-span-1 bg-slate-900 rounded-lg border border-slate-700 p-4 overflow-x-auto max-h-[600px]">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Directory Structure</h4>
          <pre className="text-sm font-mono text-emerald-300 whitespace-pre">
            {architecture.directory_structure}
          </pre>
        </div>

        {/* Files List */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Files to Generate</h4>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {architecture.files?.map((file, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden shrink-0">
                <div 
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-800/50 transition-colors"
                  onClick={() => toggleFile(file.path)}
                >
                  <div className="flex items-center space-x-3">
                    <FileCode className="w-5 h-5 text-emerald-500" />
                    <div>
                      <div className="text-sm font-semibold text-slate-200">{file.path}</div>
                      <div className="text-xs text-slate-400">{file.description}</div>
                    </div>
                  </div>
                  {expandedFiles[file.path] ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                </div>
                
                {expandedFiles[file.path] && (
                  <div className="p-4 border-t border-slate-700 bg-slate-800/30 text-sm">
                    <div className="mb-2"><span className="text-slate-500 font-medium">Type:</span> <span className="bg-slate-700 px-2 py-0.5 rounded text-xs ml-1">{file.type}</span></div>
                    <div className="mb-2"><span className="text-slate-500 font-medium">Boilerplate:</span> <span className="text-slate-300 font-mono text-xs ml-1">{file.boilerplate_style}</span></div>
                    <div className="mb-2"><span className="text-slate-500 font-medium">Depends On:</span> <span className="text-slate-300 ml-1">{file.depends_on?.length ? file.depends_on.join(', ') : 'None'}</span></div>
                    <div className="mt-3 text-slate-300 p-3 bg-slate-900 rounded border border-slate-700/50">
                      <div className="flex items-center text-xs font-medium text-slate-400 mb-1"><CheckSquare className="w-3 h-3 mr-1"/> Task Guidelines</div>
                      {file.task}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {architecture.config_files?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Config Files</h4>
              <div className="space-y-3">
                {architecture.config_files.map((cf, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-700 rounded-lg p-3">
                     <div className="flex items-center space-x-2 mb-2">
                       <FileJson className="w-4 h-4 text-amber-500" />
                       <span className="text-sm font-semibold text-slate-200">{cf.path}</span>
                     </div>
                     <pre className="text-xs font-mono text-slate-300 bg-slate-800 p-2 rounded overflow-x-auto">
                       {cf.content}
                     </pre>
                  </div>
                ))}
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
