import { Investment } from '@/lib/types'

interface InvestmentDetailsProps {
  investment: Investment
}

export default function InvestmentDetails({ investment }: InvestmentDetailsProps) {
  return (
    <div className="bg-blue-50 p-4 rounded-md">
      <p className="font-semibold">Value: ${investment.value.toLocaleString()}</p>
      {investment.description && (
        <p className="text-sm mt-2">{investment.description}</p>
      )}
    </div>
  )
}

