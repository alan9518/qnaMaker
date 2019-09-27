/* ==========================================================================
** Main Layout
** Set App Routes & NavBar
** 28/08/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import PropTypes from 'prop-types';
    import {appRoutes} from '../../routes/Routes';
    import { NavBar, AppLoader } from '../../components'
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';
    import { Switch, Route, Router, Redirect, BrowserRouter } from "react-router-dom";
    import '../styles.css'


// --------------------------------------
// Create Component Class
// --------------------------------------
class DashboardContainer extends Component {

    /* ==========================================================================
    ** Component Setup
    ** ========================================================================== */


        // --------------------------------------
        // Constructor
        // --------------------------------------
        constructor(props) {
            super(props);
            this.state = {
                isLoaded : false,
                responsiveWidth : window.innerWidth
            }
        }


        // --------------------------------------
        // Event for Responsive Sharepobot
        // --------------------------------------
        componentDidMount() {
            window.addEventListener("resize", this.updateContainerDimensions);

            this.setState({
                isLoaded :true
            })


        }


        // --------------------------------------
        // Unregister Window Listener Event
        // --------------------------------------
        componentWillUnmount() {
            window.removeEventListener("resize", this.updateContainerDimensions);
        }


        
        // --------------------------------------
        // Window Resizing
        // --------------------------------------
        updateContainerDimensions = () => {
            let newWidth = window.innerWidth;
            this.setState({responsiveWidth : newWidth});
        }
        


    /* ==========================================================================
    ** Render Methods
    ** ========================================================================== */

        // --------------------------------------
        // Render Loader
        // --------------------------------------
        renderLoader () {
            return <div> <AppLoader /> </div>
        }


        // --------------------------------------
        // Render DashboardContainer
        // --------------------------------------
        renderDashboardContainer() {
            const {responsiveWidth} = this.state;
            return (
                <Fragment>

                    <NavBar/>
                    
                  
                 
                
                    <div className = "bot-mainContainer" style = {{maxWidth:responsiveWidth}}>
                        <Router history={this.props.history}>

                                <Switch>
                                    {appRoutes.map((prop,key) => {
                                        
                                        if (prop.redirect)
                                            return <Redirect from={prop.path} to={prop.to} key={key} />;
                                        
                                        return <Route 
                                                    
                                                    exact={prop.exact} 
                                                    path={prop.path} 
                                                    component={prop.component} 
                                                    key={prop.key} />;
                                                    
                                    })}
                                </Switch>
                            </Router>
                            <Alert stack={{limit: 1}}  timeout={2000} />
                    </div>

                </Fragment>
            )
        }


        // --------------------------------------
        // Render Component
        // --------------------------------------
        render() {
            const {isLoaded} = this.state;
            return isLoaded ? this.renderDashboardContainer() : this.renderLoader();
            // this.renderDashboardContainer()
        }
}


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
  

// --------------------------------------
// Export Component
// --------------------------------------
    export default DashboardContainer;