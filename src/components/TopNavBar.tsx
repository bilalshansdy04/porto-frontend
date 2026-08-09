import { Link } from "react-router-dom";

export function TopNavBar() {
  return (
    <nav className="bg-surface dark:bg-surface text-primary dark:text-primary-fixed-dim font-body-md text-body-md docked full-width top-0 border-b border-outline-variant flat no shadows sticky z-50">
      <div className="flex justify-between items-center h-16 w-full max-w-[1200px] mx-auto px-6 md:px-grid-margin">
        <Link to="/" className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">
          Bilal Shandyarta
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="text-primary font-bold border-b-2 border-primary pb-1 hover:text-primary transition-colors duration-200 opacity-80 transition-opacity">
            Portfolio
          </Link>
          <a href="/#experience" className="text-on-surface-variant hover:text-primary transition-colors duration-200">
            Experience
          </a>
          <a href="/#works" className="text-on-surface-variant hover:text-primary transition-colors duration-200">
            Works
          </a>
          <a href="/#contact" className="text-on-surface-variant hover:text-primary transition-colors duration-200">
            Contact
          </a>
        </div>
        <button className="hidden md:flex items-center justify-center bg-brand-navy text-white px-4 py-2 rounded-lg font-label-code text-label-code hover:opacity-90 transition-opacity">
          Admin Panel
        </button>
      </div>
    </nav>
  );
}
