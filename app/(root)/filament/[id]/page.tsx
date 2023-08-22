import FilamentCard from "@/components/cards/FilamentCard";
import { fetchFilamentById } from "@/lib/actions/filaments.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    id: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  if (!params.id) {
    return null;
  }

  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onBoarded) {
    redirect("/onboarding");
  }

  const filament = await fetchFilamentById(params.id);

  return (
    <section className="relative">
      <div className="">
        <FilamentCard
          key={filament._id}
          currentUserId={user.id}
          id={filament._id}
          parentId={filament.parentId}
          content={filament.text}
          author={filament.author}
          community={filament.community}
          createdAt={filament.createdAt}
          comments={filament.children}
        />
      </div>
    </section>
  );
};

export default page;
