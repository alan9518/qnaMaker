/* ==========================================================================
** Table Header Layout
** 28/08/2019
** Alan Medina Silva
** ========================================================================== */



// --------------------------------------
// Get Dependences
// --------------------------------------
import React from 'react';
import {SingleButton, ProjectLink} from '../index'
import PropTypes from 'prop-types';
import './styles.css'

// --------------------------------------
// Create Functional Component
// --------------------------------------
const TableHeader = (props) => {
    const {showSaveButton, qnaDataLength, addNewQuestionClicked, source, showButtons} = props;
    // const addCardRoute = `add-card/${source}`
    return (
        <div className = 'bot-tableHeader' >
            <div className="row">
                <div className="col-md-12">
                    <div className="bot-filterContainer ">
                    
                        {/*<HeaderInput  name = {"search"} />*/}
                        {/*<span className = "bot-questionsCounter"> {qnaDataLength} QnA pairs between alls sources</span>*/}

                        <div className="bot-flexSeparator"></div>
                        {
                                showButtons === true && 

                            <div className="bot-buttonContainer">
                                <ProjectLink route = {`add-card?source=${source}`} >
                                    <SingleButton buttonText = {"Add Hero Card"} />
                                </ProjectLink>

                                
                                            
                                                {
                                                    // ? Toggle Between Add New Question / Cancel New Question
                                                    addNewQuestionClicked ===  false 
                                                        ? <SingleButton buttonText = {"Add Question"} onClick = {props.onClickAddNewQuestion.bind(source)} />
                                                        : <SingleButton buttonText = {"Cancel"} onClick = {props.hideNewQuestion} />
                                                }
                                                
                                                {
                                                    <SingleButton buttonText = {"Save Changes"} onClick = {props.saveNewQuestions} />
                                                }
                                        
                                
                            
                            </div>
                        }
                    </div>


                

                
                </div>
            </div>

        
        </div>
    )


}


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
TableHeader.propTypes = {
    saveNewQuestions: PropTypes.func,
    onClickAddNewQuestion : PropTypes.func,
    showSaveButton : PropTypes.bool
};
// --------------------------------------
// Export Component
// --------------------------------------
export default TableHeader;