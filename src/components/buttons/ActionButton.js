/* ==========================================================================
** Action Icon Button Layout Component
** 28/03/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const ActionButton = (props) => {
        const {id, onClick, icon} = props;
        return (
            <span 
                aria-label="Add question" 
                className="bot-cancelButtonQuestion" 
                event-action="Delete question" 
                event-category="Knowledgebase table" role="button" tabIndex="0">
                
                <i className="material-icons" id = {id} onClick = {onClick}>{icon}</i>
            </span>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
ActionButton.propTypes = {
    id : PropTypes.number,
    onClick : PropTypes.func,
    icon : PropTypes.string,
    
};
// --------------------------------------
// Export Component
// --------------------------------------
export default ActionButton;