/* ==========================================================================
** Sharepoint Context Available for the whole app
** using pnp package
** 14/10/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Import Depenedences
// --------------------------------------   '
    import React, {createContext, Component} from 'react';
    import { sp ,CurrentUser} from "@pnp/sp";
    

// --------------------------------------
// Export Context
// --------------------------------------   
    export const SharepointContext = createContext();


// --------------------------------------
// Create Component that controls context
// --------------------------------------

    class SharepointContextProvider extends Component{

        // --------------------------------------
        // Define State and Init SP
        // --------------------------------------

        constructor(props) {
            super(props)
           
            sp.setup({
                sp: {
                  headers: {
                    Accept: "application/json;odata=verbose",   
                  },
                  baseUrl: process.env.REACT_APP_SP_STATIC_PATH
                }
            });

            this.state = {
                isUserLogged : false,
                useSP : sp ? true : false,
                userData :  {
                    user_ID: 0,
                    user_email: '',
                    user_name: '',
                }
            }
        }


        // --------------------------------------
        // Set SP Context
        // --------------------------------------

        componentWillMount() {
            this.setUserData();
        }

      
        // --------------------------------------
        // GET user Data
        // --------------------------------------
        async setUserData() {
          const {useSP} = this.state;
          
            if( useSP ) {
                
                const userData  = await sp.web.currentUser.get();
                console.log("TCL: SharepointContextProvider -> setUserData -> userData", userData)
                this.setState({
                    isUserLogged : true,
                    userData :  {
                        user_ID: userData.Id,
                        user_email: userData.Email,
                        user_name: userData.Title
                    }
                })
                  
            }
            else {
                this.setState({
                    isUserLogged : true,
                    userData :  {
                        user_ID: 13,
                        user_email: 'alan.medina@flex.com',
                        user_name: 'alan Medina'
                    }
                })
            }

        }


        // --------------------------------------
        // Render Content 
        // --------------------------------------

        render () {
            
            return (
                <SharepointContext.Provider value = {{...this.state}} setUserData = {this.setUserData}>
                    { this.props.children }
                </SharepointContext.Provider>
            )
        }

    }


// --------------------------------------
// Export Context Provider
// --------------------------------------   
    export default SharepointContextProvider; 
