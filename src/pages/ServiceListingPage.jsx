import { useEffect, useMemo, useState } from 'react'
import providersData from '../data/providers.json'
import ProviderCard from '../components/ProviderCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FilterBar from '../components/FilterBar.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import ErrorState from '../components/ErrorState.jsx'

export default function ServiceListingPage() {
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('rating')

  const loadProviders = () => {
    setLoading(true)
    setError(null)
    // Simulated API call — mock data stands in for a real backend fetch.
    setTimeout(() => {
      try {
        setProviders(providersData)
        setLoading(false)
      } catch (e) {
        setError('Could not load providers. Please try again.')
        setLoading(false)
      }
    }, 600)
  }

  useEffect(loadProviders, [])

  const visibleProviders = useMemo(() => {
    let list = providers.filter((p) =>
      (p.name + p.tags.join(' ')).toLowerCase().includes(query.toLowerCase())
    )
    if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    if (sortBy === 'price') list = [...list].sort((a, b) => a.pricePerHour - b.pricePerHour)
    return list
  }, [providers, query, sortBy])

  return (
    <div className="page">
      <h1>Home Cleaning near you</h1>
      <SearchBar value={query} onChange={setQuery} />
      <FilterBar sortBy={sortBy} onSortChange={setSortBy} />

      {loading && <LoadingSpinner label="Finding providers near you..." />}
      {error && <ErrorState message={error} onRetry={loadProviders} />}
      {!loading && !error && visibleProviders.length === 0 && (
        <p className="empty-state">No providers match your search.</p>
      )}
      {!loading && !error && visibleProviders.map((p) => (
        <ProviderCard key={p.id} provider={p} />
      ))}
    </div>
  )
}
