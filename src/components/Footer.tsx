import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container-tight section-padding">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <h3 className="font-heading font-bold text-xl mb-3">
            KDY <span className="text-accent">InfoTech</span>
          </h3>
          <p className="text-primary-foreground/70 text-sm max-w-sm leading-relaxed">
            Premium refurbished laptops & electronics. Quality you can trust, prices you'll love.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider text-primary-foreground/50">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[{ to: "/", label: "Home" }, { to: "/products", label: "Products" }, { to: "/about", label: "About" }, { to: "/contact", label: "Contact" }].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider text-primary-foreground/50">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <span>📞 +91 97111 27853</span>
            <span>📧 info@kdyinfotech.com</span>
            <a
              href="https://wa.me/919711127853?text=Hi%20KDY%20InfoTech!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium hover:brightness-110 transition-all w-fit"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} KDY InfoTech. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
