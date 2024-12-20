import prisma from '@/app/lib/db'
import Link from 'next/link'

interface JobCardProps {
  id: string
  title: string
  applicants: number
}

async function getCount(id: string) {
  return await prisma.innovatorHiring.count({
    where: {
      projectId: id
    }
  })
}

export default async function JobCard({ id, title, applicants }: JobCardProps) {
  const count = await getCount(id);
  return (
    <Link href={`/investor/dashboard/hiring/${id}`}>
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">
          {applicants} applications - {count}
        </p>
      </div>
    </Link>
  )
}

