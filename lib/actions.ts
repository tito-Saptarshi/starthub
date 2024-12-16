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
  try {
    const investor = await prisma.investor.update({
      where: {
        id: userId,
      },
      data: {
        address: data.address,
        companyName: data.companyName,
        jobProfile: data.jobTitle,
        linkedInLink: data.linkedInOrWebsite,
        industry: data.expertise,
        taxNumber: data.taxId,
        entity: data.legalEntityStatus,
      },
    });
    console.log("Investor registered:", investor);

    return { success: true, message: "Investor registered successfully" };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function submitInvestorOptions(data: Record<string, string>) {
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
      const investment = await prisma.investment.create({
        data: {
          value: parseInt(investmentAmount, 10), // Ensure the value is stored as an integer
          Investor: {
            connect: {
              id: userId,
            },
          },
        },
      });
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
  const lastname = formData.get("lastname") as string;
  // const bio = formData.get("bio") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const pitch = formData.get("pitch") as string;
  const linkedInLink = formData.get("linkedInLink") as string;
  
  console.log("pitch " + pitch);
  
  try {
    await prisma.innovator.update({
      where: {
        id: user.id,
      },
      data: {
        firstName: firstname,
        lastName: lastname,
        bio: pitch,
        imageUrl: imageUrl,
        linkedInLink: linkedInLink,
      },
    });

    return {
      message: "Succesfully Updated",
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
    throw e;
  }
}
