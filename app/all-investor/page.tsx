
import prisma from "../lib/db"
import InvestorCard2 from "@/components/investorComponents/InvestorCard";

// async function getInvestors() {
 
//     return [
//       {
//         id: '1',
//         companyName: 'Tech Ventures',
//         industry: 'Technology',
//         linkedInLink: 'https://linkedin.com/company/tech-ventures',
//         entity: 'Corporation',
//         investment: {
//           id: 'inv1',
//           value: 1000000,
//           description: 'Seeking innovative startups in AI and machine learning',
//         },
//       },
//       {
//         id: '2',
//         companyName: 'Green Energy Solutions',
//         industry: 'Renewable Energy',
//         linkedInLink: 'https://linkedin.com/company/green-energy-solutions',
//         entity: 'LLC',
//         hiringOption: [
//           {
//             id: 'hire1',
//             title: 'Senior Solar Panel Engineer',
//             price: 120000,
//             description: 'Looking for an experienced engineer to lead our solar panel development team',
//             deadline: new Date('2023-12-31'),
//           },
//           {
//             id: 'hire2',
//             title: 'Wind Turbine Technician',
//             price: 80000,
//             description: 'Seeking a skilled technician for wind turbine maintenance and installation',
//             deadline: new Date('2023-11-30'),
//           },
//         ],
//       },
//       {
//         id: '3',
//         companyName: 'Biotech Innovations',
//         industry: 'Biotechnology',
//         linkedInLink: 'https://linkedin.com/company/biotech-innovations',
//         entity: 'Corporation',
//         investment: {
//           id: 'inv2',
//           value: 5000000,
//           description: 'Investing in groundbreaking medical research and drug development',
//         },
//         hiringOption: [
//           {
//             id: 'hire3',
//             title: 'Senior Biochemist',
//             price: 150000,
//             description: 'Experienced biochemist needed for cutting-edge pharmaceutical research',
//             deadline: new Date('2023-10-31'),
//           },
//         ],
//       },
//     ]
// }

async function getData() {
  const data = await prisma.investor.findMany({
    include: {
      investment: true,
      hiringOption: true,
      user: true,
    }
  })

  return data;
}

export default async function InvestorsPage() {
  // const investors = await getInvestors()
  const data = await getData();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Investors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((investor) => (
          <InvestorCard2 key={investor.id} investor={investor} />
        ))}
      </div>
    </div>
  )
}

