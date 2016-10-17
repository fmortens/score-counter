import { extendObservable, action } from "mobx";
import { Item } from '../models';

class ItemStore {
  constructor(props) {
    extendObservable(this, {
      items: [],
      addItem: action(this.addItem)
    });
  }

  addItem(props) {
    let item = new Item(props);
    this.items.push(item);
  }
}

let itemStore = new ItemStore();

export default itemStore;