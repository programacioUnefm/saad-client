import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users, KeyIcon } from "lucide-react";

export const CardsDashboard = () => {
  return (
    <>
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Presupuesto
          </CardTitle>
          <div className="rounded-full bg-primary p-2">
            <DollarSign className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45,231 BS</div>
          <p className="text-xs text-muted-foreground">
            Última modificación{" "}
            <b className="text-muted-foreground/70">05/06/2020</b>
          </p>
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Privilegios</CardTitle>
          <div className="rounded-full bg-primary p-2">
            <KeyIcon className="h-4 w-4 text-white " />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2 módulo</div>
          <p className="text-xs text-muted-foreground">Compras, presupuesto</p>
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Empleados
          </CardTitle>
          <div className="rounded-full bg-primary p-2">
            <CreditCard className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12,234</div>
          <p className="text-xs text-muted-foreground">
            +3 esta semana
          </p>
        </CardContent>
      </Card>
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          <div className="rounded-full bg-primary p-2">
            <Activity className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
        </CardContent>
      </Card>
    </>
  );
};
