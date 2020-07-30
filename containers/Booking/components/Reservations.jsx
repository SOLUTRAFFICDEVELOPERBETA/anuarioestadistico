/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  Legend, Pie, PieChart, ResponsiveContainer, Tooltip,
} from 'recharts';
import PropTypes from 'prop-types';
import ArrowDownwardIcon from 'mdi-react/ArrowDownwardIcon';
import Panel from '../../../components/Panel';
import OurMission from './OurMission';

import getTooltipStyles from '../../../components/helpers';

const data = [
  { name: 'Completed', value: 2500, fill: '#b8e986' },
  { name: 'Online check-in', value: 2500, fill: '#4ce1b6' },
  { name: 'Remain', value: 5000, fill: '#f2f4f7' },
];

const style = (dir) => {
  const left = dir === 'ltr' ? { left: 0 } : { right: 0 };
  return ({
    ...left,
    marginTop: '-5px',
    lineHeight: '16px',
    position: 'absolute',
  });
};

const renderLegend = ({ payload }) => (
  <ul className="dashboard__booking-reservations-chart-legend dashboard__chart-legend">
    {
      payload.map((entry, index) => (
        <li key={`item-${index}`}>
          <span style={{ backgroundColor: entry.color }} />
          <p>{entry.value}</p>
        </li>
      ))
    }
  </ul>
);

renderLegend.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    vslue: PropTypes.string,
  })).isRequired,
};

class Reservations extends PureComponent {
  static propTypes = {
    dir: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  onMouseMove = (e) => {
    const { dir } = this.props;
    if (e.tooltipPosition) {
      this.setState({
        x: dir === 'ltr' ? e.tooltipPosition.x - 130 : e.tooltipPosition.x / 10, y: e.tooltipPosition.y - 40,
      });
    }
  };

  render() {
    const { t, dir } = this.props;
    const { x, y } = this.state;

    return (
      <Panel
        lg={6}
        xl={3}
        md={12}
        title={'dashboard_booking.reservations'}
        subhead="Reservation overview"
        before={<OurMission />}
        panelClass="dashboard__booking-reservations-panel"
      >
        <div className="dashboard__booking-reservations">
          <p className="dashboard__booking-reservations-title">Total visitors on 23.08.2018</p>
          <p className="dashboard__booking-reservations-number">345</p>
          <div className="dashboard__booking-reservations-chart" dir={dir}>
            <ResponsiveContainer>
              <PieChart className="dashboard__booking-reservations-chart-container">
                <Tooltip position={{ x, y }} {...getTooltipStyles('theme-light')} />
                <Pie
                  data={data}
                  dataKey="value"
                  cy={80}
                  innerRadius={47}
                  outerRadius={65}
                  onMouseMove={this.onMouseMove}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  wrapperStyle={style(dir)}
                  content={renderLegend}
                />
              </PieChart>
            </ResponsiveContainer>
            <span href="/" className="dashboard__booking-reservations-link">
              Download report <ArrowDownwardIcon className="dashboard__booking-reservations-link-icon" />
            </span>
          </div>
        </div>
      </Panel>
    );
  }
}

export default Reservations;

