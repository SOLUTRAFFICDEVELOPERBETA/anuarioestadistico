import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Badge, Card, CardBody, Col, Collapse,
} from 'reactstrap';
import CloseIcon from 'mdi-react/CloseIcon';
import MinusIcon from 'mdi-react/MinusIcon';
import AutorenewIcon from 'mdi-react/AutorenewIcon';
import LoadingIcon from 'mdi-react/LoadingIcon';
import { css } from '@emotion/core'
import styled from '@emotion/styled'

const PanelBtn = styled.button`
    margin-left: 5px;
    cursor: pointer;
    width: 14px;
    height: 14px;
    background: transparent;
    border: none;
    padding: 0;

`

const AlertComponent = ({
  md, lg, xl, sm, xs, color, divider, icon, title, label, subhead, before,
  panelClass, children,
}) => {
  const [visible, setVisible] = useState(true);
  const [collapse, setCollapse] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const onDismiss = () => {
    setVisible(false);
  };

  const toggleCollapse = () => {
    setCollapse(prevState => !prevState);
  };

  // your async logic here
  const onRefresh = () => {
    setRefresh(true);
  };

  useEffect(() => {
    if (refresh) {
      // fake timeout
      setTimeout(() => setRefresh(false), 5000);
    }
  }, [refresh]);

  if (visible) {
    return (
      <Col md={md} lg={lg} xl={xl} sm={sm} xs={xs} css={css`
    
      @media(min-width: 992px){
        .col-lg-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }
      }

      @media(min-width: 768px){
        .col-md-12 {
      flex: 0 0 100%;
      max-width: 100%;
      flex-grow: 0;
      text-shadow: 0 0 0px black;
    }
      }
    @media(min-width: 1200px){
      .col-xl-3 {
          flex: 0 0 25%;
          max-width: 25%;
        }
    }


      
      `}>
        <Card
          css={css`
        height: calc(100% - 138px);
        transition: 0.3s;
        width: 100%;
        padding-bottom: 30px;
        border: none;
        background-color: transparent;
        `}
          className={`panel${color ? ` panel--${color}` : ''}
          ${divider ? ' panel--divider' : ''}${collapse ? '' : ' panel--collapse'} ${panelClass}`}
        >
          <CardBody css={css`
              padding-right: 35px;
              padding-left: 30px;
              background-color: white;
              position: relative;
              padding-top: 30px;
              padding-bottom: 50px;
              transition: height 0.3s;
              height: 100%;
              border-radius: 5px;
              
          `} className="panel__body">
            {refresh ? <div css={css`
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0px;
            `}><LoadingIcon /></div> : ''}
            <div css={css`
               right: 10px;
               position: absolute;
               top: 30px;
            `}>
              <PanelBtn type="button" onClick={toggleCollapse}><MinusIcon /></PanelBtn>
              <PanelBtn type="button" onClick={onRefresh}><AutorenewIcon /></PanelBtn>
              <PanelBtn type="button" onClick={onDismiss}><CloseIcon /></PanelBtn>
            </div>
            <div css={css`
              text-transform: uppercase;
              margin-bottom: 30px;
              transition: 0.3s;
              text-shadow: 0 0 0px black;
              margin-bottom: 0;
            `}>
              <h5 css={css`
                  text-align: left;
                  font-size: 13px;
                  color: #646777;
                  font-weight: 700;
                  line-height: 18px;
                  margin-top: 0;
              `}>
                {icon ? <span className={`panel__icon lnr lnr-${icon}`} /> : ''}
                {title}
                <Badge css={css`
                    left: 100%;
                    margin-left: 10px;
                    display: none;
                    background-color: #4ce1b6;
                    font-size: 10px;
                    font-weight: 500;
                    text-transform: uppercase;
                    line-height: 13px;
                    padding: 3px 10px;
                `}>{label}</Badge>
              </h5>
              <h5 className="subhead" css={css`
                  text-align: left;
                  text-transform: none;
                  font-size: 12px;
                  line-height: 18px;
                  opacity: 0.7;
                  transition: 0.3s;
                  color: #999999;
                  margin-bottom: 0;
              `}>{subhead}</h5>
            </div>
            <Collapse isOpen={collapse}>
              <div className="panel__content">
                {children}
              </div>
            </Collapse>
          </CardBody>
        </Card>
        {before}
      </Col>

    )
  }



  return '';
}

AlertComponent.propTypes = {
  divider: PropTypes.bool,
  color: PropTypes.string,
  title: PropTypes.string,
  subhead: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  sm: PropTypes.number,
  xs: PropTypes.number,
  before: PropTypes.element,
  panelClass: PropTypes.string,
};

AlertComponent.defaultProps = {
  divider: false,
  color: '',
  title: '',
  subhead: '',
  label: '',
  icon: '',
  md: 0,
  lg: 0,
  xl: 0,
  sm: 0,
  xs: 0,
  before: null,
  panelClass: '',
};

export default AlertComponent;

export const PanelTitle = ({ title }) => (
  <div className="panel__title">
    <h5 className="bold-text">
      {title}
    </h5>
  </div>
);

PanelTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
