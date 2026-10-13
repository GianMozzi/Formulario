import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ACTIVIDADES, NIVELES_ESTUDIO, PUBLICIDAD, registroSchema, type RegistroValues } from "../lib/schemas"
import { enviarRegistro } from "../lib/enviarRegistro"
import { Field } from "./Field"
import { SelectField } from "./SelectField"
import { CheckboxField } from "./CheckboxField"

export function RegistroForm({ onSuccess }: { onSuccess: (datos: RegistroValues) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistroValues>({
    resolver: zodResolver(registroSchema),
    mode: "onTouched",
    defaultValues: { aceptoTerminos: false, publicidad: [] },
  })

  const onSubmit = async (datos: RegistroValues) => onSuccess(await enviarRegistro(datos))

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid">
        <Field label="Nombre" autoComplete="given-name" error={errors.nombre?.message} {...register("nombre")} />
        <Field label="Apellido" autoComplete="family-name" error={errors.apellido?.message} {...register("apellido")} />
        <Field label="Documento (DNI)" inputMode="numeric" placeholder="12.345.678" error={errors.documento?.message} {...register("documento")} />
        <Field label="Edad" type="number" inputMode="numeric" min={0} error={errors.edad?.message} {...register("edad", { valueAsNumber: true })} />
      </div>

      <Field label="Email" type="email" autoComplete="email" placeholder="vos@ejemplo.com" error={errors.email?.message} {...register("email")} />

      <div className="grid">
        <SelectField label="Actividad" options={ACTIVIDADES} error={errors.actividad?.message} {...register("actividad")} />
        <SelectField label="Nivel de estudio" options={NIVELES_ESTUDIO} error={errors.nivelEstudio?.message} {...register("nivelEstudio")} />
      </div>

      <fieldset>
        <legend>Quiero recibir</legend>
        <div className="options">
          {PUBLICIDAD.map((p) => (
            <label key={p.value} className="check-row">
              <input type="checkbox" value={p.value} {...register("publicidad")} />
              <span>{p.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <CheckboxField label="Acepto los términos y condiciones" error={errors.aceptoTerminos?.message} {...register("aceptoTerminos")} />

      <button className="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting && <span className="spinner" aria-hidden="true" />}
        {isSubmitting ? "Enviando…" : "Registrarse"}
      </button>
    </form>
  )
}
