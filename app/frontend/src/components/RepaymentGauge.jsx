import { Box, Typography, Grid } from '@mui/material';
import { Gauge } from '@mui/x-charts/Gauge';

const RepaymentGauge = ({ data }) => {
  const gauges = [
    {
      label: '3yr: $0–30k',
      value: data['latest.repayment.3_yr_repayment.income.0_30000'] * 100,
    },
    {
      label: '3yr: $30k–75k',
      value: data['latest.repayment.3_yr_repayment.income.30000_75000'] * 100,
    },
    {
      label: '3yr: >$75k',
      value:
        data['latest.repayment.3_yr_repayment.income.greater_than_75000'] * 100,
    },
    {
      label: '5yr: $0–30k',
      value: data['latest.repayment.5_yr_repayment.income.0_30000'] * 100,
    },
    {
      label: '5yr: $30k–75k',
      value: data['latest.repayment.5_yr_repayment.income.30000_75000'] * 100,
    },
    {
      label: '5yr: >$75k',
      value:
        data['latest.repayment.5_yr_repayment.income.greater_than_75000'] * 100,
    },
  ];

  return (
    <Box sx={{ mt: -2.5 }}>
      {/* 3 Year Plan Row */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontWeight: 600,
          mb: 1,
          textAlign: 'center',
        }}
      >
        3 Year Plan
      </Typography>
      <Grid container spacing={1}>
        {gauges.slice(0, 3).map((g, index) => (
          <Grid item xs={4} key={index}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Gauge
                width={120}
                height={120}
                value={g.value}
                valueMin={0}
                valueMax={100}
                startAngle={-90}
                endAngle={90}
                text={`${g.value.toFixed()}%`}
                sx={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontWeight: 600,
                  fontSize: '1.5rem',
                }}
              />
              <Typography
                variant="body2"
                textAlign="center"
                mt={1}
                sx={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontWeight: 300,
                  fontSize: '1.2rem',
                }}
              >
                {g.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* 5 Year Plan Row */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontWeight: 600,
          mt: 3,
          mb: 1,
          textAlign: 'center',
        }}
      >
        5 Year Plan
      </Typography>
      <Grid container spacing={1}>
        {gauges.slice(3).map((g, index) => (
          <Grid item xs={4} key={index}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Gauge
                width={120}
                height={120}
                value={g.value}
                valueMin={0}
                valueMax={100}
                startAngle={-90}
                endAngle={90}
                text={`${g.value.toFixed()}%`}
                sx={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontWeight: 600,
                  fontSize: '1.5rem',
                }}
              />
              <Typography
                variant="body2"
                textAlign="center"
                mt={1}
                sx={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontWeight: 300,
                  fontSize: '1.2rem',
                }}
              >
                {g.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RepaymentGauge;
