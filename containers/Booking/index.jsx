import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import TotalProfitEarned from './components/TotalProfitEarned';
import TotalCustomers from './components/TotalCustomers';
import TotalBookings from './components/TotalBookings';
import BookingCancels from './components/BookingCancels';
import Reservations from './components/Reservations';
import WeeklyStat from './components/WeeklyStat';
import Occupancy from './components/Occupancy';

const BookingDashboard = () => {

  // const { t, rtl } = this.props;

  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h3 className="page-title">Dashboard Booking</h3>
        </Col>
      </Row>
      <Row>
        <TotalProfitEarned />
        <TotalBookings />
        <TotalCustomers />
        <BookingCancels />
      </Row>
      <Row>
        <Reservations dir={'ltr'} />
        <WeeklyStat />
        <Occupancy />
      </Row>
    </Container>
  );

}

export default BookingDashboard;
