import { FileCollection, TreeItem, TreeNode } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getLanguageFromExtension = (filename:string):string=>{
  const extension = filename.split('.').pop()?.toLowerCase();
  return extension || "text";
}

export const convertNode = (
  node: TreeNode,
  name?: string
): TreeItem[] | TreeItem => {
  const entries = Object.entries(node);
  if (entries.length===0) {
    return name ||'';
  }
  const children: TreeItem[] = [];
  for (const [key,value] of entries) {
    if (value===null) {
      children.push(key);
    } else {
      const subTree = convertNode(value,key);
      if (Array.isArray(subTree)) {
        children.push([key,...subTree])
      } else {
        children.push([key, subTree]);
      }
    }

  }
  return children;
};
export const convertFilesToTreeItems = (
  files: FileCollection
): TreeItem[] => {
  const tree: TreeNode = {};
  const sortedPaths = Object.keys(files).sort();
  for (const filePath of sortedPaths) {
    const parts = filePath.split('/');
    let current = tree;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
    const fileName = parts[parts.length-1];
    current[fileName] = null;
  }
  const result= convertNode(tree);
  return Array.isArray(result) ? result : [result];
};

