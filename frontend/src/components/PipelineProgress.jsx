import React from 'react';
import { CheckCircle2, Clock, Circle, Loader2 } from 'lucide-react';

export default function PipelineProgress({ stage, coderProgress }) {
  const steps = [
    { id: 'idle', label: 'Idle', agent: null },
    { id: 'plan', label: 'Planning', agent: 'deepseek-r1:14b' },
    { id: 'architect', label: 'Architecting', agent: 'deepseek-coder-v2:16b' },
    { id: 'code', label: 'Coding', agent: 'qwen2.5-coder:14b', progressText: coderProgress },
    { id: 'review', label: 'Reviewing', agent: 'qwen2.5-coder:14b' },
    { id: 'package', label: 'Packaging', agent: 'system' }
  ];

  const getStepIndex = (st) => steps.findIndex(s => s.id === st);
  const currentIdx = getStepIndex(stage);

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl mb-6">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">Pipeline Progress</h3>
      <div className="space-y-4">
        {steps.map((step, idx) => {
          if (step.id === 'idle') return null; // hide idle from visual list
          
          let status = 'waiting';
          if (idx < currentIdx || currentIdx === -1) status = 'completed';
          if (idx === currentIdx) status = 'active';

          return (
            <div key={step.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800/50">
              <div className="flex items-center">
                <div className="mr-4">
                  {status === 'completed' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                  {status === 'active' && <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />}
                  {status === 'waiting' && <Circle className="w-6 h-6 text-slate-600" />}
                </div>
                <div>
                  <div className={`font-medium ${status === 'active' ? 'text-blue-400' : status === 'completed' ? 'text-slate-200' : 'text-slate-500'}`}>
                    {step.label}
                  </div>
                  {step.agent && (
                    <div className="text-xs text-slate-500 font-mono mt-0.5">Model: {step.agent}</div>
                  )}
                </div>
              </div>
              {status === 'active' && step.progressText && (
                <div className="text-sm font-medium text-blue-400 animate-pulse">
                  {step.progressText}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
