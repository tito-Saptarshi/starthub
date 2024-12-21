import Link from "next/link";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Header() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Rocket className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold text-white">StartHub</span>
        </Link>
        <nav>
          <ul className="flex items-center">
            <li>
              <Link
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-colors mr-2 hidden"
              >
                About
              </Link>
            </li>

            {user ? (
              <li>
                <div>
                  <Button
                    variant="default"
                    size="sm"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white mr-1"
                    asChild
                  >
                    <LogoutLink className="w-full">Logout</LogoutLink>
                  </Button>
                </div>
              </li>
            ) : (
              <li>
                <div>
                  <Button
                    variant="default"
                    size="sm"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white mr-1"
                    asChild
                  >
                    <LoginLink>Log in</LoginLink>
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    asChild
                  >
                    <RegisterLink>Sign up</RegisterLink>
                  </Button>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
