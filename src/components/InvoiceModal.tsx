import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useState } from 'react';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  proposal: {
    fundingAmount: {
      amount: number;
      currency: string;
    };
    recipient: {
      accountId: string;
    };
  };
}

export function InvoiceModal({ isOpen, onClose, onSubmit, proposal }: InvoiceModalProps) {
  const [invoiceData, setInvoiceData] = useState({
    amount: proposal.fundingAmount.amount,
    currency: proposal.fundingAmount.currency,
    recipient: proposal.recipient.accountId,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(invoiceData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Create Invoice
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <Input
                type="number"
                value={invoiceData.amount}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, amount: Number(e.target.value) }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <Input
                value={invoiceData.currency}
                disabled
                className="w-full bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Address
              </label>
              <Input
                value={invoiceData.recipient}
                disabled
                className="w-full bg-gray-50"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#00CC8E] hover:bg-[#00b37e] text-white"
              >
                Create Invoice
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}