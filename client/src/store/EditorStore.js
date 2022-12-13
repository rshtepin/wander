import {makeAutoObservable} from 'mobx'

export default class EditorStore {
  constructor() {
    this._List = []
    makeAutoObservable(this)
  }

  setList(List) {
    this._List = List
  }

  get list() {
    return this._List
  }
}
