/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import usePopover from '../hooks/usePopover';
import { Button } from '@material-ui/core';
import { InsertEmoticonTwoTone } from '@material-ui/icons';
import dynamic from 'next/dynamic';
import Spinner from './Spinner';

const Picker = dynamic(import('emoji-picker-react'), {
    ssr: false,
    loading: () => <Spinner />
});

/**
 *Componente que permite Visualizar Emojis y seleccionar en cada texto.
 * @param {onSelect: () => void, id: string}
 */
const EmojiPicker = ({ onSelect, id }) => {
    const [handleOpen, PopoverComponent] = usePopover();
    const handleEmojiClick = (event, emojiObject) => onSelect(emojiObject);

    return (
        <React.Fragment>
            <Button color="primary" size="small" onClick={handleOpen}>
                <InsertEmoticonTwoTone />
            </Button>
            <PopoverComponent id={`popover-emoji-${id}`}>
                <Picker onEmojiClick={handleEmojiClick} />
            </PopoverComponent>
        </React.Fragment>
    );
};

EmojiPicker.propTypes = {
    onSelect: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

export default EmojiPicker;
