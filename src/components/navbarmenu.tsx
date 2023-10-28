import { Menu, MenuItem } from '@mui/material'

interface NavBarMenu {
  anchorEl: any
  handleClose: any
}

export default function NavBarMenu({ anchorEl, handleClose }: NavBarMenu) {
  return (
    <>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
      </Menu>
    </>
  )
}
