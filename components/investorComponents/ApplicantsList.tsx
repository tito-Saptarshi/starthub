import prisma from "@/app/lib/db";
import ApplicantCard from "./ApplicantCard"

async function getData(id: string) {
  return prisma.innovatorHiring.findMany({
    where: {
      projectId: id,
    }
  });
}

// interface Applicant {
//   id: number
//   name: string
//   photo: string
// }

// const applicants: Record<number, Applicant[]> = {
//   1: [
//     { id: 1, name: 'John Doe', photo: '/placeholder.svg?height=100&width=100' },
//     { id: 2, name: 'Jane Smith', photo: '/placeholder.svg?height=100&width=100' },
//     { id: 3, name: 'Bob Johnson', photo: '/placeholder.svg?height=100&width=100' },
//   ],
//   2: [
//     { id: 4, name: 'Alice Brown', photo: '/placeholder.svg?height=100&width=100' },
//     { id: 5, name: 'Charlie Davis', photo: '/placeholder.svg?height=100&width=100' },
//   ],
//   // Add more applicants for other job IDs...
// }

export default async function ApplicantsList({projectId} : {projectId : string}) {
  // const jobApplicants = applicants[jobId] || []
  const data = await getData(projectId);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((applicant) => (
        <ApplicantCard key={applicant.id} {...applicant} />
      ))}
    </div>
  )
}

