import React from 'react';
import { BeekeeperProfile } from '../../types';

interface CustomerBeekeepersProps {
  beekeepers: BeekeeperProfile[];
  onSelectBeekeeper: (beekeeper: BeekeeperProfile) => void;
}

export const CustomerBeekeepers: React.FC<CustomerBeekeepersProps> = ({
  beekeepers,
  onSelectBeekeeper,
}) => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white p-6 sm:p-10 rounded-3xl shadow-lg space-y-2">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#fcd34d] text-[#1b4332] uppercase tracking-wider">
          Certified Apiary Network
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          Meet Our Artisanal Beekeepers
        </h1>
        <p className="text-xs sm:text-sm text-white/80 max-w-xl">
          Connect directly with traditional apiculturists deploying IoT monitoring across Bengal, Kashmir, Himachal, and Maharashtra.
        </p>
      </div>

      {/* Beekeepers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {beekeepers.map(bk => (
          <div
            key={bk.id}
            onClick={() => onSelectBeekeeper(bk)}
            className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm hover:shadow-md hover:border-[#006c49]/40 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center gap-4">
                <img
                  src={bk.avatarUrl}
                  alt={bk.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#006c49]/30 group-hover:scale-105 transition-transform"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-black text-[#1f1b17]">{bk.name}</h3>
                    {bk.isVerified && (
                      <span className="material-symbols-outlined text-base text-[#006c49]">verified</span>
                    )}
                  </div>
                  <div className="text-xs text-[#855300] font-bold">{bk.farmName}</div>
                  <div className="text-[11px] text-[#867461] flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-xs">location_on</span>
                    <span>{bk.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#534434] line-clamp-3 mt-4 leading-relaxed">
                {bk.bio}
              </p>
            </div>

            <div className="pt-4 border-t border-[#f0e6e0] flex items-center justify-between text-xs">
              <span className="text-[#534434]">
                <strong>{bk.activeHivesCount}</strong> Smart Hives
              </span>
              <span className="font-bold text-[#f59e0b]">★ {bk.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
