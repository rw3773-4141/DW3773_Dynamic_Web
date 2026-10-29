import CounterPage from './components/CounterPage'

const App = () => {
  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Counter</h1>
      <CounterPage initialCount={10} />
    </div>
  )
}

export default App
