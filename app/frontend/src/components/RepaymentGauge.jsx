import { Box, Typography, Grid, IconButton, Popover } from '@mui/material';
import { Gauge } from '@mui/x-charts/Gauge';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useState } from 'react';

const RepaymentGauge = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
    <Box sx={{ mt: -2.5, position: 'relative' }}>
      {/* Info Icon in bottom-right */}
      <IconButton
        size="small"
        onClick={handleOpen}
        sx={{
          position: 'absolute',
          bottom: -10,
          right: -10,
          backgroundColor: '#f0f0f0',
          borderRadius: '50%',
          boxShadow: 1,
          '&:hover': { backgroundColor: '#e0e0e0' },
        }}
      >
        <HelpOutlineIcon fontSize="small" />
      </IconButton>

      {/* Gauges */}
      <Grid container spacing={1}>
        {gauges.map((g, index) => (
          <Grid size={4} key={index}>
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

      {/* Popover window */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Box p={2} maxWidth={250}>
          <Typography variant="subtitle1" fontWeight={600}>
            Repayment Chart Info
          </Typography>
          <Typography variant="body2" mt={1}>
            These gauges show the percentage of people (sorted by family income) who successfully paid their loans with either a 3 or 5-year plan.
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
};

export default RepaymentGauge;
