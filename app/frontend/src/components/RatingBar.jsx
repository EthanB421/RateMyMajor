import { Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

export default function RatingBar({
  ratings = [],
  value,
  onChange,
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
      setClickIndex(idx >= 0 ? idx : null);
    }
  }, [value, ratings]);

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
      {ratings.map((rating, index) => {

        return (
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
