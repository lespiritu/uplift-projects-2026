import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCartPlus,
  FaClipboardList,
  FaCode,
  FaMobileAlt,
  FaStore,
} from "react-icons/fa";

const slides = [
  {
    eyebrow: "Project Overview",
    title: "Restaurant Web App",
    description:
      "A restaurant ordering web app built with React and Vite that guides users from discovery to checkout in a simple, mobile-friendly flow.",
    bullets: [
      "Landing page highlights featured dishes and restaurant branding.",
      "Menu, cart, checkout, and order pages create a complete ordering journey.",
      "Built for demos, portfolio presentations, and frontend practice.",
    ],
    visual: "/images/banner-bg.jpg",
    accent: "from-amber-300 via-orange-300 to-red-300",
    icon: <FaStore className="text-3xl" />,
  },
  {
    eyebrow: "Problem To Solve",
    title: "Manual Ordering Can Be Slow And Unclear",
    description:
      "Many restaurants still depend on paper notes, phone calls, or chat messages, which can create delays, confusion, and incorrect orders.",
    bullets: [
      "Customers may not see the full menu and prices clearly before ordering.",
      "Staff can make mistakes in item quantity, delivery details, or total cost.",
      "Restaurants need a faster and more organized ordering process.",
    ],
    visual: "/images/testimonial-client.jpg",
    accent: "from-red-200 via-orange-200 to-yellow-200",
    icon: <FaClipboardList className="text-3xl" />,
  },
  {
    eyebrow: "User Flow",
    title: "From Browsing To Ordering",
    description:
      "The app focuses on a clear customer journey so visitors can quickly discover food, review selections, and submit an order.",
    bullets: [
      "Users explore popular dishes on the homepage and the full menu page.",
      "Cart actions support adding items, updating quantity, and removing dishes.",
      "Checkout collects delivery details and posts orders to the backend API.",
    ],
    visual: "/images/featured-bg.jpg",
    accent: "from-yellow-200 via-amber-200 to-orange-200",
    icon: <FaCartPlus className="text-3xl" />,
  },
  {
    eyebrow: "Core Features",
    title: "What The Project Can Do",
    description:
      "Even as a simple app, it already demonstrates several realistic product features and state-management patterns.",
    bullets: [
      "Data fetching for foods and orders using a shared React context provider.",
      "Local storage persistence for cart items and order history fallback.",
      "Admin page shows submitted order information in a readable list.",
    ],
    visual: "/images/testimonial-bg.jpg",
    accent: "from-stone-200 via-orange-100 to-amber-100",
    icon: <FaClipboardList className="text-3xl" />,
  },
  {
    eyebrow: "Solution",
    title: "A Clear Digital Ordering Workflow",
    description:
      "This application solves that problem by giving customers a simple step-by-step system for browsing food, managing a cart, and submitting orders.",
    bullets: [
      "The menu page helps users explore dishes in a more organized way.",
      "The cart and checkout pages reduce confusion before confirming the order.",
      "The admin order list helps track received orders more clearly.",
    ],
    visual: "/images/banner-bg.svg",
    accent: "from-green-200 via-amber-100 to-orange-200",
    icon: <FaCartPlus className="text-3xl" />,
  },
  {
    eyebrow: "Tech Stack",
    title: "Built With Modern Frontend Tools",
    description:
      "The project uses a straightforward React setup that is easy to explain in class, demo in a panel, or continue building later.",
    bullets: [
      "React 19 and React Router handle UI structure and page navigation.",
      "Vite keeps development fast with a lightweight build pipeline.",
      "Tailwind CSS v4 powers the styling and responsive layouts.",
    ],
    visual: "/images/aboutUs/aboutimg.jpg",
    accent: "from-amber-100 via-white to-stone-100",
    icon: <FaCode className="text-3xl" />,
  },
  {
    eyebrow: "Presentation Angle",
    title: "Why This Project Stands Out",
    description:
      "This app is small enough to understand quickly, but complete enough to show product thinking, frontend architecture, and UX choices.",
    bullets: [
      "Responsive layout supports both desktop and mobile browsing.",
      "Reusable components keep the UI consistent across pages.",
      "It can be extended with authentication, payments, or live order tracking.",
    ],
    visual: "/images/pizza-banner.png",
    accent: "from-red-200 via-orange-200 to-amber-200",
    icon: <FaMobileAlt className="text-3xl" />,
  },
];

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      }

      if (event.key === "ArrowRight" || event.key === " ") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const slide = slides[currentSlide];

  return (
    <main className="min-h-screen overflow-hidden bg-dark-leon-900 text-white">
      <title>P5 React App Presentation</title>

      <div className="relative isolate min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${slide.visual})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,214,102,0.22),_transparent_35%),linear-gradient(135deg,_rgba(21,25,33,0.96),_rgba(21,25,33,0.82))]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
            >
              Back to app
            </Link>

            <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm">
              Slide {currentSlide + 1} / {slides.length}
            </div>
          </div>

          <section className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-[1.15fr_.85fr] lg:py-12">
            <div className="max-w-3xl">
              <div
                className={`mb-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r ${slide.accent} px-4 py-2 font-semibold text-dark-leon-900 shadow-lg`}
              >
                {slide.icon}
                <span>{slide.eyebrow}</span>
              </div>

              <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                {slide.title}
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
                {slide.description}
              </p>

              <div className="mt-8 space-y-3">
                {slide.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm"
                  >
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <p className="text-base leading-7 text-white/90">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-400/20 to-orange-500/10 blur-2xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-white/8 p-4 shadow-2xl backdrop-blur-md">
                <img
                  src={slide.visual}
                  alt={slide.title}
                  className="h-[280px] w-full rounded-[1.5rem] object-cover sm:h-[360px] lg:h-[460px]"
                />

                <div className="mt-4 rounded-[1.5rem] bg-black/25 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
                    Speaker Notes
                  </p>
                  <p className="mt-3 text-base leading-7 text-white/80">
                    Start by explaining the problem in manual restaurant
                    ordering, then connect it to how this app improves speed,
                    accuracy, and order organization.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    index === currentSlide
                      ? "bg-amber-400 text-dark-leon-900"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={goToPrevious}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 transition hover:bg-white/20"
              >
                <FaArrowLeft />
                Previous
              </button>

              <button
                type="button"
                onClick={goToNext}
                className="flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 font-semibold text-dark-leon-900 transition hover:bg-amber-300"
              >
                Next
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Presentation;
