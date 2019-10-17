/* ==========================================================================
** Follow Up Container Component
** 12/09/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import {QnaQuestion, NewFollowUpForm,   InlineButton, Modal, QnaContainer} from '../../index';
    
    import PropTypes from 'prop-types';




// --------------------------------------
// Create Component Class
// --------------------------------------
    class QnaFollowUp extends Component {
        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */


            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    isLoaded: false,
                    isShowing : false,
                    questions : [],
                    displayTextQuestion : '',
                    newFollowUpQuestions : []
                }
            }

            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
            componentDidMount() {
                const {followUpData} = this.props;

                this.setState({
                    questions : followUpData ? followUpData.prompts : [],
                    isLoaded : true
                })
            }


            
        /* ==========================================================================
        ** Handle State
        ** ========================================================================== */

          
                // ?--------------------------------------
                // ? Open Custom Modal
                // ?--------------------------------------

                openModalHandler = () => {
                    this.setState({
                        isShowing: true
                    });
                }


                // ?--------------------------------------
                // ? Close Custom Modal
                // ?--------------------------------------

                closeModalHandler = () => {
                    this.setState({
                        isShowing: false
                    });
                }



                // ?--------------------------------------
                // ? Change Display Text
                // ?--------------------------------------
                onDisplayTextChange = (event) => {
                    const {value} = event.target || event.currentTarget;
                    this.setState({displayTextQuestion : value})
                }



                // ?--------------------------------------
                // ? Add New Follow Up Question
                // ?--------------------------------------
                addNewFollowUp = (displayText, answer) => {
                    console.log("TCL: QnaFollowUp -> addNewFollowUp -> displayText", displayText)
                    console.log("TCL: QnaFollowUp -> addNewFollowUp -> answer", answer)
                    
                    // ? Create New Follow Up Object Structure
                    let newFollowUpItem = {
                        "displayText": displayText,
                        "displayOrder": 0,
                        "qna" : null,
                        "qnaId": answer.id
                    }

                    const {questions} = this.state;
                    const newQuestions = [...questions, newFollowUpItem];
                    console.log("TCL: QnaFollowUp -> addNewFollowUp -> newQuestions", newQuestions)

                    console.log("TCL: QnaFollowUp -> addNewFollowUp -> newFollowUpItem", newFollowUpItem)

                    // ? Update Questions List && Close Modal
                    this.setState({questions:newQuestions, isShowing: false})

                    // this.state
                    console.log("TCL: QnaFollowUp -> addNewFollowUp -> this.state", this.state)
                    

                    // ? Upda QnA Item
                    this.props.updateFollowUpQuestions(newFollowUpItem, 'addFollowUp');

                }



                // ?--------------------------------------
                // ? Rewmove Follow Up Question
                // ?--------------------------------------
                removeQuestionArrayItem = (questionToDelete) => {
                    // ? Remove Item from the list
                    const {questions} = this.state;

                    const newQuestions =  questions.filter((question) => {
                        return question.displayText !== questionToDelete.displayText
                    })

                    console.log("TCL: QnaFollowUp -> removeQuestionArrayItem -> newQuestions", newQuestions)


                    // ? Re render Questions List
                    this.setState({questions : newQuestions})


                    // ? Upda QnA Item on Props
                    this.props.updateFollowUpQuestions(questionToDelete, 'removeFollowUp');

                }

        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */


            // --------------------------------------
            // Render QnaFollowUp
            // --------------------------------------
            renderQnaFollowUp() {
                const {questions} = this.state;
        
                return (
                    <Fragment>

                    

                        {
                            questions && this.renderAddQuestionButton()
                        }


                        { 
                            this.state.isShowing &&  
                            <Modal
                                className="bot-modal"
                                show={this.state.isShowing}
                                close={this.closeModalHandler}
                                questionId = {this.props.questionID}>
                                    {
                                        <NewFollowUpForm 
                                            allQnaData = {this.props.allQnaData}
                                            cancelClick = {this.closeModalHandler}
                                            questionId = {this.props.questionID}
                                            newQuestionValue = {this.state.displayTextQuestion}
                                            onChange = {this.onDisplayTextChange}
                                            addNewFollowUp = {this.addNewFollowUp}
                                        />
                                            
                                    }
                            
                            </Modal>
                        }

                        {  
                            questions && questions.length > 0 && 
                            <div className="bot-followUpsContainer">

                                <h6> Follow Up Questions  </h6>

                                {
                                    questions.map((question, index) => {
                                    
                                    return    <QnaQuestion 
                                                    question={question.displayText} 
                                                    onQuestionRemoved={this.removeQuestionArrayItem.bind(this,question)} 
                                                    id = {`folowUpQuestion-${index}`}
                                                    key = {`folowUpQuestion-${question.displayText}-${index}`}
                                                    name = {`folowUpQuestion-${index}`}
                                                    // onQuestionDoubleClick = {this.editExistingQuestion.bind(this,question, true, false)}
                                                    // editQuestion = {question.editable}
                                                    // onBlur = {this.editExistingQuestion.bind(this,question, false, true)}
                                                    // onFocus = {this.onQuestionFocus.bind(this,question)}
                                                    // updateQuestion = {this.resizeQuestionContainer}
                                                    // newQuestionValue = {this.state.currentQuestion}
                                            />
                                    })

                                }

                                {this.renderAddQuestionButton()}
                            
                            </div>
                        }
                    
                    

                    </Fragment>
                )
            }


            // --------------------------------------
            // Render Add Follow Up Question
            // --------------------------------------
            renderAddQuestionButton() {
                return <InlineButton buttonText= {'+ Add follow-up prompt'} onClick = {this.openModalHandler}/> 
            }

            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                const {isLoaded} = this.state;
                return isLoaded && this.renderQnaFollowUp();
            }
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    QnaFollowUp.propTypes = {
        followUpData: PropTypes.object,
        updateFollowUpQuestions : PropTypes.func,
        questionID : PropTypes.number
    };
    
// --------------------------------------
// Export Component
// --------------------------------------
    export default QnaFollowUp;