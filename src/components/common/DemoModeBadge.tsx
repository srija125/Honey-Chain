import React from 'react';

interface DemoModeBadgeProps {
  onSwitchMode?: () => void;
  currentMode: 'beekeeper' | 'customer';
}

export const DemoModeBadge: React.FC<DemoModeBadgeProps> = ({ currentMode, onSwitchMode }) => {
  return (
    <div className="flex items-center gap-2 bg-[#f6ece6] border border-[#d8c3ad]/50 rounded-full px-3 py-1 text-[11px] font-semibold text-[#534434] shadow-sm">
      <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse shrink-0" />
      <span className="hidden sm:inline">DEMO MODE:</span>
      <span className="capitalize font-bold text-[#1f1b17]">{currentMode} View</span>
      {onSwitchMode && (
        <button
          onClick={onSwitchMode}
          className="ml-1 pl-1.5 border-l border-[#d8c3ad] text-[#855300] hover:text-[#5c3900] font-bold underline cursor-pointer"
        >
          Switch
        </button>
      )}
    </div>
  );
};
