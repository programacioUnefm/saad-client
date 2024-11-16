import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "/saad-logo.svg";
import logoReversed from "/saad-reversed.svg";
import { useSelector } from "react-redux";

import { MenuItems } from "./MenuItems";
import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation } from "react-router-dom";

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
          <Accordion
            type="single"
            className="px-2"
            collapsible
            defaultValue={
              pathSegments.length > 0 && pathSegments[0].toUpperCase()
            }
          >
            {menu.map((item, index) => (
              <MenuItems
                key={Math.random()}
                item={item}
                index={index}
                active={item.title.toUpperCase()}
              />
            ))}
          </Accordion>
        </ScrollArea>

        {/* <div className="mt-auto p-4">
          <Card className="bg-gray-100 dark:bg-accent/30">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle className="mb-2">Hola de nuevo</CardTitle>
              <CardDescription>
                Retornemos lo que comenzaste{" "}
                <span className="uppercase font-bold">"{name}"</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Link to={lastUrl}>
                <Button size="sm" className="w-full">
                  Retornar trabajo
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
};
