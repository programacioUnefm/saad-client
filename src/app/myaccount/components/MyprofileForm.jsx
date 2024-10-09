import React from "react";

export const MyprofileForm = ({user}) => {
  return (
    <div className="mt-4 grid grid-cols-2 gap-4 mb-2">
      <div className="flex flex-col items-start">
        <span className="text-foreground/80">Nombres</span>
        <Input defaultValue={user.name} disabled={true} />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-foreground/80">Apellidos</span>
        <Input defaultValue={user.last_name} />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-foreground/80">Documento</span>
        <Input defaultValue={user.document_id} />
      </div>
      <div className="flex flex-col items-start">
        <span className="text-foreground/80">Correo electrónico</span>
        <Input defaultValue={user.email} />
      </div>
    </div>
  );
};
