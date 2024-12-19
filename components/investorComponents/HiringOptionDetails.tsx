import { HiringOption } from '@/lib/types'

interface HiringOptionDetailsProps {
  hiringOption: HiringOption
}

export default function HiringOptionDetails({ hiringOption }: HiringOptionDetailsProps) {
  return (
    <div className="bg-green-50 p-4 rounded-md mb-2">
      <h4 className="font-semibold">{hiringOption.title}</h4>
      <p>Price: ${hiringOption.price.toLocaleString()}</p>
      {hiringOption.description && (
        <p className="text-sm mt-2">{hiringOption.description}</p>
      )}
      {hiringOption.deadline && (
        <p className="text-sm mt-2">Deadline: {hiringOption.deadline.toLocaleDateString()}</p>
      )}
    </div>
  )
}

