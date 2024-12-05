import { Check, Circle } from 'lucide-react';
import type { ProposalProgress as Progress } from '../lib/sdk';

interface ProposalProgressProps {
  progress: Progress;
}

export function ProposalProgress({ progress }: ProposalProgressProps) {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {progress.steps.map((step, stepIdx) => (
          <li key={step.title}>
            <div className="relative pb-8">
              {stepIdx !== progress.steps.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
                      ${step.status === 'completed' ? 'bg-green-500' : 
                        step.status === 'current' ? 'bg-blue-500' : 'bg-gray-200'}`}
                  >
                    {step.status === 'completed' ? (
                      <Check className="h-5 w-5 text-white" />
                    ) : step.status === 'current' ? (
                      <Circle className="h-5 w-5 text-white" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-500" />
                    )}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4">
                  <div>
                    <p className="font-medium text-gray-900">{step.title}</p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                    {step.items && (
                      <ul className="mt-2 space-y-1">
                        {step.items.map((item, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <input
                              type="checkbox"
                              checked={item.checked}
                              readOnly
                              className="h-4 w-4 rounded border-gray-300 text-blue-600"
                            />
                            <span className="text-gray-600">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
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