function Checkbox({ id, label, checked, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-brand"
      />
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
    </div>
  )
}

export default Checkbox