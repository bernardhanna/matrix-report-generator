/**
 * @Author: Bernard Hanna
 * @Date:   2023-06-15 10:22:14
 * @Last Modified by:   Bernard Hanna
 * @Last Modified time: 2023-06-20 12:54:46
 */
import React, { useRef, useEffect } from 'react';
import Divider from '@mui/material/Divider';

function SummaryReport({ summaryData }) {
  return (
    <div className="summaryReport" style={{ marginTop: '5em' }}>
      <h2>Summary Report</h2>
      <Divider variant="fullWidth" style={{ marginBottom: '2em', color: 'black' }} />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {summaryData && summaryData.data && summaryData.data.summary_details && summaryData.data.summary_details.availability_percentage
          ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontWeight: 'bold' }}>{summaryData.data.summary_details.availability_percentage}</h1>
            <p>Availability</p>
          </div>
          : 'Loading...'
        }
        {summaryData && summaryData.data && summaryData.data.performance_details && summaryData.data.performance_details[0]
          ? <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontWeight: 'bold' }}>{summaryData.data.performance_details[0].attribute_value}</h1>
            <p>{summaryData.data.performance_details[0].attribute_label}</p>
          </div>
          : 'Loading...'
        }
        {summaryData && summaryData.data && summaryData.data.summary_details && summaryData.data.summary_details.down_count !== undefined ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ fontWeight: 'bold' }}>{summaryData.data.summary_details.down_count}</h1>
            <p>Downtimes</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default SummaryReport;
