import { Share } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/Button";
import { InvoiceModal } from "./InvoiceModal";
import type { ProposalHeaderProps } from "./types";

export function ProposalHeader({
  proposal,
  onOpenInvoiceModal,
}: ProposalHeaderProps) {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const handleCreateInvoice = (data: any) => {
    // In a real app, this would submit to Request Network
    console.log("Creating invoice:", data);
  };

  const showInvoiceButton =
    proposal.status === "APPROVED" &&
    !proposal.progress.steps.find(
      (step) =>
        step.title.includes("Payment Processing") && step.status === "current",
    );

  return (
    <div className="flex flex-col gap-4 border-b border-gray-200 pb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {proposal.snapshot.body.name}
        </h1>
        <div className="flex items-center gap-3">
          {showInvoiceButton && (
            <Button
              onClick={onOpenInvoiceModal}
              className="bg-[#00CC8E] hover:bg-[#00b37e] text-white"
            >
              Create Invoice
            </Button>
          )}
          <button className="text-gray-500 hover:text-gray-700">
            <Share className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <span className="inline-flex items-center rounded-md bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">
          {proposal.status}
        </span>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <img
            src={proposal.author.avatar}
            alt={proposal.author.name}
            className="h-6 w-6 rounded-full"
          />
          <span>{proposal.author.accountId}</span>
          <span>
            created on {new Date(proposal.snapshot.timestamp).toLocaleString()}
          </span>
        </div>
      </div>

      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        onSubmit={handleCreateInvoice}
        proposal={proposal}
      />
    </div>
  );
}
