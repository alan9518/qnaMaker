/* ==========================================================================
** New QnA Question Component
** 21/03/2019
** Alan Medina Silva
** ========================================================================== */
// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import PropTypes from 'prop-types';
    import {NewQuestionInput, QnaQuestion, QnaAnswer, SingleButton } from '../../index'


// --------------------------------------
// Create Component Class
// --------------------------------------
    class NewQnaQuestion extends Component {
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
                    questions : this.props.questions || [],
                    currentQuestion : "",
                    currentAnswer : "",
                    showCurrenAnswer : false,
                    anwserContainerWidth : null,
                    questionContainerWidth : null,
                    editAnswer : false,
                    add: {"qnaList": []}
                }
            }
            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
            componentDidMount() {
            }


        /* ==========================================================================
        ** Handle State
        ** ========================================================================== */

            // --------------------------------------
            // Add Question to State
            // --------------------------------------
            addQuestion = ()=> {
                const {currentQuestion, questions} = this.state;

                const newQuestions = [...questions, currentQuestion];
                // console.log("TCL: NewQnaQuestion -> addQuestion -> newQuestions", newQuestions)
                this.setState({
                    questions : newQuestions,
                    currentQuestion : "",
                    questionContainerWidth : '250px'
                })
            }

            // --------------------------------------
            // Add New Question with Enter Key
            // --------------------------------------
            handleKeyPressQuestion = (event) => {
                if(event.key === 'Enter'){
                  
                    event.target.value !== ""  && this.addQuestion();
                }
            }


            // --------------------------------------
            // Add Anwser with Enter Key
            // --------------------------------------
            handleKeyPressAnswer = (event) => {
                if(event.key === 'Enter'){
                    
                    event.target.value !== "" && this.addAnwser();
                
                }
            }
            


            // --------------------------------------
            // Remove Question From State
            // --------------------------------------
            removeQuestionArrayItem = (event)=> {
                const {questions} = this.state;
                
                const itemToDelete = event.target.id;
				console.log("TCL: NewQnaQuestion -> removeQuestionArrayItem -> itemToDelete", itemToDelete)
                const newQuestions =  questions.filter((que)=> {return que !== itemToDelete})
				console.log("TCL: NewQnaQuestion -> removeQuestionArrayItem -> newQuestions", newQuestions)

                this.setState({questions : newQuestions})
			
                
                
            }


            // --------------------------------------
            // Add Anwser and Questions
            // --------------------------------------
            addAnwser = () =>{
                const {questions, currentAnswer, add} = this.state;
				// console.log("TCL: NewQnaQuestion -> addAnwser -> add", add)
                const qnaItem =  {
                    "id": 0,
                    "localID": null,
                    "answer": currentAnswer,
                    "source": "Editorial",
                    "questions": questions,
                    "metadata": []
                }

                // add.qnaList.push(qnaItem)
                // console.log("TCL: NewQnaQuestion -> addAnwser -> add", add);
                

                this.setState( {
                    currentAnswer : "",
                    questions : []
                    // add : add,
                })

                this.props.saveQuestionPair(qnaItem);
               
            }


            // --------------------------------------
            // Add Anwser and Questions HeroCard
            // --------------------------------------
            addAnswerHeroCard = () =>{
                const {questions} = this.state;
              

                this.props.saveQuestionPair(questions);
               
            }


            // --------------------------------------
            // Delete Kb item before Save
            // --------------------------------------
            onRemoveItem = (event)=> {
				console.log("TCL: NewQnaQuestion -> deleteItem -> event", event.target)
                console.log("TCL: NewQnaQuestion -> deleteItem -> state", this.state)
            }


            //? --------------------------------------
            //? Toggle betwen label and Input
            //? --------------------------------------
            // enableEditAnswer = (event)=> {
            //     console.log("TCL: QnaItem -> enableEditAnswer -> event", event)
            //     this.setState({
            //         editAnswer : true
            //     })
            // }




        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */


            


            // --------------------------------------
            // Resize Container Width
            // --------------------------------------
            resizeQuestionContainer = (event)=> {
                const {target} = event
                const {value} = target;
                // cthis.style.width = this.value.length + "ch";
                const newWidth = value.length > 20 ? (value.length + "ch" ) : '250px';
                this.setState({
                    currentQuestion : value,
                    questionContainerWidth : newWidth
                })
				// console.log("TCL: NewQnaQuestion -> resizeQuestionContainer -> target", event.target.value)
                
            }



            // --------------------------------------
            // Resize Container Width
            // --------------------------------------
            resizeAnswerContainer = (event)=> {
                const {target} = event
                const {value} = target;
                // cthis.style.width = this.value.length + "ch";
                const newWidth = value.length > 20 ? (value.length + "ch" ) : '250px';
                this.setState({
                    currentAnswer : value,
                    anwserContainerWidth : newWidth
                })
				// console.log("TCL: NewQnaQuestion -> resizeQuestionContainer -> target", event.target.value)
                
            }


            // --------------------------------------
            // Render Questions Added
            // --------------------------------------
            renderQuestionsAdded(questionsData) {
               return <div className="bot-questionsAddedContainer">
                {
                    questionsData && questionsData.map((question, index)=> {
                        return <QnaQuestion 
                            question = {question} 
                            onQuestionRemoved = {this.removeQuestionArrayItem} 
                            id = {index} 
                            key = {`newQuestion-${question}-${index}`}
                        />
                    })
                }
               </div>
            }



           

            // --------------------------------------
            // Render Projects
            // <NewQuestionInput questionValue = {this.state.currentQuestion} resizeInput = {this.renderNewQnaQuestion} index = {1}/>
            // --------------------------------------
            renderNewQnaQuestion() {

                const {questions, currentQuestion, currentAnswer, showCurrenAnswer,add} = this.state
                const {showAnswer} = this.props;
			
                return (
                    <div className = "bot-newQuestionContainer">
                        <div className="row">
                            <div className="col-md-6">
                                <h2>Questions</h2>
                                <NewQuestionInput 
                                    questionValue = {currentQuestion} 
                                    resizeInput = {this.resizeQuestionContainer} 
                                    containerWidth = {this.state.questionContainerWidth}
                                    index = {1}
                                    onKeyPress={this.handleKeyPressQuestion}
                                    
                                />

                                

                                {
                                    // If theres questions added, show Them
                                    questions && this.renderQuestionsAdded(questions)
                                }

                            </div>
                           {
                               showAnswer === true ?
                               <div className="col-md-6">
                                    <h2>New Answer </h2>
                                    <NewQuestionInput 
                                        questionValue = {currentAnswer} 
                                        resizeInput = {this.resizeAnswerContainer} 
                                        containerWidth = {this.state.anwserContainerWidth}
                                        index = {1}
                                        onKeyPress = {this.handleKeyPressAnswer}
                                        isAnswer = {true}
                                    />
                                    
                                    {
                                        // If there are questions added, show Them
                                        // Remove item that is not saved
                                        showCurrenAnswer && 
                                        <div>
                                            <QnaAnswer 
                                                answer =  {currentAnswer} 
                                                key = {currentAnswer}
                                                id = {currentAnswer}
                                                deleteItem = {this.props.onRemoveItem}
                                            />
                                                
                                        </div>
                                     
                                    }
                                </div>

                                :
                                <div className="col-md-6 bot-addHeroQuestionsContainer">
                                   {questions.length > 0 &&  <SingleButton buttonText = {"Save Card"} onClick = {this.addAnswerHeroCard} /> }   
                                </div>
                              
                           }
                        </div>

                    </div>
                )
            }


            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                return this.renderNewQnaQuestion();
            }
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    NewQnaQuestion.propTypes = {
        questions: PropTypes.array,
        saveQuestionPair : PropTypes.func,
        showAnswer : PropTypes.bool,
        onRemoveItem : PropTypes.func
    };
// --------------------------------------
// Export Component
// --------------------------------------
    export default NewQnaQuestion;