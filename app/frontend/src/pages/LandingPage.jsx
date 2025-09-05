import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Snackbar,
  Alert,
  Divider,
  Fade,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Searchbar from '../components/Searchbar';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [logoutSubmitted, setLogoutSubmitted] = useState(false);
  const [fade, setFade] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  const imageList = [
    '/images/costChart.png',
    '/images/demographics.png',
    '/images/earningsChart.png',
    '/images/repaymentGauge.png',
  ];

  useEffect(() => {
    const state = location.state;
    if (state?.showLoginSnackbar) {
      setIsSubmitted(true);
    } else if (state?.showLogoutSnackbar) {
      setLogoutSubmitted(true);
    }
    // Clear the state after evaluating both
    if (state?.showLoginSnackbar || state?.showLogoutSnackbar) {
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage((prev) =>
          prev === imageList.length - 1 ? 0 : prev + 1
        );
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [imageList.length]);

  const handleCloseSnackbar = () => {
    setIsSubmitted(false);
    setLogoutSubmitted(false);
  };

  return (
    <Box>
      {/* Searchbar component with Hero Image */}
      <Searchbar />

      {/* Preview section */}
      <Container disableGutters maxWidth='xl' sx={{ p: '3em',}}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-evenly',
            alignItems: 'center',
            gap: '3em',
            backgroundColor: '#D2E1E3',
            borderRadius: '30px',
            p: '3em',
          }}
        >
          <Box
            display='flex'
            flexDirection='column'
            gap='1.5em'
            width={{ xs: '100%', md: '50%' }}
          >
            <Typography
              variant='h4'
              textAlign='center'
              sx={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              Curious about college?
            </Typography>
            <Typography
              variant='h4'
              textAlign='center'
              sx={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              }}
            >
              We provide the latest federal information on colleges you may be
              interested in.
            </Typography>
          </Box>

          <Fade in={fade} timeout={1000}>
            <Box
              sx={{
                width: { xs: '100%', md: '50%' }, // Half width on desktop, full on mobile
                maxWidth: '100%',
                aspectRatio: '4 / 3', // Keep consistent image ratio (optional but ideal)
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                order: { xs: 1, md: 2 },
                backgroundColor: '#f5f5f5',
              }}
            >
              <Box
                component='img'
                src={imageList[currentImage]}
                alt='Test Image'
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // or 'contain' if you want full image
                }}
              />
            </Box>
          </Fade>
        </Box>
      </Container>

      <Divider />

      {/* Container section */}
      <Container disableGutters maxWidth='xl' sx={{ p: '1em' }}>
        <Box sx={{ width: '100%', flexGrow: 1 }}>
          <Grid
            container
            justifyContent='center'
            spacing='1em'
            sx={{
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                elevation={3}
                sx={{
                  height: '100%',
                  width: '100%',
                  p: { xs: '1em', md: '3em' },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1em',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant='h4'
                  fontWeight='bold'
                  align='center'
                  sx={{ fontFamily: 'Raleway' }}
                >
                  Anonymous reviews
                </Typography>
                <Box
                  component='img'
                  src='/images/anonymous.png'
                  alt='Test Image'
                  sx={{
                    height: 'auto',
                    width: { xs: '50%', sm: '40%', md: '75%' },
                    maxWidth: '100%',
                    order: { xs: 1, md: 2 },
                  }}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                elevation={3}
                sx={{
                  height: '100%',
                  width: '100%',
                  p: { xs: '1em', md: '3em' },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1em',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant='h4'
                  fontWeight='bold'
                  align='center'
                  sx={{ fontFamily: 'Raleway' }}
                >
                  Find career paths
                </Typography>
                <Box
                  component='img'
                  src='/images/careerPaths.png'
                  alt='Test Image'
                  sx={{
                    height: 'auto',
                    width: { xs: '50%', sm: '40%', md: '75%' },
                    maxWidth: '100%',
                    order: { xs: 1, md: 2 },
                  }}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  p: { xs: '1em', md: '3em' },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1em',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant='h4'
                  fontWeight='bold'
                  align='center'
                  sx={{ fontFamily: 'Raleway' }}
                >
                  Rate other reviews
                </Typography>
                <Box
                  component='img'
                  src='/images/agreeDisagree.png'
                  alt='Test Image'
                  sx={{
                    height: 'auto',
                    width: { xs: '50%', sm: '40%', md: '75%' },
                    maxWidth: '100%',
                    order: { xs: 1, md: 2 },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Divider />

      {/* Another full width section */}
      <Container maxWidth='xl' sx={{ padding: '2em' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            p: { xs: '1em', sm: '3em', md: '4em' },
            backgroundColor: ' #D2E1E3 ',
            borderRadius: '15px',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: '2em' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1em',
              width: { xs: '100%', md: '60%' },
              textAlign: { xs: 'center', md: 'left' },
              alignItems: { xs: 'center', md: 'start' },
            }}
          >
            <Typography variant='caption' sx={{ opacity: '60%' }}>
              TRY IT NOW
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontSize: { xs: '2rem', sm: '3rem' },
              }}
            >
              Unsure about a prospective college?
            </Typography>
            <Typography
              variant='body1'
              sx={{
                fontSize: { xs: '.80rem', sm: '1rem', md: '1rem' },
                width: '90%',
              }}
            >
              Get insight from students and alumni that have attended specific
              colleges, from program information to campus life.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'column', lg: 'row' },
              gap: '1em',
            }}
          >
            <Button
              variant='contained'
              sx={{
                p: { xs: '2em', md: '1.5em', lg: '1.75em' },
                borderRadius: '20px',
              }}
              onClick={() => navigate('/register')}
            >
              Sign Up
            </Button>
            <Button
              variant='outlined'
              sx={{
                p: { xs: '1em', md: '1.75em' },
                borderRadius: '20px',
              }}
              onClick={() => navigate('/college')}
            >
              Explore Colleges
            </Button>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={isSubmitted}
        onClose={handleCloseSnackbar}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity='success' variant='filled' sx={{ width: '100%' }}>
          "Login successful!"
        </Alert>
      </Snackbar>
      <Snackbar
        open={logoutSubmitted}
        onClose={handleCloseSnackbar}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity='success' variant='filled' sx={{ width: '100%' }}>
          "Logout successful!"
        </Alert>
      </Snackbar>
    </Box>
  );
}
