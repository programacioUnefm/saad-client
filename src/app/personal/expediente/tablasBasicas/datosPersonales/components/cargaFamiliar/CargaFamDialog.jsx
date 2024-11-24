import React, { useState } from 'react'
import { CargaFamForm } from './CargaFamForm'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import './cargaFamDialog.css'
import PropTypes from 'prop-types'
import { DataTableCargaFam } from './DataTableCargaFam'

export const CargaFamDialog = ({ cargaFamDialogStatus, setcargaFamDialogStatus }) => {
  const [data] = useState({
    empleado_id: cargaFamDialogStatus.employed.id,
    tipo_discapacidad_id: null,
    cedula_fam: '',
    nombre1: '',
    nombre2: '',
    apellido1: '',
    apellido2: '',
    nacimiento: null,
    sexo: 'M',
    parentesco: 'padre',
    registrado: null,
    fallecimiento: null
  })

  return (
    <Dialog open={cargaFamDialogStatus.status}>
      <DialogContent className='max-w-[800px] h-auto'>
        <DialogHeader>
          <DialogTitle className='uppercase text-foreground/80 font-normal'>Familiares de <b className='text-white'>{cargaFamDialogStatus.employed.nombre1}  {cargaFamDialogStatus.employed.apellido1}</b></DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className='mt-2'>
          <DataTableCargaFam employed={cargaFamDialogStatus.employed} setcargaFamDialogStatus={setcargaFamDialogStatus} />
          {/* <CargaFamForm data={data} setcargaFamDialogStatus={setcargaFamDialogStatus} /> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}

CargaFamDialog.propTypes = {
  cargaFamDialogStatus: PropTypes.shape({
    employed: PropTypes.shape({
      id: PropTypes.number,
      nombre1: PropTypes.string
    }),
    status: PropTypes.bool.isRequired
  }),
  setcargaFamDialogStatus: PropTypes.func.isRequired
}
