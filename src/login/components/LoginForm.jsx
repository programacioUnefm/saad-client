import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { LoginApp } from "../../features/auth/LoginThunk";
import { useState } from "react";
import { useToast } from "../../components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const LoginForm = ({ setloginState }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useSelector((state) => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [load, setload] = useState(false);
  const onSubmit = async (data) => {
    setload(true);
    const resp = await dispatch(LoginApp(data));
    switch (resp) {
      case 200:
        toast({
          title: `Bienvenido de nuevo.`,
          description: "Comencemos a trabajar.",
        });
        navigate("/inicio");
        setload(false);
        break;

      case 404:
        toast({
          variant: "destructive",
          title: "Tenemos problemas",
          description:
            "Estamos tratando de solucionar lo más pronto posible, si el problema persiste por favor llamar a servicio técnico",
        });
        setload(false);
        break;
      case 422:
        toast({
          variant: "destructive",
          title: "Usuario o contraseña invalida",
        });
        setload(false);
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="input-group">
        <label htmlFor="login">Usuario</label>
        <Input
          autoFocus
          type="text"
          name="login"
          id="login"
          placeholder="Cédula, correo, nombre de usuario"
          {...register("login", { required: true })}
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
        <Button disabled={load} size="lg" className="w-full uppercase" type="submit">
          {load && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {load ? "Enviando..." : "Iniciar sesión"}
        </Button>
      </div>
      {/* <div className="flex mt-8">
        <div className="flex items-center space-x-2 w-2/5">
        <span
            onClick={() => setloginState("register")}
            className="cursor-pointer hover:underline"
          >
            Crear nueva cuenta
          </span>
        </div>
        <div className="flex justify-end w-3/5">
          <span
            onClick={() => setloginState("forgot")}
            className="text-blue-500 font-semibold hover:text-blue-300 cursor-pointer hover:underline"
          >
            Olvidé mi contraseña
          </span>
        </div>
      </div> */}
    </form>
  );
};
