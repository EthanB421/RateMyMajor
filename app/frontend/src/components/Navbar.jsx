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

  /*
        Navbar Content
        - Store in list for ease of use in drawer/navbar content through mapping

        TODO:
        - update content with actual links and navigation names, simply placeholder content

  */
  const navItems = [
    { text: 'Majors', path: '/major' },
    { text: 'Reviews', path: '/review' },
    { text: 'Account', path: '/account' },
  ];

  /*
        Drawer content
        - Pulls from navItems list to display buttons that lead to their respective links
  */
  const drawer = (
    <Box sx={{ width: 250 }} role='presentation' onClick={handleDrawerToggle}>
      <Typography variant='h5' p='15px'>
        Test
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            text-decoration='none'
            component='a'
            href={item.path}
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
    <Box sx={{ display: 'flex', gap: 2 }}>
      {navItems.map((item) => (
        <Button
          key={item.text}
          color='inherit'
          href={item.path}
          sx={{
            fontSize: '1.2rem',
          }}
        >
          {item.text}
        </Button>
      ))}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ p: 3, justifyContent: 'center' }}>
        <Toolbar>
          <Link
            href='/'
            variant='h4'
            underline='none'
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              color: 'white',
              flexGrow: 1,
            }}
          >
            RateMyMajor
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
