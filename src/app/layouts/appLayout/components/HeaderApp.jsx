import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Menu,
    
  } from "lucide-react";

import { InputApp } from "./InputApp";
import { MegaMenu } from "./megamenu/MegaMenu";
import { MyAccount } from "./MyAccount";
export const HeaderApp = () => {
  
  return (
    <header className="flex h-14 items-center gap-4 border-b dark:bg-background bg-white px-4 lg:h-[60px] lg:px-6">
      {/* menu movil */}
      {/* <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline"  className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu movil</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
        <h2>aqui va el menu movil</h2>
        </SheetContent>
      </Sheet> */}
      {/* menu movil */}
      <div className="w-full flex">
         {/* <InputApp />  */}
        <MegaMenu />
      </div>
      <MyAccount />
    </header>
  );
};
