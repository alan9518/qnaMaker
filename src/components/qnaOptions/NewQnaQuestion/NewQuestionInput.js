/* ==========================================================================
** New Question Container Input
** 21/03/2019
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
    const NewQuestionInput = (props) => {
        
        const {isAnswer}  =  props;
        
        const containerStyles =  {
            width : props.containerWidth ? props.containerWidth : '250px'
            // width : '250px'
        }

        return (
            <React.Fragment>

            {
                isAnswer 
                ?
                    <div style ={{padding : 15}}>
                            <textarea 
                                className = "bot-qnaEditableAnswer" 
                                style = {{zIndex : 200 }}
                                autoFocus 
                                onChange = {props.resizeInput}  
                                onKeyPress = {props.onKeyPress}
                                value = {props.questionValue} 
                                onBlur = {props.onBlur}
                                placeholder = {'New Answer'}
                                name = {`question-${props.index}`} > 
                            </textarea>  
                        </div> 

                :

                    <div className = "bot-questionContainer" >
                        <div className="bot-questionAdd "  style = {containerStyles}>
                            
                            
                                    <input 
                                        type="text"  
                                        autoFocus
                                        style = {containerStyles}
                                        className = "bot-questionInput"
                                        onChange = {props.resizeInput}  
                                        onKeyPress = {props.onKeyPress}
                                        value = {props.questionValue} 
                                        onBlur = {props.onBlur}
                                        placeholder = {'New Question'}
                                        // onFocus = {((event)=>{event.target.style.width =  event.target.value.length + "ch";} )}
                                        name = {`question-${props.index}`} 
                                    />
                            
                        </div>
                    </div>

            }

                
               
               
            </React.Fragment>
        )
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    NewQuestionInput.propTypes = {
        props: PropTypes
    };

// --------------------------------------
// Export Component
// --------------------------------------
    export default NewQuestionInput;