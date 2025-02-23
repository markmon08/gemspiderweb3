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
  condition: { // Add a `condition` object
    health: number;
    hunger: number;
    hydration: number;
  };
  generation: number;
  parents?: {
    father: string;
    mother: string;
  };
  lastFed: Date;
  lastHydrated: Date;
  lastGemCollection: Date;
  lastTokenGeneration: Date;
  isHibernating: boolean;
  isAlive: boolean;
  dresses: Dress[];
  createdAt: Date;
}

export interface Player {
  id: string;
  spiders: Spider[];
  balance: {
    SPIDER: number;
    feeders: number;
    gems: number; // Add missing property
  };
  createdAt: Date;
  lastLogin: Date;
}
