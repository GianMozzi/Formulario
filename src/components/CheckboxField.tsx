import { forwardRef, useId, type InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }

export const CheckboxField = forwardRef<HTMLInputElement, Props>(function CheckboxField(
  { label, error, ...inputProps },
  ref,
) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div className="field">
      <label className="check-row" htmlFor={id}>
        <input ref={ref} id={id} type="checkbox" aria-invalid={!!error} aria-describedby={error ? errorId : undefined} {...inputProps} />
        <span>{label}</span>
      </label>
      <p id={errorId} className="error" role="alert">{error}</p>
    </div>
  )
})
