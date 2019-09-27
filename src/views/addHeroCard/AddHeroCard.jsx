/* ==========================================================================
** Add Hero Card Container
** 30/08/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences\
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import {CardCreator, SingleButton, HeroCardHeader, NewQnaQuestion} from '../../components';
    import axios from 'axios';
    import {Endpoints} from '../../services/Endpoints';
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';
    import PropTypes from 'prop-types';
    import { stringify } from 'querystring';


// --------------------------------------
// Create Component Class
// --------------------------------------
    class AddHeroCard extends Component {
        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */



            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    title : '',
                    add: {'qnaList': []},
                    description : '',
                    redirect_link : '',
                    button_text : '',
                    image_link : '',
                    isLoaded: false,
                }
            }
            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
            componentDidMount() {
            }


        


        /* ==========================================================================
        ** API Connection
        ** ========================================================================== */

            // ?--------------------------------------
            // ? Create Card Request Data
            // ?--------------------------------------
            saveCard = async (questions) => {
                console.log("TCL: AddHeroCard -> saveCard -> questions", questions)
                const {title, description, redirect_link, image_link, button_text, add} = this.state;

                const qnaAnswer =  {
                    "title": title,
                    "type": "adaptive",
                    "description": description,
                    "actionUrl": redirect_link,
                    "btnText":  button_text,
                    "imgUrl": image_link
                }

                  const qnaItem =  {
					
                    "id": 0,
                    "answer": JSON.stringify(qnaAnswer) ,
                    "source": "Editorial",
                    "questions": questions,
                    "metadata": []
                }
                  console.log("TCL: AddHeroCard -> saveCard -> qnaItem", qnaItem)


                add.qnaList.push(qnaItem);
                console.log("TCL: AddHeroCard -> saveCard -> add", add)


                await this.saveNewHeroQuestions(add)
            }




            //? --------------------------------------
            //? Update KB
            //? Save Hero Card
            //? --------------------------------------
            saveNewHeroQuestions = async ( addHeroItems )=> {
				console.log("TCL: AddHeroCard -> saveNewHeroQuestions -> addHeroItems", addHeroItems)
                // const {add} = this.state;
                // const deleteArray = this.state.delete;
                // console.log("TCL: KnowledgeBase -> saveNewQuestions -> add", add)
                
                const req = {
                    
                    'add': addHeroItems
                };
                

                console.log("TCL: KnowledgeBase -> saveNewQuestions -> req", req)


                try   {
                    const updateKBPromise = await axios.post(Endpoints.getBaseData, req) ;
                    const updateKBResponse = await updateKBPromise.data;

                    updateKBResponse && this.createSuccessAlert('Hero Card Created')
                    console.log("TCL: KnowledgeBase -> saveNewQuestions -> updateKBResponse", updateKBResponse)

                    const publishPromise = await this.publishKB();
                    const publishData = await publishPromise.data;
                    console.log("TCL: KnowledgeBase -> saveNewQuestions -> publishData", publishData)

                    updateKBResponse && this.createSuccessAlert('Kwnoledge Base Updated')

                    this.setState({
                        // isLoaded: false,
                        title : '',
                        add: {'qnaList': []},
                        description : '',
                        redirect_link : '',
                        button_text : '',
                        image_link : ''
                    })
    
                }
                catch(error) {
					console.log("TCL: AddHeroCard -> saveNewHeroQuestions -> error", error)
                    this.createErrorAlert('Error Creating Card')
                }
                
                
        }


        //? --------------------------------------
        //? Publish KB
        //? --------------------------------------
        async publishKB() {
            return axios.post(Endpoints.publishKB);
        }




        /* ==========================================================================
        ** Handle State
        ** ========================================================================== */

            // --------------------------------------
            // Control Text Inputs State
            // --------------------------------------
            onChangeInputs = (event) => {
                
                this.setState({
                    [event.target.name]: event.target.value
                })
                
            }



        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */

            
            // --------------------------------------
            // Show Error Message
            // --------------------------------------
            createErrorAlert = (message) => {
                
                Alert.error(message, {
                    position: 'top',
                    effect : 'slide',
                    timeout : 2000
                });
            }

            // --------------------------------------
            // Top Alert
            // --------------------------------------
            createErrorAlertTop= (message) => {
                Alert.error(message, {
                    position: 'bottom',
                    effect : 'slide',
                    timeout: 2000
                });
            }


            // --------------------------------------
            // Show Sucess Message
            // --------------------------------------
            createSuccessAlert = (message) => {
                
                Alert.info(message, {
                    position: 'top',
                    effect : 'slide',
                    timeout : 2000
                
                });
            }
            
            // --------------------------------------
            // Add New Question
            // Render Container
            // --------------------------------------
            addNewQuestion() {
                
                return (
                    <NewQnaQuestion saveQuestionPair = {this.saveCard} showAnswer = {false}/>
                )
            }


            
            // --------------------------------------
            // Render AddHeroCard
            // --------------------------------------
            renderAddHeroCard() {
                const {title, description, redirect_link, image_link, button_text} = this.state;
                return (
                    <Fragment>
                        <div className="container-fluid">
                                <div className="row bot-headerContainer">
                                    <div className="col-md-4">
                                        <h1> Create Hero Card </h1>
                                    </div>
                                </div>


                                

                               

                                <div className="row">

                                    <div className="col-md-6">
                                        
                                            <div className="form-group bot-formItem">
                                                <label htmlFor="tilte"> title </label>
                                                <input type="text"   className = "bot-headerInput"  value = {title} name = {"title"} onChange = {this.onChangeInputs} placeholder = 'This is the Card Title'/>
                                            </div>

                                           

                                            <div className="form-group bot-formItem">
                                                <label htmlFor="tilte"> Description </label>
                                                
                                                <textarea className = "bot-headerInput"  value = {description} name = {"description"} onChange = {this.onChangeInputs} cols="30" rows="10" placeholder = 'Card Detailed Description'></textarea>
                                            </div>




                                            <div className="form-group bot-formItem">
                                                <label htmlFor="tilte"> Redirect Link </label>
                                                <input type="text"   className = "bot-headerInput"  value = {redirect_link} name = {"redirect_link"} onChange = {this.onChangeInputs} placeholder = 'eg. https://docs.microsoft.com/es-es/azure/cognitive-services/face/overview'/>
                                            </div>


                                            <div className="form-group bot-formItem">
                                                <label htmlFor="tilte"> Image Link </label>
                                                <input type="text"   className = "bot-headerInput"  value = {image_link} name = {"image_link"} onChange = {this.onChangeInputs}/>
                                            </div>



                                            
                                            <div className="form-group bot-formItem">
                                                <label htmlFor="tilte"> Button Text </label>
                                                <input type="text"   className = "bot-headerInput"  value = {button_text} name = {"button_text"} onChange = {this.onChangeInputs}/>
                                            </div>


                                            
                                            
                                    </div>
                                    
                                    
                                    <div className="col-md-6">
                                        <CardCreator 
                                            title = {title} 
                                            description  = {description} 
                                            redirect_link = {redirect_link}
                                            image_link = {image_link}
                                            button_text = {button_text}/>
                                    </div>
                                    

                                </div>


                                <div className="row">
                                   
                                    <div className="col-md-12">
                                        {this.addNewQuestion()}
                                    </div>

                                </div>

                            

                            


                        </div>
                    </Fragment>
                )
            }


            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                return this.renderAddHeroCard();
            }
    }




// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    AddHeroCard.propTypes = {
        props: PropTypes
    };



// --------------------------------------
// Export Component
// --------------------------------------
    export default AddHeroCard;