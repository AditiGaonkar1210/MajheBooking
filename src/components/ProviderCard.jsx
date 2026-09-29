import { useNavigate } from 'react-router-dom'

export default function ProviderCard({ provider }) {
  const navigate = useNavigate()
  return (
    <div className="provider-card" onClick={() => navigate(`/service/${provider.id}`)}>
      <div className="provider-card-top">
        <h3>{provider.name}</h3>
        <span className="rating">★ {provider.rating}</span>
      </div>
      <p className="tags">{provider.tags.join(' · ')}</p>
      <div className="provider-card-bottom">
        <span className="price">₹{provider.pricePerHour}/hr</span>
        <span className="reviews">{provider.reviews} reviews</span>
      </div>
    </div>
  )
}
