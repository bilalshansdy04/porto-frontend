import { useState } from "react";

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
    title: ["Sosial Media", "Marketing"],
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
    title: ["Content", "Creator"],
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
  className = "mb-20",
}: SectionHeadingProps) {
  return (
    <div className={`flex items-center gap-10 ${className}`}>
      <div className="flex justify-center items-center bg-[#B9FF66] px-1.75 rounded-[5px] shrink-0">
        <h2 className="font-medium text-[40px] leading-tight">{title}</h2>
      </div>
      <div className="max-w-145">
        <p className="text-[12pt] leading-normal">{description}</p>
      </div>
    </div>
  );
}

export default function PositivusLandingPage() {
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
    <div className="bg-white px-24 pt-16 min-h-screen font-['Space_Grotesk',sans-serif] text-black">
      {/* Google Fonts: Montserrat & Space Grotesk */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Space+Grotesk:wght@300..700&display=swap');
      `}</style>

      {/* ================= HEADER / NAVBAR ================= */}
      <nav className="flex justify-between items-center">
        <img src="Positivus Logo.svg" alt="Positivus Logo" className="" />
        <div className="flex items-center gap-10">
          <div className="flex gap-10">
            <a
              href="#about-us"
              className="hover:text-[#75b329] transition-colors"
            >
              About Us
            </a>
            <a
              href="#services"
              className="hover:text-[#75b329] transition-colors"
            >
              Services
            </a>
            <a
              href="#use-cases"
              className="hover:text-[#75b329] transition-colors"
            >
              Use Cases
            </a>
            <a
              href="#pricing"
              className="hover:text-[#75b329] transition-colors"
            >
              Pricing
            </a>
            <a href="#blog" className="hover:text-[#75b329] transition-colors">
              Blog
            </a>
          </div>
          <button
            onClick={() => {
              setContactType("get-quote");
              document
                .getElementById("contact-us")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-transparent hover:bg-[#e5fcca] px-8.75 py-5 rounded-[14px] outline-1 transition-colors cursor-pointer"
          >
            Request a quote
          </button>
        </div>
      </nav>

      <main>
        {/* ================= 1. HERO SECTION ================= */}
        <section className="flex justify-between my-17.5">
          <div className="flex flex-col items-start gap-8.75 w-1/2">
            <h1 className="font-medium text-[60px] leading-15">
              Navigating the digital landscape for success
            </h1>
            <p className="font-normal text-[20px] leading-7">
              Our digital marketing agency helps businesses grow and succeed
              online through a range of services including SEO, PPC, social
              media marketing, and content creation.
            </p>
            <button className="bg-[#191A23] px-8.75 py-8.75 rounded-[14px] text-white transition-colors cursor-pointer">
              Book a consultation
            </button>
          </div>
          <div className="flex justify-end items-center w-1/2">
            <img src="Illustration.jpg" alt="Illustration" className="h-100" />
          </div>
        </section>

        {/* ================= 2. CLIENT LOGOS SECTION ================= */}
        <section className="flex justify-between items-center mb-35 w-full">
          <img src="amazon.jpg" alt="amazon" />
          <img src="dribble.jpg" alt="dribble" />
          <img src="hubspot.jpg" alt="hubspot" />
          <img src="notion.jpg" alt="notion" />
          <img src="netflix.jpg" alt="netflix" />
          <img src="zoom.jpg" alt="zoom" />
        </section>

        {/* ================= 3. SERVICES SECTION ================= */}
        <section id="services" className="mb-35">
          <SectionHeading
            title="Services"
            description="At our digital marketing agency, we offer a range of services to help businesses grow and succeed online. These services include:"
            className="mb-20"
          />

          <div className="gap-10 grid grid-cols-1 md:grid-cols-2 mx-auto w-full">
            {SERVICES.map((service) => {
              const theme = SERVICE_THEMES[service.theme];
              const isDark = service.theme === "dark";

              return (
                <div
                  key={service.id}
                  className={`flex justify-between gap-17.25 ${theme.cardBg} shadow-[0_5px_0_0_rgba(25,26,35,100%)] p-12.75 border border-black rounded-[45px] min-h-77.5`}
                >
                  <div className="flex flex-col justify-between gap-5.25">
                    <div className="flex flex-col items-start">
                      {service.title.map((line, idx) => (
                        <div
                          key={idx}
                          className={`flex justify-center items-center ${theme.badgeBg} px-2 py-0.5 rounded-[5px] whitespace-nowrap`}
                        >
                          <h3 className="font-medium text-[20px] leading-none">
                            {line}
                          </h3>
                        </div>
                      ))}
                    </div>
                    <button className="group flex items-center gap-2.5 cursor-pointer">
                      {isDark ? (
                        <img
                          src="icons/Arrow 2.svg"
                          alt="Arrow"
                          className="w-9 h-9 group-hover:rotate-30 group-hover:scale-[1.11] transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
                        />
                      ) : (
                        <img
                          src="icons/Arrow 1.svg"
                          alt="Arrow"
                          className="w-9 h-9 group-hover:rotate-30 group-hover:scale-[1.11] transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
                        />
                      )}
                      <span
                        className={`${theme.textColor} group-hover:scale-[1.11] transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]`}
                      >
                        Learn More
                      </span>
                    </button>
                  </div>
                  <div className="flex justify-center items-center">
                    <img src={service.src} alt="Illustration" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= 4. CTA BANNER SECTION ================= */}
        <section className="mb-35 py-[23.5]">
          <div className="relative flex justify-between bg-[#F3F3F3] px-15 rounded-[45px] w-full h-87.5">
            <div className="flex flex-col justify-center w-125">
              <div className="space-y-6.5">
                <h3 className="font-medium text-[30px]">
                  Let’s make things happen
                </h3>
                <p className="text-[12pt]">
                  Contact us today to learn more about how our digital marketing
                  services can help your business grow and succeed online.
                </p>
                <button className="bg-black px-8.75 py-5 rounded-[14px] text-white cursor-pointer">
                  Get your free proposal
                </button>
              </div>
            </div>
            <div className="-top-10 right-15 absolute flex items-center h-[calc(100%+80px)]">
              <img src="Illustration 2.svg" alt="" />
            </div>
          </div>
        </section>

        {/* ================= 5. CASE STUDIES SECTION ================= */}
        <section id="use-cases" className="mb-35">
          <SectionHeading
            title="Case Studies"
            description="Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies"
            className="mb-20"
          />

          <div className="flex gap-15 bg-[#191A23] px-15 py-17.5 rounded-[45px] h-81.5">
            <div className="space-y-5">
              <p className="text-[12pt] text-white">
                For a local restaurant, we implemented a targeted PPC campaign
                that resulted in a 50% increase in website traffic and a 25%
                increase in sales.
              </p>
              <button className="group space-x-3.75 text-[#B9FF66] text-[20px] cursor-pointer">
                <span className="inline-block group-hover:scale-[1.11] transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]">
                  Learn More
                </span>
                <img
                  src="Icons/Arrow Single.svg"
                  alt="Arrow"
                  className="inline-block group-hover:rotate-30 group-hover:scale-[1.11] transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
                />
              </button>
            </div>
            <div className="bg-white w-px h-full" />
            <div className="space-y-5">
              <p className="text-[12pt] text-white">
                For a local restaurant, we implemented a targeted PPC campaign
                that resulted in a 50% increase in website traffic and a 25%
                increase in sales.
              </p>
              <button className="group space-x-3.75 text-[#B9FF66] text-[20px] cursor-pointer">
                <span className="inline-block group-hover:scale-[1.11] transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]">
                  Learn More
                </span>
                <img
                  src="Icons/Arrow Single.svg"
                  alt="Arrow"
                  className="inline-block group-hover:rotate-30 group-hover:scale-[1.11] transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
                />
              </button>
            </div>
            <div className="bg-white w-px h-full" />
            <div className="space-y-5">
              <p className="text-[12pt] text-white">
                For a local restaurant, we implemented a targeted PPC campaign
                that resulted in a 50% increase in website traffic and a 25%
                increase in sales.
              </p>
              <button className="group space-x-3.75 text-[#B9FF66] text-[20px] cursor-pointer">
                <span className="inline-block group-hover:scale-[1.11] transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]">
                  Learn More
                </span>
                <img
                  src="Icons/Arrow Single.svg"
                  alt="Arrow"
                  className="inline-block group-hover:rotate-30 group-hover:scale-[1.11] transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
                />
              </button>
            </div>
          </div>
        </section>

        {/* ================= 6. OUR WORKING PROCESS SECTION ================= */}
        <section id="process" className="mb-35">
          <SectionHeading
            title="Our Working Process"
            description="Step-by-Step Guide to Achieving Your Business Goals"
            className="mb-20"
          />

          <div className="space-y-7.5">
            {WORKING_PROCESS.map((step) => {
              const isOpen = openStep === step.id;

              return (
                <div
                  key={step.id}
                  className={`px-15 py-10.25 rounded-[45px] w-full border border-black shadow-[0_5px_0_0_rgba(25,26,35,100%)] transition-colors duration-300 ease-out ${
                    isOpen ? "bg-[#B9FF66]" : "bg-[#f5f5f5]"
                  }`}
                >
                  <div
                    className="group flex justify-between items-center cursor-pointer select-none"
                    onClick={() => setOpenStep(isOpen ? null : step.id)}
                  >
                    <div className="flex items-center gap-6.25">
                      <h1 className="font-medium text-[60px]">{step.step}</h1>
                      <h2 className="font-medium text-[30px]">{step.title}</h2>
                    </div>
                    <div className="relative flex justify-center items-center w-14.5 h-14.5 active:scale-90 group-hover:scale-110 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] shrink-0">
                      <img
                        src="icons/Plus icon.svg"
                        alt="Plus"
                        className={`absolute inset-0 w-full h-full transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform ${
                          isOpen
                            ? "opacity-0 rotate-90 scale-50 pointer-events-none"
                            : "opacity-100 rotate-0 scale-100"
                        }`}
                      />
                      <img
                        src="icons/Minus icon.svg"
                        alt="Minus"
                        className={`absolute inset-0 w-full h-full transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform ${
                          isOpen
                            ? "opacity-100 rotate-0 scale-100"
                            : "opacity-0 -rotate-90 scale-50 pointer-events-none"
                        }`}
                      />
                    </div>
                  </div>

                  <div
                    className={`grid transition-[grid-template-rows,padding] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "grid-rows-[1fr] pt-7.5" : "grid-rows-[0fr] pt-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`transition-all duration-350 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] transform ${
                          isOpen
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 -translate-y-3 scale-95"
                        }`}
                      >
                        <div className="bg-black mb-7.5 w-full h-px" />
                        <div>
                          <p className="text-[12pt] leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= 7. TEAM SECTION ================= */}
        <section id="team" className="mb-35">
          <SectionHeading
            title="Team"
            description="Meet the skilled and experienced team behind our successful digital marketing strategies"
            className="mb-20"
          />

          <div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="space-y-7 bg-white shadow-[0_5px_0_0_rgba(25,26,35,100%)] px-8.75 py-10 border border-black rounded-[45px] w-full"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-end gap-5">
                    <img
                      src={member.src}
                      alt={member.name}
                      className="h-25 object-contain shrink-0"
                    />
                    <div>
                      <h3 className="font-medium text-[20px] text-black leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-[16px] text-black/80">{member.role}</p>
                    </div>
                  </div>
                  <a
                    href="#linkedin"
                    className="flex justify-center items-center bg-black hover:bg-[#2e303d] rounded-full w-8.5 h-8.5 transition-colors cursor-pointer shrink-0"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <img
                      src="icons/linkedin.svg"
                      alt="LinkedIn"
                      className="w-4 h-4"
                    />
                  </a>
                </div>

                <div className="bg-black w-full h-px" />

                <p className="font-normal text-[12pt] text-black leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-10">
            <button className="bg-[#191A23] hover:bg-[#2e303d] px-8.75 py-5 rounded-[14px] w-full sm:w-auto text-white transition-colors cursor-pointer">
              See all team
            </button>
          </div>
        </section>
        {/* ================= 8. TESTIMONIALS SECTION ================= */}
        <section id="testimonials" className="mb-35">
          <SectionHeading
            title="Testimonials"
            description="Hear from Our Satisfied Clients: Read Our Testimonials to Learn More about Our Digital Marketing Services"
            className="mb-20"
          />

          <div className="bg-[#191A23] py-16 sm:py-21 rounded-[45px] overflow-hidden select-none">
            {/* Sliding Track Container */}
            <div
              className="w-full overflow-hidden [--carousel-card-width:min(606px,82vw)] [--carousel-gap:24px] md:[--carousel-card-width:606px] md:[--carousel-gap:50px]"
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
                    currentTestimonial === item.originalIndex && !item.isClone;
                  return (
                    <div
                      key={item.uniqueKey}
                      onClick={() => setCurrentTestimonial(item.originalIndex)}
                      style={{ width: "var(--carousel-card-width)" }}
                      className={`shrink-0 transition-all duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                        isActive
                          ? "opacity-100 scale-100 cursor-default"
                          : "opacity-40 scale-90 sm:scale-95 hover:opacity-75 cursor-pointer"
                      }`}
                    >
                      <div className="mx-auto w-full max-w-151.5">
                        {/* Speech Bubble Box with Bubble.svg */}
                        <div className="relative drop-shadow-[0_4px_14px_rgba(0,0,0,0.3)] w-full hover:scale-[1.01] transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] filter">
                          <img
                            src="icons/Bubble.svg"
                            alt="Testimonial bubble"
                            className="block w-full h-auto pointer-events-none select-none"
                          />
                          <div className="top-0 bottom-[11%] absolute inset-x-0 flex justify-center items-center px-6 sm:px-10 md:px-12 py-4 sm:py-6">
                            <p className="text-[12px] text-white sm:text-[15px] md:text-[17px] lg:text-[18px] text-left leading-relaxed">
                              "{item.quote}"
                            </p>
                          </div>
                        </div>

                        {/* Author Info (Aligned under the Bubble tail peak at ~13.7%) */}
                        <div className="mt-5 sm:mt-6 ml-[13.7%]">
                          <h4 className="font-medium text-[#B9FF66] text-[18px] sm:text-[20px] leading-tight">
                            {item.author}
                          </h4>
                          <p className="text-[14px] text-white/90 sm:text-[16px] leading-normal">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Carousel Controls (Arrows + 5 Sparkle/Star Dots) */}
            <div className="flex justify-center items-center gap-16 sm:gap-24 mt-16 sm:mt-24">
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={prevTestimonial}
                aria-label="Previous Testimonial"
                className="p-2 text-white hover:text-[#B9FF66] hover:scale-125 active:scale-75 transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer"
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

              {/* 5 Sparkle / Star Indicator Dots */}
              <div className="flex items-center gap-4 sm:gap-5">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentTestimonial(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    className="p-1 focus:outline-none hover:scale-125 active:scale-90 transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 14 14"
                      className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                        currentTestimonial === idx
                          ? "text-[#B9FF66] scale-135 drop-shadow-[0_0_8px_rgba(185,255,102,0.6)]"
                          : "text-white opacity-70 hover:opacity-100 hover:scale-110"
                      }`}
                      fill="currentColor"
                    >
                      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" />
                    </svg>
                  </button>
                ))}
              </div>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={nextTestimonial}
                aria-label="Next Testimonial"
                className="p-2 text-white hover:text-[#B9FF66] hover:scale-125 active:scale-75 transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer"
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
        {/* ================= 9. CONTACT US SECTION =================  */}
        <section id="contact-us" className="mb-35">
          <SectionHeading
            title="Contact Us"
            description="Connect with Us: Let's Discuss Your Digital Marketing Needs"
            className="mb-20"
          />
          <div className="relative flex justify-between items-center bg-[#F3F3F3] px-8 sm:px-14 md:px-20 lg:px-25 pt-12 sm:pt-15 pb-16 sm:pb-20 rounded-[45px] overflow-hidden">
            {/* Left Column: Form */}
            <div className="z-10 relative w-full lg:max-w-139">
              <form onSubmit={handleContactSubmit}>
                {/* Radio Buttons (Say Hi / Get a Quote) */}
                <div className="flex items-center gap-9 mb-10">
                  <label
                    onClick={() => setContactType("say-hi")}
                    className="group flex items-center gap-3.5 cursor-pointer select-none"
                  >
                    <div className="relative flex justify-center items-center bg-white border border-black rounded-full w-7 h-7 transition-all">
                      {contactType === "say-hi" && (
                        <div className="bg-[#B9FF66] rounded-full w-4 h-4 scale-100 transition-transform duration-200" />
                      )}
                    </div>
                    <span className="text-[12pt] text-black">Say Hi</span>
                  </label>

                  <label
                    onClick={() => setContactType("get-quote")}
                    className="group flex items-center gap-3.5 cursor-pointer select-none"
                  >
                    <div className="relative flex justify-center items-center bg-white border border-black rounded-full w-7 h-7 transition-all">
                      {contactType === "get-quote" && (
                        <div className="bg-[#B9FF66] rounded-full w-4 h-4 scale-100 transition-transform duration-200" />
                      )}
                    </div>
                    <span className="text-[12pt] text-black">Get a Quote</span>
                  </label>
                </div>

                {/* Form Inputs */}
                <div className="space-y-6.25">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block mb-1.25 font-normal text-[16px] text-black"
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
                      className="bg-white px-7.5 py-4.5 border border-black rounded-[14px] focus:outline-none focus:ring-[#B9FF66] focus:ring-2 w-full text-[12pt] text-black placeholder:text-[#898989] transition-all"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block mb-1.25 font-normal text-[16px] text-black"
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
                      className="bg-white px-7.5 py-4.5 border border-black rounded-[14px] focus:outline-none focus:ring-[#B9FF66] focus:ring-2 w-full text-[12pt] text-black placeholder:text-[#898989] transition-all"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block mb-1.25 font-normal text-[16px] text-black"
                    >
                      Message*
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-white px-7.5 py-4.5 border border-black rounded-[14px] focus:outline-none focus:ring-[#B9FF66] focus:ring-2 w-full min-h-47.5 text-[12pt] text-black placeholder:text-[#898989] transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-10">
                  <button
                    type="submit"
                    className="bg-[#191A23] hover:bg-[#B9FF66] px-9 py-5 rounded-[14px] w-full font-medium text-[20px] text-white hover:text-black active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] cursor-pointer"
                  >
                    {formSubmitted ? "Message Sent! ✓" : "Send Message"}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Illustration3.svg */}
            <div className="hidden top-1/2 -right-28 xl:-right-12 absolute lg:flex justify-center items-center -translate-y-1/2 pointer-events-none select-none">
              <img
                src="Illustration3.svg"
                alt="Contact Illustration"
                className="right absolute w-162.5 max-w-none h-auto object-contain"
              />
            </div>
          </div>
        </section>
        <section className="bg-[#191A23] px-15 pt-13.75 pb-12.5 rounded-t-[45px] text-white">
          <div className="flex justify-between items-center mb-16.5">
            <div>
              <img
                src="Positivus Logo White.svg"
                alt="Positivus Logo"
                className="w-40 h-auto"
              />
            </div>
            <div className="flex gap-10">
              <span className="underline hover:text-[#B9FF66] transition-colors cursor-pointer">About Us</span>
              <span className="underline hover:text-[#B9FF66] transition-colors cursor-pointer">Services</span>
              <span className="underline hover:text-[#B9FF66] transition-colors cursor-pointer">Use Cases</span>
              <span className="underline hover:text-[#B9FF66] transition-colors cursor-pointer">Pricing</span>
              <span className="underline hover:text-[#B9FF66] transition-colors cursor-pointer">Blog</span>
            </div>
            <div className="flex items-center gap-5">
              <img src="icons/Social icon.svg" alt="linkedin" />
              <img src="icons/Social icon-1.svg" alt="facebook" />
              <img src="icons/Social icon-2.svg" alt="twitter" />
            </div>
          </div>
          <div className="flex gap-38.5 ">
            <div className="w-83 space-y-6.75">
              <div className="flex justify-center items-center bg-[#B9FF66] px-1.75 rounded-[5px] shrink-0 w-fit">
                <h2 className="font-medium text-[20px] leading-tight text-black">
                  Contact us:
                </h2>
              </div>
              <div className="space-y-5">
                <p>Email: info@positivus.com</p>
                <p>Phone: 555-567-8901</p>
                <p>
                  Address: 1234 Main St Moonstone City, Stardust State 12345
                </p>
              </div>
            </div>
            <div className="flex px-10 py-15 gap-5 rounded-[14px] bg-[#292A32] w-158.5 mb-12.5">
              <input
                type="email"
                className="w-1/2 px-8.75 outline rounded-[14px]"
                placeholder="Email"
              />
              <button className="bg-[#B9FF66] hover:bg-[#84cd2b] text-black hover:text-black px-8 py-5 rounded-[14px] font-medium w-1/2 transition-colors cursor-pointer">
                Subscribe to news
              </button>
            </div>
          </div>
          <div className="space-y-12.5">
            <div className="w-full h-px bg-white" />
            <div className="flex gap-10">
              <span>
                © 2024 Positivus. Coded by{" "}
                <span className="text-white font-medium">Bilal Shandyarta Syamsudin</span> · Designed
                by{" "}
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
        </section>
      </main>
    </div>
  );
}
