import {Routes, Route} from 'react-router-dom'
import ButtonPage from './pages/ButtonPage'
import AccordionPage from './pages/AccordionPage'
import DropdownPage from './pages/DropdownPage'
import ModalPage from './pages/ModalPage'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <div>
        <NavBar />
      </div>
      <div className="col-span-5 relative">
        <Routes>
          <Route path="/" element={<ButtonPage />} />
          <Route path="/accordion" element={<AccordionPage />} />
          <Route path="/dropdown" element={<DropdownPage />} />
          <Route path="/modal" element={<ModalPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
