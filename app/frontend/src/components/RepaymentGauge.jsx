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
      value: data['latest.repayment.3_yr_repayment.income.greater_than_75000'] * 100,
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
      value: data['latest.repayment.5_yr_repayment.income.greater_than_75000'] * 100,
    },
  ];

  return (
    <Grid container spacing={3}>
      {gauges.map((g, index) => (
        <Grid item xs={12} sm={4} key={index}>
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
            <Typography variant="body2" textAlign="center" mt={1}
            sx={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontWeight: 300,
                fontSize: '1.2rem',
            }}>
              {g.label} <br/>
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default RepaymentGauge;
