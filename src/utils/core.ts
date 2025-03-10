import { Spider, Player } from '../types/spider';

// Constants
const TOKEN_GENERATION_RATE = 0.1; // Tokens generated per power point per hour
const BASE_XP_PER_FEED = 10;
const XP_PER_LEVEL = 100;

// Helper: Get feeders needed based on level
export const getFeedersNeeded = (level: number): number => {
  if (level <= 10) return 7;
  if (level <= 20) return 10;
  if (level <= 25) return 12;
  if (level <= 30) return 15;
  if (level <= 45) return 20;
  if (level <= 60) return 25;
  if (level <= 80) return 30;
  return 40; // Level 81-100
};

// Helper: Calculate level from experience
export const calculateLevel = (experience: number): number => {
  return Math.floor(experience / XP_PER_LEVEL) + 1;
};

// Helper: Calculate experience needed for next level
export const experienceForNextLevel = (level: number): number => {
  return level * XP_PER_LEVEL;
};

// Core System: Feed a spider
export const feedSpider = (spider: Spider, availableFeeders: number): Spider | null => {
  const feedersNeeded = getFeedersNeeded(spider.level);
  if (availableFeeders < feedersNeeded) {
    return null;
  }

  const xpGained = BASE_XP_PER_FEED * (1 + spider.level * 0.1);
  const newExperience = spider.experience + xpGained;
  const newLevel = calculateLevel(newExperience);

  return {
    ...spider,
    condition: {
      ...spider.condition,
      hunger: Math.min(100, spider.condition.hunger + 20), // Increase hunger by 20%
    },
    experience: newExperience,
    level: newLevel,
    lastFed: new Date().toISOString(),
  };
};

// Core System: Hydrate a spider
export const hydrateSpider = (spider: Spider): Spider => {
  return {
    ...spider,
    condition: {
      ...spider.condition,
      hydration: Math.min(100, spider.condition.hydration + 20), // Increase hydration by 20%
    },
    lastHydrated: new Date().toISOString(),
  };
};

// Core System: Calculate tokens generated by a spider
export const calculateTokensGenerated = (spider: Spider): number => {
  if (spider.isHibernating) {
    return 0; // No tokens generated during hibernation
  }

  const now = new Date();
  const lastGenerationTime = new Date(spider.lastTokenGeneration);
  const timeElapsed = (now.getTime() - lastGenerationTime.getTime()) / (1000 * 60 * 60); // Time in hours

  const tokensGenerated = spider.power * TOKEN_GENERATION_RATE * timeElapsed;
  return Math.floor(tokensGenerated * 100) / 100; // Round to 2 decimal places
};

// Core System: Update player tokens based on all spiders
export const updatePlayerTokens = (player: Player): Player => {
  let totalTokensGenerated = 0;

  const updatedSpiders = player.spiders.map((spider) => {
    const tokensGenerated = calculateTokensGenerated(spider);
    totalTokensGenerated += tokensGenerated;

    return {
      ...spider,
      lastTokenGeneration: new Date().toISOString(),
    };
  });

  return {
    ...player,
    balance: {
      ...player.balance,
      SPIDER: Math.floor((player.balance.SPIDER + totalTokensGenerated) * 100) / 100,
    },
    spiders: updatedSpiders,
  };
};
