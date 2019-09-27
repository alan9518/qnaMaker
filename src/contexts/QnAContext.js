/* ==========================================================================
** QnA Data Context ot have the questions available to all Components
** 17/09/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, createContext } from 'react';
    import PropTypes from 'prop-types';


// --------------------------------------
// Export Context
// --------------------------------------
    export const QnAContext =  createContext();


// --------------------------------------
// Class Component
// --------------------------------------
    class QnAContextProvider extends Component {


        // --------------------------------------
        // Set State based on QnaData from Props
        // --------------------------------------

        state = {
            qnaData : this.props.qnaData || [],
            dataUpdated : false

        }


        componentDidMount() {
            // this.props
            console.log("TCL: QnAContextProvider -> componentDidMount -> this.props", this.props)
        }


        // --------------------------------------
        // Render Context Provider with Option 
        // To render the Children Components
        // --------------------------------------
        render () {
            const {children} = this.props;
            
            return (
                <QnAContext.Provider  value = {{...this.state}}>
                    { children }
                </QnAContext.Provider>
            )
        }
    }


// --------------------------------------
// Export Component
// --------------------------------------
    export default QnAContextProvider;