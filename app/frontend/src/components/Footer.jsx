import { AppBar, Typography, Box, Link } from '@mui/material';

export default function Footer() {
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
        {/* 1st Box - RateMyMajor, Privacy Policy, TOS, Copyright */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
          <Typography variant='h2' fontWeight='500' align='center'>
            RateMyMajor
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
              href='/'
              sx={{ color: 'white' }}
            >
              Privacy Policy
            </Link>
            <Link
              underline='none'
              variant='subtitle1'
              align='center'
              href='/'
              sx={{ color: 'white' }}
            >
              Terms of Service
            </Link>
          </Box>
          <Typography variant='subtitle1' align='center'>
            © Copyright 2025 RateMyMajor
          </Typography>
        </Box>

        {/* Second box - Links, Contact Us */}
        {/* 
            Note:
            - There is a lot of repeated code for the links, but I don't think I need to make a component since we aren't using them anywhere else
        */}
        <Box
          sx={{ display: 'flex', flexDirection: 'row', gap: '1em', }}
        >
          <Link
            href='/'
            variant='subtitle1'
            underline='none'
            sx={{
              fontSize: { xs: '1rem', sm: '1rem', md: '1.3rem' },
              color: 'white',
              flexGrow: 1,
            }}
          >
            Majors
          </Link>
          <Link
            href='/'
            variant='subtitle1'
            underline='none'
            sx={{
              fontSize: { xs: '1rem', sm: '1rem', md: '1.3rem' },
              color: 'white',
              flexGrow: 1,
            }}
          >
            Reviews
          </Link>{' '}
          <Link
            href='/'
            variant='subtitle1'
            underline='none'
            sx={{
              fontSize: { xs: '1rem', sm: '1rem', md: '1.3rem' },
              color: 'white',
              flexGrow: 1,
            }}
          >
            Account
          </Link>{' '}
          <Link
            href='/'
            variant='subtitle1'
            underline='none'
            sx={{
              fontSize: { xs: '1rem', sm: '1rem', md: '1.3rem' },
              color: 'white',
              flexGrow: 1,
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
//     RateMyMajor
//   </Typography>
//   <Typography variant='body2' align='center'>
//     © Copyright 2025 RateMyMajor
//   </Typography>
