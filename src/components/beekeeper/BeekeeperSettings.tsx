import React, { useState } from 'react';
import { UserAccount } from '../../types';

interface BeekeeperSettingsProps {
  user: UserAccount;
  onUpdateProfile: (updated: Partial<UserAccount>) => void;
}

export const BeekeeperSettings: React.FC<BeekeeperSettingsProps> = ({
  user,
  onUpdateProfile,
}) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [apiaryCluster, setApiaryCluster] = useState(user.apiaryCluster || 'Sundarban Apiary Cluster A');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ fullName, email, apiaryCluster });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="bg-white p-6 rounded-3xl border border-[#d8c3ad]/30 shadow-sm">
        <h1 className="text-2xl font-black text-[#1f1b17]">Apiary & Gateway Settings</h1>
        <p className="text-xs text-[#534434] mt-1 font-medium">
          Configure apiary location, IoT gateway sync frequency, and notification preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
          <h2 className="text-sm font-black text-[#1f1b17] pb-2 border-b border-[#f0e6e0]">
            Beekeeper Profile & Farm Coordinates
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#534434] mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#534434] mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#534434] mb-1">Apiary Location / Cluster</label>
              <input
                type="text"
                value={apiaryCluster}
                onChange={(e) => setApiaryCluster(e.target.value)}
                className="w-full p-2.5 bg-[#f6ece6] rounded-xl font-bold text-[#1f1b17] outline-none"
              />
            </div>

            <div className="p-4 bg-[#f7fcf9] rounded-2xl border border-[#006c49]/20 space-y-2">
              <div className="font-bold text-[#004e34]">IoT Telemetry Gateway</div>
              <div className="text-[11px] text-[#534434] space-y-1">
                <div><strong>Protocol:</strong> LoRaWAN 865-867 MHz (India Band)</div>
                <div><strong>Gateway ID:</strong> GW-WB-SUNDARBAN-01</div>
                <div><strong>Sync Interval:</strong> Every 120 seconds</div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              {saved ? (
                <span className="text-xs font-bold text-[#006c49]">✓ Settings successfully updated!</span>
              ) : <div />}

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#855300] hover:bg-[#684000] text-white font-extrabold rounded-xl shadow-md cursor-pointer"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#534434] pb-2 border-b border-[#f0e6e0]">
            Apiary Node Health
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-[#534434]">Connected ESP32 Nodes:</span>
              <span className="font-bold text-[#1f1b17]">12 / 12 Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#534434]">Firmware Version:</span>
              <span className="font-mono text-[#855300] font-bold">v2.4.1-ota</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#534434]">Ledger Sync State:</span>
              <span className="font-bold text-[#006c49]">In Sync (Block #89,412)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
