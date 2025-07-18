import { Typography, Grid, Container, Box, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function MajorPage() {
  const navigate = useNavigate();
  const [majors, setMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await fetch(
          'http://localhost:5123/api/Major/GetMajors'
        );

        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();
        setMajors(data);
      } catch (err) {
        setError(`Failed to fetch major: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMajors();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color='error'>{error}</Typography>;
  if (!majors) return <Typography>No major found.</Typography>;

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
            variant='h3'
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              fontSize: { xs: '2.5rem', md: '3rem' },
            }}
          >
            Find a path here.
          </Typography>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
        >
          {majors.map((major, index) => (
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
                  {major.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Typography textAlign='center' variant='body1'>
          Don't see your major? Add it{' '}
          <Link onClick={() => navigate('/')}>here</Link>.
        </Typography>
      </Paper>
    </Container>
  );
}
