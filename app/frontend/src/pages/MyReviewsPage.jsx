import { Typography, Box, Paper, Container, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';
import AnotherReviewCardRating from '../components/AnotherReviewCardRating';

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const response = await fetch(
          'http://localhost:5123/api/review/my-reviews',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched college data:', data);

        setReviews(data);
      } catch (err) {
        setError(`Failed to fetch college: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch(
        `http://localhost:5123/api/review/${reviewId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Delete failed with status: ${response.status}`);
      }
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    } catch (err) {
      console.error('API error:', err);
    }
  };

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
  if (!reviews) return <Typography>No reviews found.</Typography>;

  return (
    <Container maxWidth='lg'>
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
            gutterBottom
          >
            My Reviews
          </Typography>

          {reviews.length === 0 ? (
            <Typography>No reviews found.</Typography>
          ) : (
            reviews.map((review) => (
              <Paper
                key={review.id}
                sx={{
                  p: '2em',
                  mb: '1em',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                <Box
                  display='flex'
                  flexDirection='column'
                  justifyContent='space-between'
                  alignItems='center'
                  gap='1em'
                >
                  <Box
                    display='flex'
                    flexDirection='column'
                    width='85%'
                    gap='1em'
                  >
                    <Typography variant='body1' fontFamily='Raleway'>
                      {review.content}
                    </Typography>
                    <Typography variant='body2' display='block'>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                    <AnotherReviewCardRating data={review} />
                  </Box>

                  <Button
                    variant='contained'
                    sx={{ width: '15%', height: '3em' }}
                    onClick={() => handleDelete(review.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Paper>
            ))
          )}
        </Box>
      </Paper>
    </Container>
  );
}
