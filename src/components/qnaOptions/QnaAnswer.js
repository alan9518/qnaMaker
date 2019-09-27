/* ==========================================================================
** QnA Answer Item
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
    const QnaAnswer = (props) => {
        const {answer, id, deleteItem, editAnswer, onChangeAnswer, onDoubleClick} = props;
        // console.log("TCL: QnaAnswer -> props", props)
        
    
        
        return (
            <div className = "bot-qnaAnswerContainer">
            
            <div onDoubleClick = {onDoubleClick} style = {{width : '100% !important', marginBottom:20}} className = 'bot-fullWidth'>
                {
                        editAnswer === true 
                        ? 
                            <div className="bot-qnaEditableAnswerContainer">
                                <textarea 
                                    className = "bot-qnaEditableAnswer" 
                                    style = {{zIndex : 200 }}
                                    autoFocus 
                                    value = {answer} 
                                    onBlur={props.onBlur}
                                    onFocus={props.onFocus}
                                    onChange = {onChangeAnswer}> 
                                </textarea>  
                            </div> 
                        :   <p className = "bot-answerText">{answer}</p>
                    }
            </div>

                <span className="m-tooltip">
        
                    <span 
                        aria-label="Delete question" 
                        className="bot-cancelButtonQuestion bot-deleteButton" 
                        event-action="Delete question" 
                        event-category="Knowledgebase table" role="button" tabIndex="0">

                        <i className="material-icons" onClick = {deleteItem} id = {id}> delete_outline</i>
                    </span>
                </span>

            </div>
        )
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    QnaAnswer.propTypes = {
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        answer: PropTypes.string,
        id: PropTypes.number,
        deleteItem : PropTypes.func,
        editAnswer : PropTypes.bool,
        onChangeAnswer : PropTypes.func,
        onDoubleClick : PropTypes.func
     
    };


// --------------------------------------
// Export Component
// --------------------------------------
export default QnaAnswer;