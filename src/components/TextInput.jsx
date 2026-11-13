// Labelled input/textarea with optional hint and error message.
// The label is linked with htmlFor/id; errors are linked with aria-describedby.
function TextInput({
  id,
  label,
  error,
  hint,
  multiline = false,
  className = '',
  ...rest
}) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  const Field = multiline ? 'textarea' : 'input'

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold">
        {label}
      </label>
      <Field
        id={id}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy}
        className={`w-full rounded-md border bg-white px-3 py-2 text-sm ${
          error ? 'border-danger' : 'border-line'
        }`}
        {...(multiline ? { rows: 3 } : {})}
        {...rest}
      />
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default TextInput