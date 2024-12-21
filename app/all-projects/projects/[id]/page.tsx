import prisma from "@/app/lib/db";
import { ProjectDetails } from "@/components/innovatorComponents/ProjectDetails";

async function getProjectData(id: string) {
  return prisma.project.findUnique({
    where: {
      id,
    },
  });
}

async function getInvestorNamesByProjectId(projectId: string) {
  try {
    // Fetch all bids related to the projectId
    const bids = await prisma.bids.findMany({
      where: { projectId },
      include: {
        investor: {
          include: {
            user: true, // Include the User model to access the name
          },
        },
      },
    });

    // Map over the results to extract investor names and bid prices
    const investorDetails = bids.map((bid) => ({
      name: bid.investor?.user?.name || "Unknown",
      price: bid.price,
      investorId: bid.investorId,
    }));

    return investorDetails;
  } catch (error) {
    console.error("Error fetching investor names:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getInnovatorNamesByProjectId(projectId: string) {
  try {
    // Fetch all bids related to the projectId
    const collabs = await prisma.collab.findMany({
      where: { projectId },
      include: {
        innovator: {
          include: {
            user: true, // Include the User model to access the name
          },
        },
      },
    });

    // Map over the results to extract investor names and bid prices
    const investorDetails = collabs.map((collab) => ({
      name: collab.innovator?.user?.name || "Unknown",
      innovatorId: collab.innovator,
    }));

    return investorDetails;
  } catch (error) {
    console.error("Error fetching investor names:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProjectData(params.id);
  const projectUsers = await getInvestorNamesByProjectId(params.id);
  const collabUsers = await getInnovatorNamesByProjectId(params.id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      {project.project_type === "collab" ? (
        <ProjectDetails
          title={project.name}
          type={project.project_type}
          users={collabUsers}
        />
      ) : (
        <ProjectDetails
          title={project.name}
          type={project.project_type}
          users={projectUsers}
        />
      )}
    </div>
  );
}
