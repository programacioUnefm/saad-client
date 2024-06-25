import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const TableHeaderPermissions = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="uppercase">Nombre</TableHead>
        <TableHead className="uppercase">Descripción</TableHead>
        <TableHead className="uppercase text-center">Padre</TableHead>
        <TableHead className="uppercase">Código</TableHead>
        <TableHead className="text-center uppercase">Acciones</TableHead>
      </TableRow>
    </TableHeader>
  );
};
