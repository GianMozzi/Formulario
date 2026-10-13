import { forwardRef, useId, type InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }

export const Field = forwardRef<HTMLInputElement, Props>(function Field({ label, error, ...inputProps }, ref) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input ref={ref} id={id} aria-invalid={!!error} aria-describedby={error ? errorId : undefined} {...inputProps} />
      <p id={errorId} className="error" role="alert">{error}</p>
    </div>
  )
})
