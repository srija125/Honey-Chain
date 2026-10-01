import React from 'react';
import { HoneyProduct, BeekeeperProfile, CustomerTab } from '../../types';

interface CustomerHomeProps {
  products: HoneyProduct[];
  beekeepers: BeekeeperProfile[];
  onNavigate: (tab: CustomerTab) => void;
  onSelectProduct: (product: HoneyProduct) => void;
  onSelectBeekeeper: (beekeeper: BeekeeperProfile) => void;
  onAddToCart: (product: HoneyProduct) => void;
  onToggleWishlist: (product: HoneyProduct) => void;
  wishlistIds: string[];
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({
  products = [],
  beekeepers = [],
  onNavigate,
  onSelectProduct,
  onSelectBeekeeper,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const safeProducts = products || [];
  const safeBeekeepers = beekeepers || [];
  const safeWishlistIds = wishlistIds || [];
  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-200">
      {/* Hero Banner Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#fffbf7] via-[#fff4e5] to-[#fef3c7] border border-[#f59e0b]/30 p-8 sm:p-12 lg:p-16 shadow-sm">
        {/* Subtle Decorative Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#f59e0b]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#2b6954]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#855300]/10 border border-[#855300]/20 rounded-full px-3.5 py-1 text-xs font-black text-[#855300]">
            <span>🍯</span>
            <span>DIRECT FROM BEEKEEPERS • 100% TRACEABLE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#1f1b17] tracking-tight leading-tight">
            Pure Honey. <br />
            <span className="text-[#855300]">Real Source.</span> <br />
            Verified Journey.
          </h1>

          <p className="text-sm sm:text-base text-[#534434] leading-relaxed font-medium max-w-xl">
            Buy authentic, unadulterated single-origin honey directly from certified apiaries across India. Scan any bottle to reveal its exact hive telemetry, harvest date, and cryptographic blockchain ledger.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="px-6 py-3.5 bg-[#855300] hover:bg-[#684000] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">storefront</span>
              <span>Shop Honey Marketplace</span>
            </button>

            <button
              onClick={() => onNavigate('qr_scanner')}
              className="px-6 py-3.5 bg-white hover:bg-[#f6ece6] text-[#1f1b17] border border-[#d8c3ad] font-bold text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg text-[#006c49]">qr_code_scanner</span>
              <span>Verify a Honey Batch</span>
            </button>
          </div>
        </div>
      </section>

      {/* Trust Pillars Section: Why Buy Through Honey Chain? */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-black text-[#1f1b17] tracking-tight">
            Why Buy Through Honey Chain?
          </h2>
          <p className="text-xs sm:text-sm text-[#534434] mt-1 font-medium">
            Bridging sustainable beekeeping with total consumer transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-white p-6 rounded-3xl border border-[#d8c3ad]/30 shadow-sm space-y-3 hover:border-[#855300]/40 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#fff4e5] text-[#855300] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🌿
            </div>
            <h3 className="text-base font-black text-[#1f1b17]">Know the Source</h3>
            <p className="text-xs text-[#534434] leading-relaxed">
              Every jar is linked to a registered smart hive equipped with real-time IoT temperature and humidity sensors in pristine Indian forests.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-6 rounded-3xl border border-[#d8c3ad]/30 shadow-sm space-y-3 hover:border-[#006c49]/40 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f7f0] text-[#006c49] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              ⛓
            </div>
            <h3 className="text-base font-black text-[#1f1b17]">Verify the Journey</h3>
            <p className="text-xs text-[#534434] leading-relaxed">
              Trace the complete timeline: hive extraction, cold filtration, quality testing, and bottle packaging sealed with an immutable cryptographic hash.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-6 rounded-3xl border border-[#d8c3ad]/30 shadow-sm space-y-3 hover:border-[#2b6954]/40 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#fffbf7] text-[#855300] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🐝
            </div>
            <h3 className="text-base font-black text-[#1f1b17]">Support Beekeepers</h3>
            <p className="text-xs text-[#534434] leading-relaxed">
              Buy directly from artisanal Indian beekeepers. 95% of proceeds go straight to the apiary leads, supporting biodiversity and sustainable agriculture.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Traceable Honey Products */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-[#855300]">Fresh Harvest</div>
            <h2 className="text-2xl font-black text-[#1f1b17] tracking-tight">Featured Traceable Honey</h2>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-[#855300] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All Honey</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safeProducts.slice(0, 4).map(product => {
            const isWishlisted = safeWishlistIds.includes(product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#d8c3ad]/30 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image Banner */}
                  <div className="relative h-48 w-full bg-[#f6ece6] overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => {
                        onSelectProduct(product);
                        onNavigate('product_details');
                      }}
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="px-2 py-0.5 bg-[#006c49] text-white text-[10px] font-black rounded-lg shadow-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">verified</span>
                        <span>Traceable</span>
                      </span>
                    </div>

                    <button
                      onClick={() => onToggleWishlist(product)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                        isWishlisted
                          ? 'bg-[#ba1a1a] text-white'
                          : 'bg-white/80 text-[#534434] hover:bg-white hover:text-[#ba1a1a]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">favorite</span>
                    </button>
                  </div>

                  {/* Body Details */}
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold text-[#867461]">
                      <span className="text-[#855300] uppercase tracking-wider">{product.honeyType}</span>
                      <span>{product.weightGrams}g</span>
                    </div>

                    <h3
                      onClick={() => {
                        onSelectProduct(product);
                        onNavigate('product_details');
                      }}
                      className="text-sm font-black text-[#1f1b17] line-clamp-1 hover:text-[#855300] cursor-pointer"
                    >
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-[#534434]">
                      <span className="text-[#f59e0b] font-bold">★ {product.rating}</span>
                      <span className="text-[#867461]">({product.reviewCount} reviews)</span>
                      <span>•</span>
                      <span className="font-bold text-[#006c49]">{product.sourceHiveCode}</span>
                    </div>

                    <div className="text-[11px] font-mono text-[#867461] bg-[#fffbf7] px-2 py-1 rounded-md border border-[#f59e0b]/20 truncate">
                      Batch: {product.batchCode}
                    </div>
                  </div>
                </div>

                {/* Footer Price & Add */}
                <div className="p-4 pt-0 border-t border-[#f0e6e0] flex items-center justify-between mt-2">
                  <div>
                    <span className="text-base font-black text-[#1f1b17]">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#867461] line-through ml-1.5 font-medium">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-3.5 py-1.5 bg-[#855300] hover:bg-[#684000] text-white text-xs font-black rounded-xl shadow-sm transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">shopping_bag</span>
                    <span>Add</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Meet Trusted Beekeepers Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-[#006c49]">Artisanal Stewards</div>
            <h2 className="text-2xl font-black text-[#1f1b17] tracking-tight">Meet the Beekeepers</h2>
          </div>

          <button
            onClick={() => onNavigate('beekeepers')}
            className="text-xs font-bold text-[#006c49] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Beekeepers</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {safeBeekeepers.slice(0, 3).map(bk => (
            <div
              key={bk.id}
              onClick={() => {
                onSelectBeekeeper(bk);
                onNavigate('beekeeper_profile');
              }}
              className="bg-white rounded-3xl p-5 border border-[#d8c3ad]/30 shadow-sm hover:shadow-md hover:border-[#006c49]/40 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={bk.avatarUrl}
                  alt={bk.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#006c49]/30 group-hover:scale-105 transition-transform"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-black text-[#1f1b17]">{bk.name}</h3>
                    {bk.isVerified && (
                      <span className="material-symbols-outlined text-sm text-[#006c49]">verified</span>
                    )}
                  </div>
                  <div className="text-xs text-[#855300] font-bold">{bk.farmName}</div>
                  <div className="text-[11px] text-[#867461]">{bk.location}</div>
                </div>
              </div>

              <p className="text-xs text-[#534434] line-clamp-2 leading-relaxed">
                {bk.bio}
              </p>

              <div className="pt-3 border-t border-[#f0e6e0] flex items-center justify-between text-xs">
                <span className="text-[#534434]">
                  <strong>{bk.activeHivesCount}</strong> Smart Hives
                </span>
                <span className="font-bold text-[#f59e0b]">★ {bk.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* From Hive to Bottle: 4-Step Interactive Story */}
      <section className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white p-8 sm:p-12 rounded-3xl shadow-lg space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#fcd34d]">Transparent Supply Chain</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            From Hive to Bottle: Every Drop Has a Story
          </h2>
          <p className="text-xs sm:text-sm text-white/80">
            How Honey Chain guarantees authenticity from wild forest florets to your kitchen table.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: '01',
              title: 'Smart Hive IoT',
              desc: 'Sensors log brood temperature, moisture, and weight curves in real time.',
              icon: 'hive'
            },
            {
              step: '02',
              title: 'Cold Centrifugation',
              desc: 'Raw honey is cold-extracted without thermal destruction of living enzymes.',
              icon: 'water_drop'
            },
            {
              step: '03',
              title: 'Blockchain Hashing',
              desc: 'Quality lab scores and harvest records are immutably minted onto the ledger.',
              icon: 'lock'
            },
            {
              step: '04',
              title: 'QR Bottle Scan',
              desc: 'Scan the jar label with your camera to view the complete verified provenance.',
              icon: 'qr_code_2'
            },
          ].map(st => (
            <div key={st.step} className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-2">
              <div className="flex justify-between items-center">
                <span className="material-symbols-outlined text-2xl text-[#fcd34d]">{st.icon}</span>
                <span className="text-xs font-mono font-black text-[#95d3ba]">STEP {st.step}</span>
              </div>
              <h3 className="text-sm font-black text-white mt-2">{st.title}</h3>
              <p className="text-xs text-white/75 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
