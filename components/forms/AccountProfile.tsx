"use client";

import { UserSchemaType, UserValidator } from "@/lib/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, FC } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { Textarea } from "../ui/textarea";

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
  const form = useForm({
    resolver: zodResolver(UserValidator),
    defaultValues: {
      name: "",
      username: "",
      bio: "",
      profile_photo: "",
    },
  });

  function onSubmit(values: UserSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  function handleImage(e: ChangeEvent, fieldChange: (value: string) => void) {
    e.preventDefault;
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-start gap-10"
        >
          <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="account-form_image-label">
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="profile photo"
                      width={96}
                      height={96}
                      priority
                      className="rounded-full object-contain"
                    />
                  ) : (
                    <Image
                      src="/assets/profile.svg"
                      alt="profile photo"
                      width={24}
                      height={24}
                      priority
                      className="object-contain"
                    />
                  )}
                </FormLabel>
                <FormControl className="text-base-semibold flex-1 text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Upload a photo..."
                    className="account-form_image-input"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex w-full items-center gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Name
                </FormLabel>
                <FormControl className="text-base-semibold flex-1 text-gray-200">
                  <Input
                    type="text"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex w-full items-center gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Username
                </FormLabel>
                <FormControl className="text-base-semibold flex-1 text-gray-200">
                  <Input
                    type="text"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex w-full items-center gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Bio
                </FormLabel>
                <FormControl className="text-base-semibold flex-1 text-gray-200">
                  <Textarea
                    rows={10}
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AccountProfile;
