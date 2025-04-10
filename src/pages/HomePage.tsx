import React, { useState, useRef, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck,
  Video,
  PiggyBank,
  Users,
  School,
  GraduationCap,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import Hero from '../components/Hero';
import TestimonialCard from '../components/TestimonialCard';
import SchoolCard from '../components/SchoolCard';
import ContactForm from '../components/ContactForm';
import AppointmentForm from '../components/AppointmentForm';

function HomePage() {
  const [showAppointment, setShowAppointment] = useState(false);
  const [currentSchoolPage, setCurrentSchoolPage] = useState(0);
  const schoolsContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const testimonials = [
    {
      name: "Leslie Ouinsou",
      country: "Bénin",
      image: "https://i.ibb.co/jvpnX4hc/image-10.jpg",
      previousSchool: "Université Catholique d'Afrique de l'Ouest",
      currentSchool: "Institut F2I de Vincennes",
      story: "Après mon BTS, CampusPass m'a aidé à obtenir une admission à l'Institut F2I. Leur accompagnement a été déterminant dans mon parcours."
    },
    {
      name: "Yempie Junior",
      country: "Cameroun",
      image: "https://i.ibb.co/VYCyqb2m/image-11.jpg",
      previousSchool: "Université de Yaoundé 1",
      currentSchool: "Digital School of Paris",
      story: "Grâce à CampusPass, j'ai pu intégrer un Master à Digital School of Paris. Leur expertise a facilité toutes les démarches."
    },
    {
      name: "Evelyne Rodrigue",
      country: "Côte d'Ivoire",
      image: "https://i.ibb.co/KzxSJ5LM/image1.jpg",
      previousSchool: "Baccalauréat en Côte d'Ivoire",
      currentSchool: "Bachelor en France",
      story: "Après mon Bac, CampusPass m'a guidé vers une admission en Bachelor. Un accompagnement professionnel qui a fait la différence."
    }
  ];

  const allSchools = [
    // Page 1
    {
      name: "HEC Paris",
      description: "Grande école de commerce réputée, notamment pour son MSc in International Finance.",
      image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "ESAM",
      description: "Présente à Paris, Lyon, Toulouse et Rennes, spécialisée en management, gestion et finance.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "ESG Finance",
      description: "Programmes Bachelor et Mastère en finance, avec des rentrées en février et octobre.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Epitech",
      description: "École d'informatique de renom formant des experts en développement et en cybersécurité.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Efrei Paris",
      description: "Grande école d'ingénieurs spécialisée en informatique et technologies du numérique.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Institut F2I",
      description: "École spécialisée dans les domaines de l'informatique, du digital et du commerce.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400"
    },
    // Page 2
    {
      name: "ESSEC",
      description: "Une des meilleures écoles de commerce en France, reconnue mondialement.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Sciences Po Paris",
      description: "Institution prestigieuse spécialisée en sciences politiques et relations internationales.",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Centrale Supélec",
      description: "École d'ingénieurs d'excellence, leader en sciences de l'information et de l'énergie.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "ESCP Europe",
      description: "Plus ancienne école de commerce au monde, présente dans plusieurs pays européens.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Polytechnique",
      description: "Institution prestigieuse formant l'élite des ingénieurs français.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "IESEG",
      description: "École de commerce internationale avec un excellent réseau professionnel.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const advantages = [
    {
      icon: <Users className="w-8 h-8 text-red-800" />,
      title: "Accompagnement Personnalisé",
      description: "Un suivi sur mesure pour chaque étudiant, de la sélection des écoles à l'obtention du visa."
    },
    {
      icon: <School className="w-8 h-8 text-red-800" />,
      title: "Réseau d'Écoles Partenaires",
      description: "Des partenariats solides avec les meilleures écoles françaises pour maximiser vos chances d'admission."
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-red-800" />,
      title: "Expertise Locale",
      description: "Une connaissance approfondie du système éducatif français et des procédures administratives."
    },
    {
      icon: <PiggyBank className="w-8 h-8 text-red-800" />,
      title: "Coût Attractif",
      description: "Seulement 29,99€ (19 672 FCFA) pour un accompagnement complet et professionnel."
    },
    {
      icon: <Video className="w-8 h-8 text-red-800" />,
      title: "Préparation Campus France",
      description: "Des appels vidéo réguliers pour vous préparer efficacement à l'entretien Campus France."
    },
    {
      icon: <UserCheck className="w-8 h-8 text-red-800" />,
      title: "Suivi Post-Admission",
      description: "Un accompagnement continu même après l'obtention de votre admission, jusqu'à votre arrivée en France."
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const schoolsPerPage = 6;
  const totalPages = Math.ceil(allSchools.length / schoolsPerPage);
  const displayedSchools = allSchools.slice(
    currentSchoolPage * schoolsPerPage,
    (currentSchoolPage + 1) * schoolsPerPage
  );

  useEffect(() => {
    let scrollInterval: NodeJS.Timeout;

    if (isAutoScrolling) {
      scrollInterval = setInterval(() => {
        setCurrentSchoolPage((prev) => (prev + 1) % totalPages);
      }, 5000); // Change page every 5 seconds
    }

    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [isAutoScrolling, totalPages]);

  const handleSchoolPageChange = (direction: 'prev' | 'next') => {
    setIsAutoScrolling(false);
    setCurrentSchoolPage((prev) => {
      if (direction === 'next') {
        return (prev + 1) % totalPages;
      } else {
        return prev === 0 ? totalPages - 1 : prev - 1;
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero setShowAppointment={setShowAppointment} />

      {/* About Section */}
      <motion.section
        id="about"
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-navy">Qui sommes-nous ?</h2>
          <div className="max-w-3xl mx-auto text-lg text-gray-700 space-y-6">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className='text-center'
            >
              CampusPass est une agence d'accompagnement spécialisée dans l'aide aux étudiants africains
              souhaitant poursuivre leurs études en France. Notre mission est de simplifier le processus
              d'admission et de maximiser vos chances de réussite.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className='text-center'
            >
              Nous ne remplaçons pas Campus France, mais nous vous permettons d'obtenir rapidement une
              admission solide qui renforcera considérablement votre dossier.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Advantages Section */}
      <motion.section
        id="advantages"
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-navy">Nos Avantages</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-red-50 rounded-full">
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-red-800">{advantage.title}</h3>
                  <p className="text-gray-600">{advantage.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-navy">Témoignages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Schools Section */}
      <motion.section
        id="schools"
        className="py-20 relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-navy">Écoles Partenaires</h2>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSchoolPage}
                initial={{ opacity: 0, x: 1000 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -1000 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                ref={schoolsContainerRef}
              >
                {displayedSchools.map((school, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SchoolCard {...school} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none">
              <button
                onClick={() => handleSchoolPageChange('prev')}
                className="pointer-events-auto transform -translate-x-4 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
              >
                <ChevronLeft className="w-6 h-6 text-red-800" />
              </button>
              <button
                onClick={() => handleSchoolPageChange('next')}
                className="pointer-events-auto transform translate-x-4 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
              >
                <ChevronRight className="w-6 h-6 text-red-800" />
              </button>
            </div>

            {/* Page Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSchoolPage(index);
                    setIsAutoScrolling(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSchoolPage === index ? 'bg-red-800 w-6' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-navy">Contact</h2>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </motion.section>

      {/* Appointment Modal */}
      <AnimatePresence>
        {showAppointment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4"
            >
              <h2 className="text-2xl font-bold mb-6">Prendre rendez-vous</h2>
              <AppointmentForm onClose={() => setShowAppointment(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HomePage;