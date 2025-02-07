import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import { store } from './redux/store.js'
import router from './routers/router.jsx'
import 'sweetalert2/dist/sweetalert2.js'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
