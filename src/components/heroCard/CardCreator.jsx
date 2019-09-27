/* ==========================================================================
** Card Creator Component
** 25/03/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import {SingleButton} from '../../components'
    import PropTypes from 'prop-types';
    
    import './styles.css';

// --------------------------------------
// Create Component Class
// --------------------------------------
    class CardCreator extends Component {

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
                }
            }


            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
            componentDidMount() {
                document.body.addEventListener("mousemove", this.cardHoverEffect);
            }



            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
            componentWillUnmount() {
                document.body.removeEventListener("mousemove", this.cardHoverEffect);
            }



            // --------------------------------------
            // Card Animation Event
            // --------------------------------------
            cardHoverEffect = (event)=> {
                // let bd = document.body;
                let card = document.querySelector(".card")

                let w = window.innerWidth / 2;
                    let x = event.clientX;
                    if (x > w + 100) { card.style.transform = "rotateY(4deg)"; }
                    if (x > w - 100 && x < w + 100) { card.style.transform = "rotateY(0deg)";}
                    if (x < w - 100) { card.style.transform = "rotateY(-4deg)"; }

                
            }



        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */
            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderCardCreator() {

                const { title, subtitle, description, redirect_link, image_link, button_text } = this.props;
                console.log("TCL: CardCreator -> renderCardCreator -> button_text", button_text)

                return (
                <Fragment>
                    <div className="card">
                    
                        <header>
                            <div className = 'card-title'>
                                <h1> {title} </h1>
                                <h4> {description} </h4>

                                
                         
                            </div>
                            <div className="imageContainer">
                                { image_link &&  <img src={image_link} alt="" className="img img-responsive" />}
                            </div>
                        </header>

                       
                        <footer>
                            <div className="cardBorder cardBottom">


                                <p> Action Link : <a href={redirect_link} target="_blank" rel="noopener noreferrer" > {redirect_link} </a> </p>


                                <div className="cardButtonContainer">
                                    {
                                        button_text && 
                                        <SingleButton buttonText = {button_text} small = {true}  />
                                    }
                                </div>


                                </div>

                        </footer>
                        
                    </div>
                </Fragment>
                )
            }


            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
                return this.renderCardCreator();
            }
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    CardCreator.propTypes = {
        props: PropTypes
    };
// --------------------------------------
// Export Component
// --------------------------------------
    export default CardCreator;