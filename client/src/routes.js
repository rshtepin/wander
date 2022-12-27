import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Main from './pages/Main'
import Editor from './pages/TemplateEditor'
import Product from './pages/Product'
import Products from './pages/Products'
import {
  ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PRODUCTS_ROUTE,
  PRODUCT_ROUTE, EDITOR_ROUTE
}
  from './utils/consts'

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin
  }
]
export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: MAIN_ROUTE,
    Component: Main
  },
  {
    path: PRODUCTS_ROUTE,
    Component: Products
  },
  {
    path: EDITOR_ROUTE,
    Component: Editor
  },
  {
    path: PRODUCT_ROUTE + '/:id',
    Component: Product
  }
]
