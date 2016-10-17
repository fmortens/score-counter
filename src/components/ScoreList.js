import React, { Component } from 'react';
//import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { ScoreStore } from '../stores';

import '../styles/ScoreList.css';

const ScoreList = observer(class ScoreList extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <div id="score-list-wrapper">
        <div id="score-list-header">
          <div>Item</div>
          <div>Qty</div>
          <div>Score</div>
        </div>
        <div id="score-list">
          {ScoreStore.items.map((item) => {
            return <div
              className="collected-item"
              key={item.id}
              >
              <div className="collected-item-id">{item.id}</div>
              <div className="collected-item-count">{item.count}</div>
              <div className="collected-item-score">{ScoreStore.getScoreForItem(item)}</div>
            </div>
          })}
        </div>
      </div>
    );
  }
});

export default ScoreList;
