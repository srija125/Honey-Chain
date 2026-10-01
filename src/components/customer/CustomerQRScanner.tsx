import React, { useState } from 'react';
import { HoneyBatch } from '../../types';

interface CustomerQRScannerProps {
  batches: HoneyBatch[];
  onViewTraceability: (batchCode: string) => void;
  onNavigateToDualVerify?: () => void;
}

export const CustomerQRScanner: React.FC<CustomerQRScannerProps> = ({
  batches,
  onViewTraceability,
  onNavigateToDualVerify,
}) => {
  const [manualCode, setManualCode] = useState('');
  const [scannedBatch, setScannedBatch] = useState<HoneyBatch | null>(batches[0] || null);
  const [isScanning, setIsScanning] = useState(false);

  const handleSimulateScan = (code: string) => {
    setIsScanning(true);
    setTimeout(() => {
      const found = batches.find(b => b.batchCode.toLowerCase() === code.toLowerCase().trim()) || batches[0];
      setScannedBatch(found);
      setIsScanning(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    handleSimulateScan(manualCode);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="px-3 py-1 bg-[#fff4e5] text-[#855300] text-xs font-black rounded-full uppercase tracking-wider">
          Bottle Provenance Scanner
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#1f1b17]">
          Verify Your Honey
        </h1>
        <p className="text-xs sm:text-sm text-[#534434] font-medium">
          Scan the QR code on your honey jar label or enter the batch code printed on the lid to verify its authentic harvest story.
        </p>

        {onNavigateToDualVerify && (
          <div className="pt-2">
            <button
              onClick={onNavigateToDualVerify}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1b4332] text-[#fcd34d] hover:bg-[#133024] rounded-2xl text-xs font-black shadow-md transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">contactless</span>
              <span>Need Smart Cap & NFC Tap Authentication? Click here →</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Left: Interactive Camera Viewfinder Simulation */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-6 flex flex-col items-center justify-center">
          <div className="text-xs font-black uppercase tracking-wider text-[#534434]">
            Camera Viewfinder
          </div>

          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-[#1f1b17] overflow-hidden flex items-center justify-center border-4 border-[#855300]/30 shadow-2xl">
            {/* Viewfinder Target Corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-[#fcd34d]" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-[#fcd34d]" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-[#fcd34d]" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-[#fcd34d]" />

            {/* Scanning Laser Animation */}
            <div className="absolute inset-x-0 h-1 bg-[#f59e0b] shadow-[0_0_15px_#f59e0b] animate-bounce" />

            {/* QR Pattern in background */}
            <div className="opacity-20 text-white font-mono text-xs text-center p-4">
              [Camera Sensor Stream: Ready] <br />
              Point camera at honey jar label
            </div>

            {isScanning && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white gap-2">
                <span className="material-symbols-outlined text-4xl text-[#fcd34d] animate-spin">
                  progress_activity
                </span>
                <span className="text-xs font-bold">Decoding Blockchain Hash...</span>
              </div>
            )}
          </div>

          <button
            onClick={() => handleSimulateScan('HC-2026-0001')}
            className="w-full py-3 bg-[#1b4332] hover:bg-[#133024] text-white text-xs font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">qr_code_scanner</span>
            <span>Simulate Bottle QR Scan</span>
          </button>
        </div>

        {/* Right: Manual Input & Verification Result */}
        <div className="space-y-6">
          {/* Manual Entry Form */}
          <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
            <h2 className="text-sm font-black text-[#1f1b17]">Or Enter Batch ID Manually</h2>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="e.g., HC-2026-0001"
                  className="flex-1 p-3 bg-[#f6ece6] rounded-xl font-mono font-bold text-[#1f1b17] border border-transparent focus:border-[#855300] outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#855300] hover:bg-[#684000] text-white font-black rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  Verify
                </button>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[11px] text-[#867461]">Quick Test Batches:</span>
                {batches.slice(0, 3).map(b => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => handleSimulateScan(b.batchCode)}
                    className="px-2 py-0.5 rounded-lg bg-[#fffbf7] border border-[#f59e0b]/40 text-[#855300] text-[10px] font-mono font-bold hover:bg-[#fff4e5]"
                  >
                    {b.batchCode}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* Verification Result Card */}
          {scannedBatch && (
            <div className="bg-[#f7fcf9] rounded-3xl p-6 border-2 border-[#006c49]/30 shadow-md space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#006c49]/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006c49] text-2xl">verified</span>
                  <span className="text-sm font-black text-[#004e34]">BATCH VERIFIED</span>
                </div>
                <span className="text-xs font-mono font-black text-[#1f1b17]">{scannedBatch.batchCode}</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#534434]">Variety:</span>
                  <strong className="text-[#1f1b17]">{scannedBatch.honeyType}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#534434]">Origin Hive:</span>
                  <strong className="text-[#006c49]">{scannedBatch.sourceHiveCode} (Sundarbans)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#534434]">Extraction Date:</span>
                  <strong className="text-[#1f1b17]">{scannedBatch.harvestDate}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#534434]">Moisture Content:</span>
                  <strong className="text-[#006c49]">{scannedBatch.moisturePercentage}% (Pure & Raw)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#534434]">Cryptographic Hash:</span>
                  <span className="font-mono text-[11px] text-[#867461]">{(scannedBatch.blockchainHash || '0x7f8a9b2c4d5e').substring(0, 14)}...</span>
                </div>
              </div>

              <button
                onClick={() => onViewTraceability(scannedBatch.batchCode)}
                className="w-full py-3 bg-[#006c49] hover:bg-[#004e34] text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">account_tree</span>
                <span>View Full Journey Timeline</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
