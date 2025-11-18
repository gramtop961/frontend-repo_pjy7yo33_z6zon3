import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-b from-[#F5F3F7] to-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/myxXfbNiwnbTpGFp/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 container mx-auto px-6 py-24 grid md:grid-cols-2 gap-8">
        <div className="backdrop-blur-sm/0">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#1F2937]">
            Elevated decor hire for modern events
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[#4B5563] max-w-xl">
            Curated pieces with a minimalist aesthetic. Browse, add to your list, and request a quote—no payments online.
          </p>
        </div>
        <div className="hidden md:block" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}

export default Hero