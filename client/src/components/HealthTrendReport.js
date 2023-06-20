/**
 * @Author: Bernard Hanna
 * @Date:   2023-06-15 10:22:51
 * @Last Modified by:   Bernard Hanna
 * @Last Modified time: 2023-06-15 10:22:56
 */
import React from 'react';
import Divider from '@mui/material/Divider';

function HealthTrendReport({ healthTrendData }) {
  return (
    <div>
      <h2>Health Trend Report</h2>
      <Divider variant="fullWidth" style={{ marginBottom: '2em', color: 'black' }} />
      <pre>{JSON.stringify(healthTrendData, null, 2)}</pre>
    </div>
  );
}

export default HealthTrendReport;
