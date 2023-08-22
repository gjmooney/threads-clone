import PostFilament from "@/components/forms/PostFilament";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onBoarded) {
    redirect("/onboarding");
  }

  return (
    <>
      <h1 className="head-text">Create Filament</h1>
      <PostFilament userId={userInfo._id} />
    </>
  );
};

export default page;
