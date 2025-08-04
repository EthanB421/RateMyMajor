import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../images/heroSearchbar.avif';

export default function Searchbar() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // TODO: Eventually add verification that the route exists, if not send them to a 404 page
  const handleNavigation = () => {
    if (inputValue.trim()) {
      navigate(`/college/${inputValue}`);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `
    linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0.3)),
    url(${heroImage})
  `,
        backgroundSize: 'cover',
        backgroundPosition: 'center 0%',
        height: '90vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        width='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        sx={{
          mt: { xs: '-1em', sm: '-10em', md: '-12em', lg: '-14em' },
        }}
      >
        <Typography
          variant='h2'
          align='center'
          color='#002884'
          sx={{
            fontFamily: ' Bebas Neue',
            fontSize: { xs: '2rem', sm: '3rem', md: '5rem', lg: '6rem' },
          }}
        >
          Find your future college here!
        </Typography>
        <TextField
          // slotprops.input.sx is necessary here to directly edit the input (TextField in this case)
          slotProps={{
            input: {
              sx: {
                borderRadius: '20px',
                bgcolor: 'white',
                // No focus outline
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                // No hover outline
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                // No default outline
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              },
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            padding: '1em',
            width: { xs: '100%', sm: '70%', md: '80%', lg: '60%' },
            mb: { xs: '20em', sm: '10em', md: '5em', lg: '5em' },
          }}
          autoComplete='off'
          placeholder='Search for a college here...'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleNavigation();
            }
          }}
        />
      </Box>
    </Box>
  );
}
