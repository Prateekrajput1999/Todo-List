import React, { useState } from 'react';

export default function Button(props) {
    return (
        <button
            className='btn'
            style={props.style}
            onClick={props.onClick}
        >
            <props.icon size="20"/>
            {props.title }
        </button>
    )
};