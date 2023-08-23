import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { FC } from "react";
import FilamentCard from "../cards/FilamentCard";

interface FilamentsTabProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const FilamentsTab: FC<FilamentsTabProps> = async ({
  currentUserId,
  accountId,
  accountType,
}) => {
  let result = await fetchUserPosts(accountId);

  if (!result) {
    redirect("/");
  }
  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.filaments.map((thread: any) => (
        <FilamentCard
          key={thread._id}
          currentUserId={currentUserId}
          id={thread._id}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? {
                  name: result.name,
                  image: result.image,
                  id: result.id,
                }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
};

export default FilamentsTab;
