const tones = {
  neutral: 'bg-brand-soft text-brand-dark',
  featured: 'bg-accent-soft text-ink ring-1 ring-accent',
  free: 'bg-success-soft text-success',
  danger: 'bg-danger-soft text-danger',
  warning: 'bg-accent-soft text-ink',
}

function Badge({ children, tone = 'neutral' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export default Badge