import { ResizablePanel } from "@/components/ui/resizable"
import {TreeView} from "../../views"
import { TreeItem } from "@/types";
interface TreePanelProps {
    treeData: TreeItem[];
    selectedFile?: string|null;
    onSelect: (filePath:string)=>void;
}
const TreePanel = ({treeData,selectedFile,onSelect}:TreePanelProps) => {
  return (
    <ResizablePanel defaultSize={30} minSize={30} className="bg-sidebar">
      <TreeView data={treeData} value={selectedFile} onSelect={onSelect} />
    </ResizablePanel>
  );
}
export default TreePanel