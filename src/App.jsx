import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Catalog from './components/Catalog'
import CartDrawer from './components/CartDrawer'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Try to seed demo items on first load (no-op if already exists)
    const seed = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        await fetch(`${baseUrl}/api/seed`, { method: 'POST' })
      } catch {}
    }
    seed()
  }, [])

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === item.id)
      if (existing) {
        return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const changeQty = (id, qty) => {
    setCart(prev => prev
      .map(p => p.id === id ? { ...p, quantity: Math.max(1, qty) } : p)
      .filter(p => p.quantity > 0))
  }

  const handleSubmit = async (form) => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const payload = {
      ...form,
      items: cart.map(c => ({ item_id: c.id, title: c.title, quantity: c.quantity, price_per_day: c.price_per_day }))
    }
    const res = await fetch(`${baseUrl}/api/hire`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    if (res.ok) {
      setMessage('Thank you – your request was sent. We will confirm availability and quote shortly.')
      setCart([])
      setCartOpen(false)
    } else {
      setMessage(data.detail || 'Something went wrong')
    }
  }

  const cartWithHandlers = cart.map(i => ({ ...i, onChangeQty: (q) => changeQty(i.id, q) }))

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar onOpenCart={() => setCartOpen(true)} cartCount={cart.reduce((s,i)=>s+i.quantity,0)} />
      <Hero />
      <Catalog onAdd={addToCart} />

      {message && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-neutral-900 text-white px-4 py-2 rounded-full shadow-lg">
          {message}
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} items={cartWithHandlers} onSubmit={handleSubmit} />

      <footer id="about" className="border-t border-neutral-200 mt-16">
        <div className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium">About</h3>
            <p className="mt-2 text-neutral-600">We curate timeless, minimalist pieces to elevate your event. Select your favourites, send your list, and we’ll confirm availability and pricing.</p>
          </div>
          <div id="contact" className="md:text-right">
            <p className="text-neutral-600">Questions? Email us at <span className="underline">hello@yourdecorstudio.com</span></p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App