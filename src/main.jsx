import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles.css'

import {UsersApp} from "./UsersApp.jsx";
import {BrowserRouter} from "react-router-dom";
import {LoginProvider} from "./auth/context/LoginProvider.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <LoginProvider>
              <UsersApp />
          </LoginProvider>
      </BrowserRouter>
  </StrictMode>,
)
