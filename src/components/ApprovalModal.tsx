import { Dialog } from "@headlessui/react";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "./ui/Button";

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateInvoice: () => void;
}

export function ApprovalModal({
  isOpen,
  onClose,
  onCreateInvoice,
}: ApprovalModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Fire confetti from the left
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0, y: 0.6 },
      });

      // Fire confetti from the right
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 1, y: 0.6 },
      });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6 text-center">
          <Dialog.Title className="text-2xl font-bold text-gray-900 mb-4">
            🎉 Congratulations!
          </Dialog.Title>

          <p className="text-gray-600 mb-6">
            Your funding request has been approved! You can now proceed with
            creating an invoice to receive your funds.
          </p>

          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={() => {
                onCreateInvoice();
                onClose();
              }}
              className="bg-[#00CC8E] hover:bg-[#00b37e] text-white"
            >
              Create Invoice
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
