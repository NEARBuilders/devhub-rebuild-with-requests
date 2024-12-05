import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-green-400 to-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-8 lg:mb-0">
              <h1 className="text-5xl font-bold text-white mb-6">
                The decentralized
                <br />
                <span className="text-black">home base</span>
                <br />
                for NEAR builders
              </h1>
              <p className="text-xl text-white mb-8">
                Join a vibrant community of innovators shaping the open web.
              </p>
              <a
                href="/proposals"
                className="inline-flex items-center px-6 py-3 border border-black text-base font-medium rounded-md text-black bg-white hover:bg-gray-50"
              >
                Read more →
              </a>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
                alt="Developer workspace"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
