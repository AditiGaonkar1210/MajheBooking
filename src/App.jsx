import { Routes, Route } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext.jsx'
import ServiceListingPage from './pages/ServiceListingPage.jsx'
import ServiceDetailPage from './pages/ServiceDetailPage.jsx'
import BookingFormPage from './pages/BookingFormPage.jsx'
import OtpVerificationPage from './pages/OtpVerificationPage.jsx'
import ConfirmationPage from './pages/ConfirmationPage.jsx'
import MyBookingsPage from './pages/MyBookingsPage.jsx'

export default function App() {
  return (
    <BookingProvider>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<ServiceListingPage />} />
          <Route path="/service/:id" element={<ServiceDetailPage />} />
          <Route path="/book/:id" element={<BookingFormPage />} />
          <Route path="/otp" element={<OtpVerificationPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/bookings" element={<MyBookingsPage />} />
        </Routes>
      </div>
    </BookingProvider>
  )
}
