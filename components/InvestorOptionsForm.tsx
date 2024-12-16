'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { submitInvestorOptions } from '@/lib/actions'

export default function InvestorOptionsForm({userId} : {userId: string}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [option, setOption] = useState<'invest' | 'hire' | null>(null)

  // async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault()
  //   setIsSubmitting(true)

  //   const formData = new FormData(event.currentTarget)
  //   const data = Object.fromEntries(formData.entries())

  //   try {
  //     await submitInvestorOptions(data)
  //     router.push('/') // Redirect to a thank you page
  //   } catch (error) {
  //     console.error('Submission failed:', error)
  //     // Handle error (e.g., show error message to user)
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }

   async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
     event.preventDefault()
     setIsSubmitting(true)
 
     const formData = new FormData(event.currentTarget)
     // const data = Object.fromEntries(formData.entries())
     const data: Record<string, string> = {};
 
     formData.forEach((value, key) => {
       // Ensure only strings are added to the data object
       if (typeof value === 'string') {
         data[key] = value;
       } else {
         data[key] = ''; // Handle files or other non-string values if necessary
       }
     });
 
     try {
      if (data.projectDeadline) {
        data.projectDeadline = new Date(data.projectDeadline as string).toISOString(); // Convert to DateTime
      }
       await submitInvestorOptions(data)
       router.push('/') // Redirect to the new options page
     } catch (error) {
       console.error('Registration failed:', error)
       // Handle error (e.g., show error message to user)
     } finally {
       setIsSubmitting(false)
     }
   }
  
  

  return (
    <form onSubmit={onSubmit} className="space-y-8">
       <input type="hidden" name="userId" value={userId ?? "hello"} />
       <input type="hidden" name="option" value={option || ""} />
      <RadioGroup onValueChange={(value) => setOption(value as 'invest' | 'hire')} className="space-y-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="invest" id="invest" />
          <Label htmlFor="invest">I want to invest money</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="hire" id="hire" />
          <Label htmlFor="hire">I want to hire someone for a project</Label>
        </div>
      </RadioGroup>

      {option === 'invest' && (
        <div>
          <label htmlFor="investmentAmount" className="block text-sm font-medium text-gray-700">How much do you want to invest?</label>
          <Input id="investmentAmount" name="investmentAmount" type="number" placeholder="Enter amount" className="mt-1" required />
        </div>
      )}

      {option === 'hire' && (
        <>
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">What kind of project do you want to be made?</label>
            <Input id="projectType" name="projectType" placeholder="Describe the project type" className="mt-1" required />
          </div>
          <div>
            <label htmlFor="projectBudget" className="block text-sm font-medium text-gray-700">What&apos;s the budget for the project?</label>
            <Input id="projectBudget" name="projectBudget" type="number" placeholder="Enter budget" className="mt-1" required />
          </div>
          <div>
            <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700">Project details</label>
            <Textarea id="projectDetails"  name="projectDetails" placeholder="Enter project details" className="mt-1" required />
          </div>
          <div>
            <label htmlFor="projectDeadline" className="block text-sm font-medium text-gray-700">Project deadline</label>
            <Input id="projectDeadline" name="projectDeadline" type="date" className="mt-1" />
          </div>
        </>
      )}

      <Button type="submit" disabled={isSubmitting || !option}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  )
}

