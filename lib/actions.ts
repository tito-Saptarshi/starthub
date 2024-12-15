'use server'

import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function registerInvestor(data: Record<string, string>, userId: string) {
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
        entity: data.legalEntityStatus
      },
      
    });
    console.log('Investor registered:', investor);

    return { success: true, message: 'Investor registered successfully' };
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function submitInvestorOptions(data: Record<string, string>) {
  const { option, investmentAmount, projectType, projectBudget, projectDetails, projectDeadline, userId } = data;

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
          price: parseInt(projectBudget, 10), // Ensure the price is stored as an integer
          description: projectDetails,
          deadline: projectDeadline,
          Investor: {
            connect: {
              id: userId,
            },
          },
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




