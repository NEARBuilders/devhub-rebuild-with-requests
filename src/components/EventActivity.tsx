import { formatDistanceToNow } from "date-fns";
import type { Comment } from "../lib/sdk";

interface EventActivityProps {
  comments: Comment[];
}

export function EventActivity({ comments }: EventActivityProps) {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {comments.map((comment, commentIdx) => (
          <li key={comment.id}>
            <div className="relative pb-8">
              {commentIdx !== comments.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex gap-3">
                <div>
                  <div className="relative">
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50 ring-8 ring-white"
                      src={comment.author.avatar}
                      alt={comment.author.name}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">
                        {comment.author.accountId}
                      </span>
                      {comment.type === "COMMENT" ? (
                        <p className="mt-0.5 text-sm text-gray-500">
                          {comment.content}
                        </p>
                      ) : (
                        <span className="text-gray-500">
                          {" "}
                          {comment.content}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
