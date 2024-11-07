import { cn } from "@/utils/cn";
import Link from "next/link";

export type SidebarItemProps = {
  href: string;
  label: string;
};

const SidebarItem = ({
  item,
  isActive,
}: {
  item: SidebarItemProps;
  isActive: boolean;
}) => {
  return (
    <Link
      className={cn(
        "py-4 px-6 hover:bg-gray-100 transition-all cursor-pointer rounded-xl",
        isActive
          ? "bg-[#DDF4FF] border border-[#53cafd] hover:bg-[#DDF4FF]"
          : ""
      )}
      href={item.href}
    >
      {item.label}
    </Link>
  );
};

export default SidebarItem;
