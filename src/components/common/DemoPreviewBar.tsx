import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, ChevronUp, ChevronDown, Sparkles } from "lucide-react";

interface DemoPreviewBarProps {
  title: string;
  category?: string;
  liveUrl?: string;
}

export function DemoPreviewBar({
  title,
  category = "Interactive Demo",
  liveUrl,
}: DemoPreviewBarProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <aside
      aria-label="Demo navigation toolbar"
      className="fixed top-3 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300"
    >
      {isMinimized ? (
        // Minimized Floating Pill
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0f1d]/90 backdrop-blur-md border border-cyan-500/30 shadow-2xl text-white text-xs animate-fade-in hover:border-cyan-400/60 transition-all">
          <Link
            to="/"
            className="flex items-center gap-1 text-white/70 hover:text-cyan-400 transition-colors font-medium text-[11px]"
            title="Return to Portfolio"
          >
            <ArrowLeft className="w-3 h-3" />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>
          <span className="w-px h-3 bg-white/20" />
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold text-[11px] cursor-pointer"
            title="Expand Demo Bar"
          >
            <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span className="max-w-[120px] truncate">{title}</span>
            <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      ) : (
        // Full Floating Toolbar
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-4 px-3 sm:px-4 py-2 rounded-full bg-[#0a0f1d]/90 backdrop-blur-md border border-white/15 shadow-2xl text-white text-xs animate-fade-in">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-white/70 hover:text-cyan-400 transition-colors duration-200 cursor-pointer font-medium"
            title="Back to Portfolio"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Portfolio</span>
          </Link>

          <span className="w-px h-3.5 bg-white/20" />

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              {category}
            </span>
            <span className="font-semibold text-white truncate max-w-[140px] sm:max-w-none">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2 ml-1">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1 text-white/70 hover:text-white transition-colors cursor-pointer text-[11px]"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {/* Minimize Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Minimize Toolbar"
              aria-label="Minimize Toolbar"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
