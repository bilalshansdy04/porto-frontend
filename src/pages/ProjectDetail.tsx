import { Link } from "react-router-dom";

export function ProjectDetail() {
  return (
    <main className="flex-grow max-w-max-width mx-auto w-full px-grid-margin py-section-gap-mobile md:py-section-gap-desktop space-y-section-gap-mobile md:space-y-section-gap-desktop">
      {/* Hero Section */}
      <section className="flex flex-col items-start gap-6">
        <Link className="flex items-center text-[#3b82f6] font-body-md text-body-md hover:underline mb-4" to="/">
          <span className="material-symbols-outlined mr-2" style={{ fontSize: "18px" }}>arrow_back</span>
          Back to Projects
        </Link>
        <h1 className="font-display text-display text-primary max-w-3xl">MSJCHAT</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          A streamlined communication platform designed for modern teams, focusing on speed, reliability, and intuitive user experience.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="font-label-code text-label-code bg-[#f1f5f9] text-[#64748b] px-3 py-1 rounded">v2.1.0</span>
          <span className="font-label-code text-label-code bg-[#f1f5f9] text-[#64748b] px-3 py-1 rounded">React</span>
          <span className="font-label-code text-label-code bg-[#f1f5f9] text-[#64748b] px-3 py-1 rounded">Node.js</span>
          <span className="font-label-code text-label-code bg-[#f1f5f9] text-[#64748b] px-3 py-1 rounded">WebSocket</span>
        </div>
      </section>

      {/* Project Images (Bento Grid Style) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-grid-gutter">
        <div className="md:col-span-8 h-96 rounded-xl border border-outline-variant overflow-hidden bg-white project-card relative">
          <img className="w-full h-full object-cover" alt="MSJCHAT main interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDK4NHeGJJAE8_d5sGqeGZ013T7IpD_u_7RVgRPL04Nw7UDLgNrkvUBKLiam5FAFYUH9sc-0mdBfjLgSWlt4DShoLEy-V5O8rtY3E9-1QZa7HXfNoEE2ac-M83t8IUb4UQy4lecgfz7T2WHBlbEWxZTY73kxgE65aS7PXNeLrUSumvjmQkdZceDiQeutyDDwurJpEY2qKbD2Q9WLETHwVZTTJ-v-jjz_a1lcB49zuqSGXF6xqV8NBw" />
        </div>
        <div className="md:col-span-4 flex flex-col gap-grid-gutter">
          <div className="h-44 rounded-xl border border-outline-variant overflow-hidden bg-white project-card">
            <img className="w-full h-full object-cover" alt="MSJCHAT mobile application interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIaXtGKOdbvqzDzskFnZWJQCLObD4tAYVmINdUKKAxyOM-Vvh8V66R6kolIE7ae2iy5C0ydit9G4uT3bXXOEc0GfVgmvBj2xyzx-Uc-lgtovJ_71tl4lgv5P-wmROi6tkRJuEEJUsInHJZpxwdn6oWUcVHWPveVlsH0BCJIsJ_Zv9SNujncjfcDElZuHlc1MV6a_OJvhm8KIjEfuGikGF2x5Wfb2belCiVsm-FgH9gtlzswKf4LLs" />
          </div>
          <div className="flex-grow rounded-xl border border-outline-variant overflow-hidden bg-white project-card">
            <img className="w-full h-full object-cover" alt="Abstract representation of data flowing" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy_XhtPtnfvttX9k-pysxjisF6HYey9G5fnGKgQn1fSATzUfqDA2sGwMdswASbCPdXDIOGBMwhVzMgnfBowqeQ69iMKLr4Bqc7CvBYyTamMfPLn5GnIUOoInX2P--YmptWHj1-0_u98IJ8HteiXMD5yFqNZ6PUbx54ihplju_-NFMYUKXc8_nBtmi3i0dTktPeUIbIyJSmeG2LWnTtgDNbVJPR_2BtSYgPpKD2jnAUObbz686VCTA" />
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Sticky Navigation for Content */}
        <div className="md:col-span-3 hidden md:block">
          <div className="sticky top-24 space-y-4">
            <h3 className="font-label-caps text-label-caps text-secondary tracking-widest uppercase">Contents</h3>
            <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors" href="#what">What is this project?</a></li>
              <li><a className="hover:text-primary transition-colors" href="#how">How I built it</a></li>
              <li><a className="hover:text-primary transition-colors" href="#results">Results</a></li>
            </ul>
          </div>
        </div>

        {/* Text Content */}
        <div className="md:col-span-9 space-y-16">
          <div className="space-y-6" id="what">
            <h2 className="font-headline-lg text-headline-lg text-primary">What is this project?</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              MSJCHAT was conceived to solve the clutter and distraction often found in enterprise communication tools. The goal was to create a focused environment where teams can collaborate without the noise of unnecessary features. It prioritizes direct messaging and structured group channels with a highly responsive, minimalist interface.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              The core philosophy behind the design is "structural clarity." Every element on the screen serves a distinct purpose, reducing cognitive load for the user and allowing them to focus entirely on the conversation and the work at hand.
            </p>
          </div>

          <div className="w-full h-px bg-outline-variant opacity-50"></div>

          <div className="space-y-6" id="how">
            <h2 className="font-headline-lg text-headline-lg text-primary">How I built it</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              The architecture is designed for low latency and high reliability. The frontend is built as a Single Page Application (SPA) to ensure fluid transitions between chats, while the backend utilizes an event-driven model to handle real-time message delivery efficiently.
            </p>
            <div className="bg-white p-8 rounded-xl border border-outline-variant mt-6">
              <h4 className="font-headline-md text-headline-md text-primary mb-4">Key Technical Decisions</h4>
              <ul className="space-y-4 font-body-md text-body-md text-on-surface-variant pl-4">
                <li className="custom-list-item"><strong>Real-time Engine:</strong> Implemented a custom WebSocket solution to guarantee sub-100ms message delivery times, avoiding the overhead of heavier third-party services.</li>
                <li className="custom-list-item"><strong>State Management:</strong> Utilized a normalized state shape on the client side to efficiently manage complex conversational data and minimize re-renders.</li>
                <li className="custom-list-item"><strong>Design System:</strong> Developed a strict, token-based design system (much like this portfolio) to ensure absolute visual consistency across all components.</li>
              </ul>
            </div>
          </div>

          <div className="w-full h-px bg-outline-variant opacity-50"></div>

          <div className="space-y-6" id="results">
            <h2 className="font-headline-lg text-headline-lg text-primary">Results</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              The initial rollout saw significant improvements in team communication metrics. Users reported feeling less overwhelmed compared to previous tools, and the streamlined interface led to faster onboarding times for new team members.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div className="p-6 border border-outline-variant rounded-xl bg-white text-center project-card">
                <div className="font-label-code text-[32px] font-medium text-primary mb-2">~50ms</div>
                <div className="font-label-caps text-label-caps text-secondary">Message Latency</div>
              </div>
              <div className="p-6 border border-outline-variant rounded-xl bg-white text-center project-card">
                <div className="font-label-code text-[32px] font-medium text-primary mb-2">99.9%</div>
                <div className="font-label-caps text-label-caps text-secondary">Uptime</div>
              </div>
              <div className="p-6 border border-outline-variant rounded-xl bg-white text-center project-card">
                <div className="font-label-code text-[32px] font-medium text-primary mb-2">40%</div>
                <div className="font-label-caps text-label-caps text-secondary">Faster Onboarding</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center pt-12 pb-8">
        <Link className="inline-flex items-center px-6 py-3 border border-[#64748b] rounded-lg font-body-md text-body-md text-primary hover:bg-[#f1f5f9] transition-colors" to="/">
          <span className="material-symbols-outlined mr-2" style={{ fontSize: "20px" }}>arrow_back</span>
          Back to Projects
        </Link>
      </div>
    </main>
  );
}
