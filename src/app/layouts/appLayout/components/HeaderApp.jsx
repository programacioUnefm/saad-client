import { Button } from "@/components/ui/button";

import { MegaMenu } from "./megamenu/MegaMenu";
import { MyAccount } from "./MyAccount";
import { useDispatch, useSelector } from "react-redux";
import { siebarStateChange } from "@/features/ui/UiSlice";
import { useState } from "react";
import './css/headerApp.css';
export const HeaderApp = () => {
  const { siebarState } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const onSidebarChange = (state) => {
    dispatch(siebarStateChange(state));
  };

  const [isJustified, setIsJustified] = useState(true);

  // Maneja el cambio de estado al hacer clic
  const toggleIcon = () => {
    setIsJustified(!isJustified);
  };
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
        <Button variant="outline" onClick={() => onSidebarChange(!siebarState)}>
          <div className="sidebarIcon">
            <div className="line line1 dark:bg-white" />
            <div className={`line line2 ${!siebarState && "line-active"} dark:bg-white`}/>
            <div className={`line line3 ${!siebarState && "line-active"} dark:bg-white`}/>
          </div>
        </Button>
        <MegaMenu />
      </div>
      <MyAccount />
    </header>
  );
};
