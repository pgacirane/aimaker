import React from 'react';
import { Mail, Phone, Linkedin, Twitter, Network } from 'lucide-react';

function Footer({ id }) {
  const contactText = {
    headline: "Get in Touch",
    prompt: "Ready to enter African markets?",
    social: "Our social media:"
  };

  return (
    <footer id={id} className="border-t border-primary/10 bg-background/50 px-6 py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          
          {/* Brand/Column 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative rounded-lg bg-panel p-2 border border-primary">
                <Network className="h-6 w-6 text-primary" strokeWidth={1.5} />
              </div>
              <span className="font-heading text-xl font-bold text-white">Qomexis <span className="text-primaryAccent">Ltd</span></span>
            </div>
            <p className="text-sm text-textDim leading-relaxed">Regulatory Expertise & In-country Representation for Telecom, ICT, and IoTCompanies.</p>
          }

          {/* Contact and Provided Info Column 2 */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-textMain">{contactText.headline}</h4>
            <p className="text-sm text-primaryAccent font-medium">{contactText.prompt}</p>
            
            {/* Provided contact points */}
            <div className="space-y-3">
              <a href="mailto:info@qomexis.africa" className="flex items-center gap-3 text-textDim hover:text-white transition-colors">
                <Mail className="h-5 w-5 text-primaryAccent" strokeWidth={1.5} /> info@qomexis.africa
              </a>
              <a href="tel:+25412345678" className="flex items-center gap-3 text-textDim hover:text-white transition-colors">
                <Phone className="h-5 w-5 text-primaryAccent" strokeWidth={1.5} /> +254 123 45678
              </a>
            </div>
          </div>

          {/* Socials Column 3 */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-textMain">{contactText.social}</h4>
            <div className="flex gap-4">
              {/* Placeholders as required by text: LinkedIn, Twitter */}
              <a href="https://linkedin.com/company/qomexis" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-lg bg-panel p-3 border border-primary/20 hover:bg-primaryAccent transition-colors">
                <Linkedin className="h-6 w-6 text-primaryAccent hover:text-white" strokeWidth={1} />
              </a>
              <a href="https://twitter.com/qomexis" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="rounded-lg bg-panel p-3 border border-primary/20 hover:bg-primaryAccent transition-colors">
                <Twitter className="h-6 w-6 text-primaryAccent hover:text-white" strokeWidth={1} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="mt-12 border-t border-primary/10 pt-8 text-center">
          <p className="text-xs text-textDim">© {new Date().getFullYear()} Qomexis Ltd. Communication in Excellence.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;