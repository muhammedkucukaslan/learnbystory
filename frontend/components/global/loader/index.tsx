import { cn } from "@/lib/utils";
import React from "react";
import { Loader2 } from "lucide-react";

type Props = {
  state: boolean;
  className?: string;
  children: React.ReactNode;
  color?: string;
};

const Loader = ({ children, state, className, color }: Props) => {
  return state ? (
    <div className={cn(className)}>
      <Loader2 color={color} className="animate-spin" />
    </div>
  ) : (
    children
  );
};

export default Loader;
