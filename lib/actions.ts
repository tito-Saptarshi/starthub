"use server";

import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function registerInvestor(
  data: Record<string, string>,
  userId: string
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }
  let investor;
  try {
    const newData = await prisma.investor.findUnique({
      where: {
        id: userId,
      },
    });
    if (!newData) {
      investor = await prisma.investor.create({
        data: {
          address: data.address,
          companyName: data.companyName,
          jobProfile: data.jobTitle,
          linkedInLink: data.linkedInOrWebsite,
          industry: data.expertise,
          taxNumber: data.taxId,
          entity: data.legalEntityStatus,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } else {
      investor = await prisma.investor.update({
        where: {
          id: user.id,
        },
        data: {
          address: data.address || "",
          companyName: data.companyName || "",
          jobProfile: data.jobTitle || "",
          linkedInLink: data.linkedInOrWebsite || "",
          industry: data.expertise || "",
          taxNumber: data.taxId || "",
          entity: data.legalEntityStatus || "Individual",
        },
      });
    }

    console.log("Investor registered:", investor);

    return { success: true, message: "Investor registered successfully" };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function submitInvestorOptions(data: Record<string, string>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const {
    option,
    investmentAmount,
    projectType,
    projectBudget,
    projectDetails,
    projectDeadline,
    userId,
  } = data;

  console.log("userData latest");
  console.log(data);
  console.log("option : " + data.option);

  if (!userId) {
    throw new Error("User ID is required.");
  }

  try {
    if (option === "invest") {
      // Create an investment record

      const data = await prisma.investment.findFirst();
      let investment;
      if (!data) {
        investment = await prisma.investment.create({
          data: {
            value: parseInt(investmentAmount, 10), // Ensure the value is stored as an integer
            Investor: {
              connect: {
                id: userId,
              },
            },
          },
        });
      } else {
        investment = await prisma.investment.update({
          where: {
            investorId: userId, // Use investorId as it is unique
          },
          data: {
            value: parseInt(investmentAmount, 10),
          },
        });
      }

      return {
        success: true,
        message: "Investment created successfully",
        investment,
      };
    } else if (option === "hire") {
      // Create a hiring option record
      const hiringOption = await prisma.hiringOption.create({
        data: {
          title: projectType,
          price: parseInt(projectBudget, 10),
          description: projectDetails,
          deadline: projectDeadline,
          Investor: {
            connect: {
              id: userId,
            },
          },
          // investorId: userId,
        },
      });
      return {
        success: true,
        message: "Hiring option created successfully",
        hiringOption,
      };
    } else {
      throw new Error("Invalid option selected.");
    }
  } catch (error) {
    console.error("Error submitting investor options:", error);
    throw new Error("Failed to submit investor options.");
  }
}

export async function updateUserInfo(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const firstname = formData.get("firstname") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const pitch = formData.get("pitch") as string;
  const linkedInLink = formData.get("linkedInLink") as string;

  console.log("pitch " + pitch);

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      throw new Error("User not found in the database.");
    }

    let innovator = await prisma.innovator.findUnique({
      where: { id: user.id },
    });

    if (!innovator) {
      innovator = await prisma.innovator.create({
        data: {
          bio: pitch,
          linkedInLink: linkedInLink,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    } else {
      await prisma.innovator.update({
        where: { id: user.id },
        data: {
          bio: pitch,
          linkedInLink: linkedInLink,
        },
      });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: firstname,
        imageUrl: imageUrl,
        isInnovator: true,
      },
    });

    return {
      message: "Successfully Updated",
      status: "green",
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "This username is already used",
          status: "error",
        };
      }
    }
    console.error(e);
    throw e;
  }
}

export async function createProject(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const name = formData.get("name") as string;
  const tools = formData.get("tools") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const progress = formData.get("progress") as string;
  const pitch = formData.get("pitch") as string;
  const option = formData.get("option") as string;
  const collabDesc = formData.get("collabDesc") as string;
  const projectLink = formData.get("projectLink") as string;
  const githubLink = formData.get("githubLink") as string;
  const investmentAmount = formData.get("investmentAmount") as string;

  try {
    await prisma.project.create({
      data: {
        name: name,
        tools_used: tools,
        imageUrl: imageUrl ?? undefined,
        progress: parseInt(progress, 10),
        details: pitch,
        project_type: option,
        collabDesc: collabDesc,
        project_link: projectLink,
        github_link: githubLink,
        price: parseInt(investmentAmount, 10),
        Innovator: {
          connect: {
            id: user.id, // Connect with the Innovator using the provided ID
          },
        },
      },
    });

    return {
      status: "success",
      success: true,
      message: "Project created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      success: false,
      message: "Failed to create project",
    };
  }
}

export async function hiringConnectAction(
  investorId: string,
  innovatorId: string,
  projectId: string
) {
  try {
    await prisma.innovatorHiring.create({
      data: {
        investorId,
        innovatorId,
        projectId,
      },
    });
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "failure" };
  }
}

export async function hiringConnectConfirm(
  investorId: string,
  innovatorId: string,
  projectId: string
) {
  try {
    await prisma.innovatorHiring.update({
      where: {
        investorId_innovatorId_projectId: {
          investorId,
          innovatorId,
          projectId,
        },
      },
      data: {
        accept: true,
      },
    });
    await prisma.hiringOption.update({
      where: {
        id: projectId,
      },
      data: {
        accept: true,
      },
    });
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "failure" };
  }
}

export async function collabProject(projectId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    await prisma.collab.create({
      data: {
        innovatorId: user.id,
        projectId: projectId,
      },
    });
    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "failure" };
  }
}

export async function placeBid(projectId: string, price: number) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    const data = await prisma.bids.findUnique({
      where: {
        investorId_projectId: {
          investorId: user.id,
          projectId: projectId,
        },
      },
    });

    if (!data) {
      await prisma.bids.create({
        data: {
          price: price,
          investorId: user.id,
          projectId: projectId,
        },
      });
    } else {
      await prisma.bids.update({
        where: {
          investorId_projectId: {
            investorId: user.id,
            projectId: projectId,
          },
        },
        data: {
          price: price,
        },
      });
    }

    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "failure" };
  }
}

export async function confirmBid(projectId: string, investorId: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  try {
    await prisma.bids.update({
      where: {
        investorId_projectId: {
          investorId: investorId,
          projectId: projectId,
        },
      },
      data: {
        accept: true,
      },
    });

    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        sold: true
      },
    });

    return { status: "success" };
  } catch (error) {
    console.log(error);
    return { status: "failure" };
  }
}
