import {makeAutoObservable} from 'mobx'

export default class ProductStore {
  constructor() {
    this._productList = []
    makeAutoObservable(this)
  }

  setList(productList) {
    this._productList = productList
  }

  get list() {
    return this._productList
  }
}
