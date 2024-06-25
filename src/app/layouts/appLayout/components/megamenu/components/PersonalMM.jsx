import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";

export const PersonalMM = () => {
  return (
    <HoverCard >
      <HoverCardTrigger >
        <Button
          variant="link"
          className="text-foreground/80 hover:text-foreground uppercase text-sm"
        >
          Personal
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="min-w-[550px] max-h-[300px] z-50 bg-background mt-4 p-4">
        <Tabs defaultValue="Nómina" className="flex">
          <TabsList className="flex-col justify-start bg-background items-start">
            <TabsTrigger className="px-0 py-1" value="Expediente">
              Expediente
            </TabsTrigger>
            <TabsTrigger value="Nómina" className="px-0 py-1">
              Nómina
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Expediente" className="p-2 pl-6 ml-2 rounded-lg max-h-[200px] border border-dashed bg-accent dark:bg-accent/20 shadow-sm" style={{margin: "-2px 0px 0px 8px"}}>
            <span className="text-foreground/80 p-0">
              Agregar datos básicos de nuevos trabajadores dentro de la institución.
            </span>
            <br />
            <Button variant="outline" className="mt-2 mb-2">Ir a expediente</Button>
          </TabsContent>
          <TabsContent value="Nómina" className="p-2 pl-6 ml-2 rounded-lg max-h-[200px] border border-dashed bg-accent dark:bg-accent/20 shadow-sm" style={{margin: "-2px 0px 0px 8px"}}>
            <div className="flex justify-start items-start">
              <div>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Transacciones
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Calculos
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Tablas básicas
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Reportes
                </Button>
              </div>
              <div>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Cesta tickets
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Viáticos
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Int presentaciones
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> I.S.L.R
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </HoverCardContent>
    </HoverCard>
  );
};
