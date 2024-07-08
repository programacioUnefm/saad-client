import { UserRoundCog } from "lucide-react";

export const NoTabSelected = () => {
  return (
    <div className="flex justify-center h-[67vh] items-center">
      <div className="flex flex-col text-center w-[500px]">
        <div className="text-center flex justify-center mb-8 text-ring">
          <UserRoundCog size={80} />
        </div>
        <h2 className="uppercase text-2xl font-bold mb-4 text-ring">
          Control de usuarios
        </h2>
        <p className="text-ring">
          Selecciona una de las opciones que están en la parte superior
          izquierda de está sección para comenzar, si no ves nada quizás no
          deberias estar en esta sección.
        </p>
      </div>
    </div>
  );
};
