import React from 'react';
import {render, fireEvent, waitForElement, wait} from '@testing-library/react';
import Counter from './Counter';

describe('<Counter/>', () => {
    const testid_countUp = 'countUp';
    const testid_countDown = 'countDown';
    const testid_reset = 'reset';
    const testid_currentValue = 'currentValue';

    it('renders without crash', () => {
        render(<Counter/>);
    });

    it('should have a "+" (count up) button', ()=>{
        const {getByTestId} = render(<Counter/>);
        expect(getByTestId(testid_countUp));
    });

    it('should have a "-" (count down) button', ()=>{
        const {getByTestId} = render(<Counter/>);
        expect(getByTestId(testid_countDown));
    });

    it('should have "reset" button', ()=>{
        const {getByTestId} = render(<Counter/>);
        expect(getByTestId(testid_reset));
    });

    it('should have a "text field" to show the current counter value', ()=>{
        const {getByTestId} = render(<Counter/>);
        expect(getByTestId(testid_currentValue));
    });

    it('passing with no initial value as prop should show 0 in the current value text', ()=>{
        const {getByTestId} = render(<Counter/>);
        expect(getByTestId(testid_currentValue)).toHaveTextContent('0');
    }); 
   

    it('passing an initial value as prop should show that value in the current value text', ()=>{
        const {getByTestId} = render(<Counter initialValue={1}/>);
        expect(getByTestId(testid_currentValue)).toHaveTextContent('1');
    }); 

    it('clicking on "+" should increment current value', async () => {
        const {getByTestId} = render(<Counter initialValue={1}/>);
        const btn = getByTestId(testid_countUp);
        fireEvent.click(btn);
        expect(getByTestId(testid_currentValue)).toHaveTextContent("2");
    });

    it('clicking on "-" should decrement current value', () => {
        const {getByTestId} = render(<Counter initialValue={2}/>);
        const btn = getByTestId(testid_countDown);
        fireEvent.click(btn);
        expect(getByTestId(testid_currentValue)).toHaveTextContent("1");
    });

    it('clicking on reset should reset the current value to the initial value sent as prop', () => {
        const {getByTestId} = render(<Counter initialValue={2}/>);
        
        let btn = getByTestId(testid_countUp);
        fireEvent.click(btn);
        
        btn = getByTestId(testid_reset);
        fireEvent.click(btn);
        expect(getByTestId(testid_currentValue)).toHaveTextContent("2");
    });

    it('clicking on reset should reset the current value to 0 when no initial value is sent as prop', () => {
        const {getByTestId} = render(<Counter/>);
        
        let btn = getByTestId(testid_countUp);
        fireEvent.click(btn);
        
        btn = getByTestId(testid_reset);
        fireEvent.click(btn);
        expect(getByTestId(testid_currentValue)).toHaveTextContent("0");
    });
});