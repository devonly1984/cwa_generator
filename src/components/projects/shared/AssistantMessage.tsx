import { Fragment, MessageType } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface AssistantMessageProps {
    content:string;
    fragment: Fragment |null;
    createdAt:Date;
    isActiveFragment:boolean;
    onFragmentClick:(fragment:Fragment)=>void;
    type:MessageType;
}
const AssistantMessage = ({
  content,
  fragment,
  createdAt,
  isActiveFragment,
  onFragmentClick,
  type,
}: AssistantMessageProps) => {
  return (
    <div
      className={cn(
        "flex flex-col group px-2 pb-4",
        type === "ERROR" && "text-red-700 dark:text-red-500"
      )}
    >
      <div className="flex items-center gap-2 pl-2 mb-2">
        {/**TODO: Add Logo */}
        <span className="text-sm font-medium">Vibe</span>
        <span className="text-sm  text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
          {format(createdAt, "HH:mm 'on' MMM dd, yyyy")}
        </span>
      </div>
      <div className="flex flex-col pl-8.5 gap-y-4">
        <span>{content}</span>
      </div>
    </div>
  );
};
export default AssistantMessage