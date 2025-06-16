import React, { useState, useEffect } from 'react';

const FXOSBootScreen = () => {
  const [progress, setProgress] = useState(0);
  const [bootStage, setBootStage] = useState('INITIALIZING');
  const [isVisible, setIsVisible] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  const bootMessages = [
    'INITIALIZING SYSTEM...',
    'LOADING KERNEL MODULES...',
    'MOUNTING FILE SYSTEMS...',
    'STARTING SERVICES...',
    'FINALIZING BOOT PROCESS...',
    'SYSTEM READY',
  ];

  useEffect(() => {
    setTimeout(() => setShowLogo(true), 200);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 3.33;

        const stageIndex = Math.floor((newProgress / 100) * (bootMessages.length - 1));
        setBootStage(bootMessages[stageIndex]);

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 1000);
          return 100;
        }

        return newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 font-mono text-green-400 px-4 sm:px-6">
      {/* FX OS Logo */}
      <div
        className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 transition-all duration-1000 ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        style={{ fontFamily: 'monospace', lineHeight: '1.2' }}
      >
        <pre className="text-green-400 whitespace-pre leading-tight">
{`███████╗ ██╗  ██╗
██╔════╝ ██║ ██╔╝
█████╗   █████╔╝ 
██╔══╝   ██╔═██╗ 
██║      ██║  ██╗
╚═╝      ╚═╝  ╚═╝`}
        </pre>
      </div>

      {/* OS Name */}
      <div className="text-lg sm:text-xl md:text-2xl text-green-300 mb-10 sm:mb-12 text-center">
        FK OPERATING SYSTEM
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs mb-6 px-2 sm:px-0">
  {/* Header Row */}
  <div className="flex justify-between text-sm mb-2">
    <span>BOOT PROGRESS</span>
    <span>{Math.round(progress)}%</span>
  </div>

  {/* Progress Bar */}
  <div className="w-full bg-gray-800 h-2 border border-green-400/30">
    <div
      className="h-full bg-green-400 transition-all duration-200"
      style={{ width: `${progress}%` }}
    />
  </div>
</div>


      {/* Boot Status */}
      <div className="text-xs sm:text-sm text-green-300 mb-8 min-h-[20px] text-center">
        {bootStage}
        <span className="animate-pulse ml-1">_</span>
      </div>

      {/* System Info (Bottom Left) */}
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 text-[10px] sm:text-xs text-green-600 space-y-0.5 sm:space-y-1">
        <div>FK OS v8.9.4</div>
        <div>BUILD: 20250616</div>
        <div>ARCH: x64</div>
      </div>

      {/* Boot Time (Bottom Right) */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 text-[10px] sm:text-xs text-green-600">
        BOOT TIME: 3.0s
      </div>
    </div>
  );
};

export default FXOSBootScreen;
