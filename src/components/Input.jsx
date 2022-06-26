import React from 'react';

export default function Input(props) {
    return (
        <input type="text" onChange={props.onChange} value={props.value} className='input' placeholder='type here...' />
    )
};