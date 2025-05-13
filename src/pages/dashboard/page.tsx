import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { SiteHeader } from "@/components/shared/site-header";
import { SectionCards } from "@/components/shared/section-cards";
import { ChartAreaInteractive } from "@/components/shared/chart-area-interactive";
import { AppSidebar } from "@/components/shared/app-sidebar";

interface dashboardConfig {
  title: string;
  logo: string;
}

interface dashboardProps {
  config: dashboardConfig;
}

export default function Dashboard({ config }: dashboardProps) {
  const { title, logo } = config;
  return (
    <SidebarProvider>
      <AppSidebar title={title} logo={logo} variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
