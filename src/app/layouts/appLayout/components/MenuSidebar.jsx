import {
  Home,
  ShoppingCart,
  Users,
  ClipboardList,
  ClipboardMinus,
  LockOpen,
  Table,
  BarChart3,
  RefreshCw,
  Activity,
  BookCopy,
  TextSearch,
  FileSearch,
  User2,
  PieChart,
  GraduationCap,
  AlignLeft,
  Building,
  Glasses,
  TableProperties,
  Notebook,
  ChevronDown,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Fragment, useMemo, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Submenu } from "./Submenu";

export const MenuSidebar = ({ menuState, setMenuState, init }) => {
  const openMenu =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary cursor-pointer";
  const closeMenu =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer";

  const activeMenu =
    "flex items-center bg-muted text-primary gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary";
  const link =
    "flex items-center text-foregound/80 gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary";

  const linkSub =
    "flex items-center gap-3 text-muted-foreground rounded-lg px-3 py-2 transition-all hover:text-primary";

  const activeClass = (isActive, subMenuItem = "") => {
    if (subMenuItem != "") {
      if (isActive) {
        return activeMenu;
      } else {
        return linkSub;
      }
    } else {
      if (isActive) {
        return activeMenu;
      } else {
        return link;
      }
    }
  };

  const toggleCollapse = (index, indexSubmenu) => {
    menuState.forEach((element) => {
      if (element.subMenu != undefined) {
        element.subMenu.forEach((element) => {
          element.collapse = false;
        });
      }
    });
    let menu = [...menuState];
    let newState = { ...menuState[index] };
    newState.subMenu.splice(indexSubmenu, 1, {
      ...newState.subMenu[indexSubmenu],
      collapse: !newState.subMenu[indexSubmenu].collapse,
    });
    menu[index] = newState;
    setMenuState(menu);
  };

  return (
    <>
      <ScrollArea className="content" style={{ height: "56vh" }}>
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 ">
          {menuState.map((menuItem, index) => (
            <div className="menu-item" key={menuItem.title}>
              <NavLink
                to={menuItem.path}
                className={({ isActive }) => activeClass(isActive)}
              >
                {menuItem.icon}
                {menuItem.title}
              </NavLink>
              {menuItem.children && (
                <div className="ml-4">
                  {menuItem.subMenu.map((subMenuItem, indexSubmenu) => (
                    <Fragment key={subMenuItem.title}>
                      {subMenuItem.children ? (
                        <div className="menu-sub" key={subMenuItem.title}>
                          <div
                            className={
                              subMenuItem.collapse ? openMenu : closeMenu
                            }
                            onClick={() => toggleCollapse(index, indexSubmenu)}
                          >
                            {subMenuItem.icon}
                            {subMenuItem.title}
                            <div className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                              <ChevronDown
                                className={
                                  subMenuItem.collapse
                                    ? "rotate-180 transition-all"
                                    : "transition-all"
                                }
                              />
                            </div>
                          </div>

                          <div
                            className={
                              subMenuItem.collapse
                                ? "ml-8 h-58 fade-in-bottom"
                                : "ml-8 hidden"
                            }
                          >
                            <div
                              className="bg-muted-foreground/10 -ml-3 w-0.5 mt-3 absolute"
                              style={{ height: `${subMenuItem.height}` }}
                            ></div>
                            {subMenuItem.subMenu.map((row) => (
                              <Submenu
                                key={row.title}
                                title={row.title}
                                path={row.path}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="menu-sub">
                          <NavLink
                            to={subMenuItem.path}
                            className={({ isActive }) =>
                              activeClass(isActive, "submenuorder")
                            }
                          >
                            {subMenuItem.icon}
                            {subMenuItem.title}
                          </NavLink>
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </>
  );
};
