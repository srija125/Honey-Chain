import React, { useState } from 'react';
import { CustomerTab, UserAccount, HoneyProduct, HoneyBatch } from '../../types';
import { DemoModeBadge } from '../common/DemoModeBadge';

interface CustomerNavbarProps {
  currentTab: CustomerTab;
  onSelectTab: (tab: CustomerTab) => void;
  user: UserAccount;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onSwitchToBeekeeper: () => void;
  products: HoneyProduct[];
  batches: HoneyBatch[];
  onSelectProduct?: (product: HoneyProduct) => void;
  onSelectBatch?: (batchCode: string) => void;
  onOpenDemoControls?: () => void;
}

export const CustomerNavbar: React.FC<CustomerNavbarProps> = ({
  currentTab,
  onSelectTab,
  user,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenAuth,
  onSwitchToBeekeeper,
  products,
  batches,
  onSelectProduct,
  onSelectBatch,
  onOpenDemoControls,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: CustomerTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop Honey' },
    { id: 'beekeepers', label: 'Explore Beekeepers' },
    { id: 'traceability', label: 'Traceability' },
    { id: 'dual_verify', label: 'NFC + QR Dual Auth' },
    { id: 'qr_scanner', label: 'Verify Bottle' },
    { id: 'orders', label: 'My Orders' },
    { id: 'how_it_works', label: 'How It Works' },
  ];

  // Search results calculation
  const q = searchQuery.toLowerCase().trim();
  const safeProducts = products || [];
  const safeBatches = batches || [];
  const matchedProducts = q ? safeProducts.filter(p => ((p.title || p.name || '').toLowerCase().includes(q) || (p.honeyType || '').toLowerCase().includes(q))) : [];
  const matchedBatches = q ? safeBatches.filter(b => ((b.batchCode || b.id || '').toLowerCase().includes(q) || (b.honeyType || '').toLowerCase().includes(q))) : [];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#d8c3ad]/40 shadow-xs">
      {/* Top Banner strip */}
      <div className="bg-[#1b4332] text-white py-1.5 px-4 text-[11px] font-semibold flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="text-[#fcd34d]">🍯</span>
          <span>100% Traceable Single-Origin Honey directly from Indian beekeepers. Free delivery on orders above ₹999.</span>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          {onOpenDemoControls && (
            <button
              onClick={onOpenDemoControls}
              className="px-2.5 py-0.5 bg-[#fcd34d] hover:bg-[#fbbf24] text-[#1b4332] text-[11px] font-black rounded-lg shadow-sm transition-all flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xs">tune</span>
              <span>Demo Controls</span>
            </button>
          )}
          <DemoModeBadge currentMode="customer" onSwitchMode={onSwitchToBeekeeper} />
          <button
            onClick={onSwitchToBeekeeper}
            className="text-[11px] font-bold text-[#fcd34d] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>🐝 Beekeeper Portal</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#855300] flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined text-2xl font-black">hive</span>
          </div>
          <div>
            <div className="text-xl font-black text-[#1f1b17] tracking-tight flex items-center gap-1 leading-none">
              <span>Honey Chain</span>
            </div>
            <div className="text-[10px] text-[#855300] font-extrabold uppercase tracking-wider mt-0.5">
              Verified Marketplace
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-[#867461] text-lg pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="Search honey, beekeeper or batch (e.g. HC-2026-0001)..."
              className="w-full pl-10 pr-8 py-2 bg-[#f6ece6] border border-transparent focus:border-[#855300] focus:bg-white text-xs font-semibold text-[#1f1b17] placeholder:text-[#867461] rounded-2xl outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-[#867461] hover:text-[#1f1b17]"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          {searchFocused && (matchedProducts.length > 0 || matchedBatches.length > 0) && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#d8c3ad]/50 rounded-2xl shadow-xl p-3 z-50 animate-in fade-in space-y-3">
              {matchedProducts.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold text-[#867461] uppercase tracking-wider px-2 mb-1">
                    Honey Products
                  </div>
                  {matchedProducts.slice(0, 3).map(p => (
                    <div
                      key={p.id}
                      onClick={() => {
                        if (onSelectProduct) onSelectProduct(p);
                        onSelectTab('product_details');
                        setSearchFocused(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-[#fffbf7] cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={p.imageUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <div className="text-xs font-bold text-[#1f1b17]">{p.title}</div>
                          <div className="text-[10px] text-[#855300]">₹{p.price} • {p.weightGrams}g</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#006c49] bg-[#adedd3]/50 px-2 py-0.5 rounded-md">
                        ✓ Traceable
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {matchedBatches.length > 0 && (
                <div className="pt-2 border-t border-[#f0e6e0]">
                  <div className="text-[10px] font-bold text-[#867461] uppercase tracking-wider px-2 mb-1">
                    Blockchain Batches
                  </div>
                  {matchedBatches.slice(0, 2).map(b => (
                    <div
                      key={b.id}
                      onClick={() => {
                        if (onSelectBatch) onSelectBatch(b.batchCode);
                        onSelectTab('traceability');
                        setSearchFocused(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-[#f7fcf9] cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-black text-[#006c49]">{b.batchCode}</div>
                        <div className="text-[10px] text-[#534434]">{b.honeyType} • {b.sourceHiveCode}</div>
                      </div>
                      <span className="text-xs text-[#006c49] font-bold">View Journey →</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-3">
          {/* Wishlist */}
          <button
            onClick={() => onSelectTab('wishlist')}
            className={`relative p-2 rounded-xl transition-colors ${
              currentTab === 'wishlist' ? 'bg-[#855300]/10 text-[#855300]' : 'text-[#534434] hover:bg-[#f6ece6]'
            }`}
            title="Wishlist"
          >
            <span className="material-symbols-outlined text-xl">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#ba1a1a] text-white text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={onOpenCart}
            className={`relative p-2 rounded-xl transition-colors flex items-center gap-1.5 ${
              currentTab === 'cart' ? 'bg-[#855300] text-white' : 'bg-[#fffbf7] text-[#1f1b17] border border-[#f59e0b]/40 hover:bg-[#fff7ed]'
            }`}
            title="Shopping Cart"
          >
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#855300] text-white text-[10px] font-black">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 p-1 pl-1 pr-2.5 rounded-full bg-[#f6ece6] hover:bg-[#ebd9cb] transition-colors border border-[#d8c3ad]/40 cursor-pointer"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
              alt={user?.fullName || 'User'}
              className="w-7 h-7 rounded-full object-cover border border-[#855300]/40"
            />
            <span className="hidden sm:inline text-xs font-bold text-[#1f1b17] truncate max-w-[80px]">
              {(user?.fullName || 'User').split(' ')[0]}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#534434] hover:bg-[#f6ece6] rounded-xl"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Desktop Navigation Links Strip */}
      <div className="hidden lg:block border-t border-[#f0e6e0] bg-white">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-8">
          {navLinks.map(link => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onSelectTab(link.id)}
                className={`py-3 text-xs font-bold transition-all relative ${
                  isActive
                    ? 'text-[#855300] font-black'
                    : 'text-[#534434] hover:text-[#1f1b17]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#855300] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#f0e6e0] p-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  onSelectTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold text-left transition-colors ${
                  currentTab === link.id
                    ? 'bg-[#fffbf7] text-[#855300] border-l-4 border-[#855300]'
                    : 'text-[#534434] hover:bg-[#f6ece6]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 border-t border-[#f0e6e0] flex justify-between items-center">
              <button
                onClick={() => {
                  onSwitchToBeekeeper();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-[#1b4332] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <span>🐝 Switch to Beekeeper Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
