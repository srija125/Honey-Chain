export type AppMode = 'beekeeper' | 'customer';

export type BeekeeperTab = 
  | 'dashboard' 
  | 'hives' 
  | 'hive_details'
  | 'ai_health' 
  | 'predictions' 
  | 'alerts' 
  | 'batches' 
  | 'traceability' 
  | 'bottle_security'
  | 'my_products' 
  | 'orders' 
  | 'marketplace_performance' 
  | 'performance'
  | 'qr_generator' 
  | 'analytics' 
  | 'settings'
  | 'how_it_works';

export type CustomerTab =
  | 'home'
  | 'shop'
  | 'product_details'
  | 'beekeepers'
  | 'beekeeper_profile'
  | 'traceability'
  | 'qr_verify'
  | 'qr_scanner'
  | 'dual_verify'
  | 'cart'
  | 'checkout'
  | 'order_confirmation'
  | 'my_orders'
  | 'orders'
  | 'order_tracking'
  | 'wishlist'
  | 'profile'
  | 'how_it_works';

export type TabType = BeekeeperTab | CustomerTab | 'welcome';

export type HiveStatus = 'healthy' | 'attention' | 'critical';

export interface HiveMetrics {
  tempStability: number;
  humidityVariance: number;
  weightGrowth: number;
  environmentalConsistency: number;
  historicalPattern?: number;
}

export interface HiveTelemetry {
  id: string;
  code: string;
  name: string;
  location: string;
  cluster: string;
  internalTemp: number;
  humidity: number;
  weight: number;
  weightChange24h: string;
  status: HiveStatus;
  healthScore: number;
  telemetryStatus: 'Online' | 'Offline' | 'Syncing';
  lastPing: string;
  batteryLevel?: number;
  connectivity?: string;
  metrics: HiveMetrics;
  notes?: string;
  isSimulatedAbnormal?: boolean;
  abnormalConditionName?: string;
}

export interface ApiaryAlert {
  id: string;
  hiveId: string;
  hiveCode: string;
  hiveLocation: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  acknowledged?: boolean;
  type?: string;
}

export interface CustodyStep {
  id?: string;
  step?: string;
  stageName?: string;
  title?: string;
  description?: string;
  details?: string;
  timestamp: string;
  location?: string;
  operatorName?: string;
  responsibleParty?: string;
  hash?: string;
  status?: 'completed' | 'pending';
  icon: string;
}

export interface HoneyBatch {
  id: string;
  batchId?: string;
  batchCode?: string;
  sourceHiveId?: string;
  status: 'Packaged' | 'Extracted' | 'Processing' | 'Distributed';
  quantityKg: number;
  sourceHiveCode: string;
  sourceLocation: string;
  honeyType: string;
  beekeeperId?: string;
  beekeeperName?: string;
  harvestDate?: string;
  extractedDate: string;
  processingDate?: string;
  processingFacility?: string;
  packagedDate?: string;
  packagingCenter?: string;
  moisturePercentage?: number;
  qualityDocs?: string[];
  qrCodeUrl?: string;
  txHash?: string;
  blockchainHash?: string;
  verified: boolean;
  steps?: CustodyStep[];
  traceabilitySteps?: CustodyStep[];
}

export type HoneyCategory = 
  | 'Raw' 
  | 'Forest' 
  | 'Multi-floral' 
  | 'Mustard' 
  | 'Litchi' 
  | 'Organic'
  | string;

export interface HoneyProduct {
  id: string;
  title?: string;
  name?: string;
  description: string;
  honeyType: HoneyCategory;
  size?: string;
  weightGrams?: number;
  availableSizes?: string[];
  price: number;
  originalPrice?: number;
  stock?: number;
  stockQuantity?: number;
  batchId?: string;
  batchCode?: string;
  sourceHiveCode: string;
  sourceLocation: string;
  harvestDate: string;
  beekeeperId: string;
  beekeeperName: string;
  beekeeperLocation: string;
  processingFacility: string;
  packagingCenter: string;
  imageUrl: string;
  galleryImages?: string[];
  rating: number;
  reviewCount?: number;
  reviewsCount?: number;
  status: 'active' | 'paused';
  traceabilityVerified?: boolean;
  isVerifiedTraceable?: boolean;
  tastingNotes?: string[];
  isOrganic?: boolean;
  viewsCount?: number;
  ordersCount?: number;
}

export interface BeekeeperProfile {
  id: string;
  name: string;
  farmName: string;
  location: string;
  region: string;
  hivesCount?: number;
  activeHivesCount?: number;
  experienceYears?: number;
  joinedYear?: number;
  honeyTypes: string[];
  rating: number;
  reviewsCount?: number;
  reviewCount?: number;
  verified?: boolean;
  isVerified?: boolean;
  avatarUrl: string;
  coverUrl?: string;
  about?: string;
  bio?: string;
  journeyStory?: string;
  traceableBatchesCount?: number;
  totalHarvestKg?: number;
}

export interface CartItem {
  product: HoneyProduct;
  quantity: number;
  selectedSize?: string;
}

export interface OrderTrackingStep {
  title?: string;
  statusName?: string;
  description?: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
  icon?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode?: string;
  pinCode?: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber?: string;
  orderCode?: string;
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  items: {
    productId?: string;
    productTitle?: string;
    batchCode?: string;
    product?: HoneyProduct;
    quantity: number;
    weightGrams?: number;
    size?: string;
    price?: number;
    unitPrice?: number;
  }[];
  subtotal?: number;
  shippingFee?: number;
  total?: number;
  totalAmount?: number;
  orderDate?: string;
  createdAt?: string;
  status: 'new' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'New' | 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  paymentMethod: 'upi' | 'card' | 'cod' | 'UPI' | 'Card' | 'Cash on Delivery';
  paymentStatus?: 'Paid' | 'Pending' | 'PAID';
  paymentId?: string;
  shippingAddress: ShippingAddress;
  estimatedDelivery?: string;
  trackingSteps: OrderTrackingStep[];
  batchIds?: string[];
}

export interface InfluenceFactor {
  id: string;
  title: string;
  subtitle: string;
  type: 'positive' | 'neutral' | 'warning';
  icon: string;
  indicatorColor: string;
}

export interface UserAccount {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'beekeeper' | 'processor' | 'distributor' | 'admin' | 'auditor' | 'consumer';
  apiaryCluster?: string;
  avatarUrl: string;
  registeredHivesCount?: number;
  totalBatchesTraced?: number;
}

// ==========================================
// 1. SMART TAMPER-EVIDENT BOTTLE DATA MODEL
// ==========================================

export type CapStatus = 'SEALED' | 'OPENED';

export interface SecurityTimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  status: 'completed' | 'warning' | 'alert' | 'info';
  details: string;
  icon: string;
  blockchainHash?: string;
  txHash?: string;
}

export interface SmartBottle {
  bottle_id: string;              // e.g. HC-BTL-928381
  batch_id: string;               // e.g. HC-2026-0001
  batchCode?: string;             // alias for display
  honeyType: string;
  beekeeperId?: string;
  beekeeperName?: string;
  nfc_token: string;              // e.g. NFC-9F82-A410-E732
  qr_token: string;               // e.g. QR-BTL-928381-SEC
  tamper_sensor_id: string;       // e.g. CAP-SNS-4881
  cap_status: CapStatus;          // 'SEALED' | 'OPENED'
  first_opened_at: string | null; // ISO date / time string or null
  tamper_event_count: number;
  verification_status: 'VERIFIED' | 'TAMPER_DETECTED' | 'UNVERIFIED' | 'SUSPICIOUS';
  blockchain_status: string;      // e.g. 'Anchored on Polygon/Ethereum'
  blockchain_tx?: string;
  blockchain_hash?: string;
  created_at: string;
  dispatch_date?: string;
  delivery_date?: string;
  security_timeline: SecurityTimelineEvent[];
}

export type TamperEventType = 
  | 'CAP_OPENED' 
  | 'SEAL_BROKEN' 
  | 'NFC_REUSE' 
  | 'DUPLICATE_QR' 
  | 'MISMATCH_DETECTED';

export interface TamperEvent {
  event_id: string;
  bottle_id: string;
  sensor_id: string;
  event_type: TamperEventType;
  timestamp: string;
  device_status: string;
  blockchain_hash: string;
  blockchain_tx: string;
  created_at: string;
  notes?: string;
}

export type VerificationType = 'NFC_ONLY' | 'QR_ONLY' | 'DUAL_AUTH';

export type VerificationResult = 
  | 'PRODUCT_VERIFIED' 
  | 'OPENED_AUTHENTIC' 
  | 'POSSIBLE_COUNTERFEIT' 
  | 'IDENTITY_MISMATCH' 
  | 'BLOCKCHAIN_FAILED';

export interface VerificationLog {
  verification_id: string;
  bottle_id: string;
  nfc_token: string;
  qr_token: string;
  verification_type: VerificationType;
  timestamp: string;
  result: VerificationResult;
  cap_status: CapStatus;
  details: string;
}

export type LiveEventType =
  | 'NFC_VERIFIED'
  | 'QR_VERIFIED'
  | 'BATCH_VERIFIED'
  | 'HIVE_HEALTH_UPDATED'
  | 'NEW_HONEY_HARVEST'
  | 'CAP_OPENED'
  | 'DUPLICATE_QR_DETECTED'
  | 'NFC_QR_MISMATCH'
  | 'BLOCKCHAIN_ANCHORED';

export interface LiveEventItem {
  id: string;
  type: LiveEventType;
  title: string;
  description: string;
  timestamp: string;
  severity: 'success' | 'warning' | 'critical' | 'info';
  bottleId?: string;
  batchCode?: string;
  txHash?: string;
}

export interface BottleNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'cap_opened' | 'duplicate_qr' | 'nfc_reuse' | 'nfc_qr_mismatch' | 'blockchain_failed' | 'suspicious' | 'info';
  read: boolean;
  bottleId?: string;
  batchCode?: string;
}

