import { Stack } from '@mui/material'
import React from 'react'
import { products } from '../produts'
import Cards from './cards'

interface HomeProps {
  cartNumber: number
  setCartNumber: React.Dispatch<React.SetStateAction<number>>
}

export default function HomePage({ cartNumber, setCartNumber }: HomeProps) {
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
