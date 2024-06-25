import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";

export const AdministrativoMM = () => {
  return (
    <HoverCard >
      <HoverCardTrigger >
        <Button
          variant="link"
          className="text-foreground/80 hover:text-foreground uppercase text-sm"
        >
          Administrativo
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="min-w-[550px] min-h-[150px] z-50 bg-background mt-4 p-4">
        <Tabs defaultValue="contabilidad" className="flex">
          <TabsList className="flex-col justify-start bg-background items-start">
            <TabsTrigger className="px-0 py-1" value="compras">
              Compras
            </TabsTrigger>
            <TabsTrigger value="contabilidad" className="px-0 py-1">
              Contabilidad
            </TabsTrigger>
            <TabsTrigger value="habilitaduria" className="px-0 py-1">
              Habilitaduría
            </TabsTrigger>
            <TabsTrigger value="presupuesto" className="px-0 py-1">
              Presupuesto
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="compras" className="p-2 pl-6 ml-2 rounded-lg max-h-[200px] border border-dashed bg-accent dark:bg-accent/20 shadow-sm" style={{margin: "-2px 0px 0px 8px"}}>
            <div className="flex justify-start items-start">
              <div>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Reportes
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Registro y control
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Plan de compras
                </Button>
              </div>
              <div>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Cierres
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Movimientos
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Tablas básicas
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="contabilidad" className="p-2 pl-6 ml-2 rounded-lg max-h-[200px] border border-dashed bg-accent dark:bg-accent/20 shadow-sm" style={{margin: "-2px 0px 0px 8px"}}>
            <div className="flex justify-start items-start">
              <div>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Formulación
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Ejecución
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Cambios
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Cierres
                </Button>
              </div>
              <div>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Reportes
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Gráficos
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Tablas básicas
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="habilitaduria" className="p-2 pl-6 ml-2 rounded-lg max-h-[200px] border border-dashed bg-accent dark:bg-accent/20 shadow-sm" style={{margin: "-2px 0px 0px 8px"}}>
            <div className="flex justify-start items-start">
              <div>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Reportes
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Libros
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Seg de mov...
                </Button>
              </div>
              <div>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Mov diarios
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Movimientos
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Proveedores
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="presupuesto" className="p-2 pl-6 ml-2 rounded-lg max-h-[200px] border border-dashed bg-accent dark:bg-accent/20 shadow-sm" style={{margin: "-2px 0px 0px 8px"}}>
            <div className="flex justify-start items-start">
              <div>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Reportes
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
                  <ChevronRight className="mr-1 h-4 w-4" /> Cambios
                </Button>
              </div>
              <div>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Cierres
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Ejecución
                </Button>
                <Button
                  variant="link"
                  className="text-foreground/80 hover:text-foreground uppercase text-sm"
                  style={{ height: "25px" }}
                >
                  <ChevronRight className="mr-1 h-4 w-4" /> Gráficos
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </HoverCardContent>
    </HoverCard>
  );
};

