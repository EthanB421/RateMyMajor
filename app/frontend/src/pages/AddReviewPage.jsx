import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  TextField,
  Grid,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import RatingBar from '../components/RatingBar';

export default function AddReviewPage() {
  const navigate = useNavigate();
  const { collegeId } = useParams();
  const [content, setContent] = useState('');
  const [college, setCollege] = useState('[college here]');
  const [error, setError] = useState('');

  const categories = [
    { id: 'overall', label: 'Overall' },
    { id: 'location', label: 'Location' },
    { id: 'classrooms', label: 'Classrooms' },
    { id: 'sports', label: 'Sports' },
    { id: 'food', label: 'Food' },
    { id: 'safety', label: 'Safety' },
    { id: 'community', label: 'Community' },
    { id: 'opportunities', label: 'Opportunities' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'gym', label: 'Gym' },
    { id: 'happiness', label: 'Happiness' },
  ];
  const [ratings, setRatings] = useState({});

  const updateContent = (e) => {
    setContent(e.target.value);
    if (error && e.target.value.length >= 30) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    const payload = {
      collegeId: parseInt(collegeId), // or keep as string if your backend expects that
      rating: ratings, // assuming rating is based on index
      content: content,
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
    if (content.length < 300) {
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
        <Typography variant='h4'>{college.name}</Typography>
        {/* 
                    Form Structure and Styling:
                        - 3 separate box parts aligned in a column
                            - Rating container
                            - Review container
                            - Submit button 
                */}
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
            <Typography variant='h5'>Rating</Typography>
            <Box>
              {categories.map((category) => (
                <Box
                  key={category.id}
                  sx={{ display: 'flex', flexDirection: 'column', gap: '.5em' }}
                >
                  <Typography variant='h5'>{category.label}</Typography>
                  <RatingBar
                    ratings={[1, 2, 3, 4, 5]}
                    onChange={(value) =>
                      setRatings((prev) => ({ ...prev, [category.id]: value }))
                    }
                    xSmall='.5em'
                    rSmall='1em'
                    mMed='.5em'
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Review container */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: '.5em',
            }}
          >
            <Typography variant='h5'>Review</Typography>
            <TextField
              multiline
              rows={7}
              value={content}
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
              {content.length} / 300 character minimum
            </Typography>
          </Box>

          {/* Submit button */}
          <Button type='submit' variant='contained'>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
