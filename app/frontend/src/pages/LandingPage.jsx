import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
} from '@mui/material';
import Searchbar from '../components/Searchbar';

export default function LandingPage() {
  return (
    <Box>
      {/* Searchbar component with Hero Image */}
      <Searchbar />

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
                <Typography variant='h4' fontWeight='bold' align='center'>
                  Anonymous reviews
                </Typography>
                <Box
                  component='img'
                  src='src/images/anonymous.png'
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
                <Typography variant='h4' fontWeight='bold' align='center'>
                  Find career paths
                </Typography>
                <Box
                  component='img'
                  src='src/images/careerPath.png'
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
                <Typography variant='h4' fontWeight='bold' align='center'>
                  Agree to disagree
                </Typography>
                <Box
                  component='img'
                  src='src/images/agreeDisagree.png'
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
            gap: { xs: '2em', md: '0' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1em',
              width: { xs: '100%', md: '50%' },
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
              Ready to level up your future?
            </Typography>
            <Typography
              variant='body1'
              sx={{
                fontSize: { xs: '.80rem', sm: '1rem', md: '1rem' },
                width: '90%',
              }}
            >
              Get recommendations from people in fields you are interested in,
              as well as information on career prospects and progression.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: '1em',
            }}
          >
            <Button
              variant='contained'
              sx={{
                p: { xs: '1em', md: '1.75em' },
                borderRadius: '20px',
              }}
            >
              Get Started
            </Button>
            <Button
              variant='outlined'
              sx={{
                p: { xs: '1em', md: '1.75em' },
                borderRadius: '20px',
              }}
            >
              Explore Careers
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
