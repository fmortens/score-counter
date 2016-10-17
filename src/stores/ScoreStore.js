import { extendObservable, action, computed } from 'mobx';
import { Item } from '../models';
import { ItemStore } from '../stores';

class ScoreStore {
  constructor(props) {
    extendObservable(this, {
      items: [],
      score: 0,
      bonus: 0,
      addItem: action(this.addItem),
      selectItem: action(this.selectItem),
      startNewGame: action(this.startNewGame),
      totalBonus: computed(this.totalBonus),
      totalScore: computed(this.totalScore),
      calculateScoreForItem: this.calculateScoreForItem,
      getScoreForItem: this.getScoreForItem,
    });

    this.startNewGame = this.startNewGame.bind(this);
  }

  addItem(props) {
    let item = new Item(props);
    this.items.push(item);
  }

  selectItem(item) {
    let collectedItem = this.items.find((collectedItem) => collectedItem.id === item.id);

    if (collectedItem) {
      collectedItem.count += 1;
    }
    else {
      // creates a new record, and marks it as collected (count 1)
      collectedItem = {
        id: item.id,
        count: 1,
        scores: 0,
        bonuses: 0
      };

      this.items.push(collectedItem);
    }

    this.calculateScoreForItem(collectedItem);
  }

  totalBonus() {
    let totalBonus = 0;

    this.items.forEach(
      (item) => {
        const itemDetails = ItemStore.items.find((itemData) => itemData.id === item.id);
        totalBonus += item.bonuses ? item.bonuses * itemDetails.bonus.score : 0;
      }
    );

    return totalBonus;
  }

  totalScore() {
    let totalScore = 0;

    this.items.forEach(
      (item) => {
        const itemDetails = ItemStore.items.find((itemData) => itemData.id === item.id);
        totalScore += item.scores * itemDetails.points;
      }
    );

    return totalScore;
  }

  calculateScoreForItem(item) {
    item.scores = 0;
    item.bonuses = 0;

    let itemDetails = ItemStore.items.find((itemData) => itemData.id === item.id);
    let itemsToBeAwardedScore = item.count;

    while (itemsToBeAwardedScore > 0) {
      if (itemDetails.bonus && (itemsToBeAwardedScore >= itemDetails.bonus.requiredAmount)) {
        item.bonuses++;
        itemsToBeAwardedScore -= itemDetails.bonus.requiredAmount;
      }
      else {
        item.scores++;
        itemsToBeAwardedScore--;
      }
    }
  }

  getScoreForItem(item) {
    let itemDetails = ItemStore.items.find((itemData) => itemData.id === item.id);

    let itemScore = 0;
    if (itemDetails.bonus && item.bonuses) {
      itemScore = item.bonuses * itemDetails.bonus.score;
    }

    return itemScore + item.scores * itemDetails.points;
  }

  startNewGame() {
    this.items = [];
    this.score = 0;
    this.bonus = 0;
  }
}

let scoreStore = new ScoreStore();

export default scoreStore;