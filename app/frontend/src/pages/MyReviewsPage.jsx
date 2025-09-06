import { 
  Typography, 
  Box, 
  Paper, 
  Container, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';
import AnotherReviewCardRating from '../components/AnotherReviewCardRating';

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    reviewId: null,
    reviewContent: ''
  });
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const response = await fetch(
          `${API_URL}/api/review/my-reviews`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle 404 specifically - user has no reviews
        if (response.status === 404) {
          setReviews([]);
          return;
        }

        // Handle other non-ok responses
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();

        // Ensure data is an array, fallback to empty array
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(`Failed to fetch reviews: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDeleteClick = (reviewId, reviewContent) => {
    setDeleteDialog({
      open: true,
      reviewId,
      reviewContent: reviewContent.length > 100 ? reviewContent.substring(0, 100) + '...' : reviewContent
    });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({
      open: false,
      reviewId: null,
      reviewContent: ''
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch(
        `${API_URL}/api/review/${deleteDialog.reviewId}`,
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
      
      // Remove the deleted review from state
      setReviews((prev) => prev.filter((r) => r.id !== deleteDialog.reviewId));
      
      // Close the dialog
      setDeleteDialog({
        open: false,
        reviewId: null,
        reviewContent: ''
      });
    } catch (err) {
      console.error('API error:', err);
      setError(`Failed to delete review: ${err.message}`);
      // Close dialog even if there's an error
      setDeleteDialog({
        open: false,
        reviewId: null,
        reviewContent: ''
      });
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

  if (error) {
    return (
      <Container maxWidth='lg'>
        <Paper sx={{ p: '2em', margin: '1em' }}>
          <Typography color='error' textAlign='center'>
            {error}
          </Typography>
        </Paper>
      </Container>
    );
  }

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
            <Box textAlign='center' py={4}>
              <Typography variant='h6' color='text.secondary' gutterBottom>
                No reviews yet
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Start by reviewing a college or major you've experienced!
              </Typography>
            </Box>
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
                    color='error'
                    sx={{ width: '15%', height: '3em' }}
                    onClick={() => handleDeleteClick(review.id, review.content)}
                  >
                    Delete
                  </Button>
                </Box>
              </Paper>
            ))
          )}
        </Box>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this review? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}