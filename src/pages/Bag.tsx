import React from 'react';
import { useGameStore } from '../store/useGameStore';

function Bag() {
  const balance = useGameStore((state) => state.player.balance);

  const inventory = [
    { id: 1, name: 'Feeders', amount: balance.feeders, type: 'consumable' },
    { id: 2, name: 'Health Potion', amount: 3, type: 'consumable' },
    { id: 3, name: 'Experience Boost', amount: 1, type: 'boost' },
    { id: 4, name: 'Spider Egg', amount: 0, type: 'special' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Bag</h1>

      <div className="space-y-4">
        {inventory.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">Type: {item.type}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">x{item.amount}</p>
                {item.amount > 0 && (
                  <button className="text-sm text-blue-500">Use</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bag;