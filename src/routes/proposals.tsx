import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { ProposalCard } from "../components/ProposalCard";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { getProposals } from "../lib/sdk";
import type { ProposalWithUI } from "../lib/types";

export const Route = createFileRoute("/proposals")({
  loader: async () => ({
    proposals: await getProposals(),
  }),
  component: ProposalsPage,
});

function ProposalsPage() {
  const { proposals } = Route.useLoaderData() as {
    proposals: ProposalWithUI[];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Proposals{" "}
            <span className="text-gray-500">({proposals.length})</span>
          </h1>
          <Link to="/proposal/new">
            <Button>Submit Proposal</Button>
          </Link>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            Welcome to DevDAO's New Proposal Feed! This dedicated space replaces
            the old activity feed, making it easier to submit and track funding
            requests from DevDAO, the primary organization behind DevHub.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by content"
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Sort: All
            </Button>
            <Button variant="outline" size="sm">
              Category
            </Button>
            <Button variant="outline" size="sm">
              Stage
            </Button>
            <Button variant="outline" size="sm">
              Author
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {proposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      </div>
    </div>
  );
}
