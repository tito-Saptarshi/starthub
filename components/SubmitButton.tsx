"use client"

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";

export function SubmitButton({ text }: { text: string }) {
    const handleOnClick = () => {
      redirect('/');
    }
    const { pending } = useFormStatus();
    return (
      <>
        {pending ? (
          <Button disabled>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button onClick={handleOnClick} type="submit">{text}</Button>
        )}
      </>
    );
  }
  