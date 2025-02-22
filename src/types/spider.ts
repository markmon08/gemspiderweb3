export type Rarity = 'Common' | 'Excellent' | 'Rare' | 'Epic' | 'Legendary' | 'Mythical';
export type Genetics = 'S' | 'A' | 'J';

export interface Spider {
  id: string;
  name: string;
  rarity: Rarity;
  genetics: Genetics[];
  level: number;
  experience: number;
  power: number;
  stats: {
    attack: number;
    defense: number;
    agility: number;
    luck: number;
  };
  condition: {
    health: number;
    hunger: number;
    hydration: number;
  };
  generation: number;
  parents?: {
    father: string;
    mother: string;
  };
  lastFed: string;
  lastHydrated: string;
  lastGemCollection: string;
  isHibernating: boolean;
}