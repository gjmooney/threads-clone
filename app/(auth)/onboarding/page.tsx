import AccountProfile from "@/components/forms/AccountProfile";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="text-base-regular text-light-2 mt-3">
        Complete your profile now, to use Threds.
      </p>

      <section className="bg-dark-2 border-dark-4 mt-9 rounded-md border p-10">
        <AccountProfile buttonTitle="Continue" />
      </section>
    </main>
  );
};

export default page;
