import OpportunityCard from './OpportunityCard.jsx'
import Button from './Button.jsx'

function CardGrid({ opportunities, savedIds, pendingDeleteId, ...handlers }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {opportunities.map((opportunity) => (
        // Stable unique id as the key, never the array index.
        <li key={opportunity.id}>
          <OpportunityCard
            opportunity={opportunity}
            isSaved={savedIds.includes(opportunity.id)}
            isConfirmingDelete={pendingDeleteId === opportunity.id}
            {...handlers}
          />
        </li>
      ))}
    </ul>
  )
}

function OpportunityList({
  opportunities,
  categories,
  groupByCategory,
  savedIds,
  pendingDeleteId,
  onToggleSave,
  onEdit,
  onRequestDelete,
  onConfirmDelete,
  onCancelDelete,
  onReset,
}) {
  // Early-return pattern: handle the empty case first.
  if (opportunities.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center">
        <h3 className="text-lg font-bold">No opportunities match your search</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Try a different keyword, choose another category, or turn off Available
          only and Saved only.
        </p>
        <Button className="mt-4" onClick={onReset}>
          Reset filters
        </Button>
      </div>
    )
  }

  const handlers = { onToggleSave, onEdit, onRequestDelete, onConfirmDelete, onCancelDelete }

  if (groupByCategory) {
    // Build the groups from the opportunities currently shown, so each count is accurate.
    const groups = categories
      .map((category) => ({
        category,
        items: opportunities.filter((item) => item.category === category),
      }))
      .filter((group) => group.items.length > 0)

    return (
      <div className="space-y-8">
        {groups.map((group) => {
          const headingId = `group-${group.category.toLowerCase().replace(/\s+/g, '-')}`
          return (
            <section key={group.category} aria-labelledby={headingId}>
              <h3 id={headingId} className="mb-3 text-lg font-bold">
                {group.category}{' '}
                <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-sm font-semibold text-brand-dark">
                  {group.items.length}
                </span>
              </h3>
              <CardGrid
                opportunities={group.items}
                savedIds={savedIds}
                pendingDeleteId={pendingDeleteId}
                {...handlers}
              />
            </section>
          )
        })}
      </div>
    )
  }

  return (
    <CardGrid
      opportunities={opportunities}
      savedIds={savedIds}
      pendingDeleteId={pendingDeleteId}
      {...handlers}
    />
  )
}

export default OpportunityList