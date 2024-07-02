// components/mode-toggle.js
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useTheme } from "../../components/theme-provider";
import { useDispatch } from "react-redux";
import { themeChange } from "../../features/ui/UiSlice";

export function ModeToggle() {
  const { setTheme } = useTheme();
  let theme = localStorage.getItem("vite-ui-theme");
  const dispatch = useDispatch();
  const themeHandled = () => {
    setTheme(theme == "dark" ? "light" : "dark");
    dispatch(themeChange(theme == "dark" ? "light" : "dark"));
  };

  return (
    <div className="theme-toggle">
      <Button
        size="sm"
        className="rounded-full h-[50px] w-[50px] dark:bg-accent-foreground hover:dark:dark:bg-accent-foreground/80 text-white hover:text-white dark:text-black bg-accent-foreground hover:bg-accent-foreground/80"
        onClick={() => themeHandled()}
      >
        {theme == "dark" ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}
