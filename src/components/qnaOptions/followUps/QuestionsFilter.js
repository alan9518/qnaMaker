    /* ==========================================================================
** Questios Filter Component Class
** Using React Context
** 17/09/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component } from 'react';
    import { QnAContext } from '../../../contexts/QnAContext';


// --------------------------------------
// Component Class
// --------------------------------------

    class QuestionsFilter extends Component {


        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */

            // --------------------------------------
            // Set Reference to React Context
            // --------------------------------------
            static contextType = QnAContext;


            // --------------------------------------
            // Set Component State
            // --------------------------------------

            state = {
                currentAnswers : [],
                filterValue : '',
                selectedAnswer : {}
            }


        /* ==========================================================================
        ** Handle State
        ** ========================================================================== */


            // --------------------------------------
            // Filter Questions
            // --------------------------------------

            filterQuestions = (event) => {
                const { qnaData } = this.context;
                
                let filteredAnswers = [];

                const {value} = event.target || event.currentTarget;

                // ? Filter Values
                if(value) {
                    filteredAnswers = qnaData.filter((qnaItem) => {
                        return (qnaItem.answer).toLowerCase().indexOf((value).toLowerCase()) >= 0
                    })

                }
                else filteredAnswers = [];


                console.log("TCL: QuestionsFilter -> filterQuestions -> filteredAnswers", filteredAnswers)
                // return filteredAnswers;

                    
                this.setState({
                    filterValue : value,
                    currentAnswers : filteredAnswers
                })
            }



            // --------------------------------------
            // Add Bold to filtered answers
            // Based on the Filter word
            // --------------------------------------
            addBoldText(stringValueResult, filterValue) {
                console.log("TCL: QuestionsFilter -> addBoldText -> stringValueResult", stringValueResult)
                // return stringValueResult.indexOf(filterValue).bold();

                return stringValueResult
            }


            // --------------------------------------
            // Set Selected Answer
            // --------------------------------------

            onAnswerClick = (asnwer, event) => {
                console.log("TCL: QuestionsFilter -> onAnswerClick -> event", event)
                console.log("TCL: QuestionsFilter -> onAnswerClick -> asnwer", asnwer)
                const {id} = event.target || event.currentTarget;
                // ? set Selected State to selected Quertions
                document.getElementById(id).className = document.getElementById(id).classList + 'selected'
                this.setState({
                    filterValue : id,
                    selectedAnswer : asnwer
                })

                this.props.onAnswerClick(id, asnwer)
            }


        /* ==========================================================================
        ** Render Component
        ** ========================================================================== */


            // --------------------------------------
            // Render List of Answers
            // --------------------------------------

            renderAnswerList() {
                const {currentAnswers, filterValue} = this.state;
                
                if(currentAnswers.length <= 0)
                    return null;

                return (
                    <ul className = "bot-answerResultList">
                      
                        {
                            currentAnswers.map((answer) => {
                                let itemClass = filterValue === answer.answer ? 'bot-answerResultItem selected' : 'bot-answerResultItem'
                                return <li 
                                        key = {`asnwer-${answer.id}`} 
                                        className = {itemClass} 
                                        id = {answer.answer}
                                        onClick = {this.onAnswerClick.bind(this, answer)}> 
                                            {answer.answer}   
                                    </li>
                            })
                        }
                    </ul>
                )

            }



            // --------------------------------------
            // Render Search Area
            // --------------------------------------
            render() { 

                const {filter,filterValue, } = this.state;
                const {questionId} = this.props;
                
                
                

                
                return (
                    <div className="bot-questionsFilterContainer">
                        <textarea 
                            className="form-control" 
                            name = {`filter-asnwer${questionId}`} 
                            id = {`filter-asnwer${questionId}`} 
                            cols="30" 
                            rows="5" 
                            value = {filterValue}
                            onChange = {this.filterQuestions}
                            placeholder = "Search for an existing anwser or question"
                            required>
                        </textarea>


                        {
                            this.state.currentAnswers.length > 0 &&
                            <div className="bot-questionsResultContainer">
                                <h6> Answers  </h6>
                                
                                    {this.renderAnswerList()}
                                
                            </div>
                        }

                    </div>
                )
            
            }
    }
 


// --------------------------------------
// Export Component
// --------------------------------------   
    export default QuestionsFilter;