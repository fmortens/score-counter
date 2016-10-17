import React, { Component } from 'react';
import { observer } from 'mobx-react';
import '../styles/AppView.css';

import { ItemList, ScoreList } from './';
import { ScoreStore } from '../stores';

const AppView = observer(class AppView extends Component {

  testFunction() {
    alert('hello');
  }

  render() {
    return (
      <div id="wrapper">
        <div className="section" id="left">
          <div className="header">
            <div>Item points</div>
          </div>
          <div className="main">
            <ItemList />
          </div>
        </div>
        <div className="section" id="right">
          <div className="header">
            <div>Player items</div>
          </div>
          <div className="main">
            <div id="items-collected-list">
              <ScoreList />
            </div>
            <div id="bonus-total">BONUS {ScoreStore.totalBonus}</div>
            <div id="score-total-wrapper">
              <div id="score-total">Total {ScoreStore.totalScore + ScoreStore.totalBonus}</div>
              <div id="new-game-button" onClick={ScoreStore.startNewGame}>New game</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default AppView;
