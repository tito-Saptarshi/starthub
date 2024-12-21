import prisma from "@/app/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Award } from 'lucide-react'
import Image from 'next/image'
import Link from "next/link"

const investors = [
  {
    name: "Alexandra Sterling",
    investmentRange: "50M - 100M",
    expertise: "Tech & AI",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Jonathan Blackwood",
    investmentRange: "100M - 500M",
    expertise: "Space & Renewable Energy",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Olivia Rothschild",
    investmentRange: "25M - 75M",
    expertise: "Biotech & Healthcare",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

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

export default async function InvestorsSectionModied() {
    const data = await getData();
  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-blue-400">Featured Investors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((investor, index) => (
            <Link key={index} href={`/all-investor/${investor.id}`} >
            <Card key={index} className="bg-gray-800 border border-gray-700 hover:border-blue-500 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  {investor.user.imageUrl && <Image
                    src={investor.user.imageUrl}
                    alt={investor.user.imageUrl}
                    width={60}
                    height={60}
                    className="rounded-full border-2 border-blue-500"
                    />}
                  <CardTitle className="text-white">{investor.companyName}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2 text-blue-400">
                  <DollarSign className="h-5 w-5 mr-2" />
                  <span>Investment Range: {investor.investment?.value}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Award className="h-5 w-5 mr-2 text-blue-500" />
                  <span>Expertise: {investor.jobProfile}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
          ))}
        </div>
      </div>
      </section>
    )
}

