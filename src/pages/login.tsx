import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/10 px-4">
            <Card className="w-full max-w-md sm:p-6 p-4 shadow-stadium border border-stadium-green/30 bg-card animate-fade-in">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-stadium-green font-medium hover:underline mb-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl sm:text-3xl font-bold font-poppins text-primary">
                        Login to Your Account
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        Access your tickets and donations dashboard.
                    </p>
                </CardHeader>

                <CardContent>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-muted-foreground"
                            >
                                Email or Phone
                            </label>
                            <Input
                                id="email"
                                type="text"
                                placeholder="Enter email or phone"
                                className="bg-background text-foreground border border-muted focus:border-stadium-green focus:ring-1 focus:ring-stadium-green transition-all text-sm sm:text-base"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-muted-foreground"
                            >
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                className="bg-background text-foreground border border-muted focus:border-stadium-green focus:ring-1 focus:ring-stadium-green transition-all text-sm sm:text-base"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="bg-green-700 text-white hover:bg-green-600 mt-2 text-base font-semibold"
                        >
                            Login
                        </Button>
                    </form>

                    <p className="text-sm text-muted-foreground mt-4 text-center">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-stadium-green font-medium hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
