import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import EditorStore from './store/EditorStore'
import ProductStore from './store/ProductStore'

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Context.Provider value={{
    editorfields: new EditorStore(),
    products: new ProductStore()
  }}>

    <App />

  </Context.Provider>
)
