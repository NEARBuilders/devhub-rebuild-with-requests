import { useState } from "react";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  Image,
  Hash,
  Quote,
} from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "../lib/utils";

interface CommentFormProps {
  onSubmit: (content: string) => void;
  className?: string;
}

export function CommentForm({ onSubmit, className }: CommentFormProps) {
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => setMode("write")}
            className={cn(
              "px-4 py-2 text-sm font-medium",
              mode === "write"
                ? "text-gray-900 bg-white"
                : "text-gray-500 hover:text-gray-700 bg-gray-50",
            )}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={cn(
              "px-4 py-2 text-sm font-medium",
              mode === "preview"
                ? "text-gray-900 bg-white"
                : "text-gray-500 hover:text-gray-700 bg-gray-50",
            )}
          >
            Preview
          </button>
        </div>

        {mode === "write" ? (
          <>
            <div className="border-b border-gray-200 bg-gray-50 px-3 py-2 flex gap-2">
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-900 rounded"
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-900 rounded"
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-900 rounded"
                title="Link"
              >
                <LinkIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-900 rounded"
                title="Quote"
              >
                <Quote className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-900 rounded"
                title="Code"
              >
                <Hash className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-500 hover:text-gray-900 rounded"
                title="Image"
              >
                <Image className="h-4 w-4" />
              </button>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add your comment here..."
              rows={6}
              className="w-full px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none"
            />
          </>
        ) : (
          <div className="px-4 py-2 min-h-[150px] bg-gray-50">
            {content || (
              <span className="text-gray-500">Nothing to preview</span>
            )}
          </div>
        )}

        <div className="bg-gray-50 px-4 py-3 text-right border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            lines: {content.split("\n").length} words:{" "}
            {content.split(/\s+/).filter(Boolean).length}
          </div>
          <Button type="submit" disabled={!content.trim()}>
            Comment
          </Button>
        </div>
      </div>
    </form>
  );
}
