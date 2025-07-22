import { TreeItem } from "@/types";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
 
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import Tree from "../Tree";
interface TreeViewProps {
  data: TreeItem[];
  value?: string | null;
  onSelect: (filePath: string) => void;
}
const TreeView = ({ data, value, onSelect }: TreeViewProps) => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="none" className="w-full">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.map((item, index) => (
                  <Tree
                    key={index}
                    item={item}
                    selectedValue={value}
                    onSelect={onSelect}
                    parentPath=""
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail>

        </SidebarRail>
      </Sidebar>
    </SidebarProvider>
  );
};
export default TreeView