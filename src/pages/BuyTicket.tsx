import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Ticket, Gift, User, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

const BuyTicket = () => {
  const [quantity, setQuantity] = useState(1);
  const [currency, setCurrency] = useState<"ETB" | "USD">("ETB");
  const [hasPurchased, setHasPurchased] = useState(false);
  const [isGiftMode, setIsGiftMode] = useState(false);
  const [receiverName, setReceiverName] = useState("");
  const [receiverContact, setReceiverContact] = useState("");
  const [showGiftSuccess, setShowGiftSuccess] = useState(false);
  const [sendMethod, setSendMethod] = useState<"phone" | "email">("phone");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const pricePerTicket = currency === "ETB" ? 100 : 3;
  const total = quantity * pricePerTicket;

  const toTitleCase = (str: string) =>
    str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

  const handleNameChange = (value: string) => setReceiverName(toTitleCase(value));

  const validatePhone = (phone: string) => {
    const cleanPhone = phone.replace(/^\+251\s*/, "").replace(/\s/g, "");
    if (cleanPhone.length === 0) {
      setPhoneError("");
      return false;
    }
    if (cleanPhone.length !== 9) {
      setPhoneError("Must be exactly 9 digits");
      return false;
    }
    if (!/^\d+$/.test(cleanPhone)) {
      setPhoneError("Only numbers allowed");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateEmail = (email: string) => {
    if (email.length === 0) {
      setEmailError("");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleContactChange = (value: string) => {
    if (sendMethod === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 9);
      const formatted = `+251 ${digits}`;
      setReceiverContact(formatted);
      validatePhone(formatted);
    } else {
      setReceiverContact(value);
      validateEmail(value);
    }
  };

  const handleSendMethodChange = (method: "phone" | "email") => {
    setSendMethod(method);
    setReceiverContact("");
    setPhoneError("");
    setEmailError("");
  };

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value) || 1;
    setQuantity(Math.max(1, Math.min(100, num)));
  };

  const incrementQuantity = () => setQuantity((prev) => Math.min(100, prev + 1));
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const isGiftFormValid = () => {
    if (!receiverName || !receiverContact) return false;
    return sendMethod === "phone" ? validatePhone(receiverContact) : validateEmail(receiverContact);
  };

  const handlePurchase = () => {
    setHasPurchased(true);
    if (isGiftMode && receiverName && receiverContact) {
      setShowGiftSuccess(true);
      toast.success(`Gift ticket sent to ${receiverName}!`, {
        description: `Ticket code sent to ${receiverContact}`,
      });
      setTimeout(() => {
        setShowGiftSuccess(false);
        setReceiverName("");
        setReceiverContact("");
        setPhoneError("");
        setEmailError("");
      }, 3000);
    } else {
      toast.success(
        `Successfully purchased ${quantity} ticket${quantity > 1 ? "s" : ""}!`,
        { description: "Check 'My Tickets' page to view your tickets" }
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Ticket className="w-10 h-10 text-stadium-green" />
                <h1 className="text-4xl font-bold font-poppins">Buy Lottery Tickets</h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Support Arbaminch Stadium and win amazing prizes
              </p>
            </div>

            <Card className="shadow-stadium animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl font-poppins">Select Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">

                {/* Purchase Type */}
                <div>
                  <Label className="text-base mb-3 block">Purchase Type</Label>
                  <div className="flex gap-3">
                    <Button
                      variant={!isGiftMode ? "default" : "outline"}
                      onClick={() => setIsGiftMode(false)}
                      className={!isGiftMode ? "gradient-green" : ""}
                    >
                      <User className="w-4 h-4 mr-2" /> Buy for Myself
                    </Button>
                    <Button
                      variant={isGiftMode ? "default" : "outline"}
                      onClick={() => setIsGiftMode(true)}
                      className={isGiftMode ? "gradient-green" : ""}
                    >
                      <Gift className="w-4 h-4 mr-2" /> Send as Gift
                    </Button>
                  </div>
                </div>

                {/* Gift Recipient */}
                {isGiftMode && (
                  <div className="space-y-4 animate-slide-down bg-muted/30 p-4 rounded-lg border-2 border-stadium-gold/30">
                    <div className="flex items-center gap-2 text-stadium-gold mb-2">
                      <Gift className="w-5 h-5" />
                      <span className="font-semibold">Gift Recipient Details</span>
                    </div>

                    <div>
                      <Label htmlFor="receiverName" className="text-base mb-2 block">
                        Receiver Full Name
                      </Label>
                      <Input
                        id="receiverName"
                        type="text"
                        placeholder="Enter recipient's full name"
                        value={receiverName}
                        onChange={(e) => handleNameChange(e.target.value)}
                        className="h-12"
                      />
                    </div>

                    <div>
                      <Label className="text-base mb-3 block">Send Method</Label>
                      <div className="flex gap-3 mb-3">
                        <Button
                          type="button"
                          variant={sendMethod === "phone" ? "default" : "outline"}
                          onClick={() => handleSendMethodChange("phone")}
                          className={sendMethod === "phone" ? "gradient-green flex-1" : "flex-1"}
                        >
                          <Phone className="w-4 h-4 mr-2" /> Phone Number
                        </Button>
                        <Button
                          type="button"
                          variant={sendMethod === "email" ? "default" : "outline"}
                          onClick={() => handleSendMethodChange("email")}
                          className={sendMethod === "email" ? "gradient-green flex-1" : "flex-1"}
                        >
                          <Mail className="w-4 h-4 mr-2" /> Email
                        </Button>
                      </div>

                      <div className="relative animate-fade-in" key={sendMethod}>
                        {sendMethod === "phone" ? (
                          <>
                            <Label htmlFor="receiverContact" className="text-sm mb-2 block text-muted-foreground">
                              Ethiopian Mobile Number
                            </Label>
                            <div className="relative">
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground font-semibold pointer-events-none text-base">
                                +251
                              </div>
                              <Input
                                id="receiverContact"
                                type="tel"
                                placeholder="912345678"
                                value={receiverContact.replace("+251 ", "")}
                                onChange={(e) => handleContactChange(e.target.value)}
                                className={`h-12 pl-16 text-base font-semibold ${phoneError ? "border-destructive" : ""}`}
                              />
                            </div>
                            {phoneError ? (
                              <p className="text-xs text-destructive mt-1 animate-fade-in">{phoneError}</p>
                            ) : (
                              <p className="text-xs text-muted-foreground mt-1">
                                Enter 9-digit Ethiopian mobile number
                              </p>
                            )}
                          </>
                        ) : (
                          <>
                            <Label htmlFor="receiverContact" className="text-sm mb-2 block text-muted-foreground">
                              Email Address
                            </Label>
                            <div className="relative">
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <Mail className="w-4 h-4" />
                              </div>
                              <Input
                                id="receiverContact"
                                type="email"
                                placeholder="recipient@example.com"
                                value={receiverContact}
                                onChange={(e) => handleContactChange(e.target.value)}
                                className={`h-12 pl-10 ${emailError ? "border-destructive" : ""}`}
                              />
                            </div>
                            {emailError ? (
                              <p className="text-xs text-destructive mt-1 animate-fade-in">{emailError}</p>
                            ) : (
                              <p className="text-xs text-muted-foreground mt-1">
                                Ticket code will be sent to this email address
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Currency */}
                <div>
                  <Label className="text-base mb-3 block">Currency</Label>
                  <div className="flex gap-3">
                    <Button
                      variant={currency === "ETB" ? "default" : "outline"}
                      onClick={() => setCurrency("ETB")}
                      className={currency === "ETB" ? "gradient-green" : ""}
                    >
                      ETB (Birr)
                    </Button>
                    <Button
                      variant={currency === "USD" ? "default" : "outline"}
                      onClick={() => setCurrency("USD")}
                      className={currency === "USD" ? "gradient-green" : ""}
                    >
                      USD (Dollar)
                    </Button>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div>
                  <Label htmlFor="quantity" className="text-base mb-3 block">
                    Number of Tickets
                  </Label>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      max="100"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      className="text-center text-2xl font-bold h-14"
                    />
                    <Button variant="outline" size="icon" onClick={incrementQuantity} disabled={quantity >= 100}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Maximum 100 tickets per transaction
                  </p>
                </div>

                {/* Price */}
                <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                  <div className="flex justify-between text-lg">
                    <span>Price per ticket:</span>
                    <span className="font-semibold">{pricePerTicket} {currency}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Quantity:</span>
                    <span className="font-semibold">{quantity}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-2xl font-bold font-poppins">
                    <span>Total:</span>
                    <span className="text-green-500 bg-white">{total} {currency}</span>
                  </div>
                </div>

                {/* Purchase Button */}
                <Button
                  onClick={handlePurchase}
                  size="lg"
                  className="w-full gradient-green text-white hover:opacity-90 transition-stadium text-lg h-14"
                  disabled={isGiftMode && !isGiftFormValid()}
                >
                  {isGiftMode ? (
                    <>
                      <Gift className="w-5 h-5 mr-2" />
                      Send Gift Ticket
                    </>
                  ) : hasPurchased ? "Buy More Tickets" : "Buy Tickets"}
                </Button>

                {/* Payment Placeholder */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Secure payment processing
                  </p>
                  <div className="flex justify-center gap-4 opacity-50">
                    <div className="px-4 py-2 border rounded-md text-xs font-semibold">TELEBIRR</div>
                    <div className="px-4 py-2 border rounded-md text-xs font-semibold">CBE BIRR</div>
                    <div className="px-4 py-2 border rounded-md text-xs font-semibold">M-PESA</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gift Success */}
            {showGiftSuccess && (
              <Card className="mt-6 shadow-stadium animate-scale-in bg-gradient-to-r from-stadium-green/10 to-stadium-gold/10 border-2 border-stadium-gold">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4 animate-bounce">
                    <Gift className="w-16 h-16 text-stadium-gold" />
                  </div>
                  <h3 className="text-2xl font-bold font-poppins mb-2 text-stadium-green">
                    🎉 Gift Sent Successfully!
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    Ticket code has been sent to <strong>{receiverName}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">via {receiverContact}</p>
                  <div className="mt-4 p-3 bg-white/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      🎁 Message: "You have received a Lottery Ticket Gift supporting Arbaminch Stadium. Ticket Code: ASL-2025-XXXX"
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>
                For assistance, call <strong className="text-foreground">6111</strong> or
                email <strong className="text-foreground">support@arbaminchstadium.et</strong>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BuyTicket;
