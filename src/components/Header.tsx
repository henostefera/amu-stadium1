import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // icons for mobile menu
import stadiumLogo from "@/assets/stadium-logo.jpg";

const Header = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const [menuOpen, setMenuOpen] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // Trigger header entrance animation
    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 transition-all duration-700 ease-out ${
                loaded
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-5 opacity-0"
            }`}
        >
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3 transition-all hover:opacity-80"
                >
                    <img
                        src={stadiumLogo}
                        alt="Arbaminch Stadium Logo"
                        className="h-12 w-12 rounded-full object-cover shadow-stadium"
                    />
                    <div className="hidden sm:block">
                        <h1 className="text-lg font-bold font-poppins text-foreground leading-tight">
                            Arbaminch Stadium
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Official Lottery
                        </p>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden sm:flex items-center gap-3">
                    {!isHomePage && (
                        <Button variant="ghost" asChild>
                            <Link to="/">Home</Link>
                        </Button>
                    )}
                    <Button variant="ghost" asChild>
                        <Link to="/tickets">My Tickets</Link>
                    </Button>
                    <Button
                        asChild
                        className="gradient-hero text-primary-foreground hover:opacity-90 transition-stadium"
                    >
                        <Link to="/buy">Buy Ticket</Link>
                    </Button>
                    <Button
                        asChild
                        className="bg-green-600 text-white hover:bg-green-700 transition-stadium"
                    >
                        <Link to="/login">Login</Link>
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="sm:hidden text-foreground focus:outline-none transition-transform hover:scale-105"
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`sm:hidden overflow-hidden bg-background/95 backdrop-blur-md border-t transition-all duration-500 ease-in-out ${
                    menuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <nav className="flex flex-col items-center gap-4 py-4">
                    <div className="flex flex-col gap-4 py-4">
                        {!isHomePage && (
                            <Link
                                to="/"
                                onClick={() => setMenuOpen(false)}
                                className="text-foreground font-medium hover:text-green-600 transition-colors"
                            >
                                Home
                            </Link>
                        )}
                        <Link
                            to="/tickets"
                            onClick={() => setMenuOpen(false)}
                            className="text-foreground font-medium hover:text-green-600 transition-colors"
                        >
                            My Tickets
                        </Link>
                        <Link
                            to="/buy"
                            onClick={() => setMenuOpen(false)}
                            className="text-foreground font-medium hover:text-green-600 transition-colors"
                        >
                            Buy Ticket
                        </Link>
                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                            className="bg-green-700 text-white py-2 px-6 rounded-md shadow-md hover:bg-green-800 transition"
                        >
                            Login
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
