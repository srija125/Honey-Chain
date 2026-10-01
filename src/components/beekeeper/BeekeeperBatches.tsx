import React, { useState } from 'react';
import { HoneyBatch, HiveTelemetry } from '../../types';

interface BeekeeperBatchesProps {
  batches: HoneyBatch[];
  hives: HiveTelemetry[];
  onCreateBatch: (batch: Partial<HoneyBatch>) => void;
  onViewTraceability: (batchId: string) => void;
  onGenerateQR: (batchId: string) => void;
}

export const BeekeeperBatches: React.FC<BeekeeperBatchesProps> = ({
  batches = [],
  hives = [],
  onCreateBatch,
  onViewTraceability,
  onGenerateQR,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Form State
  const [sourceHiveId, setSourceHiveId] = useState(hives?.[0]?.id || 'hive-1');
  const [honeyType, setHoneyType] = useState('Sundarban Wild Raw Honey');
  const [quantityKg, setQuantityKg] = useState(24.5);
  const [harvestDate, setHarvestDate] = useState(new Date().toISOString().split('T')[0]);
  const [moisture, setMoisture] = useState(17.2);
  const [processingFacility, setProcessingFacility] = useState('Kolkata Cold Extraction Facility');
  const [packagingDate, setPackagingDate] = useState(new Date().toISOString().split('T')[0]);

  const totalBatchesCount = 128;
  const pendingCount = 12;
  const packagedCount = 74;
  const listedCount = 42;
  const soldCount = 29;

  const safeBatches = batches || [];
  const filteredBatches = safeBatches.filter(b => statusFilter === 'all' || b.status === statusFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedHive = hives.find(h => h.id === sourceHiveId) || hives[0];
    const newCode = `HC-2026-${String(batches.length + 1).padStart(4, '0')}`;
    
    onCreateBatch({
      batchCode: newCode,
      sourceHiveId: selectedHive.id,
      sourceHiveCode: selectedHive.code,
      honeyType,
      quantityKg: Number(quantityKg),
      harvestDate,
      moisturePercentage: Number(moisture),
      processingFacility,
      packagingDate,
      status: 'packaged',
      qualityScore: 96,
      blockchainHash: `0x7f${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
      blockchainTimestamp: `${harvestDate} 09:30 UTC`,
      traceabilitySteps: [
        {
          id: 'step-1',
          stageName: 'Hive Registered',
          icon: 'hive',
          location: selectedHive.location,
          timestamp: `${harvestDate} 07:00 AM`,
          operatorName: 'Rajesh Mondal (Apiary Lead)',
          status: 'completed',
          hash: `0x${Math.random().toString(16).substring(2, 12)}`,
          details: `Hive biometric baseline: ${selectedHive.internalTemp}°C, ${selectedHive.humidity}% RH.`
        },
        {
          id: 'step-2',
          stageName: 'Honey Extracted',
          icon: 'water_drop',
          location: selectedHive.location,
          timestamp: `${harvestDate} 08:30 AM`,
          operatorName: 'Apiary Harvesting Unit 2',
          status: 'completed',
          hash: `0x${Math.random().toString(16).substring(2, 12)}`,
          details: `Manual unheated cold centrifugation. Net: ${quantityKg} kg raw honey.`
        },
        {
          id: 'step-3',
          stageName: 'Processing Completed',
          icon: 'science',
          location: processingFacility,
          timestamp: `${harvestDate} 02:00 PM`,
          operatorName: 'Quality Officer S. Banerjee',
          status: 'completed',
          hash: `0x${Math.random().toString(16).substring(2, 12)}`,
          details: `Gravity micro-filtration. Moisture content: ${moisture}%. Purity verified.`
        },
        {
          id: 'step-4',
          stageName: 'Packaging Completed',
          icon: 'inventory_2',
          location: 'Honey Chain Certified Hub',
          timestamp: `${packagingDate} 05:00 PM`,
          operatorName: 'Automated Bottling Line A',
          status: 'completed',
          hash: `0x${Math.random().toString(16).substring(2, 12)}`,
          details: 'Sterilized amber glass jars sealed with tamper-evident QR label.'
        }
      ]
    });

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#d8c3ad]/30 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#1f1b17]">Honey Batches & Provenance</h1>
          <p className="text-xs text-[#534434] mt-1 font-medium">
            Manage harvested honey lots, immutably recorded on the Honey Chain ledger.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 bg-[#855300] hover:bg-[#684000] text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">add_circle</span>
          <span>+ Create Honey Batch</span>
        </button>
      </div>

      {/* Batch Stats KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-[#d8c3ad]/30 shadow-sm text-center">
          <div className="text-[10px] font-bold text-[#867461] uppercase">Total Batches</div>
          <div className="text-xl font-black text-[#1f1b17] mt-1">{totalBatchesCount}</div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-[#d8c3ad]/30 shadow-sm text-center">
          <div className="text-[10px] font-bold text-[#867461] uppercase">Pending Processing</div>
          <div className="text-xl font-black text-[#f59e0b] mt-1">{pendingCount}</div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-[#d8c3ad]/30 shadow-sm text-center">
          <div className="text-[10px] font-bold text-[#867461] uppercase">Packaged</div>
          <div className="text-xl font-black text-[#006c49] mt-1">{packagedCount}</div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-[#d8c3ad]/30 shadow-sm text-center">
          <div className="text-[10px] font-bold text-[#867461] uppercase">Listed For Sale</div>
          <div className="text-xl font-black text-[#2b6954] mt-1">{listedCount}</div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-[#d8c3ad]/30 shadow-sm text-center col-span-2 sm:col-span-1">
          <div className="text-[10px] font-bold text-[#867461] uppercase">Fulfilled / Sold</div>
          <div className="text-xl font-black text-[#534434] mt-1">{soldCount}</div>
        </div>
      </div>

      {/* Batches Table Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-[#f0e6e0]">
          <h2 className="text-base font-extrabold text-[#1f1b17]">All Apiary Honey Batches</h2>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-[#f6ece6] p-1 rounded-xl text-xs font-bold">
            {(['all', 'packaged', 'listed', 'processing', 'extracted'] as const).map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1 rounded-lg capitalize transition-all ${
                  statusFilter === s
                    ? 'bg-white text-[#855300] font-extrabold shadow-sm'
                    : 'text-[#534434] hover:text-[#1f1b17]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#f0e6e0] text-[#867461] font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3">Batch ID</th>
                <th className="pb-3">Source Hive</th>
                <th className="pb-3">Honey Type</th>
                <th className="pb-3">Quantity</th>
                <th className="pb-3">Extraction Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Blockchain Hash</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0e6e0]">
              {filteredBatches.map(b => (
                <tr key={b.id} className="hover:bg-[#fffbf7] transition-colors">
                  <td className="py-3.5 font-black text-[#855300]">{b.batchCode}</td>
                  <td className="py-3.5 font-bold text-[#1f1b17]">{b.sourceHiveCode}</td>
                  <td className="py-3.5 text-[#534434]">{b.honeyType}</td>
                  <td className="py-3.5 font-bold text-[#1f1b17]">{b.quantityKg} kg</td>
                  <td className="py-3.5 text-[#867461]">{b.harvestDate}</td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#adedd3] text-[#004e34] capitalize">
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono text-[10px] text-[#867461]">
                    {(b.blockchainHash || '0x7f8a9b2c').substring(0, 10)}...
                  </td>
                  <td className="py-3.5 text-right space-x-1.5">
                    <button
                      onClick={() => onViewTraceability(b.id)}
                      className="px-2.5 py-1 text-[11px] font-bold bg-[#006c49] hover:bg-[#004e34] text-white rounded-lg transition-colors cursor-pointer"
                      title="View Blockchain Traceability"
                    >
                      Trace
                    </button>
                    <button
                      onClick={() => onGenerateQR(b.id)}
                      className="px-2.5 py-1 text-[11px] font-bold bg-[#f6ece6] hover:bg-[#ebd9cb] text-[#1f1b17] rounded-lg transition-colors cursor-pointer"
                      title="Generate Bottle QR"
                    >
                      QR
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Batch Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-[#d8c3ad]/50 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-[#f0e6e0]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl text-[#855300]">layers</span>
                <h3 className="text-lg font-black text-[#1f1b17]">Create New Honey Batch</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#867461] hover:text-[#1f1b17] p-1.5 rounded-lg hover:bg-[#f6ece6]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#534434] mb-1">Source Hive</label>
                  <select
                    value={sourceHiveId}
                    onChange={(e) => setSourceHiveId(e.target.value)}
                    className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] border border-transparent focus:border-[#855300] outline-none"
                  >
                    {hives.map(h => (
                      <option key={h.id} value={h.id}>
                        {h.code} — {h.name} ({h.location})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#534434] mb-1">Honey Variety</label>
                  <select
                    value={honeyType}
                    onChange={(e) => setHoneyType(e.target.value)}
                    className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] border border-transparent focus:border-[#855300] outline-none"
                  >
                    <option value="Sundarban Wild Raw Honey">Sundarban Wild Raw Honey</option>
                    <option value="Mustard Blossom Raw Honey">Mustard Blossom Raw Honey</option>
                    <option value="Litchi Blossom Honey">Litchi Blossom Honey</option>
                    <option value="Forest Multi-floral Honey">Forest Multi-floral Honey</option>
                    <option value="Organic Acacia Raw Honey">Organic Acacia Raw Honey</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-[#534434] mb-1">Quantity (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={quantityKg}
                    onChange={(e) => setQuantityKg(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] border border-transparent focus:border-[#855300] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#534434] mb-1">Moisture (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={moisture}
                    onChange={(e) => setMoisture(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] border border-transparent focus:border-[#855300] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#534434] mb-1">Extraction Date</label>
                  <input
                    type="date"
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] border border-transparent focus:border-[#855300] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#534434] mb-1">Processing Facility</label>
                <input
                  type="text"
                  value={processingFacility}
                  onChange={(e) => setProcessingFacility(e.target.value)}
                  className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] border border-transparent focus:border-[#855300] outline-none"
                />
              </div>

              <div className="bg-[#fffbf7] p-3.5 rounded-2xl border border-[#f59e0b]/30">
                <div className="flex items-center gap-2 text-xs font-black text-[#855300]">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>Blockchain Ledger Immutability</span>
                </div>
                <p className="text-[11px] text-[#534434] mt-1">
                  Upon creation, Honey Chain generates a cryptographic SHA-256 batch manifest linked to hive telemetry.
                </p>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-[#f6ece6] text-[#534434] font-bold rounded-xl hover:bg-[#ebd9cb]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#855300] hover:bg-[#684000] text-white font-extrabold rounded-xl shadow-md cursor-pointer"
                >
                  Confirm & Mint Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
