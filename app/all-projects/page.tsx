import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db"
import { redirect } from "next/navigation";
import { ProjectList } from "@/components/innovatorComponents/ProjectList";

async function getData(id:string) {
    return prisma.user.findUnique({
        where : {
            id: id,
        }, include : {
            Innovator: {
                include: {
                    project: true
                }
            }
        }
    })
}

export default async function Home() {
      const { getUser } = getKindeServerSession();
      const user = await getUser();
    
      if (!user) {
        return redirect("/api/auth/login");
      }

      const data = await getData(user?.id ?? "");
      const projects = data?.Innovator?.project;
    
  return (
    <div className="container mx-auto p-16">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      <ProjectList projects={projects} />
    </div>
  )
}

