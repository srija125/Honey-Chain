import React, { useState } from 'react';
import { HiveTelemetry, HoneyBatch } from '../../types';

interface BeekeeperHiveDetailsProps {
  hives?: HiveTelemetry[];
  selectedHiveId?: string;
  onSelectHive?: (id: string) => void;
  batches?: HoneyBatch[];
  onOpenAIHealth?: (hiveId: string) => void;
  onOpenCreateBatch?: (hiveId: string) => void;
  onToggleAnomaly?: (hiveId: string) => void;
  onAddInspectionNote?: (hiveId: string, note: string) => void;
  onAddHive?: (hive: Partial<HiveTelemetry>) => void;
  onNavigateToHealth?: () => void;
}

export const BeekeeperHiveDetails: React.FC<BeekeeperHiveDetailsProps> = ({
  hives = [],
  selectedHiveId,
  onSelectHive,
  batches = [],
  onOpenAIHealth,
  onOpenCreateBatch,
  onToggleAnomaly,
  onAddInspectionNote,
  onAddHive,
  onNavigateToHealth,
}) => {
  const [activeTab, setActiveTab] = useState<'sensors' | 'history' | 'batches'>('sensors');
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('7d');
  const [newNote, setNewNote] = useState('');
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);

  const hive: HiveTelemetry = (hives && hives.length > 0)
    ? (hives.find(h => h.id === selectedHiveId) || hives[0])
    : {
        id: 'hive-1',
        code: 'HIVE-001',
        name: 'Mangrove Royal Alpha',
        location: 'Sundarbans, West Bengal',
        cluster: 'Sundarban Mangrove Cluster',
        internalTemp: 34.8,
        humidity: 62,
        weight: 48.2,
        weightChange24h: '+0.4 kg',
        status: 'healthy',
        healthScore: 94,
        telemetryStatus: 'Online',
        lastPing: '2 mins ago',
        batteryLevel: 98,
        connectivity: 'LoRaWAN Mesh',
        metrics: {
          tempStability: 96,
          humidityVariance: 88,
          weightGrowth: 92,
          environmentalConsistency: 95,
        },
      };

  const hiveBatches = (batches || []).filter(b => b.sourceHiveId === hive.id || b.sourceHiveCode === hive.code);

  const isHealthy = hive.status === 'healthy';
  const isCritical = hive.status === 'critical';

  const handleHealthClick = () => {
    if (onOpenAIHealth) onOpenAIHealth(hive.id);
    else if (onNavigateToHealth) onNavigateToHealth();
  };

  const handleExtractClick = () => {
    if (onOpenCreateBatch) onOpenCreateBatch(hive.id);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    if (onAddInspectionNote) {
      onAddInspectionNote(hive.id, newNote.trim());
    }
    setNewNote('');
    setShowAddNoteModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Hive Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {hives.map(h => (
          <button
            key={h.id}
            onClick={() => onSelectHive?.(h.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              h.id === hive.id
                ? 'bg-[#1b4332] text-white shadow-md'
                : 'bg-white text-[#534434] border border-[#d8c3ad]/40 hover:bg-[#f6ece6]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${
              h.status === 'healthy' ? 'bg-[#006c49]' : h.status === 'critical' ? 'bg-[#ba1a1a]' : 'bg-[#f59e0b]'
            }`} />
            <span>{h.code}</span>
            <span className="text-[10px] opacity-75">({h.internalTemp}°C)</span>
          </button>
        ))}
      </div>

      {/* Main Hive Title Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#f59e0b]/15 flex items-center justify-center text-[#855300] font-black text-2xl shadow-inner">
            🐝
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-black text-[#1f1b17]">{hive.code}</h1>
              <span className="text-sm font-semibold text-[#867461]">({hive.name})</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase ${
                isHealthy
                  ? 'bg-[#adedd3] text-[#004e34]'
                  : isCritical
                  ? 'bg-[#ffdad6] text-[#ba1a1a]'
                  : 'bg-[#f59e0b]/20 text-[#855300]'
              }`}>
                {hive.status}
              </span>
            </div>
            <div className="text-xs text-[#534434] mt-1 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-[#855300]">location_on</span>
                <span>{hive.location}</span>
              </span>
              <span>•</span>
              <span className="text-[#867461]">Gateway: LoRa-GW-WestBengal</span>
              <span>•</span>
              <span className="text-[#006c49] font-semibold">Online (99.4% Uptime)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {onToggleAnomaly && (
            <button
              onClick={() => onToggleAnomaly(hive.id)}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                hive.isSimulatedAbnormal
                  ? 'bg-[#ffdad6] text-[#ba1a1a] border-[#ffdad6]'
                  : 'bg-[#fff4e5] text-[#855300] border-[#f59e0b]/40 hover:bg-[#ffe7cc]'
              }`}
            >
              <span className="material-symbols-outlined text-sm align-middle mr-1">bolt</span>
              {hive.isSimulatedAbnormal ? 'Reset Anomaly' : 'Simulate Anomaly'}
            </button>
          )}

          <button
            onClick={handleHealthClick}
            className="px-4 py-2.5 bg-[#006c49] hover:bg-[#004e34] text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">health_and_safety</span>
            <span>AI Health Deep Dive</span>
          </button>

          {onOpenCreateBatch && (
            <button
              onClick={handleExtractClick}
              className="px-4 py-2.5 bg-[#855300] hover:bg-[#684000] text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Extract Batch</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Biometric Sensor Cards (5 Metric Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Internal Temperature */}
        <div className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-[11px] font-bold uppercase text-[#534434]">Brood Temp</span>
            <span className="material-symbols-outlined text-base text-[#d97706]">thermostat</span>
          </div>
          <div className="text-2xl font-black text-[#1f1b17]">{hive.internalTemp}°C</div>
          <div className="text-[10px] text-[#006c49] font-medium">Optimal (34.0°C – 36.0°C)</div>
        </div>

        {/* Humidity */}
        <div className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-[11px] font-bold uppercase text-[#534434]">Humidity</span>
            <span className="material-symbols-outlined text-base text-[#0284c7]">water_drop</span>
          </div>
          <div className="text-2xl font-black text-[#1f1b17]">{hive.humidity}%</div>
          <div className="text-[10px] text-[#534434] font-medium">Healthy (55% – 70%)</div>
        </div>

        {/* Hive Weight */}
        <div className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-[11px] font-bold uppercase text-[#534434]">Hive Weight</span>
            <span className="material-symbols-outlined text-base text-[#855300]">scale</span>
          </div>
          <div className="text-2xl font-black text-[#1f1b17]">{hive.weight} <span className="text-xs text-[#867461]">kg</span></div>
          <div className="text-[10px] text-[#006c49] font-bold">{hive.weightChange24h} in 24h</div>
        </div>

        {/* Connectivity */}
        <div className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-[11px] font-bold uppercase text-[#534434]">Connectivity</span>
            <span className="material-symbols-outlined text-base text-[#006c49]">sensors</span>
          </div>
          <div className="text-lg font-black text-[#006c49]">LoRaWAN</div>
          <div className="text-[10px] text-[#534434] font-medium">RSSI -68 dBm • 100% pkts</div>
        </div>

        {/* Battery & Solar */}
        <div className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm space-y-1 col-span-2 sm:col-span-1">
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-[11px] font-bold uppercase text-[#534434]">Solar / Battery</span>
            <span className="material-symbols-outlined text-base text-[#16a34a]">battery_charging_full</span>
          </div>
          <div className="text-2xl font-black text-[#1f1b17]">{hive.batteryLevel ?? 95}%</div>
          <div className="text-[10px] text-[#006c49] font-medium">+14.2V Solar Charging</div>
        </div>
      </div>

      {/* Sub Tabs: Sensor Trends vs Batches vs Inspection Notes */}
      <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-[#f0e6e0]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('sensors')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'sensors'
                  ? 'bg-[#1b4332] text-white shadow-sm'
                  : 'text-[#534434] hover:bg-[#f6ece6]'
              }`}
            >
              Sensor Telemetry Trends
            </button>
            <button
              onClick={() => setActiveTab('batches')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'batches'
                  ? 'bg-[#1b4332] text-white shadow-sm'
                  : 'text-[#534434] hover:bg-[#f6ece6]'
              }`}
            >
              Linked Batches ({hiveBatches.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-[#1b4332] text-white shadow-sm'
                  : 'text-[#534434] hover:bg-[#f6ece6]'
              }`}
            >
              Inspection Notes
            </button>
          </div>

          {activeTab === 'sensors' && (
            <div className="flex items-center gap-1.5 bg-[#f6ece6] p-1 rounded-xl text-xs font-bold">
              {(['24h', '7d', '30d'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-3 py-1 rounded-lg uppercase cursor-pointer ${
                    timeframe === t ? 'bg-white text-[#855300] font-extrabold shadow-sm' : 'text-[#534434]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {activeTab === 'sensors' ? (
          <div className="space-y-6">
            {/* Visual SVG Multi-graph */}
            <div className="h-64 w-full">
              <svg viewBox="0 0 700 200" className="w-full h-full">
                <line x1="0" y1="40" x2="700" y2="40" stroke="#f0e6e0" strokeDasharray="3 3" />
                <line x1="0" y1="90" x2="700" y2="90" stroke="#f0e6e0" strokeDasharray="3 3" />
                <line x1="0" y1="140" x2="700" y2="140" stroke="#f0e6e0" strokeDasharray="3 3" />
                <line x1="0" y1="180" x2="700" y2="180" stroke="#f0e6e0" />

                {/* Optimal zone highlight */}
                <rect x="0" y="70" width="700" height="40" fill="#adedd3" opacity="0.2" />

                {/* Temperature Line */}
                <path
                  d="M 0,85 C 100,80 200,90 350,85 C 500,82 600,88 700,86"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="3"
                />

                {/* Humidity Line */}
                <path
                  d="M 0,110 C 150,120 300,105 450,115 C 600,110 650,108 700,112"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />

                {/* Weight Trend Line */}
                <path
                  d="M 0,160 C 200,150 400,130 700,100"
                  fill="none"
                  stroke="#855300"
                  strokeWidth="3"
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#f0e6e0] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#d97706]" />
                <span className="font-bold text-[#1f1b17]">Brood Temp (34.8°C avg)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-[#0284c7]" />
                <span className="font-bold text-[#1f1b17]">Humidity (67% avg)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-[#855300]" />
                <span className="font-bold text-[#1f1b17]">Weight Accumulation (+0.4 kg/day)</span>
              </div>
            </div>
          </div>
        ) : activeTab === 'batches' ? (
          <div className="space-y-3">
            {hiveBatches.length > 0 ? (
              hiveBatches.map(b => (
                <div key={b.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/30 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#855300]">{b.batchCode}</span>
                      <span className="text-xs font-bold text-[#1f1b17]">{b.honeyType}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#adedd3] text-[#004e34] capitalize">
                        {b.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#534434] mt-1">
                      Quantity: {b.quantityKg} kg • Harvested: {b.harvestDate || b.extractedDate} • Moisture: {b.moisturePercentage}%
                    </div>
                  </div>

                  <div className="text-xs font-mono text-[#867461] bg-white px-2.5 py-1 rounded-lg border border-[#d8c3ad]/40">
                    Hash: {(b.blockchainHash || '0x49f2b901').substring(0, 14)}...
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[#867461]">
                No batches extracted from {hive.code} yet.
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-[#1f1b17]">Field Inspection Log</h3>
              <button
                onClick={() => setShowAddNoteModal(true)}
                className="px-3 py-1.5 bg-[#855300] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#684000]"
              >
                + Add Note
              </button>
            </div>

            {hive.notes ? (
              <div className="p-4 rounded-2xl bg-[#f6ece6] text-xs text-[#1f1b17] font-medium border border-[#d8c3ad]/40">
                <div className="text-[10px] font-bold text-[#867461] mb-1">Latest Note:</div>
                {hive.notes}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-[#867461]">
                No inspection notes recorded for {hive.code}.
              </div>
            )}

            {showAddNoteModal && (
              <form onSubmit={handleSaveNote} className="p-4 rounded-2xl border border-[#d8c3ad] bg-white space-y-3">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Record queen health, brood pattern, pest observations..."
                  className="w-full text-xs p-3 border border-[#d8c3ad] rounded-xl focus:outline-none focus:border-[#855300]"
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddNoteModal(false)}
                    className="px-3 py-1.5 text-xs text-[#534434] hover:bg-[#f6ece6] rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#1b4332] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#143225]"
                  >
                    Save Note
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
