import { useMemo, useState } from 'react'

function CartDrawer({ open, onClose, items, onSubmit }) {
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ client_name: '', email: '', phone: '', event_date: '', rental_days: 1, notes: '' })

  const totalPerDay = useMemo(() => items.reduce((s, it) => s + it.price_per_day * it.quantity, 0), [items])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await onSubmit({ ...form })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/20 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[460px] bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-neutral-200">
            <h3 className="text-lg font-medium">Your hire list</h3>
            <p className="text-sm text-neutral-500">Estimated total per day: ${totalPerDay.toFixed(2)}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <p className="text-neutral-500">No items yet.</p>
            ) : (
              items.map((it) => (
                <div key={it.id} className="flex gap-3 items-center">
                  <img src={it.image} alt="" className="w-16 h-16 rounded object-cover border" />
                  <div className="flex-1">
                    <p className="font-medium">{it.title}</p>
                    <p className="text-sm text-neutral-500">${it.price_per_day.toFixed(2)}/day</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-full border" onClick={() => it.onChangeQty(it.quantity - 1)}>-</button>
                    <span>{it.quantity}</span>
                    <button className="w-8 h-8 rounded-full border" onClick={() => it.onChangeQty(it.quantity + 1)}>+</button>
                  </div>
                </div>
              ))
            )}

            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <input required value={form.client_name} onChange={e=>setForm({...form, client_name:e.target.value})} placeholder="Full name" className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
              <input required type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
              <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="Phone" className="w-full border border-neutral-300 rounded-lg px-3 py-2" />
              <div className="flex gap-3">
                <input type="date" value={form.event_date} onChange={e=>setForm({...form, event_date:e.target.value})} className="flex-1 border border-neutral-300 rounded-lg px-3 py-2" />
                <input type="number" min={1} value={form.rental_days} onChange={e=>setForm({...form, rental_days: Number(e.target.value)})} className="w-32 border border-neutral-300 rounded-lg px-3 py-2" placeholder="Days" />
              </div>
              <textarea value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} placeholder="Notes" className="w-full border border-neutral-300 rounded-lg px-3 py-2" rows={3} />
              <button disabled={submitting || items.length===0} className="w-full rounded-full bg-neutral-900 text-white py-3 disabled:opacity-50">
                {submitting ? 'Sending...' : 'Request quote'}
              </button>
            </form>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer