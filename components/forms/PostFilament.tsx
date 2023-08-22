"use client";

import { updateUser } from "@/lib/actions/user.actions";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import { UserSchemaType, UserValidator } from "@/lib/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  FilamentSchemaType,
  FilamentValidator,
} from "@/lib/validators/filament";
import { createFilament } from "@/lib/actions/filaments.actions";

interface PostFilamentProps {
  userId: string;
}

const PostFilament: FC<PostFilamentProps> = ({ userId }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(FilamentValidator),
    defaultValues: {
      filament: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: FilamentSchemaType) => {
    await createFilament({
      text: values.filament,
      author: userId,
      communityId: null,
      path: pathname,
    });

    router.push("/");
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" mt-10 flex flex-col justify-start gap-10"
        >
          <FormField
            control={form.control}
            name="filament"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Content
                </FormLabel>
                <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                  <Textarea rows={10} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-primary-500">
            Post Filament
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PostFilament;
