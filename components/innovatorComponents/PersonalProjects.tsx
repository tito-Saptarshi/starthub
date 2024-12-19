import prisma from "@/app/lib/db";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";

export async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findMany({
    where: {
      id: userId,
    },
    include: {
      Innovator: {
        include: {
          project: true, // Include all projects related to the Innovator
        },
      },
    },
  });
  return data;
}

export default async function PersonalProjects({ userId }: { userId: string }) {
  const allProjects = await getData(userId);

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-extrabold mb-12 text-center text-white tracking-wide">
          Projects and Innovations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {allProjects[0]?.Innovator?.project?.map((project, index) => {
            const userName = allProjects[0]?.name || "Unknown User";
            // const innovatorRole =
            //   allProjects[0]?.Innovator?.role || "Developer";

            let statusText = "";
            switch (project.project_type) {
              case "sell":
                statusText = `For Sell - Price: $${project.price?.toLocaleString()}`;
                break;
              case "fund":
                statusText = `Requires Funding - Price: $${project.price?.toLocaleString()}`;
                break;
              case "collab":
                statusText = "Open for Collaboration";
                break;
              default:
                statusText = "For Display Purpose";
                break;
            }

            return (
              <Link
                href={`/innovator/${userId}/project/${project.id}`}
                key={index}
                passHref
              >
                <Card className="bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700 hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
                  {/* Image Section with Zoom */}
                  <div className="relative overflow-hidden group">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400">
                          No Image Available
                        </span>
                      </div>
                    )}
                    <span className="absolute bottom-0 left-0 bg-blue-600 text-white px-3 py-1 text-sm font-semibold rounded-tr-lg">
                      {statusText}
                    </span>
                  </div>

                  {/* Card Content */}
                  <CardHeader className="p-4">
                    <CardTitle className="text-white text-2xl font-semibold">
                      {project.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {/* User and Role */}
                    <p className="text-gray-300 mb-2">
                      <span className="font-semibold text-blue-400">
                        Innovator:
                      </span>{" "}
                      {userName}{" "}
                      {allProjects[0]?.Innovator?.role && (
                        <>
                          <span className="px-2 font-semibold text-blue-400">
                            Role:
                          </span>

                          <span>{-allProjects[0]?.Innovator?.role}</span>
                        </>
                      )}
                    </p>

                    {/* Tools Used */}
                    {project.tools_used && (
                      <p className="text-gray-300 mb-2">
                        <span className="font-semibold text-blue-400">
                          Tools Used:
                        </span>{" "}
                        {project.tools_used}
                      </p>
                    )}

                    {/* Progress */}
                    <div className="mb-4">
                      <span className="block text-sm text-gray-300 mb-2 font-medium">
                        Progress: {project.progress}%
                      </span>
                      <div className="w-full bg-orange-400 h-3 rounded-full overflow-hidden relative">
                        <div
                          className="h-full bg-red-600"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Price Information */}
                    {project.price && (
                      <div className="flex items-center text-gray-300">
                        <DollarSign className="h-5 w-5 mr-2 text-green-400" />
                        <span className="text-lg font-medium">
                          Price: ${project.price.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
