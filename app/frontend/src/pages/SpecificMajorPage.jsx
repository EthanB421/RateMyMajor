import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';

export default function SpecificMajorPage() {
  const { specificMajor } = useParams();
  const [major, setMajor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMajor = async () => {
      try {
        const response = await fetch(
          `http://localhost:5123/api/major/search?keyword=${encodeURIComponent((
            specificMajor.trim()
          ))}`
        );

        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }

        const data = await response.json();
        setMajor(data);
      } catch (err) {
        setError(`Failed to fetch major: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMajor();
  }, [specificMajor]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!major) return <Typography>No major found.</Typography>;

  return (
    <Box>
      <Typography variant="h3">{major.name}</Typography>
      <Typography variant="body1">{major.description}</Typography>
      {/* Display other major info as needed */}
    </Box>
  );
}
