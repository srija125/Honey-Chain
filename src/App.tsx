import React, { useState } from 'react';
import {
  AppMode,
  BeekeeperTab,
  CustomerTab,
  HiveTelemetry,
  HoneyBatch,
  HoneyProduct,
  BeekeeperProfile,
  CustomerOrder,
  CartItem,
  UserAccount,
  SmartBottle,
  SecurityTimelineEvent,
  LiveEventItem,
  BottleNotification,
} from './types';
import {
  INITIAL_HIVES,
  NORMALIZED_PRODUCTS,
  NORMALIZED_BATCHES,
  NORMALIZED_BEEKEEPERS,
  NORMALIZED_ORDERS,
  INITIAL_USER,
  INITIAL_CUSTOMER_USER,
  INITIAL_BOTTLES,
  INITIAL_LIVE_EVENTS,
  INITIAL_NOTIFICATIONS,
  generateSHA256Hash,
} from './data/mockData';

// Common Components
import { WelcomeRoleModal } from './components/common/WelcomeRoleModal';
import { HowHoneyChainWorks } from './components/common/HowHoneyChainWorks';
import { DemoControlsModal } from './components/common/DemoControlsModal';
import { LiveEventFeed } from './components/common/LiveEventFeed';

// Beekeeper Components
import { BeekeeperSidebar } from './components/beekeeper/BeekeeperSidebar';
import { BeekeeperTopBar } from './components/beekeeper/BeekeeperTopBar';
import { BeekeeperDashboard } from './components/beekeeper/BeekeeperDashboard';
import { BeekeeperHiveDetails } from './components/beekeeper/BeekeeperHiveDetails';
import { BeekeeperAIHealth } from './components/beekeeper/BeekeeperAIHealth';
import { BeekeeperPredictions } from './components/beekeeper/BeekeeperPredictions';
import { BeekeeperAlerts } from './components/beekeeper/BeekeeperAlerts';
import { BeekeeperBatches } from './components/beekeeper/BeekeeperBatches';
import { BeekeeperTraceability } from './components/beekeeper/BeekeeperTraceability';
import { BeekeeperBottleSecurity } from './components/beekeeper/BeekeeperBottleSecurity';
import { BeekeeperMyProducts } from './components/beekeeper/BeekeeperMyProducts';
import { BeekeeperMarketplacePerformance } from './components/beekeeper/BeekeeperMarketplacePerformance';
import { BeekeeperOrders } from './components/beekeeper/BeekeeperOrders';
import { BeekeeperQRGenerator } from './components/beekeeper/BeekeeperQRGenerator';
import { BeekeeperSalesAnalytics } from './components/beekeeper/BeekeeperSalesAnalytics';
import { BeekeeperSettings } from './components/beekeeper/BeekeeperSettings';

// Customer Components
import { CustomerNavbar } from './components/customer/CustomerNavbar';
import { CustomerHome } from './components/customer/CustomerHome';
import { CustomerShop } from './components/customer/CustomerShop';
import { CustomerProductDetails } from './components/customer/CustomerProductDetails';
import { CustomerTraceability } from './components/customer/CustomerTraceability';
import { CustomerDualVerification } from './components/customer/CustomerDualVerification';
import { CustomerQRScanner } from './components/customer/CustomerQRScanner';
import { CustomerCart } from './components/customer/CustomerCart';
import { CustomerCheckout } from './components/customer/CustomerCheckout';
import { CustomerOrderConfirmation } from './components/customer/CustomerOrderConfirmation';
import { CustomerMyOrders } from './components/customer/CustomerMyOrders';
import { CustomerOrderTracking } from './components/customer/CustomerOrderTracking';
import { CustomerBeekeepers } from './components/customer/CustomerBeekeepers';
import { CustomerBeekeeperProfile } from './components/customer/CustomerBeekeeperProfile';
import { CustomerWishlist } from './components/customer/CustomerWishlist';
import { CustomerProfile } from './components/customer/CustomerProfile';

export function App() {
  // Global Mode & Navigation State
  const [appMode, setAppMode] = useState<AppMode>('beekeeper');
  const [beekeeperTab, setBeekeeperTab] = useState<BeekeeperTab>('dashboard');
  const [customerTab, setCustomerTab] = useState<CustomerTab>('home');
  const [showRoleModal, setShowRoleModal] = useState<boolean>(false);

  // Users
  const [beekeeperUser, setBeekeeperUser] = useState<UserAccount>(INITIAL_USER);
  const [customerUser, setCustomerUser] = useState<UserAccount>(INITIAL_CUSTOMER_USER);

  // Domain Entities State
  const [hives, setHives] = useState<HiveTelemetry[]>(INITIAL_HIVES);
  const [selectedHiveId, setSelectedHiveId] = useState<string>(INITIAL_HIVES[0]?.id || 'hive-1');

  const [batches, setBatches] = useState<HoneyBatch[]>(NORMALIZED_BATCHES);
  const [selectedBatchCode, setSelectedBatchCode] = useState<string>(NORMALIZED_BATCHES[0]?.batchCode || 'HC-2026-0001');

  const [products, setProducts] = useState<HoneyProduct[]>(NORMALIZED_PRODUCTS);
  const [selectedProductId, setSelectedProductId] = useState<string>(NORMALIZED_PRODUCTS[0]?.id || 'prod-1');

  const [beekeepers] = useState<BeekeeperProfile[]>(NORMALIZED_BEEKEEPERS);
  const [selectedBeekeeperId, setSelectedBeekeeperId] = useState<string>(NORMALIZED_BEEKEEPERS[0]?.id || 'bk-1');

  const [orders, setOrders] = useState<CustomerOrder[]>(NORMALIZED_ORDERS);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string>(NORMALIZED_ORDERS[0]?.id || 'ord-1');
  const [latestPlacedOrder, setLatestPlacedOrder] = useState<CustomerOrder | null>(null);

  // Smart Packaging, Tamper Detection & Live Event Stream State
  const [bottles, setBottles] = useState<SmartBottle[]>(INITIAL_BOTTLES);
  const [selectedBottleId, setSelectedBottleId] = useState<string>(INITIAL_BOTTLES[0]?.bottle_id || 'HC-BOT-2026-0089');
  const [liveEvents, setLiveEvents] = useState<LiveEventItem[]>(INITIAL_LIVE_EVENTS);
  const [notifications, setNotifications] = useState<BottleNotification[]>(INITIAL_NOTIFICATIONS);
  const [showDemoModal, setShowDemoModal] = useState<boolean>(false);

  // E-commerce Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>([
    { product: NORMALIZED_PRODUCTS[0], quantity: 1, selectedSize: '500 g' },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-2']);

  // --- Handlers & Navigation ---
  const handleSelectRole = (mode: AppMode) => {
    setAppMode(mode);
    setShowRoleModal(false);
    if (mode === 'beekeeper') {
      setBeekeeperTab('dashboard');
    } else {
      setCustomerTab('home');
    }
  };

  // Cart operations
  const handleAddToCart = (product: HoneyProduct, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSize: `${product.weightGrams}g` }];
    });
  };

  const handleBuyNow = (product: HoneyProduct, quantity: number = 1) => {
    handleAddToCart(product, quantity);
    setCustomerTab('checkout');
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleToggleWishlist = (product: HoneyProduct) => {
    setWishlistIds(prev =>
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  // Order Placement
  const handlePlaceOrder = (orderData: Partial<CustomerOrder>) => {
    const fullOrder: CustomerOrder = {
      id: `ord-${Date.now()}`,
      orderCode: orderData.orderCode || `HCORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: orderData.customerName || customerUser.fullName,
      customerEmail: orderData.customerEmail || customerUser.email,
      customerPhone: orderData.shippingAddress?.phone || '+91 98765 43210',
      items: orderData.items || [],
      totalAmount: orderData.totalAmount || 0,
      status: 'confirmed',
      createdAt: orderData.createdAt || 'Just now',
      paymentMethod: orderData.paymentMethod || 'upi',
      paymentId: orderData.paymentId || 'PAY-ONLINE-OK',
      shippingAddress: orderData.shippingAddress || {
        fullName: customerUser.fullName,
        phone: '+91 98765 43210',
        street: 'Main Street',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700091',
      },
      trackingSteps: orderData.trackingSteps || [
        { statusName: 'Order Placed', timestamp: 'Just now', completed: true },
        { statusName: 'Confirmed by Apiary', timestamp: 'Pending', completed: true },
      ],
    };

    setOrders(prev => [fullOrder, ...prev]);
    setLatestPlacedOrder(fullOrder);
    setCart([]);
    setCustomerTab('order_confirmation');
  };

  // Beekeeper Hive management
  const handleSelectHive = (hiveId: string) => {
    setSelectedHiveId(hiveId);
    setBeekeeperTab('hives');
  };

  const handleToggleSimulatedAnomaly = (hiveId: string) => {
    setHives(prev =>
      prev.map(h => {
        if (h.id === hiveId) {
          const isCurrentlySimulated = !h.isSimulatedAbnormal;
          return {
            ...h,
            isSimulatedAbnormal: isCurrentlySimulated,
            internalTemp: isCurrentlySimulated ? 39.4 : 34.8,
            humidity: isCurrentlySimulated ? 76 : 58,
            status: isCurrentlySimulated ? 'critical' : 'healthy',
            healthScore: isCurrentlySimulated ? 42 : 96,
            abnormalConditionName: isCurrentlySimulated ? 'Thermal Stress & Overheating' : undefined,
          };
        }
        return h;
      })
    );
  };

  const handleAddHive = (newHive: HiveTelemetry) => {
    setHives(prev => [newHive, ...prev]);
  };

  const handleAddInspectionNote = (hiveId: string, note: string) => {
    setHives(prev =>
      prev.map(h => (h.id === hiveId ? { ...h, notes: note } : h))
    );
  };

  // Beekeeper Batches & Traceability
  const handleCreateBatch = (newBatch: HoneyBatch) => {
    setBatches(prev => [newBatch, ...prev]);
    setSelectedBatchCode(newBatch.batchCode);
  };

  const handleAddTraceabilityStep = (batchId: string, step: any) => {
    setBatches(prev =>
      prev.map(b =>
        b.id === batchId
          ? { ...b, traceabilitySteps: [...b.traceabilitySteps, step] }
          : b
      )
    );
  };

  // Products
  const handleAddProduct = (newProduct: HoneyProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleToggleProductStatus = (productId: string) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? { ...p, status: p.status === 'active' ? 'paused' : 'active' }
          : p
      )
    );
  };

  const handleUpdateOrderStatus = (orderId: string, status: CustomerOrder['status']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // --- Smart Packaging, Tamper-Evident Cap & Hardware Simulation ---
  const handleSimulateCapOpening = (bottleId: string) => {
    const nowFormatted = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }) + ' • ' + new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const target = bottles.find(b => b.bottle_id === bottleId) || bottles[0];
    const txHash = generateSHA256Hash(`${target.bottle_id}-CAP-OPENED-${Date.now()}-${target.tamper_sensor_id}`);

    // Update bottle immutably (once opened, never returns to sealed)
    setBottles(prev =>
      prev.map(b => {
        if (b.bottle_id === target.bottle_id) {
          const alreadyOpened = b.cap_status === 'OPENED';
          const newCount = (b.tamper_event_count || 0) + (alreadyOpened ? 0 : 1);
          const firstOpen = b.first_opened_at || nowFormatted;

          const physicalStep: SecurityTimelineEvent = {
            id: `ev-${Date.now()}-open`,
            title: 'Physical Cap Unsealed',
            timestamp: nowFormatted,
            status: 'warning',
            details: `Tamper conductive track severed on Smart Cap (Sensor: ${b.tamper_sensor_id}). Hermetic seal broken.`,
            icon: 'lock_open',
            blockchainHash: txHash,
            txHash: txHash,
          };

          const ledgerStep: SecurityTimelineEvent = {
            id: `ev-${Date.now()}-commit`,
            title: 'Tamper Event Committed to Blockchain',
            timestamp: nowFormatted,
            status: 'completed',
            details: 'Immutable cryptographic opening record verified and anchored.',
            icon: 'verified',
            blockchainHash: txHash,
            txHash: txHash,
          };

          return {
            ...b,
            cap_status: 'OPENED' as const,
            first_opened_at: firstOpen,
            tamper_event_count: newCount,
            verification_status: 'TAMPER_DETECTED' as const,
            security_timeline: [...(b.security_timeline || []), physicalStep, ledgerStep],
          };
        }
        return b;
      })
    );

    // Prepend to Live Events stream
    const newLiveEvent: LiveEventItem = {
      id: `live-${Date.now()}`,
      timestamp: 'Just now',
      type: 'CAP_OPENED',
      title: `Smart Cap Opened: ${target.bottle_id}`,
      description: `Sensor ${target.tamper_sensor_id} circuit broken. Physical seal breached. Permanent state transition SEALED → OPENED.`,
      txHash: txHash,
      severity: 'warning',
      bottleId: target.bottle_id,
    };
    setLiveEvents(prev => [newLiveEvent, ...prev]);

    // Send high-priority notification
    const newNotif: BottleNotification = {
      id: `notif-${Date.now()}`,
      title: `⚠️ Smart Cap Opened: ${target.bottle_id}`,
      message: `Bottle ${target.bottle_id} from batch ${target.batch_id} was unsealed. State permanently recorded on chain.`,
      timestamp: 'Just now',
      type: 'cap_opened',
      bottleId: target.bottle_id,
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleSimulateDuplicateQR = (bottleId: string) => {
    const target = bottles.find(b => b.bottle_id === bottleId) || bottles[0];
    const txHash = generateSHA256Hash(`DUPLICATE-QR-${bottleId}-${Date.now()}`);

    const newLiveEvent: LiveEventItem = {
      id: `live-${Date.now()}`,
      timestamp: 'Just now',
      type: 'DUPLICATE_QR_DETECTED',
      title: `Duplicate QR Code Flagged: ${target.bottle_id}`,
      description: `Simultaneous scan detected across divergent geo-coordinates. Anti-counterfeiting token duplicate invalidated.`,
      txHash: txHash,
      severity: 'critical',
      bottleId: target.bottle_id,
    };
    setLiveEvents(prev => [newLiveEvent, ...prev]);

    const newNotif: BottleNotification = {
      id: `notif-${Date.now()}`,
      title: `🚨 Counterfeit QR Attempt Blocked`,
      message: `Duplicate QR token detected for ${target.bottle_id}. Security audit flagged.`,
      timestamp: 'Just now',
      type: 'duplicate_qr',
      bottleId: target.bottle_id,
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleSimulateNFCReuse = (bottleId: string) => {
    const target = bottles.find(b => b.bottle_id === bottleId) || bottles[0];
    const txHash = generateSHA256Hash(`NFC-REUSE-${bottleId}-${Date.now()}`);

    const newLiveEvent: LiveEventItem = {
      id: `live-${Date.now()}`,
      timestamp: 'Just now',
      type: 'NFC_QR_MISMATCH',
      title: `NFC Cryptographic Mismatch: ${target.bottle_id}`,
      description: `Dynamic rolling CMAC failed verification on NFC token ${target.nfc_token}. Cloned tag rejected.`,
      txHash: txHash,
      severity: 'critical',
      bottleId: target.bottle_id,
    };
    setLiveEvents(prev => [newLiveEvent, ...prev]);

    const newNotif: BottleNotification = {
      id: `notif-${Date.now()}`,
      title: `🛡️ Clone Tag Rejected`,
      message: `NFC signature verification failed for Bottle ${target.bottle_id}.`,
      timestamp: 'Just now',
      type: 'nfc_reuse',
      bottleId: target.bottle_id,
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleSimulateHoneyHarvest = (batchCode: string) => {
    const txHash = generateSHA256Hash(`HARVEST-${batchCode}-${Date.now()}`);
    const newLiveEvent: LiveEventItem = {
      id: `live-${Date.now()}`,
      timestamp: 'Just now',
      type: 'NEW_HONEY_HARVEST',
      title: `Raw Honey Harvest Extracted: ${batchCode}`,
      description: `Super frames harvested and centrifugal extraction logged. Moisture: 17.6%.`,
      txHash: txHash,
      severity: 'success',
    };
    setLiveEvents(prev => [newLiveEvent, ...prev]);
  };

  const handleSimulateHiveAlert = (hiveId: string) => {
    handleToggleSimulatedAnomaly(hiveId);
    const newLiveEvent: LiveEventItem = {
      id: `live-${Date.now()}`,
      timestamp: 'Just now',
      type: 'HIVE_HEALTH_UPDATED',
      title: `Thermal Anomaly Triggered: ${hiveId}`,
      description: `Brood temperature reached 39.4°C. Acoustic stress index elevated.`,
      severity: 'critical',
    };
    setLiveEvents(prev => [newLiveEvent, ...prev]);
  };

  const handleCreateNewBatchDemo = () => {
    const nextNum = batches.length + 1;
    const nextCode = `HC-2026-${String(nextNum).padStart(4, '0')}`;
    const batchHash = generateSHA256Hash(`BATCH-${nextCode}-${Date.now()}`);
    const newBatch: HoneyBatch = {
      id: `batch-${Date.now()}`,
      batchCode: nextCode,
      status: 'Packaged',
      quantityKg: 120,
      sourceLocation: 'Sundarbans Biosphere Reserve',
      honeyType: 'Kashmir Acacia Blossom',
      extractedDate: 'Oct 20, 2026',
      sourceHiveCode: hives[0]?.code || 'HIVE-01',
      beekeeperName: beekeeperUser.fullName || 'Priya Sharma',
      moisturePercentage: 17.2,
      blockchainHash: batchHash,
      verified: true,
      steps: [
        {
          id: `step-${Date.now()}`,
          stageName: 'Harvest & Cold Extraction',
          timestamp: 'Oct 20, 2026 • 08:30 AM',
          operatorName: beekeeperUser.fullName || 'Priya Sharma',
          location: 'Sundarbans Biosphere Reserve',
          status: 'completed',
          icon: 'agriculture',
          details: 'Raw unheated artisanal extraction.',
        },
      ],
    };
    setBatches(prev => [newBatch, ...prev]);
    setSelectedBatchCode(nextCode);

    setLiveEvents(prev => [
      {
        id: `live-${Date.now()}`,
        timestamp: 'Just now',
        type: 'NEW_HONEY_HARVEST',
        title: `New Honey Batch Minted: ${nextCode}`,
        description: `${newBatch.honeyType} batch registered on Polygon POS ledger.`,
        txHash: batchHash,
        severity: 'success',
      },
      ...prev,
    ]);
  };

  const handleGenerateNewBottleDemo = () => {
    const nextNum = bottles.length + 1;
    const bId = `HC-BOT-2026-${String(nextNum).padStart(4, '0')}`;
    const nfc = `NFC-${Math.floor(1000 + Math.random() * 8999)}-A410`;
    const qr = `QR-${bId}-SEC`;
    const cap = `CAP-HAL-${Math.floor(1000 + Math.random() * 9000)}`;
    const hash = generateSHA256Hash(`${bId}-${nfc}-${qr}`);

    const newBottle: SmartBottle = {
      bottle_id: bId,
      batch_id: selectedBatchCode || batches[0]?.batchCode || 'HC-2026-0001',
      batchCode: selectedBatchCode || batches[0]?.batchCode || 'HC-2026-0001',
      honeyType: 'Sundarbans Wild Mangrove Blossom Honey',
      beekeeperName: beekeeperUser.fullName || 'Priya Sharma',
      nfc_token: nfc,
      qr_token: qr,
      tamper_sensor_id: cap,
      cap_status: 'SEALED',
      first_opened_at: null,
      tamper_event_count: 0,
      verification_status: 'VERIFIED',
      blockchain_status: 'Anchored on Polygon POS',
      blockchain_tx: hash,
      blockchain_hash: hash,
      created_at: 'Just now',
      security_timeline: [
        {
          id: `ev-${Date.now()}`,
          title: 'Hermetic Cap Sealed & Sensor Calibrated',
          timestamp: 'Just now',
          status: 'completed',
          details: `Smart tamper conductive seal verified intact. Sensor: ${cap}.`,
          icon: 'lock',
          blockchainHash: hash,
        },
      ],
    };

    setBottles(prev => [newBottle, ...prev]);
    setSelectedBottleId(bId);

    setLiveEvents(prev => [
      {
        id: `live-${Date.now()}`,
        timestamp: 'Just now',
        type: 'BOTTLE_REGISTERED',
        title: `Smart Bottle Enrolled: ${bId}`,
        details: `NFC Token ${nfc} paired with Tamper Sensor ${cap}.`,
        hash: hash,
        status: 'success',
        bottleId: bId,
      },
      ...prev,
    ]);
  };

  // Find active items
  const activeProduct = products.find(p => p.id === selectedProductId) || products[0];
  const activeBeekeeper = beekeepers.find(b => b.id === selectedBeekeeperId) || beekeepers[0];
  const activeTrackingOrder = orders.find(o => o.id === activeTrackingOrderId) || orders[0];

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1f1b17] font-sans antialiased selection:bg-[#fcd34d] selection:text-[#1b4332]">
      {/* Role Picker Welcome Modal */}
      {showRoleModal && (
        <WelcomeRoleModal
          onSelectRole={handleSelectRole}
          onClose={() => setShowRoleModal(false)}
        />
      )}

      {/* ========================================================
          1. BEEKEEPER INTERFACE (OPERATIONS & IoT ANALYTICS)
         ======================================================== */}
      {appMode === 'beekeeper' && (
        <div className="flex h-screen overflow-hidden">
          {/* Left Sidebar */}
          <BeekeeperSidebar
            currentTab={beekeeperTab}
            onSelectTab={setBeekeeperTab}
            user={beekeeperUser}
            onSwitchToCustomer={() => setAppMode('customer')}
            alertsCount={2}
          />

          {/* Right Main Content */}
          <div className="flex-1 lg:pl-[260px] flex flex-col min-w-0 overflow-hidden">
            <BeekeeperTopBar
              currentTab={beekeeperTab}
              onSelectTab={setBeekeeperTab}
              user={beekeeperUser}
              onSwitchToCustomer={() => setAppMode('customer')}
              onOpenSettings={() => setBeekeeperTab('settings')}
              hives={hives}
              batches={batches}
              onSelectHive={handleSelectHive}
              onSelectBatch={(code) => {
                setSelectedBatchCode(code);
                setBeekeeperTab('traceability');
              }}
              onOpenDemoControls={() => setShowDemoModal(true)}
              unreadTamperCount={notifications.filter(n => n.unread).length}
            />

            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                {beekeeperTab === 'dashboard' && (
                  <BeekeeperDashboard
                    hives={hives}
                    batches={batches}
                    products={products}
                    orders={orders}
                    bottles={bottles}
                    liveEvents={liveEvents}
                    onNavigate={(tab) => setBeekeeperTab(tab)}
                    onSelectHive={handleSelectHive}
                    onSelectBatch={(code) => {
                      setSelectedBatchCode(code);
                      setBeekeeperTab('traceability');
                    }}
                  />
                )}

                {beekeeperTab === 'bottle_security' && (
                  <div className="space-y-8">
                    <BeekeeperBottleSecurity
                      bottles={bottles}
                      selectedBottleId={selectedBottleId}
                      onSelectBottle={setSelectedBottleId}
                      onSimulateCapOpening={handleSimulateCapOpening}
                      onNavigateToTraceability={(code) => {
                        setSelectedBatchCode(code);
                        setBeekeeperTab('traceability');
                      }}
                      onOpenDemoControls={() => setShowDemoModal(true)}
                    />
                    <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm">
                      <LiveEventFeed
                        events={liveEvents}
                        onClear={() => setLiveEvents([])}
                      />
                    </div>
                  </div>
                )}

                {(beekeeperTab === 'hives' || beekeeperTab === 'hive_details') && (
                  <BeekeeperHiveDetails
                    hives={hives}
                    selectedHiveId={selectedHiveId}
                    onSelectHive={setSelectedHiveId}
                    onToggleAnomaly={handleToggleSimulatedAnomaly}
                    onAddInspectionNote={handleAddInspectionNote}
                    onAddHive={handleAddHive}
                    onNavigateToHealth={() => setBeekeeperTab('ai_health')}
                  />
                )}

                {beekeeperTab === 'ai_health' && (
                  <BeekeeperAIHealth
                    hives={hives}
                    onSelectHive={handleSelectHive}
                    onToggleAnomaly={handleToggleSimulatedAnomaly}
                  />
                )}

                {beekeeperTab === 'predictions' && (
                  <BeekeeperPredictions
                    hives={hives}
                    onSelectHive={handleSelectHive}
                    onCreateBatchFromForecast={() => setBeekeeperTab('batches')}
                  />
                )}

                {beekeeperTab === 'alerts' && (
                  <BeekeeperAlerts
                    hives={hives}
                    onSelectHive={handleSelectHive}
                    onToggleAnomaly={handleToggleSimulatedAnomaly}
                  />
                )}

                {beekeeperTab === 'batches' && (
                  <BeekeeperBatches
                    batches={batches}
                    hives={hives}
                    onCreateBatch={handleCreateBatch}
                    onViewTraceability={(code) => {
                      setSelectedBatchCode(code);
                      setBeekeeperTab('traceability');
                    }}
                    onGenerateQR={(batchId) => {
                      const b = batches.find(item => item.id === batchId);
                      if (b) setSelectedBatchCode(b.batchCode);
                      setBeekeeperTab('qr_generator');
                    }}
                  />
                )}

                {beekeeperTab === 'traceability' && (
                  <BeekeeperTraceability
                    batches={batches}
                    selectedBatchCode={selectedBatchCode}
                    onSelectBatch={setSelectedBatchCode}
                    onAddCustodyStep={handleAddTraceabilityStep}
                    onGenerateQR={(code) => {
                      setSelectedBatchCode(code);
                      setBeekeeperTab('qr_generator');
                    }}
                  />
                )}

                {beekeeperTab === 'my_products' && (
                  <BeekeeperMyProducts
                    products={products}
                    batches={batches}
                    onAddProduct={handleAddProduct}
                    onToggleStatus={handleToggleProductStatus}
                    onViewMarketplace={() => {
                      setAppMode('customer');
                      setCustomerTab('shop');
                    }}
                  />
                )}

                {(beekeeperTab === 'marketplace_performance' || beekeeperTab === 'performance') && (
                  <BeekeeperMarketplacePerformance
                    products={products}
                    onNavigateToProducts={() => setBeekeeperTab('my_products')}
                    onNavigateToOrders={() => setBeekeeperTab('orders')}
                  />
                )}

                {beekeeperTab === 'orders' && (
                  <BeekeeperOrders
                    orders={orders}
                    onUpdateOrderStatus={handleUpdateOrderStatus}
                    onViewTraceability={(code) => {
                      setSelectedBatchCode(code);
                      setBeekeeperTab('traceability');
                    }}
                  />
                )}

                {beekeeperTab === 'qr_generator' && (
                  <BeekeeperQRGenerator
                    batches={batches}
                    selectedBatchId={batches.find(b => b.batchCode === selectedBatchCode)?.id}
                    onPreviewVerification={(code) => {
                      setSelectedBatchCode(code);
                      setAppMode('customer');
                      setCustomerTab('traceability');
                    }}
                  />
                )}

                {beekeeperTab === 'analytics' && (
                  <BeekeeperSalesAnalytics />
                )}

                {beekeeperTab === 'settings' && (
                  <BeekeeperSettings
                    user={beekeeperUser}
                    onUpdateProfile={(up) => setBeekeeperUser(prev => ({ ...prev, ...up }))}
                  />
                )}

                {beekeeperTab === 'how_it_works' && (
                  <HowHoneyChainWorks />
                )}
              </div>
            </main>
          </div>
        </div>
      )}

      {/* ========================================================
          2. CUSTOMER / CONSUMER INTERFACE (MARKETPLACE & AUDIT)
         ======================================================== */}
      {appMode === 'customer' && (
        <div className="min-h-screen flex flex-col">
          {/* Top Navbar */}
          <CustomerNavbar
            currentTab={customerTab}
            onSelectTab={setCustomerTab}
            user={customerUser}
            cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
            wishlistCount={wishlistIds.length}
            onOpenCart={() => setCustomerTab('cart')}
            onOpenAuth={() => setCustomerTab('profile')}
            onSwitchToBeekeeper={() => setAppMode('beekeeper')}
            products={products}
            batches={batches}
            onSelectProduct={(p) => {
              setSelectedProductId(p.id);
              setCustomerTab('product_details');
            }}
            onSelectBatch={(code) => {
              setSelectedBatchCode(code);
              setCustomerTab('traceability');
            }}
            onOpenDemoControls={() => setShowDemoModal(true)}
          />

          {/* Main Marketplace Area */}
          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
            {customerTab === 'home' && (
              <CustomerHome
                products={products}
                beekeepers={beekeepers}
                onNavigate={setCustomerTab}
                onSelectProduct={(p) => {
                  setSelectedProductId(p.id);
                  setCustomerTab('product_details');
                }}
                onSelectBeekeeper={(bk) => {
                  setSelectedBeekeeperId(bk.id);
                  setCustomerTab('beekeeper_profile');
                }}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
              />
            )}

            {customerTab === 'shop' && (
              <CustomerShop
                products={products}
                onSelectProduct={(p) => {
                  setSelectedProductId(p.id);
                  setCustomerTab('product_details');
                }}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
              />
            )}

            {customerTab === 'product_details' && (
              <CustomerProductDetails
                product={activeProduct}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onViewTraceability={(code) => {
                  setSelectedBatchCode(code);
                  setCustomerTab('traceability');
                }}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlistIds.includes(activeProduct.id)}
                onBack={() => setCustomerTab('shop')}
              />
            )}

            {customerTab === 'traceability' && (
              <CustomerTraceability
                batches={batches}
                selectedBatchCode={selectedBatchCode}
                onSelectBatch={setSelectedBatchCode}
                onShopHoney={() => setCustomerTab('shop')}
              />
            )}

            {customerTab === 'dual_verify' && (
              <div className="space-y-8">
                <CustomerDualVerification
                  bottles={bottles}
                  onSimulateCapOpening={handleSimulateCapOpening}
                  onViewTraceability={(code) => {
                    setSelectedBatchCode(code);
                    setCustomerTab('traceability');
                  }}
                />
                <div className="bg-white rounded-3xl p-6 border border-[#d8c3ad]/30 shadow-sm max-w-4xl mx-auto">
                  <LiveEventFeed
                    events={liveEvents}
                    onClear={() => setLiveEvents([])}
                  />
                </div>
              </div>
            )}

            {(customerTab === 'qr_verify' || customerTab === 'qr_scanner') && (
              <CustomerQRScanner
                batches={batches}
                onViewTraceability={(code) => {
                  setSelectedBatchCode(code);
                  setCustomerTab('traceability');
                }}
                onNavigateToDualVerify={() => setCustomerTab('dual_verify')}
              />
            )}

            {customerTab === 'cart' && (
              <CustomerCart
                items={cart}
                onUpdateQuantity={handleUpdateCartQuantity}
                onRemoveItem={handleRemoveCartItem}
                onProceedToCheckout={() => setCustomerTab('checkout')}
                onContinueShopping={() => setCustomerTab('shop')}
              />
            )}

            {customerTab === 'checkout' && (
              <CustomerCheckout
                items={cart}
                onPlaceOrder={handlePlaceOrder}
                onBackToCart={() => setCustomerTab('cart')}
              />
            )}

            {customerTab === 'order_confirmation' && latestPlacedOrder && (
              <CustomerOrderConfirmation
                order={latestPlacedOrder}
                onTrackOrder={(orderId) => {
                  setActiveTrackingOrderId(orderId);
                  setCustomerTab('order_tracking');
                }}
                onViewTraceability={(code) => {
                  setSelectedBatchCode(code);
                  setCustomerTab('traceability');
                }}
                onContinueShopping={() => setCustomerTab('shop')}
              />
            )}

            {(customerTab === 'my_orders' || customerTab === 'orders') && (
              <CustomerMyOrders
                orders={orders}
                onTrackOrder={(orderId) => {
                  setActiveTrackingOrderId(orderId);
                  setCustomerTab('order_tracking');
                }}
                onViewTraceability={(code) => {
                  setSelectedBatchCode(code);
                  setCustomerTab('traceability');
                }}
                onShopHoney={() => setCustomerTab('shop')}
              />
            )}

            {customerTab === 'order_tracking' && (
              <CustomerOrderTracking
                order={activeTrackingOrder}
                onViewTraceability={(code) => {
                  setSelectedBatchCode(code);
                  setCustomerTab('traceability');
                }}
                onBackToOrders={() => setCustomerTab('my_orders')}
              />
            )}

            {customerTab === 'beekeepers' && (
              <CustomerBeekeepers
                beekeepers={beekeepers}
                onSelectBeekeeper={(bk) => {
                  setSelectedBeekeeperId(bk.id);
                  setCustomerTab('beekeeper_profile');
                }}
              />
            )}

            {customerTab === 'beekeeper_profile' && (
              <CustomerBeekeeperProfile
                beekeeper={activeBeekeeper}
                products={products}
                batches={batches}
                onSelectProduct={(p) => {
                  setSelectedProductId(p.id);
                  setCustomerTab('product_details');
                }}
                onAddToCart={handleAddToCart}
                onViewTraceability={(code) => {
                  setSelectedBatchCode(code);
                  setCustomerTab('traceability');
                }}
                onBack={() => setCustomerTab('beekeepers')}
              />
            )}

            {customerTab === 'wishlist' && (
              <CustomerWishlist
                products={products}
                wishlistIds={wishlistIds}
                onSelectProduct={(p) => {
                  setSelectedProductId(p.id);
                  setCustomerTab('product_details');
                }}
                onAddToCart={handleAddToCart}
                onRemoveWishlist={handleToggleWishlist}
                onShopHoney={() => setCustomerTab('shop')}
              />
            )}

            {customerTab === 'profile' && (
              <CustomerProfile
                user={customerUser}
                orders={orders}
                onUpdateUser={(up) => setCustomerUser(prev => ({ ...prev, ...up }))}
                onSwitchToBeekeeper={() => setAppMode('beekeeper')}
              />
            )}

            {customerTab === 'how_it_works' && (
              <HowHoneyChainWorks />
            )}
          </main>

          {/* Customer Footer */}
          <footer className="bg-white border-t border-[#d8c3ad]/40 mt-16 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
              <div className="space-y-3 md:col-span-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#855300] flex items-center justify-center text-white font-bold">
                    🍯
                  </div>
                  <span className="text-base font-black text-[#1f1b17]">Honey Chain</span>
                </div>
                <p className="text-[#534434] max-w-sm leading-relaxed">
                  Decentralized Smart Hive Monitoring & Direct-to-Consumer Honey Traceability Platform. Connecting artisanal Indian beekeepers with conscious honey lovers.
                </p>
                <div className="text-[11px] text-[#867461]">
                  © 2026 Honey Chain Technologies. Immutable Ledger Standards.
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-black text-[#1f1b17] uppercase tracking-wider text-[11px]">
                  Marketplace & Trust
                </div>
                <ul className="space-y-1.5 text-[#534434]">
                  <li>
                    <button onClick={() => setCustomerTab('shop')} className="hover:text-[#855300]">
                      Shop Honey
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setCustomerTab('traceability')} className="hover:text-[#855300]">
                      Verify Batch Provenance
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setCustomerTab('beekeepers')} className="hover:text-[#855300]">
                      Our Beekeepers
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setCustomerTab('how_it_works')} className="hover:text-[#855300]">
                      How It Works
                    </button>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="font-black text-[#1f1b17] uppercase tracking-wider text-[11px]">
                  Portals & Modes
                </div>
                <ul className="space-y-1.5 text-[#534434]">
                  <li>
                    <button
                      onClick={() => {
                        setAppMode('beekeeper');
                        setBeekeeperTab('dashboard');
                      }}
                      className="text-[#855300] font-bold hover:underline"
                    >
                      🐝 Beekeeper Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setShowRoleModal(true)}
                      className="hover:text-[#855300]"
                    >
                      🔄 Role Switcher Modal
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setCustomerTab('qr_scanner')} className="hover:text-[#855300]">
                      📱 Smart QR Scanner
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* Interactive Hardware & Demo Simulation Modal */}
      <DemoControlsModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        bottles={bottles}
        hives={hives}
        batches={batches}
        onSimulateCapOpening={handleSimulateCapOpening}
        onSimulateDuplicateQR={() => handleSimulateDuplicateQR(selectedBottleId)}
        onSimulateNFCReuse={() => handleSimulateNFCReuse(selectedBottleId)}
        onSimulateHiveAlert={() => handleSimulateHiveAlert(selectedHiveId)}
        onSimulateHoneyHarvest={() => handleSimulateHoneyHarvest(selectedBatchCode)}
        onCreateNewBatch={handleCreateNewBatchDemo}
        onGenerateBottle={handleGenerateNewBottleDemo}
      />
    </div>
  );
}

export default App;
