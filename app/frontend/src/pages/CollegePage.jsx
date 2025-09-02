import {
  Typography,
  Grid,
  Container,
  Box,
  Paper,
  Link,
  Rating,
  Grow,
  TextField,
  InputAdornment,
  styled,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import patrickImage from '../images/patrick404.jpg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { motion, AnimatePresence } from 'framer-motion';

export default function CollegePage() {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;


  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#757ce8',
    },
  });

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        console.log("ENV API_URL:", import.meta.env.VITE_API_URL);

        const response = await fetch(
          `${API_URL}/api/College/GetColleges`
        );

        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();
        setColleges(data);
      } catch (err) {
        setError(`Failed to fetch college: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress size={70} />
      </motion.div>
    );
  }
  if (error) return <Typography color='error'>{error}</Typography>;
  if (!colleges) return <Typography>No college found.</Typography>;

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Container maxWidth='xl' sx={{ p: '2em' }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2em',
          p: '2em',
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant='h3'
            sx={{
              textAlign: 'center',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              fontFamily: 'Bebas Neue',
              fontWeight: 500,
              fontStyle: 'Italic',
            }}
          >
            Find a college here.
          </Typography>
          <TextField
            // slotprops.input.sx is necessary here to directly edit the input (TextField in this case)
            slotProps={{
              input: {
                sx: {
                  borderRadius: '20px',
                  bgcolor: 'white',
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
              fontSize: '1rem',
            }}
            autoComplete='off'
            placeholder='Ex: Duke University'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        {filteredColleges.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1em',
            }}
          >
            <Typography
              variant='h6'
              textAlign='center'
              sx={{
                fontFamily: 'Raleway',
                color: 'red',
                fontSize: { xs: '1rem', sm: '2rem', md: '2.5rem' },
              }}
            >
              No results found for "{searchTerm}"
            </Typography>
            <Box
              component='img'
              src={patrickImage}
              alt='404 Patrick'
              sx={{
                height: 'auto',
                width: { xs: '100%', md: '50%' },
              }}
            ></Box>
          </Box>
        ) : (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 1, sm: 8, md: 12 }}
          >
            {filteredColleges.map((college, index) => (
              <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '30px',
                    backgroundColor: '#ebebeb',
                    height: '100%',
                    p: { xs: '2em', sm: '2.5em', md: '3em' },
                    gap: '.5em',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      cursor: 'pointer',
                    },
                  }}
                  onClick={() => navigate(`/college/${college.name}`)}
                >
                  <Typography
                    textAlign='center'
                    variant='h5'
                    sx={{
                      fontFamily: 'Raleway, Bebas Neue, sans-serif',
                      fontSize: {
                        xs: '1rem',
                        sm: '1.5rem',
                        md: '2rem',
                        lg: '2.5rem',
                      },
                    }}
                  >
                    {college.name}
                  </Typography>
                  <StyledRating
                    name='college-rating'
                    defaultValue={college.collegeRating}
                    readOnly
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
        <Typography
          textAlign='center'
          variant='body1'
          sx={{ fontFamily: 'Raleway, Bebas Neue' }}
        >
          Don't see your college? Send us an email at{' '}
          <Link>support@ratemycollege.com</Link>.
        </Typography>
      </Paper>
    </Container>
  );
}
