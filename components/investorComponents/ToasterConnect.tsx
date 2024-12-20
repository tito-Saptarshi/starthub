"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { hiringConnectAction } from "@/lib/actions";

export function ToastSimple({ investorId,innovatorId }: { investorId: string; innovatorId: string }) {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      className="mt-3"
      onClick={async () => {
        const result = await hiringConnectAction(investorId, innovatorId);
        if (result.status === "success") {
          toast({
            description: "Request Sent.",
          });
        } else {
          toast({
            description: "Request couldn't be sent",
          });
        }
      }}
    >
      Connect
    </Button>
  );
}
