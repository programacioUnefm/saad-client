import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const PasswordForgot = () => {
  return (
    <form action="" className="mt-4">
      <div className="input-group">
        <label htmlFor="email">Correo electrónico</label>
        <Input
          type="Email"
          name="email"
          id="email"
          placeholder="Ej: jhondoe@gmail.com"
        />
      </div>
      <Button className="w-full mt-8 uppercase" type="submit">
        Recuperar contraseña
      </Button>
    </form>
  );
};
