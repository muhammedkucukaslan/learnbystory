import { SIDEBAR_MENU } from "@/constants/menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  page: string;
  slug: string;
};

const Items = ({ page, slug }: Props) => {
  return SIDEBAR_MENU.map((item) => (
    <Link
      key={item.id}
      href={`/dashboard/${slug}/${item.label === "home" ? "/" : item.label}`}
      className={cn(
        "capitalize flex gap-x-2 rounded-full font-medium p-3 items-center",
        page === item.label && "bg-slate-500/20",
        page === slug && item.label === "home"
          ? "bg-slate-500/20"
          : "text-secondary-foreground"
      )}
    >
      {item.icon}
      <p className="mt-0.5">{item.label}</p>
    </Link>
  ));
};

export default Items;
