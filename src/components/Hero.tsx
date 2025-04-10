import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  setShowAppointment: (show: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ setShowAppointment }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-navy to-red-900 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2000"
          alt="Students studying"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Votre Avenir en France Commence Ici
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto"
        >
          Simplifiez votre admission dans les écoles françaises avec un accompagnement personnalisé
          et professionnel.
        </motion.p>

        {/* Conteneur des boutons mis à jour */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center" // Ajout de flex-col, gap-6 et justify-center
        >
          <button
            onClick={() => setShowAppointment(true)}
            className=" w-75 md:w-auto bg-red-800 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Réservez maintenant
          </button>

          <a
            href="#about"
            className=" w-64 md:w-auto inline-block bg-white text-navy px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            En savoir plus
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <a href="#about" className="text-white animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </a>
      </motion.div>
    </div>
  );
};

export default Hero;
