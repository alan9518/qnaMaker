/* ==========================================================================
** NavBar Layout Component
** 28/08/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import {ProjectLink} from '../index'
    import PropTypes from 'prop-types';


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const NavBar = (props) => {
        return (
            <div >
                <nav className="navbar navbar-expand-lg navbar-dark  bot-dark">
                    <ProjectLink route = {`/`} >
                        <span className="navbar-brand" href="#"> QnA Maker</span>
                    </ProjectLink>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                
                </nav>
            </div>
        )
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
  

// --------------------------------------
// Export Component
// --------------------------------------
    export default NavBar;