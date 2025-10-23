import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RewardArena from "@/components/RewardArena";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, Users, Building } from "lucide-react";
import FundraisingSteps from "@/components/FundraisingSteps";

const Index = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                <Hero />

                {/* Ticket Price Section */}
                <section className="py-16">
                    <div className="container px-4">
                        <Card className="max-w-3xl mx-auto shadow-stadium border-2 border-primary/20 animate-fade-in">
                            <CardHeader className="text-center pb-4">
                                <CardTitle className="text-3xl font-bold font-poppins">
                                    Ticket Price
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <div className="mb-6">
                                    <p className="text-3xl sm:text-4xl font-bold font-poppins gradient-hero bg-clip-text">
                                        <span className="text-white">
                                            100 ETB
                                        </span>
                                    </p>
                                    <p className="text-muted-foreground mt-2">
                                        per ticket
                                    </p>
                                </div>

                                <p className="text-lg mb-6 text-muted-foreground max-w-xl mx-auto">
                                    Every ticket purchased directly supports the
                                    construction of Arbaminch Stadium and gives
                                    you a chance to win amazing prizes!
                                </p>

                                <Button
                                    asChild
                                    size="lg"
                                    className="gradient-hero text-primary-foreground hover:opacity-90 transition-stadium text-lg px-12"
                                >
                                    <Link to="/buy">Buy Ticket Now</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <RewardArena />

                <FundraisingSteps />
                {/* Impact Section */}
                <section className="py-16">
                    <div className="container px-4">
                        <div className="text-center mb-12 animate-fade-in">
                            <h2 className="text-3xl sm:text-4xl font-bold font-poppins mb-4">
                                Your Contribution Matters
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Every ticket purchased helps build a world-class
                                stadium for Ethiopia
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <div className="text-center animate-slide-in">
                                <div className="mx-auto mb-4 p-4 rounded-full bg-stadium-green/10 w-fit">
                                    <Building className="w-8 h-8 text-stadium-green" />
                                </div>
                                <h3 className="text-xl font-bold font-poppins mb-2">
                                    World-Class Infrastructure
                                </h3>
                                <p className="text-muted-foreground">
                                    Building a modern 60,000-seat stadium with
                                    international standards
                                </p>
                            </div>

                            <div
                                className="text-center animate-slide-in"
                                style={{ animationDelay: "100ms" }}
                            >
                                <div className="mx-auto mb-4 p-4 rounded-full bg-stadium-green/10 w-fit">
                                    <Users className="w-8 h-8 text-stadium-green" />
                                </div>
                                <h3 className="text-xl font-bold font-poppins mb-2">
                                    Community Development
                                </h3>
                                <p className="text-muted-foreground">
                                    Creating jobs and opportunities for local
                                    communities
                                </p>
                            </div>

                            <div
                                className="text-center animate-slide-in"
                                style={{ animationDelay: "200ms" }}
                            >
                                <div className="mx-auto mb-4 p-4 rounded-full bg-stadium-gold/10 w-fit">
                                    <Heart className="w-8 h-8 text-stadium-gold" />
                                </div>
                                <h3 className="text-xl font-bold font-poppins mb-2">
                                    National Pride
                                </h3>
                                <p className="text-muted-foreground">
                                    Elevating Ethiopia's status as a sports
                                    destination in Africa
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Index;
