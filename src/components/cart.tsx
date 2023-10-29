import ClearIcon from '@mui/icons-material/Clear'
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import { numberFormat } from './helpers'
import {
  CartItem,
  deleteAllFromCart,
  deleteFromCart,
  getCart,
} from '../services/cart'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface CartProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setSeverity: React.Dispatch<
    React.SetStateAction<'success' | 'error' | 'info' | 'warning' | undefined>
  >
}

export default function Cart({ setOpen, setMessage, setSeverity }: CartProps) {
  const queryClient = useQueryClient()
  const { data } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  })

  const { mutate } = useMutation({
    mutationFn: (id: number) => {
      return deleteFromCart(id)
    },
    onSuccess: async (data: { status: number }) => {
      if (data.status == 200) {
        setOpen(true)
        setSeverity('error')
        setMessage('Produto removido com sucesso')
        queryClient.invalidateQueries({ queryKey: ['cart'] })
        queryClient.invalidateQueries({ queryKey: ['cartNumber'] })
      } else {
        setOpen(true)
        setSeverity('error')
        setMessage('Falha ao remover produto')
      }
    },
    onError: async () => {
      setOpen(true)
      setSeverity('error')
      setMessage('Falha ao remover produto')
    },
  })

  const { mutate: checkout }: any = useMutation({
    mutationFn: () => {
      const itemIds: Array<number> = data.map((item: CartItem) => item.id)
      return deleteAllFromCart(itemIds)
    },
    onSuccess: async (data: { status: number }) => {
      if (data.status == 200) {
        setDisableButton(true)
        setOpen(true)
        setSeverity('success')
        setMessage('Pedido realizado com sucesso')
        queryClient.invalidateQueries({ queryKey: ['cart'] })
        queryClient.invalidateQueries({ queryKey: ['cartNumber'] })
      } else {
        setOpen(true)
        setSeverity('error')
        setMessage('Falha ao realizar pedido')
      }
    },
    onError: async () => {
      setOpen(true)
      setSeverity('error')
      setMessage('Falha ao realizar pedido')
    },
  })

  const [disableButton, setDisableButton] = React.useState(false)

  const handleCheckout = () => {
    checkout()
  }

  const handleDelete = (deleteId: number) => {
    mutate(deleteId)
  }

  let totalPrice = 0

  if (data) {
    for (const item of data) {
      totalPrice += item.price * item.quantity
    }
  }

  return (
    <Paper elevation={3} sx={{ width: '85vw', height: '100%', p: 5 }}>
      <Typography variant="h4" component="h2" sx={{ pb: 5 }}>
        Carrinho
      </Typography>
      {data &&
        data.map((item: CartItem, index: number) => (
          <>
            <Stack
              key={index}
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Box
                component="img"
                sx={{
                  py: 1,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                alt={item.name}
                src={item.picture}
              />

              <Stack spacing={2}>
                <Box sx={{ py: 3 }}>
                  <Typography variant="body1" component="h2">
                    {item.name}
                    <IconButton
                      onClick={() => handleDelete(item.id)}
                      sx={{ mb: 0.4, ml: 1 }}
                      aria-label="delete"
                      size="small"
                    >
                      <ClearIcon fontSize="inherit" />
                    </IconButton>
                  </Typography>
                  <Typography variant="body1" component="h2">
                    {`${numberFormat(item.quantity * item.price)} (${
                      item.quantity
                    } unidades)`}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <Divider sx={{ mb: 2 }} />
          </>
        ))}
      <Typography variant="body1" component="h2">
        Total: {numberFormat(totalPrice)}
      </Typography>
      <Button
        disabled={disableButton || (data && data.length === 0)}
        onClick={handleCheckout}
        sx={{ mt: 2 }}
        variant="contained"
        fullWidth
      >
        Finalizar compra
      </Button>
    </Paper>
  )
}
