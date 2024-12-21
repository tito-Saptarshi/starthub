import InvestorOptionsForm from "@/components/InvestorOptionsForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";


export default async function InvestorOptionsPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  // if(!user) return redirect("/");
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Investment Options</h1>
      <InvestorOptionsForm userId={user?.id ?? ""}/>
    </div>
  )
}

