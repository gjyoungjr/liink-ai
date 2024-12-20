"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState, useCallback } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Home, Sparkles, Folder, UploadCloudIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { FileUploader } from "@/components/file-upload/file-upload";
import { uploadFile } from "@/components/file-upload/actions";

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
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

export function NavMain() {
  const currentPathName = usePathname();
  const [isFileUploadOpen, setFileUploadOpen] = useState<boolean>(false);
  const [files, setFiles] = useState<
    Array<{ name: string; status: string }> | undefined
  >(undefined);

  const onUpload = useCallback(async (files: File[]) => {
    if (!files.length) return;
    setFiles(files.map((f) => ({ name: f.name, status: "UPLOADING" }))); // default status

    const uploadResults = await Promise.all(files.map(uploadFile));

    // Update status for each file based on upload results
    setFiles((prevFiles) =>
      prevFiles?.map((f) => {
        const result = uploadResults.find((res) => res.fileName === f.name);
        if (result) {
          return { name: f.name, status: result.status };
        }
        return f;
      })
    );
  }, []);

  return (
    <SidebarMenu>
      {data.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.url === currentPathName}>
            {item.title === "Upload" ? (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setFileUploadOpen(true);
                }}
                className="cursor-pointer"
              >
                <item.icon />
                <span>{item.title}</span>
              </a>
            ) : (
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}

      <Dialog
        open={isFileUploadOpen}
        onOpenChange={(isOpen) => setFileUploadOpen(isOpen)}
      >
        <FileUploader
          onUpload={onUpload}
          maxNumFiles={1}
          acceptedFileTypes={{
            "text/csv": [".csv"],
          }}
          maxFileSize={MAX_FILE_SIZE}
          files={files}
        />
      </Dialog>
    </SidebarMenu>
  );
}
