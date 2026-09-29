import { useNavigate } from 'react-router-dom'
import { useBookings } from '../context/BookingContext.jsx'
import StatusBadge from '../components/StatusBadge.jsx'

export default function MyBookingsPage() {
  const navigate = useNavigate()
  const { bookings, updateBookingStatus } = useBookings()

  const advanceStatus = (booking) => {
    const next = booking.status === 'Pending' ? 'Confirmed'
      : booking.status === 'Confirmed' ? 'Completed'
      : 'Completed'
    updateBookingStatus(booking.bookingId, next)
  }

  return (
    <div className="page">
      <button className="back-link" onClick={() => navigate('/')}>&larr; Home</button>
      <h1>My Bookings</h1>

      {bookings.length === 0 && <p className="empty-state">No bookings yet.</p>}

      {bookings.slice().reverse().map((b) => (
        <div className="booking-row" key={b.bookingId}>
          <div>
            <strong>{b.providerName}</strong>
            <p>{b.date} · {b.slot}</p>
          </div>
          <div className="booking-row-right">
            <StatusBadge status={b.status} />
            {b.status !== 'Completed' && (
              <button className="link-btn small" onClick={() => advanceStatus(b)}>
                Mark next
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
