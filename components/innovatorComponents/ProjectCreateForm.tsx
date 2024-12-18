"use client";

import { useActionState, useEffect, useState } from "react";
import { UploadButton, UploadDropzone } from "../Uploadthing";
import MDEditor from "@uiw/react-md-editor";
import { createProject } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { SubmitButton } from "../SubmitButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const initialState = {
  message: "",
  status: "",
};

export function ProjectCreateForm() {
  const [newImage, setNewImage] = useState<string>("");
  const [state, formAction] = useActionState(createProject, initialState);
  const { toast } = useToast();
  const [option, setOption] = useState<"collab" | "sell" | "fund" | null>(null);

  const [pitch, setPitch] = useState("");
  // const [formData, setFormData] = useState({
  //   name: "",
  //   tools: "",
  //   imageUrl: "",
  //   progress: 0,
  //   description: "",
  //   projectType: "for-sale",
  //   price: 0,
  //   projectLink: "",
  //   githubLink: "",
  // });
  // const [response, setResponse] = useState<{
  //   success: boolean;
  //   message: string;
  // } | null>(null);

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const wrappedCreateProject = async (state: { success: boolean; message: string }, formData: FormData) => {
  //   return await createProject(formData);
  // };
  // const [state, formAction] = useActionState(wrappedCreateProject, initialState);
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);

  //   const result = await createProject(formData);
  //   setResponse(result); // Ensure the response is always set
  // };

  useEffect(() => {
    setNewImage(newImage ?? "");
  }, [newImage]);

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Project</h1>
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="imageUrl" value={newImage} />
        <input type="hidden" name="pitch" value={pitch} />
        <div>
          <label htmlFor="name" className="block mb-1">
            Project Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            // value={formData.name}
            // onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="tools" className="block mb-1">
            Tools/Stack/Skills Used
          </label>
          <input
            type="text"
            id="tools"
            name="tools"
            // value={formData.tools}
            // onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Showcase Image</label>
          <div className="flex flex-col items-center gap-4">
            <UploadDropzone
              className="ut-button:w-28 ut-allowed-content:hidden"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setNewImage(res[0].url);
              }}
            />
            {newImage && (
              <div className="mt-4">
                <img
                  src={newImage ?? `https://avatar.vercel.sh/abc`}
                  alt="Uploaded project"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            )}
            <input type="hidden" name="imageUrl" value={newImage} />
            <input type="hidden" name="pitch" value={pitch} />
          </div>
        </div>

        <div>
          <label htmlFor="progress" className="block mb-1">
            Project Progress
          </label>
          <input
            type="number"
            id="progress"
            name="progress"
            // value={formData.progress}
            // onChange={handleChange}
            min="0"
            max="100"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Detailed Project Description</label>
          <MDEditor
            data-color-mode="light"
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
        <input type="hidden" name="option" value={option || ""} />
        <RadioGroup
          onValueChange={(value) =>
            setOption(value as "collab" | "sell" | "fund")
          }
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="collab" id="collab" />
            <Label htmlFor="collab">
              I want to Collab with other developer
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sell" id="sell" />
            <Label htmlFor="sell">I want to sell this project</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fund" id="fund" />
            <Label htmlFor="fund">I want to funds for this project</Label>
          </div>
        </RadioGroup>

        {option === "fund" && (
          <div>
            <label
              htmlFor="investmentAmount"
              className="block text-sm font-medium text-gray-700"
            >
              How much funding required?
            </label>
            <Input
              id="investmentAmount"
              name="investmentAmount"
              type="number"
              placeholder="Enter amount"
              className="mt-1"
              required
            />
          </div>
        )}

        {option === "sell" && (
          <div>
            <label
              htmlFor="investmentAmount"
              className="block text-sm font-medium text-gray-700"
            >
              How much do you want to sell it for?
            </label>
            <Input
              id="investmentAmount"
              name="investmentAmount"
              type="number"
              placeholder="Enter amount"
              className="mt-1"
              required
            />
          </div>
        )}

        {option === "collab" && (
          <>
            {/* <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">What kind of project is this?</label>
            <Input id="projectType" name="projectType" placeholder="Describe the project type" className="mt-1" required />
          </div> */}
            {/* <div>
            <label htmlFor="projectBudget" className="block text-sm font-medium text-gray-700">What&apos;s the budget for the project?</label>
            <Input id="projectBudget" name="projectBudget" type="number" placeholder="Enter budget" className="mt-1" required />
          </div> */}
            <div>
              <label
                htmlFor="collabDesc"
                className="block text-sm font-medium text-gray-700"
              >
                What type of developer required?
              </label>
              <Textarea
                id="collabDesc"
                name="collabDesc"
                placeholder="Enter project details"
                className="mt-1"
                required
              />
            </div>
            {/* <div>
            <label htmlFor="projectDeadline" className="block text-sm font-medium text-gray-700">Project deadline</label>
            <Input id="projectDeadline" name="projectDeadline" type="date" className="mt-1" />
          </div> */}
          </>
        )}
        <div>
          <label htmlFor="projectLink" className="block mb-1">
            Project Link
          </label>
          <input
            type="url"
            id="projectLink"
            name="projectLink"
            // value={formData.projectLink}
            // onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="githubLink" className="block mb-1">
            GitHub Link
          </label>
          <input
            type="url"
            id="githubLink"
            name="githubLink"
            // value={formData.githubLink}
            // onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Project
        </button> */}
        <SubmitButton text="Submit Project" />
      </form>
    </div>
  );
}
