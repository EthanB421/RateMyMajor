import { LineChart } from '@mui/x-charts/LineChart';

const CollegeEarningsChart = ({ data }) => {
  if (!data) return null;

  const earnings = [
    {
      year: '1 Year',
      earnings: data['latest.earnings.1_yr_after_completion.median'],
    },
    {
      year: '4 Years',
      earnings: data['latest.earnings.4_yrs_after_completion.median'],
    },
    {
      year: '5 Years',
      earnings: data['latest.earnings.5_yrs_after_completion.median'],
    },
  ].filter((item) => item.earnings !== null && item.earnings !== undefined); // optional cleanup

  return (
    <LineChart
      dataset={earnings}
      xAxis={[{ scaleType: 'band', dataKey: 'year' }]}
      series={[
        {
          dataKey: 'earnings',
          label: 'Earnings Over Time',
          color: 'blue',
        },
      ]}
    />
  );
};

export default CollegeEarningsChart;
