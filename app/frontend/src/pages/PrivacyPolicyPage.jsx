import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Container,
  Box,
  Paper,
  Divider,
  List,
  ListItem,
  Link,
} from '@mui/material';

export default function PrivacyPolicyPage() {
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
        Privacy Policy
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
            presenting information regarding said colleges. This privacy policy
            describes how we collect, use, and protect your personal information
            when you use our website and its services.
          </Typography>
        </Box>

        {/* Information we collect */}
        <Box display='flex' flexDirection='column' gap='.5em'>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: '600',
            }}
          >
            Information we collect
          </Typography>
          <Typography>
            RateMyCollege collects information from website visitors.
            Registering an account will provide us with personal information,
            although optional. Navigation throughout our website can still be
            done anonymously.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.1rem', md: '1.5rem' },
              fontWeight: '500',
              mt: '.5em',
            }}
          >
            Personal Information:
          </Typography>
          <List>
            <ListItem>Full name</ListItem>
            <ListItem>Email address</ListItem>
            <ListItem>IP address</ListItem>
          </List>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.1rem', md: '1.5rem' },
              fontWeight: '500',
            }}
          >
            Non-Personal Information:
          </Typography>
          <List>
            <ListItem>Device and browser type</ListItem>
            <ListItem>Visited pages</ListItem>
            <ListItem>Time spent on site</ListItem>
          </List>
        </Box>

        {/* Use of personal information  */}
        <Box display='flex' flexDirection='column' gap='.5em'>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: '600',
            }}
          >
            Use of personal information
          </Typography>
          <Typography>
            Your information will be used to create and manage accounts,
            personalize content, and enforce terms. We may send users emails if
            they were provided in regards to newsletters and any account-related
            notifications. Furthermore, we will analyze any information in order
            to improve our services, from user experience to overall website
            functionality.
          </Typography>
        </Box>

        {/* Cookies and third party sharing */}
        <Box display='flex' flexDirection='column' gap='.5em'>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: '600',
            }}
          >
            Cookies and third party sharing
          </Typography>
          <Typography>
            Cookies and similar technologies are used to improve user experience
            and analyze site traffic. If you do not wish to opt in, you can
            disable cookies through your browser settings. Additionally, we will
            never sell or trade your data to any third party services except for
            those required by law from service providers.
          </Typography>
        </Box>

        {/* Data Privacy */}
        <Box display='flex' flexDirection='column' gap='.5em'>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: '600',
            }}
          >
            Protection of your data
          </Typography>
          <Typography>
            We make sure to take the steps necessary to protect your information
            as best as possible. Even so, transmission over the Internet is
            never fully secure. As a result, we cannot guarantee 100% security
            in all cases.
          </Typography>
        </Box>

        {/* User Rights */}
        <Box display='flex' flexDirection='column' gap='.5em'>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: '600',
            }}
          >
            User rights
          </Typography>
          <Typography>
            We comply with all user rights laws and those under the GDPR AND
            CCPA laws. If these laws apply to you, you have the right to
            access/correct data, request the deletion of data, and opt out of
            tracking/communications.
          </Typography>
        </Box>

        {/* Children's Privacy */}
        <Box display='flex' flexDirection='column' gap='.5em'>
          <Typography
            sx={{
              fontSize: { xs: '2rem', sm: '1.5rem', md: '2rem' },
              fontWeight: '600',
            }}
          >
            Children's privacy
          </Typography>
          <Typography>
            This website is not meant for use by children under the age of 13.
            We do not knowingly collect personal information from children. If
            you believe your child has given us any information, please contact
            us at <Link>support@ratemycollege.com</Link> and we will take the
            necessary action.
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
            Future changes and Terms of Service
          </Typography>
          <Typography>
            Our privacy policy may be updated from time to time. Therefore, we
            recommend users to check this page again periodically for any
            changes. To see our Terms of Service,{' '}
            <Link
              onClick={() => navigate('/terms-of-service')}
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
            In the event you have more questions or concerns regarding our
            privacy policy, please reach out to us at{' '}
            <Link>support@ratemycollege.com</Link>.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
