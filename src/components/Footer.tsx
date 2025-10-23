import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-12 mt-16">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold font-poppins mb-4">
              Arbaminch Stadium Lottery
            </h3>
            <p className="text-white/80 text-sm font-roboto">
              Official government lottery program supporting the construction of 
              Arbaminch Stadium - building Ethiopia's sports future together.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold font-poppins mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-stadium-gold" />
                <span className="font-bold">6111</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-stadium-gold" />
                <a href="mailto:info@arbaminchstadium.et" className="hover:text-stadium-gold transition-stadium">
                  info@arbaminchstadium.et
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-stadium-gold" />
                <span>Arbaminch, Ethiopia</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold font-poppins mb-4">Official Program</h4>
            <p className="text-white/80 text-sm mb-4">
              Endorsed by the Ethiopian Sports Commission
            </p>
            <div className="flex gap-2">
              <div className="w-3 h-8 bg-stadium-green rounded"></div>
              <div className="w-3 h-8 bg-stadium-gold rounded"></div>
              <div className="w-3 h-8 bg-stadium-blue rounded"></div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Ethiopian Sports Commission. All rights reserved.
          </p>
          <p className="text-white/60 text-xs mt-2">
            Play responsibly. Terms and conditions apply.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
