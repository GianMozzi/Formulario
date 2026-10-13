import { forwardRef, useId, type SelectHTMLAttributes } from "react"

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: readonly string[]
  error?: string
}

export const SelectField = forwardRef<HTMLSelectElement, Props>(function SelectField(
  { label, options, error, ...selectProps },
  ref,
) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select ref={ref} id={id} aria-invalid={!!error} aria-describedby={error ? errorId : undefined} {...selectProps}>
        <option value="">Seleccioná una opción…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <p id={errorId} className="error" role="alert">{error}</p>
    </div>
  )
})
