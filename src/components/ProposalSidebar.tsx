import { CheckCircle } from "lucide-react";
import { ProposalProgress } from "./ProposalProgress";
import type { ProposalSidebarProps } from "./types";

export function ProposalSidebar({ proposal }: ProposalSidebarProps) {
  return (
    <div className="space-y-4">
      <section className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Author</h2>
        <div className="flex items-center gap-3">
          <img
            src={proposal.author.avatar}
            alt={proposal.author.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900">{proposal.author.name}</p>
            <p className="text-sm text-gray-500">
              @{proposal.author.accountId}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Funding Ask
        </h2>
        <div className="mb-1">
          <span className="text-2xl font-bold text-gray-900">
            {proposal.fundingAmount.amount.toLocaleString()}{" "}
            {proposal.fundingAmount.currency}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          Requested in{" "}
          {proposal.snapshot.body.requested_sponsorship_paid_in_currency}
        </p>
      </section>

      <section className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Verification Status
        </h2>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <div>
            <p className="font-medium text-gray-900">
              {proposal.verification.provider}
            </p>
            <p className="text-sm text-gray-500">
              {proposal.verification.status}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Requested Sponsor
        </h2>
        <div className="flex items-center gap-3">
          <img
            src={proposal.sponsor.avatar}
            alt={proposal.sponsor.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900">{proposal.sponsor.name}</p>
            <p className="text-sm text-gray-500">
              @{proposal.sponsor.accountId}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Proposal Progress
        </h2>
        <ProposalProgress progress={proposal.progress} />
      </section>
    </div>
  );
}
