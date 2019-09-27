/* ==========================================================================
** App Button Layuout Container
** 28/01/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';
    import './styles.css';

// --------------------------------------
// Create Functional Component
// --------------------------------------
    const PaginationButton = (props) => {
        const {buttonIcon, buttonClass, onClick  } = props;
        // const disabledClass = !disbaledButton && '.bot-disabledLink';
        return (
            <div className = {`bot-${buttonClass}` } onClick = {onClick} >
                
                <i className = {buttonIcon}></i>
                
            </div>
        )
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    PaginationButton.propTypes = {
        buttonIcon : PropTypes.string, 
        buttonClass : PropTypes.string,  
        onClick : PropTypes.func,

    };
    
// --------------------------------------
// Export Component
// --------------------------------------
    export default PaginationButton;