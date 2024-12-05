import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { CreateProposalForm } from '../components/CreateProposalForm'

export const Route = createFileRoute('/proposal/new')({
  component: CreateProposalPage,
})

function CreateProposalPage() {
  const navigate = useNavigate()

  const handleSubmit = async (data: any) => {
    // In a real app, this would submit to an API
    console.log('Submitting proposal:', data)
    // Navigate to the proposal page (using a dummy ID for now)
    navigate({ to: '/proposal/$id', params: { id: '267' } })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Create Proposal
          </h1>
          <CreateProposalForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
}
