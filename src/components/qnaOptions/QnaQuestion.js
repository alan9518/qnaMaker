/* ==========================================================================
** QNA Option Item
** 19/03/2019
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
    const QnaQuestion = (props) => {
        const {question, id, newQuestionValue, editQuestion, onKeyPress, onQuestionDoubleClick, updateQuestion, name, allowEdition} = props;
        
        
        return (
            <div className = "bot-questionContainer"  name = {name} >
                <div className="bot-questionEdit" onDoubleClick = {onQuestionDoubleClick}>
                    
                    {
                        editQuestion === true 
                        ? <input 
                                type="text" 
                                value = {newQuestionValue || question} 
                                onChange = {updateQuestion} 
                                onKeyPress = {onKeyPress}
                                name = {question} 
                                onBlur = {props.onBlur} 
                                onFocus = {props.onFocus} 
                                style = {{minWidth: 150, border:'none' }}
                                autoFocus
                            /> 
                        : <span className = "bot-questionText"  >{question}</span>
                    }
                </div>
                <div> 
                  { 
                    
                        <span 
                            aria-label="Delete question" 
                            className="bot-cancelButtonQuestion" 
                            event-action="Delete question" 
                            event-category="Knowledgebase table" role="button" tabIndex="0">

                           {allowEdition && <i className="material-icons" id = {question} onClick = {props.onQuestionRemoved}>close</i>}
                        </span>
                    }
                </div>
            </div>
        )
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    QnaQuestion.propTypes = {
        question : PropTypes.string,
        // id : PropTypes.number,
        newQuestionValue : PropTypes.string,
        editQuestion : PropTypes.bool,
        onQuestionDoubleClick : PropTypes.func,
        updateQuestion : PropTypes.func,
        name : PropTypes.string
    };



// --------------------------------------
// Export Component
// --------------------------------------
export default QnaQuestion;