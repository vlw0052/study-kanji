import React from 'react'
export const Progress = props => (
    <div className="col s4 progress-section">
        <div className="div">
            <span className="box" style={{ background: props.color }}></span>
            <span>{props.text} : {props.number}</span>
        </div>
    </div>
)