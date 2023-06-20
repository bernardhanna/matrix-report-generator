/**
 * @Author: Bernard Hanna
 * @Date:   2023-06-15 10:20:39
 * @Last Modified by:   Bernard Hanna
 * @Last Modified time: 2023-06-19 12:39:01
 */
import React from 'react';
import Divider from '@mui/material/Divider';
const Information = ({ websiteUrl, currentDate }) => {
  return (
    <div className="information">
      <h2>Information</h2>
      <Divider variant="fullWidth" style={{ marginBottom: '2em', color: 'black' }} />
      <p><strong>Website:</strong> {websiteUrl}</p>
      <p><strong>Current Update Date:</strong> {currentDate}</p>
    </div>
  );
};

export default Information;