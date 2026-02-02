
import React, { useState } from 'react';
import { Persona } from './types';
import { PERSONAS } from './constants';
import { PersonaCard } from './components/PersonaCard';
import { ChatView } from './components/ChatView';

const App: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  const handleSelectPersona = (persona: Persona) => {
    setSelectedPersona(persona);
  };

  const handleBack = () => {
    setSelectedPersona(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      {!selectedPersona ? (
        <div className="w-full max-w-4xl animate-in fade-in zoom-in-95 duration-500">
          <header className="text-center mb-12">
            <div className="inline-block p-2 px-4 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-[0.2em] mb-4">
              AI Experiment No. 042
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
              The <span className="text-indigo-600">Why?</span> Family
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Choose an eccentric family member to talk to. 
              Be warned: you're only allowed to ask one question...
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERSONAS.map((persona) => (
              <PersonaCard 
                key={persona.id} 
                persona={persona} 
                onSelect={handleSelectPersona} 
              />
            ))}
          </div>

          <footer className="mt-20 text-center text-gray-400 text-sm italic">
            "The secret to intelligence is asking why until someone gets annoyed." — Probably a toddler
          </footer>
        </div>
      ) : (
        <div className="w-full h-[90vh] animate-in slide-in-from-right-12 fade-in duration-500">
          <ChatView persona={selectedPersona} onBack={handleBack} />
        </div>
      )}
    </div>
  );
};

export default App;
