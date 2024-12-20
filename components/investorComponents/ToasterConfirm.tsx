"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { hiringConnectConfirm } from "@/lib/actions";

export function ToasterConfirm({ investorId,innovatorId, projectId }: { investorId: string; innovatorId: string; projectId: string }) {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      className="mt-3"
      onClick={async () => {
        const result = await hiringConnectConfirm(investorId, innovatorId, projectId);
        if (result.status === "success") {
          toast({
            description: "Innovator Hired",
          });
        } else {
          toast({
            description: "Failure"
            
          });
        }
      }}
    >
      Confirm
    </Button>
  );
}
