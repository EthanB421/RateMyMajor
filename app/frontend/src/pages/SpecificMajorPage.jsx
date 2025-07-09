import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
} from '@mui/material';


export default function SpecificMajorPage() {
  const { specificMajor } = useParams();
  const [major, setMajor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userVotes, setUserVotes] = useState({});

const handleVote = async (reviewId, value) => {
  try {
    const currentVote = userVotes[reviewId] || 0;
    let newVoteScore = 0;

    if (currentVote === value) {
      // User clicked same vote, remove vote
      await fetch(`http://localhost:5123/api/votes/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setUserVotes(prev => ({ ...prev, [reviewId]: 0 }));

      newVoteScore = -value; // Subtract vote
    } else {
      // Add or update vote
      await fetch('http://localhost:5123/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviewId, value }),
      });

      setUserVotes(prev => ({ ...prev, [reviewId]: value }));

      newVoteScore = value - currentVote; // Adjust by delta
    }

    // Update the major's voteScore locally
    setMajor(prev => ({
      ...prev,
      reviews: prev.reviews.map(r =>
        r.id === reviewId
          ? { ...r, voteScore: (r.voteScore ?? 0) + newVoteScore }
          : r
      ),
    }));
  } catch (err) {
    console.error('Vote API error:', err);
  }
};



  useEffect(() => {
    const fetchMajor = async () => {
      try {
        const response = await fetch(
          `http://localhost:5123/api/major/search?keyword=${encodeURIComponent((
            specificMajor.trim()
          ))}`
        );

        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();
        setMajor(data);
      } catch (err) {
        setError(`Failed to fetch major: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMajor();
  }, [specificMajor]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!major) return <Typography>No major found.</Typography>;

  return (
    <Box>
      <Typography variant="h3">{major.name}</Typography>
      <Typography variant="body1">{major.description}</Typography>
      {/* Display other major info as needed */}
        <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>Reviews</Typography>
      {major.reviews.length === 0 ? (
        <Typography>No reviews yet.</Typography>
      ) : (
        major.reviews.map((review) => (
      <Paper key={review.id} sx={{ mb: 2, p: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Rating: {review.rating} / 5
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>{review.content}</Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Button
            color="success"
            onClick={() => handleVote(review.id, 1)}
          >
            <ThumbUpIcon />
            {/* <ArrowUpwardIcon /> */}
          </Button>

          <Typography variant="body2" color="textSecondary">
          {review.voteScore ?? 0}
          </Typography>

          <Button
            color="error"
            onClick={() => handleVote(review.id, -1)}
          >
            <ThumbDownIcon />
            {/* <ArrowDownwardIcon /> */}
          </Button>

          {/* Optional placeholder for showing current vote score */}

        </Box>
      </Paper>

        ))
      )}
    </Box>
  );
}
