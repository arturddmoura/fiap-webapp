import { Box } from '@mui/material'
import React from 'react'
import HomePage from './components/homepage'
import NavBar from './components/navbar'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Cart from './components/cart'

function App() {
  //const [openCart, setOpenCart] = React.useState(false)
  const [cartNumber, setCartNumber] = React.useState(0)

  return (
    <Box sx={{ minHeight: '100vh', width: '100%' }}>
      <NavBar cartNumber={cartNumber} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ pt: 5 }}
      >
        <Router>
          <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/"
              element={
                <HomePage
                  cartNumber={cartNumber}
                  setCartNumber={setCartNumber}
                />
              }
            />
          </Routes>
        </Router>
      </Box>
    </Box>
  )
}

export default App
