export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search providers or services..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
