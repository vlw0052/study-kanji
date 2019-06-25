import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { decks } from './decks.json';

export default class SelectionScreen extends Component {
  constructor() {
    super();
    this.state = {
      selectedLevel: null
    };
  }
  static propTypes = {
    onLevelSelection: PropTypes.func
  };

  selectLevel = l => _ => {
    this.setState({ selectedLevel: l });
  };
  back = _ => {
    this.setState({ selectedLevel: null });
  };
  render() {
    return (
      <div className='selection'>
        <h3>{this.state.selectedLevel ? 'Select A Group' : 'Select Your Level'}</h3>
        <div className='levels'>
          {this.state.selectedLevel ? <button onClick={this.back}>Back</button> : ''}
          {!this.state.selectedLevel
            ? Object.keys(decks).map(l => (
                <div title={`${decks[l].label}`} onClick={this.selectLevel(l)} className='level'>
                  {decks[l].label}
                </div>
              ))
            : Array.from(new Array(decks[this.state.selectedLevel].numberOfSections)).map((_, l) => (
                <div title={`${l + 1}`} onClick={() => this.props.selectDeck(this.state.selectedLevel, l + 1)} className='level'>
                  {l + 1}
                </div>
              ))}
        </div>
      </div>
    );
  }
}
