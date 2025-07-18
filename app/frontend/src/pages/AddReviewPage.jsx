import { useState } from 'react';
import { Box, Typography, Paper, Container, TextField, Grid, Button, createTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function AddReviewPage() {
    const navigate = useNavigate();
    const [clickIndex, setClickIndex] = useState(null);
    const {majorId} = useParams();
    const [content, setContent] = useState('');
    const [major, setMajor] = useState('[major here]')
    const ratings = [1, 2, 3, 4, 5];

    // todo
    const fetchMajorName = async () => {

    }

const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const payload = {
        majorId: parseInt(majorId), // or keep as string if your backend expects that
        rating: clickIndex + 1,     // assuming rating is based on index
        content: content
    };

    try {
        const response = await fetch('http://localhost:5123/api/review/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }

        navigate('/');
    } catch (error) {
        console.error("Submit error:", error.message);
    }
};


    return (
        <Container disableGutters maxWidth='xl'>
            <Paper
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: '1em',
                    gap: '.5em',
                    margin: '1em',
                }}
            >
                <Typography variant='h4'>{major.name}</Typography>
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
                        p: { xs: '.5em', sm: '1em', md: '2em', },
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
                            <Grid sx={{ border: '1px solid black' }} container spacing={0}>
                                {ratings.map((rating, index) => (
                                    <Grid
                                        key={index}
                                        size='grow'
                                        onClick={() => setClickIndex(clickIndex === index ? null : index)}
                                        sx={{
                                            p: { xs: '.5em', sm: '1em', md: '1.5em' },
                                            backgroundColor:
                                                clickIndex !== null && index <= clickIndex
                                                    ? '#757ce8' // highlighted color
                                                    : '#ffffff', // default color
                                            transition: 'background-color 0.3s ease',
                                            borderRight: index < ratings.length - 1 ? '1px solid black' : 'none', // only between items
                                        }}
                                    >
                                        <Typography textAlign="center">{rating}</Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>


                    {/* Review container */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: '.5em',
                        }}>
                        <Typography variant='h5'>Review</Typography>
                        <TextField
                            multiline
                            rows={7}
                            value={content}
                              onChange={(e) => setContent(e.target.value)} 
                            placeholder="What did you enjoy/dislike about your major?"
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
                    </Box>

                    {/* Submit button */}
                    <Button
                        type='submit'
                        variant='contained'
                    >
                        Submit
                    </Button>
                </Box>
            </Paper>
        </Container >
    )
}