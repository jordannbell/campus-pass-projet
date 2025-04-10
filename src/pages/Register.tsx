import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// Validation patterns
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_MIN_LENGTH = 8;

interface FormErrors {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  currentDiploma?: string;
  academicGoals?: string;
}

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    currentDiploma: '',
    academicGoals: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!EMAIL_PATTERN.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < PASSWORD_MIN_LENGTH) {
      newErrors.password = `Le mot de passe doit contenir au moins ${PASSWORD_MIN_LENGTH} caractères`;
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    if (!formData.currentDiploma.trim()) {
      newErrors.currentDiploma = 'Le diplôme actuel est requis';
    }
    if (!formData.academicGoals.trim()) {
      newErrors.academicGoals = 'Les objectifs académiques sont requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName
          }
        }
      });

      if (authError) {
        throw new Error(
          authError.message === 'User already registered'
            ? 'Cet email est déjà utilisé'
            : authError.message
        );
      }

      if (!authData.user) {
        throw new Error('Erreur lors de la création du compte');
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          current_diploma: formData.currentDiploma,
          academic_goals: formData.academicGoals
        });

      if (profileError) {
        throw new Error('Erreur lors de la création du profil');
      }

      toast.success('Inscription réussie ! Redirection vers la connexion...');
      setTimeout(() => {
        navigate('/connexion');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error instanceof Error ? error.message : 'Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{' '}
          <Link to="/connexion" className="font-medium text-red-800 hover:text-red-700">
            connectez-vous à votre compte existant
          </Link>
        </p>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <motion.div className="grid grid-cols-2 gap-4" variants={itemVariants}>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  Prénom
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-red-800 focus:ring-red-800 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-red-800 focus:ring-red-800 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-red-800 focus:ring-red-800 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-red-800 focus:ring-red-800 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Au moins {PASSWORD_MIN_LENGTH} caractères
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="currentDiploma" className="block text-sm font-medium text-gray-700">
                Diplôme actuel
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                id="currentDiploma"
                name="currentDiploma"
                type="text"
                required
                value={formData.currentDiploma}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-red-800 focus:ring-red-800 ${
                  errors.currentDiploma ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.currentDiploma && (
                <p className="mt-1 text-sm text-red-600">{errors.currentDiploma}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="academicGoals" className="block text-sm font-medium text-gray-700">
                Objectifs académiques
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                id="academicGoals"
                name="academicGoals"
                rows={3}
                required
                value={formData.academicGoals}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-red-800 focus:ring-red-800 ${
                  errors.academicGoals ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Décrivez vos objectifs d'études en France..."
              />
              {errors.academicGoals && (
                <p className="mt-1 text-sm text-red-600">{errors.academicGoals}</p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-800 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                {isLoading ? 'Inscription...' : 'S\'inscrire'}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;