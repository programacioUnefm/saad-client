import React from "react";

import { Toaster } from "@/components/ui/toaster";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "./components/Sidebar";
import { useSelector } from "react-redux";
import { TitleAndBradCrum } from "./components/TitleAndBradCrum";
import { HeaderApp } from "./components/HeaderApp";
import { Button } from "@/components/ui/button";
import { PaginationItems } from "./components/PaginationItems";

export function AppLayout({
  children,
  title,
  titleButton = "",
  functionButton = undefined,
  pagination = false,
  arrayPagination = []
}) {
  const { theme } = useSelector((state) => state.login);
  return (
    
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <HeaderApp />
        <main className="flex flex-1 flex-col bg-muted/10 gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="grid grid-cols-2">
            <div>
              <TitleAndBradCrum title={title} />
            </div>
            {!!titleButton && (
              <div className="flex justify-end">
                <Button onClick={functionButton}>{titleButton}</Button>
              </div>
            )}
          </div>
          <div className="p-5 bg-background rounded-lg border border-dashed shadow-sm h-full">
            <ScrollArea className="h-[72vh] w-full px-4">
              {children}
            </ScrollArea>
            {pagination && <PaginationItems />}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
