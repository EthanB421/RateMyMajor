import {
  AppBar,
  useTheme,
  useMediaQuery,
  Box,
  Toolbar,
  Typography,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
}
