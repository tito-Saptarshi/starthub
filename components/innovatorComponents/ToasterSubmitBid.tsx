"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { placeBid } from "@/lib/actions";

export function SubmitBid({  projectId, price }: { price: number; projectId: string }) {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      className="mt-3"
      onClick={async () => {
        const result = await placeBid(projectId, price);
        if (result.status === "success") {
          toast({
            description: "Bid submitted",
          });
        } else {
          toast({
            description: "Failure"
            
          });
        }
      }}
    >
      Place Bid
    </Button>
  );
}
