import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { RankingModal } from '../components/modals/RankingModal';
import { BreedingModal } from '../components/modals/BreedingModal';
import { RedeemModal } from '../components/modals/RedeemModal';
import { Menu } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { experienceForNextLevel } from '../utils/core';

function Dashboard() {
  const { player, feedSpiderAction, hydrateSpiderAction, updateTokens, updateBalance, updateSpider } = useGameStore();
  const activeSpider = player.spiders[0];

  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [isBreedingOpen, setIsBreedingOpen] = useState(false);
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);

  // Calculate level progress
  const nextLevelXP = activeSpider ? experienceForNextLevel(activeSpider.level) : 0;
  const currentLevelXP = activeSpider ? experienceForNextLevel(activeSpider.level - 1) : 0;
  const progressToNextLevel = activeSpider
    ? ((activeSpider.experience - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100
    : 0;

  // Update tokens periodically
  useEffect(() => {
    const interval = setInterval(() => {
      updateTokens();
    }, 60000);
    return () => clearInterval(interval);
  }, [updateTokens]);

  const handleFeed = () => {
    if (player.balance.feeders > 0 && activeSpider) {
      feedSpiderAction(activeSpider.id);
    }
  };

  const handleHydrate = () => {
    if (activeSpider && player.balance.feeders >= 2) {
      const updatedSpider = {
        ...activeSpider,
        hydration: Math.min(100, activeSpider.condition.hydration + 20),
        experience: activeSpider.experience + 5, // Add XP for hydrating
      };
      updateSpider(activeSpider.id, updatedSpider);
      updateBalance({ feeders: player.balance.feeders - 2 });
    }
  };

  const handleHeal = () => {
    const healCost = 50;
    if (activeSpider && player.balance.SPIDER >= healCost) {
      const updatedSpider = {
        ...activeSpider,
        condition: {
          ...activeSpider.condition,
          health: Math.min(100, activeSpider.condition.health + 20),
        },
      };
      updateSpider(activeSpider.id, updatedSpider);
      updateBalance({ SPIDER: player.balance.SPIDER - healCost });
    }
  };

  const sideButtonClasses = "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform bg-cover bg-center bg-no-repeat";

  if (!activeSpider) {
    return (
      <div className="game-container">
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-xl">No spider available. Visit the market to get one!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="status-bar flex justify-between items-center px-4 py-3 rounded-2xl">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-teal-700/90 px-4 py-2 rounded-xl">
            <div className="w-6 h-6 bg-blue-400 rounded-lg"></div>
            <span className="text-white font-bold">{player.balance.SPIDER} $SPIDER</span>
          </div>
          <div className="flex items-center gap-2 bg-teal-700/90 px-4 py-2 rounded-xl">
            <span className="text-xl">馃崠</span>
            <span className="text-white font-bold">{player.balance.feeders} Feeders</span>
          </div>
        </div>
      </div>

      <div className="side-buttons">
        <button 
          onClick={() => setIsRankingOpen(true)}
          className={`${sideButtonClasses} bg-yellow-500`}
          style={{ backgroundImage: "url('/path/to/ranking-icon.png')" }}
        >
          <div className="text-yellow-400">猸�</div>
        </button>
        <button 
          onClick={() => setIsBreedingOpen(true)}
          className={`${sideButtonClasses} bg-purple-500`}
          style={{ backgroundImage: "url('/path/to/breeding-icon.png')" }}
        >
          <div>馃暦锔�</div>
        </button>
        <button 
          onClick={() => setIsRedeemOpen(true)}
          className={`${sideButtonClasses} bg-blue-500`}
          style={{ backgroundImage: "url('/path/to/redeem-icon.png')" }}
        >
          <div className="bg-blue-400 w-8 h-8 rounded-xl"></div>
        </button>
      </div>

      <div className="right-buttons fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-40">
        <button 
          className={`${sideButtonClasses} bg-orange-500`}
          style={{ backgroundImage: "url('/path/to/target-icon.png')" }}
        >
          <span className="text-2xl">馃幆</span>
        </button>
        <button 
          className={`${sideButtonClasses} bg-purple-500`}
          style={{ backgroundImage: "url('/path/to/dress-icon.png')" }}
        >
          <span className="text-2xl">馃憰</span>
        </button>
        <button 
          className={`${sideButtonClasses} bg-blue-500`}
          style={{ backgroundImage: "url('/path/to/web-icon.png')" }}
        >
          <span className="text-2xl">馃暩锔�</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-md">
          <img 
            src="data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M200 0 L400 200 L200 400 L0 200 Z' fill='none' stroke='white' stroke-width='2'/%3E%3C/svg%3E"
            alt="Spider Web"
            className="w-full opacity-80"
          />
          <div className="absolute top-1/4 right-1/4">
            <div className="w-12 h-12 bg-green-800 rounded-2xl flex items-center justify-center">
              馃暦锔�
            </div>
          </div>
          
          {/* Spider Level Bar */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-teal-700/90 backdrop-blur-sm px-3 py-1 rounded-xl w-36">
            <div className="flex justify-center items-center">
              <span className="text-white font-bold text-sm">Level {activeSpider.level}</span>
            </div>
            <div className="w-full h-1.5 bg-teal-900/50 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-emerald-400 transition-all duration-300"
                style={{ width: `${progressToNextLevel}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 flex justify-around px-4 gap-2 z-40">
        <Menu as="div" className="relative">
          <Menu.Button className="flex-1 bg-red-500 rounded-full p-4 text-white font-bold shadow-lg flex flex-col items-center gap-1 hover:scale-105 transition-transform w-24 h-24">
            <span>鉂わ笍</span>
            <div className="w-full bg-black/30 rounded-xl h-2">
              <div 
                className="bg-white rounded-xl h-full transition-all duration-300"
                style={{ width: `${activeSpider.condition.health}%` }}
              ></div>
            </div>
            <span>{activeSpider.condition.health}%</span>
            <ChevronUpIcon className="w-4 h-4 absolute -top-2" />
          </Menu.Button>
          <Menu.Items className="absolute bottom-full mb-2 w-48 bg-white rounded-xl shadow-lg p-2 flex flex-col gap-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleHeal}
                  disabled={player.balance.SPIDER < 50}
                  className={`${
                    active ? 'bg-red-50' : ''
                  } p-2 rounded-lg flex items-center gap-2 w-full disabled:opacity-50`}
                >
                  <span>馃┕</span>
                  Heal Spider (+20 HP) - 50 $SPIDER
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-red-50' : ''
                  } p-2 rounded-lg flex items-center gap-2 w-full`}
                >
                  <span>馃拪</span>
                  Use Health Potion
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>

        <Menu as="div" className="relative">
          <Menu.Button className="flex-1 bg-blue-500 rounded-full p-4 text-white font-bold shadow-lg flex flex-col items-center gap-1 hover:scale-105 transition-transform w-24 h-24">
            <span>馃崠</span>
            <div className="w-full bg-black/30 rounded-xl h-2">
              <div 
                className="bg-white rounded-xl h-full transition-all duration-300"
                style={{ width: `${activeSpider.condition.hunger}%` }}
              ></div>
            </div>
            <span>{activeSpider.condition.hunger}%</span>
            <ChevronUpIcon className="w-4 h-4 absolute -top-2" />
          </Menu.Button>
          <Menu.Items className="absolute bottom-full mb-2 w-48 bg-white rounded-xl shadow-lg p-2 flex flex-col gap-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleFeed}
                  disabled={player.balance.feeders <= 0}
                  className={`${
                    active ? 'bg-blue-50' : ''
                  } p-2 rounded-lg flex items-center gap-2 w-full disabled:opacity-50`}
                >
                  <span>馃崠</span>
                  Feed Spider (-1 Feeder)
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-blue-50' : ''
                  } p-2 rounded-lg flex items-center gap-2 w-full`}
                >
                  <span>馃ォ</span>
                  Special Food (+40 Hunger)
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>

        <Menu as="div" className="relative">
          <Menu.Button className="flex-1 bg-yellow-500 rounded-full p-4 text-white font-bold shadow-lg flex flex-col items-center gap-1 hover:scale-105 transition-transform w-24 h-24">
            <span>馃挧</span>
            <div className="w-full bg-black/30 rounded-xl h-2">
              <div 
                className="bg-white rounded-xl h-full transition-all duration-300"
                style={{ width: `${activeSpider.condition.hydration}%` }}
              ></div>
            </div>
            <span>{activeSpider.condition.hydration}%</span>
            <ChevronUpIcon className="w-4 h-4 absolute -top-2" />
          </Menu.Button>
          <Menu.Items className="absolute bottom-full mb-2 w-48 bg-white rounded-xl shadow-lg p-2 flex flex-col gap-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleHydrate}
                  disabled={player.balance.feeders < 2}
                  className={`${
                    active ? 'bg-yellow-50' : ''
                  } p-2 rounded-lg flex items-center gap-2 w-full disabled:opacity-50`}
                >
                  <span>馃挧</span>
                  Hydrate Spider (+20%) - 2 Feeders
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-yellow-50' : ''
                  } p-2 rounded-lg flex items-center gap-2 w-full`}
                >
                  <span>馃И</span>
                  Energy Drink (+40%)
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>

      <RankingModal isOpen={isRankingOpen} onClose={() => setIsRankingOpen(false)} />
      <BreedingModal isOpen={isBreedingOpen} onClose={() => setIsBreedingOpen(false)} />
      <RedeemModal isOpen={isRedeemOpen} onClose={() => setIsRedeemOpen(false)} />
    </div>
  );
}

export default Dashboard;
