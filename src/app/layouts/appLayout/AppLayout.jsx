import React, { useEffect, useMemo, useRef, cloneElement } from "react";

import { Toaster } from "../../../components/ui/toaster";
import { ScrollArea, ScrollBar } from "../../../components/ui/scroll-area";
import { Sidebar } from "./components/Sidebar";
import { useSelector } from "react-redux";
import { TitleAndBradCrum } from "./components/TitleAndBradCrum";
import { HeaderApp } from "./components/HeaderApp";
import { Button } from "../../../components/ui/button";
import { PaginationItems } from "./components/PaginationItems";
import { useToast } from "@/components/ui/use-toast";
import { navbarMenu } from "./components/menuJson";

export function AppLayout({
  children,
  title,
  titleButton = "",
  functionButton = undefined,
}) {
  const { theme } = useSelector((state) => state.auth);
  const { dialog } = useSelector((state) => state.ui);
  const { toast } = useToast();
  useEffect(() => {
    dialog.status &&
      toast({
        title: dialog.title,
        variant: dialog.variant,
        description: dialog.message,
      });
  }, [dialog]);
  const sidebarComponent = useMemo(
    () => <Sidebar menu={navbarMenu} />,
    [navbarMenu]
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {sidebarComponent}
      <div className="flex flex-col bg-slate-50 dark:bg-background">
        <HeaderApp />
        <main className="flex flex-1 flex-col bg-muted/10 gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="grid grid-cols-2">
            <div>
              <TitleAndBradCrum title={title} />
            </div>
            {!!titleButton && (
              <div className="flex justify-end items-end pr-12">
                <Button variant="outline" onClick={functionButton}>
                  {titleButton}
                </Button>
              </div>
            )}
          </div>
          <div className="p-5 dark:bg-background bg-slate-100 rounded-lg border border-dashed shadow-sm h-full">
            <ScrollArea className="h-[75vh] px-4 relative">
              {children}
            </ScrollArea>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
