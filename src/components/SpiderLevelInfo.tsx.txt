import React from 'react';
import { Spider } from '../types/spider';
import { experienceForNextLevel } from '../utils/core';

interface SpiderLevelInfoProps {
  spider: Spider;
}

export function SpiderLevelInfo({ spider }: SpiderLevelInfoProps) {
  const nextLevelXP = experienceForNextLevel(spider.level);
  const currentLevelXP = experienceForNextLevel(spider.level - 1);
  const progressToNextLevel = ((spider.experience - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  return (
    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-bold">Level {spider.level}</span>
        <span className="text-sm text-gray-600">
          {Math.floor(spider.experience)} / {nextLevelXP} XP
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${progressToNextLevel}%` }}
        />
      </div>
    </div>
  );
}