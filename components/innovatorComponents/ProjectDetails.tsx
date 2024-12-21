'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ToasterCollabConfirm } from './ToasterCollabConfirm';

interface ProjectUsersTemp {
    price: number;
    name: string;
    investorId: string;
    // innovatorId: string;
}

interface ProjectDetailsProps {
  title: string;
  type: string;
  users: ProjectUsersTemp[];
  projectId: string;
  sold: boolean;
}

export function ProjectDetails({ title, type, users,projectId, sold }: ProjectDetailsProps) {
  // const handleAccept = (userId: string) => {
  //   // In a real application, you would handle the acceptance logic here
  //   console.log(`Accepted user: ${userId}`)
  // }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card key={user.name}>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {type !== 'collab' && <p>Amount: ${user.price}</p>}
              <div className="flex items-center space-x-2 mt-2">
                {/* <Button onClick={() => handleAccept(user.investorId)}>
                  Accept {type === 'collab' ? 'Collaboration' : 'Bid'}
                </Button> */}
                {(!sold && type === 'collab') && (
                  
                  <ToasterCollabConfirm innovatorId={user.investorId} projectId={projectId} />)}

                <Link href={`/innovator/${user.investorId}`} passHref>
                  <Button variant="outline">View Profile</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

