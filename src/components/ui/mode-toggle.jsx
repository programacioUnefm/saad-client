// components/mode-toggle.js
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useDispatch } from "react-redux";
import { themeState } from "@/features/login/LoginSlice";

export function ModeToggle() {
  const { setTheme } = useTheme();
  let theme = localStorage.getItem("vite-ui-theme");
  const dispatch = useDispatch();
  const themeHandled = () => {
    setTheme(theme == "dark" ? "light" : "dark");
    dispatch(themeState(theme == "dark" ? "light" : "dark"));
  };

  return (
    <div className="theme-toggle">
      <Button
        size="sm"
        className="rounded-full px-3 shadow-md border-2 border-grey-300 bg-slate-200 text-black hover:bg-slate-100"
        onClick={() => themeHandled()}
      >
        {theme == "dark" ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}
