import React from 'react'
import { Router } from "@reach/router"
import CompressImage from './pages/CompressImage'

const App = () => {
  return (
    <div>
      <Router>
        <CompressImage path="/"/>
      </Router>
    </div>
  )
}

export default App