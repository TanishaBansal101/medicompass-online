
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <h3 className="font-bold text-xl text-gradient">HealthCare</h3>
          <p className="text-muted-foreground text-sm">
            Providing comprehensive healthcare solutions with a focus on patient experience and quality care.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-health-500 transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-health-500 transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-health-500 transition-colors">
              <Instagram size={18} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/checkup" className="text-muted-foreground hover:text-foreground transition-colors">Health Checkups</Link></li>
            <li><Link to="/therapy" className="text-muted-foreground hover:text-foreground transition-colors">Therapy Services</Link></li>
            <li><Link to="/doctors" className="text-muted-foreground hover:text-foreground transition-colors">Find a Doctor</Link></li>
            <li><Link to="/community" className="text-muted-foreground hover:text-foreground transition-colors">Community Support</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/blogs" className="text-muted-foreground hover:text-foreground transition-colors">Blog & Articles</Link></li>
            <li><Link to="/blogs" className="text-muted-foreground hover:text-foreground transition-colors">Health Guidelines</Link></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-health-500" />
              <span className="text-muted-foreground">123 Healthcare Avenue, Medical District</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-health-500" />
              <span className="text-muted-foreground">+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-health-500" />
              <span className="text-muted-foreground">contact@healthcare.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} HealthCare Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
