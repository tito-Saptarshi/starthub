import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

interface Props {
  loggedIn: boolean;
}

async function getData(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    }, include : {
      Innovator: true,
      Investor: true,
    }
  });
}

export default async function Hero({ loggedIn }: Props) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let userData;
  if (loggedIn) {
    userData = await getData(user?.id ?? "");
  }
  return (
    <section className="relative bg-gray-900 text-white pt-32 pb-12 overflow-hidden">
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
            <div className="flex items-center ">
              {userData?.isInnovator && (
                <Button
                  variant={"outline"}
                  size="lg"
                  className="bg-blue-500 text-white hover:bg-blue-600 text-lg px-4 py-3 mr-4"
                  asChild
                >
                  <Link href={`/innovator/${userData.Innovator?.id}`}>Innovator Profile</Link>
                </Button>
              )}
              
              {userData?.isInvestor && (
                <Button
                  variant={"outline"}
                  size="lg"
                  className="bg-blue-500 text-white hover:bg-blue-600 text-lg px-4 py-3"
                  asChild
                >
                  <Link href={`/investor/dashboard/hiring`}>Investor Profile</Link>
                </Button>
              )}
              {!userData?.isInnovator && (
                <Button
                  variant={"outline"}
                  size="lg"
                  className="bg-blue-500 text-white hover:bg-blue-600 text-lg ml-2 px-4 py-3"
                  asChild
                >
                  <Link href={`/onboarding`}>Create Innovator Profile</Link>
                </Button>
              )}
              {!userData?.isInvestor && (
                <Button
                  variant={"outline"}
                  size="lg"
                  className="bg-blue-500 text-white hover:bg-blue-600 text-lg mx-2 px-4 py-3"
                  asChild
                >
                  <Link href={`/onboarding`}>Create Investor Profile</Link>
                </Button>
              )}
            </div>
          ) : (
            <>
              <Button
                size="lg"
                className="bg-blue-500 text-white hover:bg-blue-600 text-lg px-5 py-2"
              >
                <RegisterLink>Sign up</RegisterLink>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white text-lg px-5 py-2"
              >
                <LoginLink>Log in</LoginLink>
              </Button>
            </>
          )}
        </div>
        <div className="p-10">

          <Link href={'/all-investor'} className="p-2 block hover:text-blue-600">All Investors and Hirings</Link>
          <Link href={'/render-projects'} className="p-2 block hover:text-blue-600">All Projects and Innovations</Link>
        </div>
      </div>
    </section>
  );
}
