import React, { useState } from 'react';
import { HoneyBatch } from '../../types';

interface BeekeeperQRGeneratorProps {
  batches: HoneyBatch[];
  selectedBatchId?: string;
  onPreviewVerification?: (batchCode: string) => void;
}

export const BeekeeperQRGenerator: React.FC<BeekeeperQRGeneratorProps> = ({
  batches,
  selectedBatchId,
  onPreviewVerification,
}) => {
  const [currentId, setCurrentId] = useState(selectedBatchId || batches[0]?.id);
  const [labelSize, setLabelSize] = useState<'jar-standard' | 'mini-tag' | 'gift-box'>('jar-standard');
  const [printSuccess, setPrintSuccess] = useState(false);

  const batch = batches.find(b => b.id === currentId) || batches[0];

  const handlePrint = () => {
    setPrintSuccess(true);
    setTimeout(() => setPrintSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#d8c3ad]/30 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#fcd34d] text-[#1b4332] uppercase tracking-wider">
              Smart QR Engine
            </span>
            <span className="text-xs text-[#867461]">Standard: ISO/IEC 18004</span>
          </div>
          <h1 className="text-2xl font-black text-[#1f1b17] mt-1.5">
            QR Traceability Label Generator
          </h1>
          <p className="text-xs text-[#534434] mt-1 font-medium">
            Generate verifiable tamper-proof packaging QR labels linking directly to this honey lot's blockchain record.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onPreviewVerification && (
            <button
              onClick={() => onPreviewVerification(batch.batchCode)}
              className="px-4 py-2.5 bg-[#006c49] hover:bg-[#004e34] text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">visibility</span>
              <span>Test Customer View</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Generator Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Configuration Controls (1 Col) */}
        <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-5">
          <h2 className="text-xs font-black uppercase tracking-wider text-[#534434] pb-2 border-b border-[#f0e6e0]">
            Batch & Label Settings
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#534434] mb-1">Select Honey Batch</label>
              <select
                value={currentId}
                onChange={(e) => setCurrentId(e.target.value)}
                className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] border border-transparent focus:border-[#855300] outline-none"
              >
                {batches.map(b => (
                  <option key={b.id} value={b.id}>
                    {b.batchCode} — {b.honeyType}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#534434] mb-1">Label Geometry</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'jar-standard', label: '500g Jar' },
                  { id: 'mini-tag', label: 'Neck Tag' },
                  { id: 'gift-box', label: 'Box Seal' },
                ].map(sz => (
                  <button
                    key={sz.id}
                    onClick={() => setLabelSize(sz.id as any)}
                    className={`py-2 px-1 rounded-xl text-[11px] font-bold text-center transition-all ${
                      labelSize === sz.id
                        ? 'bg-[#855300] text-white'
                        : 'bg-[#f6ece6] text-[#534434] hover:bg-[#ebd9cb]'
                    }`}
                  >
                    {sz.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-[#fffbf7] rounded-2xl border border-[#f59e0b]/20 space-y-1">
              <div className="text-[11px] font-bold text-[#855300]">Encoded Parameters:</div>
              <ul className="text-[10px] text-[#534434] space-y-0.5 list-disc list-inside">
                <li>Batch Code: <strong>{batch.batchCode}</strong></li>
                <li>Hive Origin: <strong>{batch.sourceHiveCode}</strong></li>
                <li>Ledger Root: <strong>{(batch?.blockchainHash || '0x49f2b901e8b7c6').substring(0, 14)}...</strong></li>
                <li>Target URL: <strong>honeychain.app/verify/{batch.batchCode}</strong></li>
              </ul>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={handlePrint}
                className="w-full py-3 bg-[#855300] hover:bg-[#684000] text-white font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">print</span>
                <span>Print Production Labels (48 / sheet)</span>
              </button>

              {printSuccess && (
                <div className="p-2.5 bg-[#adedd3] text-[#004e34] text-xs font-bold rounded-xl text-center animate-in fade-in">
                  ✓ High-Resolution Print Spool Dispatched!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Live Bottle Label Mockup (2 Cols) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#fffbf7] to-[#fff3e0] rounded-3xl p-6 sm:p-8 border border-[#f59e0b]/30 shadow-sm flex flex-col items-center justify-center space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#855300]">
              Physical Jar Label Preview
            </span>
            <h3 className="text-base font-black text-[#1f1b17] mt-1">
              High-Contrast Traceability Shield
            </h3>
          </div>

          {/* Realistic Label Card */}
          <div className="bg-white border-2 border-[#1f1b17] rounded-3xl p-6 sm:p-8 shadow-xl max-w-sm w-full text-center space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-[#1f1b17]/15">
              <div className="flex items-center gap-1.5 font-black text-sm text-[#1f1b17]">
                <span>🐝</span>
                <span>HONEY CHAIN</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-[#006c49] text-white uppercase tracking-wider">
                VERIFIED SOURCE
              </span>
            </div>

            {/* High-Resolution Dynamic SVG QR Visual */}
            <div className="bg-[#fffbf7] p-4 rounded-2xl border-2 border-dashed border-[#855300]/40 inline-block shadow-inner">
              <svg className="w-40 h-40" viewBox="0 0 100 100">
                {/* QR Pattern Simulation */}
                <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
                {/* Top-left corner finder */}
                <rect x="5" y="5" width="26" height="26" fill="#1f1b17" rx="3" />
                <rect x="9" y="9" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="13" y="13" width="10" height="10" fill="#1f1b17" rx="1" />

                {/* Top-right corner finder */}
                <rect x="69" y="5" width="26" height="26" fill="#1f1b17" rx="3" />
                <rect x="73" y="9" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="77" y="13" width="10" height="10" fill="#1f1b17" rx="1" />

                {/* Bottom-left corner finder */}
                <rect x="5" y="69" width="26" height="26" fill="#1f1b17" rx="3" />
                <rect x="9" y="73" width="18" height="18" fill="#ffffff" rx="2" />
                <rect x="13" y="77" width="10" height="10" fill="#1f1b17" rx="1" />

                {/* Simulated Matrix Dots */}
                <rect x="36" y="8" width="5" height="5" fill="#1f1b17" />
                <rect x="46" y="8" width="5" height="5" fill="#1f1b17" />
                <rect x="56" y="8" width="5" height="5" fill="#1f1b17" />
                <rect x="36" y="18" width="5" height="5" fill="#1f1b17" />
                <rect x="51" y="18" width="5" height="5" fill="#1f1b17" />
                <rect x="8" y="36" width="5" height="5" fill="#1f1b17" />
                <rect x="18" y="36" width="5" height="5" fill="#1f1b17" />
                <rect x="28" y="36" width="5" height="5" fill="#1f1b17" />
                <rect x="40" y="36" width="20" height="20" fill="#855300" rx="3" />
                <rect x="68" y="36" width="5" height="5" fill="#1f1b17" />
                <rect x="78" y="36" width="5" height="5" fill="#1f1b17" />
                <rect x="88" y="36" width="5" height="5" fill="#1f1b17" />
                <rect x="36" y="68" width="5" height="5" fill="#1f1b17" />
                <rect x="46" y="68" width="5" height="5" fill="#1f1b17" />
                <rect x="56" y="68" width="5" height="5" fill="#1f1b17" />
                <rect x="36" y="78" width="5" height="5" fill="#1f1b17" />
                <rect x="51" y="78" width="5" height="5" fill="#1f1b17" />
                <rect x="68" y="78" width="5" height="5" fill="#1f1b17" />
                <rect x="78" y="78" width="5" height="5" fill="#1f1b17" />
                <rect x="88" y="78" width="5" height="5" fill="#1f1b17" />
              </svg>
            </div>

            <div>
              <div className="text-xs font-mono font-black text-[#1f1b17]">{batch.batchCode}</div>
              <div className="text-[11px] font-bold text-[#855300] mt-0.5">{batch.honeyType}</div>
              <div className="text-[10px] text-[#534434]">Origin: {batch.sourceHiveCode} ({batch.harvestDate})</div>
            </div>

            <div className="text-[10px] font-bold text-[#006c49] bg-[#adedd3]/50 py-1 px-2 rounded-lg">
              Scan with phone camera to view full harvest story
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
