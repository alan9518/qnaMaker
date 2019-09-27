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
    const AppButton = (props) => {
        const {buttonText, buttonClass, onClick, disbaledButton } = props;
        const disabledClass = !disbaledButton && '.bot-disabledLink';
        return (
            <div className = {`bot-appButtonContainer bot-${buttonClass} ${disabledClass}`} onClick = {onClick} >
                <span className = "bot-buttonText"> {buttonText} </span>
            </div>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    AppButton.propTypes = {
        props: PropTypes
    };
// --------------------------------------
// Export Component
// --------------------------------------
    export default AppButton;