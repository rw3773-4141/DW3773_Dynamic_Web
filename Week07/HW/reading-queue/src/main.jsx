import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {BooksProvider} from './context/books'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BooksProvider>
      <App />
    </BooksProvider>
  </React.StrictMode>
)
