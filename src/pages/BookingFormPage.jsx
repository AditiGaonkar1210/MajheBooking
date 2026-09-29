import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import providersData from '../data/providers.json'
import { useBookings } from '../context/BookingContext.jsx'

export default function BookingFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setDraftBooking } = useBookings()
  const provider = providersData.find((p) => p.id === id)

  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!date) e.date = 'Please select a date.'
    if (!slot) e.slot = 'Please select a time slot.'
    if (!address.trim() || address.trim().length < 8) e.address = 'Enter a valid address (min 8 characters).'
    if (!/^[6-9]\d{9}$/.test(phone)) e.phone = 'Enter a valid 10-digit mobile number.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!validate()) return
    setDraftBooking({
      bookingId: `b_${Date.now()}`,
      providerId: provider.id,
      providerName: provider.name,
      date,
      slot,
      address,
      phone,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    })
    navigate('/otp')
  }

  if (!provider) return <p className="page">Provider not found.</p>

  return (
    <div className="page">
      <button className="back-link" onClick={() => navigate(-1)}>&larr; Back</button>
      <h1>Book {provider.name}</h1>

      <form onSubmit={handleSubmit} noValidate>
        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        {errors.date && <p className="field-error">{errors.date}</p>}

        <label>Time slot</label>
        <select value={slot} onChange={(e) => setSlot(e.target.value)}>
          <option value="">Select a slot</option>
          {provider.availability.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.slot && <p className="field-error">{errors.slot}</p>}

        <label>Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Flat / street / area"
        />
        {errors.address && <p className="field-error">{errors.address}</p>}

        <label>Mobile number</label>
        <input
          type="tel"
          maxLength={10}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          placeholder="10-digit mobile number"
        />
        {errors.phone && <p className="field-error">{errors.phone}</p>}

        <button className="primary-btn" type="submit">Continue to Verification</button>
      </form>
    </div>
  )
}
