import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LayoutDashboardIcon, LinkedinIcon,  UserIcon } from "lucide-react";

import markdownit from "markdown-it";
import Link from "next/link";
import { User } from "@/lib/types";
import { Separator } from "../ui/separator";

const md = markdownit();

export function HeroInnovator({ user, admin }: { user: User; admin: boolean }) {
  if (!user) {
    return <div className="text-center text-lg py-12">User not found</div>;
  }
  const parsedContent = md.render(user?.Innovator?.bio || "");
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[400px] max-h-[300px]">
        <Image
          src="https://c4.wallpaperflare.com/wallpaper/990/547/605/digital-art-futuristic-city-car-artwork-wallpaper-preview.jpg"
          alt="Classical architecture background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold tracking-wide md:text-7xl">
            {user.name}
          </h1>
          <p className="text-lg mt-4 text-gray-300 uppercase tracking-wider">
           {user.Innovator?.role}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto py-12 px-4 md:px-8 space-y-12">
        <div className="grid md:grid-cols-[2fr_1fr] gap-8">
          {/* About Section */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">About Me</h2>
            <Separator className="mb-6 py-0.5" />
            <div className="prose dark:prose-invert max-w-none space-y-4">
              {parsedContent ? (
                <article
                  className="prose max-w-4xl font-work-sans break-all"
                  dangerouslySetInnerHTML={{ __html: parsedContent }}
                />
              ) : (
                <p className="no-result">No details provided</p>
              )}
            </div>
          </section>

          {/* Profile Section */}
          <aside className="space-y-8 text-center">
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg">
              <Image
                src={user.imageUrl || "/placeholder.svg"}
                alt="Profile photo"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Hello, I’m {user.name}!
            </p>
            {admin && (
              <div>
                <Link href={`/innovator/registration`}>
                  <p className="flex text-sm text-muted-foreground hover:cursor-pointer hover:font-bold items-center justify-center">
                    <UserIcon className="h-4 w-4 mx-1" />
                    update profile
                  </p>
                </Link>
                <Link href={`/all-projects`}>
                  <p className="flex text-sm text-muted-foreground hover:cursor-pointer hover:font-bold items-center justify-center">
                    <LayoutDashboardIcon className="h-4 w-4 mx-1" />
                    Dashboard
                  </p>
                </Link>
                <Link href={`/innovator/${user.id}/project/create`}>
                  <p className="flex text-sm text-muted-foreground hover:cursor-pointer hover:font-bold items-center justify-center">
                    Create Project
                  </p>
                </Link>
              </div>
            )}

            {/* Social Links */}

            <section>
              <h2 className="text-2xl font-semibold mb-4">Socials</h2>
              <div className="flex flex-col gap-4">
                {user.Innovator?.linkedInLink && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a
                      href={user.Innovator?.linkedInLink}
                      className="flex items-center gap-2 text-primary"
                    >
                      <LinkedinIcon className="h-5 w-5" />
                      LinkedIn
                    </a>
                  </Button>
                )}
                {/* {user.socialGithub && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a
                      href={user.socialGithub}
                      className="flex items-center gap-2 text-primary"
                    >
                      <GithubIcon className="h-5 w-5" />
                      Github
                    </a>
                  </Button>
                )}
                {user.socialMail && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a
                      href={`mailto:${user.socialMail}`}
                      className="flex items-center gap-2 text-primary"
                    >
                      <Mail className="h-5 w-5" />
                      Email
                    </a>
                  </Button>
                )} */}

                {/* {user.socialOtherLink && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a
                      href={user.socialOtherLink}
                      className="flex items-center gap-2 text-primary"
                    >
                     
                      {user.socialOtherLink}
                    </a>
                  </Button>
                )} */}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
