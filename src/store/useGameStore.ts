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
  condition: {
    health: 100,
    hunger: 80,
    hydration: 90,
  },
  generation: 1,
  lastFed: new Date().toISOString(),
  lastHydrated: new Date().toISOString(),
  lastGemCollection: new Date().toISOString(),
  lastTokenGeneration: new Date().toISOString(),
  isHibernating: false,
  isAlive: true,
  dresses: [],
  createdAt: new Date().toISOString(),
};

const initialPlayer: Player = {
  id: '1',
  name: 'Player One',
  spiders: [initialSpider],
  balance: {
    SPIDER: 1000,
    feeders: 50,
    gems: 10,
  },
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
};

export const useGameStore = create<GameState>((set) => ({
  player: initialPlayer,

  feedSpiderAction: (spiderId: string) => set((state) => {
    const spiderIndex = state.player.spiders.findIndex(s => s.id === spiderId);
    if (spiderIndex === -1 || state.player.balance.feeders < 1) return state;

    const updatedSpider = feedSpider(state.player.spiders[spiderIndex]);
    const updatedSpiders = [...state.player.spiders];
    updatedSpiders[spiderIndex] = updatedSpider;

    return {
      player: {
        ...state.player,
        spiders: updatedSpiders,
        balance: {
          ...state.player.balance,
          feeders: state.player.balance.feeders - 1,
        },
      },
    };
  }),

  hydrateSpiderAction: (spiderId: string) => set((state) => {
    const spiderIndex = state.player.spiders.findIndex(s => s.id === spiderId);
    if (spiderIndex === -1 || state.player.balance.feeders < 1) return state;

    const updatedSpider = hydrateSpider(state.player.spiders[spiderIndex]);
    const updatedSpiders = [...state.player.spiders];
    updatedSpiders[spiderIndex] = updatedSpider;

    return {
      player: {
        ...state.player,
        spiders: updatedSpiders,
        balance: {
          ...state.player.balance,
          feeders: state.player.balance.feeders - 1,
        },
      },
    };
  }),

  updateTokens: () => set((state) => ({
    player: {
      ...state.player,
      ...updatePlayerTokens(state.player),
    },
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
