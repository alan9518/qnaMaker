/* ==========================================================================
 * Custom Loader Component
 * Using react-loader-spinner
 * 30/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React  from "react";
    import PropTypes from "prop-types";
    import Loader from 'react-loader-spinner';
    import './styles.css';

// --------------------------------------
// Create Component
// --------------------------------------    
    const Apploader = (props) => {  
        const {customHeight} = props;
        return (
            <div className="xpl-loaderContainer" style = {{minHeight : customHeight}}>
                <div className="xpl-loaderHolder">
                    <Loader
                        type = "Puff"
                        color = "#1197D3"
                        height = {80}
                        width = {80}
                    ></Loader>
                </div>
            </div>
        )
    }   

    
    // --------------------------------------
    // Props types
    // --------------------------------------  
    Apploader.propTypes = {
        customHeight : PropTypes.string
    }
    
    // --------------------------------------
    // Default Props
    // --------------------------------------  
    Apploader.defaultProps = {
        customHeight : '100vh'
    }


// --------------------------------------
// Export Component
// --------------------------------------
    export default Apploader;