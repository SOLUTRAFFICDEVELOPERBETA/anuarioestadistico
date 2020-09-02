import { Popover } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const usePopover = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);

    const PopoverComponent = ({
        id,
        children,
        anchorOrigin = {
            vertical: 'bottom',
            horizontal: 'left'
        },
        transformOrigin = {
            vertical: 'top',
            horizontal: 'left'
        }
    }) => (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}>
            {children}
        </Popover>
    );

    PopoverComponent.propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
        anchorOrigin: PropTypes.object,
        transformOrigin: PropTypes.object
    };

    return [handleClick, PopoverComponent];
};

export default usePopover;
