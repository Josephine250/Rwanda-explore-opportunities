// Counts are calculated from the data passed in. Nothing is stored in extra state.
function SummaryDashboard({ opportunities, savedIds }) {
  const total = opportunities.length
  const available = opportunities.filter((item) => item.capacity > 0).length
  const featured = opportunities.filter((item) => item.featured).length
  // Count only ids that still exist (a deleted item can never be counted as saved).
  const saved = opportunities.filter((item) => savedIds.includes(item.id)).length

  const stats = [
    { label: 'Total', value: total },
    { label: 'Available', value: available },
    { label: 'Featured', value: featured },
    { label: 'Saved', value: saved },
  ]

  return (
    <section aria-labelledby="summary-heading">
      <h2 id="summary-heading" className="sr-only">
        Summary
      </h2>
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-4" aria-live="polite">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-line border-t-4 border-t-brand bg-white p-4"
          >
            <dt className="text-sm font-medium text-muted">{stat.label}</dt>
            <dd className="mt-1 text-3xl font-extrabold text-brand">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default SummaryDashboard