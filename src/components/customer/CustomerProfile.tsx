import React, { useState } from 'react';
import { UserAccount, CustomerOrder } from '../../types';

interface CustomerProfileProps {
  user: UserAccount;
  orders: CustomerOrder[];
  onUpdateUser: (updated: Partial<UserAccount>) => void;
  onSwitchToBeekeeper: () => void;
}

export const CustomerProfile: React.FC<CustomerProfileProps> = ({
  user,
  orders,
  onUpdateUser,
  onSwitchToBeekeeper,
}) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ fullName, email });
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#d8c3ad]/30 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#855300]/40"
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#1f1b17]">{user.fullName}</h1>
            <p className="text-xs text-[#534434]">{user.email} • Honey Chain Enthusiast</p>
          </div>
        </div>

        <button
          onClick={onSwitchToBeekeeper}
          className="px-4 py-2.5 bg-[#1b4332] text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <span>🐝 Switch to Beekeeper Mode</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Edit Details */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-4">
          <h2 className="text-sm font-black text-[#1f1b17] pb-3 border-b border-[#f0e6e0]">
            Personal Information & Preferences
          </h2>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
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

            <div className="p-4 bg-[#f7fcf9] rounded-2xl border border-[#006c49]/20 text-xs space-y-1">
              <div className="font-bold text-[#004e34]">Traceability Verification Key</div>
              <p className="text-[#534434] text-[11px]">
                Your account is paired with cryptographic consumer identity #HC-CUST-8824. Every honey purchase automatically logs your ownership onto the blockchain.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              {savedMessage ? (
                <span className="text-xs font-bold text-[#006c49]">✓ Profile updated successfully!</span>
              ) : <div />}

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#855300] hover:bg-[#684000] text-white font-black rounded-xl shadow-md cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Right 1 Col: Quick Stats */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#534434] pb-2 border-b border-[#f0e6e0]">
            Activity Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-[#534434]">Orders Placed:</span>
              <span className="font-bold text-[#1f1b17]">{orders.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#534434]">Verified Honey Scanned:</span>
              <span className="font-bold text-[#006c49]">7 Jars</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#534434]">Direct Beekeeper Contribution:</span>
              <span className="font-bold text-[#855300]">₹1,980</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
