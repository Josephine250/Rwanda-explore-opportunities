const tones = {
  info: 'border-brand bg-brand-soft text-brand-dark',
  success: 'border-success bg-success-soft text-ink',
  error: 'border-danger bg-danger-soft text-ink',
}

// role="alert" interrupts screen readers (errors); role="status" is polite.
function Alert({ tone = 'info', title, children }) {
  const role = tone === 'error' ? 'alert' : 'status'
  return (
    <div role={role} className={`rounded-md border-l-4 p-4 ${tones[tone]}`}>
      {title ? <p className="font-semibold">{title}</p> : null}
      <div className="text-sm">{children}</div>
    </div>
  )
}

export default Alert