import React from 'react';
import { Dialog } from '@headlessui/react';
import { useGameStore } from '../../store/useGameStore';

interface RankingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RankingModal({ isOpen, onClose }: RankingModalProps) {
  const { player } = useGameStore();
  const totalPower = player.spiders.reduce((sum, s) => sum + s.power, 0);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
          <Dialog.Title className="text-2xl font-bold mb-4">Rankings</Dialog.Title>

          <div className="space-y-4">
            <div className="bg-yellow-100 p-4 rounded-xl">
              <p className="font-bold">Your Rank: #1</p>
              <p className="text-sm text-gray-600">Total Power: {totalPower}</p>
            </div>

            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="font-bold">#{i + 1}</span>
                    <span>Player {i + 1}</span>
                  </div>
                  <span className="text-gray-600">{10000 - i * 1000} Power</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 bg-gray-200 py-3 rounded-xl hover:bg-gray-300 transition-colors font-medium"
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
