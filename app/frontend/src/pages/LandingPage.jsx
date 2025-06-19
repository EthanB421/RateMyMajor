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
            justifyContent={'center'}
            spacing={{ xs: '3em', md: '10em' }}
            sx={{
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                elevation={3}
                sx={{
                  height: '100%',
                  width: { xs: '100%', md: '100%' },
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
                    width: { xs: '60%', sm: '70%', md: '100%' },
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
                  width: { xs: '100%', md: '100%' },
                  p: { xs: '1em', md: '3em' },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1em',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant='h4' fontWeight='bold' align='center'>
                  Discover career paths
                </Typography>
                <Box
                  component='img'
                  src='src/images/careerPath.png'
                  alt='Test Image'
                  sx={{
                    height: 'auto',
                    width: { xs: '60%', sm: '70%', md: '100%' },
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
                  width: { xs: '100%', md: '100%' },
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
                    width: { xs: '60%', sm: '70%', md: '100%' },
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
      <Box sx={{ width: '100%' }}>
        {/* Misc Buttons */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
            padding: '1em',
          }}
        >
          {/* First Box */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-evenly',
              alignItems: 'center',
              padding: '1em',
              flexWrap: 'wrap',
              pb: '0',
            }}
          >
            <Box
              component='img'
              src='src/images/heroSearchbar.avif'
              alt='Test Image'
              sx={{
                height: 'auto',
                width: { xs: '100%', sm: '80%', md: '500px' },
                maxWidth: '100%',
                order: { xs: 1, sm: 1, md: 1 }, // Always first on mobile, stays first on desktop
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                textAlign: 'center',
                alignItems: 'center',
                width: { xs: '100%', sm: '80%', md: '40%' },
                mt: { xs: 2, md: 0 },
                order: { xs: 2, sm: 2, md: 2 }, // Always second on mobile, stays second on desktop
              }}
            >
              <Typography variant='h3'>Something here</Typography>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>
              <Button variant='outlined' sx={{ width: '100px' }}>
                Button
              </Button>
            </Box>
          </Box>

          {/* Second Box */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-evenly',
              alignItems: 'center',
              padding: '1em',
              flexWrap: 'wrap',
            }}
          >
            <Box
              component='img'
              src='src/images/heroSearchbar.avif'
              alt='Test Image'
              sx={{
                height: 'auto',
                width: { xs: '100%', sm: '80%', md: '500px' },
                maxWidth: '100%',
                order: { xs: 1, sm: 1, md: 1, lg: 2 },
              }}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1em',
                textAlign: 'center',
                alignItems: 'center',
                width: { xs: '100%', sm: '80%', md: '40%' },
                mt: { xs: 2, md: 0 },
                order: { xs: 2, sm: 2, md: 2, lg: 1 },
              }}
            >
              <Typography variant='h3'>Something here</Typography>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>
              <Button variant='outlined' sx={{ width: '100px' }}>
                Button
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
