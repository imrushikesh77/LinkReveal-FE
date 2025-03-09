import { useState } from "react"
import { ToastContainer } from "react-toastify";
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
  const [shortUrl, setShortUrl] = useState("")
  const [result, setResult] = useState("")
  const [screenshotUrl, setScreenshotUrl] = useState("")
  const [type, setType] = useState("")

  const handleSubmit = ({ isLoading, shortUrl, result, screenshotUrl, error, type }) => {
    setIsLoading(isLoading)
    setResult(result || "")
    setScreenshotUrl(screenshotUrl || "")
    setError(error || "")
    setType(type || "")
    setShortUrl(shortUrl || "")
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-black text-green-300">
      <MatrixBackground />
      <Header />
      <ToastContainer position="bottom-right" autoClose={3000} />
      <main className="flex-grow relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="container mx-auto max-w-full sm:max-w-3xl lg:max-w-4xl space-y-6">
          <UrlForm onSubmit={handleSubmit} isLoading={isLoading} />

          {error && !isLoading && (
            <div className="error-message" aria-live="assertive">
              <ResultCard type={type} message={error} />
            </div>
          )}

          {result && !isLoading && !error && (
            <div className="result-container" aria-live="polite">
              <ResultCard type={type} shortUrl={shortUrl} result={result} screenshotUrl={screenshotUrl} />
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

