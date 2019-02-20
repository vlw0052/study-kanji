import React, { Component } from 'react'
import PropTypes from 'prop-types'

const levels = ['N5', 'N4', 'N3', 'N2', 'N1']
export default class SelectionScreen extends Component {
    constructor(){
        super()
        this.state = {
            selectedGroup: null
        }
        
    }
    static propTypes = {
        onLevelSelection: PropTypes.func,
    }

    render() {
        return (
            <div className="selection">
                <h3>Select Your Level</h3>
                <div className="levels">
                {
                    levels.map(l => (
                        <div title={`JLPT ${l}`} onClick={ ()=>this.setState({ selectedGroup: l }) } className="level">
                            {l}
                        </div>
                        )
                    )
                }
                </div>
            </div>
        )
    }
}
