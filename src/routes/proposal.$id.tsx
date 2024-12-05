import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ProposalHeader } from "../components/ProposalHeader";
import { ProposalContent } from "../components/ProposalContent";
import { ProposalSidebar } from "../components/ProposalSidebar";
import { ApprovalModal } from "../components/ApprovalModal";
import { getProposal } from "../lib/sdk";
import { ProposalWithUI } from "../lib/types";

export const Route = createFileRoute("/proposal/$id")({
  loader: async ({ params: { id } }) => {
    const proposal = await getProposal(id);
    if (!proposal) {
      throw new Error("Proposal not found");
    }
    return { proposal };
  },
  component: ProposalPage,
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-600">{error.message || "Proposal not found"}</p>
    </div>
  ),
});

function ProposalPage() {
  const { proposal } = Route.useLoaderData() as { proposal: ProposalWithUI };
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  useEffect(() => {
    if (proposal.status === "APPROVED") {
      setShowApprovalModal(true);
    }
  }, [proposal.status]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <ProposalHeader
            proposal={proposal}
            onOpenInvoiceModal={() => setShowInvoiceModal(true)}
          />

          {/* Mobile: Sidebar appears first */}
          <div className="lg:hidden mt-8">
            <ProposalSidebar proposal={proposal} />
          </div>

          {/* Desktop: Two-column layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8 mt-8">
            <div className="lg:col-span-8">
              <ProposalContent proposal={proposal} />
            </div>
            <div className="lg:col-span-4">
              <ProposalSidebar proposal={proposal} />
            </div>
          </div>

          {/* Mobile: Content appears second */}
          <div className="lg:hidden mt-8">
            <ProposalContent proposal={proposal} />
          </div>
        </div>
      </div>

      <ApprovalModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        onCreateInvoice={() => setShowInvoiceModal(true)}
      />
    </div>
  );
}
