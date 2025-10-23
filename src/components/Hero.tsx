import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import stadiumHero1 from "@/assets/stadium-hero-1.jpg";
import stadiumHero2 from "@/assets/stadium-hero-2.jpg";
import stadiumHero3 from "@/assets/stadium-hero-3.jpg";

const heroImages = [
    {
        src: stadiumHero1,
        title: "Build the Dream Together",
        subtitle: "Support Arbaminch Stadium – Every ticket makes a difference",
    },
    {
        src: stadiumHero2,
        title: "Win Amazing Prizes",
        subtitle: "Contribute to greatness and stand a chance to win big",
    },
    {
        src: stadiumHero3,
        title: "A Legacy for Ethiopia",
        subtitle: "Your participation builds a world-class sports facility",
    },
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);

    // Auto-rotate slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    // Trigger text + wave animations on load
    useEffect(() => {
        const timeout = setTimeout(() => setLoaded(true), 300);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <section className="relative h-[80vh] min-h-[550px] overflow-hidden bg-gray-900">
            {/* Background images */}
            {heroImages.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <img
                        src={image.src}
                        alt={image.title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent mix-blend-multiply" />
                </div>
            ))}

            {/* Text + Button */}
            <div className="container relative z-10 h-full flex items-center px-6">
                <div
                    className={`max-w-2xl text-white transform transition-all duration-1000 ease-out ${
                        loaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
                        {heroImages[currentSlide].title}
                    </h1>
                    <p className="text-lg sm:text-xl mb-8 text-white/90">
                        {heroImages[currentSlide].subtitle}
                    </p>

                    <Button
                        asChild
                        size="lg"
                        className="bg-green-600 hover:bg-green-700 text-lg px-8 rounded-lg shadow-lg transition-transform hover:scale-[1.03]"
                    >
                        <Link to="/buy">Buy Ticket Now</Link>
                    </Button>

                    {/* Slider dots */}
                    <div className="mt-8 flex gap-3">
                        {heroImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-1.5 rounded-full transition-all ${
                                    index === currentSlide
                                        ? "bg-white w-10"
                                        : "bg-white/50 w-6"
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Animated white wave */}
            <div
                className={`absolute bottom-0 left-0 w-full overflow-hidden z-[5] transition-transform duration-1000 ease-out ${
                    loaded ? "translate-y-0" : "translate-y-[100%]"
                }`}
            >
                <svg
                    className="w-full h-[120px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#fff"
                        d="M0,256L80,229.3C160,203,320,149,480,122.7C640,96,800,96,960,117.3C1120,139,1280,181,1360,202.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </section>
    );
};

export default Hero;
