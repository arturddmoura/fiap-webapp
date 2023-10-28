import { createTheme } from '@mui/material/styles'
import { purple, orange } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    secondary: {
      main: purple[500],
    },
    primary: {
      main: orange[800],
    },
  },
})
