import React from 'react';
import { getPercentage } from "./func";

export const ProgressBar = props => {
    return (
        <div className="progress">
            <div className={`determinate`} style={{ width: `${getPercentage(props.numerator, props.denominator)}%`}}></div>
        </div>
    )
}