/* ==========================================================================
** New Follow Up Question Form
** 12/09/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, {useState} from 'react';
    import { SingleButton, QuestionsFilter } from '../../index';
    import PropTypes from 'prop-types';


// --------------------------------------
// Create Functional Component
// --------------------------------------
    const NewFollowUpForm = (props) => {

        

        const [displayText, setDisplayText ] = useState('');
        const [answer, setAnswer ] = useState({});
        

        // --------------------------------------
        // Send Display Text and Answer to Parent
        // --------------------------------------
        const handleSubmit = (event) => {
            event.preventDefault();
            props.addNewFollowUp(displayText, answer)
        }


        // --------------------------------------
        // Get Answer Value from QuestionsFilter
        // --------------------------------------

        const setAnswerValue = (answerText, answer) => {
            console.log("TCL: setAnswerValue -> answer", answer)
            setAnswer(answer)
        }

        return (
            
            <div className = "bot-formInfoContainer">

                <div className="bot-formInfo">
                    <span>
                        Follow-up prompts can be used to guide the user through a conversational flow. 
                        Prompts are used to link QnA pairs and can be displayed as buttons or suggested actions in a bot.
                    </span>
                </div>

                <form className = "bot-newFollowForm" >
                    <div className="form-group">
                        <label for="displayText">Display Text *</label>
                        <input 
                                type="text" 
                                className="form-control" 
                                id = "displayText" 
                                value = {displayText}
                                aria-describedby = "displayHelp" 
                                onChange = { (event) => setDisplayText(event.target.value) }
                                placeholder = "Text for a button or question"
                                required
                            />
                        
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Link to answer *</label>
                        <QuestionsFilter 
                                questionId = {props.questionId}
                                onAnswerClick = {setAnswerValue}
                            />
                        
                    </div>


                    <div className="form-group">

                        <div className="bot-formButtonsContainer">
                            
                            <SingleButton buttonText = {"Save"} onClick = {handleSubmit}/>

                            <SingleButton buttonText = {"Cancel"} onClick = {props.cancelClick}/>
                            
                        </div>

                    </div>
                 
                    
                </form>

            </div>
        )
    }



// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    NewFollowUpForm.propTypes = {
        props: PropTypes
    };



// --------------------------------------
// Export Component
// --------------------------------------
export default NewFollowUpForm;