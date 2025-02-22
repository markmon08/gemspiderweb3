import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useGameStore } from '../../store/useGameStore';

interface BreedingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BreedingModal({ isOpen, onClose }: BreedingModalProps) {
  const { spiders } = useGameStore();
  const [selectedSpiders, setSelectedSpiders] = useState<string[]>([]);

  const handleBreed = () => {
    // Implement breeding logic here
    console.log('Breeding spiders:', selectedSpiders);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
          <Dialog.Title className="text-2xl font-bold mb-4">Spider Breeding</Dialog.Title>

          <div className="space-y-4">
            <p className="text-gray-600">Select two spiders to breed:</p>
            
            <div className="grid grid-cols-2 gap-3">
              {spiders.map((spider) => (
                <button
                  key={spider.id}
                  onClick={() => {
                    if (selectedSpiders.includes(spider.id)) {
                      setSelectedSpiders(selectedSpiders.filter(id => id !== spider.id));
                    } else if (selectedSpiders.length < 2) {
                      setSelectedSpiders([...selectedSpiders, spider.id]);
                    }
                  }}
                  className={`p-4 rounded-xl border-2 transition-colors ${
                    selectedSpiders.includes(spider.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-2xl mb-2">🕷️</div>
                  <div className="font-medium">{spider.name}</div>
                  <div className="text-sm text-gray-500">Level {spider.level}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 py-3 rounded-xl hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleBreed}
              disabled={selectedSpiders.length !== 2}
              className="flex-1 bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Breed
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}