import React, { useState } from 'react';
import { HoneyBatch } from '../../types';
import { EXTENDED_HONEY_JOURNEY_STAGES } from '../../data/mockData';

interface CustomerTraceabilityProps {
  batches: HoneyBatch[];
  selectedBatchCode?: string;
  onSelectBatch?: (code: string) => void;
  onShopHoney?: () => void;
  onNavigateToDualVerify?: () => void;
}

export const CustomerTraceability: React.FC<CustomerTraceabilityProps> = ({
  batches,
  selectedBatchCode,
  onSelectBatch,
  onShopHoney,
  onNavigateToDualVerify,
}) => {
  const [activeCode, setActiveCode] = useState(selectedBatchCode || batches[0]?.batchCode || 'HC-2026-0001');
  const [viewMode, setViewMode] = useState<'EXTENDED' | 'BATCH'>('EXTENDED');

  const batch = (batches && batches.length > 0)
    ? (batches.find(b => b.batchCode === activeCode) || batches[0])
    : null;

  const rawStages = viewMode === 'EXTENDED'
    ? EXTENDED_HONEY_JOURNEY_STAGES
    : (batch?.traceabilitySteps || batch?.steps || []);
  const activeStages = Array.isArray(rawStages) ? rawStages : [];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white p-6 sm:p-10 rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#fcd34d] text-[#1b4332] uppercase tracking-wider">
              Cryptographic Provenance
            </span>
            <span className="text-xs text-[#95d3ba] font-semibold">Honey Chain Verification Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-2">
            Where Your Honey Came From
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
            Explore the complete 12-stage tamper-proof journey of your honey bottle — from IoT hive health and sustainable harvesting to NFC/QR packaging, smart cap arming, and opening history.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onNavigateToDualVerify && (
            <button
              onClick={onNavigateToDualVerify}
              className="px-4 py-3 bg-[#fcd34d] hover:bg-[#fbbf24] text-[#1b4332] text-xs font-black rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-base">contactless</span>
              <span>Test NFC + QR Dual Auth</span>
            </button>
          )}
          {onShopHoney && (
            <button
              onClick={onShopHoney}
              className="px-5 py-3 bg-[#f59e0b] hover:bg-[#d97706] text-[#1f1b17] text-xs font-black rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-base">storefront</span>
              <span>Buy This Honey</span>
            </button>
          )}
        </div>
      </div>

      {/* Batch Selector & Journey Mode Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {batches.map(b => (
            <button
              key={b.id}
              onClick={() => {
                setActiveCode(b.batchCode);
                if (onSelectBatch) onSelectBatch(b.batchCode);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                b.batchCode === activeCode
                  ? 'bg-[#1b4332] text-white shadow-md'
                  : 'bg-white text-[#534434] border border-[#d8c3ad]/40 hover:bg-[#f6ece6]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">inventory_2</span>
              <span>{b.batchCode}</span>
              <span className="text-[10px] opacity-75">({(b.honeyType || 'Honey').split(' ')[0]})</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-[#f6ece6] p-1 rounded-2xl border border-[#d8c3ad]/40 text-xs font-bold">
          <button
            onClick={() => setViewMode('EXTENDED')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              viewMode === 'EXTENDED' ? 'bg-[#1b4332] text-white shadow-sm' : 'text-[#534434] hover:text-[#1f1b17]'
            }`}
          >
            12-Stage Full Lifecycle
          </button>
          <button
            onClick={() => setViewMode('BATCH')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              viewMode === 'BATCH' ? 'bg-[#1b4332] text-white shadow-sm' : 'text-[#534434] hover:text-[#1f1b17]'
            }`}
          >
            Batch Summary
          </button>
        </div>
      </div>

      {/* Verification Shield Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-6">
        <div className="bg-[#f7fcf9] border border-[#006c49]/20 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl text-[#006c49]">verified</span>
              <span className="text-xl font-black text-[#004e34]">TRACEABILITY VERIFIED</span>
            </div>
            <p className="text-xs text-[#534434]">
              Batch <strong>{batch?.batchCode || activeCode}</strong> has been cryptographically validated on the Honey Chain decentralized network with full smart cap armed status.
            </p>
          </div>

          <div className="text-left sm:text-right text-xs">
            <div className="text-[10px] font-bold text-[#867461] uppercase">Ledger Root Hash</div>
            <div className="font-mono font-bold text-[#1f1b17] break-all max-w-xs">{batch?.blockchainHash || '0x8f3a9b2c4d5e6f7a8b9c0d1e2f3a4b5c'}</div>
          </div>
        </div>

        {/* Apiary & Hive Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20">
            <span className="text-[10px] font-bold uppercase text-[#867461]">Source Apiary</span>
            <div className="font-bold text-[#1f1b17] text-sm mt-0.5">{batch?.sourceLocation || 'Sundarbans Mangrove'}</div>
            <div className="text-[11px] text-[#855300]">West Bengal, India</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20">
            <span className="text-[10px] font-bold uppercase text-[#867461]">Smart Hive Node</span>
            <div className="font-bold text-[#1f1b17] text-sm mt-0.5">{batch?.sourceHiveCode || 'HIVE-001'}</div>
            <div className="text-[11px] text-[#006c49]">Telemetry Certified</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20">
            <span className="text-[10px] font-bold uppercase text-[#867461]">Extraction Technique</span>
            <div className="font-bold text-[#1f1b17] text-sm mt-0.5">Cold Centrifugation</div>
            <div className="text-[11px] text-[#534434]">Zero heat degradation</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20">
            <span className="text-[10px] font-bold uppercase text-[#867461]">Purity Moisture</span>
            <div className="font-bold text-[#1f1b17] text-sm mt-0.5">{batch?.moisturePercentage || 17.8}%</div>
            <div className="text-[11px] text-[#006c49]">Below standard 20% limit</div>
          </div>
        </div>

        {/* Visual Custody Flow */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#1f1b17]">
              {viewMode === 'EXTENDED' ? '12-Stage Honey Journey & Packaging Ledger' : 'Verified Custody Milestones'}
            </h2>
            <span className="text-xs text-[#867461] font-semibold">
              {activeStages.length} Milestones Recorded
            </span>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#006c49] space-y-6">
            {activeStages.map((step, idx) => {
              const stepTitle = step.stageName || (step as any).title || `Stage ${idx + 1}`;
              const stepDetails = step.details || (step as any).subtitle || (step as any).description || 'Stage verified and recorded on ledger.';
              const stepHash = (step.hash || batch?.blockchainHash || '0x49f2b901e8b7c6d5a1b2c3d4');
              const stepLocation = step.location || 'Apiary Extraction Hub';
              const stepOperator = step.operatorName || (step as any).responsibleParty || 'Honey Chain Ledger';
              const stepTime = step.timestamp || 'Verified On-Chain';

              return (
                <div key={step.id || `step-${idx}`} className="relative">
                  <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-[#006c49] text-white flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-base">{step.icon || 'verified'}</span>
                  </div>

                  <div className="bg-[#fffbf7] p-5 rounded-2xl border border-[#f59e0b]/25 shadow-sm space-y-2 hover:border-[#855300] transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-[#855300] uppercase tracking-wider">
                          Stage {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                        <h3 className="text-sm font-black text-[#1f1b17]">{stepTitle}</h3>
                      </div>
                      <span className="text-[11px] font-mono text-[#867461]">{stepTime}</span>
                    </div>

                    <p className="text-xs text-[#534434] leading-relaxed">{stepDetails}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#f0e6e0] text-[11px]">
                      <div>
                        <span className="text-[#867461] block">Location:</span>
                        <span className="font-bold text-[#1f1b17]">{stepLocation}</span>
                      </div>
                      <div>
                        <span className="text-[#867461] block">Responsible Lead:</span>
                        <span className="font-bold text-[#1f1b17]">{stepOperator}</span>
                      </div>
                      <div>
                        <span className="text-[#867461] block">Cryptographic Hash:</span>
                        <span className="font-mono text-[#006c49] font-semibold">{stepHash.substring(0, 16)}...</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quality System Separation Disclaimer (Requirement #13) */}
        <div className="p-5 rounded-2xl bg-[#f6ece6] border border-[#d8c3ad]/50 text-xs text-[#534434] space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#1f1b17]">
            <span className="material-symbols-outlined text-base text-[#855300]">science</span>
            <span>Important Quality Separation Standard:</span>
          </div>
          <p className="leading-relaxed">
            Honey Chain does not conflate smart packaging security with biological honey purity. The smart cap and NFC tokens guarantee bottle custody and physical opening history, while certified laboratory spectrometry verifies botanical pollen density, non-inversion, and natural enzymic activity.
          </p>
        </div>
      </div>
    </div>
  );
};
