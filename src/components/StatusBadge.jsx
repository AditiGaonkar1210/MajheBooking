const COLORS = {
  Pending: '#f0a500',
  Confirmed: '#2e7d32',
  Completed: '#1565c0',
}

export default function StatusBadge({ status }) {
  return (
    <span className="status-badge" style={{ backgroundColor: COLORS[status] || '#999' }}>
      {status}
    </span>
  )
}
