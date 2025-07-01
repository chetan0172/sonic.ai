export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Persona {
  id: number;
  name: string;
  role: string;
  avatar: string;
  pain: string;
  solution: string;
}

export interface UseCase {
  id: number;
  title: string;
  steps: {
    number: number;
    description: string;
  }[];
  result: string;
}