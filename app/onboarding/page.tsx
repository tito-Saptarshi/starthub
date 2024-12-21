import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import OnboardingForm from "./OnboardingForm";
import prisma from "../lib/db";
import { redirect } from "next/navigation";

import { unstable_noStore as noStore } from "next/cache";
async function getData (id: string) {
  noStore();
 return prisma.user.findUnique({
  where : {
    id
  }
 })
}
export default async function OnboardingPage() {
  const { getUser } = await  getKindeServerSession();
  const user = await getUser();

  if(!user) return redirect('/');

  const data = await getData(user.id);
  const investor = data?.isInvestor;
  const innovator = data?.isInnovator;
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome to Our Platform
        </h1>
        <OnboardingForm investor={investor} innovator={innovator}/>
      </div>
    </div>
  );
}
