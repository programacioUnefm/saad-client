import React, { useEffect } from "react";
import { AppLayout } from "../layouts/appLayout/AppLayout";
import { useSelector } from "react-redux";
import { FormInput } from "@/components/FormInput";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";

export const MyAccountConfig = () => {
  const { last_name, name, email, document_id, loadData, roles } = useSelector(
    (state) => state.auth
  );
  const data = {
    name,
    last_name,
    email,
    document_id,
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: data });
  useEffect(() => {
    setValue("name", name);
    setValue("last_name", last_name);
    setValue("email", email);
    setValue("document_id", document_id);
  }, [loadData]);

  const adminColor =
    "bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%";
  const adminProfile =
    "w-40 h-40 mb-8 rounded-full bg-cover bg-center bg-red-500 bg-[url('adminAvatar.jpeg')]";
  const defaultProfile =
    "w-40 h-40 mb-8 rounded-full bg-cover bg-center bg-red-500 bg-[url('defaultAvatar.jpg')]";
  return (
    <AppLayout title={"Datos de mi cuenta"}>
      <div className="flex justify-center items-center h-[75vh] flex-col">
        {loadData == true && (
          <div
            className={roles[0].code == "ADMIN" ? adminProfile : defaultProfile}
          ></div>
        )}
        <div className="mb-4 flex flex-col items-center">
          <span className="mb-2 text-sm">ROLES DE USUARIO</span>
          {roles.map((rol, index) => (
            <Badge
              key={index}
              variant="outline"
              className={rol.code == "ADMIN" ? adminColor : "bg-accent"}
            >
              {rol.code}
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 w-full px-2">
          <FormInput
            label={"Nombres"}
            register={register}
            name={"name"}
            type={"text"}
            placeholder={"Ingrese nombres de usuario"}
            error={errors.name}
          />
          <FormInput
            label={"Apellidos"}
            register={register}
            name={"last_name"}
            type={"text"}
            placeholder={"Ingrese apellidos"}
            error={errors.last_name}
          />
          <FormInput
            label={"Documento (Cédula)"}
            register={register}
            name={"document_id"}
            type={"text"}
            placeholder={"Ingrese documento"}
            error={errors.document_id}
          />
          <FormInput
            label={"Correo electrónico"}
            register={register}
            name={"email"}
            type={"text"}
            placeholder={"Ingrese correo"}
            error={errors.email}
          />
        </div>
      </div>
    </AppLayout>
  );
};
