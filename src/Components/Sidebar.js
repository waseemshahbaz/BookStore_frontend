import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookOpen, faUsers } from '@fortawesome/free-solid-svg-icons';

const StyledSidebar = styled(Paper)(({ theme }) => ({
  width: 240,
  minHeight: '100vh',
  background: 'linear-gradient(180deg, #2C3E50 0%, #3E5151 100%)',
  color: 'white',
  position: 'fixed',
  left: 0,
  top: 0,
  paddingTop: '64px', // Space for navbar
  borderRadius: 0,
  zIndex: 100,
  boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1)',
}));

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: '8px 16px',
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateX(5px)',
  },
}));

const StyledListItemIcon = styled(ListItemIcon)({
  color: 'white',
  minWidth: '40px',
});

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  width: '100%',
});

const Logo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/products', icon: faBook, text: 'Books' },
    { path: '/products/genres', icon: faBookOpen, text: 'Genres' },
    { path: '/products/authors', icon: faUsers, text: 'Authors' },
  ];

  return (
    <StyledSidebar elevation={0}>
      <Logo>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontFamily: 'Playfair Display, serif',
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          BookStore
        </Typography>
      </Logo>
      <List>
        {menuItems.map((item) => (
          <StyledLink to={item.path} key={item.path}>
            <StyledListItem active={location.pathname === item.path ? 1 : 0}>
              <StyledListItemIcon>
                <FontAwesomeIcon icon={item.icon} />
              </StyledListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  sx: { 
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    letterSpacing: 0.5,
                  }
                }}
              />
            </StyledListItem>
          </StyledLink>
        ))}
      </List>
    </StyledSidebar>
  );
};

export default Sidebar;
