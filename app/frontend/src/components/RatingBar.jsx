import { Grid, Typography } from '@mui/material';
import { useState } from 'react';

export default function RatingBar({
  ratings = [],
  onChange,
  xSmall,
  rSmall,
  mMed,
}) {
  const [clickIndex, setClickIndex] = useState(null);

  const handleClick = (index) => {
    const newIndex = clickIndex === index ? null : index;
    setClickIndex(newIndex);

    if (onChange) {
      onChange(newIndex !== null ? ratings[newIndex] : null);
    }
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
      {ratings.map((rating, index) => (
        <Grid
          key={index}
          size='grow'
          onClick={() => handleClick(index)}
          sx={{
            p: { xs: `${xSmall}`, sm: `${rSmall}`, md: `${mMed}` },
            backgroundColor:
              clickIndex !== null && index <= clickIndex
                ? '#757ce8' // highlighted color
                : '#ffffff', // default color
            transition: 'background-color 0.3s ease',
            borderRight:
              index < ratings.length - 1 ? '1px solid #a9a9a9ed' : 'none', // only between items
          }}
        >
          <Typography textAlign='center'>{rating}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}
