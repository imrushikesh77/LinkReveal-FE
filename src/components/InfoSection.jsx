import { Shield, AlertTriangle, Info } from "lucide-react"

function InfoSection() {
  return (
    <div className="terminal-window p-4 sm:p-6 rounded-lg">
      <h2 className="text-green-500 font-bold text-sm sm:text-base mb-3 tracking-wider flex items-center gap-2">
        <Info className="h-4 w-4 sm:h-5 sm:w-5" />
        HELP & INFORMATION
      </h2>

      <div className="space-y-4">
        <div className="bg-gray-900/50 p-3 rounded-lg border border-green-800/50">
          <h3 className="text-green-400 text-sm font-medium mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            How It Works
          </h3>
          <p className="text-green-300 text-xs sm:text-sm opacity-80">
            Enter a shortened URL (e.g., bit.ly/xyz) to initiate a secure trace. The system will bypass redirects and
            reveal the final destination.
          </p>
        </div>

        <div className="bg-gray-900/50 p-3 rounded-lg border border-green-800/50">
          <h3 className="text-green-400 text-sm font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Why Use This Tool
          </h3>
          <p className="text-green-300 text-xs sm:text-sm opacity-80">
            Shortened URLs can hide malicious destinations. Our tool lets you verify where a link leads before clicking,
            protecting you from phishing and malware.
          </p>
        </div>
      </div>
    </div>
  )
}

export default InfoSection

