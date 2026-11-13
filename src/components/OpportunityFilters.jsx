import TextInput from './TextInput.jsx'
import SelectInput from './Selectinput.jsx'
import Checkbox from './Checkbox.jsx'
import Button from './Button.jsx'

const sortOptions = [
  { value: 'date', label: 'Earliest date' },
  { value: 'title', label: 'Title A to Z' },
  { value: 'seats', label: 'Most places available' },
]

function OpportunityFilters({
  categories,
  search,
  category,
  sortBy,
  availableOnly,
  savedOnly,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onAvailableOnlyChange,
  onSavedOnlyChange,
  onReset,
}) {
  const categoryOptions = [
    { value: 'all', label: 'All categories' },
    ...categories.map((name) => ({ value: name, label: name })),
  ]

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="space-y-4 rounded-lg border border-line bg-white p-5"
      aria-label="Search and filter opportunities"
    >
      <TextInput
        id="search"
        label="Search by title or city"
        type="search"
        placeholder="e.g. kigali,python "
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <SelectInput
        id="category"
        label="Category"
        options={categoryOptions}
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      />
      <SelectInput
        id="sort"
        label="Sort by"
        options={sortOptions}
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
      />
      <fieldset className="space-y-2">
        <legend className="mb-1 text-sm font-semibold">Show only</legend>
        <Checkbox
          id="available-only"
          label="Available only"
          checked={availableOnly}
          onChange={(event) => onAvailableOnlyChange(event.target.checked)}
        />
        <Checkbox
          id="saved-only"
          label="Saved only"
          checked={savedOnly}
          onChange={(event) => onSavedOnlyChange(event.target.checked)}
        />
      </fieldset>
      <Button variant="ghost" className="w-full" onClick={onReset}>
        Reset filters
      </Button>
    </form>
  )
}

export default OpportunityFilters