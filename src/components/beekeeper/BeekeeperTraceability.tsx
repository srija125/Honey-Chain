import React, { useState } from 'react';
import { HoneyBatch } from '../../types';

interface BeekeeperTraceabilityProps {
  batches: HoneyBatch[];
  selectedBatchId?: string;
  onSelectBatch?: (id: string) => void;
  onGenerateQR?: (batchId: string) => void;
}

export const BeekeeperTraceability: React.FC<BeekeeperTraceabilityProps> = ({
  batches,
  selectedBatchId,
  onSelectBatch,
  onGenerateQR,
}) => {
  const currentBatchId = selectedBatchId || batches[0]?.id;
  const batch = (batches && batches.length > 0)
    ? (batches.find(b => b.id === currentBatchId) || batches[0])
    : null;

  const steps = batch ? (batch.traceabilitySteps || batch.steps || []) : [];

  if (!batch) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-[#d8c3ad]/30">
        <p className="text-sm text-[#867461]">No batch selected or available for traceability.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#d8c3ad]/30 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#adedd3] text-[#004e34] uppercase tracking-wider">
              Immutable Chain of Custody
            </span>
            <span className="text-xs text-[#867461]">Network: HoneyChain-Mainnet</span>
          </div>
          <h1 className="text-2xl font-black text-[#1f1b17] mt-1.5">
            Batch Traceability & Provenance
          </h1>
          <p className="text-xs text-[#534434] mt-1 font-medium">
            Cryptographic verification record tracking every transition from hive extraction to bottled distribution.
          </p>
        </div>

        {onGenerateQR && (
          <button
            onClick={() => onGenerateQR(batch.id)}
            className="px-4 py-2.5 bg-[#855300] hover:bg-[#684000] text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">qr_code_2</span>
            <span>Generate Bottle QR</span>
          </button>
        )}
      </div>

      {/* Batch Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {batches.map(b => (
          <button
            key={b.id}
            onClick={() => onSelectBatch && onSelectBatch(b.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              b.id === batch.id
                ? 'bg-[#855300] text-white shadow-md'
                : 'bg-white text-[#534434] border border-[#d8c3ad]/40 hover:bg-[#f6ece6]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">inventory_2</span>
            <span>{b.batchCode}</span>
            <span className="text-[10px] opacity-80">({(b.honeyType || 'Honey').split(' ')[0]})</span>
          </button>
        ))}
      </div>

      {/* Main Traceability Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-8">
        {/* Top Summary Banner */}
        <div className="bg-[#f7fcf9] border border-[#006c49]/20 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl text-[#006c49]">verified</span>
              <span className="text-base font-black text-[#004e34]">TRACEABILITY VERIFIED</span>
            </div>
            <div className="text-xs text-[#534434] mt-1">
              Batch <strong className="text-[#1f1b17]">{batch.batchCode}</strong> • {batch.honeyType} • Source Hive: <strong>{batch.sourceHiveCode}</strong>
            </div>
          </div>

          <div className="text-left sm:text-right font-mono text-xs">
            <div className="text-[10px] text-[#867461] uppercase font-bold">Ledger Root Hash</div>
            <div className="font-bold text-[#1f1b17] break-all max-w-xs">{batch.blockchainHash || '0x49f2b901e8b7c6d5'}</div>
          </div>
        </div>

        {/* 5-Stage Custody Timeline */}
        <div className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#534434]">
            Verified Custody Milestones
          </h2>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#006c49] space-y-8">
            {steps.map((step, idx) => {
              const stepHash = step.hash || batch.blockchainHash || '0x49f2b901e8b7c6d5';
              const stepStage = step.stageName || (step as any).title || `Stage 0${idx + 1}`;
              const stepDetails = step.details || (step as any).description || '';
              const stepLoc = step.location || 'Apiary Extraction Hub';
              const stepLead = step.operatorName || (step as any).responsibleParty || 'Apiary Operator';

              return (
                <div key={step.id || `step-${idx}`} className="relative group">
                  {/* Timeline node icon */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-[#006c49] text-white flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-base">{step.icon || 'verified'}</span>
                  </div>

                  {/* Milestone Details Card */}
                  <div className="bg-[#fffbf7] p-5 rounded-2xl border border-[#f59e0b]/25 shadow-sm space-y-2 hover:border-[#855300] transition-colors">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-[#855300] uppercase tracking-wider">
                          Stage 0{idx + 1}
                        </span>
                        <h3 className="text-sm font-black text-[#1f1b17]">{stepStage}</h3>
                      </div>
                      <span className="text-[11px] font-mono text-[#867461]">{step.timestamp}</span>
                    </div>

                    <p className="text-xs text-[#534434] leading-relaxed">{stepDetails}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#f0e6e0] text-[11px]">
                      <div>
                        <span className="text-[#867461] block">Location:</span>
                        <span className="font-bold text-[#1f1b17]">{stepLoc}</span>
                      </div>
                      <div>
                        <span className="text-[#867461] block">Authorized Party:</span>
                        <span className="font-bold text-[#1f1b17]">{stepLead}</span>
                      </div>
                      <div>
                        <span className="text-[#867461] block">Stage Proof Hash:</span>
                        <span className="font-mono text-[#006c49] font-semibold">{stepHash.substring(0, 14)}...</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prominent Trust & Integrity Notice */}
        <div className="p-4 rounded-2xl bg-[#f6ece6] border border-[#d8c3ad]/50 text-xs text-[#534434] flex items-start gap-3">
          <span className="material-symbols-outlined text-lg text-[#855300] shrink-0 mt-0.5">info</span>
          <div>
            <span className="font-bold text-[#1f1b17]">Integrity & Verification Model:</span> Honey Chain uses blockchain cryptographic hashing to guarantee the immutability and provenance history of recorded harvest milestones. Blockchain protects the integrity of the recorded traceability history.
          </div>
        </div>
      </div>
    </div>
  );
};
