import '@testing-library/jest-dom';

import { shallow, } from 'enzyme';
import React from 'react';
import EmojiPicker from '../../components/EmojiPicker';

describe('Pruebas en <EmojiPicker/>', () => {
    const onSelect = jest.fn(() => {})
    const wrapper = shallow(
        <EmojiPicker
            id={'idEmojiPiker'}
            onSelect={onSelect}

        />
    )

    test('debe mostrarse correctamente testing pendiende ', () => {
        expect(wrapper).toMatchSnapshot()
    });


    test('debe llamar la función onSelect()', () => {
        wrapper.find('ForwardRef(LoadableComponent)').prop('onEmojiClick')({ emojiObject: expect.any });

        expect(onSelect).toHaveBeenCalled();
        expect(onSelect).toHaveBeenCalledTimes(1)
    })
})