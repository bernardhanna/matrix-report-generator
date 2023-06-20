/**
 * @Author: Bernard Hanna
 * @Date:   2023-06-15 10:21:57
 * @Last Modified by:   Bernard Hanna
 * @Last Modified time: 2023-06-20 12:59:36
 */
import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';

function PerformanceReport({ performanceData }) { // Update the component name

  return (
    <>
      <div className="performanceReport" style={{ marginTop: '5em' }}>
        <h2>Performance Report</h2>
        <Divider variant="fullWidth" style={{ marginBottom: '2em', color: 'black' }} />
        <div style={{ marginBottom: '3em' }}><strong>Response Time:</strong></div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {performanceData && performanceData.data && performanceData.data.table_data && performanceData.data.table_data !== undefined ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1 style={{ fontWeight: 'bold' }}>{performanceData.data.table_data[0].RESPONSETIME.average}ms</h1>
              <span>Average</span>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          {performanceData && performanceData.data && performanceData.data.table_data && performanceData.data.table_data !== undefined ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1>{performanceData.data.table_data[0].RESPONSETIME.min}ms</h1>
              <span>Minimum</span>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          {performanceData && performanceData.data && performanceData.data.table_data && performanceData.data.table_data !== undefined ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1>{performanceData.data.table_data[0].RESPONSETIME.max}ms</h1>
              <span>Maximum</span>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default PerformanceReport; // Update the exported component name