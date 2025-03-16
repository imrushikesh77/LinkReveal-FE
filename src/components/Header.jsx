import React, { useState, useEffect } from "react";
import { Terminal } from "lucide-react";
import MatrixBackground from "./MatrixBackground";

function Header() {
  const [systemInfo, setSystemInfo] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSystemInfo(null); // Close the system info
      }
    };

    // Add the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [systemInfo]); // Add systemInfo as a dependency

  const handleScan = () => {
    if (systemInfo) {
      // If system info is already visible, close it
      setSystemInfo(null);
    } else {
      // If system info is not visible, fetch and display it
      const info = getSystemInfo();
      setSystemInfo(info);
    }
  };

  const getSystemInfo = () => {
    return {
      os: detectOS(),
      browser: detectBrowser(),
      screenResolution: `${window.innerWidth}x${window.innerHeight}`,
      language: navigator.language,
      cpuCores: navigator.hardwareConcurrency || "Unknown",
      userAgent: navigator.userAgent,
    };
  };

  const detectOS = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac")) return "MacOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iOS")) return "iOS";
    return "Unknown OS";
  };

  const detectBrowser = () => {
    const userAgent = navigator.userAgent;
    if (/firefox/i.test(userAgent)) return "Firefox";
    if (/edg/i.test(userAgent)) return "Microsoft Edge";
    if (/chrome/i.test(userAgent)) return "Chrome";
    if (/safari/i.test(userAgent)) return "Safari";
    if (/android/i.test(userAgent)) return "Android Browser";
    if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS Browser";
    return "Unknown Browser";
  };

  const handleExit = (e) => {
    e.preventDefault();
    var isChrome = !!window.chrome;
    if (isChrome) {
      window.close();
    } else {
      alert("Please use shortcut ctrl/cmd + w to exit.");
    }
  };

  return (
    <header className="z-10 border-b border-green-500/50 bg-black/90 backdrop-blur-sm py-3 sm:py-4 sticky top-0">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="text-green-500 h-5 w-5 sm:h-6 sm:w-6" />
          <div>
            <span className="text-green-500 font-bold text-sm sm:text-base tracking-wider">LINK REVEAL</span>
            <span className="text-green-300 text-xs sm:text-sm opacity-70 ml-2">[v1.0.0]</span>
          </div>
        </div>
        <nav className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
          <button
            onClick={handleScan}
            className="text-green-400 hover:text-green-500 transition-colors py-1 px-2 rounded hover:bg-green-900/20"
          >
            {systemInfo ? "CLOSE" : "SCAN"}
          </button>
          <button
            onClick={handleExit}
            className="text-green-400 hover:text-green-500 transition-colors py-1 px-2 rounded hover:bg-green-900/20"
          >
            EXIT
          </button>
        </nav>
      </div>

      {/* Display System Info */}
      {systemInfo && (
        <>
          <MatrixBackground />
          <div className="container mx-auto px-4 mt-4 p-4 bg-black/80 rounded-lg border border-green-500/50 relative max-w-full sm:max-w-[53rem]">
            {/* Terminal-like header */}
            <div className="flex items-center justify-start gap-2 mb-4">
              <div className="flex gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
              </div>
              <span className="text-green-400 text-sm">system_info.txt</span>
            </div>

            {/* ASCII Art */}
            <pre className="text-green-400 text-sm font-mono hidden sm:block">
              {`
                _____    __  __ 
                |  __ \\  |  \\/  |
                | |__) | | \\  / |
                |  _  /  | |\\/| |
                | | \\ \\  | |  | |
                |_|  \\_\\ |_|  |_|
              `}
            </pre>

            {/* System Info Content */}
            <pre className="text-green-300 text-sm font-mono whitespace-pre-wrap">
              <code>
                <span className="text-green-500">$</span> system scan
                {Object.entries(systemInfo).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-green-400">{key}:</span>{" "}
                    <span className="text-green-200">{JSON.stringify(value, null, 2)}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;