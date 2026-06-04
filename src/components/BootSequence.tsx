import React, { useEffect, useState } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

const bootLogs = [
  "[   0.002849] arch: x86_64, processor: vCPU @ 2.40GHz",
  "[   0.048392] mem: physical 16GB, swap 8GB",
  "[   0.104231] systemd-udevd[120]: starting version 252.5-2ubuntu3",
  "[   0.284902] Initializing portfolio...",
  "[   0.592834] Loading projects...",
  "[   0.823491] Loading skills...",
  "[   1.092190] Connecting to cloud...",
  "[   1.383849] System ready.",
  "[   1.500000] Welcome to Pradheeban's Terminal Portfolio",
  "[   1.600000] Type \"help\" to begin."
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine < bootLogs.length) {
      const delay = currentLine < 3 ? 100 : currentLine < 7 ? 250 : 150;
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, bootLogs[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      const completionTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(completionTimer);
    }
  }, [currentLine, onComplete]);

  return (
    <div className="font-mono text-xs md:text-sm p-6 max-w-4xl mx-auto space-y-1.5 h-full flex flex-col justify-start select-none bg-black text-[#50fa7b]">
      {logs.map((log, index) => {
        const isOk = log.includes("Initializing") || log.includes("Loading") || log.includes("Connecting") || log.includes("System ready");
        const isSystem = log.includes("Welcome") || log.includes("Type");
        
        let textClass = "text-gray-400";
        if (log.includes("System ready") || log.includes("Welcome")) {
          textClass = "text-[#50fa7b] font-bold";
        } else if (isOk) {
          textClass = "text-[#8be9fd]";
        } else if (isSystem) {
          textClass = "text-yellow-300";
        }

        return (
          <div key={index} className={`leading-relaxed ${textClass}`}>
            {log.startsWith("[") ? (
              <>
                <span className="text-[#ff79c6] font-semibold">{log.slice(0, 12)}</span>
                <span className="text-white">{log.slice(12)}</span>
              </>
            ) : (
              log
            )}
          </div>
        );
      })}
      {currentLine < bootLogs.length && (
        <span className="inline-block w-2 h-4 bg-[#50fa7b] animate-pulse"></span>
      )}
    </div>
  );
};
