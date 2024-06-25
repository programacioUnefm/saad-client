
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";

export const AcademicoMM = () => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Button
          variant="link"
          className="text-foreground/80 hover:text-foreground uppercase text-sm"
        >
          Académico
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="min-w-[360px] max-w-[530px] max-h-[300px] z-50 bg-background mt-4 p-4">
        <Tabs defaultValue="Secretaría" className="flex">
          <TabsList className="flex-col justify-start bg-background items-start">
            <TabsTrigger className="px-0 py-1" value="departamentos">
              Departamentos
            </TabsTrigger>
            <TabsTrigger value="Secretaría" className="px-0 py-1">
              Secretaría
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="departamentos"
            className="p-2 pl-6 ml-2 rounded-lg max-h-[200px] border border-dashed bg-accent dark:bg-accent/20 shadow-sm"
            style={{ margin: "-2px 0px 0px 8px" }}
          >
            <span className="text-foreground/80 p-0">
              Agregar datos básicos de nuevos trabajadores dentro de la
              institución.
            </span>
            <br />
            <Button variant="outline" className="mt-2 mb-2">
              Ir a departamentos
            </Button>
          </TabsContent>
          <TabsContent
            value="Secretaría"
            className="p-2 ml-2 rounded-lg max-h-[200px] border border-dashed bg-accent dark:bg-accent/20 shadow-sm  items-start"
            style={{ margin: "-2px 0px 0px 8px" }}
          >
            <Button
              variant="link"
              className="text-foreground/80 hover:text-foreground uppercase text-sm"
              style={{ height: "25px" }}
            >
              <ChevronRight className="mr-1 h-4 w-4" /> Registrar datos
            </Button>
            <Button
              variant="link"
              className="text-foreground/80 hover:text-foreground uppercase text-sm"
              style={{ height: "25px" }}
            >
              <ChevronRight className="mr-1 h-4 w-4" /> Reportes
            </Button>
          </TabsContent>
        </Tabs>
      </HoverCardContent>
    </HoverCard>
  );
};
