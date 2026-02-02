
import React from 'react';
import { Persona } from '../types';

interface PersonaCardProps {
  persona: Persona;
  onSelect: (persona: Persona) => void;
}

export const PersonaCard: React.FC<PersonaCardProps> = ({ persona, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(persona)}
      className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 ${persona.color} w-full text-center group`}
    >
      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:rotate-12 transition-transform">
        <i className={`${persona.icon} text-2xl`}></i>
      </div>
      <h3 className="text-xl font-bold mb-1">{persona.name}</h3>
      <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-3">{persona.role}</p>
      <p className="text-sm italic opacity-80">{persona.description}</p>
    </button>
  );
};
