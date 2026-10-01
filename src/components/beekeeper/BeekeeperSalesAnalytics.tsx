import React, { useState } from 'react';

export const BeekeeperSalesAnalytics: React.FC = () => {
  const [metricTimeframe, setMetricTimeframe] = useState<'30D' | '90D' | '1Y'>('30D');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#d8c3ad]/30 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1f1b17]">Direct Sales & Revenue Analytics</h1>
          <p className="text-xs text-[#534434] mt-1 font-medium">
            Financial performance, batch margins, unit sales volume, and customer retention metrics.
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex items-center gap-1 bg-[#f6ece6] p-1 rounded-xl text-xs font-bold">
          {(['30D', '90D', '1Y'] as const).map(tf => (
            <button
              key={tf}
              onClick={() => setMetricTimeframe(tf)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                metricTimeframe === tf
                  ? 'bg-white text-[#855300] font-extrabold shadow-sm'
                  : 'text-[#534434] hover:text-[#1f1b17]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Financial KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase text-[#534434]">Gross Sales</span>
          <div className="text-2xl font-black text-[#1f1b17]">₹48,500</div>
          <div className="text-[10px] text-[#006c49] font-bold">+18.4% vs previous</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase text-[#534434]">Units Bottled & Sold</span>
          <div className="text-2xl font-black text-[#855300]">122 <span className="text-xs font-semibold">jars</span></div>
          <div className="text-[10px] text-[#534434]">Avg price: ₹397.5/jar</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase text-[#534434]">Direct Beekeeper Payout</span>
          <div className="text-2xl font-black text-[#006c49]">₹46,075</div>
          <div className="text-[10px] text-[#006c49] font-bold">95% payout rate (Zero middleman)</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#d8c3ad]/30 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase text-[#534434]">Repeat Purchase Rate</span>
          <div className="text-2xl font-black text-[#1f1b17]">34.2%</div>
          <div className="text-[10px] text-[#006c49] font-bold">High consumer loyalty</div>
        </div>
      </div>

      {/* Revenue Charts & Honey Types Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue Curve SVG (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-[#1f1b17] pb-2 border-b border-[#f0e6e0]">
            Revenue Trend (INR)
          </h2>

          <div className="h-60 w-full relative pt-2">
            <svg viewBox="0 0 600 200" className="w-full h-full">
              <line x1="0" y1="40" x2="600" y2="40" stroke="#f0e6e0" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="#f0e6e0" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#f0e6e0" strokeDasharray="4 4" />
              <line x1="0" y1="180" x2="600" y2="180" stroke="#f0e6e0" />

              {/* Area gradient */}
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#855300" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#855300" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <path
                d="M 0,160 Q 150,140 250,110 T 450,70 T 600,45 L 600,180 L 0,180 Z"
                fill="url(#salesGrad)"
              />
              <path
                d="M 0,160 Q 150,140 250,110 T 450,70 T 600,45"
                fill="none"
                stroke="#855300"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <circle cx="600" cy="45" r="5" fill="#855300" stroke="#fff" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex justify-between text-xs text-[#867461] pt-2 border-t border-[#f0e6e0] font-bold">
            <span>Week 1 (₹8,200)</span>
            <span>Week 2 (₹11,400)</span>
            <span>Week 3 (₹13,900)</span>
            <span>Week 4 (₹15,000)</span>
          </div>
        </div>

        {/* Variety Sales Distribution (1 Col) */}
        <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#534434] pb-2 border-b border-[#f0e6e0]">
            Revenue by Honey Variety
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-bold text-[#1f1b17]">
                <span>Sundarban Raw Wild</span>
                <span className="text-[#855300]">₹24,800 (51%)</span>
              </div>
              <div className="w-full h-2 bg-[#f6ece6] rounded-full mt-1">
                <div className="h-full bg-[#855300] rounded-full w-[51%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-[#1f1b17]">
                <span>Mustard Blossom Raw</span>
                <span className="text-[#006c49]">₹12,400 (26%)</span>
              </div>
              <div className="w-full h-2 bg-[#f6ece6] rounded-full mt-1">
                <div className="h-full bg-[#006c49] rounded-full w-[26%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-[#1f1b17]">
                <span>Litchi Blossom Honey</span>
                <span className="text-[#0284c7]">₹7,300 (15%)</span>
              </div>
              <div className="w-full h-2 bg-[#f6ece6] rounded-full mt-1">
                <div className="h-full bg-[#0284c7] rounded-full w-[15%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-[#1f1b17]">
                <span>Multi-floral Forest</span>
                <span className="text-[#534434]">₹4,000 (8%)</span>
              </div>
              <div className="w-full h-2 bg-[#f6ece6] rounded-full mt-1">
                <div className="h-full bg-[#534434] rounded-full w-[8%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
