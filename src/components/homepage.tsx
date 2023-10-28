import { Stack } from '@mui/material'
import React from 'react'
import { products } from '../produts'
import Cards from './cards'

interface HomeProps {
  cartNumber: number
  setCartNumber: React.Dispatch<React.SetStateAction<number>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setSeverity: React.Dispatch<
    React.SetStateAction<'success' | 'error' | 'info' | 'warning' | undefined>
  >
}

export default function HomePage({
  cartNumber,
  setCartNumber,
  setOpen,
  setMessage,
  setSeverity,
}: HomeProps) {
  return (
    <>
      <Stack
        direction="row"
        useFlexGap
        flexWrap="wrap"
        sx={{ width: '100%' }}
        justifyContent="center"
        alignItems="center"
      >
        {products.map((product, index) => (
          <Cards
            setOpen={setOpen}
            setMessage={setMessage}
            setSeverity={setSeverity}
            key={index}
            product={product}
            cartNumber={cartNumber}
            setCartNumber={setCartNumber}
          />
        ))}
      </Stack>
    </>
  )
}
