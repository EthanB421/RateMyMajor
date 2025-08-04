import { PieChart } from '@mui/x-charts/PieChart';

const DemographicChart = ({ data }) => {
  if (!data) return null;

  const demographics = [
    { label: 'White', value: data['latest.student.demographics.race_ethnicity.white'] },
    { label: 'Asian', value: data['latest.student.demographics.race_ethnicity.asian'] },
    { label: 'Black', value: data['latest.student.demographics.race_ethnicity.black'] },
    { label: 'Hispanic', value: data['latest.student.demographics.race_ethnicity.hispanic'] },
    { label: 'American Indian/Alaska Native', value: data['latest.student.demographics.race_ethnicity.aian'] },
    { label: 'Native Hawaiian/Pacific Islander', value: data['latest.student.demographics.race_ethnicity.nhpi'] },
  ];

  const filteredData = demographics.filter(item => item.value != null && item.value > 0);

  const percentData = filteredData.map(d => ({
    ...d,
    value: +(d.value * 100).toFixed(2),
  }));

  return (
    <div style={{ width: '100%', maxWidth: 500 }}>
      <PieChart
        series={[{ data: percentData }]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default DemographicChart;
