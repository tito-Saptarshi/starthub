import { HiringOption } from '@/lib/types'
import { ToastSimple } from './ToasterConnect'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

interface HiringOptionDetailsProps {
  hiringOption: HiringOption;
  investorId: string;
}



export default async function HiringOptionDetails({ hiringOption,investorId }: HiringOptionDetailsProps) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
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
      <p className='mt-2'>Status: {hiringOption.accept ? ("Not available"):("available")}</p>
      {/* <Button className='mt-3' variant={'outline'}>Connect</Button> */}
      {!hiringOption.accept && <ToastSimple investorId={investorId} innovatorId={user.id}/>}
    </div>
  )
}

