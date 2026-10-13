import { z } from "zod"

export const ACTIVIDADES = ["Tecnología", "Programación", "Inteligencia Artificial", "Automatización", "Sistemas", "Educación"] as const
export const NIVELES_ESTUDIO = ["Secundaria", "Terciario", "Universitario incompleto", "Universitario", "Posgrado"] as const
export const PUBLICIDAD = [
  { value: "ofertas", label: "Ofertas" },
  { value: "novedades", label: "Novedades" },
] as const

export const MAYORIA_EDAD = 18

const nombre = (campo: string) =>
  z
    .string()
    .trim()
    .min(1, `Ingresá tu ${campo}`)
    .min(2, "Debe tener al menos 2 caracteres")
    .regex(/^[\p{L}][\p{L}\s\x27-]*$/u, "Solo letras, espacios y guiones")

export const registroSchema = z.object({
  nombre: nombre("nombre"),
  apellido: nombre("apellido"),
  documento: z
    .string()
    .trim()
    .min(1, "Ingresá tu documento")
    .regex(/^\d{1,2}\.?\d{3}\.?\d{3}$/, "Ingresá un DNI válido (7 u 8 números)"),
  email: z.string().trim().min(1, "Ingresá tu email").pipe(z.email("Ingresá un email válido")),
  edad: z
    .number({ error: "Ingresá tu edad" })
    .int("La edad debe ser un número entero")
    .min(MAYORIA_EDAD, `Tenés que ser mayor de ${MAYORIA_EDAD} años para registrarte`)
    .max(120, "Ingresá una edad válida"),
  actividad: z.enum(ACTIVIDADES, { error: "Elegí una actividad" }),
  nivelEstudio: z.enum(NIVELES_ESTUDIO, { error: "Elegí un nivel de estudio" }),
  aceptoTerminos: z.boolean().refine((v) => v, "Tenés que aceptar los términos y condiciones"),
  publicidad: z.array(z.enum(["ofertas", "novedades"])),
})

export type RegistroValues = z.infer<typeof registroSchema>
