import * as React from "react";
import {
  ArrowUpCircleIcon,
  ClipboardListIcon,
  FileIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  Settings2,
  BookOpen,
  UsersIcon,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";

const data = {
  user: {
    name: "admin",
    email: "admin@gmail.com",
    avatar: "/src/assets/logos/jigsawLogo.svg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Pages",
      url: "/pages",
      icon: FolderIcon,
    },
    {
      title: "Categories",
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      title: "Media",
      url: "#",
      icon: SquareTerminal,
    },
    {
      title: "Privacy policy",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Terms & Conditions",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Users Management",
      url: "#",
      icon: UsersIcon,
    },
    {
      title: "Activity Logs",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "User Permissions",
      url: "#",
      icon: ArrowUpCircleIcon,
    },
    {
      title: "Forms",
      url: "#",
      icon: FileIcon,
    },
    {
      title: "SEO Settings",
      url: "#",
      icon: SettingsIcon,
      items: [
        {
          title: "SiteMap",
          url: "#",
        },
        {
          title: "Tag Manager",
          url: "#",
        },
      ],
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  title: string;
  logo: string;
}

export function AppSidebar({ title, logo, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#" className="pointer-events-none">
                <img src={logo} alt={`${title} Logo`} className="h-8 w-8" />
                <span className="text-base font-extrabold">{title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
