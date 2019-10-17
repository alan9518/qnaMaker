/* ==========================================================================
** Qna Item Component
** 28/03/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    
    import { QnaQuestion, QnaAnswer,  ActionButton, NewQuestionInput, QnaFollowUp, Modal } from '../index'
    import PropTypes from 'prop-types';

// --------------------------------------
// Create Component Class
// --------------------------------------

    class QnaItem extends Component {

        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */

            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    showNewQuestion: false,
                    currentQuestion: '',
                    questionContainerWidth: null,
                    questions : this.props.itemData.questions || [],
                    editAnswer : false,
                    currentAnswer : this.props.itemData.answer || '',
                    questionsEmpty : false,
                    modalShowing : false
                }
            }
            

        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */

            // ?--------------------------------------
            // ? Copy Prop Questions and add the
            // ? the Editable attribute
            // ? to locallty work
            // ?--------------------------------------
            componentDidMount () {
                let localQuestions = null;

                //? Set the edited Question as new value after KB Updated
                if(!Array.isArray(this.props.itemData.questions)) {
                    
                    console.log("TCL: QnaItem -> componentDidMount -> this.props.itemData.questions", this.props.itemData.questions)

                     localQuestions = this.props.itemData.questions.add.map((question) => {
                        return {
                            question : question,
                            editable : false
                        }
                    })

                   
                }
                else {
                    localQuestions = this.props.itemData.questions.map((question) => {
                        return {
                            question : question,
                            editable : false
                        }
                    })
                    
                }
             

             
                this.setState({
                    questions : localQuestions
                })
                
                
             

              

                

            }



        /* ==========================================================================
        ** Handle New Question State
        ** ========================================================================== */


                //? --------------------------------------
                //? Add Question to KB Item
                //? --------------------------------------
                addQuestiontoRow = (event) => {
                    console.log("TCL: QnaItem -> addQuestiontoRow -> event", event)
                    this.setState({ showNewQuestion: true})
                }

                // ?--------------------------------------
                // ? Cancel New Question if the focus
                // ? is lost from new Input
                // ?--------------------------------------
                onQuestionBlur = (questionID, event) => {
                    
                    this.addQuestion(questionID);
                    
                }   


                // ?--------------------------------------
                // ? Resize the Question Input when it 
                // ? gets Focused
                // ?--------------------------------------
                onQuestionFocus (question,id, event) {
                    console.log("TCL: QnaItem -> onQuestionFocus -> event", event)
                    event.target.style.width =  event.target.value.length + "ch";
                    this.setState({currentQuestion : question.question})
                }






                // ?--------------------------------------
                // ? Delete New Selected Question
                // ?--------------------------------------
                removeQuestionArrayItem = (currentQuestion, questionID) => {
                    console.log("TCL: QnaItem -> removeQuestionArrayItem -> currentQuestion", currentQuestion)
                
                    const {questions} = this.state;
                    
                    // ? Remove Question from array
                    const newQuestions = questions.filter(question => {return question !== currentQuestion });
                    
                    
                    // ? Check for Empty DataSet
                    this.setState({questions : newQuestions, questionsEmpty : newQuestions.length <= 0 ? true : false});

                    // ? Update Props


                    console.log("TCL: QnaItem -> removeQuestionArrayItem -> currentQuestion.question", currentQuestion.question)
                    let questionsToDelete = {
                        questionID : questionID,
                        question: currentQuestion.question
                        
                    }
                    console.log("TCL: QnaItem -> removeQuestionArrayItem -> questionsToDelete", questionsToDelete)

                    this.props.updateQnaItemData(questionsToDelete, 'removeQuestions');                    

                }

             

                //? --------------------------------------
                //? Resize Container Width
                //? --------------------------------------
                resizeQuestionContainer = (event)=> {
                    const {target} = event
                    const {value} = target;
                    // const newWidth = value.length > 20 ? (value.length + "ch" ) : '250px';


                    event.target.style.width =  event.target.value.length + "ch";

                    this.setState({
                        currentQuestion : value,
                    })

                 
                    
                }


        /* ==========================================================================
        ** Handle Current Questions From Data Set 
        ** ========================================================================== */

                //? --------------------------------------
                //? Toggle betwen label and Input
                //? --------------------------------------
                enableEditAnswer = (event)=> {

                    const {target} = event
           

                    this.setState({
                        editAnswer : true
                    })
                }

                // ?--------------------------------------
                // ? Save Answer Value on Input Change
                // ? Update Text Area Height
                // ?--------------------------------------

                onChangeAnswer = (event)=> {
                  
                    const {target} = event
                    const {value} = target;


                    // ? Update Height

                    let element = event.target;
                    setTimeout(function(){
                        element.style.cssText = 'height:auto; padding:0';
                        // for box-sizing other than "content-box" use:
                        // el.style.cssText = '-moz-box-sizing:content-box';
                        element.style.cssText = 'height:' + element.scrollHeight + 'px';
                    },0);
                    

                    this.setState({currentAnswer : value});
                }



                // ?--------------------------------------
                // ? Update TextArea Height
                // ?--------------------------------------
                updateTextAreaHegith = (event)=> {
                    let element = event;
                    setTimeout(function(){
                        element.style.cssText = 'height:auto; padding:0';
                        // for box-sizing other than "content-box" use:
                        // el.style.cssText = '-moz-box-sizing:content-box';
                        element.style.cssText = 'height:' + element.scrollHeight + 'px';
                    },0);
                }


        
                // ?--------------------------------------
                // ? Enable Current Question Edition
                // ?--------------------------------------

                editExistingQuestion = (currentQuestion , isFocused, editQuestionValue)=> {


                    if(!currentQuestion || currentQuestion === '')
                        return;

                    console.log("TCL: QnaItem -> editExistingQuestion -> currentQuestion", currentQuestion)
                    const {questions} = this.state;
                    console.log("TCL: QnaItem -> editExistingQuestion -> questions", questions)
                    
                    // ? index of the last question edited
                
                    let editedQuestionIndex = null;
                    const originalQuestion = currentQuestion.question;
                    console.log("TCL: QnaItem -> editExistingQuestion -> originalQuestion", originalQuestion)
                    
                    
                    const updatedQuestionsWithEdit = questions.map((question, index) => {
                        if (currentQuestion.question === question.question) {
                            question.editable = isFocused
                            question.question = editQuestionValue ===  true ? this.state.currentQuestion : question.question;
                            editedQuestionIndex =  index;

                        }
                        return question
                        
                    });

                    console.log("TCL: QnaItem -> editExistingQuestion -> editedQuestionIndex", editedQuestionIndex)

                    
                   
                    

                    //? Copy Object and Update Values to Send

                    let questionsData = updatedQuestionsWithEdit.map((question)=> {return question.question} )
                    let updatedQnaItem = Object.assign({}, this.props.itemData, {
                            questions : questionsData, 
                            questionToReplace : originalQuestion,  
                            newQuestionValue : currentQuestion.question,
                            newQuestionAdded : currentQuestion.newQuestion || false
                    })
                    console.log("TCL: QnaItem -> editExistingQuestion -> updatedQnaItem", updatedQnaItem)
                        // updatedQnaItem.questions = questionsData;
                        




                    console.log("TCL: QnaItem -> editExistingQuestion ->  updatedQnaItem",  updatedQnaItem)
                        

                    // ? Update Question Props on the blur event
                    if(editQuestionValue === true) {
                       
                        this.props.updateQnaItemData(updatedQnaItem, 'updateQuestions');
                        
                    }
                        
                    this.setState({
                        questions : updatedQuestionsWithEdit,
                        currentQuestion : ''
                    })



                    
                }


                
                // ?--------------------------------------
                // ? Resize the Question Input when it 
                // ? gets Focused
                // ?--------------------------------------
                onAnswerFocus = (answer, event)  => {
                    const {target} = event;
                    const {value} =  target
                    console.log("TCL: onAnswerFocus -> value", value)
                    
                    if(value.length >= 400) {
                        console.log("TCL: onAnswerFocus -> value.length", value.length)
                        target.style.height = (value.length / 2) + "ch" ;
                        console.log("TCL: onAnswerFocus -> target.style.height", target.style.height)
                    }
                    else
                    target.style.height = '140px'                    
                    
                    this.setState({currentAnswer : answer})
                }


                // ?--------------------------------------
                // ? Save Changes on Answer after 
                // ? Leaving the Input
                // ?--------------------------------------
                onAnswerBlur = (itemId, event) => {

                    console.log("TCL: onAnswerBlur -> itemId", itemId)
                    const {currentAnswer} = this.state;

                    if(currentAnswer === '')
                        return;

                    console.log("TCL: onAnswerBlur -> this.state", this.state);



                    this.props.updateAnswer(itemId, currentAnswer);

                    this.setState({editAnswer : false})
                    
                    
                }



                // ?--------------------------------------
                // ? Remove Qna Item Row
                // ?--------------------------------------
                onRemoveItem = (event) => {
                    const {source} = this.props;
                    const {id} = this.props.itemData;


                    this.props.onRemoveItem(id, source)
                }


                // ?--------------------------------------
                // ? Exit New Question Input
                // ?--------------------------------------
                exitQuestionOnBlur = (itemId, event) => {
                    console.log("TCL: exitQuestionOnBlur -> event", event)
                    console.log("TCL: exitQuestionOnBlur -> itemId", itemId)
                    const {value} =  event.target;

                    if(value === '') {
                        this.setState({ showNewQuestion: false})
                        return ;
                    }
                        

                }


                // ?--------------------------------------
                // ? Update QnaItem with New Follow Up Data
                // ?--------------------------------------
                updateFollowUpQuestions = (followUpData, action) => {
                    
                    console.log("TCL: QnaItem -> updateFollowUpQuestions -> this.props", this.props)
                    console.log("TCL: QnaItem -> updateFollowUpQuestions -> this.state", this.state)
                    console.log("TCL: QnaItem -> updateFollowUpQuestions -> followUpData", followUpData)

                    const {context} =  this.props.itemData || {};
                    let newContextValue = {}
                    let promptsToDelete = [];
                    let promptsToAdd = [];

                    if(action === 'addFollowUp') 
                        promptsToAdd.push(followUpData);

                    else
                        // ? Remove Prompts, only use the ID
                        promptsToDelete.push(followUpData.qnaId);

                        
                    // ? Update Context Prop 
                    newContextValue = Object.assign({}, context, {promptsToAdd : promptsToAdd, promptsToDelete : promptsToDelete })
                    console.log("TCL: QnaItem -> updateFollowUpQuestions -> newContextValue", newContextValue)

                    //? Add promptsToAdd to the Context Propery of the ItemData Object

                    const newQnaItem = Object.assign({}, this.props.itemData, {context : newContextValue});


                    console.log("TCL: QnaItem -> updateFollowUpQuestions -> newQnaItem", newQnaItem)

                    
                    if(newQnaItem.localID && newQnaItem.id === 0)
                    // ? Update Prompts of question to Add
                        this.props.updateQnaDataPromptsNewQuestions(newQnaItem, action, followUpData);
                    else
                    // ? Update Questions from Dta Source
                        this.props.updateQnaItemData(newQnaItem, action, followUpData);

                    
                    

                    
                    
                    
                }
               
    

        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */

            // --------------------------------------
            // Render New Question Input 
            // inside the Row
            // --------------------------------------
            renderNewQuestionInput(questionID) {
                console.log("TCL: renderNewQuestionInput -> questionID", questionID)
                
                return (
                    <NewQuestionInput 
                        questionValue = {this.state.currentQuestion} 
                        resizeInput = {this.resizeQuestionContainer} 
                        index = {1}
                        onKeyPress={this.handleKeyPressQuestion.bind(this,questionID)}
                        onBlur = {this.exitQuestionOnBlur.bind(this,questionID)}
                        onClick = {this.deleteNewQuestion}
                    />


                )
            }

            // --------------------------------------
            // Add Question to State
            // --------------------------------------
            addQuestion = (questionID) => {
                const { currentQuestion, questions } = this.state;
                
                if(!currentQuestion || currentQuestion === '') {

                    this.setState({ showNewQuestion : false})
                    return;
                    
                }
                    
                
                // ? Create New Quesrion Object
                let newQuestionObject = {question : currentQuestion, editable : false, newQuestion : true};
                
                
                const newQuestions = [...questions, newQuestionObject];
                

				
              
                //! Call the Props Method to Update the Parents Kb Data

                let questionsDataToUpdate = {
                    questionID : questionID,
                    questions : newQuestions.map(question => question.question),
                    newQuestion : currentQuestion
                }


                this.setState({
                    questions: newQuestions,
                    currentQuestion: "",
                    // questionContainerWidth: '250px',
                    questionsEmpty : newQuestions.length <= 0 ? true : false,
                    showNewQuestion : false
                })


                this.props.updateQnaItemData(questionsDataToUpdate, 'addQuestions');

            }


            // --------------------------------------
            // Add New Question with Enter Key
            // --------------------------------------
            handleKeyPressQuestion = (questionID, event) => {
                if (event.key === 'Enter') 
                    this.addQuestion(questionID);
                else
                    return;
                    
                
            }


            // --------------------------------------
            // Edit Question with Enter key
            // --------------------------------------
            handleKeyPressQuestionEdit = ( currentQuestion , isFocused, editQuestionValue,  event) => {
               
                if (event.key === 'Enter')     
                   this.editExistingQuestion(currentQuestion, isFocused, editQuestionValue);
                else return;
            }



            // --------------------------------------
            // Map Questions
            // --------------------------------------
            renderQuestions(questionsData, allowEdition) {
                
                const {id,localID} = this.props.itemData;
                let qnaItemID = localID ? localID : id;

                if(!Array.isArray(questionsData)) {
                    return null;
                }
                    

                return questionsData && questionsData.map((question, index) => {

                    return (
                            <QnaQuestion 
                                question={question.question} 
                                onQuestionRemoved={allowEdition ===  true &&  this.removeQuestionArrayItem.bind(this,question, qnaItemID)} 
                                key = {`question-${qnaItemID}-${index}`}
                                id = {`question-${qnaItemID}-${index}`}
                                name = {`question-${qnaItemID}-${index}`}
                                onQuestionDoubleClick = {this.editExistingQuestion.bind(this,question, true, false)}
                                onKeyPress = {this.handleKeyPressQuestionEdit.bind(this,question, false, true)}
                                editQuestion = { allowEdition ===  true ?  question.editable : false}
                                onBlur = {this.exitQuestionOnBlur.bind(this,question)}
                                onFocus = {this.onQuestionFocus.bind(this,question, qnaItemID)}
                                updateQuestion = {this.resizeQuestionContainer}
                                newQuestionValue = {this.state.currentQuestion}
                                allowEdition = {allowEdition}
                            />
                        )
                })
            }


            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderQnaItem() {
                const { showNewQuestion, questions, editAnswer, currentAnswer, questionsEmpty } = this.state
                const { itemData, id, source } = this.props;
                
                let allowEdition =  source === 'Editorial' ?  true : false;
             
                let borderClass = '';
                 
                if(itemData.id === 0 )
                    borderClass = 'bot-newQuestion';
                else if (id !== 0 && questionsEmpty === true)
                    borderClass = 'bot-emptyError';
                else
                    borderClass = '';

                let rowContainerClass = `bot-qnaRow row ${borderClass}` 
                


                let qnaItemID = (itemData.localID && itemData.id === 0) ? itemData.localID : itemData.id;

                if(itemData.localID)
                    console.log("TCL: renderQnaItem -> itemData.localID", itemData.localID)
                    

                return (
                    <Fragment>
                        <div className = {rowContainerClass} key = {id}>

                            <div className="col-md-6">
                                <h5> Questions </h5>
                                <h6> ID : {qnaItemID} </h6>
                                {
                                    // ? Display Questions Array Empty Message
                                    questionsEmpty === true && <span style = {{color : 'red'}}> The questions set cant be empty   </span>
                                }



                                <div className="bot-editQuestionItemContainer" >

                                    {
                                        // ? Iterate & Render Questions
                                        this.renderQuestions(questions, allowEdition)
                                    }

                                    {
                                        // ? Add New Question to the Current Row
                                        showNewQuestion && this.renderNewQuestionInput(qnaItemID)
                                    }
                                   { allowEdition &&  <ActionButton id={itemData.id} icon={"add"} onClick={this.addQuestiontoRow} />}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h5> Answer </h5>
                                <QnaAnswer 
                                    answer = {currentAnswer} 
                                    id = {itemData.id} 
                                    key = {`ans-${itemData.id}`} 
                                    deleteItem = {this.onRemoveItem} 
                                    editAnswer = {allowEdition === true ? editAnswer : false} 
                                    onChangeAnswer = {this.onChangeAnswer}
                                    onDoubleClick = {this.enableEditAnswer}
                                    resizeInput = {this.resizeQuestionContainer} 
                                    onBlur = {this.onAnswerBlur.bind(this, qnaItemID)}
                                    onFocus = {this.onAnswerFocus.bind(this, currentAnswer)}
                                    allowEdition = {allowEdition}
                                />
                                
                                {
                                    // ? Render Follow Up Questions
                                    allowEdition === true && itemData.id !== 0 && <QnaFollowUp 
                                        followUpData = {itemData.context}  
                                        questionID = {itemData.id} 
                                        // key = {`followUp-${itemData.id}`}
                                        allQnaData = {this.props.allQnaData}
                                        updateFollowUpQuestions = {this.updateFollowUpQuestions}
                                    />
                                        
                                }
                            </div>

                        </div>


                    </Fragment>
                )
            }
            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                return this.renderQnaItem();
            }
    }

// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 

    QnaItem.propTypes = {
        itemData: PropTypes.object,
        onRemoveItem : PropTypes.func
    };

// --------------------------------------
// Export Component
// --------------------------------------

    export default QnaItem;