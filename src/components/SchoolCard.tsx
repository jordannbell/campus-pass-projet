import React from 'react';
import { School } from 'lucide-react';

interface SchoolCardProps {
  name: string;
  description: string;
  image: string;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ name, description, image }) => {
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
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default SchoolCard;