/* ==========================================================================
** App Entry Point
** Set App Routes
** 28/08/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Import Components
// --------------------------------------
  import React, { Component } from 'react';
  import { createBrowserHistory } from "history";
  import { Router, Route, Switch } from 'react-router-dom';
  import indexRoutes from './routes/index';
  import { sp } from "@pnp/sp";
  import { SPHttpClient } from '@pnp/sp';
  import { getGUID } from "@pnp/common";
  import './App.css';







// --------------------------------------
// Create Component Class
// --------------------------------------
class App extends Component {


  // --------------------------------------
  // Load SP Context
  // -------------------------------------- 
  async componentDidMount() {
    sp.setup({
      sp: {
        headers: {
          Accept: "application/json;odata=verbose",
        },
        baseUrl: process.env.REACT_APP_SP_STATIC_PATH
      },
    });
    
    const w = await sp.web.get();
    console.log("TCL: App -> componentDidMount -> w", w)

    const user = await sp.utility.getCurrentUserEmailAddresses();
    console.log("TCL: App -> componentDidMount -> user", user)

    sp.web.lists.getByTitle("qnaLegal").items.get().then((items) => {
      console.log(items);
    }).catch(error => console.log('error', error));
    
    
  }



 

  // --------------------------------------
  // Render App
  // --------------------------------------
  renderApp () { 
    const history = createBrowserHistory();
    //? Return Index Routes (Dashboard Container)
      return (
        <Router history={history}>
          <Switch>
            {indexRoutes.map((prop, key) => {
              // console.log('TCL: App -> renderApp -> prop', prop)
              return <Route path={prop.path} component={prop.component} key={`index-${key}`} ></Route>
            })}
          </Switch>

        </Router>
      );
  }

  // --------------------------------------
  // Render
  // --------------------------------------
  render() {
    return this.renderApp();    
  }
}

// --------------------------------------
// Export Component
// --------------------------------------
export default App;

