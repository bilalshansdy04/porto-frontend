import { Link } from "react-router-dom";
import meImage from "../assets/me.webp";

export function Home() {
  return (
    <main className="grow w-full max-w-300 mx-auto px-6 md:px-grid-margin py-10">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-section-gap-desktop">
        <div className="flex flex-col gap-6 order-2 md:order-1">
          <div className="inline-flex items-center gap-2 bg-surface-container-highest px-3 py-1.5 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
            <span className="font-label-code text-label-code text-brand-slate">
              Available for New Projects
            </span>
          </div>
          <h1 className="font-display text-display text-brand-navy">
            Architecting Robust Digital Solutions.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
            I am Bilal Shandyarta Syamsudin, a Full-Stack Developer specializing
            in scalable enterprise applications, secure data bridges, and
            high-performance technical ecosystems.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              className="bg-brand-navy text-white px-6 py-3 rounded-xl font-label-code text-label-code hover:opacity-90 transition-opacity"
              href="#works"
            >
              View Selected Works
            </a>
            <a
              className="border border-brand-slate text-brand-navy px-6 py-3 rounded-xl font-label-code text-label-code hover:bg-surface-container-highest transition-colors"
              href="#contact"
            >
              Get in Touch
            </a>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative w-full max-w-100 aspect-3/4 bg-transparent">
            <img
              alt="Bilal Shandyarta Professional Portrait"
              className="w-full h-full object-cover object-top"
              src={meImage}
            />
          </div>
        </div>
      </section>

      {/* Technical Arsenal Section */}
      <section className="mb-section-gap-desktop">
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-label-caps text-label-caps text-brand-slate uppercase tracking-wider">
            Capabilities
          </span>
          <h2 className="font-headline-lg text-headline-lg text-brand-navy">
            Technical Arsenal
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-outline-variant p-6 rounded-xl hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-shadow group">
            <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg mb-4 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">terminal</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-brand-navy mb-2">
              Backend Engineering
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              Robust architecture and secure API development.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-surface-container text-brand-slate font-label-code text-label-code px-2 py-1 rounded">
                PHP
              </span>
              <span className="bg-surface-container text-brand-slate font-label-code text-label-code px-2 py-1 rounded">
                Laravel
              </span>
              <span className="bg-surface-container text-brand-slate font-label-code text-label-code px-2 py-1 rounded">
                MySQL
              </span>
            </div>
          </div>
          <div className="bg-white border border-outline-variant p-6 rounded-xl hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-shadow group">
            <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg mb-4 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">web</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-brand-navy mb-2">
              Frontend Interfaces
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              Responsive, highly interactive user experiences.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-surface-container text-brand-slate font-label-code text-label-code px-2 py-1 rounded">
                JavaScript
              </span>
              <span className="bg-surface-container text-brand-slate font-label-code text-label-code px-2 py-1 rounded">
                React
              </span>
              <span className="bg-surface-container text-brand-slate font-label-code text-label-code px-2 py-1 rounded">
                Tailwind
              </span>
            </div>
          </div>
          <div className="bg-white border border-outline-variant p-6 rounded-xl hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-shadow group">
            <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg mb-4 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">database</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-brand-navy mb-2">
              Systems Integration
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              Seamless data flow across complex platforms.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-surface-container text-brand-slate font-label-code text-label-code px-2 py-1 rounded">
                SAP
              </span>
              <span className="bg-surface-container text-brand-slate font-label-code text-label-code px-2 py-1 rounded">
                REST APIs
              </span>
              <span className="bg-surface-container text-brand-slate font-label-code text-label-code px-2 py-1 rounded">
                Git
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Journey Section */}
      <section className="mb-section-gap-desktop" id="experience">
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-label-caps text-label-caps text-brand-slate uppercase tracking-wider">
            Timeline
          </span>
          <h2 className="font-headline-lg text-headline-lg text-brand-navy">
            Professional Journey
          </h2>
        </div>
        <div className="relative border-l border-outline-variant ml-4 md:ml-6 space-y-12 pb-4">
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-brand-blue rounded-none border border-white"></div>
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
              <h3 className="font-headline-md text-headline-md text-brand-navy">
                PT. MULTI SPUNINDO JAYA
              </h3>
              <span className="font-label-code text-label-code text-brand-slate">
                Full-Stack Developer
              </span>
            </div>
            <p className="font-label-code text-label-code text-on-surface-variant mb-4">
              Present
            </p>
            <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-brand-blue rounded-none mt-2 shrink-0"></span>
                <span>
                  Architected and maintained enterprise-level applications
                  ensuring high availability.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-brand-blue rounded-none mt-2 shrink-0"></span>
                <span>
                  Developed secure data pipelines interfacing with legacy
                  systems.
                </span>
              </li>
            </ul>
          </div>
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-surface-container-high rounded-none border border-outline-variant"></div>
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
              <h3 className="font-headline-md text-headline-md text-brand-navy">
                PT. PYXIS Ultimate Solution
              </h3>
              <span className="font-label-code text-label-code text-brand-slate">
                Software Engineer
              </span>
            </div>
            <p className="font-label-code text-label-code text-on-surface-variant mb-4">
              Previous
            </p>
            <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-brand-blue rounded-none mt-2 shrink-0"></span>
                <span>
                  Implemented core features for client-facing logistics
                  dashboards.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-brand-blue rounded-none mt-2 shrink-0"></span>
                <span>
                  Optimized database queries resulting in a 30% reduction in
                  load times.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Selected Works Section */}
      <section className="mb-section-gap-desktop" id="works">
        <div className="flex flex-col gap-2 mb-12">
          <span className="font-label-caps text-label-caps text-brand-slate uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="font-headline-lg text-headline-lg text-brand-navy">
            Selected Works
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link className="group block" to="/project/msjchat">
            <div className="bg-white border border-outline-variant rounded-xl overflow-hidden hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-all">
              <div className="aspect-video bg-surface-container-low border-b border-outline-variant overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="MSJCHAT Enterprise"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU_az6vm8XlKsrfCFdNGdp4-Jk_-C781dVI8rRHwECDzHu-0Afpr6D52V8bAcP1yv0UVFoRtLoECU-zRbMVgqchQ--9383gxiDidlkOORy8qXxphmnHbAc7uAimK7ik9Av3WCD-QvRFfA1vmqVlxoeYh8_mhsXNy-yHndWNgyezYP5d0uVWJaGRhMABVIln5ldhBQh8c0JDxBRcdbkNSsiKUK9POThQfC4ZGzZULn_4tENdxjzDK0"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-md text-headline-md text-brand-navy group-hover:text-brand-blue transition-colors">
                    MSJCHAT Enterprise
                  </h3>
                  <span className="material-symbols-outlined text-brand-slate group-hover:text-brand-blue transition-colors">
                    arrow_outward
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                  Secure internal communication platform integrated with
                  corporate directory.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="font-label-code text-label-code text-brand-slate bg-surface-container px-2 py-1 rounded">
                    React
                  </span>
                  <span className="font-label-code text-label-code text-brand-slate bg-surface-container px-2 py-1 rounded">
                    WebSockets
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <Link className="group block" to="/project/logistics">
            <div className="bg-white border border-outline-variant rounded-xl overflow-hidden hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-all">
              <div className="aspect-video bg-surface-container-low border-b border-outline-variant overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Logistics Dashboard"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDireUgrVlejpNZL261i1HCtU-lisocD2Ep3CzOIoDPW3kCT-rPFTl92GeWHPT20hALwru5uGhwL6kd74nygNMrpjw8DmsurVFcGlZvvsFiLfRlbYz-MrBCfUfnA1LCjZKpI_QZ-pentak7iR-uQw7Bx1ws7b2wc9_oFV0PUX0x8-j0WQ0YZRbidTRac4kZHO1sn8lKhVP8vKmcJFZfNZrvKwAdOthFW-FzLbY2yn_q4jJEGgjGkqw"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-md text-headline-md text-brand-navy group-hover:text-brand-blue transition-colors">
                    Logistics Dashboard
                  </h3>
                  <span className="material-symbols-outlined text-brand-slate group-hover:text-brand-blue transition-colors">
                    arrow_outward
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                  Real-time tracking and resource allocation interface for fleet
                  management.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="font-label-code text-label-code text-brand-slate bg-surface-container px-2 py-1 rounded">
                    Laravel
                  </span>
                  <span className="font-label-code text-label-code text-brand-slate bg-surface-container px-2 py-1 rounded">
                    Vue.js
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <Link className="group block md:col-span-2" to="/project/sap">
            <div className="bg-white border border-outline-variant rounded-xl overflow-hidden hover:shadow-[0_4px_12px_rgba(30,41,59,0.05)] transition-all flex flex-col md:flex-row">
              <div className="aspect-video md:aspect-auto md:w-1/2 bg-surface-container-low border-b md:border-b-0 md:border-r border-outline-variant overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="SAP Data Bridge"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLRy7mLb3Qm-if_g3Z0_P4FFoC0jRszqvcWWEllY6bLb-WGLvF-TNhcFSJZFXn9TNvqSEnQkglSNILCW6qIwrXWYX3pGB-XcNIi9dKrEL97MDbri3Z8DkhrGRNp3DkjTCpD7_-yKAcc0vrJmEiZzY2zQSy8oCs2mU6t0l8U1PV6y7T1ts2dqSeq0RMd8LXzc9_9-DlCKAXf2IZrBAzOYFdpo1Z_fnY6H7HM-HIJSxOr8SXzHqpqz0"
                />
              </div>
              <div className="p-6 md:w-1/2 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-md text-headline-md text-brand-navy group-hover:text-brand-blue transition-colors">
                    SAP Data Bridge
                  </h3>
                  <span className="material-symbols-outlined text-brand-slate group-hover:text-brand-blue transition-colors">
                    arrow_outward
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                  Middleware solution synchronizing on-premise SAP databases
                  with cloud web applications.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="font-label-code text-label-code text-brand-slate bg-surface-container px-2 py-1 rounded">
                    PHP
                  </span>
                  <span className="font-label-code text-label-code text-brand-slate bg-surface-container px-2 py-1 rounded">
                    REST API
                  </span>
                  <span className="font-label-code text-label-code text-brand-slate bg-surface-container px-2 py-1 rounded">
                    SAP RFC
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
