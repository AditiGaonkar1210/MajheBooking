import { useNavigate } from 'react-router-dom'
import { useBookings } from '../context/BookingContext.jsx'

export default function ConfirmationPage() {
  const navigate = useNavigate()
  const { bookings } = useBookings()
  const latest = bookings[bookings.length - 1]

  if (!latest) return null

  return (
    <div className="page confirmation">
      <div className="check-circle">✓</div>
      <h1>Booking Confirmed!</h1>
      <p>{latest.providerName}</p>
      <p>{latest.date} · {latest.slot}</p>
      <p>{latest.address}</p>
      <button className="primary-btn" onClick={() => navigate('/bookings')}>
        View My Bookings
      </button>
      <button className="link-btn" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  )
}
