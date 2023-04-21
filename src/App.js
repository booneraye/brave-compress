import React from 'react'
import { Router } from "@reach/router"
import CompressImage from './pages/CompressImage'
import EncryptData from './pages/EncryptData'
import ImagetoBase64 from './pages/ImagetoBase64'

const App = () => {
  return (
    <div>
      <Router>
        <CompressImage path="/"/>
        <EncryptData path="/encrypt"/>
        <ImagetoBase64 path="/file-to-base64"/>
      </Router>
    </div>
  )
}

export default App