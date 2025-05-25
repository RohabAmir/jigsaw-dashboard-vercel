import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/shared/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import BreadcrumbComponent from "@/components/global/Breadcrumb";
import { ModeToggle } from "@/components/global/mode-toggle";
import { SectionManager } from "@/components/shared/addSectionManager";

interface dashboardConfig {
  title: string;
  logo: string;
}

interface dashboardProps {
  config: dashboardConfig;
}

export default function Sections({ config }: dashboardProps) {
  const { title, logo } = config;
  return (
    <SidebarProvider>
      <AppSidebar title={title} logo={logo} variant="inset" />
      <SidebarInset>
        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mx-2 data-[orientation=vertical]:h-4"
            />
            <BreadcrumbComponent
              Link="/pages"
              LinkText="Pages"
              Title="Building Your Website Sections"
            />
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionManager />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
