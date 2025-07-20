
"use client"
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod';
import TextareaAutosize from 'react-textarea-autosize'
import { useState } from 'react';
import {toast} from 'sonner';
import {ArrowUp,Loader2} from 'lucide-react'

import {  useMutation,useQueryClient } from '@tanstack/react-query';
import { cn} from '@/lib/utils';
 import { Button } from '@/components/ui/button';
 import { useTRPC } from '@/trpc/client';
 import {Form,FormField} from '@/components/ui/form';
import { messageSchema, MessageSchema } from '@/lib/schemas/messageSchema';
import { ProjectProps } from '@/types';



const MessageForm = ({ projectId }: ProjectProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const showUsage = false;
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    const createMessage= useMutation(trpc.messages.create.mutationOptions({
        onSuccess: ()=>{
          form.reset();
          queryClient.invalidateQueries(
            trpc.messages.getMany.queryOptions({ projectId })
          );
          //TODO: Invalidate usage status
        },
        onError: (error)=>{
          //TODO: Redirect to pricing page if specific error
          toast.error(error.message);
        }
    }))
       const form = useForm<MessageSchema>({
         resolver: zodResolver(messageSchema),
         defaultValues: {
           value: "",
         },
       });
    const isPending = createMessage.isPending;
    const isButtonDisabled = isPending || !form.formState.isValid;
 
    
    const onSubmit = async (values:MessageSchema)=>{
      await createMessage.mutateAsync({
        value: values.value,
        projectId,
      });
    }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
          isFocused && "shadow-xs",
          showUsage && "rounded-t-none"
        )}
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <TextareaAutosize
              disabled={isPending}
              {...field}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              minRows={2}
              maxRows={8}
              className="pt-4 resize-none border-none w-full outline-none bg-transparent"
              placeholder="What would you like to build?"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)(e);
                }
              }}
            />
          )}
        />
        <div className="flex gap-x-2 items-end justify-between pt-2">
          <div className=" text-[10px] text-muted-foreground font-mono">
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span>&#8984;</span> Enter
            </kbd>
            &nbsp;to submit
          </div>
          <Button
            disabled={isButtonDisabled}
            className={cn(
              "size-8 rounded-full",
              isButtonDisabled && "bg-muted-foreground border"
            )}
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <ArrowUp />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default MessageForm