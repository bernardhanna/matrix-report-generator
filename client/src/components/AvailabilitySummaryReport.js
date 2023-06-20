/**
 * @Author: Bernard Hanna
 * @Date:   2023-06-15 10:22:29
 * @Last Modified by:   Bernard Hanna
 * @Last Modified time: 2023-06-15 10:22:35
 */
import React from 'react';
import Divider from '@mui/material/Divider';

function AvailabilitySummaryReport({ availabilitySummaryData }) {
  const renderOutageData = () => {
    if (!availabilitySummaryData) {
      return <p>No outages this month</p>;
    }
    return <pre>{JSON.stringify(availabilitySummaryData, null, 2)}</pre>;
  };

  return (
    <div>
      <h2>Basic availability Summary Report</h2>
      <Divider variant="fullWidth" style={{ marginBottom: '2em', color: 'black' }} />
      {renderOutageData()}
    </div>
  );
}

export default AvailabilitySummaryReport;
