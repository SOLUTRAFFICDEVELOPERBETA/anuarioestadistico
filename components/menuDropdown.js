/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Box, useTheme } from '@material-ui/core';
import { css } from '@emotion/core';

/**
 * Componente que permite visualizar cada tab.
 * @param {children: any, value: string, index: any} props del componente.
 */
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}>
            {value === index && (
                <Box
                    css={css`
                        padding: 3rem;

                        @media (max-width: 768px) {
                            padding: 0rem;
                        }
                    `}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

// Método para cambiar de panel.
function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`
    };
}
/**
 * Componente que permite visualizar los panel de la plataforma.
 * @param {data: {}} props del componente.
 */
const MenuTabsMain = ({ data }) => {
    const [value, setValue] = React.useState(0);

    const theme = useTheme();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div
            css={css`
                padding-left: 1rem;
                padding-right: 1rem;
                flex-flow: 1;
                width: 100%;
                background-color: ${theme.palette.background.paper};

                @media (max-width: 768px) {
                    padding-left: 0rem;
                    padding-right: 0rem;
                }
            `}>
            <AppBar position="static" color="secondary">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example">
                    {data.map((value, index) => (
                        <Tab label={value.label} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </AppBar>
            {data.map((item, index) => {
                const { Component } = item;
                return (
                    <TabPanel value={value} index={index}>
                        <div>
                            <Component />
                        </div>
                    </TabPanel>
                );
            })}
        </div>
    );
};
MenuTabsMain.propTypes = {
    data: PropTypes.array.isRequired
};

export { MenuTabsMain };
