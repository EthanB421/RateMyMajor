import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/*
    TODO:
        - Find a nice background image for the website and figure out the height after - DONE
        - Implement functionality for:
            1) Moving to different pages - DONE
            2) A dropdown for existing majors
            3) NEW - figure out functionality when major has white space (eg. 'computer science')
        - Fix responsiveness when screen size is between md-lg - DONE
    
    Notes:
        - Probably shouldn't allow randoms to add their own major, if we do get users like that and they want to add their own majors, we can have a page that will allow them to submit a request
*/

export default function Searchbar() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // TODO: Eventually add verification that the route exists, if not send them to a 404 page
  const handleNavigation = () => {
    if (inputValue.trim()) {
      navigate(`/${inputValue}`);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(src/images/heroSearchbar.avif)`,
        backgroundSize: 'cover',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <Typography variant='h6' align='center'>
        Find your next career here!
      </Typography> */}
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
          padding: '3em',
          width: { xs: '100%', sm: '70%', md: '50%' },
        }}
        placeholder='Search for a major here...'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleNavigation();
          }
        }}
      />
    </Box>
  );
}
