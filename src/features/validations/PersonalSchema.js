import { z } from "zod";  // Importamos la librería Zod para validación de datos
import { isBefore, isAfter, parseISO } from "date-fns"; // Importamos funciones de date-fns para validación de fechas

// Definición de constantes con valores para tipos de documentos
export const documento = [
  { value: "V", label: "Venezolano" },
  { value: "J", label: "Jurídico" },
  { value: "E", label: "Extranjero" },
  { value: "P", label: "Pasaporte" },
];

// Definición de constantes con valores para el estado civil
export const estadoCivil = [
  { value: "S", label: "Soltero" },
  { value: "C", label: "Casado" },
  { value: "V", label: "Viudo" },
  { value: "D", label: "Divorciado" },
];

// Definición de constantes con valores para el sexo
export const sexo = [
  { value: "M", label: "Masculino" },
  { value: "F", label: "Femenino" },
];

// Definición de niveles de estudios y sus opciones
export const tipoPer = [
  { value: "00", label: "NINGUNO", pago: 0, descorta: "NONE" },
  { value: "01", label: "BÁSICA", pago: 0, descorta: "BAS" },
  { value: "02", label: "BACHILLER", pago: 0, descorta: "BR" },
  { value: "03", label: "TÉCNICO MEDIO", pago: 0, descorta: "TEC" },
  { value: "04", label: "TÉCNICO SUPERIOR", pago: 1, descorta: "T.S.U" },
  { value: "05", label: "UNIVERSITARIO", pago: 1, descorta: "UNIV" },
  { value: "06", label: "ESPECIALIZACIÓN", pago: 1, descorta: "ESP" },
  { value: "07", label: "MAESTRIA", pago: 1, descorta: "MSC" },
  { value: "08", label: "DOCTORADO", pago: 1, descorta: "PH.D" },
];

// Idiomas disponibles
export const idiomas = [
  "Español", "Inglés", "Francés", "Alemán", "Chino", "Japonés", "Ruso", "Árabe", "Portugués",
  "Italiano", "Hindi", "Coreano", "Sueco", "Holandés", "Turco", "Griego", "Danés", "Noruego", 
  "Polaco", "Rumano",
];

// Tipos de sangre disponibles
export const sangre = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// Mensajes de error comunes para la validación
const ERROR_MESSAGES = {
  REQUIRED: "Campo requerido",  // Mensaje cuando el campo es obligatorio
  INVALID_NUMBER: "Solo número",  // Mensaje para campos numéricos inválidos
  INVALID_EMAIL: "Correo no válido",  // Mensaje para correos no válidos
  INVALID_FIELD: "Campo no válido",  // Mensaje para campos con valores incorrectos
  INVALID_DATE: "Fecha no válida",  // Mensaje para fechas inválidas
  DATE_OUT_OF_RANGE: "La fecha debe estar entre 1960 y hoy",  // Mensaje para fechas fuera de rango
  OUT_OF_RANGE: "El peso debe estar entre 15 y 300 kg",  // Mensaje para peso fuera de rango
  MIN_LENGTH: (min) => `Mínimo ${min} caracteres`,  // Mensaje para longitud mínima
  MAX_LENGTH: (max) => `Máximo ${max} caracteres`,  // Mensaje para longitud máxima
};

// Función para crear una validación de cadena reutilizable
const stringValidation = (min, max) =>
  z
    .string({
      required_error: ERROR_MESSAGES.REQUIRED,  // Mensaje si el campo es obligatorio
      invalid_type_error: ERROR_MESSAGES.INVALID_FIELD,  // Mensaje si el tipo de dato es incorrecto
    })
    .min(min, { message: ERROR_MESSAGES.MIN_LENGTH(min) })  // Validamos longitud mínima
    .max(max, { message: ERROR_MESSAGES.MAX_LENGTH(max) });  // Validamos longitud máxima

// Esquema principal de validación utilizando Zod
export const personalSchema = z.object({
  // Documento (tipo de documento)
  documento: z.enum(["V", "J", "E", "P"], {
    errorMap: () => ({ required_error: ERROR_MESSAGES.REQUIRED }),  // Mensaje si no se selecciona un documento
  }),

  // Cédula (debe ser un número entre 5 y 10 caracteres)
  cedula: stringValidation(5, 10).refine((val) => !isNaN(Number(val)), {
    message: ERROR_MESSAGES.INVALID_NUMBER,  // Validación numérica
  }),

  // RIF (debe ser un número entre 5 y 10 caracteres)
  rif: stringValidation(5, 10).refine((val) => !isNaN(Number(val)), {
    message: ERROR_MESSAGES.INVALID_NUMBER,  // Validación numérica
  }),

  // Correo electrónico 1
  email1: z.string().email({
    message: ERROR_MESSAGES.INVALID_EMAIL,  // Validación de formato de correo
  }),

  // Correo electrónico 2 (opcional)
  email2: z
    .string()
    .email({ message: ERROR_MESSAGES.INVALID_EMAIL })  // Validación de formato de correo
    .optional()
    .nullable(),

  // Nivel profesional (solo valores predefinidos)
  nivel_profesional_id: z.enum(["01", "02", "03", "04", "05", "06", "07", "08"], {
    required_error: ERROR_MESSAGES.REQUIRED,
    message: ERROR_MESSAGES.REQUIRED,
  }),

  // Nombre y apellidos (debe tener entre 3 y 10 caracteres)
  nombre1: z.string({ required_error: ERROR_MESSAGES.REQUIRED }).min(3, { message: ERROR_MESSAGES.MIN_LENGTH(3) }).max(10, { message: ERROR_MESSAGES.MAX_LENGTH(10) }),
  nombre2: z.string({ required_error: ERROR_MESSAGES.REQUIRED }).min(3, { message: ERROR_MESSAGES.MIN_LENGTH(3) }).max(10, { message: ERROR_MESSAGES.MAX_LENGTH(10) }),
  apellido1: z.string({ required_error: ERROR_MESSAGES.REQUIRED }).min(3, { message: ERROR_MESSAGES.MIN_LENGTH(3) }).max(10, { message: ERROR_MESSAGES.MAX_LENGTH(10) }),
  apellido2: z.string({ required_error: ERROR_MESSAGES.REQUIRED }).min(3, { message: ERROR_MESSAGES.MIN_LENGTH(3) }).max(10, { message: ERROR_MESSAGES.MAX_LENGTH(10) }),

  // Dirección (debe tener entre 3 y 10 caracteres)
  direccion: z.string({ required_error: ERROR_MESSAGES.REQUIRED }).min(3, { message: ERROR_MESSAGES.MIN_LENGTH(3) }).max(30, { message: ERROR_MESSAGES.MAX_LENGTH(10) }),

  // Teléfonos (debe ser numérico y tener entre 5 y 12 caracteres)
  telefono1: stringValidation(5, 12).refine((val) => !isNaN(Number(val)), { message: ERROR_MESSAGES.INVALID_NUMBER }),
  telefono2: stringValidation(5, 12).refine((val) => !isNaN(Number(val)), { message: ERROR_MESSAGES.INVALID_NUMBER }),

  // País, estado, municipio y parroquia deben ser objetos no vacíos
  pais: z.any({}).refine((data) => Object.keys(data).length > 0, { message: ERROR_MESSAGES.REQUIRED }),
  estado: z.any({}).refine((data) => Object.keys(data).length > 0, { message: ERROR_MESSAGES.REQUIRED }),
  municipio: z.any({}).refine((data) => Object.keys(data).length > 0, { message: ERROR_MESSAGES.REQUIRED }),
  parroquia: z.any({}).refine((data) => Object.keys(data).length > 0, { message: ERROR_MESSAGES.REQUIRED }),

  // Fecha de nacimiento (debe estar entre 1960 y la fecha actual)
  fecha_nacimiento: z.any().refine((date) => {
    const fechaLimiteInferior = parseISO("1960-01-01"); // Fecha límite inferior (1960-01-01)
    const fechaLimiteSuperior = new Date(); // Fecha actual
    return isAfter(date, fechaLimiteInferior) && isBefore(date, fechaLimiteSuperior); // Validación de rango de fechas
  }, {
    message: ERROR_MESSAGES.DATE_OUT_OF_RANGE, // Mensaje si la fecha está fuera del rango
  }),

  // Sexo (solo "M" o "F")
  sexo: z.enum(["M", "F"], {
    required_error: ERROR_MESSAGES.REQUIRED,
    message: ERROR_MESSAGES.REQUIRED,
  }),

  // Estado civil (solo valores predefinidos)
  estado_civil: z.enum(["S", "C", "D", "V"], {
    required_error: ERROR_MESSAGES.REQUIRED,
    message: ERROR_MESSAGES.REQUIRED,
  }),

  // Tipo de sangre (debe ser uno de los valores predefinidos)
  sangre: z.enum(sangre, {
    required_error: ERROR_MESSAGES.REQUIRED,
    message: ERROR_MESSAGES.REQUIRED,
  }),

  // Peso (debe ser un número entre 15 y 300 kg)
  peso: stringValidation(2, 3)
    .refine((val) => !isNaN(Number(val)), { message: ERROR_MESSAGES.INVALID_NUMBER })
    .refine((val) => Number(val) < 300, { message: ERROR_MESSAGES.OUT_OF_RANGE })
    .refine((val) => Number(val) > 15, { message: ERROR_MESSAGES.OUT_OF_RANGE }),
});
