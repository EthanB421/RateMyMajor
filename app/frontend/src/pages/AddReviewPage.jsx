import { Box, Typography, Paper, Container, TextField, Grid, Button } from "@mui/material";

export default function AddReviewPage() {
    return (
        <Container disableGutters maxWidth='xl'>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: '1em',
                    gap: '.5em',
                }}
            >
                <Typography variant='h4'>Add Review for [major here]</Typography>
                {/* 
                    Form Structure and Styling:
                        - 3 separate box parts aligned in a column
                            - Rating container
                            - Review container
                            - Submit button 
                */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid black',
                        p: { xs: '.5em', sm: '1em', md: '2em', },
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1em',
                    }}
                >
                    {/* Rating container */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: '.5em'
                        }}
                    >
                        <Typography variant='h5'>Rating</Typography>
                        {/* Ratings 1-5, todo: add hover effect */}
                        <Box>
                            <Grid container spacing={0}>
                                <Grid size='grow' sx={{ border: '1px solid black', p: { xs: '.5em', sm: '1em', md: '1.5em' } }} >
                                    <Typography textAlign={'center'}>1</Typography>
                                </Grid>
                                <Grid size='grow' sx={{ border: '1px solid black', p: { xs: '.5em', sm: '1em', md: '1.5em' } }} >
                                    <Typography textAlign={'center'}>2</Typography>
                                </Grid>
                                <Grid size='grow' sx={{ border: '1px solid black', p: { xs: '.5em', sm: '1em', md: '1.5em' } }} >
                                    <Typography textAlign={'center'}>3</Typography>
                                </Grid>
                                <Grid size='grow' sx={{ border: '1px solid black', p: { xs: '.5em', sm: '1em', md: '1.5em' } }} >
                                    <Typography textAlign={'center'}>4</Typography>
                                </Grid>
                                <Grid size='grow' sx={{ border: '1px solid black', p: { xs: '.5em', sm: '1em', md: '1.5em' } }} >
                                    <Typography textAlign={'center'}>5</Typography>
                                </Grid>
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
                            placeholder="What did you enjoy/dislike about your major?"
                        />
                    </Box>

                    {/* Submit button */}
                    <Button
                        variant='contained'
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Container >
    )
}