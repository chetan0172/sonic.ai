import React from 'react';
import { Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-900 via-primary-900 to-purple-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center mb-6">
              <span className="text-2xl font-['Helvetica'] text-white">
                Zsonic.ai
              </span>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md">
              Transform your content strategy with AI-powered drip campaigns. Automate, optimize, and scale your content distribution across all platforms.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="https://x.com/AiZsonic6209" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://www.instagram.com/zsonic.ai/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/107346929/admin/dashboard/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-primary-400">Contact Us</h3>
            <div className="space-y-4">
              <button 
                onClick={() => window.location.href = 'mailto:support@zsonic.ai'}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all hover:scale-105"
              >
                <Mail size={20} />
                support@zsonic.ai
              </button>
              
              <div className="flex flex-col gap-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary-400" />
                  <span>Mumbai, IN</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-primary-400" />
                  <span>+919988230172</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-center">
            © 2025 Zsonic.ai. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;