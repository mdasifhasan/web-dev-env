import React from 'react';
import {render, waitForElement, wait} from '@testing-library/react';
import SampleMsg from './SampleMsg';
import axios from 'axios';

describe('<SampleMsg/>', () => {

    const msg = 'test message';

    beforeEach(() => {
        axios.get.mockClear();
    });

    it('renders without crashing', () => {
        render(<SampleMsg/>);
    });

    it('fetch message from server, and update text field', async () => {
        const {getByText, getByTestId} = render(<SampleMsg/>);
        const greetingTextNode = await waitForElement(() => getByTestId("messageText"));
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(getByTestId('messageText')).toHaveTextContent(msg);
    });

});