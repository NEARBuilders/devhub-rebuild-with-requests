import { proposals } from '../data/proposals';
import type { Proposal, ProposalWithUI } from './types';

// Helper function to transform a Proposal into ProposalWithUI
function enrichProposalWithUI(proposal: Proposal): ProposalWithUI {
  return {
    ...proposal,
    author: {
      name: proposal.author_id.toString().split('.')[0],
      accountId: proposal.author_id.toString(),
      avatar: `https://i.pravatar.cc/150?u=${proposal.author_id}`
    },
    category: {
      name: proposal.snapshot.body.category,
      description: 'Provide support, gather feedback, and maintain docs to drive engagement.'
    },
    status: proposal.snapshot.body.timeline,
    fundingAmount: {
      amount: proposal.snapshot.body.requested_sponsorship_usd_amount,
      currency: proposal.snapshot.body.requested_sponsorship_paid_in_currency
    },
    recipient: {
      name: proposal.snapshot.body.receiver_account.toString().split('.')[0],
      accountId: proposal.snapshot.body.receiver_account.toString(),
      avatar: `https://i.pravatar.cc/150?u=${proposal.snapshot.body.receiver_account}`
    },
    verification: {
      provider: 'Fractal',
      status: 'Verified'
    },
    sponsor: {
      name: 'NEAR DevDAO',
      accountId: proposal.snapshot.body.requested_sponsor.toString(),
      avatar: `https://i.pravatar.cc/150?u=${proposal.snapshot.body.requested_sponsor}`
    },
    comments: [
      {
        id: '1',
        author: {
          name: proposal.author_id.toString().split('.')[0],
          accountId: proposal.author_id.toString(),
          avatar: `https://i.pravatar.cc/150?u=${proposal.author_id}`
        },
        type: 'TERMS_ACCEPTANCE',
        content: "accepted DevHub's Terms and Conditions",
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ],
    progress: {
      currentStep: 3,
      steps: [
        {
          title: '1) Draft',
          description: 'Proposal submitted successfully',
          status: 'completed'
        },
        {
          title: '2) Review',
          description: 'Work groups may request attestations.',
          status: 'completed',
          items: [
            { text: 'Sponsor provides feedback', checked: true },
            { text: 'Reviewer completes attestations', checked: true },
            { text: 'Sponsor verifies KYC/KYB', checked: true }
          ]
        },
        {
          title: '3) Decision',
          description: 'Sponsor makes final decision',
          status: 'completed',
          items: [
            { text: 'Approved', checked: true },
            { text: 'Approved - Conditional', checked: false },
            { text: 'Rejected', checked: false },
            { text: 'Canceled', checked: false }
          ]
        },
        {
          title: '4) Payment Processing',
          description: 'Awaiting invoice submission',
          status: 'upcoming'
        },
        {
          title: '5) Funded',
          description: 'No Payouts yet',
          status: 'upcoming'
        }
      ]
    }
  };
}

export async function getProposals(): Promise<ProposalWithUI[]> {
  return proposals.map(enrichProposalWithUI);
}

export async function getProposal(id: string): Promise<ProposalWithUI | null> {
  const proposal = proposals.find(p => p.id === id);
  return proposal ? enrichProposalWithUI(proposal) : null;
}