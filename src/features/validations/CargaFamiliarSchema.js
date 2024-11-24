import { z } from 'zod' // Importamos la librería Zod para validación de datos
import { isBefore, isAfter, parseISO } from 'date-fns' // Importamos funciones de date-fns para validación de fechas
import { ERROR_MESSAGES, singleWordRegex, stringValidation } from './PersonalSchema'

export const parentesco = [
  { value: 'padre', label: 'Padre' },
  { value: 'hijo', label: 'Hijo' },
  { value: 'esposo', label: 'Esposo' }
]

export const CargaFamiliarSchema = z.object({
  empleado_id: z.number(),
  cedula_fam: stringValidation(4, 12),
  nombre1: z
    .string({ required_error: ERROR_MESSAGES.REQUIRED })
    .min(3, { message: ERROR_MESSAGES.MIN_LENGTH(3) })
    .max(10, { message: ERROR_MESSAGES.MAX_LENGTH(10) })
    .refine((val) => singleWordRegex.test(val), {
      message: ERROR_MESSAGES.NO_NAME
    }),
  nombre2: z
    .string({ required_error: ERROR_MESSAGES.REQUIRED })
    .min(3, { message: ERROR_MESSAGES.MIN_LENGTH(3) })
    .max(10, { message: ERROR_MESSAGES.MAX_LENGTH(10) })
    .refine((val) => singleWordRegex.test(val), {
      message: ERROR_MESSAGES.NO_NAME
    }),
  apellido1: z
    .string({ required_error: ERROR_MESSAGES.REQUIRED })
    .min(3, { message: ERROR_MESSAGES.MIN_LENGTH(3) })
    .max(10, { message: ERROR_MESSAGES.MAX_LENGTH(10) })
    .refine((val) => singleWordRegex.test(val), {
      message: ERROR_MESSAGES.NO_NAME
    }),
  apellido2: z
    .string({ required_error: ERROR_MESSAGES.REQUIRED })
    .min(3, { message: ERROR_MESSAGES.MIN_LENGTH(3) })
    .max(10, { message: ERROR_MESSAGES.MAX_LENGTH(10) })
    .refine((val) => singleWordRegex.test(val), {
      message: ERROR_MESSAGES.NO_NAME
    }),
  nacimiento: z.any().refine(
    (date) => {
      const fechaLimiteInferior = parseISO('1960-01-01') // Fecha límite inferior (1960-01-01)
      const fechaLimiteSuperior = new Date() // Fecha actual
      return (
        isAfter(date, fechaLimiteInferior) &&
            isBefore(date, fechaLimiteSuperior)
      ) // Validación de rango de fechas
    },
    {
      message: ERROR_MESSAGES.DATE_OUT_OF_RANGE // Mensaje si la fecha está fuera del rango
    }
  ),
  sexo: z.enum(['M', 'F'], {
    required_error: ERROR_MESSAGES.REQUIRED,
    message: ERROR_MESSAGES.REQUIRED
  }),
  parentesco: z.enum(['padre', 'hijo', 'esposo'], {
    required_error: ERROR_MESSAGES.REQUIRED,
    message: ERROR_MESSAGES.REQUIRED
  }),
  tipo_discapacidad_id: z.string().nullable().optional(),
  registrado: z.any().refine(
    (date) => {
      const fechaLimiteInferior = parseISO('1960-01-01') // Fecha límite inferior (1960-01-01)
      const fechaLimiteSuperior = new Date() // Fecha actual
      return (
        isAfter(date, fechaLimiteInferior) &&
            isBefore(date, fechaLimiteSuperior)
      ) // Validación de rango de fechas
    },
    {
      message: ERROR_MESSAGES.DATE_OUT_OF_RANGE // Mensaje si la fecha está fuera del rango
    }
  ).nullable().optional(),
  fallecimiento: z.any().refine(
    (date) => {
      const fechaLimiteInferior = parseISO('1960-01-01') // Fecha límite inferior (1960-01-01)
      const fechaLimiteSuperior = new Date() // Fecha actual
      return (
        isAfter(date, fechaLimiteInferior) &&
            isBefore(date, fechaLimiteSuperior)
      ) // Validación de rango de fechas
    },
    {
      message: ERROR_MESSAGES.DATE_OUT_OF_RANGE // Mensaje si la fecha está fuera del rango
    }
  ).nullable().optional()
})
