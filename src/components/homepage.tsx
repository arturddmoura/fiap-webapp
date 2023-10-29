import { Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { ProductItem, getProducts } from '../services/products'
import Cards from './cards'

interface HomeProps {
  cartNumber: number
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setSeverity: React.Dispatch<
    React.SetStateAction<'success' | 'error' | 'info' | 'warning' | undefined>
  >
}

export default function HomePage({
  setOpen,
  setMessage,
  setSeverity,
}: HomeProps) {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

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
        {data &&
          data.map((product: ProductItem, index: number) => (
            <Cards
              setOpen={setOpen}
              setMessage={setMessage}
              setSeverity={setSeverity}
              key={index}
              product={product}
            />
          ))}
      </Stack>
    </>
  )
}
