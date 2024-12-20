import { Investor } from '@/lib/types'
import InvestmentDetails from './InvestmentDetails'
import HiringOptionDetails from './HiringOptionDetails'

interface InvestorDetailsProps {
  investor: Investor
}

export default function InvestorDetails({ investor }: InvestorDetailsProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-6">{investor.companyName || 'Unnamed Company'}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Investor Details</h2>
          <dl className="grid grid-cols-1 gap-4">
            <div>
              <dt className="font-medium text-gray-500">Address</dt>
              <dd>{investor.address || 'Not provided'}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Job Profile</dt>
              <dd>{investor.jobProfile || 'Not provided'}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Industry</dt>
              <dd>{investor.industry || 'Not specified'}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Tax Number</dt>
              <dd>{investor.taxNumber || 'Not provided'}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Entity</dt>
              <dd>{investor.entity || 'Not specified'}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">LinkedIn</dt>
              <dd>
                {investor.linkedInLink ? (
                  <a href={investor.linkedInLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {investor.linkedInLink}
                  </a>
                ) : (
                  'Not provided'
                )}
              </dd>
            </div>
          </dl>
        </div>
        
        <div>
          {investor.investment && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Investment budget</h2>
              <InvestmentDetails investment={investor.investment} />
            </div>
          )}
          
          {investor.hiringOption && investor.hiringOption.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Hiring Options</h2>
              {investor.hiringOption.map((option) => (
                <HiringOptionDetails key={option.id} hiringOption={option} investorId={option.investorId ?? ""}/>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

