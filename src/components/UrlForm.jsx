import { useState } from "react"
import { Terminal } from "lucide-react"
import axios from "axios"

function UrlForm({ onSubmit, isLoading }) {
  const [url, setUrl] = useState("")

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!url.trim()) return

    onSubmit({ isLoading: true })

    try {
      const unshortenResult = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/resolve`, { "short_url":url })

      if (unshortenResult.data.status === "success") {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/screenshot?url=${encodeURIComponent(unshortenResult.data.long_url)}`);
        if(!response.ok) {
          throw new Error("Failed to fetch screenshot");
        }
        const blob = await response.blob();
        onSubmit({
          isLoading: false,
          shortUrl: url,
          result: unshortenResult.data.long_url,
          screenshotUrl: URL.createObjectURL(blob) || "",
          error: "",
          type:"success"
        })
      } else {
        onSubmit({
          isLoading: false,
          shortUrl: url,
          result: "",
          screenshotUrl: "",
          error: unshortenResult.data.error,
          type:"error"
        })
      }
    } catch (err) {
      let errorMessage = err.response?.data?.error || "System error: Unable to process request.";
      onSubmit({
        isLoading: false,
        shortUrl: url,
        result: "",
        screenshotUrl: "",
        error: errorMessage,
        type:"error"
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
        <Terminal className="text-green-500 h-5 w-5 sm:h-6 sm:w-6" />
        <h1 className="text-lg sm:text-base md:text-2xl font-bold text-green-500 tracking-wider">
          URL_DECODER::SECURE_TRACE
        </h1>
      </div>

      <div className="terminal-window p-4 sm:p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <span className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-500"></span>
            <span className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-amber-500"></span>
            <span className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500"></span>
          </div>
          <p className="text-xs sm:text-sm text-green-300 opacity-70 hidden sm:block">
            root@decoder:~# initialize_scan
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center border border-green-800 rounded-lg bg-gray-900 transition-all focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
            <span className="text-green-400 px-3 sm:px-4 py-3">$</span>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter shortened URL..."
              disabled={isLoading}
              className="flex-1 rounded-lg outline-none bg-gray-900 text-green-700 placeholder-green-500/70 py-3 px-2 text-sm sm:text-base w-full"
              aria-label="URL to decode"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="bg-green-500 text-black font-bold py-3 px-5 sm:px-6 rounded-lg hover:bg-green-400 transition-colors duration-200 disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-black"
            aria-label={isLoading ? "Scanning URL" : "Execute scan"}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <span>Scanning...</span>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              "Execute"
            )}
          </button>
        </form>

        <p className="mt-3 text-sm text-green-400 opacity-80">
          Enter a shortened URL to decode and analyze its destination.
        </p>
      </div>
    </div>
  )
}

export default UrlForm

