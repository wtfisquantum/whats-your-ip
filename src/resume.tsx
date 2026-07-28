import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Loader2, 
  Globe, 
  Mail, 
  Link, 
  ArrowUpRight,
  Terminal,
  MapPin,
  Calendar,
  Briefcase
} from 'lucide-react';

const mockParsedData = {
  name: "Alexey Kuznetsov",
  title: "Senior Systems Engineer",
  bio: "Specializing in high-performance distributed systems and minimalist user interfaces. Passionate about zero-latency architectures and uncompromising design standards.",
  location: "Berlin, Germany (Remote)",
  email: "alexey.k@example.com",
  github: "github.com/alexeyk",
  skills: ["React", "TypeScript", "Node.js", "Go", "PostgreSQL", "Kafka", "AWS", "System Architecture", "Tailwind CSS"],
  experience: [
    { 
      id: 1, 
      role: "Lead Engineer", 
      company: "Stark Global", 
      date: "2022 - Present", 
      description: "Led a team of 8 engineers to rebuild the core telemetry pipeline, reducing edge latency by 45%. Implemented strict monolithic UI standards across all internal dashboards." 
    },
    { 
      id: 2, 
      role: "Software Engineer II", 
      company: "Acme Network Ops", 
      date: "2019 - 2022", 
      description: "Developed scalable microservices using Go and gRPC. Managed multi-region database replication and failover protocols." 
    },
    { 
      id: 3, 
      role: "Frontend Developer", 
      company: "Nexus UI", 
      date: "2017 - 2019", 
      description: "Built flat, minimalist component libraries used by over 40 enterprise clients. Eliminated drop shadows completely from the corporate design language." 
    }
  ],
  education: [
     { id: 1, degree: "M.S. Computer Science", school: "Technical University of Berlin", date: "2015 - 2017" },
     { id: 2, degree: "B.S. Software Engineering", school: "State University", date: "2011 - 2015" }
  ]
};

const SectionHeader = ({ children }) => (
    <h3 className="text-sm font-bold text-zinc-800 uppercase tracking-[0.15em]">{children}</h3>
);

const DataLabel = ({ children }) => (
    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{children}</h4>
);

const FlatBadge = ({ text, dark = false }) => {
  const colors = dark ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600';
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider ${colors}`}>
      {text}
    </span>
  );
};

const LeftPanel = ({ appState, setAppState, setPortfolioData }) => {
  const [progressSteps, setProgressSteps] = useState([]);

  const handleUpload = () => {
    setAppState('processing');
    
    // Simulate parsing steps
    const steps = [
      "Extracting text streams...",
      "Identifying entity relations (Experience, Skills)...",
      "Structuring data payload...",
      "Generating minimalist layout..."
    ];

    let currentStep = 0;
    setProgressSteps([{ text: steps[0], status: 'loading' }]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setProgressSteps(prev => {
          const updated = [...prev];
          updated[updated.length - 1].status = 'done';
          updated.push({ text: steps[currentStep], status: 'loading' });
          return updated;
        });
      } else {
        clearInterval(interval);
        setProgressSteps(prev => {
          const updated = [...prev];
          updated[updated.length - 1].status = 'done';
          return updated;
        });
        setTimeout(() => {
          setPortfolioData(mockParsedData);
          setAppState('completed');
        }, 500);
      }
    }, 800);
  };

  return (
    <div className="w-full lg:w-[480px] bg-white h-full border-r border-zinc-200 flex flex-col overflow-y-auto custom-scrollbar shrink-0 overflow-x-hidden">
      <div className="px-8 py-10 flex-1 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center rounded-sm">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight uppercase">PORTFOLIO.GEN</h1>
        </div>

        {/* Upload State */}
        {appState === 'idle' && (
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-8">
              <DataLabel>Input Source</DataLabel>
              <h2 className="text-3xl font-bold text-zinc-900 tracking-tight mt-2 leading-none">
                Upload Resume
              </h2>
              <p className="text-base font-medium text-zinc-500 mt-4 leading-relaxed">
                Provide a PDF or DOCX file. Our engine will parse the raw data and compile a strictly flat, minimalist portfolio interface.
              </p>
            </div>

            <button 
              onClick={handleUpload}
              className="w-full border border-dashed border-zinc-300 hover:border-zinc-900 bg-zinc-50 hover:bg-zinc-100 transition-colors h-48 flex flex-col items-center justify-center rounded-sm group cursor-pointer"
            >
              <Upload className="w-8 h-8 text-zinc-400 group-hover:text-zinc-900 transition-colors mb-4" />
              <span className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Select Document</span>
              <span className="text-xs font-medium text-zinc-500 mt-2">Max file size: 5MB</span>
            </button>
          </div>
        )}

        {/* Processing State */}
        {appState === 'processing' && (
          <div className="flex-1 flex flex-col justify-center">
             <div className="mb-12">
              <DataLabel>System Status</DataLabel>
              <div className="flex items-center gap-4 mt-2 mb-3">
                 <div className="w-4 h-4 rounded-sm bg-amber-500 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
                 <h2 className="text-3xl font-bold text-zinc-900 tracking-tight uppercase">
                  Parsing Document
                </h2>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {progressSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  {step.status === 'loading' ? (
                    <Loader2 className="w-5 h-5 text-zinc-900 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  )}
                  <span className={`text-sm font-bold uppercase tracking-widest ${step.status === 'loading' ? 'text-zinc-900' : 'text-zinc-500'}`}>
                    {step.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed State */}
        {appState === 'completed' && (
          <div className="flex flex-col h-full">
            <div className="mb-12">
              <DataLabel>Status</DataLabel>
              <div className="flex items-center gap-4 mt-2 mb-3">
                 <div className="w-4 h-4 rounded-sm bg-emerald-500" />
                 <h2 className="text-3xl font-bold text-zinc-900 tracking-tight uppercase">
                  Compilation Ready
                </h2>
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-8 mb-8">
               <SectionHeader>Extraction Summary</SectionHeader>
               <div className="grid grid-cols-2 gap-y-6 gap-x-4 mt-6">
                  <div>
                      <DataLabel>Identified Roles</DataLabel>
                      <div className="text-2xl font-bold text-zinc-900 mt-1">3</div>
                  </div>
                  <div>
                      <DataLabel>Skills Parsed</DataLabel>
                      <div className="text-2xl font-bold text-zinc-900 mt-1">9</div>
                  </div>
               </div>
            </div>

            <div className="mt-auto flex flex-col gap-4">
               <button className="w-full bg-zinc-900 text-white px-4 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2">
                 <Globe className="w-4 h-4" />
                 Deploy Portfolio
               </button>
               <button 
                  onClick={() => { setAppState('idle'); setPortfolioData(null); }}
                  className="w-full bg-white border border-zinc-200 px-4 py-4 rounded-sm text-sm font-bold text-zinc-900 uppercase tracking-widest hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
                >
                 Start Over
               </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

const PortfolioPreview = ({ data }) => {
  if (!data) {
    return (
      <div className="flex-1 bg-zinc-50 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-dashed border-zinc-300 rounded-sm mx-auto mb-4 flex items-center justify-center">
            <FileText className="w-6 h-6 text-zinc-300" />
          </div>
          <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Awaiting Data Input</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-zinc-50 h-full overflow-y-auto custom-scrollbar">
      
      {/* Search Bar / Browser Header Mockup */}
      <div className="flex items-center w-full border-b border-zinc-200 bg-white px-8 h-20 shrink-0 sticky top-0 z-10">
        <Globe className="w-5 h-5 text-zinc-400 mr-4" />
        <span className="flex-1 bg-transparent text-sm font-medium text-zinc-400">
          portfolio.gen / preview / {data.name.toLowerCase().replace(' ', '-')}
        </span>
        <FlatBadge text="Live Preview" dark />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-16 py-16">
        
        {/* Hero Section */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 tracking-tight leading-none mb-6">
            {data.name}
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-zinc-500 tracking-tight mb-8">
            {data.title}
          </h2>
          <p className="text-lg font-medium text-zinc-900 leading-relaxed max-w-2xl mb-8">
            {data.bio}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <span className="text-sm font-bold text-zinc-600 uppercase tracking-widest">{data.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-zinc-400" />
              <span className="text-sm font-bold text-zinc-600 uppercase tracking-widest">{data.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Link className="w-4 h-4 text-zinc-400" />
              <span className="text-sm font-bold text-zinc-600 uppercase tracking-widest">{data.github}</span>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <SectionHeader>Technical Arsenal</SectionHeader>
          <div className="mt-8 flex flex-wrap gap-3">
            {data.skills.map((skill, i) => (
              <FlatBadge key={i} text={skill} />
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-20">
          <SectionHeader>Professional Experience</SectionHeader>
          <div className="mt-8 flex flex-col border border-zinc-200 rounded-sm bg-white overflow-hidden">
            {data.experience.map((job, i) => (
              <div key={job.id} className="p-8 border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-zinc-900 tracking-tight">{job.role}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Briefcase className="w-4 h-4 text-zinc-400" />
                      <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{job.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start bg-zinc-100 px-3 py-1.5 rounded-sm">
                    <Calendar className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">{job.date}</span>
                  </div>
                </div>
                <p className="text-base font-medium text-zinc-700 leading-relaxed max-w-3xl">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-10">
          <SectionHeader>Academic Background</SectionHeader>
          <div className="mt-8 flex flex-col gap-6">
            {data.education.map((edu, i) => (
              <div key={edu.id} className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-zinc-200 last:border-0">
                <div>
                  <h4 className="text-base font-bold text-zinc-900">{edu.degree}</h4>
                  <span className="text-sm font-medium text-zinc-500">{edu.school}</span>
                </div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-2 md:mt-0">{edu.date}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const [appState, setAppState] = useState('idle'); // idle, processing, completed
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap');
      
      body {
        font-family: 'Rubik', sans-serif;
        background-color: #ffffff;
        color: #18181b;
      }

      /* Minimalist Thin Scrollbar */
      .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
      .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e4e4e7; border-radius: 0px; }
      .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: #d4d4d8; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-white overflow-hidden text-zinc-900">
      <LeftPanel 
        appState={appState} 
        setAppState={setAppState} 
        setPortfolioData={setPortfolioData} 
      />
      <PortfolioPreview 
        data={portfolioData} 
      />
    </div>
  );
}