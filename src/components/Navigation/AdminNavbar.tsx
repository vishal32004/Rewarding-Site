import { SidebarTrigger } from "@/components/ui/sidebar";
export default function AdminNavbar() {
  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center justify-between w-full">
          <SidebarTrigger className="cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}
