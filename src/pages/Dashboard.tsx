import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { RankingModal } from '../components/modals/RankingModal';
import { BreedingModal } from '../components/modals/BreedingModal';
import { RedeemModal } from '../components/modals/RedeemModal';

function Dashboard() {
  const { spiders, balance } = useGameStore();
  const activeSpider = spiders[0];

  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [isBreedingOpen, setIsBreedingOpen] = useState(false);
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);

  const handleFeed = () => {
    if (balance.feeders > 0) {
      // Implement feeding logic
      console.log('Feeding spider');
    }
  };

  const handleHydrate = () => {
    // Implement hydration logic
    console.log('Hydrating spider');
  };

  return (
    <div className="game-container">
      <div className="status-bar flex justify-between items-center px-4 py-3 rounded-2xl">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 bg-teal-700/90 px-4 py-2 rounded-xl">
            <div className="w-6 h-6 bg-blue-400 rounded-lg"></div>
            <span className="text-white font-bold">{balance.spider} $SPIDER</span>
          </div>
          <div className="flex items-center gap-2 bg-teal-700/90 px-4 py-2 rounded-xl">
            <span className="text-xl">🍖</span>
            <span className="text-white font-bold">{balance.feeders} Feeders</span>
          </div>
        </div>
      </div>

      <div className="side-buttons">
        <button 
          onClick={() => setIsRankingOpen(true)}
          className="side-button"
        >
          <div className="text-yellow-400">⭐</div>
          <span className="text-sm">Ranking</span>
          <span className="font-bold">#1</span>
        </button>
        <button 
          onClick={() => setIsBreedingOpen(true)}
          className="side-button"
        >
          <div>🕷️</div>
          <span className="text-sm">Breeding</span>
        </button>
        <button 
          onClick={() => setIsRedeemOpen(true)}
          className="side-button"
        >
          <div className="bg-blue-400 w-8 h-8 rounded-xl"></div>
          <span className="text-sm">Redeem</span>
        </button>
      </div>

      <div className="right-buttons fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-40">
        <button className="bg-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform">
          <span className="text-2xl">🎯</span>
        </button>
        <button className="bg-purple-500 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform">
          <span className="text-2xl">👕</span>
        </button>
        <button className="bg-blue-500 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform">
          <span className="text-2xl">🕸️</span>
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
              🕷️
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 flex justify-around px-4 gap-2 z-40">
        <button 
          className="flex-1 bg-green-500 rounded-2xl p-4 text-white font-bold shadow-lg flex flex-col items-center gap-1 hover:scale-105 transition-transform"
          onClick={() => console.log('Health clicked')}
        >
          <span>❤️</span>
          <div className="w-full bg-black/30 rounded-xl h-2">
            <div 
              className="bg-white rounded-xl h-full transition-all duration-300"
              style={{ width: `${activeSpider.condition.health}%` }}
            ></div>
          </div>
          <span>{activeSpider.condition.health}%</span>
        </button>

        <button 
          className="flex-1 bg-blue-500 rounded-2xl p-4 text-white font-bold shadow-lg flex flex-col items-center gap-1 hover:scale-105 transition-transform"
          onClick={handleFeed}
        >
          <span>🍖</span>
          <div className="w-full bg-black/30 rounded-xl h-2">
            <div 
              className="bg-white rounded-xl h-full transition-all duration-300"
              style={{ width: `${activeSpider.condition.hunger}%` }}
            ></div>
          </div>
          <span>{activeSpider.condition.hunger}%</span>
        </button>

        <button 
          className="flex-1 bg-yellow-500 rounded-2xl p-4 text-white font-bold shadow-lg flex flex-col items-center gap-1 hover:scale-105 transition-transform"
          onClick={handleHydrate}
        >
          <span>💧</span>
          <div className="w-full bg-black/30 rounded-xl h-2">
            <div 
              className="bg-white rounded-xl h-full transition-all duration-300"
              style={{ width: `${activeSpider.condition.hydration}%` }}
            ></div>
          </div>
          <span>{activeSpider.condition.hydration}%</span>
        </button>
      </div>

      <RankingModal isOpen={isRankingOpen} onClose={() => setIsRankingOpen(false)} />
      <BreedingModal isOpen={isBreedingOpen} onClose={() => setIsBreedingOpen(false)} />
      <RedeemModal isOpen={isRedeemOpen} onClose={() => setIsRedeemOpen(false)} />
    </div>
  );
}

export default Dashboard;