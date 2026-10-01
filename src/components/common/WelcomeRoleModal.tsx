import React from 'react';
import { AppMode } from '../../types';

interface WelcomeRoleModalProps {
  isOpen: boolean;
  onSelectRole: (role: AppMode) => void;
  onClose?: () => void;
  onOpenSignIn: () => void;
}

export const WelcomeRoleModal: React.FC<WelcomeRoleModalProps> = ({
  isOpen,
  onSelectRole,
  onClose,
  onOpenSignIn,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#d8c3ad]/40 relative overflow-hidden">
        {/* Background decorative honey pattern */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#fff3d6] rounded-full opacity-60 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#adedd3]/40 rounded-full opacity-60 pointer-events-none" />

        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#867461] hover:text-[#1f1b17] p-2 rounded-full hover:bg-[#f6ece6] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        )}

        <div className="text-center relative z-10 mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#f59e0b]/15 text-[#855300] mb-3 shadow-inner">
            <span className="material-symbols-outlined text-3xl">hive</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f1b17] tracking-tight">
            Welcome to Honey Chain
          </h2>
          <p className="text-sm text-[#534434] mt-1.5 max-w-md mx-auto">
            Choose how you want to use Honey Chain. Two distinct interfaces powered by a single shared blockchain and IoT network.
          </p>
          <div className="mt-2 text-xs font-semibold text-[#855300] tracking-wide uppercase">
            From Hive to Consumer, Every Drop Has a Story
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-10">
          {/* Beekeeper Card */}
          <div className="bg-[#fffbf7] hover:bg-[#fff7ed] border-2 border-[#f59e0b]/30 hover:border-[#f59e0b] rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-sm hover:shadow-md">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🐝
              </div>
              <h3 className="text-lg font-extrabold text-[#1f1b17]">I am a Beekeeper</h3>
              <p className="text-xs text-[#534434] mt-2 leading-relaxed">
                Monitor your hives with IoT sensors, use AI colony health & productivity predictions, manage honey batches on the blockchain, and sell directly to customers.
              </p>
            </div>

            <button
              onClick={() => onSelectRole('beekeeper')}
              className="mt-6 w-full py-3 px-4 bg-[#855300] hover:bg-[#684000] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer"
            >
              <span>Continue as Beekeeper</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Customer Card */}
          <div className="bg-[#f7fcf9] hover:bg-[#ecfdf5] border-2 border-[#2b6954]/30 hover:border-[#2b6954] rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-sm hover:shadow-md">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#2b6954]/15 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                👤
              </div>
              <h3 className="text-lg font-extrabold text-[#1f1b17]">I am a Customer</h3>
              <p className="text-xs text-[#534434] mt-2 leading-relaxed">
                Discover authentic single-origin honey, explore trusted beekeeper farms, verify harvest provenance via QR & blockchain, and buy directly from apiaries.
              </p>
            </div>

            <button
              onClick={() => onSelectRole('customer')}
              className="mt-6 w-full py-3 px-4 bg-[#2b6954] hover:bg-[#1e4a3b] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer"
            >
              <span>Continue as Customer</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center border-t border-[#f0e6e0] pt-4 relative z-10">
          <p className="text-xs text-[#867461]">
            Already have an account?{' '}
            <button
              onClick={onOpenSignIn}
              className="font-bold text-[#855300] hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
