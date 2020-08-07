import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles, AppBar, Tabs, Tab, Box } from '@material-ui/core';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));





const MenuTabsMain = ({ data }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary" style={{display:''}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {data.map((value, index) => (
                        <Tab label={value.label} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </AppBar>
            {data.map((item, index) => {
                const { Component } = item
                return (
                    <TabPanel value={value} index={index} >
                        <div>
                            <Component />
                        </div>
                    </TabPanel>

                )
            })}

        </div >
    );
}
MenuTabsMain.propTypes = {
    data: PropTypes.array.isRequired
}

const MenuTabsSubModulos = ({ data }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {data.map((value, index) => (
                        <Tab label={value.label} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </AppBar>
            {data.map((item, index) => {
                const { Component } = item
                return (
                    <TabPanel value={value} index={index} >
                        <div>
                            <Component />
                        </div>
                    </TabPanel>

                )
            })}

        </div >
    );
}
MenuTabsSubModulos.propTypes = {
    data: PropTypes.array.isRequired
}


export {
    MenuTabsMain,
    MenuTabsSubModulos
}