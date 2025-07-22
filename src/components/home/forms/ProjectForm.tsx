
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
import { useRouter } from "next/navigation";
import { projectSchema, ProjectSchema } from '@/lib/schemas/projectSchema';
import { PROJECT_TEMPLATES } from '@/app/(home)/constants';




const ProjectForm = () => {
    const [isFocused, setIsFocused] = useState(false);
    const router =useRouter();
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    const createProject = useMutation(
      trpc.projects.create.mutationOptions({
        onSuccess: (data) => {
          queryClient.invalidateQueries(
            trpc.projects.getMany.queryOptions()
          );
          router.push(`/projects/${data.id}`);
          //TODO: Invalidate usage status
        },
        onError: (error) => {
          //TODO: Redirect to pricing page if specific error
          toast.error(error.message);
        },
      })
    );
       const form = useForm<ProjectSchema>({
         resolver: zodResolver(projectSchema),
         defaultValues: {
           value: "",
         },
       });
    const isPending = createProject.isPending;
    const isButtonDisabled = isPending || !form.formState.isValid;
 
    
    const onSubmit = async (values:ProjectSchema)=>{
      await createProject.mutateAsync({
        prompt: values.value,
      });
    }
    const onSelect = (value:string)=>{
      form.setValue("value", value, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
    }
  return (
    <Form {...form}>
      <section className="space-y-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
            isFocused && "shadow-xs"
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
        <div className="flex-wrap justify-center gap-2 hidden md:flex max-w-3xl">
          {PROJECT_TEMPLATES.map((template) => (
            <Button
              key={template.title}
              variant={"outline"}
              size={"sm"}
              className="bg-white dark:bg-sidebar"
              onClick={() => onSelect(template.title)}
            >
              {template.emoji} {template.title}
            </Button>
          ))}
        </div>
      </section>
      
    </Form>
  );
};
export default ProjectForm;