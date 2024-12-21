import prisma from "@/app/lib/db";
import JobCard from "@/components/investorComponents/JobCard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

// const jobRoles = [
//   { id: 1, title: "Frontend Developer", applicants: 15 },
//   { id: 2, title: "Backend Developer", applicants: 12 },
//   { id: 3, title: "UX Designer", applicants: 8 },
//   { id: 4, title: "Data Scientist", applicants: 10 },
//   { id: 5, title: "DevOps Engineer", applicants: 6 },
// ];

async function getData(id: string) {
  const data = await prisma.investor.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      hiringOption: true,
    },
  });

  return data;
}

export default async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getData(user.id);
  console.log("new data " + data?.hiringOption[0].title);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Investment Profile</h1>
      <div className="px-6 flex flex-col">
        <h1>Want to create more hiring options or Update Investment Budget?</h1>
        <Link href={"/investor/options"} className="text-blue-700 hover:text-blue-900 hover:underline">Click Here</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-5">
      <h1 className="text-xl font-bold mt-6">Job Openings</h1>
        {data?.hiringOption.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
}
