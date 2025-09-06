import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  FormControl,
  FormLabel,
  Link,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' // 'error', 'warning', 'info', 'success'
  });

  // Captures new input value from textfields and updates formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateLogin()) {
      try {
        const response = await fetch(
          `${API_URL}/api/auth/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
              firstName: formData.firstName,
              lastName: formData.lastName,
            }),
          }
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Account Creation Failed');
        }

        navigate('/login', { state: { showRegisterSnackbar: true } });
      } catch (error) {
        console.error('Account creation error:', error);
        setSnackbar({
          open: true,
          message: `Account Creation Failed: ${error.message}`,
          severity: 'error'
        });
      }
    }
  };

  // Enhanced password validation
  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNonAlphanumeric = /[^a-zA-Z0-9]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasMinLength) {
      return { isValid: false, message: 'Password must be at least 6 characters long' };
    }

    if (!hasUppercase && !hasNonAlphanumeric) {
      return { 
        isValid: false, 
        message: 'Password must contain at least one uppercase letter AND one special character (!@#$%^&*)'
      };
    }

    return { isValid: true, message: '' };
  };

  // Enhanced validation for login
  const validateLogin = () => {
    let isValid = true;
    const newErrors = { 
      firstName: '', 
      lastName: '', 
      email: '', 
      password: '', 
      confirmPassword: '' 
    };

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    // Email validation
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
      isValid = false;
    }

    // Password validation with snackbar
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = 'Password does not meet requirements';
        setSnackbar({
          open: true,
          message: passwordValidation.message,
          severity: 'warning'
        });
        isValid = false;
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      {/* Main Container */}
      <Container maxWidth='sm' sx={{ p: '2em' }}>
        {/* Form container */}
        <Paper elevation={6} sx={{ p: '2em' }}>
          {/* Form content */}
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1em',
            }}
          >
            <Typography
              variant='h3'
              fontFamily='Bebas Neue'
              fontStyle='italic'
              sx={{ textAlign: { xs: 'center', md: 'left' } }}
            >
              Let's get started.
            </Typography>
            {/* Textfield container */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
              }}
            >
              <Box sx={{ display: 'flex', gap: '1em' }}>
                <FormControl fullWidth>
                  <FormLabel htmlFor='firstName'>First Name</FormLabel>
                  <TextField
                    name='firstName'
                    id='firstName'
                    required
                    placeholder='John'
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                  <TextField
                    name='lastName'
                    id='lastName'
                    required
                    placeholder='Doe'
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </FormControl>
              </Box>
              {/* Email field */}
              <FormControl>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <TextField
                  name='email'
                  id='email'
                  type='email'
                  required
                  placeholder='you@email.com'
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </FormControl>

              {/* Password field */}
              <FormControl>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <TextField
                  name='password'
                  id='password'
                  type='password'
                  required
                  placeholder='••••••••••••'
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </FormControl>

              {/* Confirm password field */}
              <FormControl>
                <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
                <TextField
                  name='confirmPassword'
                  id='confirmPassword'
                  type='password'
                  required
                  placeholder='••••••••••••'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />
              </FormControl>
            </Box>

            <Button type='submit' fullWidth variant='contained'>
              Sign up
            </Button>

            <Typography textAlign='center'>
              Already have an account?{' '}
              <Link
                onClick={() => navigate('/login')}
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* Snackbar for validation messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}