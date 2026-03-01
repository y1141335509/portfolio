export default function Footer() {
  return (
    <footer className="py-8 text-center border-t border-navy-lighter/30">
      <div className="flex items-center justify-center gap-6 mb-4">
        <a
          href="https://github.com/y1141335509"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-slate text-xs hover:text-accent transition-colors duration-200"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/yinghai-yu/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-slate text-xs hover:text-accent transition-colors duration-200"
        >
          LinkedIn
        </a>
        <a
          href="mailto:yinghaiyu67@gmail.com"
          className="font-mono text-slate text-xs hover:text-accent transition-colors duration-200"
        >
          Email
        </a>
      </div>
      <p className="font-mono text-slate/40 text-xs">
        Designed &amp; Built by Yinghai Yu
      </p>
    </footer>
  )
}
