import { Container, Box, Typography, Paper } from '@mui/material';

export default function LandingPage() {
  return (
    <Box>
      {/* Hero Image */}
      <Box
        component='img'
        src='https://plus.unsplash.com/premium_vector-1748210658699-d2d8f43da6b3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        sx={{ height: 'auto', width: '100vw', display: 'block' }}
      />

      {/* Container section */}
      <Container sx={{ p: '1em' }}>
        <Paper elevation={3} sx={{ p: '2em' }}>
          <Typography variant='h4' align='center'>
            RateMyMajor
          </Typography>
        </Paper>
      </Container>

      {/* Another full screen width section */}
      <Box sx={{ width: '100vw' }}>
        <Paper elevation={3}></Paper>
      </Box>
    </Box>
  );
}
