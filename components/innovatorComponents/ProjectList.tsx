import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectData } from "@/lib/types";
import prisma from "@/app/lib/db";

interface ProjectListProps {
  projects: ProjectData[];
}

async function getCountCollab(projectId: string) {
  return prisma.collab.count({
    where: {
      projectId: projectId,
    },
  });
}

async function getCountBids(projectId: string) {
  return prisma.bids.count({
    where: {
      projectId: projectId,
    },
  });
}

async function fetchProjectsWithCounts(projects: ProjectData[]) {
  const projectsWithCounts = await Promise.all(
    projects.map(async (project) => {
      const collaborations =
        project.project_type === "collab"
          ? await getCountCollab(project.id)
          : null;

      const bids =
        project.project_type === "sell" || project.project_type === "fund"
          ? await getCountBids(project.id)
          : null;

      return {
        ...project,
        collaborations,
        bids,
      };
    })
  );

  return projectsWithCounts;
}

export async function ProjectList({ projects }: ProjectListProps) {
  const projectsWithCounts = await fetchProjectsWithCounts(projects);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projectsWithCounts.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge>{project.project_type}</Badge>
            <p className="mt-2">
              {project.project_type === "collab" &&
                `Collaborations: ${project.collaborations}`}
              {(project.project_type === "sell" ||
                project.project_type === "fund") &&
                `Bids: ${project.bids}`}
            </p>
          </CardContent>
          <CardFooter>
            <Link href={`/all-projects/projects/${project.id}`} passHref>
              <Button>See More</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
