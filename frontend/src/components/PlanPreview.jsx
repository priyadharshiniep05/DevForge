import React from 'react';
import { Target, Layers, Box, Terminal } from 'lucide-react';

export default function PlanPreview({ plan, onApprove, onReject }) {
  if (!plan) return null;

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl mb-6 animate-in fade-in zoom-in-95 duration-300">
      <h3 className="text-xl font-bold text-slate-100 flex items-center mb-6">
        <Target className="mr-2 text-indigo-400" /> Project Plan: {plan.project_name}
      </h3>
      
      <p className="text-slate-300 mb-6 italic border-l-4 border-indigo-500 pl-4 py-1 bg-slate-900/50">
        "{plan.description}"
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <h4 className="flex items-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4 mr-2" /> Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(plan.tech_stack || {}).map(([layer, tech]) => (
                <span key={layer} className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs font-medium text-indigo-300">
                  <span className="text-slate-500 mr-1">{layer}:</span> {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="flex items-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <Terminal className="w-4 h-4 mr-2" /> Architecture & Entry
            </h4>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 text-sm">
              <div className="mb-1"><span className="text-slate-500">Style:</span> <span className="text-slate-200">{plan.architecture_style}</span></div>
              <div><span className="text-slate-500">Entry:</span> <span className="text-slate-200 font-mono text-xs">{plan.entry_point}</span></div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="flex items-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <Box className="w-4 h-4 mr-2" /> Key Features
          </h4>
          <ul className="space-y-2 bg-slate-900 p-4 rounded-lg border border-slate-700">
            {plan.features?.map((feat, i) => (
              <li key={i} className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-sm text-slate-300">{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {plan.notes && (
        <div className="mb-6 bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg">
          <h4 className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">Architectural Notes</h4>
          <p className="text-sm text-amber-200/80">{plan.notes}</p>
        </div>
      )}

      {onApprove && (
        <div className="flex justify-end space-x-4 border-t border-slate-700 pt-6">
          <button 
            onClick={onReject}
            className="px-6 py-2.5 rounded-lg font-medium text-slate-300 border border-slate-600 hover:bg-slate-700 transition-colors"
          >
            Modify Plan
          </button>
          <button 
            onClick={onApprove}
            className="px-6 py-2.5 rounded-lg font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-all"
          >
            Approve & Continue
          </button>
        </div>
      )}
    </div>
  );
}
