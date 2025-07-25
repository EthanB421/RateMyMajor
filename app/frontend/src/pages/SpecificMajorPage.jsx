import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownTwoToneIcon from '@mui/icons-material/ThumbDownTwoTone';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

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
      const response = await fetch(`http://localhost:5123/api/votes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ reviewId, value }),
      });

      const result = await response.json();

      // ✅ Trust the backend – use result directly
      setUserVotes((prev) => ({ ...prev, [reviewId]: result.userVote }));
      setMajor((prev) => ({
        ...prev,
        reviews: prev.reviews.map((r) =>
          r.id === reviewId ? { ...r, voteScore: result.newVoteScore } : r
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
        console.log('Fetched major data:', data); // <-- add this line

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

  const DateComponent = ({ rawDate }) => {
    const dateObj = parseISO(rawDate);
    const formatted = format(dateObj, 'MMMM d, yyyy');
    return <Typography>{formatted}</Typography>;
  };
  const recommendationText =
    major.rating < 3 ? 'Would Not Recommend' : 'Would Recommend';

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
        {/* Main box container */}
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
          {/* Major & Description container */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: '1em',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Major/general information block */}
            <Box sx={{ width: '100%' }}>
              <Typography
                variant='h3'
                textAlign='center'
                sx={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontWeight: 600,
                  fontSize: '4.25rem',
                }}
              >
                {major.name}
              </Typography>
              <Box sx={{ my: 2 }}>
                <Typography variant='h5' textAlign='center' gutterBottom>
                  {major.rating.toFixed(1)}/5 - {recommendationText}
                </Typography>
                <LinearProgress
                  variant='determinate'
                  value={major.wouldRecommend}
                  sx={{
                    height: '1em',
                    borderRadius: '15px',
                    mb: '1em',
                    p: '1em',
                  }}
                />
                <Typography variant='body2' textAlign='center'>
                  {major.wouldRecommend}% of reviewers rated this major 3 or
                  higher.
                </Typography>
              </Box>
            </Box>
            {/* Description block */}
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
                  unde aliquam enim nesciunt sunt commodi eos omnis ratione
                  iste, tenetur quos rem aut. Et vel dicta maiores ad obcaecati
                  nihil. Lorem ipsum dolor sit, amet consectetur adipisicing
                  elit. Quas ducimus ex omnis nemo aut velit, recusandae nostrum
                  earum hic nam. Asperiores sapiente numquam inventore
                  repudiandae doloribus corrupti ea adipisci magni!
                </Typography>
              </Box>
            </Box>
            <Button
              component={Link}
              to={`/major/add-review/${major.id}`}
              fullWidth
              // color='secondary'
              variant='contained'
              sx={{
                borderRadius: '15px',
                p: '.5em',
                // width: '50%',
              }}
            >
              Add a review
            </Button>
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
              {/* Start of Card Formatting */}
              {major.reviews.length === 0 ? (
                <Typography>No reviews yet.</Typography>
              ) : (
                paginatedItems.map((review) => (
                  <Paper
                    key={review.id}
                    sx={{ mb: 2, p: 2, borderRadius: '15px' }}
                    elevation={1}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        padding: '1em',
                        borderRadius: '12px',
                        width: '100%',
                        overflow: 'hidden',
                        wordBreak: 'break-word',
                        gap: { xs: '1em', sm: '3em' },
                      }}
                    >
                      {/* Rating Box on the Left */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: { xs: 'row', sm: 'column' },
                          justifyContent: 'start',
                          alignItems: 'center',
                          gap: ' 1em',
                        }}
                      >
                        <Box>
                          <Typography
                            variant='h7'
                            sx={{
                              fontWeight: 'bold',
                            }}
                          >
                            Rating
                          </Typography>
                          <Box
                            sx={{
                              backgroundColor:
                                review.rating >= 4
                                  ? '#84F8C3'
                                  : review.rating >= 2
                                  ? '#FFF26A'
                                  : '#FF9999',
                              padding: '0.5em 1em',
                              borderRadius: '8px',
                              textAlign: 'center',
                            }}
                          >
                            <Typography
                              variant='h6'
                              sx={{
                                color: 'black',
                                fontWeight: 'bold',
                              }}
                            >
                              {review.rating}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Review Content */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant='body2'
                          sx={{
                            mb: 2,
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                          }}
                        >
                          {review.content}
                        </Typography>
                      </Box>

                      {/* Date component + voting component */}
                      <Box
                        display='flex'
                        flexDirection={{ xs: 'row', sm: 'column' }}
                        justifyContent='space-between'
                        alignItems='center'
                      >
                        <DateComponent rawDate={review.createdAt} />

                        {/* Voting Buttons at the Bottom */}
                        <Box
                          display='flex'
                          flexDirection='row'
                          alignItems='center'
                        >
                          <ArrowUpwardIcon
                            onClick={() => handleVote(review.id, 1)}
                            sx={{
                              scale: '1.1',
                              transition: 'transform 0.3s ease',
                              '&:hover': {
                                cursor: 'pointer',
                                transform: 'scale(1.3)',
                              },
                              color: 'green',
                            }}
                          />
                          <Typography
                            sx={{
                              width: '2.5em',
                              textAlign: 'center',
                              fontVariantNumeric: 'tabular-nums',
                            }}
                          >
                            {review.voteScore}
                          </Typography>

                          <ArrowDownwardIcon
                            onClick={() => handleVote(review.id, -1)}
                            sx={{
                              scale: '1.1',
                              transition: 'transform 0.3s ease',
                              '&:hover': {
                                cursor: 'pointer',
                                transform: 'scale(1.3)',
                              },
                              color: 'red',
                            }}
                          />
                        </Box>
                      </Box>
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
