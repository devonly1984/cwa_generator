
import { ProjectProps } from "@/types";
import ProjectDropdown from "@/components/projects/dropdown/ProjectDropdown";

const ProjectHeader = ({ projectId }: ProjectProps) => {
 
  return (
    <header className="p-2 flex justify-between items-center border-b">
     <ProjectDropdown projectId={projectId}/>
    </header>
  );
};
export default ProjectHeader