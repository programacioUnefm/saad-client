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
import { useEffect, useState } from "react";
import { object } from "zod";
import { TipoPersonalDialog } from "./TipoPersonalDialog";

export const AddPersonalForm = ({ data }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: data,
    resolver: zodResolver(personalSchema),
  });

  const onSubmit = (data) => {};
  const { paises, municipios, estados, parroquias } = useSelector(
    (state) => state.personal.expediente.tablasBasicas.datosPer
  );
  const [municipiosFiltered, setMunicipiosFiltered] = useState([]);
  const [parroquisFiltered, setParroquisFiltered] = useState([]);
  const [dialogStatus, setDialogStatus] = useState({
    dialog: false,
    action: null,
    title: ""
  });

  //funcion que filtra la lista para devolver la lista filtrada según su padre_id
  const filterSomething = (list, parentItem) => {
    return list.data.filter((municipio) =>
      Object.keys(municipio).some(
        (key) => key.includes("_id") && municipio[key] === parentItem.id
      )
    );
  };

  // este useEffect hace que se filtren los municipios según el estado seleccionado
  useEffect(() => {
    if (estados.data != undefined && municipios.data != undefined) {
      setValue("municipio", "");

      if (
        watch().estado != undefined &&
        watch().estado != null &&
        watch().estado != ""
      ) {
        const filter = filterSomething(municipios, watch().estado);
        setMunicipiosFiltered(filter);
      }
    }

    setParroquisFiltered([]);
    setValue("parroquia", "");
  }, [watch().estado, estados.data, municipios.data]);

  // este useEffect hace que se filtren las parroquias segun los municipios seleccionados
  useEffect(() => {
    if (
      municipios.data != undefined &&
      parroquias.data != undefined &&
      watch().municipio != ""
    ) {
      setValue("parroquia", "");
      if (watch().municipio != undefined && watch().municipio != "") {
        setParroquisFiltered(filterSomething(parroquias, watch().municipio));
      }
    }
  }, [municipios.data, parroquias.data, watch().municipio]);

  // borrar todos los cambios si se cambia de pais
  useEffect(() => {
    if (watch().pais.id != 1) {
      setParroquisFiltered([]);
      setMunicipiosFiltered([]);
      setValue("estado", "");
      setValue("municipio", "");
      setValue("parroquia", "");
    }
  }, [watch().pais]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section id="datos-basicos">
        <div className="text-center uppercase font-bold mb-2">
          Datos básicos
        </div>
        <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-4">
          <div className="">
            <label>Documento</label>
            <Select defaultValue={watch().documento}>
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

          <div className="">
            <label>Cédula</label>
            <Input
              type="number"
              placeholder="Ej: 22602765"
              errors={errors.cedula != undefined ? "true" : "false"}
              {...register("cedula")}
            />
          </div>
          <div className="">
            <label>RIF</label>
            <Input
              type="number"
              placeholder="Ej: 22602765-4"
              errors={errors.cedula != undefined ? "true" : "false"}
              {...register("cedula")}
            />
          </div>

          <div className="md:col-span-1">
            <label>Email 1</label>
            <Input
              type="email"
              placeholder="Ej: jhon_doe@gmail.com"
              errors={errors.email1 != undefined ? "true" : "false"}
              {...register("email1")}
            />
          </div>
          <div className="md:col-span-2 xl:col-span-1">
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
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
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
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
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
              list={paises.data} // lista a recorrer dentro del combobox
              title="país" // titulo que se muestra en el combobox
              keyLabel="pais" // keyLabel es el nombre dentro del formulario
              label="País residencia" // label lo que se muestra en el label
              setValue={setValue} // setValue se utiliza para darle el valor
              value={watch().pais} // value es el valor pordefecto si es que tiene uno
            />
          </div>
        </div>
        {watch().pais.nombre === "Venezuela" && ( // esta condiciona sirve para hacer que aparezca o desaparezca los estados municipios y parroquias si no es venezuela
          <div className="grid grid-cols-3 mt-2 gap-4">
            <div>
              <ComboBox
                list={estados.data}
                title="estado"
                label="Estado"
                setValue={setValue}
                value={watch().estado}
                disabled={false}
              />
            </div>
            <div>
              <ComboBox
                list={municipiosFiltered}
                title="municipio"
                label="Municipio"
                setValue={setValue}
                value={watch().municipio}
                // disabled={watch().estado == {} || watch().estado == "" ? true : false}
              />
            </div>

            <div>
              <ComboBox
                list={parroquisFiltered}
                title="parroquia"
                label="Parroquias"
                setValue={setValue}
                value={watch().parroquia}
                // disabled={watch().municipio == {} || watch().municipio == "" ? true : false}
              />
            </div>
          </div>
        )}
      </section>

      <section id="datos-personales" className="pt-4 ">
        <div className="text-center uppercase font-bold mb-4 mt-4">
          Datos personales
        </div>
        <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-4">
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

            <Select defaultValue={watch().estado_civil}>
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

      <section id="tipo-personal" className="mt-8">
        <div className="text-center uppercase font-bold mb-4 mt-4">
          Tipo de personal
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          <Button type="button" variant="outline" className="h-[50px]" onClick={() => {setDialogStatus({dialog:true, action: "nivelProfesional", title: "Establecer nivel profesional"})}}>
            <GraduationCap className="mr-2" />
            nivel profesional
          </Button>
          <Button type="button" variant="outline" className="h-[50px]" onClick={() => {setDialogStatus({dialog:true, action: "cargaFamiliar", title: "Configurar carga familiar"})}}>
            <Users className="mr-2" />
            Carga familiar
          </Button>
          <Button type="button" variant="outline" className="h-[50px]" onClick={() => {setDialogStatus({dialog:true, action: "tipoPersonal", title: "Establecer tipo de personal"})}}>
            <HardHatIcon className="mr-2" />
            Tipo personal
          </Button>
          <Button type="button" variant="outline" className="h-[50px]" onClick={() => {setDialogStatus({dialog:true, action: "discapacidad", title: "Justificar discapacidades"})}}>
            <Glasses className="mr-2" />
            Discapacidad
          </Button>
        </div>
      </section>

      {/* componente que muestra el modal de tipo de personal */}
      <TipoPersonalDialog dialogStatus={dialogStatus} setDialogStatus={setDialogStatus} />

      <div className="flex mt-8">
        <Button type="submit" variant="primary">
          Registrar personal
        </Button>
      </div>
    </form>
  );
};
