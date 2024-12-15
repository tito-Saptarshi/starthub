import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Users, Zap, Globe } from 'lucide-react'

const projects = [
  {
    title: "AI-Driven Wealth Management",
    description: "Revolutionary AI system for ultra-high-net-worth individual portfolio optimization.",
    investmentRequired: 10000000,
    collaborationNeeded: false,
    progress: 70,
    icon: Zap,
  },
  {
    title: "Space Tourism Venture",
    description: "Luxury space travel experiences for the discerning adventurer.",
    investmentRequired: 50000000,
    collaborationNeeded: true,
    progress: 40,
    icon: Globe,
  },
  {
    title: "Quantum Computing Breakthrough",
    description: "Cutting-edge quantum technology poised to revolutionize data security and processing.",
    investmentRequired: 25000000,
    collaborationNeeded: true,
    progress: 60,
    icon: Users,
  },
]

export default function ProjectsSection() {
  return (
    <section className="py-24 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-blue-400">Elite Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <Card key={index} className="bg-gray-900 border border-gray-700 hover:border-blue-500 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Icon className="h-6 w-6 text-blue-500" />
                    <CardTitle className="text-white">{project.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex items-center mb-2 text-blue-400">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>Investment: ${project.investmentRequired.toLocaleString()}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-300">Progress: </span>
                    <Progress value={project.progress} className="h-2 bg-gray-700">
                      <div className="h-full bg-blue-500" style={{ width: `${project.progress}%` }} />
                    </Progress>
                  </div>
                  <span className="text-sm text-gray-400">{project.progress}% Complete</span>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

