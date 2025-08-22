import { Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

export default function RatingBar({
  ratings = [],
  onChange,
  value,
  xSmall,
  rSmall,
  mMed,
}) {
  const [clickIndex, setClickIndex] = useState(null);

  useEffect(() => {
    if (value == null) {
      setClickIndex(null);
    } else {
      const idx = ratings.indexOf(value);
      setClickIndex(idx !== -1 ? idx : null);
    }
  }, [value, ratings]);

  const handleClick = (index) => {
    const newIndex = clickIndex === index ? null : index;
    setClickIndex(newIndex);

    if (onChange) {
      onChange(newIndex !== null ? ratings[newIndex] : null);
    }
  };

 const getColorForIndex = (index, total) => {
  // Define the color stops for the gradient
  const colorStops = [
    [234, 20, 20],   // Red-pink (#ea5858)
    [275, 166, 88],  // Orange (#f5a658)
    [248, 210, 28],  // Yellow (#f8d258)
    [139, 195, 88],  // Light green (#8bc358)
    [22, 168, 103]    // Dark green (#34a853)
  ];
  
  const ratio = index / (total - 1);
  const scaledRatio = ratio * (colorStops.length - 1);
  const lowerIndex = Math.floor(scaledRatio);
  const upperIndex = Math.min(lowerIndex + 1, colorStops.length - 1);
  const localRatio = scaledRatio - lowerIndex;
  
  const lowerColor = colorStops[lowerIndex];
  const upperColor = colorStops[upperIndex];
  
  const r = Math.round(lowerColor[0] + (upperColor[0] - lowerColor[0]) * localRatio);
  const g = Math.round(lowerColor[1] + (upperColor[1] - lowerColor[1]) * localRatio);
  const b = Math.round(lowerColor[2] + (upperColor[2] - lowerColor[2]) * localRatio);
  
  return `rgb(${r}, ${g}, ${b})`;
};

  return (
    <Grid
      sx={{
        border: '1px solid #a9a9a9ed',
        borderRadius: '40px',
        overflow: 'hidden',
        width: '100%',
      }}
      container
      spacing={0}
    >
      {ratings.map((rating, index) => {
        const active = clickIndex !== null && index <= clickIndex;
        const color = active ? getColorForIndex(index, ratings.length) : '#ffffff';

        return (
          <Grid
            key={index}
            size='grow'
            onClick={() => handleClick(index)}
            sx={{
              p: { xs: `${xSmall}`, sm: `${rSmall}`, md: `${mMed}` },
              backgroundColor: color,
              transition: 'background-color 0.5s ease',
              width: '100%',
              borderRight:
                index < ratings.length - 1 ? '1px solid #a9a9a9ed' : 'none',
              cursor: 'pointer',
            }}
          >
            <Typography textAlign='center'>{rating}</Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}
