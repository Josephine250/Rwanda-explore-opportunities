const variants = {
  primary: 'bg-brand text-white hover:bg-brand-dark border-transparent',
  secondary: 'bg-white text-brand border-brand hover:bg-brand-soft',
  ghost: 'bg-transparent text-ink border-line hover:bg-white',
  danger: 'bg-danger text-white hover:opacity-90 border-transparent',
}

// Reusable button. Defaults to type="button" so it never submits a form by accident.
function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button