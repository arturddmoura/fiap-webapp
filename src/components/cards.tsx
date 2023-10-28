import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  IconButton,
} from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import React from 'react'

export default function Cards({ product }: { product: any }) {
  //const productId = product.id
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

  return (
    <Box sx={{ p: 5 }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
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
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Box display="flex" alignItems="center">
            <IconButton color="primary" onClick={handleDecrement}>
              <RemoveCircleIcon />
            </IconButton>
            <Typography>{quantity}</Typography>
            <IconButton color="primary" onClick={handleIncrement}>
              <AddCircleIcon />
            </IconButton>
          </Box>
          <Button sx={{ ml: 'auto' }} size="small" color="primary">
            Adicionar ao carrinho
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}
