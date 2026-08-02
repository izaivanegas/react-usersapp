import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles.css'

import {UsersApp} from "./UsersApp.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <UsersApp />
  </StrictMode>,
)
