import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../images/heroSearchbar.avif';

export default function Searchbar() {
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');
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

  const handleShowDropdownTrue = () => {
    setShowDropdown(true);
  };

  const handleShowDropdownFalse = () => {
    setShowDropdown(false);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          'http://localhost:5123/api/College/GetColleges'
        );

        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();
        setSearchResults(data);
        console.log(data);
      } catch (err) {
        setError(`Failed to fetch results: ${err.message}`);
      }
    };

    fetchSearchResults();
  }, []);

  const filteredResults = searchResults.filter((college) =>
    college.name.toLowerCase().includes(inputValue.toLowerCase())
  );

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
        overflowX: 'hidden',
      }}
    >
      <Box
        width='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        sx={{
          px: '2',
          // mt: { xs: '-1em', sm: '-10em', md: '-12em', lg: '-14em' },
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
        <Box
          width='100%'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          marginBottom={{ xs: '20em', sm: '10em', md: '5em', lg: '5em' }}
        >
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
              width: { xs: '90%', sm: '70%', md: '80%', lg: '60%' },
              // mb: { xs: '20em', sm: '10em', md: '5em', lg: '5em' },
            }}
            autoComplete='off'
            placeholder='Search for a college here...'
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleShowDropdownTrue}
            onBlur={handleShowDropdownFalse}
          />

          {showDropdown === false ? (
            <Typography></Typography>
          ) : (
            <Box
              display='flex'
              flexDirection='column'
              width={{ xs: '90%', sm: '70%', md: '80%', lg: '60%' }}
              sx={{
                backgroundColor: 'white',
                borderRadius: '0px 0px 8px 8px',
              }}
            >
              {filteredResults.map((college) => (
                <Typography
                  key={college.id}
                  sx={{}}
                  onClick={() => {
                    setInputValue(college.name);
                    setShowDropdown(false);
                    navigate(`/college/${college.name}`);
                  }}
                >
                  {college.name}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
