import React, { useState } from 'react';
import { ApiaryAlert, HiveTelemetry } from '../../types';

interface BeekeeperAlertsProps {
  alerts?: ApiaryAlert[];
  hives?: HiveTelemetry[];
  onAcknowledge?: (id: string) => void;
  onResolve?: (id: string) => void;
  onNavigateToHive?: (hiveId: string) => void;
  onSelectHive?: (hiveId: string) => void;
  onToggleAnomaly?: (hiveId: string) => void;
}

export const BeekeeperAlerts: React.FC<BeekeeperAlertsProps> = ({
  alerts: initialAlerts,
  hives = [],
  onAcknowledge,
  onResolve,
  onNavigateToHive,
  onSelectHive,
  onToggleAnomaly,
}) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [acknowledgedMap, setAcknowledgedMap] = useState<Record<string, boolean>>({});
  const [resolvedMap, setResolvedMap] = useState<Record<string, boolean>>({});

  const safeHives = hives || [];

  // Generate alerts dynamically from hives if not provided
  const derivedAlerts: ApiaryAlert[] = initialAlerts || [
    ...safeHives
      .filter(h => h.status === 'critical' || h.isSimulatedAbnormal || (h.internalTemp && h.internalTemp > 38) || (h.humidity && h.humidity > 70))
      .map(h => ({
        id: `alert-${h.id}-crit`,
        hiveId: h.id,
        hiveCode: h.code,
        hiveLocation: h.location,
        severity: 'critical' as const,
        title: h.abnormalConditionName || 'Thermal Stress & Critical Anomaly',
        message: `Internal temperature at ${h.internalTemp}°C (normal: 34-36°C) and relative humidity at ${h.humidity}%. Immediate brood inspection recommended.`,
        timestamp: '10 mins ago',
      })),
    ...safeHives
      .filter(h => h.status === 'attention' && !h.isSimulatedAbnormal)
      .map(h => ({
        id: `alert-${h.id}-att`,
        hiveId: h.id,
        hiveCode: h.code,
        hiveLocation: h.location,
        severity: 'warning' as const,
        title: 'Weight Plateau & Hive Influx Slowdown',
        message: `Brood chamber weight delta is +0.1 kg over 48h. Possible nectar dearth or pre-swarming aggregation.`,
        timestamp: '1 hour ago',
      })),
    {
      id: 'alert-sys-1',
      hiveId: safeHives[0]?.id || 'hive-1',
      hiveCode: safeHives[0]?.code || 'HIVE-001',
      hiveLocation: safeHives[0]?.location || 'Sundarbans, Cluster A',
      severity: 'info',
      title: 'LoRaWAN Gateway Signal Optimization',
      message: 'Apiary telemetry mesh connection re-anchored on 868MHz band. Signal SNR +12dB.',
      timestamp: '3 hours ago',
    },
  ];

  const handleAck = (id: string) => {
    setAcknowledgedMap(prev => ({ ...prev, [id]: true }));
    if (onAcknowledge) onAcknowledge(id);
  };

  const handleRes = (id: string, hiveId: string) => {
    setResolvedMap(prev => ({ ...prev, [id]: true }));
    if (onResolve) onResolve(id);
    if (onToggleAnomaly) onToggleAnomaly(hiveId);
  };

  const handleNav = (hiveId: string) => {
    if (onNavigateToHive) onNavigateToHive(hiveId);
    if (onSelectHive) onSelectHive(hiveId);
  };

  const filteredAlerts = derivedAlerts
    .filter(a => !resolvedMap[a.id])
    .filter(a => filter === 'all' || a.severity === filter);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Alerts Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#d8c3ad]/30 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-[#1f1b17]">Apiary Telemetry Alerts</h1>
          <p className="text-xs text-[#534434] mt-1 font-medium">
            Real-time threshold anomalies and biometric warnings flagged across IoT nodes.
          </p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-[#f6ece6] p-1 rounded-xl text-xs font-bold">
          {(['all', 'critical', 'warning', 'info'] as const).map(sev => (
            <button
              key={sev}
              onClick={() => setFilter(sev)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                filter === sev
                  ? 'bg-white text-[#1f1b17] shadow-sm font-extrabold'
                  : 'text-[#534434] hover:text-[#1f1b17]'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map(alert => {
            const isCrit = alert.severity === 'critical';
            const isWarn = alert.severity === 'warning';
            const isAck = alert.acknowledged || acknowledgedMap[alert.id];

            return (
              <div
                key={alert.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm ${
                  isCrit
                    ? 'bg-[#fff5f5] border-[#ffdad6]'
                    : isWarn
                    ? 'bg-[#fffbf7] border-[#f59e0b]/30'
                    : 'bg-white border-[#d8c3ad]/40'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-2.5 rounded-xl text-xl shrink-0 ${
                      isCrit
                        ? 'bg-[#ba1a1a] text-white'
                        : isWarn
                        ? 'bg-[#f59e0b] text-[#1f1b17]'
                        : 'bg-[#2b6954] text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {isCrit ? 'error' : isWarn ? 'warning' : 'info'}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#1f1b17]">{alert.hiveCode}</span>
                      <span className="text-[10px] text-[#867461]">({alert.hiveLocation})</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          isCrit
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : isWarn
                            ? 'bg-[#fcd34d] text-[#855300]'
                            : 'bg-[#adedd3] text-[#004e34]'
                        }`}
                      >
                        {alert.severity}
                      </span>
                      {isAck && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#e5e7eb] text-[#374151]">
                          Acknowledged
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-[#1f1b17] mt-1">{alert.title}</div>
                    <div className="text-xs text-[#534434] mt-0.5 leading-relaxed">{alert.message}</div>
                    <div className="text-[10px] text-[#867461] mt-1 font-mono">{alert.timestamp}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => handleNav(alert.hiveId)}
                    className="px-3 py-1.5 bg-[#f6ece6] hover:bg-[#ebdcd3] text-[#534434] text-xs font-bold rounded-xl cursor-pointer"
                  >
                    View Hive
                  </button>

                  {!isAck && (
                    <button
                      onClick={() => handleAck(alert.id)}
                      className="px-3 py-1.5 bg-[#855300] hover:bg-[#684000] text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Acknowledge
                    </button>
                  )}

                  {isCrit && (
                    <button
                      onClick={() => handleRes(alert.id, alert.hiveId)}
                      className="px-3 py-1.5 bg-[#006c49] hover:bg-[#005237] text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Resolve Anomaly
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#d8c3ad]/30">
            <span className="material-symbols-outlined text-4xl text-[#006c49]">check_circle</span>
            <h3 className="text-sm font-bold text-[#1f1b17] mt-2">All Clear</h3>
            <p className="text-xs text-[#534434] mt-1">
              No unresolved alerts found for the selected filter category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
