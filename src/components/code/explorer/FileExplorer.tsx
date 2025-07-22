import { useState, useMemo, useCallback } from "react";

import {
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { FileCollection } from "@/types";
import { convertFilesToTreeItems } from "@/lib/utils";

import { CodePanel, TreePanel } from "@/components/code/explorer/panels";

interface FileExplorerProps {
  files: FileCollection;
}
const FileExplorer = ({ files }: FileExplorerProps) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(() => {
    const fileKeys = Object.keys(files);
    return fileKeys.length > 0 ? fileKeys[0] : null;
  });
  const [copied, setCopied] = useState(false);
  const treeData = useMemo(() => {
    return convertFilesToTreeItems(files);
  }, [files]);
  const handleFileSelect = useCallback(
    (filePath: string) => {
      console.log({ filePath });
      if (files[filePath]) {
        setSelectedFile(filePath);
      }
    },
    [files]
  );
  const handleCopy = useCallback(() => {
    if (selectedFile) {
      navigator.clipboard.writeText(files[selectedFile]);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [selectedFile, files]);
  return (
    <ResizablePanelGroup direction="horizontal">
      <TreePanel
        treeData={treeData}
        selectedFile={selectedFile}
        onSelect={handleFileSelect}
      />
      <ResizableHandle className="hover:bg-primary transition-colors" />
      <CodePanel
        selectedFile={selectedFile}
        handleCopy={handleCopy}
        copied={copied}
        files={files}
      />
    </ResizablePanelGroup>
  );
};
export default FileExplorer;
