import { Typography, Grid, Container, Box, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function MajorPage() {
  const navigate = useNavigate();
  const testMajors = [
    'computer science',
    'nursing',
    'biology',
    'pharmacy',
    'psychology',
    'history',
  ];

  const handleNavigate = () => {
    navigate('/');
  };

  return (
    <Container maxWidth='xl' sx={{ p: '2em' }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2em',
          p: '2em',
          flexGrow: 1,
        }}
      >
        <Box>
          <Typography
            variant='h2'
            sx={{
              textAlign: { sm: 'center', md: 'left' },
            }}
          >
            Majors
          </Typography>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
        >
          {testMajors.map((major, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid black',
                  height: '100%',
                }}
              >
                <Typography textAlign='center' sx={{ p: ' 5em' }}>
                  {major}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Typography textAlign='center' variant='body1'>
          Don't see your major? Add it{' '}
          <Link onClick={handleNavigate}>here</Link>.
        </Typography>
      </Paper>
    </Container>
  );
}
