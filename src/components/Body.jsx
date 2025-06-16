import React, { useState, useRef, useEffect } from "react";

const Body = () => {
  const [history, setHistory] = useState([
    {
      type: "output",
      content:
        "███████╗ █████╗ ███████╗ █████╗ ██╗         ██╗  ██╗ █████╗ ██████╗ ██╗██╗   ██╗ █████╗ ██████╗ ",
    },
    {
      type: "output",
      content:
        "██╔════╝██╔══██╗╚══███╔╝██╔══██╗██║         ██║ ██╔╝██╔══██╗██╔══██╗██║██║   ██║██╔══██╗██╔══██╗",
    },
    {
      type: "output",
      content:
        "█████╗  ███████║  ███╔╝ ███████║██║         █████╔╝ ███████║██║  ██║██║██║   ██║███████║██████╔╝",
    },
    {
      type: "output",
      content:
        "██╔══╝  ██╔══██║ ███╔╝  ██╔══██║██║         ██╔═██╗ ██╔══██║██║  ██║██║╚██╗ ██╔╝██╔══██║██╔══██╗",
    },
    {
      type: "output",
      content:
        "██║     ██║  ██║███████╗██║  ██║███████╗    ██║  ██╗██║  ██║██████╔╝██║ ╚████╔╝ ██║  ██║██║  ██║",
    },
    {
      type: "output",
      content:
        "╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝",
    },
    { type: "output", content: " " },
    { type: "output", content: "Welcome to Portfolio v1.0.0" },
    { type: "output", content: 'Type "help" for available commands' },
  ]);

  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(false);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const commands = {
    help: () => [
      "Available commands:",
      "  help     - Show this help message",
      "  clear    - Clear the terminal",
      "  echo     - Echo text back",
      "  date     - Show current date and time",
      "  whoami   - Show current user",
      "  pwd      - Show current directory",
      "  ls       - List directory contents",
      "  cat      - Display file contents",
    ],
    clear: () => {
      // Return special flag to indicate clear command
      return { type: 'clear' };
    },
    echo: (args) => [args.join(" ") || ""],
    date: () => [new Date().toString()],
    whoami: () => ["fazalkadivar21@PhantomPenguin"],
    pwd: () => ["/home/user"],
    ls: () => ["About.txt", "Projects.txt", "Contact.txt"],
    cat: (args) => {
      const file = args[0];
      if (!file) return ["cat: missing file operand"];

      const files = {
        "About.txt": [
          {
            type: "markdown",
            content: `# About Me

I am Mohamadfazalmadani Kadivar, Fazal for the ease of mind.

Everyone has a story, here is mine. Story of who I really am.

Well I am someone with No job titles. No fancy labels. Just a clear drive to create things that matter.

It all started simple with an idea called *Starboy*. Built from scratch. No roadmap, just raw curiosity and a willingness to figure things out. It wasn't perfect, but it was real. And real is where the magic begins.

While others collect experience, I collect lessons. From shipping real tools. From solving actual problems. From moving fast, breaking things, and building them back stronger.

I'm mastering the full stack—not for the badge, but for the freedom.

To dream. To build. To ship. Again and again.

I don't call myself a developer, a founder, or a maker.

I'm just a guy with a laptop, a vision, and a relentless itch to create.

This isn't just a journey—it's the opening chapter.

More tools are coming. Bigger ideas are brewing.

So if you're building something bold—or just wanna trade sparks of madness—let's connect.

I'm here to learn, build, and grow like hell.`,
          },
        ],
        "Projects.txt": [
          {
            type: "markdown",
            content: `# Projects

A list of things I've built — not to impress, but to express. Real tools. Real lessons.

---

### [1] Starboy 🚀  
> My first serious build. A Node.js project scaffolder.  
- **Stack**: Node.js  
- **Highlights**: Scaffolder  
- **Demo**: [npm](https://npmjs.com/package/create-starboy)  
- **Repo**: [GitHub](https://github.com/fazalkadivar21/starboy)  
- **Status**: v1 out, still Improving.

---

### [2] Coldstar ⭐  
> Backend for a youtubish video binge platform.  
- **Stack**: Node.js, Express.js, MongoDB  
- **Highlights**: JWT, Aggregation, Pagination  
- **Demo**: [Postman](https://www.postman.com/fazalkadivar/fazal-kadivar-s-workspace/collection/3e10g9w/coldstar)  
- **Repo**: [GitHub](https://github.com/fazalkadivar21/coldstar)  
- **Status**: Live, Adding Rate limits.`,
          },
        ],
        "Contact.txt": [
          {
            type: "markdown",
            content: `
### You can find me on:
- **GitHub:** [fazalkadivar21](https://github.com/fazalkadivar21)
- **LinkedIn:** [Mohamadfazalmadani(Fazal) Kadivar](https://www.linkedin.com/in/fazalkadivar21)
- **X (Twitter):** [@fazalkadivar](https://x.com/fazalkadivar21)
- **Buy Me a Coffee:** [Support Here](https://www.buymeacoffee.com/fazalkadivar)`,},
        ],
      };

      return files[file] || [`cat: ${file}: No such file or directory`];
    },
  };

  const executeCommand = (input) => {
    const [command, ...args] = input.trim().split(" ");
    if (commands[command]) return commands[command](args);
    if (command === "") return [];
    return [`zsh: ${command}: command not found`];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentInput.trim()) return;
    
    const newHistory = [
      ...history,
      {
        type: "input",
        content: `fazalkadivar21@PhantomPenguin:~$ ${currentInput}`,
      },
    ];
    
    const output = executeCommand(currentInput);
    
    // Handle clear command specially
    if (output && output.type === 'clear') {
      setHistory([]);
      setCommandHistory(prev => [...prev, currentInput]);
      setCurrentInput('');
      setHistoryIndex(-1);
      return;
    }
    
    // Handle regular commands
    const finalHistory = [...newHistory];
    if (Array.isArray(output)) {
      output.forEach(line => {
        if (typeof line === 'object' && line.type === 'markdown') {
          finalHistory.push({ type: 'markdown', content: line.content });
        } else {
          finalHistory.push({ type: 'output', content: line });
        }
      });
    }

    setHistory(finalHistory);
    setCommandHistory(prev => [...prev, currentInput]);
    setCurrentInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [history]);

  useEffect(() => {
    if (inputRef.current && !isMinimized) inputRef.current.focus();
  }, [isMinimized]);

  // Simple markdown renderer with enhanced styling
  const renderMarkdown = (content) => {
    return content
      .replace(/### (.+)/g, '<h3 class="text-xl font-bold text-green-300 mt-6 mb-3 border-l-4 border-green-500 pl-3">$1</h3>')
      .replace(/## (.+)/g, '<h2 class="text-2xl font-bold text-green-300 mt-6 mb-4 border-l-4 border-green-400 pl-3">$1</h2>')
      .replace(/# (.+)/g, '<h1 class="text-3xl font-bold text-green-200 mt-6 mb-4 border-b-2 border-green-500 pb-2">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-green-200 bg-green-900 bg-opacity-30 px-1 rounded">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic text-green-300">$1</em>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium">$1</a>')
      .replace(/^- (.+)/gm, '<li class="ml-6 mb-1 flex items-start"><span class="text-green-500 mr-2 mt-1">▸</span><span>$1</span></li>')
      .replace(/---/g, '<hr class="border-green-600 my-6 border-t-2 opacity-50">')
      .replace(/\n\n/g, '<div class="mb-4"></div>')
      .replace(/\n/g, '<br>');
  };

  return (
    <>
      <div className="hidden lg:flex items-center justify-center min-h-screen bg-black p-2 sm:p-4">
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #111827;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #4ade80;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #22c55e;
          }
        `}</style>

        <div className="w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl bg-black border-2 border-emerald-500 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gray-900 px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                <button className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-600 rounded-full" />
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"
                />
                <button className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full" />
              </div>
              <span className="text-green-300 text-xs sm:text-sm font-medium ml-3">
                Terminal
              </span>
            </div>
            <div className="text-green-600 text-xs">
              {new Date().toLocaleTimeString()}
            </div>
          </div>

          {!isMinimized && (
            <div className="bg-black text-green-400 font-mono text-xs sm:text-sm leading-relaxed">
              {/* Terminal Output */}
              <div
                ref={terminalRef}
                className="h-96 overflow-y-auto p-2 sm:p-4 space-y-1 custom-scrollbar"
                onClick={() => inputRef.current?.focus()}
              >
                {history.map((line, idx) => (
                  <div key={idx} className="whitespace-pre-wrap">
                    {line.type === "markdown" ? (
                      <div 
                        className="text-green-400"
                        dangerouslySetInnerHTML={{ 
                          __html: renderMarkdown(line.content) 
                        }}
                      />
                    ) : line.type === "input" ? (
                      <span className="text-green-300">{line.content}</span>
                    ) : (
                      <span className="text-green-400">{line.content}</span>
                    )}
                  </div>
                ))}

                {/* Input Line */}
                <div className="flex items-center">
                  <span className="text-green-400 mr-1 sm:mr-2 text-sm sm:text-base">
                    fazalkadivar21@PhantomPenguin:~$
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubmit(e);
                      else handleKeyDown(e);
                    }}
                    className="bg-transparent border-none outline-none text-green-400 flex-1 font-mono text-sm sm:text-base py-1"
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
              </div>

              {/* Status Bar */}
              <div className="bg-gray-900 px-3 py-1 sm:px-4 sm:py-2 flex justify-between items-center text-xs text-green-600">
                <div className="flex space-x-3">
                  <span>Lines: {history.length}</span>
                  <span>Commands: {commandHistory.length}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile/Tablet Blocked View */}
      <div className="flex lg:hidden items-center justify-center min-h-screen bg-black p-6">
        <div className="text-center text-green-400">
          <h1 className="text-2xl font-bold mb-2">Error : 400</h1>
          <p className="text-green-300">Made only for desktop view.</p>
        </div>
      </div>
    </>
  );
};

export default Body;