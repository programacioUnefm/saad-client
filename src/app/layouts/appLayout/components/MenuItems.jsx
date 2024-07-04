import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NavLink } from "react-router-dom";

import { icons } from "lucide-react";

export const MenuItems = ({ item }) => {
  const classDefault = "hover:bg-accent/50 p-3 rounded-md w-full mb-0.5 uppercase font-bold text-[10px] cursor-pointer dark:text-accent-foreground/80  hover:text-accent-foreground flex items-center gap-2 "
  const Icon = ({ name, color, size }) => {
    const LucideIcon = icons[name];
    return <LucideIcon color={color} size={size} />;
  };

  const SingleItem = ({ element }) => {
    return (
      <NavLink to={item.path}>
        {({ isActive, isPending, isTransitioning }) => (
          <div
            className={isActive ? `${classDefault} bg-primary/80 text-white hover:bg-primary` : classDefault}>
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
        <AccordionItem value={item.title}>
          <AccordionTrigger className="uppercase font-bold text-sm text-accent-foreground/80 hover:text-accent-foreground">
            <div className="flex gap-2 text-[10px]">
              {item.icon != undefined && <Icon name={item.icon} size={18} />}
              {item.title}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="ml-4 mt-4 relative">
              <div className="w-1 h-full bg-primary/10 dark:bg-accent/50 absolute -left-2"></div>
              <Accordion type="single" className="px-2" collapsible>
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
