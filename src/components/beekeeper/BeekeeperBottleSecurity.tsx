import React, { useState } from 'react';
import { SmartBottle, LiveEventItem, HoneyBatch } from '../../types';
import { LiveEventFeed } from '../common/LiveEventFeed';

interface BeekeeperBottleSecurityProps {
  bottles: SmartBottle[];
  batches: HoneyBatch[];
  liveEvents: LiveEventItem[];
  onSimulateCapOpening: (bottleId: string) => void;
  onSelectBatch?: (batchCode: string) => void;
  onGenerateBottle?: () => void;
}

export const BeekeeperBottleSecurity: React.FC<BeekeeperBottleSecurityProps> = ({
  bottles = [],
  batches = [],
  liveEvents = [],
  onSimulateCapOpening,
  onSelectBatch,
  onGenerateBottle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SEALED' | 'OPENED'>('ALL');
  const [selectedBottle, setSelectedBottle] = useState<SmartBottle | null>(bottles[0] || null);
  const [openingSuccessToast, setOpeningSuccessToast] = useState<string | null>(null);

  // Computed metrics
  const totalBottles = bottles.length;
  const sealedBottles = bottles.filter(b => b.cap_status === 'SEALED').length;
  const openedBottles = bottles.filter(b => b.cap_status === 'OPENED').length;
  const tamperAlerts = bottles.filter(
    b => b.tamper_event_count > 0 || b.verification_status === 'TAMPER_DETECTED'
  ).length;

  // Filtered bottle list
  const filteredBottles = bottles.filter(b => {
    const matchesSearch =
      b.bottle_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.batch_id && b.batch_id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.nfc_token && b.nfc_token.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.qr_token && b.qr_token.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'ALL' || b.cap_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleSimulateOpeningFromModal = (bottleId: string) => {
    onSimulateCapOpening(bottleId);
    setOpeningSuccessToast(`⚠️ Cap opening simulated for bottle ${bottleId}. Tamper event anchored to blockchain!`);
    setTimeout(() => {
      setOpeningSuccessToast(null);
    }, 5000);
  };

  // Keep selected bottle in sync if updated
  const currentSelectedBottle = bottles.find(b => b.bottle_id === selectedBottle?.bottle_id) || selectedBottle;

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {openingSuccessToast && (
        <div className="bg-[#ba1a1a] text-white px-5 py-4 rounded-2xl shadow-xl flex items-center justify-between gap-3 animate-bounce">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl">warning</span>
            <span className="text-xs sm:text-sm font-black">{openingSuccessToast}</span>
          </div>
          <button
            onClick={() => setOpeningSuccessToast(null)}
            className="text-white/80 hover:text-white font-bold text-xs uppercase"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1b4332] via-[#245842] to-[#1b4332] text-white p-6 sm:p-10 rounded-3xl shadow-lg flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#fcd34d] text-[#1b4332] uppercase tracking-wider">
              Smart IoT Packaging
            </span>
            <span className="text-xs text-[#95d3ba] font-semibold">Dual NFC + QR Security Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Smart Tamper-Evident Honey Bottles
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Every Honey Chain bottle features a physical digital twin with an armed tamper sensor cap, single-use cryptographic NFC token, and serialized blockchain hash.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {onGenerateBottle && (
            <button
              onClick={onGenerateBottle}
              className="px-4 py-3 bg-[#f59e0b] hover:bg-[#d97706] text-[#1f1b17] text-xs font-black rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>Register New Smart Bottle</span>
            </button>
          )}
          {bottles.some(b => b.cap_status === 'SEALED') && (
            <button
              onClick={() => {
                const sealed = bottles.find(b => b.cap_status === 'SEALED');
                if (sealed) handleSimulateOpeningFromModal(sealed.bottle_id);
              }}
              className="px-4 py-3 bg-[#ba1a1a] hover:bg-[#961313] text-white text-xs font-black rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">lock_open</span>
              <span>Simulate Cap Opening</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Dashboard Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Bottles */}
        <div className="bg-white p-5 rounded-3xl border border-[#d8c3ad]/30 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#534434]">Total Bottles</span>
            <div className="w-8 h-8 rounded-xl bg-[#fffbf7] flex items-center justify-center text-[#855300] border border-[#f59e0b]/20">
              <span className="material-symbols-outlined text-base">inventory</span>
            </div>
          </div>
          <div className="text-3xl font-black text-[#1f1b17]">{totalBottles}</div>
          <div className="text-[11px] text-[#534434] font-medium">Smart packaging serialized</div>
        </div>

        {/* Sealed Bottles */}
        <div className="bg-white p-5 rounded-3xl border border-[#006c49]/30 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-[#006c49]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#006c49]">Sealed Bottles</span>
            <div className="w-8 h-8 rounded-xl bg-[#f7fcf9] flex items-center justify-center text-[#006c49] border border-[#006c49]/20">
              <span className="material-symbols-outlined text-base">lock</span>
            </div>
          </div>
          <div className="text-3xl font-black text-[#006c49]">{sealedBottles}</div>
          <div className="text-[11px] text-[#006c49] font-bold">
            {totalBottles ? Math.round((sealedBottles / totalBottles) * 100) : 100}% Hermetically Intact
          </div>
        </div>

        {/* Opened Bottles */}
        <div className="bg-white p-5 rounded-3xl border border-[#f59e0b]/30 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-[#855300]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#855300]">Opened Bottles</span>
            <div className="w-8 h-8 rounded-xl bg-[#fffbf7] flex items-center justify-center text-[#855300] border border-[#f59e0b]/20">
              <span className="material-symbols-outlined text-base">lock_open</span>
            </div>
          </div>
          <div className="text-3xl font-black text-[#855300]">{openedBottles}</div>
          <div className="text-[11px] text-[#534434] font-medium">Consumer unsealed & verified</div>
        </div>

        {/* Tamper Alerts */}
        <div className="bg-white p-5 rounded-3xl border border-[#ba1a1a]/30 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-[#ba1a1a]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#ba1a1a]">Tamper Alerts</span>
            <div className="w-8 h-8 rounded-xl bg-[#fff0ee] flex items-center justify-center text-[#ba1a1a] border border-[#ba1a1a]/20">
              <span className="material-symbols-outlined text-base">warning</span>
            </div>
          </div>
          <div className="text-3xl font-black text-[#ba1a1a]">{tamperAlerts}</div>
          <div className="text-[11px] text-[#ba1a1a] font-bold">First-opening timestamps anchored</div>
        </div>
      </div>

      {/* Main Grid: Bottles Table (Left) + Live Event Feed (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Table Section */}
        <div className="xl:col-span-2 bg-white rounded-3xl p-5 sm:p-7 border border-[#d8c3ad]/30 shadow-sm space-y-5">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#867461] text-base">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Bottle ID, Batch, NFC, or QR..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#f6ece6] rounded-2xl text-xs font-semibold text-[#1f1b17] placeholder:text-[#867461] border border-transparent focus:border-[#855300] outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[11px] font-bold text-[#867461]">Filter Cap:</span>
              {(['ALL', 'SEALED', 'OPENED'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    statusFilter === st
                      ? 'bg-[#1b4332] text-white shadow-sm'
                      : 'bg-[#f6ece6] text-[#534434] hover:bg-[#ebd9cb]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#d8c3ad]/40 text-[#867461] font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-2">Bottle</th>
                  <th className="py-3 px-2">Batch</th>
                  <th className="py-3 px-2">NFC</th>
                  <th className="py-3 px-2">QR</th>
                  <th className="py-3 px-2">Cap</th>
                  <th className="py-3 px-2">First Opening</th>
                  <th className="py-3 px-2">Security</th>
                  <th className="py-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0e6e0]">
                {filteredBottles.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-10 text-center text-xs text-[#867461]">
                      No smart bottles found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredBottles.map((b) => {
                    const isSealed = b.cap_status === 'SEALED';
                    const isSelected = currentSelectedBottle?.bottle_id === b.bottle_id;

                    return (
                      <tr
                        key={b.bottle_id}
                        onClick={() => setSelectedBottle(b)}
                        className={`hover:bg-[#fffbf7] transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#fff8f0]' : ''
                        }`}
                      >
                        {/* Bottle ID */}
                        <td className="py-3.5 px-2 font-black text-[#1f1b17] whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base text-[#855300]">
                              wine_bar
                            </span>
                            <span>{b.bottle_id}</span>
                          </div>
                        </td>

                        {/* Batch */}
                        <td className="py-3.5 px-2 font-mono font-bold text-[#534434] whitespace-nowrap">
                          {b.batch_id}
                        </td>

                        {/* NFC */}
                        <td className="py-3.5 px-2 font-mono text-[11px] text-[#006c49] font-semibold whitespace-nowrap">
                          {(b.nfc_token || '').substring(0, 8)}...
                        </td>

                        {/* QR */}
                        <td className="py-3.5 px-2 font-mono text-[11px] text-[#855300] font-semibold whitespace-nowrap">
                          {(b.qr_token || '').substring(0, 10)}...
                        </td>

                        {/* Cap Status */}
                        <td className="py-3.5 px-2 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase inline-flex items-center gap-1 ${
                              isSealed
                                ? 'bg-[#adedd3] text-[#004e34]'
                                : 'bg-[#ffdad6] text-[#ba1a1a]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-xs">
                              {isSealed ? 'lock' : 'lock_open'}
                            </span>
                            <span>{b.cap_status}</span>
                          </span>
                        </td>

                        {/* First Opening */}
                        <td className="py-3.5 px-2 text-[#534434] font-medium whitespace-nowrap">
                          {b.first_opened_at ? (
                            <span className="text-[#ba1a1a] font-bold">{b.first_opened_at}</span>
                          ) : (
                            <span className="text-[#867461] italic">Not opened yet</span>
                          )}
                        </td>

                        {/* Security */}
                        <td className="py-3.5 px-2 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              b.verification_status === 'VERIFIED'
                                ? 'bg-[#f7fcf9] text-[#006c49] border border-[#006c49]/30'
                                : 'bg-[#fff0ee] text-[#ba1a1a] border border-[#ba1a1a]/30'
                            }`}
                          >
                            {b.verification_status}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-2 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedBottle(b);
                            }}
                            className="px-2.5 py-1 bg-[#1b4332] hover:bg-[#133024] text-white text-[11px] font-bold rounded-lg transition-all cursor-pointer shadow-sm"
                          >
                            Digital Twin
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Live Event Feed */}
        <div className="xl:col-span-1">
          <LiveEventFeed
            events={liveEvents}
            onSelectBottle={(id) => {
              const b = bottles.find(item => item.bottle_id === id);
              if (b) setSelectedBottle(b);
            }}
            onSelectBatch={onSelectBatch}
          />
        </div>
      </div>

      {/* ========================================================
          SMART BOTTLE DIGITAL TWIN INSPECTION CARD
         ======================================================== */}
      {currentSelectedBottle && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#1b4332]/20 shadow-xl space-y-6 animate-in fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#f0e6e0]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1b4332] text-[#fcd34d] flex items-center justify-center text-2xl font-black shadow-md">
                🍾
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-[#1f1b17]">
                    Smart Bottle Digital Twin: {currentSelectedBottle.bottle_id}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-black uppercase flex items-center gap-1 ${
                      currentSelectedBottle.cap_status === 'SEALED'
                        ? 'bg-[#adedd3] text-[#004e34]'
                        : 'bg-[#ffdad6] text-[#ba1a1a] animate-pulse'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {currentSelectedBottle.cap_status === 'SEALED' ? 'lock' : 'lock_open'}
                    </span>
                    <span>Cap Status: {currentSelectedBottle.cap_status}</span>
                  </span>
                </div>
                <p className="text-xs text-[#534434] mt-0.5">
                  Honey Variety: <strong>{currentSelectedBottle.honeyType}</strong> • Harvested by{' '}
                  <strong>{currentSelectedBottle.beekeeperName || 'Rajesh Mondal'}</strong>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {currentSelectedBottle.cap_status === 'SEALED' ? (
                <button
                  onClick={() => handleSimulateOpeningFromModal(currentSelectedBottle.bottle_id)}
                  className="px-4 py-2.5 bg-[#ba1a1a] hover:bg-[#961313] text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">lock_open</span>
                  <span>Simulate Cap Opening</span>
                </button>
              ) : (
                <div className="px-4 py-2 bg-[#ffdad6] text-[#ba1a1a] text-xs font-black rounded-xl border border-[#ba1a1a]/30 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>Opening Permanently Locked on Blockchain</span>
                </div>
              )}
            </div>
          </div>

          {/* Digital Twin Metadata Bento Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20 space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#867461]">Bottle ID</span>
              <div className="font-mono font-black text-[#1f1b17]">{currentSelectedBottle.bottle_id}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20 space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#867461]">Batch ID</span>
              <div className="font-mono font-black text-[#855300]">{currentSelectedBottle.batch_id}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20 space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#867461]">NFC Chip ID</span>
              <div className="font-mono font-black text-[#006c49] break-all">{currentSelectedBottle.nfc_token}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20 space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#867461]">QR Security Token</span>
              <div className="font-mono font-black text-[#1f1b17] break-all">{currentSelectedBottle.qr_token}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20 space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#867461]">Smart Cap Sensor</span>
              <div className="font-mono font-black text-[#ba1a1a]">{currentSelectedBottle.tamper_sensor_id}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20 space-y-1">
              <span className="text-[10px] font-bold uppercase text-[#867461]">Opening Count</span>
              <div className="font-black text-[#1f1b17]">{currentSelectedBottle.tamper_event_count}</div>
            </div>
          </div>

          {/* Blockchain & First Opening Record */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#f7fcf9] border border-[#006c49]/20 space-y-2">
              <div className="flex items-center gap-2 text-[#006c49] font-black">
                <span className="material-symbols-outlined text-base">link</span>
                <span>Blockchain Anchor Status</span>
              </div>
              <p className="text-[#534434] leading-relaxed">
                Ledger Root: <strong>{currentSelectedBottle.blockchain_status}</strong>
              </p>
              <div className="font-mono text-[11px] text-[#867461] break-all bg-white p-2.5 rounded-xl border border-[#006c49]/10">
                TX: {currentSelectedBottle.blockchain_tx || '0x3a9f1b2c4d5e688194a2e0394857bdf1c08e562149b8a0712349ef827361a9bc'}
              </div>
            </div>

            <div className={`p-4 rounded-2xl border space-y-2 ${
              currentSelectedBottle.cap_status === 'OPENED'
                ? 'bg-[#fff0ee] border-[#ba1a1a]/30 text-[#ba1a1a]'
                : 'bg-[#f6ece6] border-[#d8c3ad]/40 text-[#534434]'
            }`}>
              <div className="flex items-center gap-2 font-black">
                <span className="material-symbols-outlined text-base">
                  {currentSelectedBottle.cap_status === 'OPENED' ? 'warning' : 'verified_user'}
                </span>
                <span>Physical Cap Seal Status</span>
              </div>
              {currentSelectedBottle.first_opened_at ? (
                <div>
                  <p className="font-bold text-xs text-[#ba1a1a]">
                    ⚠️ BOTTLE OPENING DETECTED at {currentSelectedBottle.first_opened_at}
                  </p>
                  <p className="text-[11px] text-[#534434] mt-1">
                    Sensor {currentSelectedBottle.tamper_sensor_id} circuit broke. The bottle state permanently shifted from SEALED → OPENED and cannot be resealed.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-bold text-xs text-[#006c49]">
                    🔒 FACTORY HERMETIC SEAL INTACT
                  </p>
                  <p className="text-[11px] text-[#534434] mt-1">
                    Sensor resistance is normal. Bottle has never been opened since sterile apiary packaging on {currentSelectedBottle.created_at}.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Opening History & Security Timeline (Requirement #6) */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-[#1f1b17] uppercase tracking-wider">
                📜 Bottle Opening & Cryptographic Timeline
              </h3>
              <span className="text-xs text-[#867461] font-semibold">
                Sequential Hardware & Blockchain Milestones
              </span>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-[#1b4332] space-y-5">
              {currentSelectedBottle.security_timeline.map((event, idx) => (
                <div key={event.id} className="relative">
                  {/* Icon Node */}
                  <div
                    className={`absolute -left-[35px] sm:-left-[43px] top-0.5 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                      event.status === 'warning'
                        ? 'bg-[#ba1a1a] text-white animate-pulse'
                        : event.status === 'info'
                        ? 'bg-[#855300] text-white'
                        : 'bg-[#1b4332] text-[#fcd34d]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">{event.icon}</span>
                  </div>

                  <div className="bg-[#faf7f2] p-4 rounded-2xl border border-[#d8c3ad]/40 space-y-1.5 hover:border-[#855300] transition-colors text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-[#855300]">
                          Step 0{idx + 1}
                        </span>
                        <h4 className="font-extrabold text-[#1f1b17]">{event.title}</h4>
                      </div>
                      <span className="text-[10px] font-mono text-[#867461]">{event.timestamp}</span>
                    </div>

                    <p className="text-[#534434] leading-relaxed">{event.details}</p>

                    {event.blockchainHash && (
                      <div className="text-[10px] font-mono text-[#006c49] bg-white p-1.5 rounded-lg border border-[#006c49]/10 break-all">
                        Hash: {event.blockchainHash}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
