# Rwanda Opportunities Explorer

A responsive React app where learners can discover workshops, career events,
community activities and short courses across Rwanda. Built for the Week 7
integrated assignment of Advanced Frontend Web Development.

All data is fictional sample content kept in the frontend. There is no backend,
database, fetch call, React Router or external state library.

**Live site:** _add your deployed URL here (optional)_

## Features

**Required**
- 12 sample opportunities, 4 categories, 5 Rwandan cities, free/paid, featured/regular and fully booked examples
- Live search by title or city (case-insensitive, extra spaces trimmed)
- Category filter, **Available only** and **Saved only** checkboxes, all working together
- Sort by earliest date, title A to Z, or most places available
- Result count and **Reset filters** button
- Save / Unsave on each card with a live saved count
- Controlled **Add opportunity** form with validation, Clear and Cancel
- Badges for Featured, Free and Fully booked; helpful empty state with reset
- Demo loading / error / ready states (local `demoStatus` state, no network)
- Tailwind CSS v4 only, one palette (indigo, orange, emerald), mobile-first layout, labelled fields and visible focus

**Bonus**
- **Edit** an existing opportunity with the same controlled form (immutable `map()` update, id stays the same)
- **Group by category** toggle, with an accurate count in each group heading
- **Summary dashboard**: total, available, featured and saved counts calculated from existing data
- **Delete with confirmation** on the card; remaining items keep their permanent ids as keys

**Extra sections:** intro text with an illustration, contact section and a subscribe form (demo only).

## Setup

Requires Node.js 20 or later.

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/
    Button.jsx             reusable button (variants, default type="button")
    Badge.jsx              reusable status/category badge
    Alert.jsx              reusable info / success / error message
    TextInput.jsx          labelled input or textarea with error + hint
    SelectInput.jsx        labelled select with error
    Checkbox.jsx           labelled checkbox
    OpportunityCard.jsx    one opportunity: save, edit, delete + confirmation
    OpportunityList.jsx    maps opportunities to cards; empty state; optional grouping
    OpportunityFilters.jsx search, sort, category, checkboxes, reset
    AddOpportunityForm.jsx controlled form for adding and editing
    SummaryDashboard.jsx   total / available / featured / saved counts
    IntroSection.jsx       description text and illustration
    ContactSection.jsx     contact details
    SubscribeForm.jsx      email subscribe demo form
  data/seedOpportunities.js
  App.jsx                  owns all shared state and derives the visible list
  main.jsx, index.css
```

## Key design decisions

- **Data shape:** `{ id, title, category, city, date (YYYY-MM-DD), description, capacity, price, featured }`.
  `capacity` is the number of places still available; `0` means fully booked. `price` is RWF; `0` means free.
- **Keys:** every list uses `opportunity.id`. Seed records have permanent ids; new records get `crypto.randomUUID()` once, in the submit handler. Editing keeps the id; deleting never renumbers anything.
- **State ownership:** `App` owns opportunities, saved ids, filters, form mode and demo status. Children receive data as props and send changes up through callback props.
- **Saved identity:** saved items are stored as an array of ids, so sorting, filtering, editing and deleting never change which card is saved. Deleting also removes the id from the saved list.
- **Derived data:** the visible list, group counts and dashboard counts are calculated during render, never stored in state. Sorting uses a copy: `[...filtered].sort()`.
- **Conditional rendering patterns:** ternary (price text, Save/Unsave, delete confirmation), `&&` with real booleans (Featured, Free badges), early return (`OpportunityList` empty state), a precomputed JSX variable (`content` in `App`), and lookup objects (status labels, sorters).
- **The `&&` + 0 bug:** `&&` is only used with boolean conditions, and counts are rendered inside text, so a zero never appears by accident.

## Acceptance checklist

Tick each box after you test it yourself in the browser.

| Test | Passed |
| --- | --- |
| Search "kigali" shows only title/city matches | [ ] |
| Category + Available only combine | [ ] |
| Sorting keeps saved cards correct | [ ] |
| Impossible search shows empty state and reset | [ ] |
| Capacity 0 shows Fully booked; price 0 shows Free; no stray 0 | [ ] |
| Save, filter, unsave updates count and Saved only | [ ] |
| Invalid form shows messages and adds nothing | [ ] |
| Valid form adds a record with a unique id | [ ] |
| Demo loading and error, then Ready restores list | [ ] |
| Narrow mobile screens have no horizontal overflow | [ ] |
| Edit changes the card and keeps its id | [ ] |
| Group by category counts match the cards shown | [ ] |
| Delete asks first; Cancel keeps it, confirm removes it | [ ] |