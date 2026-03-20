import React from 'react';
import { AlertTriangle, CheckCircle, Info, Download, Play, Terminal } from 'lucide-react';

export default function ReviewReport({ report, project_name, onDownload, onAutofix }) {
  if (!report) return null;

  const isPass = report.overall_status === 'pass';
  const isWarn = report.overall_status === 'pass_with_warnings';
  const isFail = report.overall_status === 'fail';

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl mb-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
        <h3 className="text-xl font-bold text-slate-100 flex items-center">
          Review Report
        </h3>
        <div className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase shadow-sm ${
          isPass ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' :
          isWarn ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' :
          'bg-rose-500/20 text-rose-400 border border-rose-500/50'
        }`}>
          {report.overall_status ? report.overall_status.replace(/_/g, ' ') : 'UNKNOWN'}
        </div>
      </div>

      <p className="text-slate-300 mb-6 text-lg">
        {report.summary}
      </p>

      {/* Issues Table */}
      {report.issues?.length > 0 && (
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Detected Issues</h4>
          <div className="space-y-3">
            {report.issues.map((issue, idx) => (
              <div key={idx} className={`p-4 rounded-lg border flex items-start ${
                issue.severity === 'error' ? 'bg-rose-950/30 border-rose-900/50' : 
                issue.severity === 'warning' ? 'bg-amber-950/30 border-amber-900/50' : 
                'bg-slate-900/50 border-slate-700'
              }`}>
                <div className="mr-3 mt-0.5">
                  {issue.severity === 'error' ? <AlertTriangle className="w-5 h-5 text-rose-500" /> :
                   issue.severity === 'warning' ? <AlertTriangle className="w-5 h-5 text-amber-500" /> :
                   <Info className="w-5 h-5 text-blue-400" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm font-semibold text-slate-200">{issue.file} <span className="text-slate-500 font-normal">Line {issue.line}</span></span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                      issue.severity === 'error' ? 'bg-rose-500/20 text-rose-400' : 
                      issue.severity === 'warning' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>{issue.severity}</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-2">{issue.description}</p>
                  <div className="bg-black/40 p-2 rounded text-xs font-mono text-slate-400">
                    <span className="text-slate-500 select-none">Fix suggestion: </span>{issue.fix}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output Actions */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Project Delivery & Access</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => window.open(`http://127.0.0.1:8000/projects/${project_name}/`, '_blank')}
            className="flex items-center justify-center space-x-2 w-full py-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] cursor-pointer"
          >
            <Play className="w-5 h-5" />
            <span>Live Web Preview</span>
          </button>

          <button 
            onClick={onDownload}
            className="flex items-center justify-center space-x-2 w-full py-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>Download ZIP</span>
          </button>
          
          <button 
            onClick={() => {
              if (report.docker_run_command) {
                navigator.clipboard.writeText(report.docker_run_command);
                alert('Docker command copied to clipboard!');
              }
            }}
            className="flex items-center justify-center space-x-2 w-full py-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-600 transition-all cursor-pointer"
          >
            <Terminal className="w-5 h-5 text-blue-400" />
            <span>Copy Docker Run Cmd</span>
          </button>
        </div>

        {report.auto_fixable?.length > 0 && onAutofix && (
          <div className="mt-4 pt-4 border-t border-slate-800 flex justify-end">
            <button 
              onClick={onAutofix}
              className="text-sm text-amber-400 hover:text-amber-300 font-medium flex items-center cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 mr-1"/> Apply {report.auto_fixable.length} Auto-Fixes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
