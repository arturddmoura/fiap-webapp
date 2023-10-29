import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { Box, CardActions, IconButton } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import React from 'react'
import { numberFormat } from './helpers'
import { CartItem, addToCart } from '../services/cart'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface CardsProps {
  product: any
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setMessage: React.Dispatch<React.SetStateAction<string>>
  setSeverity: React.Dispatch<
    React.SetStateAction<'success' | 'error' | 'info' | 'warning' | undefined>
  >
}

export default function Cards({
  product,
  setOpen,
  setMessage,
  setSeverity,
}: CardsProps) {
  const [loading, setLoading] = React.useState(false)

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (formData: CartItem) => {
      setLoading(true)
      formData.product_id = formData.id
      formData.quantity = quantity
      formData.id = Math.floor(Math.random() * 100000000000) + 1
      return addToCart(formData)
    },
    onSuccess: async (data: { status: number }) => {
      if (data.status == 201) {
        setDisableButton(true)
        setOpen(true)
        setSeverity('success')
        setMessage('Produto adicionado ao carrinho')
        queryClient.invalidateQueries({ queryKey: ['cart'] })
        queryClient.invalidateQueries({ queryKey: ['cartNumber'] })
        setLoading(false)
      } else {
        setOpen(true)
        setSeverity('error')
        setMessage('Erro ao adicionar item ao carrinho')
        setLoading(false)
      }
    },
    onError: async () => {
      setOpen(true)
      setSeverity('error')
      setMessage('Erro ao adicionar item ao carrinho')
      setLoading(false)
    },
  })

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
    mutate(product)
  }

  return (
    <Box sx={{ pl: 5, pr: 5, pb: 5 }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="300"
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
          <LoadingButton
            loading={loading}
            disabled={quantity === 0 || disableButton}
            onClick={handleAddToCart}
            sx={{ ml: 'auto' }}
            size="small"
            color="primary"
          >
            Adicionar ao carrinho
          </LoadingButton>
        </CardActions>
      </Card>
    </Box>
  )
}
