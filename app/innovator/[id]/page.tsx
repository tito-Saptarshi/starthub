import prisma from "@/app/lib/db";
import { HeroInnovator } from "@/components/innovatorComponents/HeroInnovator";
import PersonalProjects from "@/components/innovatorComponents/PersonalProjects";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";

async function getData(id: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: id
    },
    include: {
      Innovator: true, // Include the Innovator details
    },
  });

  return data;
}


export default async function page({params} : {params : {id : string}}) {
  const user = await getData(params.id);
  const { getUser } = getKindeServerSession();
  const data = await getUser();
  let admin = false;
  if(data.id === user?.id) {
    admin=true;
  }
  return (
  <div className="p-4">
    <HeroInnovator user={user || ""} admin={admin}/>  
    {/* <PersonalProjects username={params.id}/> */}
     <PersonalProjects userId={params.id}/>
  </div>
  );
}