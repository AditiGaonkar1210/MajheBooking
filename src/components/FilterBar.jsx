export default function FilterBar({ sortBy, onSortChange }) {
  return (
    <div className="filter-bar">
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
        <option value="rating">Rating (high to low)</option>
        <option value="price">Price (low to high)</option>
      </select>
    </div>
  )
}
