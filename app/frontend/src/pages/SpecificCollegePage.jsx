import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import CollegeEarningsChart from '../components/CollegeEarningsChart';
import DemographicChart from '../components/DemographicChart';
import ExtraRatings from '../components/ExtraRatings';
import { motion, AnimatePresence } from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';

import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Rating,
  styled,
  Pagination,
} from '@mui/material';
import RepaymentGauge from '../components/RepaymentGauge';
import CostChart from '../components/CostChart';

export default function SpecificCollegePage() {
  const { specificCollege } = useParams(); // COLLEGE NAME FROM URL
  const [college, setCollege] = useState(null); // COLLEGE DATA FROM BACKEND
  const [collegeChartData, setCollegeChartData] = useState(null); // COLLEGE DATA FROM COLLEGE SCORECARD API
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [error, setError] = useState('');
  const chartTitles = [
    'Average Salary After Graduating',
    'Cost Breakdown',
    'Demographics',
    'Repayment Rates By Family Income',
  ];
  const [chartPage, setChartPage] = useState(1);
  const charts = [
    <CollegeEarningsChart data={collegeChartData} />,
    <CostChart data={collegeChartData} />,
    <DemographicChart data={collegeChartData} />,
    <RepaymentGauge data={collegeChartData} />,
  ];
  const chartVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#757ce8',
    },
  });

  const [userVotes, setUserVotes] = useState({});

  useEffect(() => {
    if (!college || !college.federalSchoolCode) return;

    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5123/api/CollegeScorecard/${college.federalSchoolCode}`
        );

        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();

        const setChartData = data.results[0];

        setCollegeChartData(setChartData);
      } catch (err) {
        setError(`Failed to fetch specific chart data: ${err.message}`);
      } finally {
        setChartLoading(false);
      }
    };

    fetchChartData();
  }, [college]);

  const handleVote = async (reviewId, value) => {
    try {
      const response = await fetch(`http://localhost:5123/api/votes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ reviewId, value }),
      });

      const result = await response.json();

      setUserVotes((prev) => ({ ...prev, [reviewId]: result.userVote }));
      setCollege((prev) => ({
        ...prev,
        reviews: prev.reviews.map((r) =>
          r.id === reviewId ? { ...r, voteScore: result.newVoteScore } : r
        ),
      }));
    } catch (err) {
      console.error('Vote API error:', err);
    }
  };

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await fetch(
          `http://localhost:5123/api/college/search?keyword=${encodeURIComponent(
            specificCollege.trim()
          )}`
        );

        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched college data:', data);

        setCollege(data);
      } catch (err) {
        setError(`Failed to fetch college: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [specificCollege]);

  if (loading || chartLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress size={70} />
      </motion.div>
    );
  }
  if (error) return <Typography color='error'>{error}</Typography>;
  if (!college) return <Typography>No college found.</Typography>;

  const DateComponent = ({ rawDate }) => {
    const dateObj = parseISO(rawDate);
    const formatted = format(dateObj, 'MMMM d, yyyy');
    return <Typography>{formatted}</Typography>;
  };

  return (
    <Container disableGutters maxWidth='xl'>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '2em',
          gap: '.5em',
          margin: '1em',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Main box container */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                lg: 'row',
              },
              width: '100%',
              gap: { sm: '1em', md: '4em' },
            }}
          >
            {/* College & Description container */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* College/general information block */}
              <Box sx={{ width: '100%' }}>
                <Typography
                  variant='h3'
                  textAlign='center'
                  sx={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontWeight: 600,
                    fontSize: { xs: '3rem', md: '4rem' },
                    mb: '.3em',
                  }}
                >
                  {college.name}
                </Typography>
                <Box>
                  <LinearProgress
                    variant='determinate'
                    value={college.wouldRecommend}
                    sx={{
                      height: '1em',
                      borderRadius: '15px',
                      mb: '1em',
                      p: '1em',
                    }}
                  />
                  <Typography
                    variant='body2'
                    textAlign='center'
                    sx={{
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontWeight: 100,
                      fontSize: '1.3rem',
                    }}
                  >
                    {college.wouldRecommend}% of reviewers rated this college 3
                    or higher.
                  </Typography>

                  {/* College stats container */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      mt: { xs: '1em', md: '3em' },
                      mb: { xs: ' 1em', md: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontWeight: 600,
                          fontSize: {
                            xs: '1rem',
                            sm: '1.4rem',
                            md: '1.3rem',
                          },
                          borderBottom: '3px solid #4357b2',
                        }}
                      >
                        {' '}
                        Average Price Per Year{' '}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontWeight: 600,
                          textAlign: 'center',

                          fontSize: {
                            xs: '1rem',
                            sm: '1.4rem',
                            md: '1.3rem',
                          },
                        }}
                      >
                        $
                        {collegeChartData?.[
                          'latest.cost.attendance.academic_year'
                        ]?.toLocaleString() || 'N/A'}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontWeight: 600,
                          textAlign: 'center',
                          fontSize: {
                            xs: '1rem',
                            sm: '1.4rem',
                            md: '1.3rem',
                          },
                          borderBottom: '3px solid #4357b2',
                        }}
                      >
                        {' '}
                        In-State Tuition Fees{' '}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontWeight: 600,
                          textAlign: 'center',

                          fontSize: {
                            xs: '1rem',
                            sm: '1.4rem',
                            md: '1.3rem',
                          },
                        }}
                      >
                        $
                        {collegeChartData?.[
                          'latest.cost.tuition.in_state'
                        ]?.toLocaleString() || 'N/A'}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontWeight: 600,
                          textAlign: 'center',

                          fontSize: {
                            xs: '1rem',
                            sm: '1.4rem',
                            md: '1.3rem',
                          },
                          borderBottom: '3px solid #4357b2',
                        }}
                      >
                        {' '}
                        Out-Of-State Tutition Fees{' '}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontWeight: 600,
                          textAlign: 'center',

                          fontSize: {
                            xs: '1rem',
                            sm: '1.4rem',
                            md: '1.3rem',
                          },
                        }}
                      >
                        $
                        {collegeChartData?.[
                          'latest.cost.tuition.out_of_state'
                        ]?.toLocaleString() || 'N/A'}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontWeight: 600,
                          fontSize: {
                            xs: '1rem',
                            sm: '1.4rem',
                            md: '1.3rem',
                          },
                          borderBottom: '3px solid #4357b2',
                        }}
                      >
                        {' '}
                        Admission Rate{' '}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontWeight: 600,
                          fontSize: {
                            xs: '1rem',
                            sm: '1.4rem',
                            md: '1.3rem',
                          },
                        }}
                      >
                        {collegeChartData?.[
                          'latest.admissions.admission_rate_suppressed.overall'
                        ]?.toLocaleString('en-US', { style: 'percent' }) ||
                          'N/A'}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontWeight: 600,
                          fontSize: {
                            xs: '1rem',
                            sm: '1.4rem',
                            md: '1.3rem',
                          },
                          borderBottom: '3px solid #4357b2',
                          textAlign: 'center',
                        }}
                      >
                        {' '}
                        Federal Loan Recievement Rate{' '}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontWeight: 600,
                          fontSize: {
                            xs: '1rem',
                            sm: '1.4rem',
                            md: '1.3rem',
                          },
                        }}
                      >
                        {collegeChartData?.[
                          'latest.aid.federal_loan_rate'
                        ]?.toLocaleString('en-US', { style: 'percent' }) ||
                          'N/A'}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontWeight: 600,
                          fontSize: {
                            xs: '1rem',
                            sm: '1.4rem',
                            md: '1.3rem',
                          },
                          borderBottom: '3px solid #4357b2',
                        }}
                      >
                        {' '}
                        Total Undergrad Enrollment{' '}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontWeight: 600,
                          fontSize: {
                            xs: '1rem',
                            sm: '1.4rem',
                            md: '1.3rem',
                          },
                        }}
                      >
                        {collegeChartData?.[
                          'latest.student.size'
                        ]?.toLocaleString() || 'N/A'}
                      </Typography>
                    </Box>{' '}
                  </Box>
                </Box>
              </Box>
              Extra ratings
              <ExtraRatings data={college} />
              {/* Description block */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: '2em',
                }}
              ></Box>
            </Box>

            {/* Chart Container */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2em',
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  borderRadius: '15px',
                  maxWidth: '650px',
                  mx: 'auto',
                  height: '500px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 3,
                  gap: '1.5em',
                }}
              >
                <Typography
                  sx={{
                    textAlign: {
                      xs: 'center',
                      md: 'center',
                    },
                  }}
                  variant='h5'
                >
                  {chartTitles[chartPage - 1]}
                </Typography>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={chartPage}
                    variants={chartVariants}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    transition={{ duration: 0.4 }}
                    style={{
                      height: '300px',
                      width: '500px',
                    }}
                  >
                    {charts[chartPage - 1]}
                  </motion.div>
                </AnimatePresence>

                <Pagination
                  count={charts.length}
                  page={chartPage}
                  onChange={(e, value) => setChartPage(value)}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                />
              </Paper>
              <Button
                component={Link}
                to={`/college/add-review/${college.id}`}
                fullWidth
                // color='secondary'
                variant='contained'
                sx={{
                  borderRadius: '15px',
                  p: '.5em',
                  // width: '50%',
                }}
              >
                Add a review
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Review container */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              p: '1em',
              borderRadius: '15px',
              justifyContent: 'space-evenly',
            }}
          >
            <Box>
              <Typography variant='h5' gutterBottom>
                Reviews
              </Typography>
              {/* Start of Card Formatting */}
              {college.reviews.length === 0 ? (
                <Typography>No reviews yet.</Typography>
              ) : (
                college.reviews.map((review) => (
                  <Paper
                    key={review.id}
                    sx={{
                      mb: '1.5em',
                      p: '2em',
                      borderRadius: '15px',
                      backgroundColor: '#f7f7f7ed',
                    }}
                    elevation={1}
                  >
                    {/* Top Row */}
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      mb='1.5em'
                      flexWrap='wrap'
                    >
                      {/* Rating Badge */}
                      <Box
                        sx={{
                          backgroundColor:
                            review.rating >= 4
                              ? '#84F8C3'
                              : review.rating >= 2
                              ? '#FFF26A'
                              : '#FF9999',
                          px: '1em',
                          py: '.5em',
                          borderRadius: '8px',
                          minWidth: '50px',
                          textAlign: 'center',
                        }}
                      >
                        <Typography fontWeight='bold' fontSize='1.5rem'>
                          {review.rating}
                        </Typography>
                      </Box>

                      {/* Date / Vote Container */}
                      <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                        gap='.5em'
                      >
                        {/* Date */}
                        <DateComponent rawDate={review.createdAt} />
                        {/* Voting */}
                        <Box display='flex' alignItems='center'>
                          <ArrowUpwardIcon
                            onClick={() => handleVote(review.id, 1)}
                            sx={{
                              transition: 'transform 0.3s ease',
                              '&:hover': {
                                transform: 'scale(1.3)',
                                cursor: 'pointer',
                              },
                              color: 'green',
                            }}
                          />
                          <Typography
                            sx={{
                              width: '2.5em',
                              textAlign: 'center',
                              fontVariantNumeric: 'tabular-nums',
                            }}
                          >
                            {review.voteScore}
                          </Typography>
                          <ArrowDownwardIcon
                            onClick={() => handleVote(review.id, -1)}
                            sx={{
                              transition: 'transform 0.3s ease',
                              '&:hover': {
                                transform: 'scale(1.3)',
                                cursor: 'pointer',
                              },
                              color: 'red',
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>

                    {/* Review Content */}
                    <Typography
                      variant='body1'
                      sx={{
                        lineHeight: 1.6,
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                      }}
                    >
                      {review.content}
                    </Typography>
                  </Paper>
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
