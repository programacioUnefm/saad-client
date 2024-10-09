import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavLink, useLocation } from "react-router-dom";
import { icons } from "lucide-react";
import { useSelector } from "react-redux";

export const MenuItems = ({ item, index, active }) => {
  const { permissions } = useSelector((state) => state.auth);
  const { roleList } = useSelector((state) => state.auth);
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const classDefault =
    "p-3 rounded-md w-full mb-0.5 uppercase font-bold text-[10px] cursor-pointer flex items-center gap-2 ";
  const Icon = ({ name, color, size }) => {
    const LucideIcon = icons[name];
    return <LucideIcon color={color} size={size} />;
  };

  const permissionCheck = (permission) => {
    if (roleList.every((role) => role.includes("ADMIN"))) {
      return true;
    } else {
      if (permission != undefined) {
        return permission.every((element) => permissions.includes(element));
      }
    }

    return false;
  };
  const SingleItem = ({ element }) => {
    return (
      <NavLink
        to={item.path}
        style={
          !permissionCheck(item.permission) ? { pointerEvents: "none" } : {}
        }
      >
        {({ isActive }) => (
          <div
            className={
              isActive
                ? `${classDefault} bg-primary/80 dark:bg-accent dark:text-accent-foreground/80 dark:hover:text-accent-foreground text-white`
                : !permissionCheck(item.permission)
                ? `${classDefault} text-ring/40`
                : `${classDefault} dark:text-accent-foreground/80 hover:bg-accent/50 hover:text-accent-foreground `
            }
          >
            {item.icon && <Icon name={item.icon} size={18} />}
            {element.title}
          </div>
        )}
      </NavLink>
    );
  };
  return (
    <div>
      {item.subMenu ? (
        <AccordionItem
          value={item.title.toUpperCase()}
          disabled={!permissionCheck(item.permission)}
        >
          <AccordionTrigger
            className={
              !permissionCheck(item.permission)
                ? "uppercase font-bold text-sm cursor-not-allowed"
                : "uppercase font-bold text-sm text-accent-foreground/80 hover:text-accent-foreground"
            }
          >
            <div className="flex gap-2 text-[10px]">
              {item.icon != undefined && <Icon name={item.icon} size={18} />}
              {item.title}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="ml-4 mt-4 relative">
              <div className="w-1 h-full bg-primary/10 dark:bg-accent/50 absolute -left-2"></div>
              <Accordion
                type="single"
                className="px-2"
                collapsible
                defaultValue={
                  pathSegments[index] != undefined &&
                  pathSegments[index].replace(/-/g, " ").toUpperCase()
                }
              >
                {item.subMenu.map((submenu) => (
                  <MenuItems key={Math.random()} item={submenu} />
                ))}
              </Accordion>
            </div>
          </AccordionContent>
        </AccordionItem>
      ) : (
        <SingleItem element={item} />
      )}
    </div>
  );
};
