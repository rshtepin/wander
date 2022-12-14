import {makeAutoObservable} from 'mobx'

export default class EditorStore {
  constructor() {
    this._List = []
    makeAutoObservable(this)
  }

  setList(List) {
    this._List = List
  }
  addItem(Item) {
    this._List.push(Item)
  }

  get list() {
    return this._List
  }
}
