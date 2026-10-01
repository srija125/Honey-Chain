import React, { useState } from 'react';
import { HiveTelemetry } from '../../types';

interface BeekeeperPredictionsProps {
  hives: HiveTelemetry[];
  selectedHiveId: string;
  onSelectHive: (id: string) => void;
}

export const BeekeeperPredictions: React.FC<BeekeeperPredictionsProps> = ({
  hives,
  selectedHiveId,
  onSelectHive,
}) => {
  const hive = hives.find(h => h.id === selectedHiveId) || hives[0];
  const [forageFactor, setForageFactor] = useState(85);
  const [weatherCondition, setWeatherCondition] = useState<'optimal' | 'moderate' | 'unfavorable'>('optimal');

  const baseYield = 4.8;
  const multiplier = weatherCondition === 'optimal' ? 1.0 : weatherCondition === 'moderate' ? 0.85 : 0.65;
  const simulatedYield = (baseYield * (forageFactor / 85) * multiplier).toFixed(1);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#2b6954] to-[#1b4332] text-white p-6 rounded-3xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#fcd34d] text-[#1b4332] uppercase tracking-wider">
              Gemini Harvest Intelligence
            </span>
            <span className="text-xs text-[#95d3ba] font-semibold">Model: HC-Productivity-v3</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1.5">
            AI Honey Productivity Prediction — {hive.code}
          </h1>
          <p className="text-xs text-white/80 mt-1 max-w-xl">
            Forecast future nectar and honey yield using weight accumulation curves, local blossom schedules, satellite forage data, and weather forecasts.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center shrink-0">
          <div className="text-[10px] font-extrabold uppercase text-[#fcd34d]">Estimated 30-Day Yield</div>
          <div className="text-3xl font-black text-white mt-0.5">{simulatedYield} <span className="text-sm font-semibold">kg</span></div>
          <div className="text-[10px] text-[#95d3ba] font-bold">84% Confidence Interval</div>
        </div>
      </div>

      {/* Hive Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {hives.map(h => (
          <button
            key={h.id}
            onClick={() => onSelectHive(h.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              h.id === hive.id
                ? 'bg-[#1b4332] text-white shadow-sm'
                : 'bg-white text-[#534434] border border-[#d8c3ad]/40 hover:bg-[#f6ece6]'
            }`}
          >
            {h.code} (Pred: 4.8 kg)
          </button>
        ))}
      </div>

      {/* Predictive Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Historical vs Predicted Yield Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#f0e6e0]">
            <div>
              <h2 className="text-base font-extrabold text-[#1f1b17]">Yield Trajectory & Harvest Window</h2>
              <p className="text-xs text-[#534434]">Historical production vs 30-day AI forecasted accumulation.</p>
            </div>
            <span className="text-xs font-bold text-[#006c49] bg-[#adedd3]/50 px-2.5 py-1 rounded-lg">
              Optimal Harvest: Oct 12 – Oct 18
            </span>
          </div>

          <div className="h-64 w-full relative pt-2">
            <svg viewBox="0 0 600 200" className="w-full h-full">
              <line x1="0" y1="40" x2="600" y2="40" stroke="#f0e6e0" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="#f0e6e0" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#f0e6e0" strokeDasharray="4 4" />
              <line x1="0" y1="180" x2="600" y2="180" stroke="#f0e6e0" />

              {/* Harvest threshold zone */}
              <rect x="380" y="30" width="180" height="150" fill="#fcd34d" opacity="0.15" />
              <text x="470" y="45" textAnchor="middle" fill="#855300" fontSize="10" fontWeight="bold">
                RECOMMENDED HARVEST WINDOW
              </text>

              {/* Historical curve */}
              <path
                d="M 0,160 Q 100,150 200,130 T 320,105"
                fill="none"
                stroke="#1b4332"
                strokeWidth="3"
              />

              {/* Forecasted curve (dashed) */}
              <path
                d="M 320,105 Q 420,80 500,55 T 600,45"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeDasharray="6 4"
              />

              {/* Marker for Current Day */}
              <line x1="320" y1="20" x2="320" y2="180" stroke="#ba1a1a" strokeDasharray="2 2" />
              <text x="320" y="195" textAnchor="middle" fill="#ba1a1a" fontSize="10" fontWeight="bold">
                Today
              </text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#f0e6e0] text-xs font-semibold text-[#534434]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#1b4332]" />
              <span>Historical Sensor Weight (Aug – Sep)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#f59e0b] border-b border-dashed" />
              <span>AI Predicted Accumulation (+4.8 kg)</span>
            </div>
          </div>
        </div>

        {/* Predictive Factors & Scenario Simulator (1 Col) */}
        <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#534434] pb-2 border-b border-[#f0e6e0]">
              Productivity Factor Weights
            </h3>

            <div className="space-y-3.5 mt-3 text-xs">
              <div>
                <div className="flex justify-between font-bold text-[#1f1b17]">
                  <span>Weight Velocity Trend</span>
                  <span className="text-[#006c49]">35% impact</span>
                </div>
                <div className="w-full h-1.5 bg-[#f6ece6] rounded-full mt-1">
                  <div className="h-full bg-[#006c49] rounded-full w-[88%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[#1f1b17]">
                  <span>Seasonal Blossom Availability</span>
                  <span className="text-[#855300]">25% impact</span>
                </div>
                <div className="w-full h-1.5 bg-[#f6ece6] rounded-full mt-1">
                  <div className="h-full bg-[#855300] rounded-full w-[78%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[#1f1b17]">
                  <span>Weather Forecast & Humidity</span>
                  <span className="text-[#0284c7]">20% impact</span>
                </div>
                <div className="w-full h-1.5 bg-[#f6ece6] rounded-full mt-1">
                  <div className="h-full bg-[#0284c7] rounded-full w-[82%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[#1f1b17]">
                  <span>Historical Apiary Peak Cycles</span>
                  <span className="text-[#534434]">20% impact</span>
                </div>
                <div className="w-full h-1.5 bg-[#f6ece6] rounded-full mt-1">
                  <div className="h-full bg-[#534434] rounded-full w-[90%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Scenario Slider Simulator */}
          <div className="bg-[#fffbf7] p-4 rounded-2xl border border-[#f59e0b]/30 space-y-3">
            <div className="text-xs font-black text-[#855300]">⚡ Scenario Simulator</div>
            
            <div>
              <div className="flex justify-between text-[11px] font-bold text-[#534434]">
                <span>Floral Nectar Index:</span>
                <span>{forageFactor}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={forageFactor}
                onChange={(e) => setForageFactor(Number(e.target.value))}
                className="w-full accent-[#855300] mt-1"
              />
            </div>

            <div>
              <div className="text-[11px] font-bold text-[#534434] mb-1">Weather Pattern:</div>
              <div className="grid grid-cols-3 gap-1 text-[10px] font-bold text-center">
                {(['optimal', 'moderate', 'unfavorable'] as const).map(w => (
                  <button
                    key={w}
                    onClick={() => setWeatherCondition(w)}
                    className={`py-1 rounded-lg capitalize transition-all ${
                      weatherCondition === w
                        ? 'bg-[#855300] text-white'
                        : 'bg-white text-[#534434] border border-[#d8c3ad]/50'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
