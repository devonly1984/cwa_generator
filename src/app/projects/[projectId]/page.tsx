import ProjectView from "@/components/projects/views/ProjectView";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface ProjectPageProps {
    params: Promise<{projectId:string}>;
}
const ProjectPage = async({params}:ProjectPageProps) => {
  const { projectId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.messages.getMany.queryOptions({ projectId })
  );
  void queryClient.prefetchQuery(
    trpc.projects.getOne.queryOptions({
      id: projectId,
    })
  );

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<>Loading</>}>
          <ProjectView projectId={projectId} />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
export default ProjectPage