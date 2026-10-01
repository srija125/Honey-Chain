import React, { useState } from 'react';
import { HiveTelemetry, BeekeeperTab, SmartBottle, LiveEventItem } from '../../types';

interface BeekeeperDashboardProps {
  hives?: HiveTelemetry[];
  batches?: any[];
  products?: any[];
  orders?: any[];
  bottles?: SmartBottle[];
  liveEvents?: LiveEventItem[];
  onSelectHive?: (id: string) => void;
  onSelectBatch?: (code: string) => void;
  onNavigate: (tab: BeekeeperTab) => void;
}

export const BeekeeperDashboard: React.FC<BeekeeperDashboardProps> = ({
  hives = [],
  batches = [],
  products = [],
  orders = [],
  bottles = [],
  liveEvents = [],
  onSelectHive,
  onSelectBatch,
  onNavigate,
}) => {
  const [timeRange, setTimeRange] = useState<'24H' | '7D' | '30D'>('7D');

  const safeHives = hives || [];
  const totalHives = safeHives.length;
  const healthyCount = safeHives.filter(h => h.status === 'healthy').length;
  const attentionCount = safeHives.filter(h => h.status === 'attention').length;
  const criticalCount = safeHives.filter(h => h.status === 'critical').length;

  const sealedBottlesCount = bottles.filter(b => b.cap_status === 'SEALED').length;
  const openedBottlesCount = bottles.filter(b => b.cap_status === 'OPENED').length;

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-200">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-[#fffbf7] to-[#fff4e5] p-6 rounded-3xl border border-[#f59e0b]/25 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐝</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1f1b17] tracking-tight">
              Good morning, Beekeeper 👋
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#534434] mt-1 font-medium">
            Monitor your apiary, manage your honey and grow your business.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('batches')}
            className="px-4 py-2.5 bg-[#855300] hover:bg-[#684000] text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>+ Create Batch</span>
          </button>
          <button
            onClick={() => onNavigate('my_products')}
            className="px-4 py-2.5 bg-white hover:bg-[#f6ece6] text-[#1f1b17] border border-[#d8c3ad] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">storefront</span>
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* 8 Prominent KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Hives */}
        <div 
          onClick={() => onNavigate('hives')}
          className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm hover:border-[#855300]/40 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#534434]">Total Hives</span>
            <span className="material-symbols-outlined text-lg text-[#855300] group-hover:scale-110 transition-transform">hive</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1f1b17] mt-2">{totalHives}</div>
          <div className="text-[11px] text-[#006c49] font-bold mt-1">100% telemetry online</div>
        </div>

        {/* Healthy Hives */}
        <div 
          onClick={() => onNavigate('hives')}
          className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm hover:border-[#006c49]/40 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#534434]">Healthy Hives</span>
            <span className="material-symbols-outlined text-lg text-[#006c49] group-hover:scale-110 transition-transform">check_circle</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#006c49] mt-2">{healthyCount}</div>
          <div className="text-[11px] text-[#534434] font-medium mt-1">Optimal brood temp</div>
        </div>

        {/* Attention Required */}
        <div 
          onClick={() => onNavigate('alerts')}
          className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm hover:border-[#f59e0b]/40 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#534434]">Attention Required</span>
            <span className="material-symbols-outlined text-lg text-[#f59e0b] group-hover:scale-110 transition-transform">warning</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#855300] mt-2">{attentionCount}</div>
          <div className="text-[11px] text-[#867461] font-medium mt-1">Humidity & heat drift</div>
        </div>

        {/* Critical Alerts */}
        <div 
          onClick={() => onNavigate('alerts')}
          className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm hover:border-[#ba1a1a]/40 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#534434]">Critical Alerts</span>
            <span className="material-symbols-outlined text-lg text-[#ba1a1a] group-hover:scale-110 transition-transform">error</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#ba1a1a] mt-2">{criticalCount}</div>
          <div className="text-[11px] text-[#ba1a1a] font-bold mt-1">Action required (HIVE-003)</div>
        </div>

        {/* Honey Stock */}
        <div 
          onClick={() => onNavigate('my_products')}
          className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm hover:border-[#855300]/40 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#534434]">Honey Stock</span>
            <span className="material-symbols-outlined text-lg text-[#855300] group-hover:scale-110 transition-transform">inventory_2</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1f1b17] mt-2">186 <span className="text-sm font-semibold text-[#867461]">kg</span></div>
          <div className="text-[11px] text-[#534434] font-medium mt-1">42 packaged batches</div>
        </div>

        {/* Monthly Sales */}
        <div 
          onClick={() => onNavigate('analytics')}
          className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm hover:border-[#006c49]/40 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#534434]">Monthly Sales</span>
            <span className="material-symbols-outlined text-lg text-[#006c49] group-hover:scale-110 transition-transform">payments</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1f1b17] mt-2">₹48,500</div>
          <div className="text-[11px] text-[#006c49] font-bold mt-1">+18.4% vs last month</div>
        </div>

        {/* Active Orders */}
        <div 
          onClick={() => onNavigate('orders')}
          className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm hover:border-[#f59e0b]/40 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#534434]">Active Orders</span>
            <span className="material-symbols-outlined text-lg text-[#f59e0b] group-hover:scale-110 transition-transform">local_shipping</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1f1b17] mt-2">14</div>
          <div className="text-[11px] text-[#855300] font-bold mt-1">3 dispatching today</div>
        </div>

        {/* Predicted Production */}
        <div 
          onClick={() => onNavigate('predictions')}
          className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm hover:border-[#2b6954]/40 transition-all cursor-pointer group"
        >
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#534434]">Predicted Yield</span>
            <span className="material-symbols-outlined text-lg text-[#2b6954] group-hover:scale-110 transition-transform">trending_up</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1f1b17] mt-2">128 <span className="text-sm font-semibold text-[#867461]">kg</span></div>
          <div className="text-[11px] text-[#006c49] font-bold mt-1">Next 30 Days (84% conf.)</div>
        </div>
      </div>

      {/* Smart Packaging & Tamper Detection Quick Strip */}
      <div 
        onClick={() => onNavigate('bottle_security')}
        className="bg-gradient-to-r from-[#1b4332] to-[#245842] text-white p-5 sm:p-6 rounded-3xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:brightness-105 transition-all"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#fcd34d] text-[#1b4332] flex items-center justify-center text-2xl font-black shadow-md">
            🍾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">Smart Bottle Security & Tamper Ledger</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#adedd3] text-[#004e34] uppercase">
                Dual NFC + QR
              </span>
            </div>
            <p className="text-xs text-white/80 mt-0.5">
              {sealedBottlesCount} bottles sealed • {openedBottlesCount} consumer unsealed • Cryptographic tamper tracking active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-black text-[#fcd34d]">
          <span>Inspect Digital Twins</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </div>
      </div>

      {/* Hive Health Overview Chart & AI Health Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2 border-b border-[#f0e6e0]">
            <div>
              <h2 className="text-base font-extrabold text-[#1f1b17]">Hive Health Overview</h2>
              <p className="text-xs text-[#534434]">
                Aggregated biometric correlation: Colony Health Score, Temperature, Humidity & Weight.
              </p>
            </div>

            {/* Time Filter Pills */}
            <div className="flex items-center gap-1.5 bg-[#f6ece6] p-1 rounded-xl text-xs font-bold">
              {(['24H', '7D', '30D'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    timeRange === range
                      ? 'bg-white text-[#855300] shadow-sm font-extrabold'
                      : 'text-[#534434] hover:text-[#1f1b17]'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Multi-Metric Telemetry Chart */}
          <div className="h-64 w-full relative pt-2">
            <svg viewBox="0 0 600 220" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#006c49" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#006c49" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="#f0e6e0" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="#f0e6e0" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#f0e6e0" strokeDasharray="4 4" />
              <line x1="0" y1="190" x2="600" y2="190" stroke="#f0e6e0" />

              {/* Health Score Area & Line */}
              <path
                d="M 0,90 Q 75,70 150,75 T 300,50 T 450,45 T 600,40 L 600,190 L 0,190 Z"
                fill="url(#healthGrad)"
              />
              <path
                d="M 0,90 Q 75,70 150,75 T 300,50 T 450,45 T 600,40"
                fill="none"
                stroke="#006c49"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Weight Curve */}
              <path
                d="M 0,140 Q 100,135 200,120 T 400,95 T 600,75"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="6 3"
              />

              {/* Temperature Curve (Brood Target ~35°C) */}
              <path
                d="M 0,110 Q 120,105 240,112 T 480,108 T 600,110"
                fill="none"
                stroke="#d97706"
                strokeWidth="2"
              />

              {/* Data points */}
              <circle cx="600" cy="40" r="5" fill="#006c49" stroke="#fff" strokeWidth="2" />
              <circle cx="600" cy="75" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
              <circle cx="600" cy="110" r="4" fill="#d97706" stroke="#fff" strokeWidth="2" />
            </svg>

            {/* X-Axis Labels */}
            <div className="flex justify-between text-[10px] font-bold text-[#867461] mt-2">
              <span>{timeRange === '24H' ? '00:00' : timeRange === '7D' ? 'Mon' : 'Week 1'}</span>
              <span>{timeRange === '24H' ? '06:00' : timeRange === '7D' ? 'Wed' : 'Week 2'}</span>
              <span>{timeRange === '24H' ? '12:00' : timeRange === '7D' ? 'Fri' : 'Week 3'}</span>
              <span>{timeRange === '24H' ? 'Now (Live)' : timeRange === '7D' ? 'Today' : 'Week 4 (Live)'}</span>
            </div>
          </div>

          {/* Chart Legends */}
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#f0e6e0] text-xs font-semibold text-[#534434]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#006c49]" />
              <span>Colony Health Score (87%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#f59e0b]" />
              <span>Hive Weight (+1.4% gain)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#d97706]" />
              <span>Internal Brood Temp (34.8°C)</span>
            </div>
          </div>
        </div>

        {/* AI Health Status Card (1 Col) */}
        <div className="bg-gradient-to-br from-[#f7fcf9] to-[#e8f7f0] rounded-3xl p-6 border border-[#006c49]/20 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#006c49]/15">
              <span className="text-xs font-bold uppercase tracking-wider text-[#006c49]">AI Health Status</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#adedd3] text-[#004e34]">
                LIVE AI INFERENCE
              </span>
            </div>

            <div className="text-center my-6">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-32 h-32">
                  <circle
                    className="text-[#d8c3ad]/30"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="52"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-[#006c49]"
                    strokeWidth="8"
                    strokeDasharray={326}
                    strokeDashoffset={326 - (326 * 87) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="52"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black text-[#1f1b17]">87%</span>
                  <span className="text-[10px] font-bold text-[#006c49] uppercase">Healthy</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 bg-white/80 rounded-2xl p-3.5 border border-[#006c49]/10 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#534434]">Colony Stability Risk</span>
                <span className="font-extrabold text-[#006c49]">Low Risk</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#534434]">Brood Thermal Regulation</span>
                <span className="font-extrabold text-[#006c49]">92% Optimal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#534434]">Nectar Intake Velocity</span>
                <span className="font-extrabold text-[#855300]">+1.4 kg / 24h</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('ai_health')}
            className="mt-5 w-full py-3 bg-[#006c49] hover:bg-[#004e34] text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Run Deep AI Analysis</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Hive Status Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-[#f0e6e0]">
          <div>
            <h2 className="text-base font-extrabold text-[#1f1b17]">Apiary Hive Status</h2>
            <p className="text-xs text-[#534434]">Live edge sensor data streamed every 2 minutes.</p>
          </div>
          <button
            onClick={() => onNavigate('hives')}
            className="text-xs font-bold text-[#855300] hover:underline flex items-center gap-1"
          >
            <span>View All {hives.length} Hives</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#f0e6e0] text-[#867461] font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3">Hive</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Temp</th>
                <th className="pb-3">Humidity</th>
                <th className="pb-3">Weight</th>
                <th className="pb-3">Health</th>
                <th className="pb-3">Risk</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0e6e0]">
              {hives.slice(0, 5).map((hive) => {
                const isHealthy = hive.status === 'healthy';
                const isCritical = hive.status === 'critical';

                return (
                  <tr key={hive.id} className="hover:bg-[#fff8f5] transition-colors">
                    <td className="py-3.5 font-extrabold text-[#1f1b17] flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        isHealthy ? 'bg-[#006c49]' : isCritical ? 'bg-[#ba1a1a] animate-ping' : 'bg-[#f59e0b]'
                      }`} />
                      <span>{hive.code}</span>
                    </td>
                    <td className="py-3.5 text-[#534434] font-medium">{hive.location}</td>
                    <td className="py-3.5 font-bold text-[#1f1b17]">{hive.internalTemp}°C</td>
                    <td className="py-3.5 text-[#534434] font-semibold">{hive.humidity}%</td>
                    <td className="py-3.5 text-[#1f1b17] font-bold">
                      {hive.weight} kg{' '}
                      <span className="text-[10px] text-[#006c49] font-normal">{hive.weightChange24h}</span>
                    </td>
                    <td className="py-3.5 font-extrabold text-[#006c49]">{hive.healthScore}%</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        isHealthy
                          ? 'bg-[#adedd3] text-[#004e34]'
                          : isCritical
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : 'bg-[#f59e0b]/20 text-[#855300]'
                      }`}>
                        {isCritical ? 'High' : isHealthy ? 'Low' : 'Moderate'}
                      </span>
                    </td>
                    <td className="py-3.5 text-right space-x-2">
                      <button
                        onClick={() => {
                          onSelectHive(hive.id);
                          onNavigate('hives');
                        }}
                        className="px-2.5 py-1 text-[11px] font-bold bg-[#f6ece6] hover:bg-[#ebd9cb] text-[#1f1b17] rounded-lg transition-colors cursor-pointer"
                      >
                        View Hive
                      </button>
                      <button
                        onClick={() => {
                          onSelectHive(hive.id);
                          onNavigate('ai_health');
                        }}
                        className="px-2.5 py-1 text-[11px] font-bold bg-[#006c49] hover:bg-[#004e34] text-white rounded-lg transition-colors cursor-pointer"
                      >
                        AI Analysis
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
