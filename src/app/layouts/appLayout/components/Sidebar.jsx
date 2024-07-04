import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "/saad-logo.svg";
import logoReversed from "/saad-reversed.svg";
import { useSelector } from "react-redux";

import { navbarMenu } from "./menuJson";
import { MenuItems } from "./MenuItems";
import { Accordion } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Sidebar = () => {
  const { theme } = useSelector((state) => state.ui);
  return (
    <div className="hidden border-r dark:bg-background bg-white md:block h-full">
      <div className="flex h-[100vh] max-h-screen flex-col gap-2 relative">
        <div className="flex px-4 mt-4 border-b  mb-5">
          <Link to="/inicio/" className="mb-2">
            <img src={theme == "dark" ? logoReversed : logo} alt="logo saad" />
          </Link>
        </div>
        <ScrollArea className="h-full rounded-md pr-4">
          <Accordion type="single" className="px-2" collapsible>
            {navbarMenu.map((item) => (
              <MenuItems key={Math.random()} item={item} />
            ))}
          </Accordion>
        </ScrollArea>

        <div className="mt-auto p-4">
          <Card className="bg-gray-100 dark:bg-accent/30">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle className="mb-2">Hola de nuevo</CardTitle>
              <CardDescription>
                Retornemos lo que comenzaste "User name"
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Retornar trabajo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
