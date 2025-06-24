import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  InputBase, 
  Badge,
  Menu,
  MenuItem,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, 
  faSignOutAlt, 
  faSearch, 
  faShoppingCart, 
  faUser,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { POST_API } from '../APIs/RestApis';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(to right, #2C3E50, #3E5151)',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

const LogoWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.9,
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(3),
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '300px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  marginLeft: theme.spacing(2),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.1),
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignOut = async () => {
    try {
      await axios.post('/api/v1/auth/signout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const renderMobileMenu = () => (
    <>
      <IconButton
        color="inherit"
        onClick={handleMenuOpen}
        edge="start"
      >
        <FontAwesomeIcon icon={faBars} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleNavigation('/')}>Home</MenuItem>
        <MenuItem onClick={() => handleNavigation('/products/featured')}>Featured Books</MenuItem>
        <MenuItem onClick={() => handleNavigation('/about')}>About Us</MenuItem>
        <MenuItem onClick={() => handleNavigation('/contact')}>Contact</MenuItem>
        {localStorage.getItem('token') && (
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        )}
      </Menu>
    </>
  );

  const renderDesktopMenu = () => (
    <>
      <NavButton onClick={() => handleNavigation('/')}>Home</NavButton>
      <NavButton onClick={() => handleNavigation('/products/featured')}>Featured Books</NavButton>
      <NavButton onClick={() => handleNavigation('/about')}>About Us</NavButton>
      <NavButton onClick={() => handleNavigation('/contact')}>Contact</NavButton>
      {localStorage.getItem('token') && (
        <>
          <IconButton color="inherit" onClick={() => handleNavigation('/profile')}>
            <FontAwesomeIcon icon={faUser} />
          </IconButton>
          <NavButton 
            onClick={handleSignOut}
            startIcon={<FontAwesomeIcon icon={faSignOutAlt} />}
          >
            Sign Out
          </NavButton>
        </>
      )}
    </>
  );

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <LogoWrapper onClick={() => handleNavigation('/')}>
          <FontAwesomeIcon icon={faBook} size="lg" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 0, ml: 1, fontFamily: 'Playfair Display, serif' }}>
            Bookstore
          </Typography>
        </LogoWrapper>


        <Box sx={{ flexGrow: 1 }} />
        
        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
