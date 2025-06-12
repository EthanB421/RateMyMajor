import { Box, TextField, Container, InputAdornment } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

/*
    TODO:
        - Find a nice background image for the website and figure out the height after
        - Implement functionality for:
            1) Moving to different pages
            2) A dropdown for existing majors
        - Fix responsiveness when screen size is between md-lg
    
    Notes:
        - Probably shouldn't allow randoms to add their own major, if we do get users like that and they want to add their own majors, we can have a page that will allow them to submit a request
*/

export default function Searchbar() {
    return (
        <Box
            sx={{
                backgroundImage: `url(https://plus.unsplash.com/premium_vector-1748210658699-d2d8f43da6b3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                backgroundSize: 'cover',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <TextField
                // slotprops.input.sx is necessary here to directly edit the input (TextField in this case)
                slotProps={{
                    input: {
                        sx: {
                            borderRadius: '20px',
                            bgcolor: 'white',
                            // No focus outline
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            // No hover outline
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            // No default outline
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                        },
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }
                }}
                sx={{
                    padding: '3em',
                    width: { xs: '100%', sm: '70%', md: '50%', },

                }}
            >

            </TextField>
        </Box >
    )
}