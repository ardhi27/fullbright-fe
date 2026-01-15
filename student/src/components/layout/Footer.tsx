import logo from "@/assets/logo-wordmark.png";
import kodekaLogoDark from "@/assets/kodeka_logo.png";
import kodekaLogoLight from "@/assets/Kodeka_Black.png";

interface FooterProps {
  variant?: 'light' | 'dark';
}

// Kodeka Labs Logo Component (styled text version)
function KodekaLogo({ className = "", variant = 'dark' }: { className?: string; variant?: 'light' | 'dark' }) {
  const logoSrc = variant === 'light' ? kodekaLogoLight : kodekaLogoDark;
  return (
    <img src={logoSrc} alt="Kodeka Labs" className={`h-8 w-auto ${className}`} />
  );
}

const Footer = ({ variant = 'dark' }: FooterProps) => {
  const isLight = variant === 'light';
  
  const footerStyles = isLight 
    ? "bg-white text-foreground border-t border-border" 
    : "bg-accent text-accent-foreground";
    
  const textMutedStyles = isLight 
    ? "text-muted-foreground" 
    : "text-accent-foreground/70";
    
  const textSubtleStyles = isLight 
    ? "text-muted-foreground" 
    : "text-accent-foreground/50";

  const linkStyles = isLight
    ? "text-muted-foreground hover:text-foreground"
    : "text-accent-foreground/70 hover:text-accent-foreground";

  const bottomBorderStyles = isLight
    ? "border-t border-border"
    : "border-t border-accent-foreground/10";

  return (
    <footer id="about" className={`${footerStyles} py-16 transition-colors duration-300`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <img 
              src={logo} 
              alt="Fullbright Indonesia" 
              className={`h-20 w-auto mb-6 ${!isLight ? 'brightness-0 invert' : ''}`} 
            />
            <p className={`${textMutedStyles} max-w-md mb-6`}>
              A hybrid assessment platform with professional instructor validation 
              for the most authentic TOEFL & IELTS preparation experience.
            </p>
            <div className={`flex items-center gap-2 text-sm ${textSubtleStyles}`}>
              <span>Built by</span>
              <a 
                href="https://www.instagram.com/kodekalabs/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <KodekaLogo variant={variant} className="text-sm" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`${linkStyles} transition-colors text-sm`}>
                  IELTS Practice
                </a>
              </li>
              <li>
                <a href="#" className={`${linkStyles} transition-colors text-sm`}>
                  TOEFL Practice
                </a>
              </li>
              <li>
                <a href="#" className={`${linkStyles} transition-colors text-sm`}>
                  Score Reports
                </a>
              </li>
              <li>
                <a href="#" className={`${linkStyles} transition-colors text-sm`}>
                  Study Materials
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`${linkStyles} transition-colors text-sm`}>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className={`${linkStyles} transition-colors text-sm`}>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className={`${linkStyles} transition-colors text-sm`}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className={`${linkStyles} transition-colors text-sm`}>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 ${bottomBorderStyles}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className={`text-sm ${textSubtleStyles}`}>
              © {new Date().getFullYear()} Fullbright Indonesia. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className={`text-sm ${textSubtleStyles} hover:${isLight ? 'text-foreground' : 'text-accent-foreground'} transition-colors`}>
                Instagram
              </a>
              <a href="#" className={`text-sm ${textSubtleStyles} hover:${isLight ? 'text-foreground' : 'text-accent-foreground'} transition-colors`}>
                LinkedIn
              </a>
              <a href="#" className={`text-sm ${textSubtleStyles} hover:${isLight ? 'text-foreground' : 'text-accent-foreground'} transition-colors`}>
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
