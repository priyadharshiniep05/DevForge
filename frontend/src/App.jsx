import React, { useState } from 'react';
import axios from 'axios';
import InputPanel from './components/InputPanel';
import PipelineProgress from './components/PipelineProgress';
import PlanPreview from './components/PlanPreview';
import ArchitectureViewer from './components/ArchitectureViewer';
import CodePreview from './components/CodePreview';
import ReviewReport from './components/ReviewReport';

const API_BASE = 'http://127.0.0.1:8000/api';

function App() {
  const [stage, setStage] = useState('idle'); // idle -> plan -> architect -> code -> review -> package -> done
  const [promptData, setPromptData] = useState(null);
  
  const [plan, setPlan] = useState(null);
  const [architecture, setArchitecture] = useState(null);
  const [generatedFiles, setGeneratedFiles] = useState([]);
  const [review, setReview] = useState(null);
  const [coderProgress, setCoderProgress] = useState("");

  const handleStart = async (data) => {
    setPromptData(data);
    setPlan(null);
    setArchitecture(null);
    setGeneratedFiles([]);
    setReview(null);
    setStage('plan');

    try {
      const res = await axios.post(`${API_BASE}/plan`, data);
      setPlan(res.data);
      // Wait for user approval before next step
    } catch (err) {
      const detail = err.response?.data?.detail || err.message;
      alert("Error generating plan: " + detail);
      setStage('idle');
    }
  };

  const handleApprovePlan = async () => {
    setStage('architect');
    try {
      const res = await axios.post(`${API_BASE}/architect`, { project_plan: plan });
      setArchitecture(res.data);
      handleGenerateCode(res.data);
    } catch (err) {
      console.error(err);
      alert("Error generating architecture: " + err.message);
      setStage('idle');
    }
  };

  const handleGenerateCode = async (archData) => {
    setStage('code');
    const filesToGenerate = archData.files || [];
    let generated = [];

    for (let i = 0; i < filesToGenerate.length; i++) {
       const fileInfo = filesToGenerate[i];
       setCoderProgress(`File ${i+1}/${filesToGenerate.length}: ${fileInfo.path}`);
       
       try {
         const res = await axios.post(`${API_BASE}/code`, {
           project_name: plan.project_name,
           tech_stack: plan.tech_stack,
           file: fileInfo,
           architect_notes: archData.notes || "",
           previously_generated_files: generated
         });
         
         generated.push(res.data);
         setGeneratedFiles([...generated]);
       } catch (err) {
         console.error(`Error generating ${fileInfo.path}:`, err);
       }
    }

    setCoderProgress("All files generated");
    handleReview(archData, generated);
  };

  const handleReview = async (archData, filesData) => {
    setStage('review');
    try {
        const res = await axios.post(`${API_BASE}/review`, {
            project_plan: plan,
            architecture: archData,
            generated_files: filesData
        });
        setReview(res.data);
        setStage('done');
    } catch (err) {
        console.error("Error during review:", err);
        setStage('done');
    }
  };

  const handleDownload = () => {
     window.location.href = `${API_BASE}/package/${plan.project_name}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30 relative">
      <div className="absolute inset-0 bg-[#0f172a] opacity-50 pointer-events-none mix-blend-overlay"></div>
      
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">D</div>
              <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-sm">DevForge</h1>
              <span className="ml-4 text-xs font-semibold px-2 py-1 bg-slate-800 text-slate-400 rounded-full border border-slate-700">Multi-Agent System</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          <div className="xl:col-span-4 space-y-6">
            <InputPanel onSubmit={handleStart} isProcessing={stage !== 'idle' && stage !== 'done'} />
            <PipelineProgress stage={stage} coderProgress={coderProgress} />
          </div>

          <div className="xl:col-span-8 space-y-6">
             {!plan && stage === 'idle' && (
               <div className="h-full flex flex-col items-center justify-center text-slate-500 bg-slate-900/30 border border-slate-800/50 rounded-xl p-12 text-center min-h-[400px]">
                 <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                 </div>
                 <h2 className="text-xl font-medium text-slate-300 mb-2">Awaiting Project Request</h2>
                 <p className="max-w-md">Enter your project description on the left to activate the Multi-Agent team. Planner Agent will analyze requirements and draft an initial structure.</p>
               </div>
             )}

             {plan && (
               <div className="space-y-6">
                 <PlanPreview 
                   plan={plan} 
                   onApprove={stage === 'plan' ? handleApprovePlan : null}
                   onReject={stage === 'plan' ? () => setStage('idle') : null}
                 />
                 
                 {architecture && (
                   <ArchitectureViewer architecture={architecture} />
                 )}

                 {generatedFiles.length > 0 && (
                   <CodePreview files={generatedFiles} />
                 )}

                 {review && (
                   <ReviewReport 
                     report={review} 
                     project_name={plan?.project_name} 
                     onDownload={handleDownload} 
                   />
                 )}
               </div>
             )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
