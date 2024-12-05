import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { AlertCircle } from "lucide-react";

interface CreateProposalFormProps {
  onSubmit: (data: any) => void;
}

export function CreateProposalForm({ onSubmit }: CreateProposalFormProps) {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    summary: "",
    description: "",
    amount: "",
    currency: "USDC",
    recipientAddress: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
            >
              <option value="">Select Category</option>
              <option value="devrel">Decentralized DevRel</option>
              <option value="platform">DevDAO Platform</option>
              <option value="tooling">Tooling & Infrastructure</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Highlight the essence of your proposal in a few words"
            />
            <p className="mt-1 text-sm text-gray-500">0/80</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Summary
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="Explain your proposal briefly"
            />
            <p className="mt-1 text-sm text-gray-500">0/500</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
              placeholder="Expand on your summary with relevant details"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Funding Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient NEAR Wallet Address
                </label>
                <Input
                  name="recipientAddress"
                  value={formData.recipientAddress}
                  onChange={handleChange}
                  placeholder="your-account.near"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <div className="flex gap-2">
                  <Input
                    name="amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  >
                    <option value="USDC">USDC</option>
                    <option value="NEAR">NEAR</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm text-gray-600">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>
                  Verification through Fractal is required before funds can be
                  distributed. You'll receive instructions after your proposal
                  is approved.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to DevHub's Terms and Conditions
            </label>
          </div>

          <Button type="submit" className="w-full">
            Submit Proposal
          </Button>
        </div>
      </div>
    </form>
  );
}
