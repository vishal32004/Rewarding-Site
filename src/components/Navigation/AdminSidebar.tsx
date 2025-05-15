import * as React from "react";
import {
  Camera,
  BarChart2,
  ShoppingCart,
  DollarSign,
  Users,
  FileText,
  Settings,
  Command,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/Navigation/NavUser";
import { Link } from "react-router-dom";

const data = {
  navMain: [
    {
      title: "Campaign",
      Icon: Camera,
      url: "#",
      items: [
        {
          title: "Start New Campaign",
          url: "/create-new-campaign",
        },
        {
          title: "View Campaign",
          url: "/view-campaign",
        },
      ],
    },
    {
      title: "Storefront",
      Icon: ShoppingCart,
      url: "#",
      items: [
        {
          title: "Edit Storefront URL",
          url: "/storefront",
        },
        {
          title: "Edit Catalogue",
          url: "#",
          isActive: true,
        },
        {
          title: "Add Logo",
          url: "#",
        },
        {
          title: "Change Points Name",
          url: "#",
        },
        {
          title: "Enable Footer",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      Icon: BarChart2,
      url: "#",
      items: [
        {
          title: "Reward Points",
          url: "/reports",
        },
        {
          title: "Reward Code",
          url: "#",
        },
        {
          title: "Recipient Level",
          url: "#",
        },
      ],
    },
    {
      title: "Product Level Reporting",
      Icon: FileText, // Changed to FileText icon
      url: "#",
      items: [
        {
          title: "Top Products",
          url: "#",
        },
        {
          title: "Top Categories",
          url: "#",
        },
      ],
    },
    {
      title: "Payment",
      Icon: DollarSign,
      url: "#",
      items: [
        {
          title: "View Balance",
          url: "/payment",
        },
        {
          title: "Transaction History",
          url: "/transation-history",
        },
      ],
    },
    {
      title: "Admins",
      Icon: Users,
      url: "/admins",
      items: [
        {
          title: "All Admins",
          url: "/admins",
        },
        {
          title: "Add New",
          url: "#",
        },
        {
          title: "Delete Existing Admin",
          url: "#",
        },
      ],
    },
    {
      title: "Templates",
      Icon: Settings,
      url: "#",
      items: [
        {
          title: "All Templates",
          url: "/email-template",
        },
        {
          title: "Email",
          url: "/email-template",
        },
        {
          title: "Landing Page",
          url: "/landing-page",
        },
        {
          title: "Notification",
          url: "/notification",
        },
      ],
    },
  ],
};

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);
  const { setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <Link to="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item);
                        setOpen(true);
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-4 md:px-2 cursor-pointer"
                    >
                      <item.Icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b  py-[1.234rem]">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeItem?.title}
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              {activeItem?.items?.map((subItem) => (
                <Link
                  to={subItem.url}
                  key={subItem.title}
                  className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{subItem.title}</span>
                  </div>
                </Link>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
