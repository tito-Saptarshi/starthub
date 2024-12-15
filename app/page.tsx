import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InvestorsSection from "@/components/InvestorsSection";
import ProjectsSection from "@/components/ProjectsSection";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() { 
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let loggedIn = false;
  if(user) loggedIn = true;
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      <main>
        <Hero loggedIn={loggedIn}/>
        <ProjectsSection />
        <InvestorsSection />
      </main>
    </div>
  );
}
