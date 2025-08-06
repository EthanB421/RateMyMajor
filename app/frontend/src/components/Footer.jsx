import { AppBar, Typography, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <AppBar position='static'>
      {/* Footer Container */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' },
          p: { xs: '2em', sm: '2.5em', md: '3em' },
          gap: { xs: '2em', sm: '2em', md: '4em', lg: '6em' },
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        {/* 1st Box - RateMyCollege, Privacy Policy, TOS, Copyright */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
          <Typography
            align='center'
            sx={{
              fontSize: { xs: '2rem', sm: '2rem', md: '3rem' },
              color: 'white',
              flexGrow: 1,
              fontFamily: 'Bebas Neue, sans-serif',
              fontWeight: 200,

              fontStyle: 'italic',
            }}
          >
            RateMyCollege
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
                lg: 'row',
              },
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: '1em', sm: '1em', md: '3em', lg: '3em' },
            }}
          >
            <Link
              underline='none'
              variant='subtitle1'
              align='center'
              onClick={() => navigate('/privacy-policy')}
              sx={{
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              underline='none'
              variant='subtitle1'
              align='center'
              onClick={() => navigate('/')}
              sx={{
                color: 'white',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              Terms of Service
            </Link>
          </Box>
          <Typography variant='subtitle1' align='center'>
            © Copyright 2025 RateMyCollege
          </Typography>
        </Box>

        {/* Second box - Links, Contact Us */}
        {/* 
            Note:
            - There is a lot of repeated code for the links, but I don't think I need to make a component since we aren't using them anywhere else
        */}
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1em' }}>
          <Link
            onClick={() => navigate('/college')}
            variant='subtitle1'
            underline='none'
            sx={{
              fontSize: { xs: '1rem', sm: '1rem', md: '1.3rem' },
              color: 'white',
              flexGrow: 1,
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            Colleges
          </Link>
          <Link
            onClick={() => navigate('/')}
            variant='subtitle1'
            underline='none'
            sx={{
              fontSize: { xs: '1rem', sm: '1rem', md: '1.3rem' },
              color: 'white',
              flexGrow: 1,
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            Reviews
          </Link>{' '}
          <Typography
            onClick={() => navigate('/')}
            variant='subtitle1'
            underline='none'
            sx={{
              fontSize: { xs: '1rem', sm: '1rem', md: '1.3rem' },
              color: 'white',
              flexGrow: 1,
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            Account
          </Typography>{' '}
          <Link
            onClick={() => navigate('/')}
            variant='subtitle1'
            underline='none'
            sx={{
              fontSize: { xs: '1rem', sm: '1rem', md: '1.3rem' },
              color: 'white',
              flexGrow: 1,
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            Contact Us
          </Link>
        </Box>
      </Box>
    </AppBar>
  );
}

//   <Typography variant='subtitle2' align='center'>
//     RateMyCollege
//   </Typography>
//   <Typography variant='body2' align='center'>
//     © Copyright 2025 RateMyCollege
//   </Typography>
