"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import LogoutButton from "./LogoutButton";

interface LeftSideBarProps {}

const LeftSideBar: FC<LeftSideBarProps> = ({}) => {
  const pathName = usePathname();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathName.includes(link.route) && link.route.length > 1) ||
            pathName === link.route;

          return (
            <Link
              key={link.label}
              href={link.route}
              className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6 ">
        <div>
          <LogoutButton>
            <span className="text-light-2 max-lg:hidden">Logout</span>
          </LogoutButton>
        </div>
      </div>
    </section>
  );
};

export default LeftSideBar;
