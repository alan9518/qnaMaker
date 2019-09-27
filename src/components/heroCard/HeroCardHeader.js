/* ==========================================================================
** Hearo Card Header Layout
** 13/03/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React  from 'react';
    import {HeaderInput, SingleButton,ProjectLink} from '../index'
    import PropTypes from 'prop-types';


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const HeroCardHeader = (props) => {
        return (
            <div className = 'bot-tableHeader' >
                <div className="row">
                    <div className="col-md-12">
                        <div className="bot-filterContainer ">
                        
                            
                            {/*<span className = "bot-questionsCounter"> 395 </span>*/}

                            <div className="bot-flexSeparator"></div>

                            <div className="bot-buttonContainer">
                                <ProjectLink route = {'/'} >
                                    <SingleButton buttonText = {"My Knowledge base"} />
                                </ProjectLink>
                                
                            </div>
                        </div>


                    

                    
                    </div>
                </div>

            
            </div>
        )


    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    HeroCardHeader.propTypes = {
        props: PropTypes
    };
// --------------------------------------
// Export Component
// --------------------------------------
    export default HeroCardHeader;