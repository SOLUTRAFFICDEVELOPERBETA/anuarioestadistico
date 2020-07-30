/* eslint-disable react/no-array-index-key */
import React from 'react';
import TargetIcon from 'mdi-react/TargetIcon';
import { css } from '@emotion/core'

const OurMission = () => (
  <div>
    <div className="dashboard__booking-our-mission" css={css`
        text-align: left;
        height: 108px;
        background: #b8e986;
        border-radius: 5px;
        padding: 15px 13px;
        position: relative;
        overflow: hidden;
    `}>
      <TargetIcon />
      <p className="dashboard__booking-our-mission-title" css={css`
        font-size: 20px;
        font-weight: 500;
        color: #ffffff;
        margin-bottom: 4px;
        margin: 0;
        line-height: 1.25;
        max-width: 100%;
      `}>Our mission</p>
      <p css={css`
      color: white;
      `}>We are inspired by the customer’s happiness and their ability to travel! </p>
    </div>
  </div>
);

export default OurMission;
