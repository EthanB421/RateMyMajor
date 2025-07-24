import {
  AppBar,
  useTheme,
  useMediaQuery,
  Box,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext';

export default function Navbar() {
  /*
        useTheme and useMediaQuery
        - responsible for responsive sizing
        - if needed, can make isTablet and change that mediaquery to 'md', then change isMobile to 'sm' or 'xs'
  */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // useState for opening and closing of drawer when screen size is small
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/', { state: { showLogoutSnackbar: true } });
  };

  /*
        Navbar Content
        - Store in list for ease of use in drawer/navbar content through mapping

        TODO:
        - update content with actual links and navigation names, simply placeholder content

  */
  const navItems = user
    ? [
        { text: 'Majors', path: '/major' },
        { text: 'Reviews', path: '/review' },
      ]
    : [
        { text: 'Majors', path: '/major' },
        { text: 'Login', path: '/login' },
        { text: 'Register', path: '/register' },
      ];

  /*
        Drawer content
        - Pulls from navItems list to display buttons that lead to their respective links
  */
  const drawer = (
    <Box sx={{ width: 250 }} role='presentation' onClick={handleDrawerToggle}>
      <Typography variant='h5' p='15px'>
        Navigation
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            text-decoration='none'
            component='a'
            onClick={() => navigate(`${item.path}`)}
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  /*
        Navbar content
        - Pulls from navItems list to display buttons that lead to their respective links
  */
  const NavButtons = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1em',
      }}
    >
      {navItems.map((item) => (
        <Button
          key={item.text}
          color='inherit'
          onClick={() => navigate(`${item.path}`)}
          sx={{
            fontSize: '1.2rem',
          }}
        >
          {item.text}
        </Button>
      ))}

      {/* Display hello message if logged in */}
      {user ? (
        <Button
          color='inherit'
          sx={{
            fontSize: '1.2rem',
          }}
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      ) : (
        []
      )}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{
          p: {
            xs: '1em',
            sm: '1em',
            md: '1.5em',
            lg: '2em',
          },
          justifyContent: 'center',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link
            onClick={() => navigate('/')}
            variant='h4'
            underline='none'
            sx={{
              fontSize: { xs: '2rem', sm: '2rem', md: '3rem' },
              color: 'white',
              fontFamily: 'Bebas Neue, sans-serif',
              fontWeight: 200,
              fontStyle: 'italic',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            RateMyCareer
          </Link>

          {/* Drawer code for when screen size is small */}
          {isMobile ? (
            <>
              <IconButton color='inherit' onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor='right'
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            // Otherwise, display navigation buttons on Navbar
            <NavButtons />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
