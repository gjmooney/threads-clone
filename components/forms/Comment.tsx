"use client";

import { FC } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentSchemaType, CommentValidator } from "@/lib/validators/filament";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/filaments.actions";
import { usePathname } from "next/navigation";

interface CommentProps {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

const Comment: FC<CommentProps> = ({
  threadId,
  currentUserImg,
  currentUserId,
}) => {
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(CommentValidator),
    defaultValues: {
      filament: "",
    },
  });

  const onSubmit = async (values: CommentSchemaType) => {
    await addCommentToThread(
      threadId,
      values.filament,
      JSON.parse(currentUserId),
      pathname,
    );

    form.reset();
  };

  return (
    <div className="text-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
          <FormField
            control={form.control}
            name="filament"
            render={({ field }) => (
              <FormItem className="flex w-full items-center gap-3">
                <FormLabel>
                  <Image
                    src={currentUserImg}
                    alt="profile image"
                    width={48}
                    height={48}
                    className="rounded-full object-contain"
                  />
                </FormLabel>
                <FormControl className="border-none bg-transparent">
                  <Input
                    placeholder="Comment..."
                    {...field}
                    className="no-focus"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="comment-form_btn">
            Reply
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Comment;
