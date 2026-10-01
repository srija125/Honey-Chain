import React from 'react';
import { BeekeeperTab, UserAccount } from '../../types';

interface BeekeeperSidebarProps {
  currentTab: BeekeeperTab;
  onSelectTab: (tab: BeekeeperTab) => void;
  user: UserAccount;
  criticalAlertCount?: number;
  alertsCount?: number;
  activeOrdersCount?: number;
  onSwitchToCustomer?: () => void;
  onOpenAuth?: () => void;
  onOpenSettings?: () => void;
}

export const BeekeeperSidebar: React.FC<BeekeeperSidebarProps> = ({
  currentTab,
  onSelectTab,
  user,
  criticalAlertCount,
  alertsCount,
  activeOrdersCount,
  onSwitchToCustomer,
  onOpenAuth,
  onOpenSettings,
}) => {
  const alertBadgeCount = criticalAlertCount ?? alertsCount ?? 2;

  const navItems: { id: BeekeeperTab; label: string; icon: string; badge?: number; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
    { id: 'hives', label: 'My Hives', icon: 'hive' },
    { id: 'ai_health', label: 'AI Health', icon: 'health_and_safety' },
    { id: 'predictions', label: 'Predictions', icon: 'query_stats' },
    { id: 'alerts', label: 'Alerts', icon: 'notification_important', badge: alertBadgeCount, badgeColor: 'bg-[#ba1a1a]' },
    { id: 'batches', label: 'Honey Batches', icon: 'layers' },
    { id: 'traceability', label: 'Traceability', icon: 'account_tree' },
    { id: 'bottle_security', label: 'Bottle Security', icon: 'shield_lock' },
    { id: 'my_products', label: 'My Products', icon: 'storefront' },
    { id: 'orders', label: 'Orders', icon: 'receipt_long', badge: activeOrdersCount, badgeColor: 'bg-[#f59e0b] text-[#1f1b17]' },
    { id: 'marketplace_performance', label: 'Marketplace', icon: 'store' },
    { id: 'qr_generator', label: 'QR Generator', icon: 'qr_code_2' },
    { id: 'analytics', label: 'Analytics', icon: 'monitoring' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <aside 
      id="beekeeper-desktop-sidebar"
      className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-[260px] bg-[#1b4332] text-white shadow-xl z-40 overflow-hidden select-none"
      style={{ height: '100vh', position: 'fixed', overflow: 'hidden' }}
    >
      {/* Fixed Header */}
      <div className="shrink-0 p-5 pb-3 bg-[#1b4332]">
        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-[#f59e0b] flex items-center justify-center shrink-0 shadow-md">
            <span className="material-symbols-outlined text-[#1b4332] text-2xl font-black">hive</span>
          </div>
          <div className="flex flex-col">
            <div className="font-black text-lg text-[#fcd34d] tracking-tight leading-tight">
              Honey Chain
            </div>
            <div className="text-[11px] text-[#95d3ba] font-bold uppercase tracking-wider">
              BEEKEEPER PORTAL
            </div>
          </div>
        </div>

        {/* Mode Switcher Button */}
        {onSwitchToCustomer && (
          <button
            onClick={onSwitchToCustomer}
            className="w-full py-2 px-3 bg-[#f59e0b]/20 hover:bg-[#f59e0b]/30 text-[#fcd34d] border border-[#f59e0b]/40 rounded-xl text-xs font-bold flex items-center justify-between transition-all group shadow-sm cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">shopping_bag</span>
              <span>Customer View</span>
            </span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
          </button>
        )}
      </div>

      {/* Scrollable Navigation Area */}
      <nav 
        className="flex-1 min-h-0 overflow-y-auto px-5 py-2 space-y-1 sidebar-scrollbar"
        style={{ overflowY: 'auto' }}
      >
        {navItems.map((item) => {
          const isActive = currentTab === item.id || (item.id === 'hives' && currentTab === 'hive_details') || (item.id === 'marketplace_performance' && currentTab === 'performance');
          return (
            <button
              key={item.id}
              id={`beekeeper-nav-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left group cursor-pointer ${
                isActive
                  ? 'bg-white/15 text-white font-bold shadow-inner border-l-4 border-[#f59e0b]'
                  : 'text-white/75 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span 
                  className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 shrink-0 ${
                    isActive ? 'text-[#fcd34d]' : 'text-white/70'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && item.badge > 0 ? (
                <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full shadow-sm shrink-0 ${item.badgeColor || 'bg-white text-[#1b4332]'}`}>
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}

        {/* Bottom padding buffer inside scroll container so final items are fully clear */}
        <div className="h-6 shrink-0" aria-hidden="true" />
      </nav>

      {/* Fixed Profile Footer */}
      <div className="shrink-0 p-5 pt-3 border-t border-white/10 bg-[#1b4332]">
        <div 
          onClick={() => {
            if (onOpenAuth) onOpenAuth();
            else if (onOpenSettings) onOpenSettings();
            else onSelectTab('settings');
          }}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-black/20 hover:bg-black/30 cursor-pointer transition-colors border border-white/10"
        >
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            className="w-8 h-8 rounded-full object-cover border border-[#f59e0b]/60 shrink-0"
          />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-bold text-white truncate">{user.fullName || 'Rajesh Mondal'}</span>
            <span className="text-[10px] text-[#95d3ba] font-medium truncate">{user.apiaryCluster || 'Sundarban Mangrove Cluster'}</span>
          </div>
          <span className="material-symbols-outlined text-white/50 text-xs shrink-0">tune</span>
        </div>
      </div>
    </aside>
  );
};
