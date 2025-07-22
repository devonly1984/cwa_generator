import {  MessageRole } from "@/generated/prisma";
import UserMessage from "@/components/projects/message/UserMessage";
import AssistantMessage from "@/components/projects/message/AssistantMessage";
import { MessageProps } from "@/types";

interface  MessageCardProps extends MessageProps {
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