import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  personalSchema,
  documento,
  sangre,
  estadoCivil,
  sexo,
  paises,
  estados,
} from "@/features/validations/PersonalSchema";
import { ComboBox } from "./comboBox/ComboBox";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Bone,
  Glasses,
  GraduationCap,
  HardHat,
  HardHatIcon,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";

export const AddPersonalForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(personalSchema),
  });
  const onSubmit = (data) => {};
  const {paises, municipios, estados, parroquias} = useSelector((state) => state.personal.expediente.tablasBasicas.datosPer);
    
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section id="datos-basicos">
        <div className="text-center uppercase font-bold mb-2">
          Datos básicos
        </div>
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-1">
            <label>Documento</label>
            <Select defaultValue="V">
              <SelectTrigger {...register("documento")}>
                <SelectValue placeholder="Tipo documento" />
              </SelectTrigger>
              <SelectContent>
                {documento.map((doc) => (
                  <SelectItem key={doc.value} value={doc.value}>
                    {doc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <label>Cédula</label>
            <Input
              type="number"
              placeholder="Ej: 22602765"
              errors={errors.cedula != undefined ? "true" : "false"}
              {...register("cedula")}
            />
          </div>
          <div className="col-span-1">
            <label>RIF</label>
            <Input
              type="number"
              placeholder="Ej: 22602765-4"
              errors={errors.cedula != undefined ? "true" : "false"}
              {...register("cedula")}
            />
          </div>

          <div className="col-span-2">
            <label>Email 1</label>
            <Input
              type="email"
              placeholder="Ej: jhon_doe@gmail.com"
              errors={errors.email1 != undefined ? "true" : "false"}
              {...register("email1")}
            />
          </div>
          <div className="col-span-2">
            <label>Email 2</label>
            <Input
              type="email"
              placeholder="Ej: jhon_doe2@gmail.com"
              errors={errors.email2 != undefined ? "true" : "false"}
              {...register("email2")}
            />
          </div>
        </div>
      </section>

      <section id="nombre-completo">
        <div className="text-center uppercase font-bold mb-4 mt-4">
          Nombre completo
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label>Primer Nombre</label>
            <Input placeholder="Ej: Jhon" {...register("nombre1")} />
          </div>

          <div>
            <label>Segundo Nombre</label>
            <Input placeholder="Ej: Doe" {...register("nombre2")} />
          </div>

          <div>
            <label>Primer Apellido</label>
            <Input placeholder="Ej: Gonzáles" {...register("apellido1")} />
          </div>
          <div>
            <label>Segundo Apellido</label>
            <Input placeholder="Ej: Cárdenas" {...register("apellido2")} />
          </div>
        </div>
      </section>
      <section id="contacto">
        <div className="text-center uppercase font-bold mb-4 mt-4">
          Datos de contacto
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label>Dirección</label>
            <Input
              placeholder="Ej: Av. Josefa camejo"
              {...register("direccion")}
            ></Input>
          </div>
          <div>
            <label>Teléfono</label>
            <Input placeholder="Ej: 04123688594" {...register("telefono1")} />
          </div>
          <div>
            <label>Teléfono 2</label>
            <Input placeholder="Ej: 04123688594" {...register("telefono2")} />
          </div>
          <div>
            <ComboBox
              list={paises.data}
              title="país"
              label="País de orígen"
              defaultValue={"Venezuela"}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 mt-2 gap-4">
          <div>
            {/* <ComboBox
              list={estados}
              title="estado"
              label="Estado"
              defaultValue="Selecciona un estado"
            /> */}
          </div>
          <div>
            {/* <ComboBox
              list={estados}
              title="municipio"
              label="Municipio"
              defaultValue="Selecciona un municipio"
            /> */}
          </div>
          <div>
            {/* <ComboBox
              list={estados}
              title="Ciudad"
              label="Ciudad"
              defaultValue="Selecciona una ciudad"
            /> */}
          </div>
          <div>
            {/* <ComboBox
              list={estados}
              title="Parroquia"
              label="Parroquia"
              defaultValue="Selecciona una parroquia"
            /> */}
          </div>
        </div>
      </section>

      <section id="datos-personales" className="pt-4 ">
        <div className="text-center uppercase font-bold mb-4 mt-4">
          Datos personales
        </div>
        <div className="grid grid-cols-6 gap-4">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <label className="line-clamp-1">Fecha nacimiento</label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Fecha de nacimiento</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input type="date" {...register("fecha_nacimiento")} />
          </div>
          <div>
            <label>Sexo</label>
            <Select>
              <SelectTrigger {...register("sexo")}>
                <SelectValue placeholder="Seleccionar sexo" />
              </SelectTrigger>
              <SelectContent>
                {sexo.map((sexo) => (
                  <SelectItem key={sexo.value} value={sexo.value}>
                    {sexo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <label className="line-clamp-1">Estado civil</label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Estado civil</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Select>
              <SelectTrigger {...register("estado_civil")}>
                <SelectValue placeholder="Estado civil" />
              </SelectTrigger>
              <SelectContent>
                {estadoCivil.map((estadoC) => (
                  <SelectItem key={estadoC.value} value={estadoC.value}>
                    {estadoC.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label>Peso</label>
            <div className="flex w-full max-w-sm items-center">
              <Input
                placeholder="60.50"
                className="rounded-tr-none rounded-br-none"
                {...register("peso")}
                type="number"
              />
              <span className="bg-accent/50 p-[8px] rounded-tr-md rounded-br-md font-bold">
                KG
              </span>
            </div>
          </div>
          <div>
            <label>Altura</label>
            <div className="flex w-full max-w-sm items-center">
              <Input
                placeholder="1.65"
                className="rounded-tr-none rounded-br-none"
                {...register("altura")}
                type="number"
              />
              <span className="bg-accent/50 py-[8px] px-[12px] rounded-tr-md rounded-br-md font-bold">
                M
              </span>
            </div>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <label className="line-clamp-1">Tipo de sangre</label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tipo de sangre</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Select>
              <SelectTrigger {...register("estado_civil")}>
                <SelectValue placeholder="Selecciona uno" />
              </SelectTrigger>
              <SelectContent>
                {sangre.map((sangre) => (
                  <SelectItem key={sangre} value={sangre}>
                    {sangre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>
      <section id="" className="mt-8">
        <div className="text-center uppercase font-bold mb-4 mt-4">
          Tipo de personal
        </div>
        <div className="grid grid-cols-4 gap-4">
          <Button variant="outline" className="h-[50px]">
            <GraduationCap className="mr-2" />
            nivel profesional
          </Button>
          <Button variant="outline" className="h-[50px]">
            <Users className="mr-2" />
            Carga familiar
          </Button>
          <Button variant="outline" className="h-[50px]">
            <HardHatIcon className="mr-2" />
            Tipo personal
          </Button>
          <Button variant="outline" className="h-[50px]">
            <Glasses className="mr-2" />
            Discapacidad
          </Button>
        </div>
      </section>
      <div className="flex mt-8">
        <Button type="submit" variant="primary">Registrar personal</Button>
      </div>
    </form>
  );
};
