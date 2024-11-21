import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "/saad-logo.svg";
import logoReversed from "/saad-reversed.svg";
import { useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RenderMenu } from "./RenderMenu";
import { SidebarColapse } from "./SidebarColapse";

export const Sidebar = ({ menu }) => {
  const { theme, siebarState } = useSelector((state) => state.ui);
  const location = useLocation();

  const mainLogo = useMemo(() => (
    <img
      src={theme === "dark" ? logoReversed : logo}
      className={` ${siebarState ? "" : "hidden"}`}
      alt="logo saad"
    />
  ), [theme, siebarState]);

  const sidebarLogo = useMemo(() => (
    <img
      src="/sidebar.svg"
      className={` ${siebarState ? "hidden" : ""}`}
      alt="logo saad"
      width={100}
    />
  ), [siebarState]);

  return (
    <div className="hidden border-r dark:bg-background bg-white md:block h-full">
      <div className="flex h-[100vh] max-h-screen flex-col gap-2 relative">
        <div className={`flex px-2 mt-4 ${siebarState && "border-b"} mb-5`}>
          <Link to="/inicio" className="mb-2">
            {mainLogo}
            {sidebarLogo}
          </Link>
        </div>
        <ScrollArea className="h-full rounded-md pr-4">
          {siebarState ? <RenderMenu menu={menu} /> : <SidebarColapse menu={menu} />}
        </ScrollArea>
      </div>
    </div>
  );
};
