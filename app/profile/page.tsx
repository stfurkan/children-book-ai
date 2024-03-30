import { auth } from "@/auth";
import { AutherDetailsForm } from "@/components/Forms/AuthorDetailsForm";
import { getAuthorDetails } from "@/lib/db/author";
import { decrypt, encrypt } from "@/lib/encryption";
import { notFound } from "next/navigation";

export default async function UserProfile() {
  const session = await auth();
  const userAuthorDetails = await getAuthorDetails(session?.user?.id!);

  if (!session) {
    notFound();
  }

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col w-full items-center">
        <h1 className="font-mono font-semibold text-base md:text-2xl mb-4">
          ~ Author Profile ~
        </h1>
        <AutherDetailsForm
          user={session.user}
          userAuthorDetails={userAuthorDetails}
        />
      </div>
    </div>
  );
}
