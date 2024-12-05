import { formatDistanceToNow } from "date-fns";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ProposalWithUI } from "../lib/types";
import { Badge } from "./ui/Badge";

interface ProposalCardProps {
  proposal: ProposalWithUI;
}

const statusColors = {
  DRAFT: "yellow",
  IN_REVIEW: "blue",
  PAYMENT_PROCESSING: "orange",
  FUNDED: "green",
  CANCELED: "purple",
} as const;

export function ProposalCard({ proposal }: ProposalCardProps) {
  return (
    <Link
      to="/proposal/$id"
      params={{ id: proposal.id }}
      className="block bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <img
            src={proposal.author.avatar}
            alt={proposal.author.name}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {proposal.snapshot.body.name}
              </h3>
              <Badge
                variant={statusColors[proposal.status] || "blue"}
                className="whitespace-nowrap"
              >
                {proposal.status.replace("_", " ")}
              </Badge>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span>{proposal.author.accountId}</span>
              <span className="hidden sm:inline">·</span>
              <span>
                {formatDistanceToNow(new Date(proposal.snapshot.timestamp), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <div className="mt-2">
              <Badge variant="blue">{proposal.category.name}</Badge>
            </div>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {proposal.snapshot.body.summary}
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>0</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{proposal.comments.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
