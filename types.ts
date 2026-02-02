
export type PersonaId = 'mom' | 'dad' | 'grandpa' | 'grandma' | 'sister' | 'brother';

export interface Persona {
  id: PersonaId;
  name: string;
  role: string;
  icon: string;
  color: string;
  description: string;
  systemInstruction: string;
  initialPrompt: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
