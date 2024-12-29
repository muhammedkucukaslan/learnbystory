import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useLogout } from "@/hooks/queries/auth";
import Loader from "@/components/global/loader";
import { useQueryUser } from "@/hooks/queries/user";
import { useRouter } from "next/navigation";

const UserButton: React.FC = () => {
  const router = useRouter();
  const { data: user, isLoading } = useQueryUser();
  const { mutate: logout, isPending } = useLogout();

  if (isLoading) {
    return (
      <Button variant="ghost" className="h-10 w-10 rounded-full">
        <Loader2 size={24} className="animate-spin" />
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10">
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="end">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>

          <div className="flex flex-col">
            <Link href={`/dashboard/settings`}>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings size={16} />
                Settings
              </Button>
            </Link>

            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-red-600 hover:text-red-600 hover:bg-red-100"
              onClick={logout}
            >
              <Loader state={isPending}>
                <LogOut size={16} />
              </Loader>
              Sign Out
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserButton;
