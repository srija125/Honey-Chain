import React, { useState } from 'react';
import { LiveEventItem, LiveEventType } from '../../types';

interface LiveEventFeedProps {
  events: LiveEventItem[];
  onSelectBottle?: (bottleId: string) => void;
  onSelectBatch?: (batchCode: string) => void;
  compact?: boolean;
}

export const LiveEventFeed: React.FC<LiveEventFeedProps> = ({
  events = [],
  onSelectBottle,
  onSelectBatch,
  compact = false,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'TAMPER' | 'VERIFY' | 'HIVE' | 'HARVEST'>('ALL');

  const filteredEvents = events.filter(evt => {
    if (filter === 'ALL') return true;
    if (filter === 'TAMPER') {
      return evt.type === 'CAP_OPENED' || evt.type === 'DUPLICATE_QR_DETECTED' || evt.type === 'NFC_QR_MISMATCH';
    }
    if (filter === 'VERIFY') {
      return evt.type === 'NFC_VERIFIED' || evt.type === 'QR_VERIFIED' || evt.type === 'BATCH_VERIFIED' || evt.type === 'BLOCKCHAIN_ANCHORED';
    }
    if (filter === 'HIVE') {
      return evt.type === 'HIVE_HEALTH_UPDATED';
    }
    if (filter === 'HARVEST') {
      return evt.type === 'NEW_HONEY_HARVEST';
    }
    return true;
  });

  const getBadgeStyle = (type: LiveEventType) => {
    switch (type) {
      case 'CAP_OPENED':
        return 'bg-[#ffdad6] text-[#ba1a1a] border-[#ffb4ab]';
      case 'DUPLICATE_QR_DETECTED':
      case 'NFC_QR_MISMATCH':
        return 'bg-[#ffdad6] text-[#ba1a1a] border-[#ba1a1a] animate-pulse';
      case 'NFC_VERIFIED':
      case 'QR_VERIFIED':
      case 'BATCH_VERIFIED':
      case 'BLOCKCHAIN_ANCHORED':
        return 'bg-[#adedd3] text-[#004e34] border-[#70b798]';
      case 'HIVE_HEALTH_UPDATED':
        return 'bg-[#dbeafe] text-[#1e40af] border-[#93c5fd]';
      case 'NEW_HONEY_HARVEST':
        return 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  const getIcon = (type: LiveEventType) => {
    switch (type) {
      case 'CAP_OPENED':
        return 'lock_open';
      case 'DUPLICATE_QR_DETECTED':
      case 'NFC_QR_MISMATCH':
        return 'warning';
      case 'NFC_VERIFIED':
        return 'nfc';
      case 'QR_VERIFIED':
        return 'qr_code_scanner';
      case 'BATCH_VERIFIED':
        return 'verified';
      case 'BLOCKCHAIN_ANCHORED':
        return 'link';
      case 'HIVE_HEALTH_UPDATED':
        return 'sensors';
      case 'NEW_HONEY_HARVEST':
        return 'agriculture';
      default:
        return 'notifications';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f0e6e0]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1b4332] text-[#fcd34d] flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-lg">podcasts</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-[#1f1b17] tracking-tight">Live Event Feed</h3>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-[#adedd3] text-[#004e34] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] animate-ping" />
                Real-time Mesh
              </span>
            </div>
            <p className="text-[11px] text-[#867461]">
              Cryptographic tamper, scan, and apiary IoT events streaming live
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        {!compact && (
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px]">
            {(['ALL', 'TAMPER', 'VERIFY', 'HIVE', 'HARVEST'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filter === cat
                    ? 'bg-[#1b4332] text-white shadow-sm'
                    : 'bg-[#f6ece6] text-[#534434] hover:bg-[#ebd9cb]'
                }`}
              >
                {cat === 'ALL' && 'All Events'}
                {cat === 'TAMPER' && '⚠️ Tamper & Cap'}
                {cat === 'VERIFY' && '🟢 Verifications'}
                {cat === 'HIVE' && '🔵 Hive IoT'}
                {cat === 'HARVEST' && '🟡 Harvests'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Feed Stream */}
      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#867461]">
            No live events recorded in this category yet.
          </div>
        ) : (
          filteredEvents.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 text-xs ${
                item.severity === 'critical' || item.type === 'DUPLICATE_QR_DETECTED' || item.type === 'NFC_QR_MISMATCH'
                  ? 'bg-[#fff0ee] border-[#ffb4ab]'
                  : item.type === 'CAP_OPENED'
                  ? 'bg-[#fff8f0] border-[#f59e0b]/40'
                  : 'bg-[#faf7f2] border-[#d8c3ad]/30 hover:border-[#855300]/30'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${getBadgeStyle(
                  item.type
                )}`}
              >
                <span className="material-symbols-outlined text-sm">{getIcon(item.type)}</span>
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="font-extrabold text-[#1f1b17]">{item.title}</span>
                  <span className="text-[10px] font-mono text-[#867461]">{item.timestamp}</span>
                </div>
                <p className="text-[#534434] text-[11px] leading-relaxed break-words">{item.description}</p>

                {(item.bottleId || item.batchCode || item.txHash) && (
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px]">
                    {item.bottleId && (
                      <button
                        onClick={() => onSelectBottle && onSelectBottle(item.bottleId!)}
                        className="font-mono font-bold text-[#855300] bg-[#fffbf7] px-2 py-0.5 rounded border border-[#f59e0b]/30 hover:bg-[#fff4e5] cursor-pointer"
                      >
                        🍾 {item.bottleId}
                      </button>
                    )}
                    {item.batchCode && (
                      <button
                        onClick={() => onSelectBatch && onSelectBatch(item.batchCode!)}
                        className="font-mono font-bold text-[#006c49] bg-[#f7fcf9] px-2 py-0.5 rounded border border-[#006c49]/30 hover:bg-[#ebf8f2] cursor-pointer"
                      >
                        📦 {item.batchCode}
                      </button>
                    )}
                    {item.txHash && (
                      <span className="font-mono text-[#867461] bg-white px-2 py-0.5 rounded border border-[#d8c3ad]/30">
                        🔗 {item.txHash}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
