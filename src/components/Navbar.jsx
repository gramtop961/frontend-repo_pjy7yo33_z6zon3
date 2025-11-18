import { ShoppingCart, Menu } from 'lucide-react'
import { useState } from 'react'

function Navbar({ onOpenCart, cartCount = 0 }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-neutral-200">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-medium tracking-wide text-neutral-800">
          <span className="text-xl">atelier</span>
          <span className="ml-1 text-neutral-400">decor hire</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-neutral-700">
          <a href="#catalog" className="hover:text-neutral-900 transition-colors">Catalog</a>
          <a href="#about" className="hover:text-neutral-900 transition-colors">About</a>
          <a href="#contact" className="hover:text-neutral-900 transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={onOpenCart} className="relative inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-4 py-2 hover:-translate-y-0.5 transition-transform">
            <ShoppingCart size={18} />
            <span className="text-sm">List</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-[11px] leading-none rounded-full bg-rose-500 text-white px-2 py-1">{cartCount}</span>
            )}
          </button>

          <button className="md:hidden p-2" onClick={() => setOpen(v => !v)}>
            <Menu />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <div className="container mx-auto px-6 py-3 flex flex-col gap-3">
            <a href="#catalog" className="py-2">Catalog</a>
            <a href="#about" className="py-2">About</a>
            <a href="#contact" className="py-2">Contact</a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar