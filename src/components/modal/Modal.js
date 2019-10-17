/* ==========================================================================
** Custom Modal Component
** 12/09/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React from 'react';
    import PropTypes from 'prop-types';
    import './styles.css'



// --------------------------------------
// Create Functional Component
// --------------------------------------
    const Modal = (props) => {
        return (
            
                <div className="bot-modal-wrapper"
                    style={{
                        transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
                    <div className="bot-modal-header">
                        <h3>Follow-up prompt question {props.questionId}  </h3>
                        <span className="bot-close-modal-btn" onClick={props.close}>×</span>
                    </div>
                    <div className="bot-modal-body">
                        
                        {props.children}
                        
                    </div>
                     { /*
                        <div className="bot-modal-footer">
                        
                                <button className="bot-btn-cancel" onClick={props.close}>CLOSE</button>
                                <button className="bot-btn-continue">CONTINUE</button>
                            
                        </div>
                     */
                     }
                </div>
                
            
        )
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    Modal.propTypes = {
        show: PropTypes.bool,
        questionId :  PropTypes.number,
        close : PropTypes.func,
        children : PropTypes.any
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default Modal;