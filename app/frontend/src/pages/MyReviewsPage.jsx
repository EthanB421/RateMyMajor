import { Typography, Box, Paper, Container } from '@mui/material';
import { useState, useEffect } from 'react';

export default function MyReviewsPage() {
  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await fetch(
          `http://localhost:5123/api/college/search?keyword=${encodeURIComponent(
            specificCollege.trim()
          )}`
        );

        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched college data:', data);

        setCollege(data);
      } catch (err) {
        setError(`Failed to fetch college: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [specificCollege]);
  return (
    <Container maxWidth='md'>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '2em',
          gap: '.5em',
          margin: '1em',
        }}
      >
        <Box>
          <Typography
            fontFamily='Bebas Neue'
            fontStyle='italic'
            variant='h3'
            textAlign='center'
          >
            My Reviews
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
