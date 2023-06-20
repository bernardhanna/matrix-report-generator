/**
 * @Author: Bernard Hanna
 * @Date:   2023-06-15 10:21:57
 * @Last Modified by:   Bernard Hanna
 * @Last Modified time: 2023-06-20 13:04:03
 */
import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';

function CurrentStatus({ currentStatusData }) { // Update the component name

  return (
    <>
      <div className="currentStatusData" style={{ marginTop: '5em' }}>
        <h2>Current Status Data</h2>
        <Divider variant="fullWidth" style={{ marginBottom: '2em', color: 'black' }} />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {currentStatusData && currentStatusData.data && currentStatusData.data.locations.map((location, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '20%' }}>
              {location.status === 1 ? <p style={{ color: 'green' }}>&#8593;</p> : <p style={{ color: 'red' }}>&#8595;</p>}
              <p>{location.location_name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CurrentStatus; // Update the exported component name