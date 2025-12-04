export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  instructions: string;
  tags: string[];
  optionalTags: string[] | null;
  requiredMetadata: any;
  allowedCountries: string[] | null;
  targetQuantity: number; // Target number of photos
  totalCollected: number; // Current number of photos collected
  basePayout: string | number;
  bonusPayout: string | number | null;
  maxUploadsPerUser: number;
  totalBudget: number | null;
  status: 'ACTIVE' | 'INACTIVE'; // Status enum
  priority: number;
  startsAt: string | null; // Start date
  endsAt: string | null; // End date
  createdAt: string;
  updatedAt: string;
}

export interface Upload {
  id: string;
  userId: string;
  campaignId: string | null;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';

  // File information
  filePath: string;
  fileSizeBytes: number | null;
  mimeType: string | null;
  originalFilename: string | null;

  // Image metadata
  width: number | null;
  height: number | null;
  exifData: any;

  // User-provided data
  userTags: any;
  userNotes: string | null;

  // AI-generated data
  aiTags: any;
  aiQualityScore: number | null;
  aiMetadata: any;

  // Moderation
  reviewedById: string | null;
  reviewedAt: string | null;
  rejectionReason: string | null;

  // Payout
  payoutAmount: number | null;
  payoutStatus: string | null;
  paidAt: string | null;

  // Timestamps
  createdAt: string;
  updatedAt: string;

  // Relations
  user?: {
    id: string;
    fullName: string;
    email: string;
  };
  campaign?: {
    id: string;
    title: string;
  };
}

export interface Stats {
  totalUsers: number;
  totalCampaigns: number;
  totalUploads: number;
  pendingUploads: number;
  approvedUploads: number;
  rejectedUploads: number;
  totalEarnings: number;
  averageQualityScore: number;
}
