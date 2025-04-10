import React from 'react';
import { User } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  country: string;
  image: string;
  previousSchool: string;
  currentSchool: string;
  story: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  country,
  image,
  previousSchool,
  currentSchool,
  story
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div className="relative h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm">{country}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <p className="text-sm text-gray-600">Parcours précédent</p>
          <p className="font-medium">{previousSchool}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Formation actuelle</p>
          <p className="font-medium">{currentSchool}</p>
        </div>

        <p className="text-gray-700 italic">"{story}"</p>
      </div>
    </div>
  );
};

export default TestimonialCard;