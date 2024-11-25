import { FormInput } from '@/components/FormInput'
import { FormSelect } from '@/components/FormSelect'
import { Button } from '@/components/ui/button'
import { addNewCargaFam, EditCargaFam } from '@/features/personal/expediente/tablasBasicas/datosPersonales/cargaFamiliarThunk'
import { dialogChange, resetDialog } from '@/features/ui/UiSlice'
import { CargaFamiliarSchema, parentesco } from '@/features/validations/CargaFamiliarSchema'
import { sexo } from '@/features/validations/PersonalSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

export const CargaFamForm = ({ data, setcargaFamDialogStatus, setaction, employed }) => {
  const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm({
    defaultValues: data,
    resolver: zodResolver(CargaFamiliarSchema) // Resolver usando el esquema de Zod
  })
  const { tipoDiscapacidades } = useSelector(state => state.personal.expediente.tablasBasicas)
  const discapacidad = tipoDiscapacidades.data.map(
    item => ({ value: JSON.stringify(item.id), label: item.discapacidad })
  )
  discapacidad.unshift({ value: null, label: 'Ningúna' })

  const dispatch = useDispatch()
  const onSubmit = async (dataForm) => {
    const newData = { ...dataForm, id: data.id ? data.id : null, registrado: dataForm.registrado }
    let resp = null

    if (!data?.id) {
      resp = await dispatch(addNewCargaFam(newData))
    } else {
      resp = await dispatch(EditCargaFam(newData))
    }

    switch (resp.responseCode) {
      case 200:
        dispatch(
          dialogChange({
            title: `Carga familiar ${!data?.id ? 'agregado' : 'editado'}`,
            message: `El ${!data?.id
            ? 'nuevo'
            : ''} familiar "${dataForm.nombre1} ${dataForm.apellido1}" ha sido 
            ${!data?.id
            ? 'agregado'
            : 'editado'} en la carga familiar de 
            "${employed.nombre1} 
            ${employed.nombre2}".`,
            status: true,
            duration: 3000,
            variant: ''
          })
        )
        setTimeout(() => {
          dispatch(resetDialog())
        }, 3000)
        setaction('table')
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
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-3 gap-4'>
          <FormInput
            register={register}
            type='text'
            name='cedula_fam'
            placeholder='Ej: 23453548'
            label='Cédula familiar *'
            error={errors.cedula_fam}
          />
          <FormInput
            register={register}
            type='text'
            name='nombre1'
            placeholder='Jhon'
            label='Primer nombre *'
            error={errors.nombre1}
          />
          <FormInput
            register={register}
            type='text'
            name='nombre2'
            placeholder='Doe'
            label='Segundo nombre'
            error={errors.nombre2}
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <FormInput
            register={register}
            type='text'
            name='apellido1'
            placeholder='Gomez'
            label='Primer apellido *'
            error={errors.apellido1}
          />
          <FormInput
            register={register}
            type='text'
            name='apellido2'
            placeholder='Polanco'
            label='Segundo apellido'
            error={errors.apellido2}
          />
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <FormInput
            register={register}
            type='date'
            name='nacimiento'
            label='Nacimiento *'
            error={errors.nacimiento}
          />

          <FormSelect
            trigger={trigger}
            label='Parentesco *'
            options={parentesco}
            register={register}
            name='parentesco'
            defaultValue={data.parentesco}
            setValue={setValue}
            error={errors.parentesco}
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

        </div>
        <div className='grid grid-cols-3 gap-4 mt-4'>
          <FormSelect
            trigger={trigger}
            label='Discapacidad'
            options={discapacidad}
            register={register}
            name='tipo_discapacidad_id'
            defaultValue={data.tipo_discapacidad_id}
            setValue={setValue}
            error={errors.tipo_discapacidad_id}
          />

          <FormInput
            register={register}
            type='date'
            name='registrado'
            label='registrado'
            error={errors.registrado}
          />
          <FormInput
            register={register}
            type='date'
            name='fallecimiento'
            label='Fallecimiento'
            error={errors.fallecimiento}
          />
        </div>
        <div className='flex gap-4 mt-4'>
          <Button variant='outline' type='button' onClick={() => setcargaFamDialogStatus({ status: false, employed: {} })}>Cerrar</Button>
          <Button variant='secondary' type='button' onClick={() => setaction('table')}>Volver</Button>
          <Button type='submit' variant={data?.id ? 'warn' : 'primary'}>
            {!data?.id ? 'guardar personal' : 'editar personal'}
          </Button>
        </div>
      </form>
    </div>
  )
}

CargaFamForm.propTypes = {
  data: PropTypes.shape({
    empleado_id: PropTypes.number,
    tipo_discapacidad_id: PropTypes.number,
    cedula_fam: PropTypes.string.isRequired,
    nombre1: PropTypes.string.isRequired,
    nombre2: PropTypes.string.isRequired,
    apellido1: PropTypes.string,
    apellido2: PropTypes.string,
    nacimiento: PropTypes.string,
    sexo: PropTypes.string.isRequired,
    parentesco: PropTypes.string.isRequired,
    registrado: PropTypes.string,
    fallecimiento: PropTypes.string
  }),
  setcargaFamDialogStatus: PropTypes.func.isRequired
}
