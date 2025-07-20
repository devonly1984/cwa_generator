import { Fragment, MessageType } from "@/generated/prisma";

export type MessageProps = {
  content: string;
  fragment: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: Fragment) => void;
  type: MessageType;
};

export type ProjectProps = {
  projectId:string;
}