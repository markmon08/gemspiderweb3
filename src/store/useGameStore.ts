import { create } from 'zustand';
import { Spider, Player } from '../types/spider';
import { feedSpider, hydrateSpider, updatePlayerTokens } from '../utils/core';

interface GameState {
  player: Player;
  feedSpiderAction: (spiderId: string) => void;
  hydrateSpiderAction: (spiderId: string) => void;
  updateTokens: () => void;
  addSpider: (spider: Spider) => void;
  updateSpider: (id: string, updates: Partial<Spider>) => void;
  removeSpider: (id: string) => void;
  updateBalance: (updates: Partial<Player['balance']>) => void;
}

const initialSpider: Spider = {
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
  hunger: 80,
  hydration: 90,
  health: 100,
  generation: 1,
  lastFed: new Date(),
  lastHydrated: new Date(),
  lastGemCollection: new Date(),
  lastTokenGeneration: new Date(),
  isHibernating: false,
  isAlive: true,
  dresses: [],
  createdAt: new Date(),
};

const initialPlayer: Player = {
  id: '1',
  spiders: [initialSpider],
  balance: {
    SPIDER: 1000,
    feeders: 50,
  },
  createdAt: new Date(),
  lastLogin: new Date(),
};

export const useGameStore = create<GameState>((set) => ({
  player: initialPlayer,
  
  feedSpiderAction: (spiderId: string) => set((state) => {
    const spider = state.player.spiders.find(s => s.id === spiderId);
    if (!spider || state.player.balance.feeders < 1) return state;

    const updatedSpider = feedSpider(spider, state.player.balance.feeders);
    return {
      player: {
        ...state.player,
        spiders: state.player.spiders.map(s => s.id === spiderId ? updatedSpider : s),
        balance: {
          ...state.player.balance,
          feeders: state.player.balance.feeders - 1,
        },
      },
    };
  }),

  hydrateSpiderAction: (spiderId: string) => set((state) => {
    const spider = state.player.spiders.find(s => s.id === spiderId);
    if (!spider) return state;

    const updatedSpider = hydrateSpider(spider);
    return {
      player: {
        ...state.player,
        spiders: state.player.spiders.map(s => s.id === spiderId ? updatedSpider : s),
      },
    };
  }),

  updateTokens: () => set((state) => ({
    player: updatePlayerTokens(state.player),
  })),

  addSpider: (spider) => set((state) => ({
    player: {
      ...state.player,
      spiders: [...state.player.spiders, spider],
    },
  })),

  updateSpider: (id, updates) => set((state) => ({
    player: {
      ...state.player,
      spiders: state.player.spiders.map((spider) =>
        spider.id === id ? { ...spider, ...updates } : spider
      ),
    },
  })),

  removeSpider: (id) => set((state) => ({
    player: {
      ...state.player,
      spiders: state.player.spiders.filter((spider) => spider.id !== id),
    },
  })),

  updateBalance: (updates) => set((state) => ({
    player: {
      ...state.player,
      balance: { ...state.player.balance, ...updates },
    },
  })),
}));
