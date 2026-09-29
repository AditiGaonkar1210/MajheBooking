import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import providersData from '../data/providers.json'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import ErrorState from '../components/ErrorState.jsx'

export default function ServiceDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const found = providersData.find((p) => p.id === id)
      if (found) {
        setProvider(found)
        setError(null)
      } else {
        setError('Provider not found.')
      }
      setLoading(false)
    }, 400)
  }, [id])

  if (loading) return <LoadingSpinner label="Loading provider details..." />
  if (error) return <ErrorState message={error} onRetry={() => navigate('/')} />

  return (
    <div className="page">
      <button className="back-link" onClick={() => navigate(-1)}>&larr; Back</button>
      <h1>{provider.name}</h1>
      <p className="rating">★ {provider.rating} ({provider.reviews} reviews)</p>
      <p className="tags">{provider.tags.join(' · ')}</p>
      <p className="price-large">₹{provider.pricePerHour}/hr</p>

      <h3>Available slots today</h3>
      <ul className="slot-list">
        {provider.availability.map((slot) => (
          <li key={slot}>{slot}</li>
        ))}
      </ul>

      <button className="primary-btn" onClick={() => navigate(`/book/${provider.id}`)}>
        Book Now
      </button>
    </div>
  )
}
