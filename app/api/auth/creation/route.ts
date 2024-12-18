import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { unstable_noStore as noStore } from "next/cache";

export async function GET(req: NextRequest) {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id)
    throw new Error("something went wrong please try again");

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email ?? "",
        name: user.given_name + " " + user.family_name || "No Name",
        imageUrl: user.picture,
      },
    });
    return NextResponse.redirect(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/onboarding"
        : "https://your-production-domain.com/onboarding"
    );
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://your-production-domain.com/onboarding"
  );
}
