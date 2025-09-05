import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import landingPic from '../images/landingPic.jpg';

export default function Searchbar() {
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // In charge of listening for clicks outside of the dropdown menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // In charge of grabbing the colleges from the backend for the dropdown
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        console.log('API_URL:', API_URL);

        const response = await fetch(
          `${API_URL}/api/College/GetColleges`
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

  // In charge of filtering results from the api call
  const filteredResults = searchResults.filter((college) =>
    college.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Box
      sx={{
        backgroundImage: `
    linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(0, 0, 0, 0.3)),
    url(${landingPic})
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
        <Box
          width='100%'
          display='flex'
          position='relative'
          flexDirection='column'
          alignItems='center'
          marginBottom={{ xs: '20em', sm: '10em', md: '5em', lg: '5em' }}
          ref={containerRef}
        >
          <TextField
            // slotprops.input.sx is necessary here to directly edit the input (TextField in this case)
            slotProps={{
              input: {
                sx: {
                  // If showDropdown is true, remove rounded corners from bottom; else have rounded corners everywhere
                  borderRadius: showDropdown ? '20px 20px 0 0' : '20px',
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
            onFocus={() => setShowDropdown(true)}
          />

          {showDropdown &&
            (filteredResults.length === 0 ? (
              <Box
                display='flex'
                flexDirection='column'
                position='absolute'
                width={{ xs: '90%', sm: '70%', md: '80%', lg: '60%' }}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '0px 0px 20px 20px',
                  top: '100%',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                <Typography
                  fontFamily='Raleway'
                  sx={{
                    px: { xs: '1em', md: '1.5em' },
                    py: '1em',
                  }}
                >
                  No results found
                </Typography>
                {/* Add school and view all schools section */}
                <Box
                  display='flex'
                  justifyContent='space-evenly'
                  alignItems='center'
                >
                  <Button
                    fullWidth
                    onClick={() => {
                      navigate('/college');
                    }}
                  >
                    View all colleges
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box
                display='flex'
                flexDirection='column'
                position='absolute'
                width={{ xs: '90%', sm: '70%', md: '80%', lg: '60%' }}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '0px 0px 20px 20px',
                  top: '100%',
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                {filteredResults.map((college) => (
                  <Typography
                    key={college.id}
                    fontFamily='Raleway'
                    sx={{
                      px: { xs: '1em', md: '1.5em' },
                      py: '1em',
                      '&:hover': {
                        cursor: 'pointer',
                        backgroundColor: '#ebebeb',
                      },
                    }}
                    onClick={() => {
                      setInputValue(college.name);
                      setShowDropdown(false);
                      navigate(`/college/${college.name}`);
                    }}
                  >
                    {college.name}
                  </Typography>
                ))}
                {/* Add school and view all schools section */}
                <Box
                  display='flex'
                  justifyContent='space-evenly'
                  alignItems='center'
                >
                  <Button
                    fullWidth
                    onClick={() => {
                      navigate('/college');
                    }}
                  >
                    View all colleges
                  </Button>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
}
