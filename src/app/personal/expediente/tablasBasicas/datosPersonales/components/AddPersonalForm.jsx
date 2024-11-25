import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  personalSchema, // Esquema de validación con Zod
  documento,
  sangre,
  estadoCivil,
  sexo,
  tipoPer,
  idiomas
} from '@/features/validations/PersonalSchema'
import { ComboBox } from './comboBox/ComboBox'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { FormInput } from '@/components/FormInput'
import { FormSelect } from '@/components/FormSelect'
import { addNewEmploye, editEmploye } from '@/features/personal/expediente/tablasBasicas/datosPersonales/datosPersonalesThunk'
import { dialogChange, resetDialog } from '@/features/ui/UiSlice'
// TODO: pasar cada seccioón a componentes mas pequeños para acortar el código y pasar todo a una carpeta llamada acctionsPersonal, renombara este comoponente a actionsPersonalForm
export const AddPersonalForm = ({ data, setactionButton }) => {
  // Inicialización del formulario con React Hook Form y Zod
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
    trigger
  } = useForm({
    defaultValues: data, // Valores iniciales del formulario
    resolver: zodResolver(personalSchema) // Resolver usando el esquema de Zod
  })

  // Accedemos a los datos de países, municipios, estados, y parroquias desde Redux
  const { paises, municipios, estados, parroquias } = useSelector(
    (state) => state.personal.expediente.tablasBasicas.dataPais
  )

  // Estado local para manejar los municipios y parroquias filtrados
  const [municipiosFiltered, setMunicipiosFiltered] = useState([])
  const [parroquiasFiltered, setParroquiasFiltered] = useState([])

  // Variables que observan los cambios en los valores del formulario
  const { pais, estado, municipio, parroquia } = watch()

  // Filtrar municipios según el estado seleccionado
  useEffect(() => {
    if (estado && municipios.data) {
      const filteredMunicipios = municipios.data.filter(
        (m) => m.estado_id === estado.id
      )
      setMunicipiosFiltered(filteredMunicipios)
    }
  }, [estado, municipios.data, setValue])

  // Filtrar parroquias según el municipio seleccionado
  useEffect(() => {
    if (municipio && parroquias.data) {
      const filteredParroquias = parroquias.data.filter(
        (p) => p.municipio_id === municipio.id
      )
      setParroquiasFiltered(filteredParroquias)
    }
  }, [municipio, parroquias.data])

  // Resetear campos relacionados cuando cambia el país (si no es Venezuela)
  useEffect(() => {
    if (pais.id !== 1) {
      // Asumimos que pais.id === 1 es Venezuela
      setMunicipiosFiltered([])
      setParroquiasFiltered([])
      setValue('estado', '')
      setValue('municipio', '')
      setValue('parroquia', '')
    }
  }, [pais, setValue])

  const dispatch = useDispatch()

  // Función que se llama al enviar el formulario
  const onSubmit = async (dataForm) => {
    let resp = null
    const newData = {
      id: data.id,
      ...dataForm,
      parroquia_id: dataForm.parroquia.id,
      pais_nacimiento_id: dataForm.pais.id
    }
    if (!data?.id) {
      resp = await dispatch(addNewEmploye(newData))
    } else {
      resp = await dispatch(editEmploye(newData))
    }

    switch (resp.responseCode) {
      case 200:
        dispatch(
          dialogChange({
            title: `Personal ${!data?.id ? 'agregado' : 'editado'}`,
            message: `El ${!data?.id ? 'nuevo' : ''} personal "${dataForm.nombre1} ${dataForm.apellido1}" ha sido ${!data?.id ? 'agregado' : 'editado'}.`,
            status: true,
            duration: 3000,
            variant: ''
          })
        )
        setTimeout(() => {
          dispatch(resetDialog())
        }, 3000)
        data?.id && setactionButton({
          status: false,
          textButton: 'Agregar personal',
          title: 'Personal'
        })
        reset()
        break
      case 422:
        dispatch(
          dialogChange({
            title: 'Error de validación',
            message: Object.values(resp.errors).flat().join(' '),
            status: true,
            duration: 3000,
            variant: 'destructive'
          })
        )
        setTimeout(() => {
          dispatch(resetDialog())
        }, 3000)
        break
    }
  }

  // function isValidURL (url) {
  //   try {
  //     // eslint-disable-next-line no-new
  //     new URL(url) // Intenta construir la URL
  //     return true // Si no hay error, la URL es válida
  //   } catch {
  //     return false // Si hay error, no es válida
  //   }
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Sección de Datos Básicos */}
      <section id='datos-basicos'>
        <div className='text-center uppercase font-bold mb-2'>
          Datos básicos
        </div>
        {/* TODO: discutir con el equipo de trabajo como se va a tratar las imágenes para aplicar este cambio */}
        {/* <div className='justify-center flex mt-8'>
          <div className={`dark:bg-accent bg-slate-300 rounded-md w-[200px] h-[200px] bg-cover bg-center flex justify-center items-center text-center bg-[url('${watch().foto}')]`}>
            {watch().foto === '' || !isValidURL(watch().foto) ? (<span>La imágen debe ser de <b>500 x 500</b> (opcional)</span>) : ''}
          </div>
        </div>
        <FormInput
          label='Foto tipo carnet'
          register={register}
          name='foto'
          type='text'
          placeholder='Ej: ingrese url válida'
          error={errors.foto}
        /> */}
        <div className='grid md:grid-cols-3 xl:grid-cols-6 gap-4'>
          {/* Selección de Documento */}
          <FormSelect
            trigger={trigger}
            label='Documento'
            options={documento}
            register={register}
            name='documento'
            defaultValue={data.documento}
            setValue={setValue}
            error={errors.documento}
          />
          {/* Campo para Cédula */}
          <FormInput
            label='Cédula *'
            register={register}
            name='cedula'
            type='text'
            placeholder='Ej: 22602765'
            error={errors.cedula}
          />
          {/* Campo para RIF */}
          <FormInput
            label='RIF *'
            register={register}
            name='rif'
            type='text'
            placeholder='Ej: 22602765-4'
            error={errors.rif}
          />
          {/* Campo para Email personal */}
          <FormInput
            label='Email personal *'
            register={register}
            name='email1'
            type='email'
            placeholder='Ej: jhon_doe@gmail.com'
            error={errors.email1}
          />
          {/* Campo para Email institucional */}
          <FormInput
            label='Email institucional'
            register={register}
            name='email2'
            type='email'
            placeholder='Ej: jhon_doe2@gmail.com'
            error={errors.email2}
          />
          {/* Selección de Tipo de personal */}
          <FormSelect
            trigger={trigger}
            label='Tipo personal *'
            options={tipoPer}
            register={register}
            name='nivel_profesional_id'
            defaultValue={data.nivel_profesional_id}
            setValue={setValue}
            error={errors.nivel_profesional_id}
          />
        </div>
      </section>

      {/* Sección de Nombre Completo */}
      <section id='nombre-completo'>
        <div className='text-center uppercase font-bold mb-4 mt-4'>
          Nombre completo
        </div>
        <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-4'>
          {/* Campos para el nombre y apellidos */}
          <FormInput
            label='Primer Nombre *'
            register={register}
            name='nombre1'
            type='text'
            placeholder='Ej: Jhon'
            error={errors.nombre1}
          />
          <FormInput
            label='Segundo Nombre'
            register={register}
            name='nombre2'
            placeholder='Ej: Doe'
            error={errors.nombre2}
          />
          <FormInput
            label='Primer Apellido *'
            register={register}
            name='apellido1'
            placeholder='Ej: Gonzáles'
            error={errors.apellido1}
          />
          <FormInput
            label='Segundo Apellido'
            register={register}
            name='apellido2'
            placeholder='Ej: Cárdenas'
            error={errors.apellido2}
          />
        </div>
      </section>

      {/* Sección de Datos de Contacto */}
      <section id='contacto'>
        <div className='text-center uppercase font-bold mb-4 mt-4'>
          Datos de contacto
        </div>
        <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-4'>
          {/* Dirección y Teléfonos */}
          <FormInput
            label='Dirección *'
            register={register}
            name='direccion'
            placeholder='Ej: Av. Josefa camejo'
            error={errors.direccion}
          />
          <FormInput
            label='Teléfono *'
            register={register}
            name='telefono1'
            placeholder='Ej: 04123688594'
            error={errors.telefono1}
          />
          <FormInput
            label='Teléfono 2'
            register={register}
            name='telefono2'
            placeholder='Ej: 04123688594'
            error={errors.telefono2}
          />
          {/* Selección de País */}
          <ComboBox
            trigger={trigger}
            list={paises.data}
            title='pais'
            keyLabel='pais'
            label='País residencia *'
            setValue={setValue}
            value={pais}
            error={errors.pais}
          />
        </div>

        {/* Mostrar campos para Venezuela */}
        {pais.nombre === 'Venezuela' && (
          <div className='grid grid-cols-3 mt-2 gap-4'>
            {/* Selección de Estado, Municipio y Parroquia */}
            <ComboBox
              trigger={trigger}
              list={estados.data}
              title='estado'
              label='Estado *'
              setValue={setValue}
              value={estado}
              error={errors.estado}
            />
            <ComboBox
              trigger={trigger}
              list={municipiosFiltered}
              title='municipio'
              label='Municipio *'
              setValue={setValue}
              value={municipio}
              error={errors.municipio}
            />
            <ComboBox
              trigger={trigger}
              list={parroquiasFiltered}
              title='parroquia'
              label='Parroquia *'
              setValue={setValue}
              value={parroquia}
              error={errors.parroquia}
            />
          </div>
        )}
      </section>

      {/* Sección de Datos Personales */}
      <section id='datos-personales' className='pt-4'>
        <div className='text-center uppercase font-bold mb-4 mt-4'>
          Datos personales
        </div>
        <div className='grid grid-cols-4 gap-4'>
          {/* Fecha de nacimiento, sexo y estado civil */}
          <FormInput
            label='Fecha de nacimiento *'
            register={register}
            name='fecha_nacimiento'
            type='date'
            placeholder=''
            error={errors.fecha_nacimiento}
          />
          <FormSelect
            trigger={trigger}
            label='Sexo *'
            options={sexo}
            register={register}
            name='sexo'
            defaultValue={data.sexo}
            setValue={setValue}
            error={errors.sexo}
          />
          <FormSelect
            trigger={trigger}
            label='Estado civil *'
            options={estadoCivil}
            register={register}
            name='estado_civil'
            defaultValue={data.estado_civil}
            setValue={setValue}
            error={errors.estado_civil}
          />
          <FormSelect
            trigger={trigger}
            label='Tipo de sangre *'
            options={sangre}
            register={register}
            name='sangre'
            defaultValue={data.sangre}
            setValue={setValue}
            error={errors.sangre}
          />
        </div>
        {/* Peso, altura e idiomas */}
        <div className='grid grid-cols-3 gap-4 mt-2'>
          <FormInput
            label='Peso en KG'
            register={register}
            name='peso'
            type='number'
            placeholder='60.50'
            error={errors.peso}
          />
          <FormInput
            label='Altura en metros'
            register={register}
            name='altura'
            type='number'
            placeholder='1.6'
            error={errors.altura}
          />
          <FormSelect
            trigger={trigger}
            label='Idioma'
            options={idiomas}
            register={register}
            name='idiomas'
            defaultValue={data.idiomas}
            setValue={setValue}
            error={errors.idiomas}
          />
          {/* <IdiomasInput idiomas={idiomas} setValue={setValue} /> */}
        </div>
      </section>

      {/* Botón de Submit */}
      <div className=''>
        <Button type='submit' variant={data?.id ? 'warn' : 'primary'}>
          {!data?.id ? 'guardar personal' : 'editar personal'}
        </Button>
      </div>
    </form>
  )
}
