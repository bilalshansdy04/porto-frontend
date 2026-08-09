export function Footer() {
  return (
    <footer className="bg-surface dark:bg-surface text-primary dark:text-primary-fixed-dim font-body-md text-body-md full-width bottom border-t border-outline-variant flat no shadows mt-auto" id="contact">
      <div className="w-full max-w-[1200px] mx-auto px-6 py-section-gap-mobile md:py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-label-caps text-label-caps font-bold text-primary">
          © 2024 Bilal Shandyarta. Built with technical precision.
        </div>
        <div className="flex gap-6">
          <a className="text-on-surface-variant hover:text-primary underline transition-all opacity-100 hover:opacity-70" href="#">LinkedIn</a>
          <a className="text-on-surface-variant hover:text-primary underline transition-all opacity-100 hover:opacity-70" href="#">GitHub</a>
          <a className="text-on-surface-variant hover:text-primary underline transition-all opacity-100 hover:opacity-70" href="#">Resume</a>
          <a className="text-on-surface-variant hover:text-primary underline transition-all opacity-100 hover:opacity-70" href="#">Email</a>
        </div>
      </div>
    </footer>
  );
}
