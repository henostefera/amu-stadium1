import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket, Clock, Trophy, XCircle, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type TicketStatus = "pending" | "winner" | "not-winner";

interface TicketData {
  id: string;
  code: string;
  purchaseDate: string;
  status: TicketStatus;
  drawDate: string;
  isGift?: boolean;
  giftedTo?: string;
}

const mockTickets: TicketData[] = [
  {
    id: "1",
    code: "ASL-2025-001234",
    purchaseDate: "2025-01-15",
    status: "pending",
    drawDate: "2025-02-01"
  },
  {
    id: "2",
    code: "ASL-2025-001235",
    purchaseDate: "2025-01-15",
    status: "pending",
    drawDate: "2025-02-01",
    isGift: true,
    giftedTo: "+251912345678"
  },
  {
    id: "3",
    code: "ASL-2024-009876",
    purchaseDate: "2024-12-20",
    status: "not-winner",
    drawDate: "2025-01-01"
  },
  {
    id: "4",
    code: "ASL-2024-008765",
    purchaseDate: "2024-12-10",
    status: "winner",
    drawDate: "2025-01-01"
  }
];

const MyTickets = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 10,
    minutes: 30,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case "winner":
        return (
          <Badge className="bg-stadium-green text-white">
            <Trophy className="w-3 h-3 mr-1" />
            Winner
          </Badge>
        );
      case "not-winner":
        return (
          <Badge variant="secondary">
            <XCircle className="w-3 h-3 mr-1" />
            Not Winner
          </Badge>
        );
      default:
        return (
          <Badge className="bg-stadium-blue text-white">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  const pendingTickets = mockTickets.filter((t) => t.status === "pending");
  const hasTickets = mockTickets.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Ticket className="w-10 h-10 text-primary" />
                <h1 className="text-4xl font-bold font-poppins">My Tickets</h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Track your lottery tickets and check results
              </p>
            </div>

         

            {/* Tickets List */}
            {hasTickets ? (
              <div className="space-y-4">
                {mockTickets.map((ticket, index) => (
                  <Card 
                    key={ticket.id} 
                    className="shadow-stadium hover:shadow-lg transition-stadium animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Ticket className="w-6 h-6 text-primary" />
                            <h3 className="text-xl font-bold font-poppins">
                              {ticket.code}
                            </h3>
                            {ticket.isGift && (
                              <Badge className="bg-stadium-gold text-white">
                                <Gift className="w-3 h-3 mr-1" />
                                Gift
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>Purchased: {new Date(ticket.purchaseDate).toLocaleDateString()}</p>
                            <p>Draw Date: {new Date(ticket.drawDate).toLocaleDateString()}</p>
                            {ticket.isGift && ticket.giftedTo && (
                              <p className="text-stadium-gold font-semibold">
                                Gifted — Sent to {ticket.giftedTo}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-2">
                         
                          {ticket.status === "winner" && (
                            <p className="text-stadium-gold font-bold text-sm">
                              Prize: 50,000 ETB
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* QR Code Placeholder */}
                      <div className="mt-4 pt-4 border-t flex justify-center">
                        <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">QR Code</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="shadow-stadium text-center p-12 animate-fade-in">
                <Ticket className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold font-poppins mb-2">No Tickets Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Purchase your first ticket to support Arbaminch Stadium
                </p>
                <Button asChild className="gradient-hero text-primary-foreground">
                  <Link to="/buy">Buy Tickets Now</Link>
                </Button>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyTickets;
