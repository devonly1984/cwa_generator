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
export type FileCollection = { [path: string]: string };
export type TreeItem = string | [string, ...TreeItem[]];
export interface TreeNode {
  [key: string]: TreeNode | null;
}