/**
 * @Author: Bernard Hanna
 * @Date:   2023-06-15 10:21:30
 * @Last Modified by:   Bernard Hanna
 * @Last Modified time: 2023-06-15 14:47:11
 */
import React from 'react';
import { Grid, Select, MenuItem, Switch } from '@mui/material';

const MonthlySupportQA = ({
  ecommerce,
  handlePagesCheckedOnDesktopChange,
  handlePagesCheckedOnMobileChange,
  handlePagesCheckedOnCommerceChange,
  handleSearchFunctionWorksChange,
  handleMalwareFunctionWorksChange,
  handleBlacklistFunctionWorksChange,
  handleSpamFunctionWorksChange,
  handleDefaceFunctionWorksChange,
  handleServerErrorFunctionWorksChange,
  handleOverallFunctionWorksChange,
  pagesCheckedOnDesktop,
  pagesCheckedOnMobile,
  pagesCheckedOnCommerce,
  searchFunctionWorks,
  malwareFunctionWorks,
  blacklistFunctionWorks,
  spamFunctionWorks,
  defaceFunctionWorks,
  serverErrorFunctionWorks,
  overallFunctionWorks,
}) => {
  return (
    <div className="MonthlySupportQA">
      <h2>Monthly Support Q/A</h2>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div style={{ fontWeight: 'bold' }}>Before Update</div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ fontWeight: 'bold' }}>Result</div>
        </Grid>
        {ecommerce === 'yes' && (
          <>
            <Grid item xs={6}>
              <div>If an eCommerce website, has a test purchase been done successfully?</div>
            </Grid>
            <Grid item xs={6}>
              <Select value={pagesCheckedOnCommerce} onChange={handlePagesCheckedOnCommerceChange}>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </Grid>
          </>
        )}
        <Grid item xs={6}>
          <div>Have all pages been checked on the desktop?</div>
        </Grid>
        <Grid item xs={6}>
          <Select value={pagesCheckedOnDesktop} onChange={handlePagesCheckedOnDesktopChange}>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <div>Have all pages been checked on mobile?</div>
        </Grid>
        <Grid item xs={6}>
          <Select value={pagesCheckedOnMobile} onChange={handlePagesCheckedOnMobileChange}>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <div>Does the search function work properly?</div>
        </Grid>
        <Grid item xs={6}>
          <Select value={searchFunctionWorks} onChange={handleSearchFunctionWorksChange}>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <div style={{ fontWeight: 'bold' }}>Sucuri check & malware scanner</div>
        </Grid>
        <Grid item xs={6}>
          <div style={{ fontWeight: 'bold' }}>Result</div>
        </Grid>
        <Grid item xs={6}>
          <div>Is there any malware found?</div>
        </Grid>
        <Grid item xs={6}>
          <Select value={malwareFunctionWorks} onChange={handleMalwareFunctionWorksChange}>
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <div>Is the website blacklisted?</div>
        </Grid>
        <Grid item xs={6}>
          <Select value={blacklistFunctionWorks} onChange={handleBlacklistFunctionWorksChange}>
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <div>Is there any injected spam detected?</div>
        </Grid>
        <Grid item xs={6}>
          <Select value={spamFunctionWorks} onChange={handleSpamFunctionWorksChange}>
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <div>Are there any defacements detected?</div>
        </Grid>
        <Grid item xs={6}>
          <Select value={defaceFunctionWorks} onChange={handleDefaceFunctionWorksChange}>
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <div>Is there an internal server error detected?</div>
        </Grid>
        <Grid item xs={6}>
          <Select value={serverErrorFunctionWorks} onChange={handleServerErrorFunctionWorksChange}>
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <div>Is the website up to date?</div>
        </Grid>
        <Grid item xs={6}>
          <Select value={overallFunctionWorks} onChange={handleOverallFunctionWorksChange}>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </div>
  );
};

export default MonthlySupportQA;
