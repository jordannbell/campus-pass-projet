import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Footer = () => {
  const navigation = {
    main: [
      { name: 'Accueil', href: '/' },
      { name: 'Écoles', href: '/#schools' },
      { name: 'Contact', href: '/#contact' },
      { name: 'Espace client', href: '/espace-client' },
      { name: 'Politique de confidentialité', href: '/politique-confidentialite' },
    ],
  };

  return (
    <footer className="bg-navy">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-8">
            <GraduationCap className="w-8 h-8 text-white" />
            <span className="text-2xl font-bold text-white ml-2">CampusPass</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 mb-8">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="text-center text-gray-400">
            <p className="mb-2">
              CampusPass - Votre passerelle vers les études en France
            </p>
            <p>
              © {new Date().getFullYear()} CampusPass. Tous droits réservés.
              <p className="text-xs italic">
                By Jordan.BELL
              </p>
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;