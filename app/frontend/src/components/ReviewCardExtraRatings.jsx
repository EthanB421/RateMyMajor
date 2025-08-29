import React from 'react';
import { Box, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';
import {
  LocationOn,
  Restaurant,
  SentimentSatisfied,
  Security,
  School,
  FitnessCenter,
  EmojiEvents,
  EmojiPeople,
  Groups,
  SportsFootball,
  Stairs,
} from '@mui/icons-material';
import LinearProgress from '@mui/material/LinearProgress';


const ReviewCardExtraRatings = ({ data }) => {
  // Safely get rating value or return null if undefined
  const getRatingValue = (rating) => {
    return rating != null ? Number(rating) : null;
  };
  const isSmallScreen = useMediaQuery('(max-width:1200px) and (max-height:1128px)');


  const getRatingColor = (rating) => {
    if (rating == null) return '#e0e0e0'; 

    const normalizedRating = Math.max(0, Math.min(5, rating)) / 5;

    // Color stops similar to the image - mint green for high ratings
    const colorStops = [
      [234, 88, 88], // Red-pink for low ratings
      [245, 166, 88], // Orange
      [248, 210, 88], // Yellow
      [139, 195, 88], // Light green
      [82, 196, 136], // Mint green for high ratings
    ];

    const scaledRatio = normalizedRating * (colorStops.length - 1);
    const lowerIndex = Math.floor(scaledRatio);
    const upperIndex = Math.min(lowerIndex + 1, colorStops.length - 1);
    const localRatio = scaledRatio - lowerIndex;

    const lowerColor = colorStops[lowerIndex];
    const upperColor = colorStops[upperIndex];

    const r = Math.round(
      lowerColor[0] + (upperColor[0] - lowerColor[0]) * localRatio
    );
    const g = Math.round(
      lowerColor[1] + (upperColor[1] - lowerColor[1]) * localRatio
    );
    const b = Math.round(
      lowerColor[2] + (upperColor[2] - lowerColor[2]) * localRatio
    );

    return `rgb(${r}, ${g}, ${b})`;
  };

  const ratings = [
    {
      icon: <EmojiPeople />,
      label: 'Faculty',
      value: getRatingValue(data?.faculty), // Note: you might want to change this to a facilities rating if you have one
    },
    {
      icon: <LocationOn />,
      label: 'Location',
      value: getRatingValue(data?.location),
    },
    {
      icon: <FitnessCenter />,
      label: 'Gym',
      value: getRatingValue(data?.gym),
    },
    {
      icon: <School />,
      label: 'Classrooms',
      value: getRatingValue(data?.classrooms),
    },
    {
      icon: <SentimentSatisfied />,
      label: 'Happiness',
      value: getRatingValue(data?.happiness),
    },
    {
      icon: <Restaurant />,
      label: 'Food',
      value: getRatingValue(data?.food),
    },
    {
      icon: <Stairs />,
      label: 'Opportunities',
      value: getRatingValue(data?.opportunities),
    },
    {
      icon: <SportsFootball />,
      label: 'Sports',
      value: getRatingValue(data?.sports),
    },
    {
      icon: <Security />,
      label: 'Safety',
      value: getRatingValue(data?.safety),
    },
    {
      icon: <Groups />,
      label: 'Community',
      value: getRatingValue(data?.community),
    },
  ];

  // Filter out ratings that don't exist
  const availableRatings = ratings.filter((rating) => rating.value !== null);

  if (availableRatings.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color='text.secondary'>No ratings available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: '1em' }}>
      <Typography
        textAlign='center'
        fontStyle='italic'
        fontFamily='Bebas Neue'
        variant='h4'
        mb='.5em'
        fontSize={{ xs: '1.5rem', md: '2rem' }}
      >
        Personal Ratings
      </Typography>

      <Grid container spacing={1}>
        {availableRatings.map((rating, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'space-between', md: 'space-between' },
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                  flex: 1,
                  color: '#333',
                  gap: '1em',
                }}
              >
                {rating.icon}
                <Typography
                  variant='h5'
                  fontFamily='Bebas Neue'
                  sx={{
                    flex: 1,
                    color: '#333',
                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.7rem' },
                  }}
                >
                  {rating.label}
                </Typography>
              </Box>
              {isSmallScreen ? (
                 <Box
                sx={{
                  backgroundColor: getRatingColor(rating.value),
                  color: rating.value != null ? '#333' : '#666',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  px: { xs: '1', md: '2' },
                  py: { xs: '0', md: '0.5' },
                  borderRadius: 1,
                  minWidth: 50,
                  textAlign: 'center',
                }}
              >
                {rating.value != null ? rating.value.toFixed(1) : 'N/A'}
              </Box> 
              ) : (
                                  <Box display="flex" alignItems="center" gap={2} sx={{ minWidth: 300}}>
                <LinearProgress
                  variant="determinate"
                  value={rating.value ? (rating.value / 5) * 100 : 0}
                  sx={{
                    flexGrow: 1, // makes bar take remaining width
                    height: 12,
                    borderRadius: 1,
                    backgroundColor: "#f7f7f7ed",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 1,
                      backgroundColor: getRatingColor(rating.value),
                    },
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{ minWidth: 40, textAlign: "right", fontWeight: "bold" }}
                >
                  {rating.value?.toFixed(1) ?? "0.0"}
                </Typography>
              </Box>

              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReviewCardExtraRatings;
