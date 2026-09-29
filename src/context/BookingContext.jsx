import { createContext, useContext, useEffect, useState } from 'react'

const BookingContext = createContext(null)
const STORAGE_KEY = 'majhe_bookings'

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [draftBooking, setDraftBooking] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  }, [bookings])

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking])
  }

  const updateBookingStatus = (bookingId, status) => {
    setBookings((prev) =>
      prev.map((b) => (b.bookingId === bookingId ? { ...b, status } : b))
    )
  }

  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, updateBookingStatus, draftBooking, setDraftBooking }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBookings() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBookings must be used inside BookingProvider')
  return ctx
}
