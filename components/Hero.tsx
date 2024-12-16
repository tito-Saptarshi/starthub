"use client";

import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import Link from "next/link";

interface Props {
  loggedIn: boolean;
}

export default function Hero({ loggedIn }: Props) {
  const handleRoleSelection = (role: string) => {
    // Store the selected role in sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.setItem("userRole", role);
    }
  };

  return (
    <section className="relative bg-gray-900 text-white py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Luxury Background"
          layout="fill"
          objectFit="cover"
          className="opacity-10"
        />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Where <span className="text-blue-400">Visionaries</span> Meet{" "}
          <span className="text-blue-400">Opportunities</span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-300">
          StartHub: The exclusive platform connecting elite investors with
          groundbreaking innovators.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          {loggedIn ? (
            <Button
              variant={"outline"}
              size="lg"
              className="bg-blue-500 text-white hover:bg-blue-600 text-lg px-8 py-6"
              asChild
            >
              <Link href={`/profile`}>Profile</Link>
            </Button>
          ) : (
            <>
              <Button
                size="lg"
                className="bg-blue-500 text-white hover:bg-blue-600 text-lg px-8 py-6"
                onClick={() => handleRoleSelection("investor")}
                
              >
                <LoginLink>Join as Investor</LoginLink>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white text-lg px-8 py-6"
                onClick={() => handleRoleSelection("innovator")}
                
              >
                <LoginLink>Showcase Your Innovation</LoginLink>
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
