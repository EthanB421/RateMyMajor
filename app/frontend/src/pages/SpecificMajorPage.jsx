import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LinearProgress from '@mui/material/LinearProgress';

import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Pagination,
} from '@mui/material';


export default function SpecificMajorPage() {
  const { specificMajor } = useParams();
  const [major, setMajor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
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
          `http://localhost:5123/api/major/search?keyword=${encodeURIComponent(
            specificMajor.trim()
          )}`
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
  if (error) return <Typography color='error'>{error}</Typography>;
  if (!major) return <Typography>No major found.</Typography>;

  const paginatedItems = major.reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log(paginatedItems);

  return (
    <Container disableGutters maxWidth='xl'>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '2em',
          gap: '.5em',
          margin: '1em',
        }}
      >
        <Typography variant='h3' textAlign='center'  
         sx={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontWeight: 600,
            fontSize: '4.25rem'
          }}>
          {major.name} 
        </Typography>
        <Box sx={{ my: 2 }}>
          <Typography variant='h5' textAlign='center' gutterBottom>Would Recommend</Typography>
          <LinearProgress
            variant="determinate"
            value={major.wouldRecommend}
            sx={{ height: 10, borderRadius: 5, mb: 1 }}
          />
          <Typography variant="body2" textAlign='center'>
            {major.wouldRecommend}% of reviewers rated this major 3 or higher.
          </Typography>
        </Box>

        {/* Display other major info as needed */}
        <Divider sx={{ my: 3 }} />

        {/* Review and description container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            gap: { sm: '1em', md: '4em' },
          }}
        >
          {/* Description container */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: '2em',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
                backgroundColor: '#ebebeb',
                p: '1em',
                borderRadius: '15px',
              }}
            >
              <Typography
                sx={{
                  textAlign: {
                    xs: 'center',
                    md: 'left',
                  },
                }}
                variant='h5'
              >
                Description
              </Typography>
              {/* <Typography variant='body1'>{major.description}</Typography> */}
              <Typography
                sx={{
                  textAlign: {
                    xs: 'center',
                    md: 'left',
                  },
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                unde aliquam enim nesciunt sunt commodi eos omnis ratione iste,
                tenetur quos rem aut. Et vel dicta maiores ad obcaecati nihil.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas
                ducimus ex omnis nemo aut velit, recusandae nostrum earum hic
                nam. Asperiores sapiente numquam inventore repudiandae doloribus
                corrupti ea adipisci magni!
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
                backgroundColor: '#ebebeb',
                p: '1em',
                borderRadius: '15px',
              }}
            >
              <Typography
                sx={{
                  textAlign: {
                    xs: 'center',
                    md: 'left',
                  },
                }}
                variant='h5'
              >
                Career Projections
              </Typography>
              {/* <Typography variant='body1'>{major.description}</Typography> */}
              <Typography
                sx={{
                  textAlign: {
                    xs: 'center',
                    md: 'left',
                  },
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                unde aliquam enim nesciunt sunt commodi eos omnis ratione iste,
                tenetur quos rem aut. Et vel dicta maiores ad obcaecati nihil.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas
                ducimus ex omnis nemo aut velit, recusandae nostrum earum hic
                nam. Asperiores sapiente numquam inventore repudiandae doloribus
                corrupti ea adipisci magni!
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Review container */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              backgroundColor: '#ebebeb',
              p: '1em',
              borderRadius: '15px',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant='h5' gutterBottom>
                Reviews
              </Typography>
              {major.reviews.length === 0 ? (
                <Typography>No reviews yet.</Typography>
              ) : (
                paginatedItems.map((review) => (
              <Paper
                    key={review.id}
                    sx={{ mb: 2, p: 2, borderRadius: '15px' }}
                  >
                <Typography variant='subtitle1' fontWeight='bold'>
                  Rating: {review.rating} / 5
                </Typography>
                {/* <Typography variant='body2' sx={{ mb: 1 }}>{review.content}</Typography> */}
                    <Typography variant='body2'>{review.content}
                    </Typography>
        
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

            <Pagination
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              count={Math.ceil(major.reviews.length / itemsPerPage)}
              page={currentPage}
              onChange={(e, value) => setCurrentPage(value)}
            ></Pagination>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
