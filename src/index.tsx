import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './Services/firebase'

// Styles
import './main.css'
import './helpers.css'

// Providers
import { AuthProviders } from './Hooks/useAuth'
import { ProductsProvider } from './Hooks/useProducts'

// Components
import { Home } from './Pages/Home/Home'
import { Productos } from './Pages/Productos/Productos'
import { Nuevo } from './Pages/Productos/Nuevo/Nuevo'
import { Detalles } from './Pages/Productos/Detalles/Detalles'
import { Transferir } from './Pages/Productos/Transferir/Transferir'
import { ComoFunciona } from './Pages/ComoFunciona/ComoFunciona'
import { Login } from './Pages/Login/Login'

ReactDOM.render(
  <React.StrictMode>
    <AuthProviders>
      <ProductsProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/productos/nuevo" component={Nuevo} />
            <Route
              exact
              path="/productos/transferir/:id"
              component={Transferir}
            />
            <Route exact path="/productos/" component={Productos} />
            <Route exact path="/producto/:id" component={Detalles} />
            <Route exact path="/como-funciona/" component={ComoFunciona} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </ProductsProvider>
    </AuthProviders>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
