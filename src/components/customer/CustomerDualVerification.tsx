import React, { useState } from 'react';
import { SmartBottle, HoneyBatch, VerificationResult, CapStatus } from '../../types';
import { generateSHA256Hash } from '../../data/mockData';

interface CustomerDualVerificationProps {
  bottles: SmartBottle[];
  batches: HoneyBatch[];
  onViewTraceability?: (batchCode: string) => void;
  onSimulateCapOpening?: (bottleId: string) => void;
}

export const CustomerDualVerification: React.FC<CustomerDualVerificationProps> = ({
  bottles = [],
  batches = [],
  onViewTraceability,
  onSimulateCapOpening,
}) => {
  // Active test bottle or scenario
  const [selectedBottleId, setSelectedBottleId] = useState<string>(bottles[0]?.bottle_id || 'HC-BTL-928381');
  const [testScenario, setTestScenario] = useState<'NORMAL' | 'DUPLICATE_QR' | 'MISMATCH'>('NORMAL');

  // Interactive Verification Steps
  // 0: Idle, 1: NFC Tap, 2: QR Scan, 3: Dual Match, 4: Cap Status, 5: Blockchain Validation, 6: Completed
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  const activeBottle = bottles.find(b => b.bottle_id === selectedBottleId) || bottles[0];
  const linkedBatch = batches.find(b => b.batchCode === activeBottle?.batch_id || b.id === activeBottle?.batch_id) || batches[0];

  // Start the step-by-step dual authentication verification flow
  const handleStartDualVerification = (scenario: 'NORMAL' | 'DUPLICATE_QR' | 'MISMATCH' = testScenario) => {
    setIsVerifying(true);
    setCurrentStep(1); // Step 1: NFC Tap
    setVerificationResult(null);

    // Timeline execution through the stages
    setTimeout(() => {
      setCurrentStep(2); // Step 2: NFC Authentication & QR Scan
      setTimeout(() => {
        setCurrentStep(3); // Step 3: NFC + QR Match
        setTimeout(() => {
          setCurrentStep(4); // Step 4: Bottle ID & Cap Status Verification
          setTimeout(() => {
            setCurrentStep(5); // Step 5: Supply Chain & Blockchain Verification
            setTimeout(() => {
              setCurrentStep(6); // Step 6: Final Result
              setIsVerifying(false);

              if (scenario === 'DUPLICATE_QR') {
                setVerificationResult('POSSIBLE_COUNTERFEIT');
              } else if (scenario === 'MISMATCH') {
                setVerificationResult('IDENTITY_MISMATCH');
              } else {
                if (activeBottle?.cap_status === 'OPENED') {
                  setVerificationResult('OPENED_AUTHENTIC');
                } else {
                  setVerificationResult('PRODUCT_VERIFIED');
                }
              }
            }, 700);
          }, 700);
        }, 700);
      }, 700);
    }, 800);
  };

  const isComplete = currentStep === 6 && verificationResult !== null;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white p-6 sm:p-10 rounded-3xl shadow-lg">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#fcd34d] text-[#1b4332] uppercase tracking-wider">
              NFC + QR Dual Authentication
            </span>
            <span className="text-xs text-[#95d3ba] font-semibold">Physical Bottle Hardware Validation</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Verify Authentic Honey & Cap Seal
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Every genuine Honey Chain bottle requires dual cryptographic handshakes: a near-field NFC tap on the smart cap sensor paired with the serialized bottle QR code.
          </p>
        </div>
      </div>

      {/* Interactive Scenario / Bottle Selector Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-[#f0e6e0]">
          <div>
            <h2 className="text-sm font-black text-[#1f1b17] uppercase tracking-wider">
              Select Smart Bottle to Audit
            </h2>
            <p className="text-xs text-[#867461]">
              Select from registered bottles in circulation or simulate edge-case counterfeit attacks
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#855300] bg-[#fffbf7] px-2.5 py-1 rounded-lg border border-[#f59e0b]/30">
            Selected: {activeBottle?.bottle_id} ({activeBottle?.cap_status})
          </span>
        </div>

        {/* Bottle Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {bottles.map((b) => (
            <button
              key={b.bottle_id}
              onClick={() => {
                setSelectedBottleId(b.bottle_id);
                setTestScenario('NORMAL');
                setCurrentStep(0);
                setVerificationResult(null);
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                selectedBottleId === b.bottle_id && testScenario === 'NORMAL'
                  ? 'bg-[#1b4332] text-white shadow-md'
                  : 'bg-[#faf7f2] text-[#534434] border border-[#d8c3ad]/40 hover:bg-[#f6ece6]'
              }`}
            >
              <span>🍾 {b.bottle_id}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  b.cap_status === 'SEALED'
                    ? 'bg-[#adedd3] text-[#004e34]'
                    : 'bg-[#ffdad6] text-[#ba1a1a]'
                }`}
              >
                {b.cap_status}
              </span>
            </button>
          ))}

          {/* Test Attack Simulations */}
          <button
            onClick={() => {
              setTestScenario('DUPLICATE_QR');
              setCurrentStep(0);
              setVerificationResult(null);
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              testScenario === 'DUPLICATE_QR'
                ? 'bg-[#ba1a1a] text-white shadow-md'
                : 'bg-[#fff0ee] text-[#ba1a1a] border border-[#ba1a1a]/30 hover:bg-[#ffe5e1]'
            }`}
          >
            <span>🔴 Simulate Duplicate QR Attack</span>
          </button>

          <button
            onClick={() => {
              setTestScenario('MISMATCH');
              setCurrentStep(0);
              setVerificationResult(null);
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              testScenario === 'MISMATCH'
                ? 'bg-[#855300] text-white shadow-md'
                : 'bg-[#fffbf7] text-[#855300] border border-[#f59e0b]/30 hover:bg-[#fff4e5]'
            }`}
          >
            <span>🔴 Simulate NFC + QR Mismatch</span>
          </button>
        </div>
      </div>

      {/* The 2-Column Verification Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Interactive Dual Hardware Handshake Stage */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-6 flex flex-col items-center text-center">
          <div className="text-xs font-black uppercase tracking-wider text-[#534434]">
            Physical Dual-Sensor Handshake
          </div>

          {/* Physical Phone + Jar Tap Illustration */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-[#1f1b17] overflow-hidden flex flex-col items-center justify-center p-6 text-white border-4 border-[#855300]/30 shadow-2xl">
            {/* NFC Waves Animation */}
            {currentStep === 1 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="w-32 h-32 rounded-full border-4 border-[#006c49] animate-ping" />
                <span className="w-48 h-48 rounded-full border-2 border-[#adedd3]/50 animate-ping delay-200" />
              </div>
            )}

            {/* QR Laser Animation */}
            {currentStep === 2 && (
              <div className="absolute inset-x-0 h-1 bg-[#f59e0b] shadow-[0_0_15px_#f59e0b] animate-bounce" />
            )}

            {/* Central Bottle Icon */}
            <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-b from-[#fcd34d] to-[#d97706] flex items-center justify-center shadow-lg text-4xl mb-3">
              🍯
            </div>

            <div className="relative z-10 font-bold text-xs text-[#fcd34d]">
              {testScenario === 'DUPLICATE_QR' ? 'Unpaired Generic Jar' : activeBottle?.bottle_id}
            </div>

            <div className="relative z-10 text-[11px] text-white/70 font-mono mt-1">
              NFC: {(activeBottle?.nfc_token || 'NFC-VALID-TOKEN').substring(0, 12)}...
            </div>

            {/* Step Message inside the viewfinder */}
            <div className="relative z-10 mt-3 px-3 py-1 bg-black/60 rounded-full text-[10px] font-black uppercase tracking-wider text-white">
              {currentStep === 0 && 'Ready for Dual Authentication'}
              {currentStep === 1 && 'Step 1: Reading Smart Cap NFC...'}
              {currentStep === 2 && 'Step 2: Scanning Security QR Label...'}
              {currentStep === 3 && 'Step 3: Matching NFC + QR Cryptography...'}
              {currentStep === 4 && 'Step 4: Reading Cap Tamper Sensor...'}
              {currentStep === 5 && 'Step 5: Verifying Polygon Ledger...'}
              {currentStep === 6 && 'Verification Complete'}
            </div>
          </div>

          {/* Trigger Button */}
          <button
            disabled={isVerifying}
            onClick={() => handleStartDualVerification(testScenario)}
            className={`w-full py-4 text-xs font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isVerifying
                ? 'bg-[#867461] text-white opacity-70 cursor-wait'
                : 'bg-[#1b4332] hover:bg-[#133024] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {isVerifying ? 'sync' : 'contactless'}
            </span>
            <span>
              {isVerifying
                ? 'Authenticating NFC + QR Match...'
                : 'Simulate NFC Tap & QR Scan'}
            </span>
          </button>

          {/* Flow Breadcrumb */}
          <div className="text-[10px] font-bold text-[#867461] uppercase tracking-wider flex items-center gap-1 flex-wrap justify-center">
            <span>NFC Tap</span> → <span>NFC Auth</span> → <span>QR Scan</span> → <span>Dual Match</span> → <span>Cap Status</span> → <span>Blockchain</span>
          </div>
        </div>

        {/* Right: Step-by-Step Progress & Real-time Verification Checklist */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#d8c3ad]/30 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-[#1f1b17] uppercase tracking-wider pb-2 border-b border-[#f0e6e0]">
              Hardware & Cryptographic Checklist
            </h3>

            <div className="space-y-3 text-xs">
              {/* 1. NFC Verified */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf7f2] border border-[#d8c3ad]/30">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#006c49]">nfc</span>
                  <div>
                    <span className="font-extrabold text-[#1f1b17] block">NFC Tag Authenticated</span>
                    <span className="text-[10px] font-mono text-[#867461]">
                      {activeBottle?.nfc_token}
                    </span>
                  </div>
                </div>
                {currentStep >= 1 ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#adedd3] text-[#004e34]">
                    🟢 Verified
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-[#867461]">Pending Tap</span>
                )}
              </div>

              {/* 2. QR Verified */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf7f2] border border-[#d8c3ad]/30">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#855300]">qr_code_2</span>
                  <div>
                    <span className="font-extrabold text-[#1f1b17] block">QR Token Decrypted</span>
                    <span className="text-[10px] font-mono text-[#867461]">
                      {testScenario === 'DUPLICATE_QR' ? 'QR-COPIED-UNLINKED' : activeBottle?.qr_token}
                    </span>
                  </div>
                </div>
                {currentStep >= 2 ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#adedd3] text-[#004e34]">
                    🟢 Verified
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-[#867461]">Pending Scan</span>
                )}
              </div>

              {/* 3. NFC + QR Match */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf7f2] border border-[#d8c3ad]/30">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#1b4332]">compare_arrows</span>
                  <div>
                    <span className="font-extrabold text-[#1f1b17] block">NFC + QR Same Physical Bottle Match</span>
                    <span className="text-[10px] text-[#534434]">Hardware cryptographic pair check</span>
                  </div>
                </div>
                {currentStep >= 3 ? (
                  testScenario === 'DUPLICATE_QR' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#ffdad6] text-[#ba1a1a]">
                      🔴 QR ✓ but NFC ✗ Mismatch
                    </span>
                  ) : testScenario === 'MISMATCH' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#ffdad6] text-[#ba1a1a]">
                      🔴 Different Bottles
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#adedd3] text-[#004e34]">
                      🟢 100% Matched
                    </span>
                  )
                ) : (
                  <span className="text-[10px] font-semibold text-[#867461]">Pending Match</span>
                )}
              </div>

              {/* 4. Bottle ID Verified */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf7f2] border border-[#d8c3ad]/30">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#006c49]">inventory_2</span>
                  <div>
                    <span className="font-extrabold text-[#1f1b17] block">Bottle ID Verified</span>
                    <span className="text-[10px] font-mono text-[#867461]">{activeBottle?.bottle_id}</span>
                  </div>
                </div>
                {currentStep >= 4 && testScenario === 'NORMAL' ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#adedd3] text-[#004e34]">
                    🟢 Bottle ID Verified
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-[#867461]">Waiting</span>
                )}
              </div>

              {/* 5. Cap Status */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf7f2] border border-[#d8c3ad]/30">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#ba1a1a]">sensors</span>
                  <div>
                    <span className="font-extrabold text-[#1f1b17] block">Smart Cap Status</span>
                    <span className="text-[10px] text-[#534434]">
                      Sensor: {activeBottle?.tamper_sensor_id}
                    </span>
                  </div>
                </div>
                {currentStep >= 4 && testScenario === 'NORMAL' ? (
                  activeBottle?.cap_status === 'SEALED' ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#adedd3] text-[#004e34] flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">lock</span>
                      <span>🔒 SEALED</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#ffdad6] text-[#ba1a1a] flex items-center gap-1 animate-pulse">
                      <span className="material-symbols-outlined text-xs">lock_open</span>
                      <span>⚠️ OPENED</span>
                    </span>
                  )
                ) : (
                  <span className="text-[10px] font-semibold text-[#867461]">Waiting</span>
                )}
              </div>

              {/* 6. Batch & Blockchain Verified */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf7f2] border border-[#d8c3ad]/30">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#1b4332]">link</span>
                  <div>
                    <span className="font-extrabold text-[#1f1b17] block">Blockchain Verified</span>
                    <span className="text-[10px] font-mono text-[#867461]">
                      Root: {(activeBottle?.blockchain_hash || activeBottle?.blockchain_tx || '0x7f8a9b2c4d5e6f').substring(0, 14)}...
                    </span>
                  </div>
                </div>
                {currentStep >= 5 && testScenario === 'NORMAL' ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#adedd3] text-[#004e34]">
                    🟢 Blockchain Verified
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-[#867461]">Waiting</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          DETAILED CONSUMER VERIFICATION RESULT SCREEN
         ======================================================== */}
      {isComplete && (
        <div className="animate-in fade-in slide-in-from-bottom duration-300 space-y-6">
          {/* CASE A: COUNTERFEIT DETECTION (Duplicate QR or NFC Mismatch) */}
          {verificationResult === 'POSSIBLE_COUNTERFEIT' && (
            <div className="bg-[#fff0ee] border-2 border-[#ba1a1a] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#ba1a1a] text-white flex items-center justify-center text-2xl font-black">
                  ⚠️
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#ba1a1a]">
                    🔴 POSSIBLE COUNTERFEIT DETECTED
                  </h2>
                  <p className="text-xs text-[#534434] font-medium">
                    QR code is valid on its own, but the physical NFC token did NOT match this bottle identity.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#ba1a1a]/20 text-xs text-[#534434] space-y-2">
                <p>
                  <strong>Hardware Diagnosis:</strong> The QR label may have been duplicated or pasted onto an unauthorized container. The embedded NFC chip in the smart cap returned an unverified token.
                </p>
                <div className="text-[11px] font-mono text-[#ba1a1a] bg-[#fff0ee] p-2 rounded-lg">
                  Tamper Flag: NFC_TOKEN_UNMATCHED | Bottle: {activeBottle?.bottle_id}
                </div>
              </div>
            </div>
          )}

          {/* CASE B: IDENTITY MISMATCH */}
          {verificationResult === 'IDENTITY_MISMATCH' && (
            <div className="bg-[#fff0ee] border-2 border-[#ba1a1a] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#ba1a1a] text-white flex items-center justify-center text-2xl font-black">
                  🚫
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#ba1a1a]">
                    🔴 IDENTITY MISMATCH
                  </h2>
                  <p className="text-xs text-[#534434] font-medium">
                    The scanned NFC chip and QR code belong to two different physical bottles in the registry.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#ba1a1a]/20 text-xs text-[#534434] space-y-2">
                <p>
                  <strong>Hardware Diagnosis:</strong> Smart cap and bottle container cross-check failed. This jar should not be consumed as authentic packaging.
                </p>
              </div>
            </div>
          )}

          {/* CASE C: OPENED AUTHENTIC BOTTLE */}
          {verificationResult === 'OPENED_AUTHENTIC' && (
            <div className="bg-[#fff8f0] border-2 border-[#f59e0b] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              {/* Prominent Alert */}
              <div className="bg-[#ffdad6] border-2 border-[#ba1a1a] rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#ba1a1a] text-white flex items-center justify-center text-2xl font-black shrink-0">
                    ⚠️
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-[#ba1a1a] tracking-tight">
                      ⚠️ BOTTLE OPENING DETECTED
                    </h2>
                    <p className="text-xs text-[#534434] font-semibold mt-0.5">
                      This registered bottle has already been opened at <strong>{activeBottle?.first_opened_at || '10:42 AM'}</strong>.
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs">
                  <span className="text-[10px] font-bold text-[#867461] uppercase block">First Opened At</span>
                  <span className="font-mono font-black text-[#ba1a1a] text-sm">
                    {activeBottle?.first_opened_at || 'Sep 02, 2026 • 10:42 AM'}
                  </span>
                </div>
              </div>

              {/* Requirement #2 Notice: Do NOT call counterfeit only because it was opened */}
              <div className="p-4 rounded-2xl bg-white border border-[#f59e0b]/30 text-xs text-[#534434] space-y-1">
                <p className="font-bold text-[#1f1b17]">
                  ℹ️ Product Origin Status: Authentic Registered Honey
                </p>
                <p className="leading-relaxed">
                  This bottle is <strong>NOT counterfeit</strong>. The physical glass bottle, NFC token, QR code, and batch provenance are 100% genuine and verified on the blockchain. However, the factory hermetic seal on the smart cap has already been unsealed.
                </p>
              </div>

              {/* Verification Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs text-center">
                <div className="p-3 bg-white rounded-xl border border-[#006c49]/20 font-bold text-[#006c49]">
                  🟢 NFC Verified
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#006c49]/20 font-bold text-[#006c49]">
                  🟢 QR Verified
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#006c49]/20 font-bold text-[#006c49]">
                  🟢 Bottle ID Verified
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#006c49]/20 font-bold text-[#006c49]">
                  🟢 Batch Verified
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#006c49]/20 font-bold text-[#006c49]">
                  🟢 Blockchain Verified
                </div>
                <div className="p-3 bg-[#ffdad6] rounded-xl border border-[#ba1a1a]/30 font-black text-[#ba1a1a]">
                  ⚠️ Cap: OPENED
                </div>
              </div>

              {/* Opening History & Blockchain Record */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-5 rounded-2xl border border-[#d8c3ad]/40 space-y-2">
                  <div className="font-black text-[#1f1b17] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#855300] text-base">history</span>
                    <span>Opening History Record</span>
                  </div>
                  <div className="space-y-1.5 text-[#534434]">
                    <div>Bottle ID: <strong className="font-mono text-[#1f1b17]">{activeBottle?.bottle_id}</strong></div>
                    <div>Batch ID: <strong className="font-mono text-[#1f1b17]">{activeBottle?.batch_id}</strong></div>
                    <div>Cap Sensor: <strong className="font-mono text-[#ba1a1a]">{activeBottle?.tamper_sensor_id}</strong></div>
                    <div>Recorded Openings: <strong>{activeBottle?.tamper_event_count}</strong></div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#006c49]/30 space-y-2">
                  <div className="font-black text-[#006c49] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006c49] text-base">link</span>
                    <span>Blockchain: ✓ Opening Event Verified</span>
                  </div>
                  <p className="text-[11px] text-[#534434]">
                    The SHA-256 Opening Hash was anchored to Polygon block ledger at the exact moment of physical seal rupture.
                  </p>
                  <div className="font-mono text-[10px] text-[#867461] bg-[#f7fcf9] p-2 rounded-lg break-all">
                    Anchor: {activeBottle?.blockchain_hash}
                  </div>
                </div>
              </div>

              {/* View Full Honey Journey Button */}
              {onViewTraceability && (
                <button
                  onClick={() => onViewTraceability(activeBottle.batch_id)}
                  className="w-full py-3.5 bg-[#1b4332] hover:bg-[#133024] text-white text-xs font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">account_tree</span>
                  <span>View 12-Stage Honey Journey & Supply Chain</span>
                </button>
              )}
            </div>
          )}

          {/* CASE D: SEALED PRODUCT VERIFIED */}
          {verificationResult === 'PRODUCT_VERIFIED' && (
            <div className="bg-[#f7fcf9] border-2 border-[#006c49] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#006c49]/20">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#006c49] text-white flex items-center justify-center text-3xl font-black shadow-md">
                    ✓
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#adedd3] text-[#004e34] uppercase tracking-wider">
                        Authentication Passed
                      </span>
                      <span className="text-xs font-mono font-bold text-[#867461]">{activeBottle?.bottle_id}</span>
                    </div>
                    <h2 className="text-2xl font-black text-[#004e34] mt-0.5">
                      PRODUCT VERIFIED
                    </h2>
                    <p className="text-xs text-[#534434]">
                      Authentic single-origin honey. Physical hermetic seal intact. Never opened.
                    </p>
                  </div>
                </div>

                {onSimulateCapOpening && (
                  <button
                    onClick={() => {
                      onSimulateCapOpening(activeBottle.bottle_id);
                      setVerificationResult('OPENED_AUTHENTIC');
                    }}
                    className="px-4 py-2 bg-[#ba1a1a] hover:bg-[#961313] text-white text-xs font-black rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">lock_open</span>
                    <span>Simulate Cap Opening Now</span>
                  </button>
                )}
              </div>

              {/* 6 Verification Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs text-center font-bold">
                <div className="p-3 bg-white rounded-xl border border-[#006c49]/20 text-[#006c49]">
                  🟢 NFC Verified
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#006c49]/20 text-[#006c49]">
                  🟢 QR Verified
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#006c49]/20 text-[#006c49]">
                  🟢 Bottle ID Verified
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#006c49]/20 text-[#006c49]">
                  🟢 Batch Verified
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#006c49]/20 text-[#006c49]">
                  🟢 Blockchain Verified
                </div>
                <div className="p-3 bg-[#adedd3] rounded-xl border border-[#006c49]/40 text-[#004e34] font-black">
                  🔒 Cap: SEALED
                </div>
              </div>

              {/* Bottle Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-[#d8c3ad]/40">
                  <span className="text-[10px] font-bold text-[#867461] uppercase block">Honey Variety</span>
                  <div className="font-bold text-[#1f1b17] mt-0.5">{activeBottle?.honeyType}</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#d8c3ad]/40">
                  <span className="text-[10px] font-bold text-[#867461] uppercase block">Master Apiarist</span>
                  <div className="font-bold text-[#1f1b17] mt-0.5">{activeBottle?.beekeeperName || 'Rajesh Mondal'}</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#d8c3ad]/40">
                  <span className="text-[10px] font-bold text-[#867461] uppercase block">Origin Apiary</span>
                  <div className="font-bold text-[#1f1b17] mt-0.5">Sundarbans Cluster A</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#d8c3ad]/40">
                  <span className="text-[10px] font-bold text-[#867461] uppercase block">Factory Packaged</span>
                  <div className="font-bold text-[#1f1b17] mt-0.5">{activeBottle?.created_at}</div>
                </div>
              </div>

              {/* View Full Honey Journey Button */}
              {onViewTraceability && (
                <button
                  onClick={() => onViewTraceability(activeBottle.batch_id)}
                  className="w-full py-3.5 bg-[#006c49] hover:bg-[#004e34] text-white text-xs font-black rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">account_tree</span>
                  <span>Explore Complete 12-Stage Honey Journey</span>
                </button>
              )}
            </div>
          )}

          {/* ========================================================
              IMPORTANT QUALITY SEPARATION (Requirement #13)
             ======================================================== */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#d8c3ad]/30 shadow-sm space-y-3 text-xs">
            <div className="flex items-center gap-2 font-black text-[#855300] uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">science</span>
              <span>Important Quality System Separation</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20 space-y-1">
                <span className="text-[11px] font-black text-[#855300] block uppercase">
                  🔒 What the Smart Cap & NFC Prove:
                </span>
                <p className="text-[#534434] leading-relaxed">
                  <strong>"Has this registered bottle been opened?"</strong> It validates mechanical seal integrity, prevents refills with fake syrup, and anchors the physical opening timestamp immutably to the blockchain.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f7fcf9] border border-[#006c49]/20 space-y-1">
                <span className="text-[11px] font-black text-[#006c49] block uppercase">
                  🧪 What the Quality & Lab System Proves:
                </span>
                <p className="text-[#534434] leading-relaxed">
                  <strong>"What is the tested quality of the honey?"</strong> It certifies lab metrics including 17.8% moisture level, HMF index below 15 mg/kg, pollen density, and non-inversion cold extraction.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
