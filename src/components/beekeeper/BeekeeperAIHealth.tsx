import React, { useState } from 'react';
import { HiveTelemetry } from '../../types';

interface BeekeeperAIHealthProps {
  hives: HiveTelemetry[];
  selectedHiveId: string;
  onSelectHive: (id: string) => void;
  onInspectHive?: (hiveId: string) => void;
}

export const BeekeeperAIHealth: React.FC<BeekeeperAIHealthProps> = ({
  hives,
  selectedHiveId,
  onSelectHive,
  onInspectHive,
}) => {
  const [isAbnormalSimulated, setIsAbnormalSimulated] = useState(false);
  const hive = hives.find(h => h.id === selectedHiveId) || hives[0];

  // Dynamic values depending on simulation toggle
  const currentHealthScore = isAbnormalSimulated ? 43 : 87;
  const currentStatus = isAbnormalSimulated ? 'Attention Required' : 'Healthy';
  const currentRisk = isAbnormalSimulated ? 'High Risk' : 'Low Risk';
  const currentTemp = isAbnormalSimulated ? 40.2 : 34.8;
  const currentHumidity = isAbnormalSimulated ? 84 : 67;
  const currentWeight = isAbnormalSimulated ? 30.9 : 32.8;

  const aiFactors = [
    { label: 'Temperature Stability', score: isAbnormalSimulated ? 41 : 92, note: isAbnormalSimulated ? '+5.4°C above baseline' : 'Optimal brood zone' },
    { label: 'Humidity Stability', score: isAbnormalSimulated ? 48 : 84, note: isAbnormalSimulated ? 'Excess condensation detected' : 'Within normal margin' },
    { label: 'Weight Trend', score: isAbnormalSimulated ? 35 : 89, note: isAbnormalSimulated ? '-1.9 kg anomaly drop' : '+0.4 kg steady daily gain' },
    { label: 'Environmental Consistency', score: isAbnormalSimulated ? 55 : 83, note: 'Sundarbans microclimate' },
    { label: 'Historical Pattern Match', score: isAbnormalSimulated ? 39 : 91, note: isAbnormalSimulated ? 'Deviates from 90-day model' : 'Matches seasonal peak' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner with Simulation Controls */}
      <div className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white p-6 rounded-3xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#fcd34d] text-[#1b4332] uppercase tracking-wider">
              Gemini Edge AI Model
            </span>
            <span className="text-xs text-[#95d3ba] font-semibold">Model: HC-BioPredict-v2</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1.5">
            AI Colony Health Analysis — {hive.code}
          </h1>
          <p className="text-xs text-white/80 mt-1 max-w-xl">
            Real-time biometric inference engine continuously evaluating thermal regulation, acoustic frequencies, and nectar weight velocities.
          </p>
        </div>

        {/* Demo Simulation Toggle */}
        <div className="flex flex-col items-end gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setIsAbnormalSimulated(!isAbnormalSimulated)}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
              isAbnormalSimulated
                ? 'bg-[#ba1a1a] hover:bg-[#93000a] text-white ring-4 ring-[#ffdad6]/40'
                : 'bg-[#f59e0b] hover:bg-[#d97706] text-[#1f1b17]'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {isAbnormalSimulated ? 'crisis_alert' : 'science'}
            </span>
            <span>
              {isAbnormalSimulated ? 'Reset to Healthy State' : 'Simulate Abnormal Condition'}
            </span>
          </button>
          <span className="text-[10px] text-white/60">
            Interactive demo control for testing anomaly detection
          </span>
        </div>
      </div>

      {/* Main AI Diagnostics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Circular AI Score Gauge & Diagnosis */}
        <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm flex flex-col justify-between space-y-6">
          <div className="text-center">
            <div className="text-xs font-bold text-[#867461] uppercase tracking-wider">
              Colony Health Score
            </div>

            {/* Circular Gauge */}
            <div className="relative inline-flex items-center justify-center my-6">
              <svg className="w-44 h-44">
                <circle
                  className="text-[#f6ece6]"
                  strokeWidth="12"
                  stroke="currentColor"
                  fill="transparent"
                  r="70"
                  cx="88"
                  cy="88"
                />
                <circle
                  className={isAbnormalSimulated ? 'text-[#ba1a1a]' : 'text-[#006c49]'}
                  strokeWidth="12"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * currentHealthScore) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="70"
                  cx="88"
                  cy="88"
                  style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-[#1f1b17]">{currentHealthScore}</span>
                <span className="text-xs text-[#867461] font-bold">/ 100</span>
              </div>
            </div>

            {/* Status & Risk Chips */}
            <div className="flex items-center justify-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                isAbnormalSimulated
                  ? 'bg-[#ffdad6] text-[#ba1a1a]'
                  : 'bg-[#adedd3] text-[#004e34]'
              }`}>
                {currentStatus}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                isAbnormalSimulated
                  ? 'bg-[#ba1a1a] text-white'
                  : 'bg-[#f6ece6] text-[#534434]'
              }`}>
                Risk: {currentRisk}
              </span>
            </div>
          </div>

          {/* Quick Realtime Biometric Snapshot */}
          <div className="bg-[#fffbf7] rounded-2xl p-4 border border-[#f59e0b]/20 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-[#534434]">Internal Temperature:</span>
              <span className={`font-black ${isAbnormalSimulated ? 'text-[#ba1a1a]' : 'text-[#1f1b17]'}`}>
                {currentTemp}°C {isAbnormalSimulated && '⚠️ High'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#534434]">Chamber Humidity:</span>
              <span className={`font-black ${isAbnormalSimulated ? 'text-[#ba1a1a]' : 'text-[#1f1b17]'}`}>
                {currentHumidity}% {isAbnormalSimulated && '⚠️ High'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#534434]">Hive Gross Weight:</span>
              <span className={`font-black ${isAbnormalSimulated ? 'text-[#ba1a1a]' : 'text-[#1f1b17]'}`}>
                {currentWeight} kg {isAbnormalSimulated && '⚠️ Drop'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: AI Factor Breakdown & Smart Insights (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Insight Box */}
          <div className={`p-6 rounded-3xl border shadow-sm ${
            isAbnormalSimulated
              ? 'bg-[#fff5f5] border-[#ffdad6]'
              : 'bg-[#f7fcf9] border-[#006c49]/20'
          }`}>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="material-symbols-outlined text-2xl text-[#855300]">
                {isAbnormalSimulated ? 'warning' : 'psychology'}
              </span>
              <h2 className="text-base font-extrabold text-[#1f1b17]">
                {isAbnormalSimulated ? 'Abnormal Hive Pattern Detected' : 'AI Health Assessment'}
              </h2>
            </div>

            {isAbnormalSimulated ? (
              <div className="space-y-3">
                <p className="text-xs text-[#534434] leading-relaxed">
                  The AI model detected anomalous deviations from expected baseline parameters across multiple telemetry streams:
                </p>
                <ul className="text-xs space-y-1.5 font-medium text-[#ba1a1a] list-disc list-inside bg-white p-3.5 rounded-xl border border-[#ffdad6]">
                  <li>Temperature (+40.2°C) is substantially above the recent historical baseline.</li>
                  <li>Chamber humidity elevated to 84%, indicating poor ventilation or moisture accumulation.</li>
                  <li>Gross hive weight decreased by 1.9 kg over the last 18 hours (possible swarming or robbing).</li>
                  <li>Pattern differs sharply from historical behavior models for Sundarbans apiaries.</li>
                </ul>
                <div className="text-xs font-bold text-[#855300] bg-[#fff3d6] p-2.5 rounded-xl">
                  ⚠️ <strong>Possible colony-health issue:</strong> Physical apiary inspection is recommended immediately.
                </div>
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => onInspectHive && onInspectHive(hive.id)}
                    className="px-5 py-2.5 bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">assignment_turned_in</span>
                    <span>Inspect Hive Now</span>
                  </button>
                  <button
                    onClick={() => setIsAbnormalSimulated(false)}
                    className="px-4 py-2.5 bg-white text-[#534434] border border-[#d8c3ad] hover:bg-[#f6ece6] text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Dismiss Anomaly Test
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-[#534434] leading-relaxed">
                  The current sensor pattern is consistent with the hive's recent healthy behavior. Brood thermal regulation is steady at 34.8°C with strong nectar intake velocity.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="bg-white p-3 rounded-xl border border-[#006c49]/15">
                    <span className="text-[11px] text-[#867461] block font-bold">Queen Laying Rhythm</span>
                    <span className="font-extrabold text-[#006c49]">Optimal (Estimated 1,800 eggs/day)</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#006c49]/15">
                    <span className="text-[11px] text-[#867461] block font-bold">Swarm Probability</span>
                    <span className="font-extrabold text-[#006c49]">Very Low (&lt; 4%)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 5 AI Metric Breakdown Progress Bars */}
          <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#534434]">
              Multivariate AI Feature Contributions
            </h3>

            <div className="space-y-4">
              {aiFactors.map((factor, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#1f1b17]">{factor.label}</span>
                    <span className="text-[11px] text-[#867461] font-medium">{factor.note}</span>
                    <span className={`font-black ${factor.score < 60 ? 'text-[#ba1a1a]' : 'text-[#006c49]'}`}>
                      {factor.score}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-[#f6ece6] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        factor.score < 60 ? 'bg-[#ba1a1a]' : 'bg-[#006c49]'
                      }`}
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
