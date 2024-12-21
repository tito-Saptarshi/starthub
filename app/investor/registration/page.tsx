//import prisma from "@/app/lib/db";
import InvestorRegistrationForm from "@/components/InvestorRegistrationForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
// import { unstable_noStore as noStore } from "next/cache";
// async function getData(userId: string) {
//   noStore();
//   const data = await prisma.investor.findUnique({
//     where: {
//       id: userId,
//     },
//   });

//   return data;
// }

export default async function InvestorRegistrationPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if(!user) redirect("/")
  // const userData = getData(user.id);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Investor Registration
      </h1>
      <InvestorRegistrationForm userId={user.id} />
    </div>
  );
}
