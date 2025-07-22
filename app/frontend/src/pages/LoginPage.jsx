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
import { useAuth } from './AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCloseSnackbar = () => {
    setIsSubmitted(false);
  };

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

  // In case you want an idea of what handleSubmit should look like after

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateLogin()) {
      try {
        const response = await fetch('http://localhost:5123/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }

        login(data.user, data.token);
        setIsSubmitted(true);

        setTimeout(() => {
          navigate('/');
        }, 6000);
      } catch (error) {
        console.error('Login error:', error);
        alert(`Login failed: ${error.message}`);
      }
    }
  };

  // Simple validation for login
  const validateLogin = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    /*
            Email validation
                - Checks for empty entry
                - Checks that input is in email address format
        */
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
      isValid = false;
    }

    /*
            Password validation
                - Checks for empty entry
                - Checks that password is at least 6 characters
        */
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password is invalid';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    // Main Container
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
            variant='h4'
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            Sign in to your account
          </Typography>
          {/* Textfield container */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1em',
            }}
          >
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
                error={errors.email}
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
                error={errors.password}
                helperText={errors.password}
              />
            </FormControl>
          </Box>

          <Button type='submit' fullWidth variant='contained'>
            Sign in
          </Button>

          <Typography textAlign='center'>
            Don't have an account?{' '}
            <Link onClick={() => navigate('/register')}>Sign up</Link>
          </Typography>
        </Box>
      </Paper>
      <Snackbar
        open={isSubmitted}
        onClose={handleCloseSnackbar}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: { xs: 'none', sm: '20em', md: '16em' } }}
      >
        <Alert severity='success' variant='filled' sx={{ width: '100%' }}>
          Login successful!
        </Alert>
      </Snackbar>
    </Container>
  );
}
