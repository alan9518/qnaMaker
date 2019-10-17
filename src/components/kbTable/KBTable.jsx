/* ==========================================================================
** Table Component Container
** 13/03/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// getQuestionsBySource Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import { Accordion, QnaContainer, ListPagination, AppLoader } from '../index';
    import {uniq}  from 'lodash';
    import PropTypes from 'prop-types';
    import './styles.css'



    const numberPerPage = 15

// --------------------------------------
// Create Component Class
// --------------------------------------
    class KBTable extends Component {

        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */


            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    currentQnAData : props.qnaData || [],
                    loadingNewPage: false,
                    currentPage : 1,
                    currentCount : 0,
                    numberOfPages : 0,
                    
                }
            
            }


            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
            componentDidMount() {

                const currentQnAData = this.getValues()
                this.setState({
                    currentQnAData : currentQnAData,
                    currentCount : currentQnAData.length > numberPerPage ? 20 : numberPerPage,
                    isLoaded : true
                })
            }


        /* ==========================================================================
        ** Handle State
        ** ========================================================================== */

            /* ==========================================================================
            ** Manage Data
            ** ========================================================================== */
                // --------------------------------------
                // Slice Data
                // --------------------------------------
                getValues () {
                    const {qnaData} = this.props;
                    if(qnaData.length <= 0)
                        return [];
                    
                    if(qnaData.length >= 20) {
                        const slicedData = qnaData.slice(0,numberPerPage);
                        
                        return slicedData;
                    }
                    else 
                        return qnaData

                    
                }


                // --------------------------------------
                // Get Different Sources
                // --------------------------------------
                getSources () {
                    const {qnaData} = this.props;
                    const sources = qnaData.map((data)=> {return data.source})

                    // console.log('TCL: KBTable -> getSources -> sources', sources)
                    
                    const uniqueSources =  uniq(sources);
                    // console.log('TCL: KBTable -> getSources -> uniqueSources', uniqueSources)
                }


                // --------------------------------------
                // Filter Qna Based on Source
                // --------------------------------------
                getQuestionsBySource(source) {
                    const {qnaData} = this.state;

                    const qnaBySource = qnaData.filter((qna) => {
                        return qna.source === source
                    })

                    const qnaDataSource = this.getValues(qnaBySource)
                    
                    return qnaDataSource;
                    
                }



                // ?--------------------------------------
                // ? Udpate Qna Item Quesions Data
                // ?--------------------------------------
                updateQnaItemData = (newQnaItem, action, followUpDataToRemove = null, )=> {
                    console.log("TCL: KBTable -> updateQnaItemData -> action", action)
                    // console.log("TCL: KBTable -> updateQnaItemQuestions -> id", id)
                    console.log("TCL: KBTable -> updateQnaItemQuestions -> newQnaItem", newQnaItem)
                    
                    const {currentQnAData} = this.state
                    

                    let newQnaData = currentQnAData.map((qnaItem) => {
                        if(qnaItem.id === newQnaItem.id) 
                            qnaItem = newQnaItem

                        return qnaItem;
                    })
                    console.log("TCL: KBTable -> updateQnaItemQuestions -> newQnaData", newQnaData)


                    this.setState({
                        currentQnAData : newQnaData
                    })



                    console.log("TCL: KBTable -> updateQnaItemData -> this.state", this.state)

                    if(action === 'addQuestions' || action === 'removeQuestions' || action === 'updateQuestions') {

                        // ? Get Item to edit Questions

                        this.props.updateQnaDataQuestions(newQnaItem, action )
                    }
                        
                    else
                        this.props.updateQnaData(newQnaItem, action , followUpDataToRemove)
                        

                    

                }

            /* ==========================================================================
            ** Pagination
            ** ========================================================================== */

                // --------------------------------------
                // Set Number of Pages
                // --------------------------------------
                setNumberOfPages (dataSize) {
                    // const {numberPerPage}= this.state;
                    // const numberPerPage =  numberPerPage;
                    
                    return Math.ceil(dataSize.length / numberPerPage)
                }


                // --------------------------------------
                // Load the Data
                // --------------------------------------
                loadList(newPage) {
                    

                    this.setState({loadingNewPage : true})

                    // const { currentQnAData } = this.state;
                    const {qnaData} = this.props;
                    const begin = ((newPage - 1) * numberPerPage);
                    const end = begin + numberPerPage;
                
                    const pageList = qnaData.slice(begin, end);
                    
                    
                    return pageList;

                }
                

                
                // --------------------------------------
                // Change to Next Page
                // --------------------------------------
                nextPage = (event) => {
                    
                    const {currentPage} = this.state;
                    
                    let newPage =  currentPage + 1;
                    const newList =  this.loadList(newPage);
                  
                    this.setState((prevState, props) => ({
                        currentPage : newPage,
                        currentQnAData : newList,
                        loadingNewPage: false
                        
                    }));

                    
                    
                }

                // --------------------------------------
                // Change to Prev Page
                // --------------------------------------
                previousPage = (event) => {                    
                    const {currentPage} = this.state;
                    let newPage =  currentPage - 1;
                    const newList =  this.loadList(newPage);
                    this.setState((prevState, props) => ({
                        currentPage : newPage,
                        currentQnAData : newList,
                        loadingNewPage: false
                    }));

                    
                }

                // --------------------------------------
                // Change to First Page
                // --------------------------------------
                firstPage = (event) => {

                    let newPage =  1;
                    const newList =  this.loadList(newPage);
                    this.setState((prevState, props) => ({
                        currentPage : newPage,
                        currentQnAData : newList,
                        loadingNewPage: false
                    }));
                    
                }

                

                // --------------------------------------
                // Change First Page
                // --------------------------------------
                lastPage = (event) => {
                    // const {numberOfPages} = this.state;
                    let newPage = this.setNumberOfPages(this.props.qnaData);
                    const newList =  this.loadList(newPage);
                    this.setState((prevState, props) => ({
                        currentPage : newPage,
                        currentQnAData : newList,
                        loadingNewPage: false
                    }));
                    
                }

                // --------------------------------------
                // On CHange for FIlter
                // --------------------------------------
                onChange = (event)=> {
                    // console.log('TCL: Home -> onChange -> event', event)
                    const filterValue =  String(event.target.value) ;
                    // const filteredProjects = this.props.allProjects.filter((project)=>{
                        
                    //     return (
                    //             // project.project_id.indexOf(filterValue) > -1  ||
                    //             project.project_name.indexOf(filterValue) > -1  ||
                    //             project.request_owner.indexOf(filterValue) > -1 ||
                    //             project.request_id.indexOf(filterValue) > -1
                    //     )   
                    // });
                    // this.setState({
                    //     currentQnAData : filteredProjects,
                    //     numberOfPages : this.setNumberOfPages(filteredProjects.length),
                    //     currentPage : 1
                        
                    // })
                }

        
        /* ==========================================================================
        ** Render Methods
        ** ========================================================================== */

        
            // --------------------------------------
            // Split By Source
            // --------------------------------------

            renderAccordionSources(source) {
                console.log("TCL: KBTable -> renderAccordionSources -> source", source)
                const {loadingNewPage , currentQnAData} = this.state
                console.log("TCL: KBTable -> renderAccordionSources -> currentQnAData", currentQnAData)
                const { qnaData, children, } = this.props;
                const alllowEdition = source === 'Editorial' ? true : false;
                console.log("TCL: KBTable -> renderAccordionSources -> alllowEdition", alllowEdition)
                
                return (
                    // currentQnAData.length > 0 && 
                        <Accordion
                            id={source}
                            title={source}
                            open={true}
                            sourceLength = {qnaData.length}
                            key = {source}
                            
                        >
                            <div className="tableHeaderContainer">
                                {this.props.header}

                                {this.renderPagination(qnaData)}
                            </div>


                            {
                                // ? Render New Question & Answers Inputs                                
                                children
 
                            }

                       {
                            //? Render Qna Data
                            !loadingNewPage ?
                                <QnaContainer 
                                    qnaData = {currentQnAData} 
                                    onRemoveItem = {this.onRemoveItem} 
                                    id = {`cont-${source}`} 
                                    source = {source}
                                    allQnaData = {this.props.allQnaData}
                                    updateQnaItemData = {this.updateQnaItemData.bind(this)}
                                    updateAnswer = {this.props.updateAnswer}
                                    allowEdition = {alllowEdition}
                                />
                            : 
                                this.renderLoader()
                        }
                                                 
                    </Accordion>    
                )
            }

            // --------------------------------------
            // Remove Item from Array
            // --------------------------------------
            onRemoveItem = (itemToDelete, source) =>{

                const {currentQnAData} = this.state;


                  

                // ? Filter Items from The Array
                const newQnaData = currentQnAData.filter((qnaItem) => {
                    return qnaItem.source === source && qnaItem.id !== itemToDelete
                })


                this.setState({
                    // delete : deleteArray,
                    currentQnAData : newQnaData,
                    // isLoaded : true
                })

                this.props.onRemoveItem(itemToDelete,source)
            }


            // --------------------------------------
            // Render Pagination for Each DataSet
            // --------------------------------------

            renderPagination(currentData) {
                
                
                const { currentPage } = this.state;
                const numberOfPages = this.setNumberOfPages(currentData);
                // console.log("TCL: KBTable -> renderPagination -> numberOfPages", numberOfPages)
                return   <ListPagination
                            projectsCount={currentData.length}
                            currentPage={currentPage}
                            numberOfPages = {numberOfPages}
                            itemsPerPage = {numberPerPage}
                            nextPage =  {this.nextPage}
                            previousPage = {this.previousPage}
                            firstPage = {this.firstPage}
                            lastPage = {this.lastPage}
                        />
            }

            // --------------------------------------
            // Render Projects
            // --------------------------------------
            renderTable() {
                
                const {source} = this.props;
                console.log("TCL: KBTable -> renderTable -> source", source)
                return (
                    <Fragment>  
                        <div className="bot-tableBody">
                            {this.renderAccordionSources(source)}
                        </div>
                    </Fragment>
                )
            }


            // --------------------------------------
            // Render Loader
            // --------------------------------------
            renderLoader () {
                return <div> <AppLoader customHeight = {100}/> </div>
            }



            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {
               return this.renderTable()
            }
    }


// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    KBTable.propTypes = {
        qnaData: PropTypes.array
    };

// --------------------------------------
// Export Component
// --------------------------------------
export default KBTable;