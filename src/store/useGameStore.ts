import { create } from 'zustand';
import { Spider } from '../types/spider';

interface GameState {
  spiders: Spider[];
  balance: {
    spider: number;
    feeders: number;
  };
  addSpider: (spider: Spider) => void;
  updateSpider: (id: string, updates: Partial<Spider>) => void;
  removeSpider: (id: string) => void;
  updateBalance: (updates: Partial<GameState['balance']>) => void;
}

export const useGameStore = create<GameState>((set) => ({
  spiders: [{
    id: '1',
    name: 'Test Spider',
    rarity: 'Common',
    genetics: ['S', 'A', 'J'],
    level: 1,
    experience: 0,
    power: 65,
    stats: {
      attack: 10,
      defense: 10,
      agility: 10,
      luck: 10,
    },
    condition: {
      health: 100,
      hunger: 80,
      hydration: 90,
    },
    generation: 1,
    lastFed: new Date().toISOString(),
    lastHydrated: new Date().toISOString(),
    lastGemCollection: new Date().toISOString(),
    isHibernating: false,
  }],
  balance: {
    spider: 1000,
    feeders: 50,
  },
  addSpider: (spider) =>
    set((state) => ({ spiders: [...state.spiders, spider] })),
  updateSpider: (id, updates) =>
    set((state) => ({
      spiders: state.spiders.map((spider) =>
        spider.id === id ? { ...spider, ...updates } : spider
      ),
    })),
  removeSpider: (id) =>
    set((state) => ({
      spiders: state.spiders.filter((spider) => spider.id !== id),
    })),
  updateBalance: (updates) =>
    set((state) => ({
      balance: { ...state.balance, ...updates },
    })),
}));