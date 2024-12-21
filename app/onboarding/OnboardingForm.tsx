'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function OnboardingForm({innovator, investor} : {innovator: boolean; investor: boolean}) {
  const [userType, setUserType] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userType === 'investor') {
      router.push('/investor/registration') // Changed to `/onvestor`
    } else if (userType === 'innovator') {
      router.push('/innovator/registration') // Changed to `/innovator`
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>What best describes you?</CardTitle>
        <CardDescription>Choose your role to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <RadioGroup
            value={userType || ''}
            onValueChange={setUserType}
            className="flex flex-col space-y-4 mb-4"
          >
            {!investor && <div className="flex items-center space-x-2">
              <RadioGroupItem value="investor" id="investor" />
              <Label htmlFor="investor">Investor</Label>
            </div>}
            {!innovator && <div className="flex items-center space-x-2">
              <RadioGroupItem value="innovator" id="innovator" />
              <Label htmlFor="innovator">Innovator</Label>
            </div>}
          </RadioGroup>
          <Button type="submit" className="w-full" disabled={!userType}>
            Continue
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
