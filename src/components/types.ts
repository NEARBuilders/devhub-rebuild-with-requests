import type {
  ProposalWithUI,
  Comment,
  ProposalFundingCurrency,
} from "../lib/types";

export interface ProposalHeaderProps {
  proposal: ProposalWithUI;
  onOpenInvoiceModal: () => void;
}

export interface ProposalContentProps {
  proposal: ProposalWithUI;
}

export interface ProposalSidebarProps {
  proposal: ProposalWithUI;
}

export interface EventActivityProps {
  comments: Comment[];
}

export interface CommentFormProps {
  onSubmit: (content: string) => void;
  className?: string;
}

export interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  proposal: {
    fundingAmount: {
      amount: number;
      currency: ProposalFundingCurrency;
    };
    recipient: {
      accountId: string;
    };
  };
}

export interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateInvoice: () => void;
}

export interface CreateProposalFormProps {
  onSubmit: (data: any) => void;
}
