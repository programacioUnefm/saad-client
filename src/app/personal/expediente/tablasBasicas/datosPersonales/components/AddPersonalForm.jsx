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
  tipoPer,
  idiomas
} from "@/features/validations/PersonalSchema";
import { ComboBox } from "./comboBox/ComboBox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IdiomasInput } from "./IdiomasInput";

// Input Component for easy reuse
const FormInput = ({ label, register, name, type = "text", placeholder, error }) => (
  <div>
    <label>{label}</label>
    <Input
      type={type}
      placeholder={placeholder}
      className={error ? "border-red-500" : ""}
      {...register(name)}
    />
    {error && <span className="text-red-500 text-xs">{error.message}</span>}
  </div>
);

// select para poder reutilizar con estructura compleja
const FormSelect = ({ label, options, register, name, defaultValue, setValue, error }) => (
  
  <div>
    <label>{label}</label>
    <Select defaultValue={defaultValue} onValueChange={(e) => setValue(name, e)} >
      <SelectTrigger {...register(name)} className={error ? "border-red-500" : ""}>
        <SelectValue placeholder={`Seleccionar ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error && <span className="text-red-500 text-xs">{error.message}</span>}
  </div>
);



export const AddPersonalForm = ({ data }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    getValues,
  } = useForm({
    defaultValues: data,
    resolver: zodResolver(personalSchema),
  });

  const { paises, municipios, estados, parroquias } = useSelector(
    (state) => state.personal.expediente.tablasBasicas.datosPer
  );

  const [municipiosFiltered, setMunicipiosFiltered] = useState([]);
  const [parroquisFiltered, setParroquisFiltered] = useState([]);

  const { pais, estado, municipio, parroquia } = watch();


  // Filter municipios based on the selected estado
  useEffect(() => {
    if (estado && municipios.data) {
      const filteredMunicipios = municipios.data.filter(
        (m) => m.estado_id === estado.id
      );
      setMunicipiosFiltered(filteredMunicipios);
      setValue("municipio", {}); // Reset municipio when estado changes
      setParroquisFiltered([]); // Reset parroquia when municipio changes
    }
  }, [estado, municipios.data, setValue]);

  // Filter parroquias based on selected municipio
  useEffect(() => {
    if (municipio && parroquias.data) {
      const filteredParroquias = parroquias.data.filter(
        (p) => p.municipio_id === municipio.id
      );
      setParroquisFiltered(filteredParroquias);
    }
  }, [municipio, parroquias.data]);

  // Reset form values when pais changes (if not Venezuela)
  useEffect(() => {
    if (pais.id !== 1) { // assuming pais.id === 1 is Venezuela
      setMunicipiosFiltered([]);
      setParroquisFiltered([]);
      setValue("estado", "");
      setValue("municipio", "");
      setValue("parroquia", "");
    }
  }, [pais, setValue]);

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Datos Básicos */}
      <section id="datos-basicos">
        <div className="text-center uppercase font-bold mb-2">Datos básicos</div>
        <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-4">
          <FormSelect
            label="Documento"
            options={documento}
            register={register}
            name="documento"
            defaultValue={data.documento}
            setValue={setValue}
            error={errors.documento}
          />
          <FormInput
            label="Cédula"
            register={register}
            name="cedula"
            type="number"
            placeholder="Ej: 22602765"
            error={errors.cedula}
          />
          <FormInput
            label="RIF"
            register={register}
            name="rif"
            type="number"
            placeholder="Ej: 22602765-4"
            error={errors.rif}
          />
          <FormInput
            label="Email personal"
            register={register}
            name="email1"
            type="email"
            placeholder="Ej: jhon_doe@gmail.com"
            error={errors.email1}
          />
          <FormInput
            label="Email institucional"
            register={register}
            name="email2"
            type="email"
            placeholder="Ej: jhon_doe2@gmail.com"
            error={errors.email2}
          />
          <FormSelect
            label="Tipo personal"
            options={tipoPer}
            register={register}
            name="nivel_profesional_id"
            defaultValue={data.nivel_profesional_id}
            setValue={setValue}
            error={errors.nivel_profesional_id}
          />
        </div>
      </section>

      {/* Nombre Completo */}
      <section id="nombre-completo">
        <div className="text-center uppercase font-bold mb-4 mt-4">Nombre completo</div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          <FormInput label="Primer Nombre" register={register} name="nombre1" type="text" placeholder="Ej: Jhon" error={errors.nombre1} />
          <FormInput label="Segundo Nombre" register={register} name="nombre2" placeholder="Ej: Doe" error={errors.nombre2} />
          <FormInput label="Primer Apellido" register={register} name="apellido1" placeholder="Ej: Gonzáles" error={errors.apellido1} />
          <FormInput label="Segundo Apellido" register={register} name="apellido2" placeholder="Ej: Cárdenas" error={errors.apellido2} />
        </div>
      </section>

      {/* Datos de Contacto */}
      <section id="contacto">
        <div className="text-center uppercase font-bold mb-4 mt-4">Datos de contacto</div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          <FormInput label="Dirección" register={register} name="direccion" placeholder="Ej: Av. Josefa camejo" error={errors.direccion} />
          <FormInput label="Teléfono" register={register} name="telefono1" placeholder="Ej: 04123688594" error={errors.telefono1}/>
          <FormInput label="Teléfono 2" register={register} name="telefono2" placeholder="Ej: 04123688594" error={errors.telefono2} />
          <ComboBox list={paises.data} title="país" keyLabel="pais" label="País residencia" setValue={setValue} value={pais} error={errors.pais}/>
        </div>

        {/* Mostrar campos específicos si el país es Venezuela */}
        {pais.nombre === "Venezuela" && (
          <div className="grid grid-cols-3 mt-2 gap-4">
            <ComboBox list={estados.data} title="estado" label="Estado" setValue={setValue} value={estado} error={errors.estado}/>
            <ComboBox list={municipiosFiltered} title="municipio" label="Municipio" setValue={setValue} value={municipio} error={errors.municipio} />
            <ComboBox list={parroquisFiltered} title="parroquia" label="Parroquias" setValue={setValue} value={parroquia} error={errors.parroquia}/>
          </div>
        )}
      </section>

      {/* Datos Personales */}
      <section id="datos-personales" className="pt-4">
        <div className="text-center uppercase font-bold mb-4 mt-4">Datos personales</div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <label>Fecha nacimiento</label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Fecha de nacimiento</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> */}
            
            <FormInput label="Fecha de nacimiento" register={register} name="fecha_nacimiento" type="date" placeholder="" error={errors.fecha_nacimiento} />
          </div>
          <FormSelect label="Sexo" options={sexo} register={register} name="sexo" defaultValue={data.sexo} setValue={setValue} error={errors.sexo}/>
          <FormSelect label="Estado civil" options={estadoCivil} register={register} name="estado_civil" defaultValue={data.estado_civil} setValue={setValue} error={errors.estado_civil} />
          <div>
            <label>Tipo de sangre</label>
            <Select defaultValue={data.sangre} onValueChange={(e) => setValue("sangre", e)}>
              <SelectTrigger {...register("sangre")} className={errors?.sangre && "border-red-500"}>
                <SelectValue placeholder="selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                {sangre.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {errors?.sangre && <span className="text-red-500 text-xs">{errors.sangre.message}</span>}
          </div>

        </div>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div>
            
            <FormInput label="Peso en KG" register={register} name="peso" type="number" placeholder="60.50" error={errors.peso} />
            {/* {errors?.peso && <span className="text-red-500 text-xs">{errors.peso.message}</span>} */}
          </div>
          <div>
            <label>Altura</label>
            <div className="flex w-full items-center">
              <Input placeholder="1.65" className="rounded-tr-none rounded-br-none" {...register("altura")} type="number" />
              <span className="bg-accent/50 py-[8px] px-[12px] rounded-tr-md rounded-br-md font-bold">M</span>
            </div>
          </div>
          <div>
            <IdiomasInput idiomas={idiomas} setValue={setValue}/>
          </div>
        </div>
      </section>
{console.log(watch())}
      {/* Submit Button */}
      <Button type="submit">Guardar</Button>
    </form>
  );
};
