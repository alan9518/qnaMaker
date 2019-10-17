/* ==========================================================================
** QnA Question & Answer Container
** 19/03/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    // import {QnaQuestion, QnaAnswer, QnaItem, NewQuestionInput} from '../index'
    import { QnaItem, } from '../index'
    import PropTypes from 'prop-types';
    import './styles.css';


// --------------------------------------
// Create Component Class
// --------------------------------------
    class QnaContainer extends Component {

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
                    qnaData : [],
                    showNewQuestion : false,
                    editQuestion : false,
                    newQuestions : {
                        currentItem : 0,
                        questions : []
                    }
                }
            }
           

            /* ==========================================================================
            ** Handle State
            ** ========================================================================== */



         


            // ?--------------------------------------
            // ? Update Qna Data 
            // ?--------------------------------------

            updateQnaItemData = (updatedQnaItem, action, followUpDataToRemove = null) => {
                // console.log("TCL: QnaContainer -> updateQnaItem -> id", id)
                console.log("TCL: QnaContainer -> updateQnaItemData -> updatedQnaItem", updatedQnaItem)
                this.props.updateQnaItemData(updatedQnaItem, action, followUpDataToRemove)

            }


            updateQnaDataPromptsNewQuestions = (updatedQnaItem, action, followUpDataToRemove = null) => { 
                console.log("TCL: QnaContainer -> updateQnaDataPromptsNewQuestions -> updatedQnaItem", updatedQnaItem)
                this.props.updateQnaDataPromptsNewQuestions(updatedQnaItem, action, followUpDataToRemove);
            }




            updateAnswerData = (itemID, newAnswerValue) => {
                console.log("TCL: QnaContainer -> updateAnswerData -> newAnswerValue", newAnswerValue)

                this.props.updateAnswer(itemID, newAnswerValue)
                
            }


        
          


        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */


        
        
            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderQnaContainer() {
            
                const {qnaData, id, source} = this.props;

                

                return (
                    qnaData && qnaData.map((qnaItem, index)=> {

                        let itemID = (qnaItem.localID && qnaItem.id === 0) ? qnaItem.localID : qnaItem.id
                           
                        return (
                                <Fragment key = {`questionItem-${itemID}`} >
                                    <div className="bot-qnaContainer" >

                                        <QnaItem  
                                            itemData = {qnaItem}  
                                            onRemoveItem = {this.props.onRemoveItem} 
                                            source = {source}
                                            allQnaData = {this.props.allQnaData}
                                            updateQnaItemData = {this.updateQnaItemData.bind(this)}
                                            updatedQnaItemContextPrompts = {this.updatedQnaItemContextPrompts}
                                            updateQnaDataPromptsNewQuestions = {this.updateQnaDataPromptsNewQuestions.bind(this)}
                                            updateAnswer = {this.updateAnswerData}
                                            allowEdition = {this.props.alllowEdition}
                                        />

                                    </div>
                                </Fragment>
                        )
                    })
                )
                

                
            }


            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                
                return this.renderQnaContainer();
            }
    }

// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    QnaContainer.propTypes = {
        qnaData: PropTypes.array,
        onRemoveItem : PropTypes.func,
        source : PropTypes.string
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default QnaContainer;