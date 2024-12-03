"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Search, Sparkles, Folder, UploadCloudIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const data = [
  {
    title: "Upload",
    url: "#",
    icon: UploadCloudIcon,
  },
  {
    title: "Ask AI",
    url: "#",
    icon: Sparkles,
  },
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Documents",
    url: "/dashboard/documents",
    icon: Folder,
  },
];
export function NavMain() {
  const currentPathName = usePathname();

  return (
    <SidebarMenu>
      {data.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.url === currentPathName}>
            <a href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
