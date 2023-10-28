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
import { cartItems } from '../produts'
import { numberFormat } from './helpers'

interface CartProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setSeverity: React.Dispatch<
    React.SetStateAction<'success' | 'error' | 'info' | 'warning' | undefined>
  >
}

export default function Cart({ setOpen, setMessage, setSeverity }: CartProps) {
  const [disableButton, setDisableButton] = React.useState(false)

  let totalPrice = 0

  for (const item of cartItems) {
    totalPrice += item.price * item.quantity
  }

  const handleCheckout = () => {
    setDisableButton(true)
    setOpen(true)
    setSeverity('success')
    setMessage('Pedido realizado com sucesso')
  }

  const handleDelete = () => {
    setOpen(true)
    setSeverity('error')
    setMessage('Produto removido com sucesso')
  }

  return (
    <Paper elevation={3} sx={{ width: '85vw', height: '100%', p: 5 }}>
      <Typography variant="h4" component="h2" sx={{ pb: 5 }}>
        Carrinho
      </Typography>
      {cartItems.map((item) => (
        <>
          <Stack
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
                    onClick={handleDelete}
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
        disabled={disableButton}
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
