import { Input } from "../../components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RegisterApp } from "../../features/auth/LoginThunk";

export const RegisterForm = ({ closeDialog }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const resp = await dispatch(RegisterApp(data));
    if (resp == 200) {
      closeDialog();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="input-group">
          <label htmlFor="name">Nombres</label>
          <Input
            type="text"
            id="name"
            errors={errors.name ? "true" : "false"}
            placeholder="Ej: Juan Pedro"
            {...register("name", { required: true })}
          />
          <span className={errors.name ? "text-destructive" : "hidden"}>
            Nombre requerido
          </span>
        </div>
        <div className="input-group">
          <label htmlFor="last_name">Apellidos</label>
          <Input
            type="text"
            errors={errors.last_name ? "true" : "false"}
            id="last_name"
            placeholder="Ej: Gutierres Garcés"
            {...register("last_name", { required: true })}
          />
          <span className={errors.last_name ? "text-destructive" : "hidden"}>
            Apellidos requerido
          </span>
        </div>

        <div className="input-group">
          <label htmlFor="document_id">Número de cédula</label>
          <Input
            type="number"
            errors={errors.document_id ? "true" : "false"}
            id="document_id"
            placeholder="Ej: 22602761"
            {...register("document_id", {
              required: { value: true, message: "Cédula requerid" },
              minLength: { value: 4, message: "Cédula invalida" },
            })}
          />
          <span className={errors.document_id ? "text-destructive" : "hidden"}>
            Cédula es requerida
          </span>
        </div>
        <div className="input-group">
          <label htmlFor="email">Correo electrónico</label>
          <Input
            type="email"
            errors={errors.email ? "true" : "false"}
            id="email"
            placeholder="Ej: correo@gmail.com"
            {...register("email", {
              required: { value: true, message: "El correo es requerido" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "correo no válido",
              },
            })}
          />
          {errors.email && (
            <span className="text-destructive">{errors.email.message}</span>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <Input
            type="password"
            errors={errors.password ? "true" : "false"}
            id="password"
            placeholder="Ej: 33445889"
            {...register("password", {
              required: { value: true, message: "Contraseña requerida" },
              minLength: { value: 6, message: "Minimo 6 caracteres" },
            })}
          />
          {errors.password && (
            <span className="text-destructive">{errors.password.message}</span>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="c_password">Repita contraseña</label>
          <Input
            errors={errors.c_password ? "true" : "false"}
            type="password"
            id="c_password"
            placeholder="Ej: 33445889"
            {...register("c_password", {
              required: { value: true, message: "Repita contraseña" },
              validate: (value) =>
                value === watch("password") || "Contraseñas no coinciden",
            })}
          />
          {errors.c_password && (
            <span className="text-destructive">
              {errors.c_password.message}
            </span>
          )}
        </div>
      </div>
      <Button className="w-full mt-8 uppercase h-12" type="submit">
        Registrar usuario
      </Button>
    </form>
  );
};
