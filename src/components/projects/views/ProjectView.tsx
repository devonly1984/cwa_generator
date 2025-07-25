"use client"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MessagesContainer from "@/components/projects/message/MessagesContainer";
import { Suspense, useState } from "react";
import { Fragment } from "@/generated/prisma";
import ProjectHeader from "@/components/projects/headers/ProjectHeader";
import { FileCollection, ProjectProps } from "@/types";
import FragmentWeb from "@/components/projects/FragmentWeb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Code, Crown, Eye,  } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FileExplorer from "@/components/code/explorer/FileExplorer";
import UserControl from "@/components/home/UserControl";


const ProjectView = ({ projectId }: ProjectProps) => {
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(
    null
  );
  const [tabState, setTabState] = useState<"preview" | "code">("preview");

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={20}
          className="flex flex-col min-h-0"
        >
          <Suspense fallback={<>Loading Project Header</>}>
            <ProjectHeader projectId={projectId} />
          </Suspense>
          <Suspense fallback={<p>Loading messages...</p>}>
            <MessagesContainer
              projectId={projectId}
              activeFragment={activeFragment}
              setActiveFragment={setActiveFragment}
            />
          </Suspense>
        </ResizablePanel>
        <ResizableHandle className="hover:bg-primary transition-colors" />

        <ResizablePanel defaultSize={65} minSize={50}>
          <Tabs
            className="h-full gap-y-0"
            defaultValue="preview"
            value={tabState}
            onValueChange={(value) =>
              setTabState(value as "preview" | "code")
            }
          >
            <div className="w-full flex items-center p-2 border-b gap-x-2">
              <TabsList className="h-8 p-0 border rounded-md">
                <TabsTrigger value="preview" className="rounded-md">
                  <Eye />
                  <span>Demo</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="rounded-md">
                  <Code />
                  <span>Code</span>
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-x-2">
                <Button asChild size="sm" variant={"tertiary"}>
                  <Link href="/pricing">
                    <Crown />
                    Upgrade
                  </Link>
                </Button>
                <UserControl />
              </div>
            </div>
            <TabsContent value="preview">
              {!!activeFragment && <FragmentWeb data={activeFragment} />}
            </TabsContent>
            <TabsContent value="code" className="min-h-0">
              {!!activeFragment?.files && (
                <FileExplorer
                  files={activeFragment?.files as FileCollection}
                />
              )}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
export default ProjectView