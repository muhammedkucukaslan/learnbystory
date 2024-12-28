import Navbar from "@/components/global/navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

const DashboardLayout = ({ children, params }: Props) => {
  return (
    <main className="h-screen w-full flex flex-col gap-y-12">
      <Navbar slug={params.slug} />

      <div className="p-4">{children}</div>
    </main>
  );
};

export default DashboardLayout;
