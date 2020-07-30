import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import TotalProfitEarned from './components/TotalProfitEarned';
import TotalCustomers from './components/TotalCustomers';
import TotalBookings from './components/TotalBookings';
import BookingCancels from './components/BookingCancels';
import Reservations from './components/Reservations';
import WeeklyStat from './components/WeeklyStat';
import Occupancy from './components/Occupancy';
import { css } from '@emotion/core'
const BookingDashboard = () => {



  return (
    <div css={css`
    padding-top: 20px;
    min-height: 100vh;
    transition: padding-left 0.3s;
    `}>
      <Container css={css`
        width: 100%;
        max-width: 1630px;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
      `}>
        <Row>
          <Col md={12}
            css={css`
              position: relative;
              width: 100%;
              padding-right: 15px;
              padding-left: 15px;
          `}
          >
            <h3
              css={css`
                text-align: left;
                font-weight: 500;
                text-transform: capitalize;
                font-size: 20px;
                line-height: 32px;
            `}
            

            >Anuario estadístico</h3>
          </Col>
        </Row>
        {/* <Row>
          <TotalProfitEarned />
          <TotalBookings />
          <TotalCustomers />
          <BookingCancels />
        </Row> */}
        <Row css={css`
        display: flex;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;
        `}>
          <Reservations dir={'ltr'} />
          <WeeklyStat />
          <Occupancy dir={'ltr'} />
        </Row>
      </Container>
    </div>
  );

}

export default BookingDashboard;
