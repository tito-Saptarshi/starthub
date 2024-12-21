"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { confirmCollab } from "@/lib/actions";

export function ToasterCollabConfirm({
  projectId,
  innovatorId,
}: {
  projectId: string;
  innovatorId: string;
}) {
  const { toast } = useToast();

  return (
    <>
      <Button
        variant="outline"
        className="mt-3"
        onClick={async () => {
          const result = await confirmCollab(projectId, innovatorId);
          if (result.status === "success") {
            toast({
              description: "Collaboration Confirmed",
            });
          } else {
            toast({
              description: "Request couldn't be sent",
            });
          }
        }}
      >
        Confirm Collab
      </Button>
    </>
  );
}
