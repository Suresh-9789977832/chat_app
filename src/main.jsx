import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './Context/Authcontext.jsx'
import { Socketcontextprovider } from './Context/Socketcontext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Socketcontextprovider>
        <App />
        </Socketcontextprovider>
        </AuthContextProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
