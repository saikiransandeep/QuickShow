import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Array of hero slides data
  const heroSlides = [
    {
      id: 1,
      title: "Original Gangster",
      genres: ["Action", "Thriller", "Sci-Fi"],
      year: "2025",
      duration: "2h 34m",
      description: "Pawan Kalyan stars as Ojas Gambheera (OG), a young man who rises in the criminal underworld of 1970s Bombay.",
      background: "/og.jpg",
      logo: assets.ogLogo
    },
    {
      id: 2,
      title: "Vikram",
      genres: ["Action", "Thriller", "Crime"],
      year: "2022",
      duration: "2h 53m",
      description: "A covert operation unravels the dark past of Vikram as he battles drug cartels and masked enemies.",
      background: "/vikram.jpg",
      logo: assets.vikramTitle
    },
    {
      id: 3,
      title: "Avatar-2",
      genres: ["Action", "Adventure", "Fantasy"],
      year: "2022",
      duration: "3h 12m",
      description: "Jake Sully and Neytiri must protect their family as new threats emerge on Pandora.",
      background: "/avatar.jpg",
      logo: assets.avatarTitle
    },
    {
      id: 4,
      title: "Pushpa",
      genres: ["Action", "Drama", "Crime"],
      year: "2021",
      duration: "2h 59m",
      description: "A laborer rises through the ranks of a red sandalwood smuggling syndicate.",
      background: "/pushpa.jpg",
      logo: assets.pushpaTitle
    },
    {
      id: 5,
      title: "RRR",
      genres: ["Action", "Thriller", "Drama"],
      year: "2024",
      duration: "2h 28m",
      description: "A mysterious vigilante fights corruption in the system with unconventional methods.",
      background: "/rrr.jpg",
      logo: assets.rrrTitle
    }
  ];

  // Auto-slide effect with smooth transition
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 500);
  };

  const currentMovie = heroSlides[currentSlide];

  return (
    <div className="relative overflow-hidden h-screen">
      {/* Background with smooth transition */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
          isTransitioning ? 'opacity-80 scale-105' : 'opacity-100 scale-100'
        }`}
        style={{
          backgroundImage: `url(${currentMovie.background})`,
        }}
      />
      
      {/* Light overlay for better text readability */}
      <div className={`absolute inset-0 bg-black/30 transition-opacity duration-1000 ${
        isTransitioning ? 'opacity-50' : 'opacity-40'
      }`} />

      {/* Hero Content */}
      <div className='relative flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 h-full z-10'>
        {/* Movie Logo with smooth fade */}
        <div className={`transition-all duration-700 transform ${
          isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
          <img 
            src={currentMovie.logo} 
            alt={`${currentMovie.title} Logo`} 
            className="max-h-20 lg:max-h-24 mt-20"
          />
        </div>

        {/* Movie Title with staggered animation */}
        <h1 className={`text-4xl md:text-6xl lg:text-[70px] font-semibold max-w-2xl text-white transition-all duration-700 transform ${
          isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
        }`} style={{ transitionDelay: '100ms' }}>
          {currentMovie.title}
        </h1>

        {/* Movie Info with staggered animation */}
        <div className={`flex flex-wrap items-center gap-4 text-gray-300 transition-all duration-700 transform ${
          isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
        }`} style={{ transitionDelay: '200ms' }}>
          <span className="font-medium">{currentMovie.genres.join(" | ")}</span>
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" /> 
            <span>{currentMovie.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" /> 
            <span>{currentMovie.duration}</span>
          </div>
        </div>

        {/* Movie Description with staggered animation */}
        <p className={`max-w-xl text-lg text-gray-300 transition-all duration-700 transform ${
          isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
        }`} style={{ transitionDelay: '300ms' }}>
          {currentMovie.description}
        </p>

        {/* Explore Button with staggered animation */}
        <button
          onClick={() => navigate("/movies")}
          className={`flex items-center gap-2 px-8 py-3 text-base bg-primary hover:bg-primary-dull transition-all duration-700 transform rounded-full font-medium cursor-pointer ${
            isTransitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0 hover:scale-105'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          Explore Movies
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Carousel Dots */}
        <div className={`flex gap-3 mt-8 transition-all duration-700 ${
          isTransitioning ? 'opacity-50' : 'opacity-100'
        }`} style={{ transitionDelay: '500ms' }}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-primary scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to ${heroSlides[index].title}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;