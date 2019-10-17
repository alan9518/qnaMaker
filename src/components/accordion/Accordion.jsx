/* ==========================================================================
 * Accordion Component
 * Final Version
 * 18/06/2018
 * Alan Medina Silva
 ========================================================================== */

 // --------------------------------------
 // Import Dependences
 // --------------------------------------
    import "babel-polyfill";
    import React , {Component} from 'react';
    import'./styles.css';

// --------------------------------------
// Create Component
// --------------------------------------
    class Accordion extends Component {

     // --------------------------------------
     // Constructor
     // --------------------------------------
         constructor(props) {
            super(props);
            this.state = {
                openTab:this.props.open,
                class:"bot-section"
            };
            
         }


    // --------------------------------------
    // Check If Tab Must be Open at start
    // --------------------------------------
        componentDidMount() {

            let inner = this.refs.inner;
            let collapsible = this.refs.collapsibleBody;
            let {open} = this.props;
            
            if(open)
                this.openInitialTab(collapsible);
               
          
        }

    // --------------------------------------
    // Open Initial Tab
    // --------------------------------------
        openInitialTab (parent) {
            const {openTab} = this.state;
            let icon = null;
            let arrow = parent.getElementsByTagName('i')[0];
            let tabContent = parent.parentElement.getElementsByClassName('bot-tabContent')[0];

            this.setState({openTab : true})
            this.state.openTab ? icon = 'arrow_drop_down' :  icon = 'arrow_right'
            // icon = this.state.openTab ? <FontAwesomeIcon icon={faAngleUp}  /> : <FontAwesomeIcon icon={faAngleDown} />
            this.toggleTab(arrow,tabContent,icon);

        }

     // --------------------------------------
     // Open/CLose Tab
     // --------------------------------------    
         handleClick = (e) => {

        // Use Polyfill
            if (window.Element && !Element.prototype.closest) {
                Element.prototype.closest = 
                function(s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i,
                        el = this;
                    do {
                        i = matches.length;
                        while (--i >= 0 && matches.item(i) !== el) {};
                    } while ((i < 0) && (el = el.parentElement)); 
                    return el;
                };
            }

            let tab = e.target.closest('.bot-separatorTitle');
            let arrow = tab.getElementsByTagName('i')[0];
            let tabContent = tab.parentElement.getElementsByClassName('bot-tabContent')[0];
            let icon = '';
           
            this.setState({openTab : !this.state.openTab})

            this.state.openTab ? icon = 'arrow_right' :  icon = 'arrow_drop_down'
            this.toggleTab(arrow,tabContent,icon);
         }



    // --------------------------------------
    // CLosest Function for IE
    // --------------------------------------     
    
        
    
        

 
     

    // --------------------------------------
    // Set Open Transition
    // --------------------------------------
         toggleTab(arrow,tabContent,iconClass) {
            arrow.innerHTML = iconClass;
            tabContent.classList.toggle('bot-active');

            if (tabContent.style.maxHeight) {
                tabContent.style.maxHeight = null;
                tabContent.style.paddingBottom = 0;
            }
                
            else  {
                tabContent.style.maxHeight = (tabContent.scrollHeight + 650) + "px";
                tabContent.style.paddingBottom = "20px";
            }
                
         }
    

     // --------------------------------------
     // Render Component
     // --------------------------------------

     render () {

        const {title,children,separator, currentCount, sourceLength} = this.props;
        // const {openTab, height} = this.state;

        return (
            <div className="bot-tabsContainer" key={`bot-tab${title}`} >
                    <div className="bot-tab" id={`bot-tab${title}`} >
                    
                        <div className="bot-separatorTitle" onClick={this.handleClick} ref="collapsibleBody">
                            <h3 className="bot-tabTitle flexGrow1"> Source:  {title}       </h3>
                            <span className = "bot-tabTitle bot-itemsCount " > Showing {sourceLength} Items in Total  </span>
                            
                            {/*<i className="material-icons bot-closedArrow flexGrow0">{this.state.icon}</i>*/}
                            <i className="material-icons bot-closedArrow flexGrow0">{this.state.icon}</i>
                            {/*isButton  === true ? <FontAwesomeIcon icon={faPlus}  /> : <FontAwesomeIcon icon={faQuestionCircle} />*/}
                        </div>

                        {separator === true && <div className="bot-separator"></div> }
                        
                        
                        <div className="bot-tabContent "  ref="inner" > 
                            <div className="bot-panelBody" >
                                {children}
                            </div>
                         </div>
                    
                    </div>
             </div>
        
        );
     }
 }

// --------------------------------------
// Export Component
// --------------------------------------
 export default Accordion;