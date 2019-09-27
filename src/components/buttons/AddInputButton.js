/* ==========================================================================
** Add Input Button
** 14/02/2019
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
    const AddInputButton = (props) => {
        const {buttonText, buttonClass, onClick, name } = props;
        return (
            <div className = {`bot-AddInputButtonContainer`} >
                <span 
                    className = "bot-buttonText"  
                    onClick = {onClick} 
                    id = {name}
                    name = {name}
                > 
                        +  {buttonText}
                </span>
            </div>
        )
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    AddInputButton.propTypes = {
        props: PropTypes
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default AddInputButton;