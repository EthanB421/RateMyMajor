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
import React, { useState, useEffect } from 'react';


export default function LandingPage() {
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('http://localhost:5123/api/major/getmajors')
      .then(res => res.json())
      .then(data => {
        setMajors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching majors:', err);
        setLoading(false);
      });
  }, []);

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
              p: '1em',
            }}
          >
            <Grid xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  border: '1px solid black',
                  height: { xs: '30vh', md: '80vh' },
                  width: { xs: '100%', md: '20vw' },
                  p: { xs: '1em', md: '3em' },
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <Typography variant='h4' align='center'>
                  Reason #1
                </Typography>
                <Box sx={{ overflowY: 'auto', maxHeight: '100%' }}>
                  {loading ? (
                    <Typography align="center">Loading majors...</Typography>
                  ) : majors.length === 0 ? (
                    <Typography align="center">No majors found.</Typography>
                  ) : (
                    <ul>
                      {majors.map((major) => (
                        <li key={major.id} style={{ textAlign: 'center' }}>
                          {major.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </Box>
              </Paper>

            </Grid>
            <Grid xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  border: '1px solid black',
                  height: { xs: '30vh', md: '80vh' },
                  width: { xs: '100%', md: '20vw' },
                  p: { xs: '1em', md: '3em' },
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <Typography variant='h4' align='center'>
                  Reason #2
                </Typography>
                <Typography variant='body1' align='center'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore dolor similique praesentium enim expedita blanditiis
                  molestiae consequatur laborum, amet dolores iste ipsum,
                  facilis voluptatem assumenda harum, dolorem iure adipisci
                  quis?
                </Typography>
              </Paper>
            </Grid>
            <Grid xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  border: '1px solid black',
                  height: { xs: '30vh', md: '80vh' },
                  width: { xs: '100%', md: '20vw' },
                  p: { xs: '1em', md: '3em' },
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <Typography variant='h4' align='center'>
                  Reason #3
                </Typography>
                <Typography variant='body1' align='center'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore dolor similique praesentium enim expedita blanditiis
                  molestiae consequatur laborum, amet dolores iste ipsum,
                  facilis voluptatem assumenda harum, dolorem iure adipisci
                  quis?
                </Typography>
              </Paper>
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
              src='src/pages/testImage.jpg'
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
              src='src/pages/testImage.jpg'
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
