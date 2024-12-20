import prisma from "@/app/lib/db";
import InvestorDetails from "@/components/investorComponents/InvestorDetails";
import { notFound } from "next/navigation";

async function getData(id: string) {
  const data = await prisma.investor.findUnique({
    where: {
      id: id,
    },
    include: {
      investment: true,
      hiringOption: true,
      user: true,
    },
  });

  return data;
}

export default async function InvestorPage({
  params,
}: {
  params: { id: string };
}) {
  const investor = await getData(params.id);

  if (!investor) {
    notFound();
  }
  console.log(investor);

  return (
    <div className="container mx-auto px-4 py-8">
      <InvestorDetails investor={investor} />
    </div>
  );
}
