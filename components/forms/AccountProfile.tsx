"use client";

import { FC } from "react";

interface AccountProfileProps {
  user?: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  buttonTitle: string;
}

const AccountProfile: FC<AccountProfileProps> = ({ user, buttonTitle }) => {
  return <div>AccountProfile</div>;
};

export default AccountProfile;
