
export default class EditorStore {
  constructor() {
    this._List = []
  }

  setList(List) {
    this._List = List
  }
  addItem(Item) {
    this._List.push(Item)
  }

  delItem(Item) {
    const id = this._List.indexOf(Item) // 2
    console.log(id)
    this._List.splice(id, 1)
    const narrr = this._List
    this._List = []
    console.log(this._List)
    console.log(id)
    this._List = narrr
  }

  getlist() {
    return this._List
  }
}
