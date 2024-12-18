"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "../Uploadthing";
import MDEditor from "@uiw/react-md-editor";
import { createProject } from "@/lib/actions";

export function ProjectCreateForm() {
  const router = useRouter();
  const [newImage, setNewImage] = useState<string>("");
  const [pitch, setPitch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    tools: "",
    imageUrl: "",
    progress: 0,
    description: "",
    projectType: "for-sale",
    price: 0,
    projectLink: "",
    githubLink: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await createProject(formData);
    if (result.success) {
      alert(result.message);
      router.push("/"); // Redirect to home page or project list
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">
            Project Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
            value={formData.tools}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Showcase Image</label>
          <UploadButton
            className="ut-button:w-28 ut-allowed-content:hidden"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setNewImage(res[0].url);
            }}
          />
        </div>

        <div>
          <label htmlFor="progress" className="block mb-1">
            Project Progress
          </label>
          <input
            type="number"
            id="progress"
            name="progress"
            value={formData.progress}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Detailed Project Description</label>
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

        <div>
          <label htmlFor="projectType" className="block mb-1">
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="for-sale">For Sale</option>
            <option value="funding">Asking for Funds</option>
            <option value="collaboration">Asking for Collaboration</option>
          </select>
        </div>

        {(formData.projectType === "for-sale" ||
          formData.projectType === "funding") && (
          <div>
            <label htmlFor="price" className="block mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="projectLink" className="block mb-1">
            Project Link
          </label>
          <input
            type="url"
            id="projectLink"
            name="projectLink"
            value={formData.projectLink}
            onChange={handleChange}
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
            value={formData.githubLink}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}
