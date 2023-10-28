import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { cartItems } from '../produts'
import { numberFormat } from './helpers'
import ClearIcon from '@mui/icons-material/Clear'

export default function Cart() {
  let totalPrice = 0

  for (const item of cartItems) {
    totalPrice += item.price * item.quantity
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
      <Button sx={{ mt: 2 }} variant="contained" fullWidth>
        Finalizar compra
      </Button>
    </Paper>
  )
}
