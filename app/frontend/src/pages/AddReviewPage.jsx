import { useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  Box,
  Typography,
  Paper,
  Container,
  TextField,
  Grid,
  Button,
  Pagination,
} from '@mui/material';
import { format, parseISO } from 'date-fns';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import RatingBar from '../components/RatingBar';

export default function AddReviewPage() {
  const navigate = useNavigate();
  const { collegeId } = useParams();
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const columnOneCategories = [
    { id: 'location', label: 'Location' },
    { id: 'classrooms', label: 'Classrooms' },
    { id: 'sports', label: 'Sports' },
    { id: 'food', label: 'Food' },
    { id: 'safety', label: 'Safety' },
  ];

  const columnTwoCategories = [
    { id: 'community', label: 'Community' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'gym', label: 'Gym' },
    { id: 'happiness', label: 'Happiness' },
  ];

  const overallRating = [{ id: 'overall', label: 'Overall' }];

  const [rating, setRatings] = useState({
    rating: 0,
    content: '',
    location: 0,
    gym: 0,
    classrooms: 0,
    sports: 0,
    food: 0,
    happiness: 0,
    safety: 0,
    community: 0,
    opportunities: 0,
    faculty: 0,
  });

  const DateComponent = ({ rawDate }) => {
    const dateObj = parseISO(rawDate);
    const formatted = format(dateObj, 'MMMM d, yyyy');
    return <Typography>{formatted}</Typography>;
  };
  const updateContent = (e) => {
    setRatings((prev) => ({
      ...prev,
      content: e.target.value,
    }));
    if (error && e.target.value.length >= 300) {
      setError('');
    }
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    setPage(page - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');

    const payload = {
      collegeId: parseInt(collegeId, 10), // from useParams
      rating: rating.rating,
      content: rating.content,
      location: rating.location,
      gym: rating.gym,
      classrooms: rating.classrooms,
      sports: rating.sports,
      food: rating.food,
      happiness: rating.happiness,
      safety: rating.safety,
      community: rating.community,
      opportunities: rating.opportunities,
      faculty: rating.faculty,
    };

    if (validateReview()) {
      try {
        const response = await fetch('http://localhost:5123/api/review/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData);
        }

        navigate('/');
      } catch (error) {
        console.error('Submit error:', error.message);
      }
    }
  };

  const validateReview = () => {
    let isValid = true;
    if (rating.content.length < 300) {
      setError('Message is not long enough!');
      isValid = false;
    }
    return isValid;
  };

  return (
    <Container disableGutters maxWidth='md'>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '1em',
          gap: '.5em',
          margin: '1em',
        }}
      >
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: { xs: '.5em', sm: '1em', md: '2em' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2em',
          }}
        >
          {/* Rating container */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: '.5em',
            }}
          >
            {/* Pagination 1 */}
            {page === 1 && (
              <Box
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: '.5em', sm: '1em', md: '1.5em' },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '.5em',
                  }}
                >
                  {columnOneCategories.map((category) => (
                    <Box
                      key={category.id}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography
                        variant='h6'
                        fontFamily='Bebas Neue'
                        fontStyle='italic'
                      >
                        {category.label}
                      </Typography>
                      <RatingBar
                        ratings={[1, 2, 3, 4, 5]}
                        value={ratings[category.id] || null}
                        onChange={(value) =>
                          setRatings((prev) => ({
                            ...prev,
                            [category.id]: value,
                          }))
                        }
                        xSmall='.3em'
                        rSmall='.4em'
                        mMed='.5em'
                      />
                    </Box>
                  ))}
                </Box>
                {/* Second column */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '.5em',
                  }}
                >
                  {columnTwoCategories.map((category) => (
                    <Box
                      key={category.id}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography
                        variant='h6'
                        fontFamily='Bebas Neue'
                        fontStyle='italic'
                      >
                        {category.label}
                      </Typography>
                      <RatingBar
                        ratings={[1, 2, 3, 4, 5]}
                        value={ratings[category.id] || null}
                        onChange={(value) =>
                          setRatings((prev) => ({
                            ...prev,
                            [category.id]: value,
                          }))
                        }
                        xSmall='.3em'
                        rSmall='.4em'
                        mMed='.5em'
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Pagination 2 */}
            {page === 2 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: '.5em',
                }}
              >
                <Typography
                  variant='h5'
                  fontFamily='Bebas Neue'
                  fontStyle='italic'
                >
                  {overallRating[0].label}
                </Typography>
                <RatingBar
                  ratings={[1, 2, 3, 4, 5]}
                  value={ratings[overallRating[0].id] || null}
                  onChange={(value) =>
                    setRatings((prev) => ({
                      ...prev,
                      rating: value,
                    }))
                  }
                  xSmall='.3em'
                  rSmall='.4em'
                  mMed='.5em'
                ></RatingBar>
                <Typography
                  variant='h5'
                  fontFamily='Bebas Neue'
                  fontStyle='italic'
                >
                  Review
                </Typography>
                <TextField
                  multiline
                  rows={7}
                  value={rating.content}
                  onChange={updateContent}
                  error={!!error}
                  helperText={error}
                  placeholder='What did you enjoy/dislike about your college?'
                  slotProps={{
                    formHelperText: {
                      sx: {
                        margin: 0,
                      },
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#ccc',
                      },
                      '&:hover fieldset': {
                        borderColor: '#ccc',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ccc',
                      },
                    },
                  }}
                />
                <Typography
                  sx={{
                    color: 'gray',
                    textAlign: 'right',
                  }}
                >
                  {rating.content.length} / 300 character minimum
                </Typography>
              </Box>
            )}

            {/* Page 3 */}
            {page === 3 && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: '.5em',
                }}
              >
                <Typography
                  variant='h5'
                  fontFamily='Bebas Neue'
                  fontStyle='italic'
                >
                  Preview
                </Typography>
                <Box>
                  {/* Start of Card Formatting */}
                  <Paper
                    sx={{
                      mb: '1.5em',
                      p: '2em',
                      borderRadius: '15px',
                      backgroundColor: '#f7f7f7ed',
                    }}
                    elevation={1}
                  >
                    {/* Top Row */}
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      mb='1.5em'
                      flexWrap='wrap'
                    >
                      {/* Rating Badge */}
                      <Box
                        sx={{
                          backgroundColor: '#84F8C3',
                          // review.rating >= 4
                          //   ? '#84F8C3'
                          //   : review.rating >= 2
                          //   ? '#FFF26A'
                          //   : '#FF9999',
                          px: '1em',
                          py: '.5em',
                          borderRadius: '8px',
                          minWidth: '50px',
                          textAlign: 'center',
                        }}
                      >
                        <Typography fontWeight='bold' fontSize='1.5rem'>
                          {ratings[overallRating[0].id] || 0}
                        </Typography>
                      </Box>
                      {/* Date / Vote Container */}

                      <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                        gap='.5em'
                      >
                        <DateComponent rawDate='2025-08-09' />

                        {/* Voting */}
                        <Box display='flex' alignItems='center'>
                          <ArrowUpwardIcon
                            sx={{
                              transition: 'transform 0.3s ease',
                              '&:hover': {
                                transform: 'scale(1.3)',
                                cursor: 'pointer',
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
                            1
                          </Typography>
                          <ArrowDownwardIcon
                            sx={{
                              transition: 'transform 0.3s ease',
                              '&:hover': {
                                transform: 'scale(1.3)',
                                cursor: 'pointer',
                              },
                              color: 'red',
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>

                    {/* Review Content */}
                    <Typography
                      variant='body1'
                      sx={{
                        lineHeight: 1.6,
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                      }}
                    >
                      {content}
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            )}
          </Box>

          {/* Submit button */}
          <Box>
            {page === 1 && (
              <Button onClick={handleNext} variant='contained'>
                Next
              </Button>
            )}

            {page === 2 && (
              <Box display='flex' gap='1em'>
                <Button variant='contained' onClick={handlePrev}>
                  Back
                </Button>
                <Button variant='contained' onClick={handleNext}>
                  Next
                </Button>
              </Box>
            )}

            {page === 3 && (
              <Box display='flex' gap='1em'>
                <Button variant='contained' onClick={handlePrev}>
                  Back
                </Button>
                <Button variant='contained' type='submit'>
                  Submit
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
