import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ChevronRight, icons } from "lucide-react";
import { permissionCheck } from "@/features/PermissionCheck";
import { useSelector } from "react-redux";

// Componente para renderizar el menú
export const RenderMenu = ({ menu }) => {
  const location = useLocation();
  const [manualOpenMenus, setManualOpenMenus] = useState({}); // Estado para menús abiertos manualmente
  
    
  // Calcula qué menús deben estar abiertos basado en la ruta actual
  const openMenus = useMemo(() => {
    const currentPath = location.pathname;

    const findOpenMenus = (items, parent = "") => {
      const result = {};
      items.forEach((item) => {
        if (item.subMenu) {
          const subResult = findOpenMenus(item.subMenu, item.title);
          if (
            Object.keys(subResult).length ||
            item.subMenu.some((sub) => sub.path === currentPath)
          ) {
            result[item.title] = true; // Marca este acordeón como abierto
            Object.assign(result, subResult); // Agrega submenús abiertos
          }
        } else if (item.path === currentPath) {
          result[parent] = true; // Marca el acordeón padre
        }
      });
      return result;
    };

    return findOpenMenus(menu);
  }, [location.pathname, menu]);

  // Combina menús abiertos manualmente con los calculados automáticamente
  const effectiveOpenMenus = { ...openMenus, ...manualOpenMenus };

  // Actualiza el estado de los acordeones manualmente
  const handleAccordionChange = (title, isOpen) => {
    setManualOpenMenus((prevState) => ({
      ...prevState,
      [title]: isOpen,
    }));
  };

  

  return (
    <>
      {menu.map((item, index) => (
        <AccordionSubMenu
          key={index}
          item={item}
          openMenus={effectiveOpenMenus}
          onAccordionChange={handleAccordionChange}
        />
      ))}
    </>
  );
};

// Componente para manejar submenús
const AccordionSubMenu = ({ item, openMenus, onAccordionChange }) => {
  const location = useLocation();
  const Icon = icons[item.icon] || null;
  const isOpen = openMenus[item.title] || false; // Verifica si este acordeón debe estar abierto

  // Determina si el ítem actual está activo
  const isActive = item.path === location.pathname;
  const auth = useSelector((state) => state.auth)
  
  return (
    <div className={item.action === "only-admin" && auth.permissions[0] != "*" ? "hidden" : "ml-1"}>
      {item.subMenu ? (
        <Accordion
          type="single"
          collapsible
          value={isOpen ? item.title : ""}
          onValueChange={(value) =>
            onAccordionChange(item.title, value === item.title)
          }
          disabled={!permissionCheck(item.permission, auth.permissions)}
        >
          <AccordionItem className="ml-2 my-1" value={item.title} >
            <AccordionTrigger>
              <div className={`flex text-sm`}>
                {Icon && <Icon size={18} className="mr-2" />}
                {item.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-0">
              {item.subMenu?.map((subItem, index) =>
                subItem.subMenu ? (
                  <AccordionSubMenu
                    key={index}
                    item={subItem}
                    openMenus={openMenus}
                    onAccordionChange={onAccordionChange}
                  />
                ) : (
                  <Link to={subItem.path} key={index}>
                    <div
                      className={`flex items-center text-ring hover:bg-accent/50 transition-all my-1 p-3 rounded-md ml-4 ${
                        subItem.path === location.pathname &&
                        "bg-accent/50 text-foreground"
                      }`}
                    >
                      <ChevronRight size={15} className="mr-1" />
                      {subItem.title}
                    </div>
                  </Link>
                )
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <Link to={item.path}>
          <div className="flex flex-col justify-center ml-2">
            {item.action != "hidden" && (
              <div
                className={`flex items-center hover:bg-accent/50 transition-all text-ring text-sm my-1 p-3 rounded-md ${
                  isActive ? "active bg-accent/50 text-foreground" : ""
                }`}
              >
                {Icon && <Icon size={18} className="mr-2" />}
                {item.title}
              </div>
            )}
          </div>
        </Link>
      )}
    </div>
  );
};
