import React from 'react';

export const HowHoneyChainWorks: React.FC = () => {
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white p-6 sm:p-12 rounded-3xl shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#fcd34d] text-[#1b4332] text-xs font-black rounded-full uppercase tracking-wider">
            Technical Architecture & Trust Model
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          How Honey Chain Works
        </h1>
        <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
          A seamless fusion of Smart IoT Hive telemetry, Edge AI diagnostics, cryptographic blockchain batch hashing, and a direct-to-consumer marketplace.
        </p>
      </div>

      {/* 4 Architectural Layers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Layer 1: Smart IoT Telemetry */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#fff4e5] text-[#855300] flex items-center justify-center text-2xl font-black">
            📡
          </div>
          <h2 className="text-lg font-black text-[#1f1b17]">
            1. Smart Hive IoT Telemetry Layer
          </h2>
          <p className="text-xs text-[#534434] leading-relaxed">
            Each hive is fitted with high-precision low-power sensor probes (DHT22 temperature/humidity, load cells for continuous honey weight accumulation, acoustic mics for queen piping frequencies). Data packets transmit via LoRaWAN / GSM to the apiary central hub every 120 seconds.
          </p>
          <div className="p-3 bg-[#f6ece6] rounded-xl text-[11px] font-mono text-[#855300]">
            Sensors: Internal Temp (34.8°C) • Humidity (58%) • Brood Weight (38.4 kg)
          </div>
        </div>

        {/* Layer 2: AI Health & Predictive Modeling */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#e8f7f0] text-[#006c49] flex items-center justify-center text-2xl font-black">
            🧠
          </div>
          <h2 className="text-lg font-black text-[#1f1b17]">
            2. Edge & Cloud AI Health Diagnostics
          </h2>
          <p className="text-xs text-[#534434] leading-relaxed">
            Proprietary machine learning models continuously analyze multi-dimensional hive curves to detect early warning signs: swarming risks, Varroa mite stress, queen mortality, or thermal stress. The system forecasts harvest readiness dates and projected yields with over 94% accuracy.
          </p>
          <div className="p-3 bg-[#f7fcf9] rounded-xl text-[11px] font-mono text-[#006c49]">
            Inference: Anomaly Probability (0.08) • Projected Yield (+8.4 kg in 12 days)
          </div>
        </div>

        {/* Layer 3: Blockchain Batch Ledger */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#fffbf7] text-[#855300] flex items-center justify-center text-2xl font-black">
            ⛓
          </div>
          <h2 className="text-lg font-black text-[#1f1b17]">
            3. Cryptographic Batch Traceability
          </h2>
          <p className="text-xs text-[#534434] leading-relaxed">
            When a honey batch is extracted, its source hive, raw moisture reading, extraction method, laboratory test score, and packaging timestamp are compiled into a cryptographic Merkle root and minted into the immutable Honey Chain ledger.
          </p>
          <div className="p-3 bg-[#fffbf7] rounded-xl text-[11px] font-mono text-[#855300] break-all border border-[#f59e0b]/30">
            Hash: 0x9f82ab73c091e4a5bf... (Block #89,412)
          </div>
        </div>

        {/* Layer 4: QR Verification & Fair Marketplace */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#e0f2fe] text-[#0369a1] flex items-center justify-center text-2xl font-black">
            🏷
          </div>
          <h2 className="text-lg font-black text-[#1f1b17]">
            4. QR Bottle Verification & Direct Commerce
          </h2>
          <p className="text-xs text-[#534434] leading-relaxed">
            Every packaged jar receives a unique tamper-evident ISO QR code. Consumers scanning the jar immediately view the exact hive telemetry, harvest date, and beekeeper bio. 95% of retail revenue flows directly to the apiculturist.
          </p>
          <div className="p-3 bg-[#f0f9ff] rounded-xl text-[11px] font-mono text-[#0369a1]">
            QR Scan → Instant Provenance Certificate • Direct Fair Trade Payout
          </div>
        </div>
      </div>

      {/* Trust & Purity Commitment */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-3">
        <h3 className="text-base font-black text-[#1f1b17]">
          Our Purity & Transparency Standard
        </h3>
        <p className="text-xs text-[#534434] leading-relaxed">
          Traditional commercial honey supply chains involve severe thermal pasteurization and blending with high-fructose corn or rice syrups. Honey Chain eliminates this by linking raw, unheated centrifugal extraction directly to cryptographically stamped smart hives.
        </p>
      </div>
    </div>
  );
};
