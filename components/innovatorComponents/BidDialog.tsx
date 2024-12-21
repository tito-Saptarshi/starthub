'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitBid } from './ToasterSubmitBid'

export function BidDialog({ projectTitle, projectId }: { projectTitle: string; projectId: string }) {
  const [amount, setAmount] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Bid of $${amount} submitted for ${projectTitle}`)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4">Place Bid</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Place a bid</DialogTitle>
          <DialogDescription>
            Enter the amount you want to bid for {projectTitle}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
                placeholder="Enter bid amount"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <SubmitBid price={Number(amount)} projectId={projectId}/>
           
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
