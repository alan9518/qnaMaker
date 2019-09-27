/* ==========================================================================
** Inline Button
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
    const InlineButton = (props) => {
        const {buttonText, buttonClass, onClick, disbaledButton, small } = props;
        const disabledClass = !disbaledButton && 'bot-disabledLink';
        const sizeButtonClass = small ? 'bot-smallButton' : '' 
        return (
            <div 
                    aria-label="Add new QnA as prompt" 
                    className="bot-add-prompt-button" 
                    onClick = {props.onClick}
                    event-action="Add new Prompt" 
                    event-category="Knowledgebase table" 
                    preventclick="" 
                    role="button" 
                    tabIndex="0" >
                <div className="m-icon-Add add-new-prompt"></div>
                <span className="bot-add-prompt-label"> {buttonText}  </span>
            </div>
        )
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    InlineButton.propTypes = {
        buttonText : PropTypes.string,
        buttonClass : PropTypes.string,
        onClick : PropTypes.func,
        disbaledButton : PropTypes.bool,
        small : PropTypes.bool
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default InlineButton;