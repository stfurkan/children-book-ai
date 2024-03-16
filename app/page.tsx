import { auth } from "@/auth";
import Home from "@/components/Home/Home";

export default async function HomePage() {
  const session = await auth();
  return (
    <div className="flex flex-row justify-center">
      <Home user={session?.user} />
    </div>
  );
}
