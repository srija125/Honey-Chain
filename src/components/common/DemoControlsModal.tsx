import React, { useState } from 'react';
import { SmartBottle, HiveTelemetry, HoneyBatch } from '../../types';

interface DemoControlsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bottles: SmartBottle[];
  hives: HiveTelemetry[];
  batches: HoneyBatch[];
  onSimulateCapOpening: (bottleId: string) => void;
  onSimulateHiveAlert?: () => void;
  onSimulateBeeActivityChange?: () => void;
  onSimulateHoneyHarvest?: () => void;
  onCreateNewBatch?: () => void;
  onGenerateBottle?: () => void;
  onRegisterNFC?: () => void;
  onGenerateQR?: () => void;
  onVerifyNFC?: () => void;
  onVerifyQR?: () => void;
  onSimulateDuplicateQR?: () => void;
  onSimulateNFCReuse?: () => void;
  onVerifyBlockchain?: () => void;
}

export const DemoControlsModal: React.FC<DemoControlsModalProps> = ({
  isOpen,
  onClose,
  bottles = [],
  onSimulateCapOpening,
  onSimulateHiveAlert = () => {},
  onSimulateBeeActivityChange = () => {},
  onSimulateHoneyHarvest = () => {},
  onCreateNewBatch = () => {},
  onGenerateBottle = () => {},
  onRegisterNFC = () => {},
  onGenerateQR = () => {},
  onVerifyNFC = () => {},
  onVerifyQR = () => {},
  onSimulateDuplicateQR = () => {},
  onSimulateNFCReuse = () => {},
  onVerifyBlockchain = () => {},
}) => {
  const [selectedBottleForCap, setSelectedBottleForCap] = useState<string>(
    bottles.find(b => b.cap_status === 'SEALED')?.bottle_id || bottles[0]?.bottle_id || 'HC-BTL-928381'
  );
  const [lastActionMsg, setLastActionMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAction = (label: string, fn?: () => void) => {
    if (fn) fn();
    setLastActionMsg(`✓ Executed: ${label}`);
    setTimeout(() => setLastActionMsg(null), 3500);
  };

  const sealedBottles = bottles.filter(b => b.cap_status === 'SEALED');

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-[#faf7f2] rounded-3xl max-w-2xl w-full border-2 border-[#855300]/40 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#1b4332] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#fcd34d] text-[#1b4332] flex items-center justify-center font-black text-xl shadow-md">
              🎛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">Interactive Demo Controls</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#adedd3] text-[#004e34] uppercase">
                  Hardware Simulation
                </span>
              </div>
              <p className="text-xs text-[#95d3ba]">
                Trigger hardware sensor triggers, packaging serializations, and blockchain attacks
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Feedback Alert */}
        {lastActionMsg && (
          <div className="bg-[#adedd3] text-[#004e34] px-6 py-2.5 text-xs font-black flex items-center gap-2 border-b border-[#004e34]/20 animate-in fade-in">
            <span className="material-symbols-outlined text-base">check_circle</span>
            <span>{lastActionMsg}</span>
          </div>
        )}

        {/* Controls Grid */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
          {/* SECTION 1: SMART CAP & TAMPER DETECTION (HIGH PRIORITY) */}
          <div className="bg-white p-5 rounded-2xl border border-[#ba1a1a]/30 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-[#ba1a1a] uppercase tracking-wider text-[11px]">
                <span className="material-symbols-outlined text-base">lock_open</span>
                <span>Smart Cap Opening & Tamper Detection</span>
              </div>
              <span className="text-[10px] text-[#867461]">Permanent State Shift (SEALED → OPENED)</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <select
                value={selectedBottleForCap}
                onChange={(e) => setSelectedBottleForCap(e.target.value)}
                className="flex-1 w-full p-2.5 bg-[#f6ece6] rounded-xl font-mono font-bold text-xs text-[#1f1b17] border border-[#d8c3ad] outline-none"
              >
                {bottles.map((b) => (
                  <option key={b.bottle_id} value={b.bottle_id}>
                    {b.bottle_id} ({b.cap_status} - {b.honeyType ? b.honeyType.split(' ')[0] : 'Honey'})
                  </option>
                ))}
              </select>

              <button
                onClick={() =>
                  handleAction(`Cap Opened on ${selectedBottleForCap}`, () =>
                    onSimulateCapOpening(selectedBottleForCap)
                  )
                }
                className="w-full sm:w-auto px-5 py-2.5 bg-[#ba1a1a] hover:bg-[#961313] text-white font-black rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-base">lock_open</span>
                <span>Simulate Cap Opening</span>
              </button>
            </div>
            <p className="text-[11px] text-[#534434]">
              Breaks physical circuit sensor, anchors SHA-256 Opening Hash to blockchain, sends beekeeper notification, and updates the live mesh feed.
            </p>
          </div>

          {/* SECTION 2: BOTTLE PACKAGING & SERIALIZATION */}
          <div className="bg-white p-5 rounded-2xl border border-[#d8c3ad]/40 shadow-sm space-y-3">
            <div className="font-black text-[#1f1b17] uppercase tracking-wider text-[11px] flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#855300]">inventory_2</span>
              <span>Packaging & Identity Generation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() => handleAction('Generated New Smart Bottle', onGenerateBottle)}
                className="p-3 bg-[#faf7f2] hover:bg-[#f6ece6] rounded-xl border border-[#d8c3ad]/50 font-bold text-left flex items-center justify-between text-[#1f1b17] cursor-pointer"
              >
                <span>🍾 Generate New Bottle</span>
                <span className="material-symbols-outlined text-sm text-[#855300]">add</span>
              </button>

              <button
                onClick={() => handleAction('Registered NFC Tag', onRegisterNFC)}
                className="p-3 bg-[#faf7f2] hover:bg-[#f6ece6] rounded-xl border border-[#d8c3ad]/50 font-bold text-left flex items-center justify-between text-[#1f1b17] cursor-pointer"
              >
                <span>🏷️ Register NFC Token</span>
                <span className="material-symbols-outlined text-sm text-[#006c49]">nfc</span>
              </button>

              <button
                onClick={() => handleAction('Generated Tamper-Void QR', onGenerateQR)}
                className="p-3 bg-[#faf7f2] hover:bg-[#f6ece6] rounded-xl border border-[#d8c3ad]/50 font-bold text-left flex items-center justify-between text-[#1f1b17] cursor-pointer"
              >
                <span>📱 Generate Security QR</span>
                <span className="material-symbols-outlined text-sm text-[#855300]">qr_code_2</span>
              </button>

              <button
                onClick={() => handleAction('Created New Honey Batch', onCreateNewBatch)}
                className="p-3 bg-[#faf7f2] hover:bg-[#f6ece6] rounded-xl border border-[#d8c3ad]/50 font-bold text-left flex items-center justify-between text-[#1f1b17] cursor-pointer"
              >
                <span>📦 Create New Batch</span>
                <span className="material-symbols-outlined text-sm text-[#006c49]">layers</span>
              </button>
            </div>
          </div>

          {/* SECTION 3: VERIFICATION & COUNTERFEIT TESTS */}
          <div className="bg-white p-5 rounded-2xl border border-[#d8c3ad]/40 shadow-sm space-y-3">
            <div className="font-black text-[#1f1b17] uppercase tracking-wider text-[11px] flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#006c49]">verified</span>
              <span>Verification & Security Tests</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() => handleAction('NFC Handshake Verified', onVerifyNFC)}
                className="p-3 bg-[#f7fcf9] hover:bg-[#edf7f2] rounded-xl border border-[#006c49]/30 font-bold text-left flex items-center justify-between text-[#004e34] cursor-pointer"
              >
                <span>📳 Verify NFC</span>
                <span className="material-symbols-outlined text-sm">check</span>
              </button>

              <button
                onClick={() => handleAction('Security QR Verified', onVerifyQR)}
                className="p-3 bg-[#f7fcf9] hover:bg-[#edf7f2] rounded-xl border border-[#006c49]/30 font-bold text-left flex items-center justify-between text-[#004e34] cursor-pointer"
              >
                <span>📷 Verify QR</span>
                <span className="material-symbols-outlined text-sm">check</span>
              </button>

              <button
                onClick={() => handleAction('Duplicate QR Attack Triggered', onSimulateDuplicateQR)}
                className="p-3 bg-[#fff0ee] hover:bg-[#ffe5e1] rounded-xl border border-[#ba1a1a]/30 font-bold text-left flex items-center justify-between text-[#ba1a1a] cursor-pointer"
              >
                <span>🔴 Simulate Duplicate QR</span>
                <span className="material-symbols-outlined text-sm">warning</span>
              </button>

              <button
                onClick={() => handleAction('NFC Tag Reuse Attack Triggered', onSimulateNFCReuse)}
                className="p-3 bg-[#fff0ee] hover:bg-[#ffe5e1] rounded-xl border border-[#ba1a1a]/30 font-bold text-left flex items-center justify-between text-[#ba1a1a] cursor-pointer"
              >
                <span>⚠️ Simulate NFC Reuse</span>
                <span className="material-symbols-outlined text-sm">warning</span>
              </button>

              <button
                onClick={() => handleAction('Blockchain Ledger Sync Verified', onVerifyBlockchain)}
                className="sm:col-span-2 p-3 bg-[#fffbf7] hover:bg-[#fff4e5] rounded-xl border border-[#f59e0b]/40 font-bold text-left flex items-center justify-between text-[#855300] cursor-pointer"
              >
                <span>⛓️ Verify Blockchain Ledger Hash Anchor</span>
                <span className="material-symbols-outlined text-sm">link</span>
              </button>
            </div>
          </div>

          {/* SECTION 4: APIARY IoT SIMULATION */}
          <div className="bg-white p-5 rounded-2xl border border-[#d8c3ad]/40 shadow-sm space-y-3">
            <div className="font-black text-[#1f1b17] uppercase tracking-wider text-[11px] flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#1e40af]">sensors</span>
              <span>Apiary IoT & Biology Simulation</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => handleAction('Hive Thermal Anomaly Triggered', onSimulateHiveAlert)}
                className="p-3 bg-[#faf7f2] hover:bg-[#f6ece6] rounded-xl border border-[#d8c3ad]/50 font-bold text-left text-[#1f1b17] cursor-pointer"
              >
                🚨 Simulate Hive Alert
              </button>

              <button
                onClick={() => handleAction('Bee Foraging Activity Shifted', onSimulateBeeActivityChange)}
                className="p-3 bg-[#faf7f2] hover:bg-[#f6ece6] rounded-xl border border-[#d8c3ad]/50 font-bold text-left text-[#1f1b17] cursor-pointer"
              >
                🐝 Simulate Bee Activity
              </button>

              <button
                onClick={() => handleAction('New Honey Comb Harvested', onSimulateHoneyHarvest)}
                className="p-3 bg-[#faf7f2] hover:bg-[#f6ece6] rounded-xl border border-[#d8c3ad]/50 font-bold text-left text-[#1f1b17] cursor-pointer"
              >
                🍯 Simulate Honey Harvest
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f6ece6] border-t border-[#d8c3ad]/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1b4332] hover:bg-[#133024] text-white font-bold rounded-xl cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
