import {
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

export const TableHeaderUsers = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">CEDULA</TableHead>
        <TableHead className="hidden lg:table-cell w-[100px]">NOMBRES</TableHead>
        <TableHead className="hidden lg:table-cell w-[100px]">
          APELLIDOS
        </TableHead>
        <TableHead className="hidden xl:table-cell w-[100px]">CORREO</TableHead>
        <TableHead className="hidden md:table-cell w-full">ROLES</TableHead>
        {/* pr-24 */}
        <TableHead className="text-center max-w-[300px]">ACCIONES</TableHead>
      </TableRow>
    </TableHeader>
  );
};
