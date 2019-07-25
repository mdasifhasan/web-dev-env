import React, {useState, useReducer, useEffect}  from 'react'


function reducer(state, action){
    switch(action.type){
        case 'up':
            return {count: state.count + 1}
        case 'down':
            return {count: state.count - 1}
        case 'reset':
            return {count: action.payload}
    }
}

export default function Counter(props){
    const initialValue = props.initialValue || 0;
    const [state, dispatch] = useReducer(reducer, {count: initialValue});

    return (
        <div>
            <button 
                data-testid='countDown' 
                onClick= {() => dispatch({ type: 'down' })}
            > - </button>
            <span data-testid='currentValue'> {state.count} </span>
            <button data-testid='countUp' onClick={() => dispatch({type: 'up'})}> + </button>
            <button 
                data-testid='reset'
                onClick = {() => dispatch({type: 'reset', payload: initialValue})}
            > Reset </button>
        </div>
    )
}