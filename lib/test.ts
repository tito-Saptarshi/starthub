import { Investor } from './types'

const investors: Investor[] = [
  {
    id: '1',
    companyName: 'Tech Ventures',
    address: '123 Silicon Valley, CA 94000',
    jobProfile: 'Venture Capitalist',
    industry: 'Technology',
    linkedInLink: 'https://linkedin.com/company/tech-ventures',
    taxNumber: 'TX123456789',
    entity: 'Corporation',
    investment: {
      id: 'inv1',
      value: 1000000,
      description: 'Seeking innovative startups in AI and machine learning',
    },
  },
  {
    id: '2',
    companyName: 'Green Energy Solutions',
    address: '456 Eco Street, OR 97000',
    jobProfile: 'Renewable Energy Consultant',
    industry: 'Renewable Energy',
    linkedInLink: 'https://linkedin.com/company/green-energy-solutions',
    taxNumber: 'TX987654321',
    entity: 'LLC',
    hiringOption: [
      {
        id: 'hire1',
        title: 'Senior Solar Panel Engineer',
        price: 120000,
        description: 'Looking for an experienced engineer to lead our solar panel development team',
        deadline: new Date('2023-12-31'),
      },
      {
        id: 'hire2',
        title: 'Wind Turbine Technician',
        price: 80000,
        description: 'Seeking a skilled technician for wind turbine maintenance and installation',
        deadline: new Date('2023-11-30'),
      },
    ],
  },
  {
    id: '3',
    companyName: 'Biotech Innovations',
    address: '789 Research Park, MA 02000',
    jobProfile: 'Biotech Investor',
    industry: 'Biotechnology',
    linkedInLink: 'https://linkedin.com/company/biotech-innovations',
    taxNumber: 'TX135792468',
    entity: 'Corporation',
    investment: {
      id: 'inv2',
      value: 5000000,
      description: 'Investing in groundbreaking medical research and drug development',
    },
    hiringOption: [
      {
        id: 'hire3',
        title: 'Senior Biochemist',
        price: 150000,
        description: 'Experienced biochemist needed for cutting-edge pharmaceutical research',
        deadline: new Date('2023-10-31'),
      },
    ],
  },
]

export async function getInvestors(): Promise<Investor[]> {
  // In a real application, you would fetch this data from your database
  return investors
}

export async function getInvestorById(id: string): Promise<Investor | undefined> {
  // In a real application, you would fetch this data from your database
  return investors.find(investor => investor.id === id)
}

