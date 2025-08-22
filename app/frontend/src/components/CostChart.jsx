import { BarChart } from '@mui/x-charts/BarChart';

const CostChart = ({ data }) => {
  if (!data) return null;

  const costData = [
    {
      label: 'Books & Supplies',
      value: data['latest.cost.booksupply'],
      color: '#1976d2',
    },
    {
      label: 'Other (Off Campus)',
      value: data['latest.cost.otherexpense.offcampus'],
      color: '#388e3c',
    },
    {
      label: 'Other (On Campus)',
      value: data['latest.cost.otherexpense.oncampus'],
      color: '#fbc02d',
    },
    {
      label: 'Other (With Family)',
      value: data['latest.cost.otherexpense.withfamily'],
      color: '#e64a19',
    },
    {
      label: 'Room & Board (Off Campus)',
      value: data['latest.cost.roomboard.offcampus'],
      color: '#7b1fa2',
    },
    {
      label: 'Room & Board (On Campus)',
      value: data['latest.cost.roomboard.oncampus'],
      color: '#0288d1',
    },
  ];

  return (
    <BarChart
      xAxis={[
        {
          id: 'costs',
          data: costData.map((item) => item.label),
          scaleType: 'band',
          label: 'Category',
        },
      ]}
      yAxis={[
        {
          valueFormatter: (value) => {
            if (value >= 1_000_000) {
              return `$${(value / 1_000_000).toFixed(1)}M`;
            } else if (value >= 1_000) {
              return `$${(value / 1_000).toFixed(0)}K`;
            }
            return `$${value}`;
          },
        },
      ]}
      series={[
        {
          data: costData.map((item) => item.value),
          label: 'Cost ($)',
          color: '#3f51b5',
        },
      ]}
    />
  );
};

export default CostChart;
