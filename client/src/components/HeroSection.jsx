import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // Array of hero slides data
  const heroSlides = [
    {
      id: 1,
      title: "Original Gangster",
      genres: ["Action", "Thriller", "Sci-Fi"],
      year: "2025",
      duration: "2h 34m",
      description:
        "Pawan Kalyan stars as Ojas Gambheera (OG), a young man who rises in the criminal underworld of 1970s Bombay.",
      background: "/og.jpg",
      logo: assets.ogLogo,
    },
    {
      id: 2,
      title: "Vikram",
      genres: ["Action", "Thriller", "Crime"],
      year: "2022",
      duration: "2h 53m",
      description:
        "A covert operation unravels the dark past of Vikram as he battles drug cartels and masked enemies.",
      background: "/vikram.jpg",
      logo: assets.vikramTitle,
    },
    {
      id: 3,
      title: "Avatar-2",
      genres: ["Action", "Adventure", "Fantasy"],
      year: "2022",
      duration: "3h 12m",
      description:
        "Jake Sully and Neytiri must protect their family as new threats emerge on Pandora.",
      background: "/avatar.jpg",
      logo: assets.avatarTitle,
    },
    {
      id: 4,
      title: "Pushpa",
      genres: ["Action", "Drama", "Crime"],
      year: "2021",
      duration: "2h 59m",
      description:
        "A laborer rises through the ranks of a red sandalwood smuggling syndicate.",
      background: "/pushpa.jpg",
      logo: assets.pushpaTitle,
    },
    {
      id: 5,
      title: "RRR",
      genres: ["Action", "Thriller", "Drama"],
      year: "2024",
      duration: "2h 28m",
      description:
        "A mysterious vigilante fights corruption in the system with unconventional methods.",
      background: "/rrr.jpg",
      logo: assets.rrrTitle,
    },
  ];

  // Create a new array with the first slide cloned at the end for the infinite loop effect
  const slidesWithClone = [...heroSlides, { ...heroSlides[0], id: "clone" }];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Effect to handle the "snap back" for the infinite loop
  useEffect(() => {
    if (currentSlide === slidesWithClone.length - 1) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentSlide(0);
        setTimeout(() => {
          setTransitionEnabled(true);
        }, 50);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, slidesWithClone.length]);

  const goToSlide = (index) => {
    setTransitionEnabled(true);
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Filmstrip container */}
      <div
        className={`flex h-full ${
          transitionEnabled
            ? "transition-transform duration-700 ease-in-out"
            : "transition-none"
        }`}
        style={{
          width: `${slidesWithClone.length * 100}%`,
          transform: `translateX(-${
            (currentSlide / slidesWithClone.length) * 100
          }%)`,
        }}>
        {slidesWithClone.map((slide) => (
          <div key={slide.id} className="relative w-full h-full">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.background})` }}
            />

            {/* Hero Content for each slide */}
            <div className="relative flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 h-full z-10 text-white">
              <img
                src={slide.logo}
                alt={`${slide.title} Logo`}
                className="max-h-20 lg:max-h-24 mt-20"
              />
              <h1 className="text-4xl md:text-6xl lg:text-[70px] font-semibold max-w-2xl">
                {slide.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-300">
                <span className="font-medium">{slide.genres.join(" | ")}</span>
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{slide.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>{slide.duration}</span>
                </div>
              </div>
              <p className="max-w-xl text-lg text-gray-300">
                {slide.description}
              </p>
              <button
                onClick={() => navigate("/movies")}
                className="flex items-center gap-2 px-8 py-3 text-base bg-primary hover:bg-primary-dull transition-all duration-300 transform rounded-full font-medium cursor-pointer hover:scale-105">
                Explore Movies
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Carousel Dots - MOVED HERE */}
              <div className="flex gap-3 mt-8">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide % heroSlides.length
                        ? "bg-primary scale-125"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
