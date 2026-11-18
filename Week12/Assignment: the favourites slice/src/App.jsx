import Header from './components/Header'
import Catalog from './components/Catalog'
import Cart from './components/Cart'

const App = () => {
  // Each component reads the parts of the shared store that it needs.
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />

      <main className="mx-auto grid max-w-5xl border-x-4 border-b-4 border-ink md:grid-cols-[2fr_1fr]">
        <Catalog />
        <Cart />
      </main>
    </div>
  )
}

export default App
