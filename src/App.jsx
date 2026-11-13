import { useState } from 'react'
import { seedOpportunities, CATEGORIES } from './data/seedopportunities.js'
import OpportunityFilters from './components/OpportunityFilters.jsx'
import OpportunityList from './components/OpportunityList.jsx'
import AddOpportunityForm from './components/Addopportunityform.jsx'
import SummaryDashboard from './components/Summarydashboard.jsx'
import IntroSection from './components/Introsection.jsx'
import ContactSection from './components/Contactsection.jsx'
import Button from './components/Button.jsx'
import Checkbox from './components/Checkbox.jsx'
import Alert from './components/Alert.jsx'

// Sorting rules live in a lookup object. Each one compares two opportunities.
const sorters = {
  date: (a, b) => a.date.localeCompare(b.date),
  title: (a, b) => a.title.localeCompare(b.title),
  seats: (a, b) => b.capacity - a.capacity,
}

function App() {
  // ---- State ----
  const [opportunities, setOpportunities] = useState(seedOpportunities)
  const [savedIds, setSavedIds] = useState([])

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [savedOnly, setSavedOnly] = useState(false)
  const [groupByCategory, setGroupByCategory] = useState(false)

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null) // null = add mode
  const [pendingDeleteId, setPendingDeleteId] = useState(null)
  const [notice, setNotice] = useState('')
  const [demoStatus, setDemoStatus] = useState('ready') // 'ready' | 'loading' | 'error'

  // ---- Derived data (calculated during render, never stored in state) ----
  const term = search.trim().toLowerCase()

  const filtered = opportunities.filter((item) => {
    const matchesSearch =
      term === '' ||
      item.title.toLowerCase().includes(term) ||
      item.city.toLowerCase().includes(term)
    const matchesCategory = category === 'all' || item.category === category
    const matchesAvailable = !availableOnly || item.capacity > 0
    const matchesSaved = !savedOnly || savedIds.includes(item.id)
    return matchesSearch && matchesCategory && matchesAvailable && matchesSaved
  })

  // Copy first so the original state array is never mutated by sort().
  const visible = [...filtered].sort(sorters[sortBy])

  const editingOpportunity = opportunities.find((item) => item.id === editingId) ?? null

  // ---- Handlers ----
  function resetFilters() {
    setSearch('')
    setCategory('all')
    setSortBy('date')
    setAvailableOnly(false)
    setSavedOnly(false)
  }

  function toggleSave(id) {
    setSavedIds((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id],
    )
  }

  function openAddForm() {
    setNotice('')
    setEditingId(null)
    setPendingDeleteId(null)
    setShowForm(true)
  }

  function openEditForm(id) {
    setNotice('')
    setPendingDeleteId(null)
    setEditingId(id)
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
  }

  // One callback for both modes: replace the matching record, or add a new one.
  function saveOpportunity(item) {
    if (editingId !== null) {
      setOpportunities((current) =>
        current.map((existing) => (existing.id === item.id ? item : existing)),
      )
      setNotice(`"${item.title}" was updated.`)
    } else {
      setOpportunities((current) => [item, ...current])
      resetFilters() // so the new record is visible straight away
      setNotice(`"${item.title}" was added. Filters were reset so you can see it.`)
    }
    closeForm()
  }

  function confirmDelete(id) {
    const removed = opportunities.find((item) => item.id === id)
    setOpportunities((current) => current.filter((item) => item.id !== id))
    setSavedIds((current) => current.filter((savedId) => savedId !== id))
    if (editingId === id) closeForm()
    setPendingDeleteId(null)
    setNotice(removed ? `"${removed.title}" was deleted.` : '')
  }

  // ---- Precomputed JSX variable for the demo UI states ----
  let content
  if (demoStatus === 'loading') {
    content = (
      <div
        role="status"
        className="rounded-lg border border-line bg-white p-8 text-center"
      >
        <p className="font-semibold">Loading opportunities&hellip;</p>
        <p className="mt-1 text-sm text-muted">This is a local demo, no network call is made.</p>
      </div>
    )
  } else if (demoStatus === 'error') {
    content = (
      <Alert tone="error" title="We could not load opportunities">
        <p>Something went wrong in this demo. Switch back to Ready to see the list again.</p>
        <Button className="mt-3" onClick={() => setDemoStatus('ready')}>
          Try again
        </Button>
      </Alert>
    )
  } else {
    content = (
      <OpportunityList
        opportunities={visible}
        categories={CATEGORIES}
        groupByCategory={groupByCategory}
        savedIds={savedIds}
        pendingDeleteId={pendingDeleteId}
        onToggleSave={toggleSave}
        onEdit={openEditForm}
        onRequestDelete={setPendingDeleteId}
        onConfirmDelete={confirmDelete}
        onCancelDelete={() => setPendingDeleteId(null)}
        onReset={resetFilters}
      />
    )
  }

  return (
    <div className="min-h-screen">
      <header className="border-b-4 border-accent bg-brand text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Rwanda Opportunities Explorer
          </h1>
          <p className="mt-2 max-w-2xl text-base text-white/90">
            Find workshops, career events, community activities and short courses
            across Rwanda. All listings are sample content.
          </p>
        </div>
      </header>

      <IntroSection />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
        {notice !== '' && (
          <Alert tone="success" title="Done">
            {notice}
          </Alert>
        )}

        <SummaryDashboard opportunities={opportunities} savedIds={savedIds} />

        <OpportunityFilters
          categories={CATEGORIES}
          search={search}
          category={category}
          sortBy={sortBy}
          availableOnly={availableOnly}
          savedOnly={savedOnly}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onSortChange={setSortBy}
          onAvailableOnlyChange={setAvailableOnly}
          onSavedOnlyChange={setSavedOnly}
          onReset={resetFilters}
        />

        <section aria-labelledby="results-heading" className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 id="results-heading" className="text-xl font-bold">
                Opportunities
              </h2>
              {/* Result count is text, so a count of 0 is never shown as a stray 0 */}
              {demoStatus === 'ready' && (
                <p className="text-sm text-muted" aria-live="polite">
                  Showing {visible.length} of {opportunities.length} opportunities
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Checkbox
                id="group-by-category"
                label="Group by category"
                checked={groupByCategory}
                onChange={(event) => setGroupByCategory(event.target.checked)}
              />
              {showForm ? null : <Button onClick={openAddForm}>Add an opportunity</Button>}
            </div>
          </div>

          {showForm && (
            <div className="mb-6">
              <AddOpportunityForm
                key={editingId ?? 'new'}
                categories={CATEGORIES}
                editing={editingOpportunity}
                onSave={saveOpportunity}
                onCancel={closeForm}
              />
            </div>
          )}

          {content}

          <div className="mt-8 flex flex-wrap items-center gap-2 rounded-lg border border-line bg-white p-3 text-sm">
            <span className="font-semibold">Demo page state:</span>
            <span className="text-muted">{demoStatus}</span>
            <Button variant="ghost" className="ml-auto" onClick={() => setDemoStatus('loading')}>
              Loading
            </Button>
            <Button variant="ghost" onClick={() => setDemoStatus('error')}>
              Error
            </Button>
            <Button variant="ghost" onClick={() => setDemoStatus('ready')}>
              Ready
            </Button>
          </div>
        </section>
      </main>

      <ContactSection />

      <footer className="bg-ink px-4 py-6 text-center text-sm text-white/80">
        Rwanda Opportunities Explorer &middot; Sample data for a learning project. Events and
        organisers are fictional.
      </footer>
    </div>
  )
}

export default App