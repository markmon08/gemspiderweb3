export type Rarity = 'Common' | 'Excellent' | 'Rare' | 'Epic' | 'Legendary' | 'Mythical';
export type Genetics = 'S' | 'A' | 'J';

export interface Dress {
  id: string;
  name: string;
  rarity: Rarity;
  powerBonus: number;
}

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
    health: number; // Default: 100
    hunger: number; // Default: 100
    hydration: number; // Default: 100
  };
  generation: number; // Default: 1 for initial spiders
  parents?: {
    father: string;
    mother: string;
  };
  lastFed: Date;
  lastHydrated: Date;
  lastGemCollection: Date;
  isHibernating: boolean;
  isAlive: boolean; // Default: true
  dresses: Dress[]; // Equipped dresses
  createdAt: Date; // Timestamp when the spider was created
}
