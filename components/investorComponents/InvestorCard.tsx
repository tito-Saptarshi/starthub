import Link from 'next/link'
import { Investor, Investment, HiringOption } from '@/lib/types'

interface InvestorCardProps {
  investor: Investor & { investment?: Investment; hiringOption?: HiringOption[] }
}

export default function InvestorCard2({ investor }: InvestorCardProps) {
  if (!investor) {
    return null; // Or you could return a placeholder card
  }

  return (
    <Link href={`/investors/${investor.id}`}>
      <div className="bg-white shadow-md rounded-lg p-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
        <h2 className="text-xl font-semibold mb-2">{investor.companyName || 'Unnamed Company'}</h2>
        <p className="text-gray-600 mb-4">{investor.industry || 'Industry not specified'}</p>
        
        {investor.investment && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Investment</h3>
            <p className="text-sm">Value: ${investor.investment.value.toLocaleString()}</p>
          </div>
        )}
        
        {investor.hiringOption && investor.hiringOption.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Hiring Options</h3>
            <p className="text-sm">{investor.hiringOption.length} position(s) available</p>
          </div>
        )}
        
        <div className="mt-4 text-sm text-gray-500">
          <p>Entity: {investor.entity || 'Not specified'}</p>
        </div>
      </div>
    </Link>
  )
}

