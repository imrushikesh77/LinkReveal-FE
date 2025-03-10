import { useState } from "react"
import { AlertTriangle, ExternalLink, CopyIcon, ExpandIcon, DownloadIcon } from "lucide-react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResultCard({ type, shortUrl, result, screenshotUrl, message }) {
  const [imageError, setImageError] = useState(false)
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(!!screenshotUrl)
  if (type === "error") {
    return (
      <div className="terminal-window border-red-500 p-4 sm:p-6 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-red-500 flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 mt-0.5" />
          <div>
            <p className="text-red-500 font-bold text-sm sm:text-base mb-2">SECURITY_BREACH_DETECTED</p>
            <p className="text-red-400 text-sm sm:text-base">{message}</p>
            <div className="mt-3 p-3 bg-gray-900 rounded border border-red-800">
              <p className="text-red-300 text-xs sm:text-sm">[SYSTEM]: Try a different URL or verify its integrity.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="terminal-window p-4 sm:p-6 rounded-lg">
      <h2 className="text-green-500 font-bold text-sm sm:text-base mb-3 tracking-wider">TRACE_COMPLETE</h2>
      <p className="text-green-400 text-sm sm:text-base break-all mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-1">
        <span className="whitespace-nowrap">Target URL:</span>
        <div className="flex items-center gap-2">
          <a
            href={result || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline hover:text-green-300 transition-colors break-all"
          >
            {result}
            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
          </a>
          <button
            onClick={() => {
              navigator.clipboard.writeText(result)
                .then(() => toast.success("URL copied to clipboard!"))
                .catch(() => toast.error("Failed to copy URL."));
            }}
            className="text-green-400 hover:text-green-300 transition-colors p-1 sm:p-0"
            aria-label="Copy URL"
          >
            <CopyIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </p>

      {screenshotUrl && (
        <div className="border border-green-800 rounded-lg overflow-hidden bg-gray-900">
          <div className="relative aspect-video w-full">
            {/* Loading State */}
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center text-green-400 text-sm bg-gray-900">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading screenshot...</span>
                </div>
              </div>
            )}

            {/* Screenshot */}
            {!imageError ? (
              <div
                className="cursor-pointer"
                onClick={() => setIsEnlarged(true)} // Open modal on click
              >
                <img
                  src={screenshotUrl}
                  alt="Target site screenshot"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoading ? "opacity-0" : "opacity-100"}`}
                  onLoad={() => setIsImageLoading(false)}
                  onError={() => {
                    setImageError(true);
                    setIsImageLoading(false);
                  }}
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-red-400 text-sm bg-gray-900">
                <div className="flex flex-col items-center gap-2">
                  <span>Screenshot unavailable</span>
                  <button
                    className="text-green-400 hover:text-green-500 transition-colors"
                    onClick={() => {
                      setImageError(false);
                      setIsImageLoading(true);
                    }}
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Download Button */}
            {!isImageLoading && !imageError && (
              <div className="absolute bottom-2 right-2 flex gap-2">
                <button
                  onClick={() => setIsEnlarged(true)} // Open enlarged view
                  className="p-2 bg-black/50 rounded-lg text-green-400 hover:text-green-500 transition-colors"
                  aria-label="Enlarge"
                >
                  <ExpandIcon className="h-4 w-4" /> {/* Replace with your icon */}
                </button>
                <button
                  onClick={() => {
                    // Trigger download
                    const link = document.createElement("a");
                    link.href = screenshotUrl;
                    link.download = `${shortUrl.replace("://",".").replace("/",".")}-screenshot.png`; // Custom filename
                    link.click();
                  }}
                  className="p-2 bg-black/50 rounded-lg text-green-400 hover:text-green-500 transition-colors"
                  aria-label="Download"
                >
                  <DownloadIcon className="h-4 w-4" /> {/* Replace with your icon */}
                </button>
              </div>
            )}

            {/* Enlarged Modal */}
            {isEnlarged && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                onClick={() => setIsEnlarged(false)} // Close modal on click outside
              >
                <div className="relative max-w-[90vw] max-h-[90vh]">
                  {/* Enlarged Image */}
                  <img
                    src={screenshotUrl}
                    alt="Target site screenshot"
                    className="w-full h-full object-contain rounded-lg"
                  />
                  {/* Download Button in Modal */}
                  <button
                    onClick={() => {
                      // Trigger download
                      const link = document.createElement("a");
                      link.href = screenshotUrl;
                      link.download = `screenshot-${Date.now()}.png`; // Custom filename
                      link.click();
                    }}
                    className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-lg text-green-400 hover:text-green-500 transition-colors"
                    aria-label="Download"
                  >
                    <DownloadIcon className="h-6 w-6" /> {/* Replace with your icon */}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultCard

