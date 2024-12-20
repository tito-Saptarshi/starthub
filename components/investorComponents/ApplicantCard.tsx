
import prisma from '@/app/lib/db';
import Image from 'next/image'
import Link from 'next/link'
import { ToasterConfirm } from './ToasterConfirm';
import { Button } from '../ui/button';

interface ApplicantCardProps {
  investorId: string;
  innovatorId: string;
  projectId: string;
}

async function confirmBooking(id: string) {
  return prisma.hiringOption.findUnique({
    where : {
      id: id
    }
  })
}

async function getData(id:string) {
  return prisma.investor.findUnique({
    where: {
      id: id,
    }, include : {
      user: true,
    }
  })
}

export default async function ApplicantCard({ investorId, innovatorId, projectId }: ApplicantCardProps) {

  const data = await getData(investorId);
  const booking = await confirmBooking(projectId);
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center mb-4">
        {data?.user.imageUrl && <Image
          src={data?.user.imageUrl}
          alt={data.user.name}
          width={50}
          height={50}
          className="rounded-full mr-4"
        />}
        {data?.user.name && <h2 className="text-xl font-semibold">{data?.user.name}</h2>}
      </div>
      <div className="flex justify-between items-center">
        <Link
          href={`/profile/${data?.user.id}`}
          className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          View Profile
        </Link>
        {!booking?.accept ? (<ToasterConfirm innovatorId={innovatorId} investorId={investorId} projectId={projectId}/>) : (<Button disabled>Hiring Done</Button> )}
      </div>
    </div>
  )
}

