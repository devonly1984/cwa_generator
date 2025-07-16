import { Fragment, MessageRole, MessageType } from "@/generated/prisma";
import UserMessage from "./UserMessage";
import AssistantMessage from "./AssistantMessage";

interface MessageCardProps {
    content:string;
    fragment: Fragment |null;
    createdAt:Date;
    isActiveFragment:boolean;
    onFragmentClick:(fragment:Fragment)=>void;
    type: MessageType;
    role: MessageRole;
}
const MessageCard = ({
  content,
  role,
  fragment,
  createdAt,
  isActiveFragment,
  onFragmentClick,
  type,
}: MessageCardProps) => {
    if (role==='ASSISTANT') {
        return (
          <AssistantMessage
            content={content}
            fragment={fragment}
            createdAt={createdAt}
            isActiveFragment={isActiveFragment}
            onFragmentClick={onFragmentClick}
            type={type}
          />
        );
    }
  return <UserMessage content={content} />;
};
export default MessageCard