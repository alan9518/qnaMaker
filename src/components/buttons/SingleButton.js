/* ==========================================================================
** Single Button
** 28/02/2019
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
const SingleButton = (props) => {
    const {buttonText, buttonClass, onClick, disbaledButton, small } = props;
    const disabledClass = !disbaledButton && 'bot-disabledLink';
    const sizeButtonClass = small ? 'bot-smallButton' : '' 
    return (
        <div 
            onClick = {onClick} 
            className = {`bot-singleButton ${sizeButtonClass}`}>
           <span className = "bot-buttonText">  {buttonText} </span>
        </div>
    )
}
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
SingleButton.propTypes = {
    buttonText : PropTypes.string,
    buttonClass : PropTypes.string,
    onClick : PropTypes.func,
    disbaledButton : PropTypes.bool,
    small : PropTypes.bool
};


// --------------------------------------
// Export Component
// --------------------------------------
export default SingleButton;