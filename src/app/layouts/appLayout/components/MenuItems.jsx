import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavLink, useLocation } from "react-router-dom";
import { icons } from "lucide-react";
import { useSelector } from "react-redux";

const Icon = ({ name, color = "currentColor", size = 18 }) => {
  const LucideIcon = icons[name];
  return LucideIcon ? <LucideIcon color={color} size={size} /> : null;
};

const checkPermissions = (permissions, requiredPermissions, roleList) => {
  // Admins tienen todos los permisos
  if (roleList.some((role) => role.includes("ADMIN"))) return true;
  // Verificar permisos específicos
  if (!requiredPermissions) return true;
  return requiredPermissions.every((perm) => permissions.includes(perm));
};

const SingleMenuItem = ({ item, classDefault, hasPermission }) => (
  <NavLink
    to={item.path}
    style={!hasPermission ? { pointerEvents: "none" } : {}}
  >
    {({ isActive }) =>
      item.action === "hidden" ? null : (
        <div
          className={`${classDefault} ${
            isActive
              ? "bg-primary/80 dark:bg-accent dark:text-accent-foreground/80 text-white"
              : hasPermission
              ? "dark:text-accent-foreground/80 hover:bg-accent/50 hover:text-accent-foreground"
              : "text-ring/40 cursor-not-allowed"
          }`}
        >
          {item.icon && <Icon name={item.icon} />}
          {item.title}
        </div>
      )
    }
  </NavLink>
);

export const MenuItems = ({ item, index }) => {
  const { permissions, roleList } = useSelector((state) => state.auth);
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const hasPermission = checkPermissions(permissions, item.permission, roleList);

  const classDefault =
    "p-3 rounded-md w-full mb-0.5 uppercase font-bold text-[10px] flex items-center gap-2";

  return (
    <div>
      {item.subMenu ? (
        <AccordionItem
          value={item.title.toUpperCase()}
          disabled={!hasPermission}
        >
          <AccordionTrigger
            className={`uppercase font-bold text-sm ${
              hasPermission
                ? "text-accent-foreground/80 hover:text-accent-foreground"
                : "cursor-not-allowed text-gray-400"
            }`}
          >
            <div className="flex gap-2 text-[10px]">
              {item.icon && <Icon name={item.icon} />}
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
                  pathSegments[index]?.replace(/-/g, " ").toUpperCase()
                }
              >
                {item.subMenu.map((submenu) => (
                  <MenuItems key={submenu.title} item={submenu} />
                ))}
              </Accordion>
            </div>
          </AccordionContent>
        </AccordionItem>
      ) : (
        <SingleMenuItem
          item={item}
          classDefault={classDefault}
          hasPermission={hasPermission}
        />
      )}
    </div>
  );
};
