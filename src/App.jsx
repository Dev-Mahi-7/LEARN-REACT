import { useState, useEffect } from "react";
import { projects } from "./const/navItems";
import {AnimatePresence, motion} from "framer-motion"


function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Handle browser back/forward navigation smoothly
  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  const currentProject = projects.find((project) => project.path === currentPath);

  if (currentProject) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {currentProject.component}
      </motion.div>
    );
  }

  // Animation variants for the Bento grid items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 font-sans selection:bg-rose-500 selection:text-white overflow-x-hidden relative flex items-center justify-center p-4 sm:p-8 lg:p-12">
      {/* Subtle Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 rounded-full bg-rose-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 rounded-full bg-neutral-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl w-full z-10">
        {/* Header Section */}
        <header className="mb-12 space-y-3 max-w-xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-md text-xs font-medium tracking-wider text-rose-400 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Curated Collection
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
          >
            Mini Projects
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed"
          >
            A sandbox of interactive interfaces, custom components, and refined digital experiments.
          </motion.p>
        </header>

        {/* Next-Level Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-[140px]"
        >
          <AnimatePresence>
            {projects.map((project, index) => {
              // Procedural asymmetric layouts for the bento grid vibe
              const isLarge = index % 5 === 0;
              const isMedium = index % 5 === 2 || index % 5 === 4;
              
              const colSpan = isLarge 
                ? "sm:col-span-6 lg:col-span-6 row-span-2" 
                : isMedium 
                ? "sm:col-span-3 lg:col-span-4 row-span-1" 
                : "sm:col-span-3 lg:col-span-2 row-span-1";

              return (
                <motion.button
                  key={project.path}
                  variants={itemVariants}
                  onClick={() => navigate(project.path)}
                  title={project.title}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={` ${colSpan} group cursor-pointer relative text-left flex flex-col justify-between p-6 rounded-2xl border border-white/6 bg-linear-to-b from-white/3 to-transparent backdrop-blur-md hover:border-rose-500/30 hover:from-white/5 hover:to-rose-950/3 transition-colors duration-300 shadow-2xl overflow-hidden`}

                >
                  {/* Hover Cardinal Glow Effect */}
                  <div className="absolute inset-0 bg-linear-to-tr from-rose-500/0 via-rose-500/0 to-rose-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 " />

                  {/* Top Row: Index / Icon placeholder */}
                  <div className="flex items-center justify-between w-full">
                    <span className="font-mono text-xs text-neutral-600 group-hover:text-rose-400/70 transition-colors duration-300">
                      // 0{index + 1}
                    </span>
                    <div className="w-7 h-7 rounded-lg border border-neutral-800 bg-neutral-900/50 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:border-rose-500/20 group-hover:bg-rose-950/20 transition-all duration-300">
                      <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-400 transition-transform duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                  {/* icon part */}
                  <div className={` my-3 ${isLarge ? "text-9xl group-hover:text-blue-400":"group-hover:text-yellow-300 text-2xl"}`}>
                    {project.icon}
                  </div>

                  {/* Bottom Row: Content */}
                  <div className="space-y-1.5 mt-auto">
                    <h3 className="font-semibold text-base tracking-wide text-slate-200 group-hover:text-white transition-colors duration-200 truncate">
                      {project.title}
                    </h3>
                    
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default App;