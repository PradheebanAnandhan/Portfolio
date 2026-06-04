import React, { useRef, useEffect } from 'react';
import { useTerminal } from '../hooks/useTerminal';

interface TerminalProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export const Terminal: React.FC<TerminalProps> = ({ theme, setTheme }) => {
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    lines,
    currentInput,
    setCurrentInput,
    executeCommand,
    currentPath,
    history,
    historyIndex,
    setHistoryIndex,
    getSuggestions,
    isExecuting,
  } = useTerminal(setTheme);

  // Auto-scroll to bottom of the terminal on new line addition
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  // Focus the input when terminal is clicked
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Keep input focused on startup
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // All matches — used for the mobile suggestion bar
  const allSuggestions = getSuggestions(currentInput);
  // Best single match — used for the desktop inline ghost text
  const bestSuggestion = allSuggestions[0] ?? '';

  // Accept the top suggestion (desktop Tab / ArrowRight)
  const acceptSuggestion = (value: string) => {
    setCurrentInput(value);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (bestSuggestion) acceptSuggestion(bestSuggestion);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;

      let nextIndex = historyIndex;
      if (historyIndex === -1) {
        nextIndex = history.length - 1;
      } else if (historyIndex > 0) {
        nextIndex = historyIndex - 1;
      }

      setHistoryIndex(nextIndex);
      setCurrentInput(history[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;

      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setCurrentInput('');
      } else {
        setHistoryIndex(nextIndex);
        setCurrentInput(history[nextIndex]);
      }
    } else if (e.key === 'ArrowRight') {
      const cursorPosition = e.currentTarget.selectionStart;
      if (cursorPosition === currentInput.length && bestSuggestion) {
        e.preventDefault();
        acceptSuggestion(bestSuggestion);
      }
    } else if (e.key === 'Escape') {
      setCurrentInput('');
    }
  };

  // Inline ghost text: only show the suffix the user hasn't typed yet
  let inlineSuggestion = '';
  if (bestSuggestion && bestSuggestion.toLowerCase().startsWith(currentInput.toLowerCase())) {
    inlineSuggestion = bestSuggestion.substring(currentInput.length);
  }

  // Theme-specific CSS classes
  const getThemeClasses = () => {
    switch (theme) {
      case 'ubuntu':
        return {
          bg: 'bg-[#300A24]/90 border-[#DFDBE5]/20 shadow-ubuntu',
          headerBg: 'bg-[#150510]',
          headerText: 'text-[#DFDBE5]',
          textColor: 'text-[#DFDBE5]',
          promptUser: 'text-[#E95420]',
          promptPath: 'text-[#DFDBE5]',
          inputAccent: 'text-[#E95420]',
          crtOverlay: 'crt-ubuntu'
        };
      case 'matrix':
        return {
          bg: 'bg-black/90 border-[#00FF00]/30 shadow-matrix',
          headerBg: 'bg-[#050f05]',
          headerText: 'text-[#00FF00]',
          textColor: 'text-[#00FF00]',
          promptUser: 'text-[#00FF00] font-bold text-shadow-matrix',
          promptPath: 'text-[#00FF00]',
          inputAccent: 'text-[#00FF00]',
          crtOverlay: 'crt-matrix'
        };
      case 'kali':
        return {
          bg: 'bg-[#0f1419]/95 border-[#1793d1]/30 shadow-kali',
          headerBg: 'bg-[#0a0d10]',
          headerText: 'text-[#1793d1]',
          textColor: 'text-[#c1c6cc]',
          promptUser: 'text-[#ff5555]',
          promptPath: 'text-[#1793d1]',
          inputAccent: 'text-[#1793d1]',
          crtOverlay: 'crt-kali'
        };
      case 'dracula':
      default:
        return {
          bg: 'bg-[#282a36]/90 border-[#6272a4]/40 shadow-dracula',
          headerBg: 'bg-[#1e1f29]',
          headerText: 'text-[#f8f8f2]',
          textColor: 'text-[#f8f8f2]',
          promptUser: 'text-[#50fa7b]',
          promptPath: 'text-[#ff79c6]',
          inputAccent: 'text-[#f1fa8c]',
          crtOverlay: 'crt-dracula'
        };
    }
  };

  const style = getThemeClasses();

  return (
    <div
      onClick={handleTerminalClick}
      className={`w-full max-w-4xl h-[80vh] rounded-lg border flex flex-col backdrop-blur-md overflow-hidden relative transition-all duration-300 ${style.bg}`}
    >
      {/* CRT Scanline & Screen Glow */}
      <div className={`absolute inset-0 pointer-events-none z-10 scanlines ${style.crtOverlay}`} />

      {/* Terminal Title Bar */}
      <div className={`flex items-center justify-between px-4 py-2 border-b border-white/5 select-none ${style.headerBg}`}>
        {/* Linux-style Close, Minimize, Maximize buttons */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5555] opacity-80 hover:opacity-100 cursor-pointer flex items-center justify-center text-[8px] text-black font-bold">
            ×
          </div>
          <div className="w-3 h-3 rounded-full bg-[#f1fa8c] opacity-80 hover:opacity-100 cursor-pointer flex items-center justify-center text-[8px] text-black font-bold">
            -
          </div>
          <div className="w-3 h-3 rounded-full bg-[#50fa7b] opacity-80 hover:opacity-100 cursor-pointer flex items-center justify-center text-[8px] text-black font-bold">
            +
          </div>
        </div>

        {/* Title */}
        <div className={`font-mono text-xs md:text-sm font-semibold tracking-wide flex items-center gap-1.5 ${style.headerText}`}>
          <span>🐚 guest@pradheeban: {currentPath}</span>
        </div>

        {/* Layout Spacer */}
        <div className="w-14"></div>
      </div>

      {/* Terminal Body */}
      <div
        className="flex-1 p-4 md:p-6 overflow-y-auto font-mono text-xs md:text-sm space-y-3 scrollbar-thin scrollbar-thumb-white/10 relative"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {/* Output lines */}
        {lines.map((line) => (
          <div key={line.id} className="space-y-1">
            {line.command !== undefined && (
              <div className="flex items-center leading-relaxed">
                <span className={`${style.promptUser}`}>guest@pradheeban</span>
                <span className="text-gray-400 mx-1">:</span>
                <span className={`${style.promptPath}`}>{line.dir}</span>
                <span className="text-gray-300 mx-1">$</span>
                <span className={`font-bold pl-1 ${line.isError ? 'text-red-400' : 'text-white'}`}>
                  {line.command}
                </span>
              </div>
            )}
            {line.output !== undefined && (
              <div className={`leading-relaxed pl-1 ${style.textColor}`}>
                {line.output}
              </div>
            )}
          </div>
        ))}

        {/* Current Command Prompt input line */}
        {!isExecuting && (
          <div className="space-y-1.5">
            <div className="flex items-center leading-relaxed relative">
              <span className={`${style.promptUser}`}>guest@pradheeban</span>
              <span className="text-gray-400 mx-1">:</span>
              <span className={`${style.promptPath}`}>{currentPath}</span>
              <span className="text-gray-300 mx-1">$</span>

              <div className="flex-1 relative flex items-center pl-1">
                {/* Desktop inline ghost text */}
                <div className="absolute inset-y-0 left-1 flex items-center pointer-events-none">
                  <span className="text-transparent select-none">{currentInput}</span>
                  <span className="text-gray-500 opacity-60 font-semibold select-none">{inlineSuggestion}</span>
                </div>

                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`w-full bg-transparent border-none outline-none focus:ring-0 p-0 font-mono text-xs md:text-sm font-bold caret-current ${style.inputAccent}`}
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  enterKeyHint="send"
                  inputMode="text"
                />
              </div>
            </div>

            {/* ── Mobile Suggestion Bar (hidden on desktop) ── */}
            {allSuggestions.length > 0 && (
              <div className="flex md:hidden items-center gap-1.5 overflow-x-auto scrollbar-none pl-1 pb-0.5">
                <span className="text-gray-600 text-[10px] font-mono flex-shrink-0 select-none">
                  tab:
                </span>
                {allSuggestions.slice(0, 8).map((suggestion) => (
                  <button
                    key={suggestion}
                    onPointerDown={(e) => {
                      // onPointerDown fires before the input loses focus,
                      // allowing us to set the value without a focus/blur race
                      e.preventDefault();
                      acceptSuggestion(suggestion);
                    }}
                    className="flex-shrink-0 font-mono text-[11px] px-2 py-0.5 rounded border border-gray-700 bg-gray-900/60 text-[#50fa7b] hover:border-[#50fa7b]/60 hover:bg-[#50fa7b]/10 active:scale-95 transition-all duration-100 cursor-pointer select-none"
                    tabIndex={-1}
                    aria-label={`Autocomplete: ${suggestion}`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Scroll Anchor */}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
