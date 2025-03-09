import { Github, Twitter } from "lucide-react"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-green-500/50 bg-black/90 backdrop-blur-sm py-4 sm:py-5 text-xs sm:text-sm">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-green-300 opacity-70">root@linkreveal:~# exit | © {currentYear} Link Reveal</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/imrushikesh77"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-500 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://x.com/imrushikesh77"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-500 transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

