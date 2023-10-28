import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { Box, Button, CardActions, IconButton } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import React from 'react'
import { numberFormat } from './helpers'

interface CardsProps {
  product: any
  cartNumber: number
  setCartNumber: React.Dispatch<React.SetStateAction<number>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setSeverity: React.Dispatch<
    React.SetStateAction<'success' | 'error' | 'info' | 'warning' | undefined>
  >
}

export default function Cards({
  product,
  cartNumber,
  setCartNumber,
  setOpen,
  setMessage,
  setSeverity,
}: CardsProps) {
  //const productId = product.id
  const [disableButton, setDisableButton] = React.useState(false)

  const availableQuantity = product.available_quantity

  const [quantity, setQuantity] = React.useState(0)

  const handleIncrement = () => {
    if (quantity < availableQuantity) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  const handleAddToCart = () => {
    if (quantity === 0) {
      return
    }

    setCartNumber(cartNumber + quantity)
    setDisableButton(true)
    setOpen(true)
    setSeverity('success')
    setMessage('Produto adicionado ao carrinho')
  }

  return (
    <Box sx={{ pl: 5, pr: 5, pb: 5 }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={product.picture}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography
            sx={{ mt: 2, mb: -2 }}
            variant="body2"
            color="text.secondary"
          >
            Preço: {numberFormat(product.price ?? 0)}
          </Typography>
        </CardContent>
        <CardActions>
          <Box display="flex" alignItems="center">
            <IconButton
              disabled={quantity === 0}
              color="primary"
              onClick={handleDecrement}
            >
              <RemoveCircleIcon />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton
              disabled={quantity === availableQuantity}
              color="primary"
              onClick={handleIncrement}
            >
              <AddCircleIcon />
            </IconButton>
          </Box>
          <Button
            disabled={quantity === 0 || disableButton}
            onClick={handleAddToCart}
            sx={{ ml: 'auto' }}
            size="small"
            color="primary"
          >
            Adicionar ao carrinho
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}
