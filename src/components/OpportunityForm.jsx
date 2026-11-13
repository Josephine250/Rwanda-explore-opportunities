import { useState } from 'react'
import TextInput from './TextInput.jsx'
import SelectInput from './Selectinput.jsx'
import Checkbox from './Checkbox.jsx'
import Button from './Button.jsx'

const emptyForm = {
  title: '',
  category: '',
  city: '',
  date: '',
  capacity: '',
  price: '',
  description: '',
  featured: false,
}

function validate(values) {
  const errors = {}

  if (values.title.trim() === '') errors.title = 'Enter a title.'
  if (values.category === '') errors.category = 'Choose a category.'
  if (values.city.trim() === '') errors.city = 'Enter a city.'
  if (values.description.trim() === '') {
    errors.description = 'Add a short description.'
  }

  if (values.date === '') {
    errors.date = 'Choose a date.'
  } else if (Number.isNaN(Date.parse(values.date))) {
    errors.date = 'Enter a valid date.'
  }

  const capacity = Number(values.capacity)
  if (values.capacity.trim() === '') {
    errors.capacity = 'Enter the number of places (use 0 if fully booked).'
  } else if (!Number.isInteger(capacity) || capacity < 0) {
    errors.capacity = 'Capacity must be a whole number, 0 or more.'
  }

  const price = Number(values.price)
  if (values.price.trim() === '') {
    errors.price = 'Enter a price in RWF (use 0 if free).'
  } else if (Number.isNaN(price) || price < 0) {
    errors.price = 'Price must be 0 or more.'
  }

  return errors
}

// Controlled form: every field's value lives in React state.
function AddOpportunityForm({ categories, onAdd, onCancel }) {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  function handleChange(field, value) {
    setValues((current) => ({ ...current, [field]: value }))
    // Clear the message for a field as soon as the person edits it.
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault() // no page reload
    const foundErrors = validate(values)

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors)
      return
    }

    onAdd({
      id: crypto.randomUUID(), // created once here, never during render
      title: values.title.trim(),
      category: values.category,
      city: values.city.trim(),
      date: values.date,
      description: values.description.trim(),
      capacity: Number(values.capacity),
      price: Number(values.price),
      featured: values.featured,
    })
    setValues(emptyForm)
    setErrors({})
  }

  function handleClear() {
    setValues(emptyForm)
    setErrors({})
  }

  const hasErrors = Object.values(errors).some(Boolean)
  const categoryOptions = [
    { value: '', label: 'Choose a category' },
    ...categories.map((name) => ({ value: name, label: name })),
  ]

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="add-form-heading"
      className="rounded-lg border border-line bg-white p-5"
    >
      <h2 id="add-form-heading" className="text-lg font-bold">
        Add an opportunity
      </h2>

      {hasErrors && (
        <p role="alert" className="mt-2 text-sm font-medium text-danger">
          Please fix the highlighted fields and try again.
        </p>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <TextInput
          id="form-title"
          label="Title"
          className="sm:col-span-2"
          value={values.title}
          error={errors.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
        <SelectInput
          id="form-category"
          label="Category"
          options={categoryOptions}
          value={values.category}
          error={errors.category}
          onChange={(e) => handleChange('category', e.target.value)}
        />
        <TextInput
          id="form-city"
          label="City"
          value={values.city}
          error={errors.city}
          onChange={(e) => handleChange('city', e.target.value)}
        />
        <TextInput
          id="form-date"
          label="Date"
          type="date"
          value={values.date}
          error={errors.date}
          onChange={(e) => handleChange('date', e.target.value)}
        />
        <TextInput
          id="form-capacity"
          label="Capacity (places available)"
          type="number"
          min="0"
          step="1"
          inputMode="numeric"
          value={values.capacity}
          error={errors.capacity}
          onChange={(e) => handleChange('capacity', e.target.value)}
        />
        <TextInput
          id="form-price"
          label="Price (RWF)"
          type="number"
          min="0"
          step="1"
          inputMode="numeric"
          hint="Enter 0 for a free opportunity."
          value={values.price}
          error={errors.price}
          onChange={(e) => handleChange('price', e.target.value)}
        />
        <TextInput
          id="form-description"
          label="Description"
          multiline
          className="sm:col-span-2"
          value={values.description}
          error={errors.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
        <div className="sm:col-span-2">
          <Checkbox
            id="form-featured"
            label="Mark as featured"
            checked={values.featured}
            onChange={(e) => handleChange('featured', e.target.checked)}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button type="submit">Add opportunity</Button>
        <Button variant="ghost" onClick={handleClear}>
          Clear form
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default AddOpportunityForm