
import InvestorDetails from '@/components/investorComponents/InvestorDetails'
import { getInvestorById } from '@/lib/test'
import { notFound } from 'next/navigation'

export default async function InvestorPage({ params }: { params: { id: string } }) {
  const investor = await getInvestorById(params.id)

  if (!investor) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <InvestorDetails investor={investor} />
    </div>
  )
}

