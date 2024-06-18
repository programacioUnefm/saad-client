import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { LoginApp } from "@/features/auth/LoginThunk";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const LoginForm = ({ setloginState }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [load, setload] = useState(false);
  const onSubmit = async (data) => {
    setload(true);
    const resp = await dispatch(LoginApp(data));
    setload(false);
    switch (resp.code) {
      case 200:
        toast({
          title: `Bienvenido de nuevo ${resp.user.name}`,
          description: "Comencemos a trabaja.",
        });
        navigate("/inicio");
        setload(false);
        break;
      case 400:
        toast({
          variant: "destructive",
          title: "Usuario o contraseña invalida",
        });
        setload(false);
        break;
      case "ERR_NETWORK":
        toast({
          variant: "destructive",
          title: "Tenemos problemas",
          description: "Estamos tratando de solucionar lo más pronto posible, si el problema persiste por favor llamar a servicio técnico",
        });
        setload(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="input-group">
        <label htmlFor="document_id">Número de cédula</label>
        <Input
          autoFocus
          type="text"
          name="document_id"
          id="document_id"
          {...register("document_id", { required: true })}
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Contraseña</label>
        <Input
          type="password"
          name="password"
          id="password"
          {...register("password", { required: true })}
        />
      </div>
      <div className="mt-8 w-full flex justify-center align-middle text-center">
        <Button disabled={load} className="w-full uppercase" type="submit">
          {load && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {load ? "Enviando..." : "Registrarme ahora"}
        </Button>
      </div>
      <div className="flex mt-8">
        <div className="flex items-center space-x-2 w-2/5">
          <Checkbox id="recuerdame" />
          <label htmlFor="recuerdame">Recuerdame</label>
        </div>
        <div className="flex justify-end w-3/5">
          <span
            onClick={() => setloginState("forgot")}
            className="text-blue-500 font-semibold hover:text-blue-300 cursor-pointer"
          >
            Olvidé mi contraseña
          </span>
        </div>
      </div>
    </form>
  );
};
