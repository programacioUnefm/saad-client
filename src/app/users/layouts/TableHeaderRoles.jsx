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
        <TableHead className="uppercase">Descripción</TableHead>
        <TableHead className="uppercase">Permisos</TableHead>
        <TableHead className="uppercase text-center">Código</TableHead>
        <TableHead className="uppercase text-center">Acciones</TableHead>
      </TableRow>
    </TableHeader>
  );
};
