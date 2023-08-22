//app/page.tsx
import FilamentCard from "@/components/cards/FilamentCard";
import { fetchPosts } from "@/lib/actions/filaments.actions";
import { UserButton, currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const result = await fetchPosts(1, 30);

  return (
    <div>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No Filaments found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <FilamentCard
                key={post._id}
                currentUserId={user.id}
                id={post._id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
}
