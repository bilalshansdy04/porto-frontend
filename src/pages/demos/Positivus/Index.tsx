import { useState, useEffect } from "react";

interface ServiceItem {
  id: number;
  title: [string, string];
  theme: "gray" | "green" | "dark";
  src: string;
}

const SERVICE_THEMES = {
  gray: {
    cardBg: "bg-[#F3F3F3]",
    badgeBg: "bg-[#B9FF66]",
    textColor: "text-black",
  },
  green: {
    cardBg: "bg-[#B9FF66]",
    badgeBg: "bg-[#ffffff]",
    textColor: "text-black",
  },
  dark: {
    cardBg: "bg-[#191A23]",
    badgeBg: "bg-[#ffffff]",
    textColor: "text-white",
  },
} as const;

const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: ["Search engine", "optimization"],
    theme: "gray",
    src: "1.svg",
  },
  {
    id: 2,
    title: ["Pay-per-click", "advertising"],
    theme: "green",
    src: "2.svg",
  },
  {
    id: 3,
    title: ["Social Media", "Marketing"],
    theme: "dark",
    src: "3.svg",
  },
  {
    id: 4,
    title: ["Email", "Marketing"],
    theme: "gray",
    src: "4.svg",
  },
  {
    id: 5,
    title: ["Content", "Creation"],
    theme: "green",
    src: "5.svg",
  },
  {
    id: 6,
    title: ["Analytics and", "Tracking"],
    theme: "dark",
    src: "6.svg",
  },
];

interface ProcessStep {
  id: number;
  step: string;
  title: string;
  description: string;
}

const WORKING_PROCESS: ProcessStep[] = [
  {
    id: 1,
    step: "01",
    title: "Consultation",
    description:
      "During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements.",
  },
  {
    id: 2,
    step: "02",
    title: "Research and Strategy Development",
    description:
      "We conduct in-depth research on your industry, competitors, and target audience to craft a tailored, high-impact marketing strategy designed for sustainable growth.",
  },
  {
    id: 3,
    step: "03",
    title: "Implementation",
    description:
      "Our dedicated team rolls out the strategy across all selected digital channels, launching campaigns with creative excellence and precision execution.",
  },
  {
    id: 4,
    step: "04",
    title: "Monitoring and Optimization",
    description:
      "We continuously monitor real-time campaign performance and user analytics, proactively optimizing each channel to maximize ROI and efficiency.",
  },
  {
    id: 5,
    step: "05",
    title: "Reporting and Communication",
    description:
      "You receive clear, transparent, and regular reports outlining progress and key achievements, accompanied by collaborative strategy check-ins.",
  },
  {
    id: 6,
    step: "06",
    title: "Continual Improvement",
    description:
      "We continuously refine our approach based on ongoing insights, testing new ideas and iterating to keep your business ahead of the competition.",
  },
];

interface TeamMember {
  id: number;
  name: string;
  role: string;
  src: string;
  description: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "John Smith",
    role: "CEO and Founder",
    src: "John Smith.png",
    description:
      "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy",
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "Director of Operations",
    src: "Jane Doe.png",
    description:
      "7+ years of experience in project management and team leadership. Strong organizational and communication skills",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Senior SEO Specialist",
    src: "Michael Brown.png",
    description:
      "5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization",
  },
  {
    id: 4,
    name: "Emily Johnson",
    role: "PPC Manager",
    src: "Emily Johnson.png",
    description:
      "3+ years of experience in paid search advertising. Skilled in campaign management and performance analysis",
  },
  {
    id: 5,
    name: "Brian Williams",
    role: "Social Media Specialist",
    src: "Brian Williams.png",
    description:
      "4+ years of experience in social media marketing. Proficient in creating and scheduling content, analyzing metrics, and building engagement",
  },
  {
    id: 6,
    name: "Sarah Kim",
    role: "Content Creator",
    src: "Sarah Kim.png",
    description:
      "2+ years of experience in writing and editing. Skilled in creating compelling, SEO-optimized content for various industries",
  },
];

interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  role: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    quote:
      "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence.",
    author: "John Smith",
    role: "Marketing Director at XYZ Corp",
  },
  {
    id: 2,
    quote:
      "Working with Positivus has transformed our digital strategy. Their deep expertise in SEO and content marketing propelled our organic conversions by 140% in just six months. They feel like a true extension of our in-house marketing team.",
    author: "Sarah Jenkins",
    role: "Head of Growth at Horizon Tech",
  },
  {
    id: 3,
    quote:
      "Their team's attention to detail and dedication to data-driven decision making is unmatched. The PPC campaigns they structured delivered our lowest customer acquisition cost to date. Transparent communication and fantastic results throughout.",
    author: "Michael Chang",
    role: "VP of E-commerce at Nova Brands",
  },
  {
    id: 4,
    quote:
      "From initial audit to full-scale campaign rollout, Positivus exceeded every KPI we set. Their reporting is exceptionally transparent, giving our executive board total clarity into our marketing ROI. A world-class agency partner.",
    author: "Elena Rostova",
    role: "Chief Marketing Officer at Starlight Global",
  },
  {
    id: 5,
    quote:
      "Positivus helped us scale our brand from a local retailer to a national competitor. Their social media marketing and creative storytelling resonated deeply with our target audience, driving unprecedented customer engagement and sales.",
    author: "Brian Williams",
    role: "Founder & CEO at Pulse Retail",
  },
];

interface SectionHeadingProps {
  title: string;
  description: string;
  className?: string;
}

function SectionHeading({
  title,
  description,
  className = "mb-10 sm:mb-14 lg:mb-20",
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 lg:gap-10 ${className}`}
    >
      <div className="flex justify-center items-center bg-[#B9FF66] px-2.5 py-1 rounded-[7px] shrink-0">
        <h2 className="font-medium text-2xl sm:text-3xl lg:text-[40px] leading-tight text-black">
          {title}
        </h2>
      </div>
      <div className="max-w-xl">
        <p className="text-sm sm:text-base lg:text-[18px] text-black/80 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function PositivusLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openStep, setOpenStep] = useState<number | null>(1);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [contactType, setContactType] = useState<"say-hi" | "get-quote">(
    "say-hi",
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1,
    );
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1,
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) nextTestimonial();
    if (diff < -50) prevTestimonial();
    setTouchStart(null);
  };

  // Carousel display items with symmetrical start/end clones so active card is always centered
  const carouselDisplayItems = [
    {
      ...TESTIMONIALS[TESTIMONIALS.length - 1],
      originalIndex: TESTIMONIALS.length - 1,
      uniqueKey: "clone-start",
      isClone: true,
    },
    ...TESTIMONIALS.map((t, idx) => ({
      ...t,
      originalIndex: idx,
      uniqueKey: `real-${t.id}`,
      isClone: false,
    })),
    {
      ...TESTIMONIALS[0],
      originalIndex: 0,
      uniqueKey: "clone-end",
      isClone: true,
    },
  ];

  return (
    <div className="bg-white min-h-screen font-['Space_Grotesk',sans-serif] text-black overflow-x-hidden selection:bg-[#B9FF66] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-4 sm:pt-6 lg:pt-10">
        {/* ================= HEADER / NAVBAR ================= */}
        <header className="relative mb-6 sm:mb-10 lg:mb-14">
          <nav className="flex justify-between items-center py-2 sm:py-4">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center cursor-pointer focus:outline-none"
            >
              <img
                src="Positivus Logo.svg"
                alt="Positivus Logo"
                className="h-7 sm:h-9 w-auto object-contain"
                decoding="async"
              />
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              <div className="flex gap-6 xl:gap-10 text-base xl:text-lg font-normal">
                <button
                  onClick={() => scrollToSection("about-us")}
                  className="hover:text-[#75b329] transition-colors cursor-pointer"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-[#75b329] transition-colors cursor-pointer"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("use-cases")}
                  className="hover:text-[#75b329] transition-colors cursor-pointer"
                >
                  Use Cases
                </button>
                <button
                  onClick={() => scrollToSection("process")}
                  className="hover:text-[#75b329] transition-colors cursor-pointer"
                >
                  Process
                </button>
                <button
                  onClick={() => scrollToSection("team")}
                  className="hover:text-[#75b329] transition-colors cursor-pointer"
                >
                  Team
                </button>
              </div>
              <button
                onClick={() => {
                  setContactType("get-quote");
                  scrollToSection("contact-us");
                }}
                className="bg-transparent hover:bg-[#e5fcca] px-6 xl:px-8.75 py-3 xl:py-4 rounded-[14px] border border-black transition-all cursor-pointer font-medium text-sm xl:text-base active:scale-95"
              >
                Request a quote
              </button>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-black/20 hover:bg-black/5 active:scale-90 transition-transform cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </nav>

          {/* Mobile Drawer Menu Modal */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex flex-col justify-start pt-16 px-5 transition-opacity duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                className="bg-white rounded-[24px] p-6 border-2 border-black shadow-2xl flex flex-col gap-5 w-full max-w-sm mx-auto animate-fade-in"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center pb-3 border-b border-black/10">
                  <img
                    src="Positivus Logo.svg"
                    alt="Positivus Logo"
                    className="h-6 w-auto"
                  />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 rounded-full hover:bg-black/10 active:scale-90 transition-transform cursor-pointer"
                    aria-label="Close menu"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col gap-2 font-medium text-lg">
                  <button
                    onClick={() => scrollToSection("about-us")}
                    className="p-3 text-left hover:bg-[#B9FF66] rounded-xl transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="p-3 text-left hover:bg-[#B9FF66] rounded-xl transition-colors cursor-pointer"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => scrollToSection("use-cases")}
                    className="p-3 text-left hover:bg-[#B9FF66] rounded-xl transition-colors cursor-pointer"
                  >
                    Use Cases
                  </button>
                  <button
                    onClick={() => scrollToSection("process")}
                    className="p-3 text-left hover:bg-[#B9FF66] rounded-xl transition-colors cursor-pointer"
                  >
                    Process
                  </button>
                  <button
                    onClick={() => scrollToSection("team")}
                    className="p-3 text-left hover:bg-[#B9FF66] rounded-xl transition-colors cursor-pointer"
                  >
                    Team
                  </button>
                </div>

                <button
                  onClick={() => {
                    setContactType("get-quote");
                    scrollToSection("contact-us");
                  }}
                  className="w-full bg-[#191A23] hover:bg-[#B9FF66] text-white hover:text-black py-3.5 rounded-[14px] font-medium transition-colors cursor-pointer text-center active:scale-95"
                >
                  Request a quote
                </button>
              </div>
            </div>
          )}
        </header>

        <main>
          {/* ================= 1. HERO SECTION ================= */}
          <section
            id="hero"
            className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-8 my-6 sm:my-10 lg:my-14"
          >
            <div className="flex flex-col items-start gap-5 sm:gap-7 lg:gap-8 w-full lg:w-1/2">
              <h1 className="font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[60px] leading-tight lg:leading-[1.15]">
                Navigating the digital landscape for success
              </h1>
              <p className="font-normal text-base sm:text-lg lg:text-[20px] text-black/80 leading-relaxed">
                Our digital marketing agency helps businesses grow and succeed
                online through a range of services including SEO, PPC, social
                media marketing, and content creation.
              </p>
              <button
                onClick={() => scrollToSection("contact-us")}
                className="bg-[#191A23] hover:bg-[#2e303d] px-6 sm:px-8.75 py-4 sm:py-5 rounded-[14px] text-white font-medium text-base sm:text-lg transition-all active:scale-95 cursor-pointer w-full sm:w-auto text-center"
              >
                Book a consultation
              </button>
            </div>
            <div className="flex justify-center lg:justify-end items-center w-full lg:w-1/2">
              <img
                src="Illustration.jpg"
                alt="Digital marketing navigation illustration"
                fetchPriority="high"
                decoding="async"
                className="w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[560px] h-auto object-contain"
              />
            </div>
          </section>

          {/* ================= 2. CLIENT LOGOS SECTION ================= */}
          <section
            id="about-us"
            className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-10 items-center justify-items-center mb-16 sm:mb-24 lg:mb-32 w-full py-4 overflow-hidden"
          >
            <img
              src="amazon.jpg"
              alt="amazon"
              loading="lazy"
              decoding="async"
              className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all max-h-7 sm:max-h-9 w-auto object-contain"
            />
            <img
              src="dribble.jpg"
              alt="dribble"
              loading="lazy"
              decoding="async"
              className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all max-h-7 sm:max-h-9 w-auto object-contain"
            />
            <img
              src="hubspot.jpg"
              alt="hubspot"
              loading="lazy"
              decoding="async"
              className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all max-h-7 sm:max-h-9 w-auto object-contain"
            />
            <img
              src="notion.jpg"
              alt="notion"
              loading="lazy"
              decoding="async"
              className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all max-h-7 sm:max-h-9 w-auto object-contain"
            />
            <img
              src="netflix.jpg"
              alt="netflix"
              loading="lazy"
              decoding="async"
              className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all max-h-7 sm:max-h-9 w-auto object-contain"
            />
            <img
              src="zoom.jpg"
              alt="zoom"
              loading="lazy"
              decoding="async"
              className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all max-h-7 sm:max-h-9 w-auto object-contain"
            />
          </section>

          {/* ================= 3. SERVICES SECTION ================= */}
          <section id="services" className="mb-16 sm:mb-24 lg:mb-32">
            <SectionHeading
              title="Services"
              description="At our digital marketing agency, we offer a range of services to help businesses grow and succeed online. These services include:"
            />

            <div className="gap-6 sm:gap-8 lg:gap-10 grid grid-cols-1 lg:grid-cols-2 mx-auto w-full">
              {SERVICES.map((service) => {
                const theme = SERVICE_THEMES[service.theme];
                const isDark = service.theme === "dark";

                return (
                  <div
                    key={service.id}
                    className={`flex flex-col sm:flex-row justify-between gap-6 sm:gap-8 ${theme.cardBg} shadow-[0_5px_0_0_rgba(25,26,35,100%)] p-6 sm:p-8 md:p-10 lg:p-12 border border-black rounded-[30px] sm:rounded-[45px] transition-transform duration-300 hover:-translate-y-1`}
                  >
                    <div className="flex flex-col justify-between gap-6 sm:gap-8">
                      <div className="flex flex-col items-start gap-1">
                        {service.title.map((line, idx) => (
                          <div
                            key={idx}
                            className={`flex justify-center items-center ${theme.badgeBg} px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-[5px]`}
                          >
                            <h3 className="font-medium text-lg sm:text-xl lg:text-[24px] leading-tight text-black">
                              {line}
                            </h3>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => scrollToSection("contact-us")}
                        className="group flex items-center gap-3 cursor-pointer select-none w-fit"
                      >
                        {isDark ? (
                          <img
                            src="icons/Arrow 2.svg"
                            alt="Arrow"
                            loading="lazy"
                            decoding="async"
                            className="w-8 h-8 sm:w-9 sm:h-9 group-hover:rotate-30 group-hover:scale-110 transition-transform duration-300 ease-out"
                          />
                        ) : (
                          <img
                            src="icons/Arrow 1.svg"
                            alt="Arrow"
                            loading="lazy"
                            decoding="async"
                            className="w-8 h-8 sm:w-9 sm:h-9 group-hover:rotate-30 group-hover:scale-110 transition-transform duration-300 ease-out"
                          />
                        )}
                        <span
                          className={`${theme.textColor} font-medium text-base sm:text-lg group-hover:underline`}
                        >
                          Learn More
                        </span>
                      </button>
                    </div>
                    <div className="flex justify-center sm:justify-end items-center self-center sm:self-auto shrink-0">
                      <img
                        src={service.src}
                        alt="Service illustration"
                        loading="lazy"
                        decoding="async"
                        className="w-36 sm:w-40 md:w-48 lg:w-52 h-auto object-contain"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ================= 4. CTA BANNER SECTION ================= */}
          <section className="mb-16 sm:mb-24 lg:mb-32">
            <div className="relative flex flex-col md:flex-row items-center justify-between bg-[#F3F3F3] p-8 sm:p-12 lg:px-15 lg:py-14 rounded-[30px] sm:rounded-[45px] w-full overflow-hidden">
              <div className="flex flex-col justify-center w-full md:max-w-md lg:max-w-lg z-10">
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="font-medium text-2xl sm:text-3xl lg:text-[30px] leading-tight">
                    Let’s make things happen
                  </h3>
                  <p className="text-sm sm:text-base text-black/80 leading-relaxed">
                    Contact us today to learn more about how our digital
                    marketing services can help your business grow and succeed
                    online.
                  </p>
                  <button
                    onClick={() => {
                      setContactType("get-quote");
                      scrollToSection("contact-us");
                    }}
                    className="bg-black hover:bg-[#2e303d] px-6 sm:px-8.75 py-4 sm:py-5 rounded-[14px] text-white font-medium transition-colors cursor-pointer w-full sm:w-auto text-center active:scale-95"
                  >
                    Get your free proposal
                  </button>
                </div>
              </div>
              <div className="hidden md:flex justify-end items-center md:w-1/2 lg:w-auto shrink-0">
                <img
                  src="Illustration 2.svg"
                  alt="Let's make things happen illustration"
                  loading="lazy"
                  decoding="async"
                  className="w-64 sm:w-72 lg:w-96 h-auto object-contain"
                />
              </div>
            </div>
          </section>

          {/* ================= 5. CASE STUDIES SECTION ================= */}
          <section id="use-cases" className="mb-16 sm:mb-24 lg:mb-32">
            <SectionHeading
              title="Case Studies"
              description="Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies"
            />

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-[#191A23] p-6 sm:p-10 lg:px-15 lg:py-16 rounded-[30px] sm:rounded-[45px]">
              {[
                "For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.",
                "For a B2B software company, we revamped the SEO strategy and achieved a 120% increase in qualified organic demo requests within 4 months.",
                "For an e-commerce retail brand, our multi-channel social media campaign drove a 4x return on ad spend and doubled monthly online orders.",
              ].map((desc, idx) => (
                <div key={idx} className="contents lg:block lg:flex-1">
                  <div className="flex flex-col justify-between space-y-4 lg:space-y-6">
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                      {desc}
                    </p>
                    <button
                      onClick={() => scrollToSection("contact-us")}
                      className="group flex items-center gap-2 text-[#B9FF66] text-base sm:text-lg cursor-pointer w-fit"
                    >
                      <span className="group-hover:underline font-medium">
                        Learn More
                      </span>
                      <img
                        src="icons/Arrow Single.svg"
                        alt="Arrow"
                        loading="lazy"
                        decoding="async"
                        className="inline-block group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                  {idx < 2 && (
                    <div className="bg-white/20 h-px w-full lg:h-full lg:w-px my-2 lg:my-0 lg:mx-6 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ================= 6. OUR WORKING PROCESS SECTION ================= */}
          <section id="process" className="mb-16 sm:mb-24 lg:mb-32">
            <SectionHeading
              title="Our Working Process"
              description="Step-by-Step Guide to Achieving Your Business Goals"
            />

            <div className="space-y-4 sm:space-y-6 lg:space-y-7.5">
              {WORKING_PROCESS.map((step) => {
                const isOpen = openStep === step.id;

                return (
                  <div
                    key={step.id}
                    className={`px-5 sm:px-8 lg:px-15 py-5 sm:py-8 lg:py-10 rounded-[25px] sm:rounded-[45px] w-full border border-black shadow-[0_5px_0_0_rgba(25,26,35,100%)] transition-colors duration-300 ease-out ${
                      isOpen ? "bg-[#B9FF66]" : "bg-[#f5f5f5]"
                    }`}
                  >
                    <div
                      className="group flex justify-between items-center gap-3 cursor-pointer select-none"
                      onClick={() => setOpenStep(isOpen ? null : step.id)}
                    >
                      <div className="flex items-center gap-3 sm:gap-6">
                        <span className="font-medium text-3xl sm:text-4xl lg:text-[60px] leading-none">
                          {step.step}
                        </span>
                        <h3 className="font-medium text-base sm:text-xl lg:text-[30px] leading-snug">
                          {step.title}
                        </h3>
                      </div>
                      <div className="relative flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14.5 lg:h-14.5 active:scale-90 group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <img
                          src="icons/Plus icon.svg"
                          alt="Plus"
                          loading="lazy"
                          decoding="async"
                          className={`absolute inset-0 w-full h-full transition-all duration-300 transform ${
                            isOpen
                              ? "opacity-0 rotate-90 scale-50 pointer-events-none"
                              : "opacity-100 rotate-0 scale-100"
                          }`}
                        />
                        <img
                          src="icons/Minus icon.svg"
                          alt="Minus"
                          loading="lazy"
                          decoding="async"
                          className={`absolute inset-0 w-full h-full transition-all duration-300 transform ${
                            isOpen
                              ? "opacity-100 rotate-0 scale-100"
                              : "opacity-0 -rotate-90 scale-50 pointer-events-none"
                          }`}
                        />
                      </div>
                    </div>

                    <div
                      className={`grid transition-[grid-template-rows,padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen
                          ? "grid-rows-[1fr] pt-4 sm:pt-6 lg:pt-7.5"
                          : "grid-rows-[0fr] pt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div
                          className={`transition-all duration-300 transform ${
                            isOpen
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 -translate-y-2"
                          }`}
                        >
                          <div className="bg-black/20 mb-4 sm:mb-6 lg:mb-7.5 w-full h-px" />
                          <p className="text-sm sm:text-base lg:text-[18px] text-black/90 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ================= 7. TEAM SECTION ================= */}
          <section id="team" className="mb-16 sm:mb-24 lg:mb-32">
            <SectionHeading
              title="Team"
              description="Meet the skilled and experienced team behind our successful digital marketing strategies"
            />

            <div className="gap-6 sm:gap-8 lg:gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  className="space-y-5 sm:space-y-6 bg-white shadow-[0_5px_0_0_rgba(25,26,35,100%)] p-6 sm:p-8 lg:p-10 border border-black rounded-[30px] sm:rounded-[45px] w-full"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-end gap-4 sm:gap-5">
                      <img
                        src={member.src}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        className="w-20 h-20 sm:w-24 sm:h-24 object-contain shrink-0"
                      />
                      <div>
                        <h3 className="font-medium text-lg sm:text-[20px] text-black leading-tight">
                          {member.name}
                        </h3>
                        <p className="text-sm sm:text-[16px] text-black/80">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    <a
                      href="#linkedin"
                      className="flex justify-center items-center bg-black hover:bg-[#2e303d] rounded-full w-8 h-8 sm:w-8.5 sm:h-8.5 transition-colors cursor-pointer shrink-0"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <img
                        src="icons/linkedin.svg"
                        alt="LinkedIn"
                        loading="lazy"
                        decoding="async"
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                      />
                    </a>
                  </div>

                  <div className="bg-black/20 w-full h-px" />

                  <p className="font-normal text-sm sm:text-base text-black/90 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-8 sm:mt-10">
              <button
                onClick={() => scrollToSection("contact-us")}
                className="bg-[#191A23] hover:bg-[#2e303d] px-8.75 py-4 sm:py-5 rounded-[14px] w-full sm:w-auto text-white font-medium transition-colors cursor-pointer text-center active:scale-95"
              >
                See all team
              </button>
            </div>
          </section>

          {/* ================= 8. TESTIMONIALS SECTION ================= */}
          <section id="testimonials" className="mb-16 sm:mb-24 lg:mb-32">
            <SectionHeading
              title="Testimonials"
              description="Hear from Our Satisfied Clients: Read Our Testimonials to Learn More about Our Digital Marketing Services"
            />

            <div className="bg-[#191A23] py-12 sm:py-16 md:py-20 rounded-[30px] sm:rounded-[45px] overflow-hidden select-none">
              {/* Sliding Track Container */}
              <div
                className="w-full overflow-hidden [--carousel-card-width:min(606px,84vw)] [--carousel-gap:16px] sm:[--carousel-gap:24px] md:[--carousel-card-width:606px] md:[--carousel-gap:50px]"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex items-center transition-transform duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform"
                  style={{
                    gap: "var(--carousel-gap)",
                    transform: `translateX(calc(50% - (var(--carousel-card-width) / 2) - ${
                      currentTestimonial + 1
                    } * (var(--carousel-card-width) + var(--carousel-gap))))`,
                  }}
                >
                  {carouselDisplayItems.map((item) => {
                    const isActive =
                      currentTestimonial === item.originalIndex &&
                      !item.isClone;
                    return (
                      <div
                        key={item.uniqueKey}
                        onClick={() =>
                          setCurrentTestimonial(item.originalIndex)
                        }
                        style={{ width: "var(--carousel-card-width)" }}
                        className={`shrink-0 transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                          isActive
                            ? "opacity-100 scale-100 cursor-default"
                            : "opacity-40 scale-90 sm:scale-95 hover:opacity-75 cursor-pointer"
                        }`}
                      >
                        <div className="mx-auto w-full max-w-151.5">
                          {/* Speech Bubble Box with Bubble.svg */}
                          <div className="relative drop-shadow-[0_4px_14px_rgba(0,0,0,0.3)] w-full hover:scale-[1.01] transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]">
                            <img
                              src="icons/Bubble.svg"
                              alt="Testimonial bubble"
                              loading="lazy"
                              decoding="async"
                              className="block w-full h-auto pointer-events-none select-none"
                            />
                            <div className="top-0 bottom-[12%] absolute inset-x-0 flex justify-center items-center px-4 sm:px-8 md:px-12 py-3 sm:py-6">
                              <p className="text-[11px] sm:text-[14px] md:text-[16px] lg:text-[17px] text-white text-left leading-relaxed">
                                "{item.quote}"
                              </p>
                            </div>
                          </div>

                          {/* Author Info */}
                          <div className="mt-4 sm:mt-6 ml-[13.7%]">
                            <h4 className="font-medium text-[#B9FF66] text-base sm:text-lg lg:text-[20px] leading-tight">
                              {item.author}
                            </h4>
                            <p className="text-xs sm:text-sm lg:text-[16px] text-white/90 leading-normal">
                              {item.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Carousel Controls (Arrows + Indicator Stars) */}
              <div className="flex justify-center items-center gap-6 sm:gap-16 lg:gap-24 mt-8 sm:mt-14 lg:mt-20">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  aria-label="Previous Testimonial"
                  className="p-2 text-white hover:text-[#B9FF66] hover:scale-125 active:scale-75 transition-all duration-300 cursor-pointer"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex items-center gap-3 sm:gap-5">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentTestimonial(idx)}
                      aria-label={`Go to testimonial ${idx + 1}`}
                      className="p-1 focus:outline-none hover:scale-125 active:scale-90 transition-transform cursor-pointer"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        className={`transition-all duration-300 ${
                          currentTestimonial === idx
                            ? "text-[#B9FF66] scale-125 drop-shadow-[0_0_8px_rgba(185,255,102,0.6)]"
                            : "text-white opacity-70 hover:opacity-100"
                        }`}
                        fill="currentColor"
                      >
                        <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" />
                      </svg>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextTestimonial}
                  aria-label="Next Testimonial"
                  className="p-2 text-white hover:text-[#B9FF66] hover:scale-125 active:scale-75 transition-all duration-300 cursor-pointer"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </section>

          {/* ================= 9. CONTACT US SECTION ================= */}
          <section id="contact-us" className="mb-16 sm:mb-24 lg:mb-32">
            <SectionHeading
              title="Contact Us"
              description="Connect with Us: Let's Discuss Your Digital Marketing Needs"
            />
            <div className="relative flex justify-between items-center bg-[#F3F3F3] p-6 sm:p-10 md:p-14 lg:p-20 rounded-[30px] sm:rounded-[45px] overflow-hidden">
              <div className="z-10 relative w-full lg:max-w-xl">
                <form onSubmit={handleContactSubmit}>
                  {/* Radio Buttons (Say Hi / Get a Quote) */}
                  <div className="flex items-center gap-6 sm:gap-9 mb-6 sm:mb-8">
                    <label
                      onClick={() => setContactType("say-hi")}
                      className="group flex items-center gap-3 cursor-pointer select-none"
                    >
                      <div className="relative flex justify-center items-center bg-white border border-black rounded-full w-6 h-6 sm:w-7 sm:h-7 transition-all">
                        {contactType === "say-hi" && (
                          <div className="bg-[#B9FF66] rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </div>
                      <span className="text-sm sm:text-base text-black font-medium">
                        Say Hi
                      </span>
                    </label>

                    <label
                      onClick={() => setContactType("get-quote")}
                      className="group flex items-center gap-3 cursor-pointer select-none"
                    >
                      <div className="relative flex justify-center items-center bg-white border border-black rounded-full w-6 h-6 sm:w-7 sm:h-7 transition-all">
                        {contactType === "get-quote" && (
                          <div className="bg-[#B9FF66] rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </div>
                      <span className="text-sm sm:text-base text-black font-medium">
                        Get a Quote
                      </span>
                    </label>
                  </div>

                  {/* Form Inputs */}
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block mb-1.5 text-sm sm:text-base font-normal text-black"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-white px-5 sm:px-7.5 py-3.5 sm:py-4.5 border border-black rounded-[14px] focus:outline-none focus:ring-[#B9FF66] focus:ring-2 w-full text-sm sm:text-base text-black placeholder:text-[#898989] transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block mb-1.5 text-sm sm:text-base font-normal text-black"
                      >
                        Email*
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white px-5 sm:px-7.5 py-3.5 sm:py-4.5 border border-black rounded-[14px] focus:outline-none focus:ring-[#B9FF66] focus:ring-2 w-full text-sm sm:text-base text-black placeholder:text-[#898989] transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block mb-1.5 text-sm sm:text-base font-normal text-black"
                      >
                        Message*
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-white px-5 sm:px-7.5 py-3.5 sm:py-4.5 border border-black rounded-[14px] focus:outline-none focus:ring-[#B9FF66] focus:ring-2 w-full min-h-[140px] text-sm sm:text-base text-black placeholder:text-[#898989] transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="mt-8 sm:mt-10">
                    <button
                      type="submit"
                      className="bg-[#191A23] hover:bg-[#B9FF66] px-8 py-4 sm:py-5 rounded-[14px] w-full font-medium text-base sm:text-lg text-white hover:text-black active:scale-[0.98] transition-all duration-300 cursor-pointer text-center"
                    >
                      {formSubmitted ? "Message Sent! ✓" : "Send Message"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Illustration3.svg */}
              <div className="hidden lg:flex top-1/2 -right-28 xl:-right-12 absolute justify-center items-center -translate-y-1/2 pointer-events-none select-none">
                <img
                  src="Illustration3.svg"
                  alt="Contact Illustration"
                  loading="lazy"
                  decoding="async"
                  className="w-130 xl:w-162.5 max-w-none h-auto object-contain"
                />
              </div>
            </div>
          </section>

          {/* ================= 10. FOOTER SECTION ================= */}
          <footer className="bg-[#191A23] p-6 sm:p-10 lg:p-14 rounded-t-[30px] sm:rounded-t-[45px] text-white">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 mb-10 sm:mb-14">
              <div>
                <img
                  src="Positivus Logo White.svg"
                  alt="Positivus Logo"
                  loading="lazy"
                  decoding="async"
                  className="w-36 sm:w-40 h-auto"
                />
              </div>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm sm:text-base">
                <button
                  onClick={() => scrollToSection("about-us")}
                  className="underline hover:text-[#B9FF66] transition-colors cursor-pointer"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="underline hover:text-[#B9FF66] transition-colors cursor-pointer"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("use-cases")}
                  className="underline hover:text-[#B9FF66] transition-colors cursor-pointer"
                >
                  Use Cases
                </button>
                <button
                  onClick={() => scrollToSection("process")}
                  className="underline hover:text-[#B9FF66] transition-colors cursor-pointer"
                >
                  Process
                </button>
                <button
                  onClick={() => scrollToSection("team")}
                  className="underline hover:text-[#B9FF66] transition-colors cursor-pointer"
                >
                  Team
                </button>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="icons/Social icon.svg"
                  alt="LinkedIn"
                  loading="lazy"
                  decoding="async"
                  className="w-7 h-7 sm:w-8 sm:h-8 hover:opacity-80 transition-opacity cursor-pointer"
                />
                <img
                  src="icons/Social icon-1.svg"
                  alt="Facebook"
                  loading="lazy"
                  decoding="async"
                  className="w-7 h-7 sm:w-8 sm:h-8 hover:opacity-80 transition-opacity cursor-pointer"
                />
                <img
                  src="icons/Social icon-2.svg"
                  alt="Twitter"
                  loading="lazy"
                  decoding="async"
                  className="w-7 h-7 sm:w-8 sm:h-8 hover:opacity-80 transition-opacity cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 items-start mb-10 sm:mb-14">
              <div className="space-y-4 sm:space-y-6 max-w-sm">
                <div className="bg-[#B9FF66] px-2 py-0.5 rounded-[5px] w-fit">
                  <h3 className="font-medium text-base sm:text-lg text-black">
                    Contact us:
                  </h3>
                </div>
                <div className="space-y-2.5 text-sm sm:text-base text-white/80">
                  <p>Email: info@positivus.com</p>
                  <p>Phone: 555-567-8901</p>
                  <p>
                    Address: 1234 Main St Moonstone City, Stardust State 12345
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row p-6 sm:p-8 lg:p-10 gap-3.5 sm:gap-4 rounded-[14px] bg-[#292A32] w-full lg:max-w-xl">
                <input
                  type="email"
                  className="w-full sm:w-3/5 px-4 sm:px-6 py-3.5 rounded-[14px] bg-transparent border border-white/30 text-white placeholder:text-white/50 text-sm sm:text-base focus:outline-none focus:border-[#B9FF66]"
                  placeholder="Email"
                />
                <button
                  type="button"
                  className="bg-[#B9FF66] hover:bg-[#84cd2b] text-black px-5 sm:px-7 py-3.5 rounded-[14px] font-medium text-sm sm:text-base transition-colors cursor-pointer w-full sm:w-2/5 active:scale-95 text-center"
                >
                  Subscribe to news
                </button>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/20">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-white/70 text-center sm:text-left">
                <span>
                  © 2024 Positivus. Coded by{" "}
                  <span className="text-white font-medium">
                    Bilal Shandyarta Syamsudin
                  </span>{" "}
                  · Designed by{" "}
                  <a
                    href="https://www.olgaskuja.design/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#B9FF66] transition-colors"
                  >
                    Olga Skuja
                  </a>
                </span>
                <a
                  href="#privacy"
                  className="underline hover:text-[#B9FF66] transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
