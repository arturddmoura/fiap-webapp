import { Alert, Box, Snackbar } from '@mui/material'
import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Cart from './components/cart'
import HomePage from './components/homepage'
import NavBar from './components/navbar'

function App() {
  //const [openCart, setOpenCart] = React.useState(false)
  const [cartNumber, setCartNumber] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState('Sample message')
  const [severity, setSeverity] = React.useState<
    'success' | 'error' | 'info' | 'warning' | undefined
  >('success')

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Box sx={{ minHeight: '100vh', width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>

      <NavBar cartNumber={cartNumber} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ pt: 5 }}
      >
        <Router>
          <Routes>
            <Route
              path="/cart"
              element={
                <Cart
                  setOpen={setOpen}
                  setMessage={setMessage}
                  setSeverity={setSeverity}
                />
              }
            />
            <Route
              path="/"
              element={
                <HomePage
                  setOpen={setOpen}
                  setMessage={setMessage}
                  setSeverity={setSeverity}
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
