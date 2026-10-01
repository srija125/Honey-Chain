import React, { useState } from 'react';
import { CustomerOrder } from '../../types';

interface BeekeeperOrdersProps {
  orders: CustomerOrder[];
  onUpdateOrderStatus: (orderId: string, status: CustomerOrder['status']) => void;
  onViewTraceability?: (batchCode: string) => void;
}

export const BeekeeperOrders: React.FC<BeekeeperOrdersProps> = ({
  orders = [],
  onUpdateOrderStatus,
  onViewTraceability,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const safeOrders = orders || [];
  const filteredOrders = safeOrders.filter(o => statusFilter === 'all' || o.status === statusFilter);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#d8c3ad]/30 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1f1b17]">Customer Orders & Fulfillment</h1>
          <p className="text-xs text-[#534434] mt-1 font-medium">
            Manage incoming retail orders with automatic blockchain batch allotment and shipment tracking.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#f6ece6] p-1 rounded-xl text-xs font-bold overflow-x-auto max-w-full">
          {(['all', 'confirmed', 'processing', 'shipped', 'delivered'] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg capitalize whitespace-nowrap transition-all ${
                statusFilter === st
                  ? 'bg-white text-[#855300] font-extrabold shadow-sm'
                  : 'text-[#534434] hover:text-[#1f1b17]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#f0e6e0] text-[#867461] font-bold uppercase tracking-wider text-[10px]">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Items & Honey</th>
                <th className="pb-3">Total Amount</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0e6e0]">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-[#fffbf7] transition-colors">
                  <td className="py-4 font-black text-[#855300]">{order.orderCode}</td>
                  <td className="py-4">
                    <div className="font-bold text-[#1f1b17]">{order.customerName}</div>
                    <div className="text-[10px] text-[#867461]">{order.shippingAddress.city}, {order.shippingAddress.state}</div>
                  </td>
                  <td className="py-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="text-xs text-[#1f1b17] font-semibold">
                        {item.quantity} × {item.productTitle}
                      </div>
                    ))}
                    <div className="text-[10px] text-[#855300] font-mono mt-0.5">
                      Batch: {order.items[0]?.batchCode || 'HC-2026-0001'}
                    </div>
                  </td>
                  <td className="py-4 font-black text-[#1f1b17]">₹{order.totalAmount}</td>
                  <td className="py-4 text-[#534434]">{order.createdAt}</td>
                  <td className="py-4">
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as CustomerOrder['status'])}
                      className={`px-2.5 py-1 rounded-xl text-xs font-black capitalize border outline-none cursor-pointer ${
                        order.status === 'delivered'
                          ? 'bg-[#adedd3] text-[#004e34] border-[#006c49]/30'
                          : order.status === 'shipped'
                          ? 'bg-[#e0f2fe] text-[#0369a1] border-[#0284c7]/30'
                          : order.status === 'processing'
                          ? 'bg-[#fef3c7] text-[#92400e] border-[#f59e0b]/30'
                          : 'bg-[#f6ece6] text-[#534434] border-[#d8c3ad]'
                      }`}
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-3 py-1.5 bg-[#f6ece6] hover:bg-[#ebd9cb] text-[#1f1b17] text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#d8c3ad]/50 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-[#f0e6e0]">
              <div>
                <span className="text-[10px] font-black uppercase text-[#855300]">Order Summary</span>
                <h3 className="text-lg font-black text-[#1f1b17]">{selectedOrder.orderCode}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-[#867461] hover:text-[#1f1b17] p-1.5 rounded-lg hover:bg-[#f6ece6]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4 mt-4 text-xs">
              <div className="bg-[#fffbf7] p-4 rounded-2xl border border-[#f59e0b]/20 space-y-2">
                <div className="font-bold text-[#1f1b17]">Customer & Delivery Details</div>
                <div className="text-[#534434] space-y-0.5">
                  <div><strong>Name:</strong> {selectedOrder.customerName} ({selectedOrder.customerEmail})</div>
                  <div><strong>Phone:</strong> {selectedOrder.shippingAddress.phone}</div>
                  <div><strong>Address:</strong> {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</div>
                </div>
              </div>

              <div>
                <div className="font-bold text-[#1f1b17] mb-2">Purchased Items</div>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-[#f6ece6] border border-[#d8c3ad]/30">
                      <div>
                        <div className="font-bold text-[#1f1b17]">{item.productTitle}</div>
                        <div className="text-[11px] text-[#867461] font-mono">
                          Batch: {item.batchCode} ({item.weightGrams}g)
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#1f1b17]">{item.quantity} × ₹{item.price}</div>
                        <div className="text-xs font-black text-[#855300]">₹{item.quantity * item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-[#f7fcf9] rounded-2xl border border-[#006c49]/20 flex justify-between items-center">
                <div>
                  <div className="text-[11px] font-bold text-[#004e34]">Payment Status: PAID</div>
                  <div className="text-[10px] text-[#534434]">Via {selectedOrder.paymentMethod.toUpperCase()} • ID: {selectedOrder.paymentId}</div>
                </div>
                <div className="text-lg font-black text-[#1f1b17]">Total: ₹{selectedOrder.totalAmount}</div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                {onViewTraceability && (
                  <button
                    onClick={() => {
                      onViewTraceability(selectedOrder.items[0]?.batchCode || 'HC-2026-0001');
                      setSelectedOrder(null);
                    }}
                    className="text-xs font-bold text-[#006c49] hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">account_tree</span>
                    <span>View Batch Traceability</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-5 py-2.5 bg-[#1b4332] text-white font-bold rounded-xl hover:bg-[#133024]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
