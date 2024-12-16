"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useActionState, useEffect, useState } from "react";

import { UploadButton } from "./Uploadthing";
import { useToast } from "@/hooks/use-toast";
import { updateUserInfo } from "@/lib/actions";
import MDEditor from "@uiw/react-md-editor";
import { SubmitButton } from "./SubmitButton";
export interface iAppProps {
  
  bio: string | undefined | null | "";
  firstName: string | undefined | null | "";
  lastName: string | undefined | null | "";
  imageUrl:  string | undefined | null | "";
  linkedInLink : string | undefined | null | "";
  
}

const initialState = {
  message: "",
  status: "",
};

export function InnovatorRegistrationForm({ bio, imageUrl, firstName, lastName, linkedInLink }: iAppProps) {
  const [newImage, setNewImage] = useState<string>("");
  const [state, formAction] = useActionState(updateUserInfo, initialState);
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setNewImage(imageUrl ?? "");
    setPitch(bio ?? "");
  }, [imageUrl, bio]);

  useEffect(() => {
    if (state?.status === "green") {
      toast({
        title: "Succesfull",
        description: state.message,
      });
    } else if (state?.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Your Profile</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-40 w-40">
              <AvatarImage
                src={newImage ?? `https://avatar.vercel.sh/${firstName}`}
                alt="@shadcn"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <UploadButton
              className="ut-button:w-28 ut-allowed-content:hidden"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setNewImage(res[0].url);
              }}
            />
            <Button
              onClick={() => {
                setNewImage(imageUrl ?? "");
              }}
            >
              Cancel
            </Button>
            <input type="hidden" name="imageUrl" value={newImage} />
            <input type="hidden" name="pitch" value={pitch} />
          </div>
          <div className="space-y-4">
            {/* <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                defaultValue={userName ?? ""}
              />
              {state?.status === "error" && (
                <p className="text-destructive mt-1">{state.message}</p>
              )}
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="firstname">First Name</Label>
              <Input
                id="firstname"
                name="firstname"
                defaultValue={firstName ?? ""}
              />
              {state?.status === "error" && (
                <p className="text-destructive mt-1">{state.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Last Name</Label>
              <Input
                id="lastname"
                name="lastname"
                defaultValue={lastName ?? ""}
              />
              {state?.status === "error" && (
                <p className="text-destructive mt-1">{state.message}</p>
              )}
            </div>
            <div className="space-y-2" data-color-mode="light">
              <Label htmlFor="bio">Bio</Label>
              <MDEditor
               value={pitch ?? ""}
                onChange={(value) => setPitch(value as string)}
                id="pitch"
                preview="edit"
                height={300}
                style={{ borderRadius: 20, overflow: "hidden" }}
                textareaProps={{
                  placeholder:
                    "Briefly describe your idea and what problem it solves",
                }}
                previewOptions={{
                  disallowedElements: ["style"],
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedInLink">LinkedIn Profile or Website<span className="text-muted-foreground"> (Optional) </span></Label>
              <Input
                id="linkedInLink"
                name="linkedInLink"
                defaultValue={linkedInLink ?? ""}
                placeholder="e.g., Tech, Healthcare, Real Estate" 
              />
              {state?.status === "error" && (
                <p className="text-destructive mt-1">{state.message}</p>
              )}
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="sociallinkedin">LinkedIn<span className="text-muted-foreground"> (Optional) </span></Label>
              <Input
                id="sociallinkedin"
                name="sociallinkedin"
                defaultValue={socialLinkedIn ?? ""}
              />
              {state?.status === "error" && (
                <p className="text-destructive mt-1">{state.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="socialmail">Mail Id<span className="text-muted-foreground"> (Optional) </span></Label>
              <Input
                id="socialmail"
                name="socialmail"
                defaultValue={socialMail ?? ""}
              />
              {state?.status === "error" && (
                <p className="text-destructive mt-1">{state.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="socialotherlink">Other Links <span className="text-muted-foreground"> (Optional) </span></Label>
              <Input
                id="socialotherlink"
                name="socialotherlink"
                defaultValue={socialOtherLink ?? ""}
              />
              {state?.status === "error" && (
                <p className="text-destructive mt-1">{state.message}</p>
              )}
            </div> */}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <SubmitButton text="Save" />
          
        </CardFooter>
      </Card>
    </form>
  );
}