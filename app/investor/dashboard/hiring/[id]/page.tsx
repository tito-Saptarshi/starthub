import prisma from "@/app/lib/db";
import ApplicantsList from "@/components/investorComponents/ApplicantsList";
import { redirect } from "next/navigation";

// const jobRoles = [
//   { id: 1, title: 'Frontend Developer', applicants: 15 },
//   { id: 2, title: 'Backend Developer', applicants: 12 },
//   { id: 3, title: 'UX Designer', applicants: 8 },
//   { id: 4, title: 'Data Scientist', applicants: 10 },
//   { id: 5, title: 'DevOps Engineer', applicants: 6 },
// ]



async function getProjectData(id: string) {
  return prisma.hiringOption.findUnique({
    where: {
      id: id
    },
  });
}

export default async function JobPage({ params }: { params: { id: string } }) {

  const projectData = await getProjectData(params.id);
  // const jobId = parseInt(params.id);
  // const job = jobRoles.find((job) => job.id === jobId);

  // if (!job) {
  //   notFound()
  // }

  console.log("project data : " + projectData);
  
  if(!projectData) return redirect("/");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Applicants for {projectData.title}</h1>
      <ApplicantsList projectId={params.id} />
    </div>
  );
}
