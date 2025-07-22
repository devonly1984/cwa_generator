"use client";
import { ResizablePanel } from "@/components/ui/resizable";
import { FileBreadcrumb } from "../../FileBreadCrumb";
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { Copy, CopyCheck } from "lucide-react";
import {CodeView} from "../../views/";
import { getLanguageFromExtension } from "@/lib/utils";
import { FileCollection } from "@/types";
interface CodePanelProps {
  selectedFile: string | null;
  files: FileCollection;
  copied: boolean;
  handleCopy: () => void;
}
const CodePanel = ({
  selectedFile,
  files,
  copied,
  handleCopy,
}: CodePanelProps) => {
  return (
    <ResizablePanel defaultSize={70} minSize={50}>
      {selectedFile && files[selectedFile] ? (
        <div className="h-full w-full flex flex-col">
          <div className="border-b bg-sidebar px-4 py-2 flex justify-between items-center gap-x-2">
            <FileBreadcrumb filePath={selectedFile} />
            <Hint text="Copy to clipboard" side="bottom">
              <Button
                variant={"outline"}
                size={"icon"}
                className="ml-auto"
                onClick={handleCopy}
                disabled={copied}
              >
                {copied ? <CopyCheck /> : <Copy />}
              </Button>
            </Hint>
          </div>
          <div className="flex-1 overflow-auto">
            <CodeView
              code={files[selectedFile]}
              lang={getLanguageFromExtension(selectedFile)}
            />
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-muted-foreground">
          Select a file to view it&apos;s content
        </div>
      )}
    </ResizablePanel>
  );
};
export default CodePanel;
