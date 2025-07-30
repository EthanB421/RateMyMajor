import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';

const CollegeEarningsChart = ({ collegeName }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5123/api/CollegeScorecard/${encodeURIComponent(collegeName)}`
        );        
        const json = res.data;

        const earnings = [
          { year: '1 Year', earnings: json.results[0]["latest.earnings.1_yr_after_completion.median"] },
          { year: '4 Years', earnings: json.results[0]["latest.earnings.4_yrs_after_completion.median"] },
          { year: '5 Years', earnings: json.results[0]["latest.earnings.5_yrs_after_completion.median"] },
        ];

        setData(earnings);
      } catch (err) {
        console.error('Failed to fetch earnings data:', err);
      }
    };

    fetchCollegeData();
  }, [collegeName]);
    console.log("DATA BEING FED TO CHART:", data);

  return (

        <LineChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'year' }]}
          series={[
            {
              dataKey: 'earnings',
              label: 'Earnings Over Time',
              color: 'blue',
            },
          ]}
          width={600}
          height={300}
        />
  );
};

export default CollegeEarningsChart;
