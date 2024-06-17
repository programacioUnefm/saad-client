import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";
export const TitleAndBradCrum = ({ title }) => {
  const ruta = useLocation().pathname;
  const routes = ruta.split("/").filter((segmento) => segmento !== "");
  return (
    <>
      <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      <Breadcrumb className="-mb-2">
        <BreadcrumbList>
          {routes.map((route, index) => (
            <React.Fragment key={Math.random()}>
              <BreadcrumbItem>
                {index < routes.length - 1 ? (

                  <BreadcrumbLink
                    className="capitalize"
                    href={index == 0? "/" + routes[0] :`../${route}`}
                  >
                    {route}
                  </BreadcrumbLink>
                ) : (
                    <BreadcrumbPage>{route}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < routes.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
