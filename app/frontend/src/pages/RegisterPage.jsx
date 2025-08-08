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

/*
  *****************IMPORTANT*****************
    - Need to include feedback when user doesn't have a password that meets the standards
    
    - Seems like backend has checks for duplicate users, incorrect passwords, etc.
*/

export default function RegisterPage() {
  const navigate = useNavigate();
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
          'http://localhost:5123/api/auth/register',
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
          console.log('Backend response', data);
          throw new Error(data.message || 'Account Creation Failed');
        }

        navigate('/login', { state: { showRegisterSnackbar: true } });
      } catch (error) {
        console.error('Account creation error:', error);
        alert(`Account Creation Failed: ${error.message}`);
      }
      if (validateLogin() == false) {
        return;
      }
    }
  };

  // Simple validation for login
  const validateLogin = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', confirmPassword: '' };

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
                - Check to see passwords are the same
        */
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password is invalid';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Password is invalid';
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
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
                error={errors.confirmPassword}
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
  );
}
