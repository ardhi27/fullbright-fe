import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer id="about" className="bg-accent text-accent-foreground py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <img 
              src={logo} 
              alt="Fullbright Indonesia" 
              className="h-12 w-auto mb-4 brightness-0 invert" 
            />
            <p className="text-accent-foreground/70 max-w-md mb-6">
              A hybrid assessment platform combining AI-powered grading with instructor validation 
              for the most authentic TOEFL & IELTS preparation experience.
            </p>
            <p className="text-sm text-accent-foreground/50">
              Developed by Kodeka Labs for Fulbright Indonesia
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-accent-foreground/70 hover:text-accent-foreground transition-colors text-sm">
                  IELTS Practice
                </a>
              </li>
              <li>
                <a href="#" className="text-accent-foreground/70 hover:text-accent-foreground transition-colors text-sm">
                  TOEFL Practice
                </a>
              </li>
              <li>
                <a href="#" className="text-accent-foreground/70 hover:text-accent-foreground transition-colors text-sm">
                  Score Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-accent-foreground/70 hover:text-accent-foreground transition-colors text-sm">
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
                <a href="#" className="text-accent-foreground/70 hover:text-accent-foreground transition-colors text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-accent-foreground/70 hover:text-accent-foreground transition-colors text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-accent-foreground/70 hover:text-accent-foreground transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-accent-foreground/70 hover:text-accent-foreground transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-accent-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-accent-foreground/50">
              © 2024 Fullbright Indonesia. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-accent-foreground/50 hover:text-accent-foreground transition-colors">
                Instagram
              </a>
              <a href="#" className="text-sm text-accent-foreground/50 hover:text-accent-foreground transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-sm text-accent-foreground/50 hover:text-accent-foreground transition-colors">
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
