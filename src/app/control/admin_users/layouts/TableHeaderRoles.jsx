import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const TableHeaderRoles = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="uppercase">Nombre</TableHead>
        <TableHead className="uppercase w-full">Descripción</TableHead>
        <TableHead className="uppercase w-auto">Permisos</TableHead>
        <TableHead className="uppercase w-auto text-center">Código</TableHead>
        <TableHead className="uppercase text-center min-w-[150px] max-w-[300px]">Acciones</TableHead>
      </TableRow>
    </TableHeader>
  );
};
