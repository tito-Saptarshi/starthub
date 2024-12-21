import prisma from "@/app/lib/db";
import { InnovatorRegistrationForm } from "@/components/InnovatorRegistrationForm";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  noStore();
  const data = await prisma.innovator.findUnique({
    where: {
      id: userId,
    } ,include: {
      user: true, // Include the user relation
    },
  });

  return data;
}

export default async function page() {
  const { getUser } = getKindeServerSession();
  const currUser = await getUser();
  // if (!currUser) redirect(`/`);
  const user = await getData(currUser.id ?? "");
  

  //   if (currUser.id !== user?.id) {
  //     const newData = await getData(currUser.id);
  //     const userName = newData?.userName;
  //     return redirect(`profile/${userName}`);
  //   }
  return (
    <>
      <div className="flex justify-between items-center mb-6 ml-5 pt-4">
        {/* <div>
          <h1 className="text-2xl font-bold">Profile Page</h1>
          <p className="text-muted-foreground">
            Update your profile information.
          </p>
        </div> */}
      </div>
      <Separator className="mt-10 mb-2 " />
      <InnovatorRegistrationForm
        bio={user?.bio}
        firstName={user?.user.name}
        imageUrl={user?.user.imageUrl}
        linkedInLink={user?.linkedInLink}
      />
    </>
  );
}
