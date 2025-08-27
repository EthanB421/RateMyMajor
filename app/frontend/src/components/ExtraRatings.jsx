import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
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

const ExtraRatings = ({ data }) => {
  // Safely get rating value or return null if undefined
  const getRatingValue = (rating) => {
    return rating != null ? Number(rating) : null;
  };

  const getRatingColor = (rating) => {
    if (rating == null) return '#e0e0e0'; // Gray for undefined ratings

    // Convert rating to a scale for color calculation
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
      value: getRatingValue(data?.facultyRating), // Note: you might want to change this to a facilities rating if you have one
    },
    {
      icon: <LocationOn />,
      label: 'Location',
      value: getRatingValue(data?.locationRating),
    },
    {
      icon: <FitnessCenter />,
      label: 'Gym',
      value: getRatingValue(data?.gymRating),
    },
    {
      icon: <School />,
      label: 'Classrooms',
      value: getRatingValue(data?.classroomsRating),
    },
    {
      icon: <SentimentSatisfied />,
      label: 'Happiness',
      value: getRatingValue(data?.happinessRating),
    },
    {
      icon: <Restaurant />,
      label: 'Food',
      value: getRatingValue(data?.foodRating),
    },
    {
      icon: <Stairs />,
      label: 'Opportunities',
      value: getRatingValue(data?.opportunitiesRating),
    },
    {
      icon: <SportsFootball />,
      label: 'Sports',
      value: getRatingValue(data?.sportsRating),
    },
    {
      icon: <Security />,
      label: 'Safety',
      value: getRatingValue(data?.safetyRating),
    },
    {
      icon: <Groups />,
      label: 'Community',
      value: getRatingValue(data?.communityRating),
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
    <Box sx={{ p: '1em', maxWidth: 600 }}>
      <Typography
        textAlign='center'
        fontStyle='italic'
        fontFamily='Bebas Neue'
        variant='h4'
        mb='.5em'
      >
        General Ratings
      </Typography>

      <Grid container spacing={1}>
        {availableRatings.map((rating, index) => (
          <Grid size={6} key={index}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1em',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 24,
                  height: 24,
                  color: '#333',
                }}
              >
                {rating.icon}
              </Box>

              <Typography
                variant='h5'
                fontFamily='Bebas Neue'
                sx={{
                  flex: 1,
                  color: '#333',
                }}
              >
                {rating.label}
              </Typography>

              <Box
                sx={{
                  backgroundColor: getRatingColor(rating.value),
                  color: rating.value != null ? '#333' : '#666',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  minWidth: 50,
                  textAlign: 'center',
                }}
              >
                {rating.value != null ? rating.value.toFixed(1) : 'N/A'}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExtraRatings;
