import { useEffect, useState } from 'react'

function Catalog({ onAdd }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/items${category ? `?category=${encodeURIComponent(category)}` : ''}`)
        const data = await res.json()
        setItems(data.items || [])
      } catch (e) {
        setError('Could not load catalog')
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [category])

  return (
    <section id="catalog" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-neutral-900">Catalog</h2>
          <select value={category} onChange={(e)=> setCategory(e.target.value)} className="border border-neutral-200 rounded-full px-4 py-2 text-sm">
            <option value="">All</option>
            <option>Vases</option>
            <option>Candles</option>
            <option>Textiles</option>
            <option>Signage</option>
          </select>
        </div>

        {loading ? (
          <p className="text-neutral-500">Loading...</p>
        ) : error ? (
          <p className="text-rose-500">{error}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map(item => (
              <article key={item.id} className="group border border-neutral-200 rounded-2xl overflow-hidden bg-white">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-medium text-neutral-900">{item.title}</h3>
                    <span className="text-neutral-500 text-sm">${item.price_per_day.toFixed(2)}/day</span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{item.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-neutral-500">{item.category}</span>
                    <button onClick={() => onAdd(item)} className="rounded-full bg-neutral-900 text-white text-sm px-4 py-2 hover:-translate-y-0.5 transition-transform">Add</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Catalog