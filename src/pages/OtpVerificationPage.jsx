import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBookings } from '../context/BookingContext.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

const MOCK_OTP = '1234'

export default function OtpVerificationPage() {
  const navigate = useNavigate()
  const { draftBooking, addBooking } = useBookings()
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [resendIn, setResendIn] = useState(30)

  useEffect(() => {
    if (!draftBooking) navigate('/')
  }, [draftBooking, navigate])

  useEffect(() => {
    if (resendIn <= 0) return
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [resendIn])

  const handleVerify = (e) => {
    e.preventDefault()
    setError('')
    setVerifying(true)
    // Simulated verification call — real SMS/OTP provider would go here.
    setTimeout(() => {
      if (otp === MOCK_OTP) {
        addBooking({ ...draftBooking, status: 'Confirmed' })
        setVerifying(false)
        navigate('/confirmation')
      } else {
        setVerifying(false)
        setError('Incorrect OTP. Please try again. (Hint: 1234)')
      }
    }, 700)
  }

  if (!draftBooking) return null

  return (
    <div className="page">
      <h1>Verify your number</h1>
      <p>We've sent a 4-digit code to {draftBooking.phone}</p>

      {verifying ? (
        <LoadingSpinner label="Verifying..." />
      ) : (
        <form onSubmit={handleVerify}>
          <input
            className="otp-input"
            type="text"
            maxLength={4}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="0000"
          />
          {error && <p className="field-error">{error}</p>}
          <button className="primary-btn" type="submit" disabled={otp.length !== 4}>
            Confirm Booking
          </button>
        </form>
      )}

      <p className="resend-line">
        {resendIn > 0 ? `Resend code in ${resendIn}s` : (
          <button className="link-btn" onClick={() => setResendIn(30)}>Resend code</button>
        )}
      </p>
    </div>
  )
}
