import { Link } from "react-router-dom";
import logo from "/saad-logo.svg";
import logoReversed from "/saad-reversed.svg";
import { useSelector } from "react-redux";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation } from "react-router-dom";
import { RenderMenu } from "./RenderMenu";

export const Sidebar = ({ menu }) => {
  const { theme } = useSelector((state) => state.ui);
  const { name } = useSelector((state) => state.auth);
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const lastUrl = localStorage.getItem("lastUrl");
  
  return (
    <div className="hidden border-r dark:bg-background bg-white md:block h-full">
      <div className="flex h-[100vh] max-h-screen flex-col gap-2 relative">
        <div className="flex px-4 mt-4 border-b  mb-5 ">
          <Link to="/inicio" className="mb-2">
            <img src={theme == "dark" ? logoReversed : logo} alt="logo saad" />
          </Link>
        </div>
        <ScrollArea className="h-full rounded-md pr-4">
          <RenderMenu menu={menu} />
        </ScrollArea>
      </div>
    </div>
  );
};
