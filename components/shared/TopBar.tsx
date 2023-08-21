import { OrganizationSwitcher } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import LogoutButton from "./LogoutButton";

interface TopBarProps {}

const TopBar: FC<TopBarProps> = ({}) => {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">
          Filament
        </p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <LogoutButton />
        </div>

        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
};

export default TopBar;
