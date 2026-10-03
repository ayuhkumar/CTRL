import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'QoneqtForge | Enterprise AI Video Pipeline',
  description: 'Transform topics into publish-ready vertical videos for the Qoneqt Global Feed. High-fidelity, zero-cost, multi-agent AI pipeline.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col relative text-slate-900 bg-white selection:bg-blue-100 selection:text-blue-900">
        
        {/* Subtle mesh background for extreme premium feel */}
        <div className="bg-mesh" />
        
        {/* Navigation */}
        <nav className="sticky top-0 w-full z-50 glass-nav">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
            
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[17px] tracking-tight leading-none">QoneqtForge</span>
              </div>
              <span className="ml-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-slate-200">
                v1.0
              </span>
            </a>
            
            <div className="flex items-center gap-2">
              <a href="/" className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all">
                Create
              </a>
              <a href="/batch" className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all">
                Batch Processing
              </a>
            </div>
            
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 w-full flex flex-col relative z-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-md mt-auto relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 py-8 gap-4">
            <p className="text-sm font-medium text-slate-500">
              © 2026 QoneqtForge · Designed for CTRL FREAK Hackathon
            </p>
            <div className="flex items-center gap-4 text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-700">All Systems Operational</span>
              </div>
            </div>
          </div>
        </footer>
        
      </body>
    </html>
  )
}
