export type AccountId = string;
export type BlockHeight = string;
export type Timestamp = string;
export type PostTag = string;
export type ProposalId = string;
export type RFPId = string;

export type ProposalFundingCurrency = 'NEAR' | 'USDC' | 'OTHER';
export type TimelineStatus = 
  | 'DRAFT'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'APPROVED_CONDITIONAL'
  | 'REJECTED'
  | 'CANCELED'
  | 'PAYMENT_PROCESSING'
  | 'FUNDED';

export interface Proposal {
  id: ProposalId;
  author_id: AccountId;
  social_db_post_block_height: BlockHeight;
  snapshot: ProposalSnapshot;
  snapshot_history: ProposalSnapshot[];
}

export interface ProposalSnapshot {
  editor_id: AccountId;
  timestamp: Timestamp;
  labels: Set<PostTag>;
  body: ProposalBodyV2;
}

export interface ProposalBodyV2 {
  name: string;
  category: string;
  summary: string;
  description: string;
  linked_proposals: ProposalId[];
  requested_sponsorship_usd_amount: number;
  requested_sponsorship_paid_in_currency: ProposalFundingCurrency;
  receiver_account: AccountId;
  requested_sponsor: AccountId;
  supervisor?: AccountId;
  timeline: TimelineStatus;
  linked_rfp?: RFPId;
}

// UI-specific types
export interface ProposalWithUI {
  id: ProposalId;
  author_id: AccountId;
  social_db_post_block_height: BlockHeight;
  snapshot: ProposalSnapshot;
  snapshot_history: ProposalSnapshot[];
  author: {
    name: string;
    accountId: string;
    avatar: string;
  };
  category: {
    name: string;
    description: string;
  };
  status: TimelineStatus;
  fundingAmount: {
    amount: number;
    currency: ProposalFundingCurrency;
  };
  recipient: {
    name: string;
    accountId: string;
    avatar: string;
  };
  verification: {
    provider: string;
    status: 'Verified' | 'Pending';
  };
  sponsor: {
    name: string;
    accountId: string;
    avatar: string;
  };
  comments: Comment[];
  progress: ProposalProgress;
}

export interface Comment {
  id: string;
  author: {
    name: string;
    accountId: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  type: 'COMMENT' | 'STATUS_CHANGE' | 'TERMS_ACCEPTANCE';
  metadata?: {
    fromStatus?: string;
    toStatus?: string;
    verificationInfo?: string;
  };
}

export interface ProposalProgress {
  currentStep: number;
  steps: {
    title: string;
    description: string;
    status: 'completed' | 'current' | 'upcoming';
    items?: {
      text: string;
      checked: boolean;
    }[];
  }[];
}