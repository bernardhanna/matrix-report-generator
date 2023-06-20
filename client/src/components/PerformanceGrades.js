/**
 * @Author: Bernard Hanna
 * @Date:   2023-06-15 10:23:07
 * @Last Modified by:   Bernard Hanna
 * @Last Modified time: 2023-06-20 09:16:38
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

function PerformanceGrades({ url }) {
  const [mobileScores, setMobileScores] = useState({ performanceScore: null, accessibilityScore: null });
  const [desktopScores, setDesktopScores] = useState({ performanceScore: null, accessibilityScore: null });

  useEffect(() => {
    async function fetchScores() {
      try {
        const mobileResponse = await axios.get('http://localhost:5000/api/psi', { params: { url, strategy: 'mobile' } });
        const desktopResponse = await axios.get('http://localhost:5000/api/psi', { params: { url, strategy: 'desktop' } });

        setMobileScores(mobileResponse.data);
        setDesktopScores(desktopResponse.data);
      } catch (error) {
        console.log('Error fetching performance scores:', error);
      }
    }

    fetchScores();
  }, [url]);

  if (!mobileScores.performanceScore || !desktopScores.performanceScore) {
    return <div style={{ marginTop: '5em' }}>Loading Performance Report...</div>;
  }

  return (
    <div style={{ marginTop: '5em' }}>
      <h2>Performance Grades</h2>
      <div style={{ border: '1px solid rgba(0, 0, 0, 0.12)', marginBottom: '2em', color: 'black', maxWidth: '100%', borderWidth: 'thin' }}></div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'spaceBetween', alignItems: 'center', maxWidth: '100%' }}>
        <div className="circularProgress" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
          <h1>{mobileScores.performanceScore}</h1>
          <p style={{ textAlign: 'center', width: '50%', margin: 'auto' }}>Mobile Performance Score</p>
        </div>
        <div className="circularProgress" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
          <h1>{desktopScores.performanceScore}</h1>
          <p style={{ textAlign: 'center', width: '50%', margin: 'auto' }}>Desktop Performance Score</p>
        </div>
      </div>
    </div>
  );
}

export default PerformanceGrades;