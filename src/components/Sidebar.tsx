"use client";

import { sidebarItems } from "@/constants";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="min-h-screen w-[275px] p-4 border-r-2">
      <h2 className="text-3xl font-bold text-blue-500 p-2">Memorize</h2>

      <div className="flex flex-col gap-4 mt-10">
        {sidebarItems.map((sidebarItem) => {
          const isActive = pathname === sidebarItem.href;

          return (
            <SidebarItem
              key={sidebarItem.label}
              item={sidebarItem}
              isActive={isActive}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
