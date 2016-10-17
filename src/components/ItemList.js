import React, { Component } from 'react';
import { observer } from 'mobx-react';

import { ItemStore, ScoreStore } from '../stores';

import '../styles/ItemList.css';

const ItemList = observer(class ItemList extends Component {
  componentWillMount() {
    ItemStore.addItem({
      id: 'A',
      points: 50,
      bonus: {
        requiredAmount: 3,
        score: 200
      }
    });

    ItemStore.addItem({
      id: 'B',
      points: 30,
      bonus: {
        requiredAmount: 2,
        score: 90
      }
    });

    ItemStore.addItem({
      id: 'C',
      points: 20,
      bonus: {}
    });

    ItemStore.addItem({
      id: 'D',
      points: 15,
      bonus: {}
    });

    ItemStore.addItem({
      id: 'E',
      points: 250,
      bonus: {}
    });
  }

  render() {
    return (
      <div id="item-list-wrapper">
        <div id="item-list-subHeader">Items</div>
        <div id="item-list">
          {ItemStore.items.map((item) => {
            return <div
              className="item"
              key={item.id}
              onClick={() => {
                ScoreStore.selectItem(item)
              } }
              >
              {item.id}
            </div>
          })}
        </div>
      </div >
    );
  }
});

export default ItemList;
