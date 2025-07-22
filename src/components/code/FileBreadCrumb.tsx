import { Fragment } from "react";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

export const FileBreadcrumb = ({ filePath }: { filePath: string }) => {
  const pathSegments = filePath.split('/');
  const maxSegments = 4;
  const renderBreadcrumbItems = ()=>{
    if (pathSegments.length <=maxSegments) {
      return pathSegments.map((segment,index)=>{
        const isLast = index === pathSegments.length - 1;
        return (
          <Fragment key={index}>
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage className="font-medium">
                  {segment}
                </BreadcrumbPage>
              ) : (
                <span className="text-muted-foreground">{segment}</span>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator />}
          </Fragment>
        );
      })
    } else {
        const firstSegment = pathSegments[0];
        const lastSegment = pathSegments[pathSegments.length - 1];
        return (
          <>
            <BreadcrumbItem>
              <span className="text-muted-foreground">{firstSegment}</span>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">
                  {lastSegment}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbItem>
          </>
        );
    }
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>{renderBreadcrumbItems()}</BreadcrumbList>
    </Breadcrumb>
  );
};