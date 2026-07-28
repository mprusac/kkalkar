import { Facebook, Instagram, Youtube } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const footerLinks = [
  { label: "O klubu", href: "#o-klubu" },
  { label: "Statistika", href: "/statistika" },
  { label: "Vijesti", href: "#vijesti" },
  { label: "Galerija", href: "/galerija" },
  { label: "Kontakt", href: "#kontakt" },
  { label: "Admin", href: "/admin" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/kk.alkar.official", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/kk.alkar.official/?hl=en", label: "Instagram" },
];

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      if (location.pathname !== "/") {
        sessionStorage.setItem("scrollToSection", id);
        navigate("/");
        return;
      }
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-background py-10 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-40 max-w-none mx-auto pl-0 lg:pl-36 text-center md:text-left">
          {/* Logo & Description */}
          <div className="-mt-12">
            <img src={logo} alt="KK Alkar Sinj" className="h-40 w-auto mb-0 mx-auto md:mx-0" />

            <p className="text-muted-foreground text-sm whitespace-nowrap -mt-8">
              „Najveći mali klub na svitu."
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg text-primary mb-4 uppercase tracking-wider">
              Kontakt
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Sinj, Hrvatska</p>
              <a
                href="mailto:ured.alkar@gmail.com"
                className="block hover:text-primary transition-colors"
              >
                ured.alkar@gmail.com
              </a>
              <a
                href="tel:+385996940066"
                className="block hover:text-primary transition-colors"
              >
                +385 99 694 0066
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-primary mb-4 uppercase tracking-wider">
              Brzi linkovi
            </h4>
            <nav className="space-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleHashClick(e, link.href)}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-primary/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} KK Alkar Sinj. Sva prava pridržana.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}


          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
