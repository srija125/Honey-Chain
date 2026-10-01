import React from 'react';
import { HoneyProduct } from '../../types';

interface BeekeeperMarketplacePerformanceProps {
  products: HoneyProduct[];
  onNavigateToProducts: () => void;
  onNavigateToOrders: () => void;
}

export const BeekeeperMarketplacePerformance: React.FC<BeekeeperMarketplacePerformanceProps> = ({
  products,
  onNavigateToProducts,
  onNavigateToOrders,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#d8c3ad]/30 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1f1b17]">Marketplace Performance</h1>
          <p className="text-xs text-[#534434] mt-1 font-medium">
            Real-time analytics for your direct-to-consumer store on the Honey Chain Marketplace.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onNavigateToProducts}
            className="px-4 py-2.5 bg-[#855300] hover:bg-[#684000] text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            Manage Products
          </button>
          <button
            onClick={onNavigateToOrders}
            className="px-4 py-2.5 bg-[#006c49] hover:bg-[#004e34] text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            View Customer Orders
          </button>
        </div>
      </div>

      {/* 4 Marketplace Performance KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-[11px] font-bold uppercase text-[#534434]">Product Views</span>
            <span className="material-symbols-outlined text-base text-[#855300]">visibility</span>
          </div>
          <div className="text-2xl font-black text-[#1f1b17]">2,840</div>
          <div className="text-[10px] text-[#006c49] font-bold">+24% this month</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-[11px] font-bold uppercase text-[#534434]">Total Orders</span>
            <span className="material-symbols-outlined text-base text-[#006c49]">shopping_cart</span>
          </div>
          <div className="text-2xl font-black text-[#006c49]">84</div>
          <div className="text-[10px] text-[#534434] font-medium">3.8% Conversion Rate</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-[11px] font-bold uppercase text-[#534434]">Direct Revenue</span>
            <span className="material-symbols-outlined text-base text-[#855300]">payments</span>
          </div>
          <div className="text-2xl font-black text-[#1f1b17]">₹48,500</div>
          <div className="text-[10px] text-[#006c49] font-bold">100% direct to farm</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-[#867461]">
            <span className="text-[11px] font-bold uppercase text-[#534434]">Customer Rating</span>
            <span className="material-symbols-outlined text-base text-[#f59e0b]">star</span>
          </div>
          <div className="text-2xl font-black text-[#f59e0b]">4.8 ★</div>
          <div className="text-[10px] text-[#867461] font-medium">Across 42 reviews</div>
        </div>
      </div>

      {/* Top Buyer Regions & Listing Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Product Conversion Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-[#1f1b17] pb-2 border-b border-[#f0e6e0]">
            Marketplace Listing Engagement
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#f0e6e0] text-[#867461] font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Views</th>
                  <th className="pb-3">Orders</th>
                  <th className="pb-3">CTR</th>
                  <th className="pb-3">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0e6e0]">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-[#fffbf7]">
                    <td className="py-3 font-bold text-[#1f1b17] flex items-center gap-2">
                      <img src={p.imageUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      <span className="line-clamp-1">{p.title}</span>
                    </td>
                    <td className="py-3 font-bold text-[#855300]">₹{p.price}</td>
                    <td className="py-3 text-[#534434]">1,140</td>
                    <td className="py-3 font-bold text-[#006c49]">38</td>
                    <td className="py-3 text-[#534434]">3.3%</td>
                    <td className="py-3 text-[#f59e0b] font-bold">★ {p.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Demographics & Trust Metrics (1 Col) */}
        <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#534434] pb-2 border-b border-[#f0e6e0]">
            Top Buyer Locations
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#1f1b17]">Kolkata & Suburbs</span>
              <span className="font-bold text-[#006c49]">42%</span>
            </div>
            <div className="w-full h-2 bg-[#f6ece6] rounded-full overflow-hidden">
              <div className="h-full bg-[#006c49] rounded-full w-[42%]" />
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold text-[#1f1b17]">Bengaluru</span>
              <span className="font-bold text-[#855300]">26%</span>
            </div>
            <div className="w-full h-2 bg-[#f6ece6] rounded-full overflow-hidden">
              <div className="h-full bg-[#855300] rounded-full w-[26%]" />
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold text-[#1f1b17]">Mumbai / Pune</span>
              <span className="font-bold text-[#2b6954]">18%</span>
            </div>
            <div className="w-full h-2 bg-[#f6ece6] rounded-full overflow-hidden">
              <div className="h-full bg-[#2b6954] rounded-full w-[18%]" />
            </div>

            <div className="flex justify-between items-center">
              <span className="font-bold text-[#1f1b17]">Delhi NCR</span>
              <span className="font-bold text-[#534434]">14%</span>
            </div>
            <div className="w-full h-2 bg-[#f6ece6] rounded-full overflow-hidden">
              <div className="h-full bg-[#534434] rounded-full w-[14%]" />
            </div>
          </div>

          <div className="bg-[#f7fcf9] p-4 rounded-2xl border border-[#006c49]/20 text-xs space-y-1 mt-4">
            <div className="font-bold text-[#004e34]">Consumer Trust Score: 98%</div>
            <p className="text-[11px] text-[#534434]">
              92% of your buyers scanned the bottle QR to view batch harvest telemetry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
