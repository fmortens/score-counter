import { extendObservable } from "mobx";

class Item {
  constructor(props) {
    extendObservable(this, {
      id: undefined,
      points: 0,
      bonus: {
        requiredAmount: 0,
        score: 0
      }
    });

    for (const key in props) {
      if (this.hasOwnProperty(key)) {
        this[key] = props[key];
      }
    }
  }
}

export default Item;