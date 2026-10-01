import React, { useState } from 'react';
import { BeekeeperTab, UserAccount, HiveTelemetry, HoneyBatch } from '../../types';
import { DemoModeBadge } from '../common/DemoModeBadge';

interface BeekeeperTopBarProps {
  currentTab: BeekeeperTab;
  onSelectTab?: (tab: BeekeeperTab) => void;
  user: UserAccount;
  hives?: HiveTelemetry[];
  batches?: HoneyBatch[];
  onOpenAuth?: () => void;
  onOpenSettings?: () => void;
  onSwitchToCustomer?: () => void;
  onSelectHive?: (id: string) => void;
  onSelectBatch?: (code: string) => void;
  onOpenDemoControls?: () => void;
  unreadTamperCount?: number;
}

export const BeekeeperTopBar: React.FC<BeekeeperTopBarProps> = ({
  currentTab,
  onSelectTab,
  user,
  hives = [],
  batches = [],
  onOpenAuth,
  onOpenSettings,
  onSwitchToCustomer,
  onSelectHive,
  onSelectBatch,
  onOpenDemoControls,
  unreadTamperCount = 0,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: BeekeeperTab) => {
    if (onSelectTab) onSelectTab(tab);
    else if (tab === 'settings' && onOpenSettings) onOpenSettings();
  };

  const handleProfileClick = () => {
    if (onOpenAuth) onOpenAuth();
    else if (onOpenSettings) onOpenSettings();
    else handleTabChange('settings');
  };

  const safeHives = hives || [];
  const safeBatches = batches || [];

  const criticalAlerts = safeHives.filter(h => h.status === 'critical');

  const filteredHives = searchQuery.trim()
    ? safeHives.filter(h => 
        (h.code && h.code.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (h.name && h.name.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (h.location && h.location.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const filteredBatches = searchQuery.trim()
    ? safeBatches.filter(b =>
        (b.batchCode && b.batchCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (b.honeyType && b.honeyType.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const beekeeperNavItems: { id: BeekeeperTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
    { id: 'hives', label: 'My Hives', icon: 'hive' },
    { id: 'ai_health', label: 'AI Health', icon: 'health_and_safety' },
    { id: 'predictions', label: 'Predictions', icon: 'query_stats' },
    { id: 'alerts', label: 'Alerts', icon: 'notification_important' },
    { id: 'batches', label: 'Honey Batches', icon: 'layers' },
    { id: 'traceability', label: 'Traceability', icon: 'account_tree' },
    { id: 'bottle_security', label: 'Bottle Security', icon: 'shield_lock' },
    { id: 'my_products', label: 'My Products', icon: 'storefront' },
    { id: 'orders', label: 'Customer Orders', icon: 'receipt_long' },
    { id: 'marketplace_performance', label: 'Marketplace', icon: 'store' },
    { id: 'qr_generator', label: 'QR Generator', icon: 'qr_code_2' },
    { id: 'analytics', label: 'Sales Analytics', icon: 'monitoring' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#d8c3ad]/30 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
      {/* Mobile Hamburger / Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-[#534434] hover:bg-[#f6ece6] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#f59e0b] flex items-center justify-center text-[#1b4332] font-black shadow-sm">
            <span className="material-symbols-outlined text-lg">hive</span>
          </div>
          <span className="font-extrabold text-base text-[#1f1b17]">Honey Chain</span>
        </div>

        {/* Beekeeper Status Chip */}
        <div className="hidden sm:flex items-center gap-2 bg-[#adedd3]/40 border border-[#2b6954]/20 rounded-full px-3 py-1 text-xs font-bold text-[#004e34]">
          <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse" />
          <span>LoRaWAN Gateway Online • {safeHives.length} Hives Syncing</span>
        </div>
      </div>

      {/* Global Search Bar */}
      <div className="relative flex-1 max-w-xs sm:max-w-md">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-[#867461] text-lg pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => setShowSearchDropdown(true)}
            placeholder="Search hive ID, location, batches..."
            className="w-full pl-9 pr-8 py-1.5 bg-[#f6ece6] border border-transparent focus:border-[#f59e0b] focus:bg-white text-xs font-semibold text-[#1f1b17] placeholder:text-[#867461] rounded-xl outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 text-[#867461] hover:text-[#1f1b17] cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showSearchDropdown && searchQuery.trim() && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#d8c3ad]/50 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in max-h-72 overflow-y-auto">
            <div className="text-[10px] font-bold text-[#867461] uppercase tracking-wider px-3 py-1">
              Matching Hives & Batches
            </div>
            {filteredHives.length > 0 || filteredBatches.length > 0 ? (
              <>
                {filteredHives.map(hive => (
                  <div
                    key={hive.id}
                    onClick={() => {
                      if (onSelectHive) onSelectHive(hive.id);
                      handleTabChange('hives');
                      setShowSearchDropdown(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#fff8f5] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-sm text-[#855300]">hive</span>
                      <div>
                        <div className="text-xs font-bold text-[#1f1b17]">{hive.code} - {hive.name}</div>
                        <div className="text-[10px] text-[#534434]">{hive.location} • {hive.internalTemp}°C</div>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                      hive.status === 'healthy' ? 'bg-[#adedd3] text-[#006c49]' : 'bg-[#ffdad6] text-[#ba1a1a]'
                    }`}>
                      {hive.status}
                    </span>
                  </div>
                ))}

                {filteredBatches.map(batch => (
                  <div
                    key={batch.id}
                    onClick={() => {
                      if (onSelectBatch && batch.batchCode) onSelectBatch(batch.batchCode);
                      handleTabChange('traceability');
                      setShowSearchDropdown(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#fff8f5] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-sm text-[#855300]">layers</span>
                      <div>
                        <div className="text-xs font-bold text-[#1f1b17]">{batch.batchCode} ({batch.honeyType})</div>
                        <div className="text-[10px] text-[#534434]">{batch.quantityKg} kg • {batch.status}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#867461]">
                      {(batch.blockchainHash || '').substring(0, 8)}...
                    </span>
                  </div>
                ))}
              </>
            ) : (
              <div className="p-3 text-center text-xs text-[#867461]">
                No items matched "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        {onOpenDemoControls && (
          <button
            onClick={onOpenDemoControls}
            className="px-3 py-1.5 bg-[#855300] hover:bg-[#6c4300] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            title="Open Demo Controls Modal"
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            <span className="hidden sm:inline">Demo Controls</span>
          </button>
        )}

        {onSwitchToCustomer && (
          <DemoModeBadge currentMode="beekeeper" onSwitchMode={onSwitchToCustomer} />
        )}

        {/* Notifications / Alerts button */}
        <button
          onClick={() => handleTabChange('bottle_security')}
          className="relative p-2 rounded-xl text-[#534434] hover:bg-[#f6ece6] transition-colors cursor-pointer"
          title="Bottle Security & Alerts"
        >
          <span className="material-symbols-outlined text-xl">shield_lock</span>
          {unreadTamperCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#ba1a1a] ring-2 ring-white animate-ping" />
          )}
        </button>

        {/* Profile Avatar */}
        <button
          onClick={handleProfileClick}
          className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-[#f6ece6] hover:bg-[#ebd9cb] transition-colors border border-[#d8c3ad]/40 cursor-pointer"
        >
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            className="w-7 h-7 rounded-full object-cover border border-[#855300]/40"
          />
          <span className="hidden sm:inline text-xs font-bold text-[#1f1b17] truncate max-w-[100px]">
            {user.fullName ? user.fullName.split(' ')[0] : 'Beekeeper'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-[#1b4332] text-white p-5 border-b border-white/10 shadow-2xl z-40 animate-in slide-in-from-top duration-200">
          <div className="flex justify-between items-center pb-3 mb-3 border-b border-white/10">
            <span className="text-xs font-bold text-[#fcd34d] uppercase tracking-wider">Navigation</span>
            {onSwitchToCustomer && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSwitchToCustomer();
                }}
                className="text-xs font-bold text-[#95d3ba] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Customer View</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {beekeeperNavItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  handleTabChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-left cursor-pointer ${
                  currentTab === item.id ? 'bg-[#f59e0b] text-[#1b4332] font-bold' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <span className="material-symbols-outlined text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
