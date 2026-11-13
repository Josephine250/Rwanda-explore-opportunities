import Badge from './Badge.jsx'
import Button from './Button.jsx'

// Lookup object for the status label (a deliberate conditional-rendering pattern).
const statusLabels = {
  available: { text: 'Places available', tone: 'neutral' },
  limited: { text: 'Few places left', tone: 'warning' },
  full: { text: 'Fully booked', tone: 'danger' },
}

function getStatus(capacity) {
  if (capacity === 0) return 'full'
  if (capacity <= 5) return 'limited'
  return 'available'
}

function formatDate(isoDate) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function OpportunityCard({
  opportunity,
  isSaved,
  isConfirmingDelete,
  onToggleSave,
  onEdit,
  onRequestDelete,
  onConfirmDelete,
  onCancelDelete,
}) {
  const { id, title, category, city, date, description, capacity, price, featured } =
    opportunity
  const status = statusLabels[getStatus(capacity)]
  const isFree = price === 0
  const isFull = capacity === 0

  return (
    <article
      className={`flex h-full flex-col rounded-lg border bg-white p-5 ${
        featured ? 'border-accent' : 'border-line'
      }`}
    >
      <div className="mb-3 flex flex-wrap gap-2">
        <Badge>{category}</Badge>
        {/* && pattern: the left side is a real boolean, so nothing stray is rendered */}
        {featured && <Badge tone="featured">Featured</Badge>}
        {isFree && <Badge tone="free">Free</Badge>}
        <Badge tone={status.tone}>{status.text}</Badge>
      </div>

      <h3 className="text-lg font-bold leading-snug">{title}</h3>
      <p className="mt-1 text-sm text-muted">
        <time dateTime={date}>{formatDate(date)}</time> &middot; {city}
      </p>
      <p className="mt-3 flex-1 text-sm">{description}</p>

      <dl className="mt-4 flex items-center justify-between border-t border-line pt-3 text-sm">
        <div>
          <dt className="sr-only">Price</dt>
          {/* ternary pattern */}
          <dd className="font-semibold">
            {isFree ? 'Free' : `${price.toLocaleString('en-US')} RWF`}
          </dd>
        </div>
        <div>
          <dt className="sr-only">Places</dt>
          <dd className={isFull ? 'font-semibold text-danger' : 'text-muted'}>
            {isFull ? 'Fully booked' : `${capacity} places left`}
          </dd>
        </div>
      </dl>

      {isConfirmingDelete ? (
        <div
          role="alertdialog"
          aria-labelledby={`confirm-${id}`}
          className="mt-4 rounded-md border border-danger bg-danger-soft p-3"
        >
          <p id={`confirm-${id}`} className="text-sm font-semibold">
            Delete this opportunity?
          </p>
          <p className="text-xs text-muted">This cannot be undone.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="danger" onClick={() => onConfirmDelete(id)}>
              Yes, delete
            </Button>
            <Button variant="ghost" autoFocus onClick={onCancelDelete}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant={isSaved ? 'primary' : 'secondary'}
            aria-pressed={isSaved}
            onClick={() => onToggleSave(id)}
          >
            {isSaved ? 'Unsave' : 'Save'}
            <span className="sr-only"> {title}</span>
          </Button>
          <Button variant="ghost" onClick={() => onEdit(id)}>
            Edit<span className="sr-only"> {title}</span>
          </Button>
          <Button variant="ghost" onClick={() => onRequestDelete(id)}>
            Delete<span className="sr-only"> {title}</span>
          </Button>
        </div>
      )}
    </article>
  )
}

export default OpportunityCard