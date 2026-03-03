'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-lg mx-auto text-center"
      >
        <p className="font-mono text-accent text-sm mb-4 tracking-wide">05. What&apos;s Next?</p>

        <h2 className="text-slate-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Get In Touch
        </h2>

        <p className="text-slate text-base leading-relaxed mb-10">
          I&apos;m currently open to new opportunities. Whether you have a role to discuss, a project
          in mind, or just want to say hi — feel free to reach out.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="mailto:yinghaiyu67@gmail.com"
            className="inline-flex items-center border border-accent text-accent font-mono text-sm px-8 py-4 rounded hover:bg-accent/10 transition-colors duration-200"
          >
            Say Hello
          </a>
          <a
            href="https://www.linkedin.com/in/yinghai-yu/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center border border-navy-lighter text-slate-lighter font-mono text-sm px-8 py-4 rounded hover:border-accent/50 hover:text-accent transition-colors duration-200"
          >
            LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  )
}
