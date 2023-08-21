"use client";

import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface LogoutButtonProps {
  children: React.ReactNode;
}

const LogoutButton: FC<LogoutButtonProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div>
      <SignedIn>
        <SignOutButton signOutCallback={() => router.push("/sign-in")}>
          <div className="flex gap-4 p-4 cursor-pointer">
            <Image
              src="/assets/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />
            {children}
          </div>
        </SignOutButton>
      </SignedIn>
    </div>
  );
};

export default LogoutButton;
