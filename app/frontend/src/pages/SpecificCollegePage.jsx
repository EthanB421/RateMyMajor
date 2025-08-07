import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownTwoToneIcon from '@mui/icons-material/ThumbDownTwoTone';
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import CollegeEarningsChart from '../components/CollegeEarningsChart';
import DemographicChart from '../components/DemographicChart';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Pagination,
} from '@mui/material';
import RepaymentGauge from '../components/RepaymentGauge';
import CostChart from '../components/CostChart';

export default function SpecificCollegePage() {
  const { specificCollege } = useParams(); //COLLEGE NAME FROM URL
  const [college, setCollege] = useState(null); //COLLEGE DATA FROM BACKEND
  const [collegeChartData, setcollegeChartData] = useState(null); //COLLEGE DATA FROM COLLEGE SCORECARD API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const itemsPerPage = 3;
  const chartTitles = [
    'Earnings Over Time',
    'Cost Breakdown',
    'Demographics',
    'Repayment Rates',
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

  const [currentPage, setCurrentPage] = useState(1);
  const [userVotes, setUserVotes] = useState({});

  useEffect(() => {
    if (!college || !college.federalSchoolCode) return;

    axios
      .get(
        `http://localhost:5123/api/CollegeScorecard/${college.federalSchoolCode}`
      )
      .then((res) => setcollegeChartData(res.data.results[0]))
      .catch((err) => console.error('CollegeScorecard API error:', err));
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

      // ✅ Trust the backend – use result directly
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
        console.log('Fetched college data:', data); // <-- add this line

        setCollege(data);
      } catch (err) {
        setError(`Failed to fetch college: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [specificCollege]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color='error'>{error}</Typography>;
  if (!college) return <Typography>No college found.</Typography>;

  const DateComponent = ({ rawDate }) => {
    const dateObj = parseISO(rawDate);
    const formatted = format(dateObj, 'MMMM d, yyyy');
    return <Typography>{formatted}</Typography>;
  };
  const recommendationText =
    college.rating < 3 ? 'Would Not Recommend' : 'Would Recommend';

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
            gap: '1em',
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
                md: 'row',
              },
              gap: { sm: '1em', md: '4em' },
            }}
          >
            {/* College & Description container */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '1em',
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
                    fontSize: '4.25rem',
                  }}
                >
                  {college.name}
                </Typography>
                <Box sx={{ my: 2 }}>
                  <Typography variant='h5' textAlign='center' gutterBottom>
                    {college.rating.toFixed(1)}/5 - {recommendationText}
                  </Typography>
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
                      flexDirection: { xs: 'column', md: 'row' },
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      mt: '1em',
                      mb: '2em',
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
                          fontSize: '1.3rem',
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
                          fontSize: '1.5rem',
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
                          fontSize: '1.3rem',
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
                          fontSize: '1.5rem',
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
                          fontSize: '1.3rem',
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
                          fontSize: '1.5rem',
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
                          fontSize: '1.3rem',
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
                          fontSize: '1.5rem',
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
                          fontSize: '1.3rem',
                          borderBottom: '3px solid #4357b2',
                        }}
                      >
                        {' '}
                        Federal Loan Recievement Rate{' '}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontWeight: 600,
                          fontSize: '1.5rem',
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
                          fontSize: '1.3rem',
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
                          fontSize: '1.5rem',
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
              {/* Description block */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: '2em',
                }}
              >
                {/* <Typography variant='body1'>{college.description}</Typography> */}
              </Box>
            </Box>

            {/* Chart Container */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ebebeb',
                width: '100%',
                maxWidth: '650px',
                mx: 'auto',
                height: '500px', // consistent space for all charts
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2em',
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
                  key={chartPage} // ensure each chart transition is triggered
                  variants={chartVariants}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  transition={{ duration: 0.4 }}
                  style={{
                    height: '300px', // ✅ fixed height (adjust as needed)
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
                  mt: 2,
                }}
              />
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
                      mb: 2,
                      p: 2,
                      borderRadius: '15px',
                      backgroundColor: '#ebebeb',
                    }}
                    elevation={1}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        padding: '1em',
                        borderRadius: '12px',
                        width: '100%',
                        overflow: 'hidden',
                        wordBreak: 'break-word',
                        gap: { xs: '1em', sm: '3em' },
                      }}
                    >
                      {/* Rating Box on the Left */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: { xs: 'row', sm: 'column' },
                          justifyContent: 'start',
                          alignItems: 'center',
                          gap: ' 1em',
                        }}
                      >
                        <Box>
                          <Typography
                            variant='h7'
                            sx={{
                              fontWeight: 'bold',
                            }}
                          >
                            Rating
                          </Typography>
                          <Box
                            sx={{
                              backgroundColor:
                                review.rating >= 4
                                  ? '#84F8C3'
                                  : review.rating >= 2
                                  ? '#FFF26A'
                                  : '#FF9999',
                              padding: '0.5em 1em',
                              borderRadius: '8px',
                              textAlign: 'center',
                            }}
                          >
                            <Typography
                              variant='h6'
                              sx={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: '2.2rem',
                              }}
                            >
                              {review.rating}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Review Content */}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-evenly',
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant='body2'
                          sx={{
                            mb: 2,
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                            fontSize: '1rem',
                          }}
                        >
                          {review.content}
                        </Typography>
                      </Box>

                      {/* Date component + voting component */}
                      <Box
                        display='flex'
                        flexDirection={{ xs: 'row', sm: 'column' }}
                        justifyContent='space-evenly'
                        alignItems='center'
                      >
                        <DateComponent rawDate={review.createdAt} />

                        {/* Voting Buttons at the Bottom */}
                        <Box
                          display='flex'
                          flexDirection='row'
                          alignItems='center'
                        >
                          <ArrowUpwardIcon
                            onClick={() => handleVote(review.id, 1)}
                            sx={{
                              scale: '1.1',
                              transition: 'transform 0.3s ease',
                              '&:hover': {
                                cursor: 'pointer',
                                transform: 'scale(1.3)',
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
                              scale: '1.1',
                              transition: 'transform 0.3s ease',
                              '&:hover': {
                                cursor: 'pointer',
                                transform: 'scale(1.3)',
                              },
                              color: 'red',
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
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
