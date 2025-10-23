import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn, Ticket, QrCode } from "lucide-react";

const FundraisingSteps = () => {
    const steps = [
        {
            icon: <LogIn className="w-6 h-6 text-stadium-gold" />,
            title: "Login or Register",
            desc: "Create your account using your phone number or email. Already have one? Just log in to continue.",
            img: "/images/step-login.png",
        },
        {
            icon: <Ticket className="w-6 h-6 text-stadium-green" />,
            title: "Buy or Gift a Ticket",
            desc: "Select whether to buy for yourself or send as a gift. Enter recipient details and number of tickets.",
            img: "/images/step-buyticket.png",
        },
        {
            icon: <QrCode className="w-6 h-6 text-stadium-green" />,
            title: "View Your Tickets",
            desc: "Access your purchased or gifted tickets anytime from the 'My Tickets' page in your dashboard.",
            img: "/images/step-mytickets.png",
        },
    ];

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [steps.length]);

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="container px-4 md:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold font-poppins text-primary">
                        Steps to Support Arbaminch Stadium
                    </h2>
                    <div className="mx-auto mt-2 w-16 h-1 bg-gradient-to-r from-stadium-green to-stadium-gold rounded"></div>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        Participate in the Arbaminch Stadium lottery and help
                        build the future of Ethiopian sports.
                    </p>
                </div>

                {/* Steps + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Steps */}
                    <div className="space-y-10 relative">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`flex items-start space-x-4 transition-all ${
                                    activeStep === index
                                        ? "opacity-100"
                                        : "opacity-70"
                                }`}
                            >
                                {/* Icon Bubble */}
                                <div
                                    className={`p-3 rounded-full border-2 transition-all ${
                                        activeStep === index
                                            ? "border-stadium-gold bg-white shadow-lg"
                                            : "border-muted bg-background"
                                    }`}
                                >
                                    {step.icon}
                                </div>

                                <div>
                                    <h3
                                        className={`text-xl font-semibold font-poppins transition-colors ${
                                            activeStep === index
                                                ? "text-primary"
                                                : "text-muted-foreground"
                                        }`}
                                    >
                                        {step.title}
                                    </h3>
                                    <p className="text-muted-foreground mt-1">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* CTA Button */}
                        <div className="pt-4">
                            <Button
                                asChild
                                size="lg"
                                className="gradient-hero text-primary-foreground hover:opacity-90 transition-stadium font-semibold px-10 rounded-full shadow-md"
                            >
                                <Link to="/login">Get Started</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right Side - Phone Preview */}
                    <div className="flex justify-center relative">
                        {/* Green Background Shape */}
                        <div className="absolute -right-10 top-12 w-[350px] h-[520px] bg-[#566B23] rounded-[9rem] -z-10"></div>

                        {/* Phone Mockup */}
                        <div className="relative w-[250px] sm:w-[300px] aspect-[9/18] bg-black rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-black">
                            <div className="absolute top-0 inset-x-0 h-6 bg-black z-20 rounded-t-[2rem]" />
                            <div className="relative w-full h-full">
                                {steps.map((step, index) => (
                                    <img
                                        key={index}
                                        src={step.img}
                                        alt={`Step ${index + 1}`}
                                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                                            activeStep === index
                                                ? "opacity-100 translate-x-0"
                                                : "opacity-0 translate-x-10"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FundraisingSteps;
