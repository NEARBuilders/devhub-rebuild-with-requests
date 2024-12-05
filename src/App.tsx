import { useEffect, useState } from 'react';
import { getProposal, type Proposal } from './lib/sdk';
import { Navbar } from './components/Navbar';
import { ProposalHeader } from './components/ProposalHeader';
import { ProposalContent } from './components/ProposalContent';
import { ProposalSidebar } from './components/ProposalSidebar';

export default function App() {
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProposal('267')
      .then(setProposal)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Proposal not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <ProposalHeader proposal={proposal} />
            
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
      </div>
    </div>
  );
}