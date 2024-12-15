'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { registerInvestor } from '@/lib/actions'

export default function InvestorRegistrationForm({userId} : {userId : string} ) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      await registerInvestor(data, userId)
      router.push('/investor/options') // Redirect to the new options page
    } catch (error) {
      console.error('Registration failed:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <input type="hidden" value={userId}/>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <Textarea id="address" name="address" placeholder="Enter your address" className="mt-1" required />
      </div>

      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company/Organization Name (if applicable)</label>
        <Input id="companyName" name="companyName" placeholder="Enter company name" className="mt-1" />
      </div>

      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title/Role</label>
        <Input id="jobTitle" name="jobTitle" placeholder="Enter your job title or role" className="mt-1" required />
      </div>

      <div>
        <label htmlFor="linkedInOrWebsite" className="block text-sm font-medium text-gray-700">LinkedIn Profile or Website</label>
        <Input id="linkedInOrWebsite" name="linkedInOrWebsite" placeholder="https://" className="mt-1" required />
      </div>

      <div>
        <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">Areas of Expertise or Industry Focus</label>
        <Input id="expertise" name="expertise" placeholder="e.g., Tech, Healthcare, Real Estate" className="mt-1" required />
      </div>

      <div>
        <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">Tax Identification Number (if needed for compliance)</label>
        <Input id="taxId" name="taxId" placeholder="Enter tax ID" className="mt-1" />
      </div>

      <div>
        <label htmlFor="legalEntityStatus" className="block text-sm font-medium text-gray-700">Legal Entity Status</label>
        <Select name="legalEntityStatus" defaultValue="Individual">
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select legal entity status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Individual">Individual</SelectItem>
            <SelectItem value="Firm">Firm</SelectItem>
            <SelectItem value="Trust">Trust</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Register'}
      </Button>
    </form>
  )
}

