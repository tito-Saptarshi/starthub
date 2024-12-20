import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BidDialog } from "@/components/innovatorComponents/BidDialog";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/app/lib/db";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import markdownit from "markdown-it";
import { ToasterCollabCreate } from "@/components/innovatorComponents/ToasterCollabCreate";
const md = markdownit();

async function getData(projectId: string) {
  noStore();

  const data = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      Innovator: {
        include: {
          user: true, // Ensure the user relation is fetched
        },
      },
    },
  });

  return data;
}

// This would typically come from an API or database
// const project = {
//   title: "AI-Powered Task Management",
//   creator: "Jane Doe",
//   image: "/placeholder.svg",
//   status: "funding", // 'sale', 'funding', or 'collaboration'
//   amount: 50000,
//   description:
//     "An intelligent task management system that uses AI to prioritize and suggest optimal task completion strategies.",
//   githubRepo: "https://github.com/janedoe/ai-task-manager",
//   hostedLink: "https://ai-task-manager.vercel.app",
//   progress: 75,
//   tools: ["Next.js", "TensorFlow.js", "PostgreSQL", "Vercel"],
//   collaborationRequirements:
//     "Full-stack developer with experience in AI/ML and modern web technologies.",
// };

export default async function ProjectDisplay({
  params,
}: {
  params: { id: string; id2: string };
}) {
  const projectData = await getData(params.id2);
  if (!projectData) return redirect("/");

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let admin = false;
  if (user.id === projectData.Innovator?.id) {
    admin = true;
  }

  const parsedContent = md.render(projectData?.details || "");

  return (
    <div className="container mx-auto px-4 py-8 lg:pl-24 lg:pt-10">
      <h1 className="text-3xl font-bold mb-6">{projectData.name}</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {projectData.imageUrl && (
          <div>
            <Image
              src={projectData.imageUrl}
              alt={projectData.imageUrl}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          </div>
        )}

        <div className="space-y-4">
          <p className="text-xl">
            Created by: {projectData.Innovator?.user.name}
          </p>

          {projectData.project_type === "sell" && (
            <div>
              <Badge>For Sell</Badge>
              <p className="text-2xl font-bold mt-2">
                Price: ${projectData.price}
              </p>
              <BidDialog projectTitle={projectData.name} />
            </div>
          )}

          {projectData.project_type === "fund" && (
            <div>
              <Badge>Seeking Funding</Badge>
              <p className="text-2xl font-bold mt-2">
                Funding Goal: ${projectData.price}
              </p>
              <BidDialog projectTitle={projectData.name} />
            </div>
          )}

          {projectData.project_type === "collab" && (
            <div>
              <ToasterCollabCreate projectId={projectData.id} admin={admin}/>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-2">Project Progress</h2>
            <Progress value={projectData.progress} className="w-full" />
            <p className="text-sm text-gray-600 mt-1">
              {projectData.progress}% Complete
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Tools Used</h2>
            <div className="flex flex-wrap gap-2">
              {/* {project.tools.map((tool, index) => (
                <Badge key={index} variant="secondary">
                  {tool}
                </Badge>
              ))} */}
              {projectData.tools_used}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Links</h2>
            <div className="space-x-4">
              {projectData.github_link && (
                <Link
                  href={projectData.github_link}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Repository
                </Link>
              )}
              {projectData.project_link && (
                <Link
                  href={projectData.project_link}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hosted Link
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Project Description</h2>
        {parsedContent ? (
          <article
            className="prose max-w-4xl font-work-sans break-all"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        ) : (
          <p className="no-result">No details provided</p>
        )}
      </div>
    </div>
  );
}
