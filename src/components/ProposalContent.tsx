import { EventActivity } from './EventActivity';
import { CommentForm } from './CommentForm';
import type { ProposalContentProps } from './types';

export function ProposalContent({ proposal }: ProposalContentProps) {
  const handleComment = (content: string) => {
    // In a real app, this would submit to an API
    console.log('New comment:', content);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">PROPOSAL CATEGORY</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                📋
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{proposal.category.name}</h3>
                <p className="text-gray-600">{proposal.category.description}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SUMMARY</h2>
          <p className="text-gray-600">{proposal.snapshot.body.summary}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">DESCRIPTION</h2>
          <div className="prose prose-gray max-w-none">
            {proposal.snapshot.body.description}
          </div>
        </section>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">EVENT ACTIVITY</h2>
        <EventActivity comments={proposal.comments} />
        <div className="mt-6">
          <CommentForm onSubmit={handleComment} />
        </div>
      </div>
    </div>
  );
}