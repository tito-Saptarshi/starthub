"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { collabProject } from "@/lib/actions";

export function ToasterCollabCreate({ projectId, admin }: { projectId: string; admin: boolean }) {
  const { toast } = useToast();

  return (
    <>
   {admin && <Button
      variant="outline"
      className="mt-3"
      onClick={async () => {
          const result = await collabProject(projectId);
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
      Collab
    </Button>}
        </>
  );
}
