import { useNavigate } from 'react-router-dom';

import {
  Typography,
  Container,
  Box,
  Divider,
  List,
  ListItem,
  Link,
} from '@mui/material';

export default function TermsOfServicePage() {
  const navigate = useNavigate();
  return (
    <Container maxWidth='md' disableGutter sx={{ p: '2em' }}>
      <Typography
        textAlign='center'
        sx={{
          fontFamily: 'Bebas Neue',
          fontStyle: 'italic',
          fontSize: { xs: '2.5rem', sm: '3rem', md: '3rem' },
          mb: '.5em',
        }}
      >
        Terms of Service
      </Typography>
      <Divider />

      {/* Introduction */}
      <Box display='flex' flexDirection='column' padding='2em' gap='2em'>
        <Box display='flex' flexDirection='column' gap='.5em'>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: '600',
            }}
          >
            Introduction
          </Typography>
          <Typography>
            RateMyCollege is a platform for writing reviews on colleges and
            presenting information regarding said colleges. By using our
            platform, you agree to be bound by these Terms of Service.
          </Typography>
        </Box>

        {/* Eligibility */}
        <Box display='flex' flexDirection='column' gap='.5em'>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: '600',
            }}
          >
            Eligibility
          </Typography>
          <Typography>
            Users must be 13 or older in order to use this service.
          </Typography>
        </Box>

        {/* User Account Safety  */}
        <Box display='flex' flexDirection='column' gap='.5em'>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: '600',
            }}
          >
            User Account Safety
          </Typography>
          <Typography>
            When creating an account with RateMyCollege, we will uphold our end
            to provide the necessary account security, as per our{' '}
            <Link
              onClick={() => navigate('/privacy-policy')}
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              Privacy Policy
            </Link>
            . However, users are responsible for the confidentiality of their
            login.
          </Typography>
        </Box>

        {/* User Generated Content */}
        <Box display='flex' flexDirection='column' gap='.5em'>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: '600',
            }}
          >
            User generated content
          </Typography>
          <Typography>
            When posting any content on RateMyCollege, it will be reviewed
            before going live on the website. Content must be Safe For Work
            (SFW) and any content that is deemed innapropriate will be removed.
            Users retain ownership of their content but grant RateMyMajor a
            license to display, reproduce, and distribute it.
          </Typography>
        </Box>

        {/* Forbidden Activities */}
        <Box display='flex' flexDirection='column' gap='.5em'>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: '600',
            }}
          >
            Forbidden activities
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.1rem', md: '1.5rem' },
              fontWeight: '500',
              mt: '.5em',
            }}
          >
            Bannable offenses:
          </Typography>
          <List>
            <ListItem>Posting of false or misleading content</ListItem>
            <ListItem>No harassment, hate speech, or impersonations</ListItem>
            <ListItem>Data scraping, mining, or reverse engineering</ListItem>
          </List>
          <Typography>
            We reserve the right to remove content / delete accounts that
            violate these Terms of Service without any notice. Any other
            offenses unmentioned that may harm others or be misleading will be
            dealt with accordingly.
          </Typography>
        </Box>

        {/* Intellectual Property */}
        <Box display='flex' flexDirection='column' gap='.5em'>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: '600',
            }}
          >
            Intellectual property
          </Typography>
          <Typography>
            All content and intellectual property are owned by or licensed to
            RateMyCollege. You may not copy, reproduce, or distrubute without
            permission. In the event you believe RateMyCollege has infringed on
            any of your Intellectual Property, please reach out to us at{' '}
            <Link>support@ratemycollege.com</Link> and we will respond as
            needed.
          </Typography>
        </Box>

        {/* Third Party Links / Services */}
        <Box display='flex' flexDirection='column' gap='.5em'>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: '600',
            }}
          >
            Third-party services
          </Typography>
          <Typography>
            RateMyCollege uses information from the Federal Department of
            Education. This information can be freely found on their respective
            website. While RateMyCollege has no third-party advertisements as of
            now, we reserve the right to implement them in the future.
          </Typography>
        </Box>

        {/* Disclaimers */}
        <Box display='flex' flexDirection='column' gap='.5em'>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: '600',
            }}
          >
            Disclaimers and limitation of liability
          </Typography>
          <Typography>
            All information is provided "as-is". We do not guarantee the
            accuracy or completeness of any content. Opinions expressed in
            reviews are those of individual users. RateMyCollege is not liable
            for any damages resulting from your use of the platform.
          </Typography>
        </Box>

        {/* Future Policy Changes */}
        <Box display='flex' flexDirection='column' gap='.5em'>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: '600',
            }}
          >
            Future changes and Privacy Policy
          </Typography>
          <Typography>
            Our Terms may be updated from time to time. Continued use of the
            platform indicates acceptance of the new terms. To see our privacy
            policy,{' '}
            <Link
              onClick={() => navigate('/privacy-policy')}
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              click here.
            </Link>
          </Typography>
        </Box>

        {/* Contact Us */}
        <Box display='flex' flexDirection='column' gap='.5em'>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: '600',
            }}
          >
            Contact information
          </Typography>
          <Typography>
            In the event you have more questions or concerns regarding our Terms
            of Service, please reach out to us at{' '}
            <Link>support@ratemycollege.com</Link>.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
