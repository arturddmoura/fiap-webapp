import { Box, Stack } from '@mui/material'
import Cards from './components/cards'
import NavBar from './components/navbar'
import React from 'react'
import { products } from './produts'

function App() {
  //const [openCart, setOpenCart] = React.useState(false)

  return (
    <Box sx={{ minHeight: '100vh', width: '100%' }}>
      <NavBar />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Stack
          direction="row"
          useFlexGap
          flexWrap="wrap"
          sx={{ width: '100%' }}
          justifyContent="center"
          alignItems="center"
        >
          {products.map((product, index) => (
            <Cards key={index} product={product} />
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default App
