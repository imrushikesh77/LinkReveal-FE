import { useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import UrlForm from "./components/UrlForm"
import ResultCard from "./components/ResultCard"
import InfoSection from "./components/InfoSection"
import MatrixBackground from "./components/MatrixBackground"
import "./index.css"

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState("")
  const [screenshotUrl, setScreenshotUrl] = useState("")
  const [type, setType] = useState("")

  const handleSubmit = ({ isLoading, result, screenshotUrl, error, type }) => {
    setIsLoading(isLoading)
    setResult(result || "")
    setScreenshotUrl(screenshotUrl || "")
    setError(error || "")
    setType(type || "")
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-black text-green-300">
      <MatrixBackground />
      <Header />

      <main className="flex-grow relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="container mx-auto max-w-full sm:max-w-3xl lg:max-w-4xl space-y-6">
          <UrlForm onSubmit={handleSubmit} isLoading={isLoading} />

          {isLoading && (
            <div className="loading-indicator" aria-live="polite">
              <div className="terminal-window border-cyan-500 p-4 sm:p-6 rounded-lg">
                <p className="text-cyan-400 text-sm sm:text-base mb-4 typing-effect">Scanning in progress...</p>
                <div className="w-full bg-gray-900 rounded-full h-2.5 mb-4 overflow-hidden border border-cyan-800">
                  <div className="progress-bar h-full" />
                </div>
                <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-cyan-300 gap-2">
                  <span>SCAN_ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                  <span>PROGRESS: Running...</span>
                </div>
              </div>
            </div>
          )}

          {error && !isLoading && (
            <div className="error-message" aria-live="assertive">
              <ResultCard type={type} message={error} />
            </div>
          )}

          {result && !isLoading && !error && (
            <div className="result-container" aria-live="polite">
              <ResultCard type={type} result={result} screenshotUrl={screenshotUrl} />
            </div>
          )}

          <InfoSection />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App

