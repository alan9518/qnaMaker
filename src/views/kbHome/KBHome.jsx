/* ==========================================================================
** Home View Component
** Hold All Knowledge Base Items
** 28/08/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component, Fragment } from 'react';
    import { KBTable, AppLoader, TableHeader, NewQnaQuestion, QnaContainer } from '../../components';
    import { Endpoints } from '../../services/Endpoints';
    import QnAContextProvider from '../../contexts/QnAContext';
    import axios from 'axios';
    import Alert from 'react-s-alert';
    import 'react-s-alert/dist/s-alert-default.css';
    import 'react-s-alert/dist/s-alert-css-effects/slide.css';
    import PropTypes from 'prop-types';

// --------------------------------------
// Create Component Class
// --------------------------------------
    class KBHome extends Component {

        /* ==========================================================================
        ** Component Setup
        ** ========================================================================== */


            // --------------------------------------
            // Constructor
            // --------------------------------------
            constructor(props) {
                super(props);
                this.state = {
                    qnaData: [],
                    qnaSources: [],
                    addNewQuestion: false,
                    sourceToAdd : '',
                    add: { 'qnaList': [] },
                    delete: { 'ids': [] },
                    update: { 'qnaList': [] },
                    isLoaded: false,
                }
            }



            // --------------------------------------
            // Set Initial Values
            // --------------------------------------
            componentDidMount() {
                this.loadAPI()
            }


            // --------------------------------------
            // Split Data by source to set each table
            // --------------------------------------

            setQnaDataBySource(source = null) {

                const { qnaData } = this.state;

                if (!source)
                    return qnaData


                // ?Filter By Source

                const dataBySource = qnaData.filter((qnaItem) => {
                    return qnaItem.source === source
                })



                return dataBySource;



            }




        /* ==========================================================================
        ** API Connection
        ** ========================================================================== */

            //? --------------------------------------
            //? Load all Promises
            //? --------------------------------------
            async loadAPI() {
                try {

                    // Load Sources
                    const qnaSourcesPromise = await this.loadQnASources();
                    const qnaSourcesData = await qnaSourcesPromise.data;

                    // Load Questions
                    const qnaQuestionsPromise = await this.loadQnAQuestions();
                    const qnaQuestionsData = await qnaQuestionsPromise.data.qnaDocuments;
                    console.log("TCL: KBHome -> loadAPI -> qnaQuestionsData", qnaQuestionsData)



                    this.setState({
                        qnaData: qnaQuestionsData,
                        qnaSources: qnaSourcesData.reverse(),
                        isLoaded: true
                    });
                }
                catch (error) {
                    console.log('TCL: KnowledgeBase -> catch -> error', error)

                }
            }



            //? --------------------------------------
            //? Load QnA Questions From all Sources
            //? --------------------------------------
            async loadQnAQuestions() {
                const requestUrl = `${Endpoints.getBaseData}`;
                return axios.get(requestUrl);
            }




            //? --------------------------------------
            //? Load Knowledge Base details
            //? --------------------------------------
            async loadQnASources() {
                return axios.get(Endpoints.getBaseSources);

            }


            //? --------------------------------------
            //? Update KB
            //? --------------------------------------
            saveNewQuestions = async () => {
                const { add, update } = this.state;
                
                const deleteArray = this.state.delete;
                

                // this.setState({
                //     isLoaded: false
                // })

                console.log("TCL: KnowledgeBase -> saveNewQuestions -> add", add)
                console.log("TCL: KBHome -> saveNewQuestions -> update", update)
                console.log("TCL: KBHome -> saveNewQuestions -> deleteArray", deleteArray)

                const req = {

                    'add': add,
                    'update': {
                        'name': 'New KB Name',
                        update
                    },
                    'delete': deleteArray
                };


                console.log("TCL: KnowledgeBase -> saveNewQuestions -> req", req)


                // try {
                //     const updateKBPromise = await axios.post(Endpoints.getBaseData, req);
                //     const updateKBResponse = await updateKBPromise.data;



                //     console.log("TCL: KnowledgeBase -> saveNewQuestions -> updateKBResponse", updateKBResponse);


                //     this.setState({
                //         addNewQuestion: false,
                //         add: { 'qnaList': [] },
                //         delete: { 'ids': [] },
                //     })

                //     const publishPromise = await this.publishKB();
                //     const publishData = await publishPromise.data;

                //     const qnaQuestionsPromise = await this.loadQnAQuestions();
                //     const qnaQuestionsData = await qnaQuestionsPromise.data;

                //     this.setState({
                //         qnaData: qnaQuestionsData,
                //         isLoaded: true
                //     })


                //     console.log("TCL: KnowledgeBase -> saveNewQuestions -> publishData", publishData)

                //     updateKBResponse && this.createSuccessAlert('Kwnoledge Base Updated')
                // }
                // catch (error) {
                //     console.log("TCL: KnowledgeBase -> saveNewQuestions -> error", error)
                //     this.createErrorAlert('Error updatig Knowledge Base')
                // }

            }



            // --------------------------------------
            // Publish KB
            // --------------------------------------
            async publishKB() {
                return axios.post(Endpoints.publishKB);
            }





        /* ==========================================================================
        ** Handle State
        ** ========================================================================== */


            // ?--------------------------------------
            // ? Add New Question 
            // ?--------------------------------------
            onClickAddNewQuestion = () => {
                this.setState({
                    addNewQuestion: true,
                    sourceToAdd : 'Editorial'
                })
            }


            // ?--------------------------------------
            // ? Cancel New Questions to Add
            // ?--------------------------------------?

            hideNewQuestion = () => {
                const { add } = this.state;
                add.qnaList = []


                this.setState({
                    addNewQuestion: false,
                    add: add
                })


            }


            //? --------------------------------------
            //? Send to New Question Component
            //? Retrieve New Question
            //? --------------------------------------
            saveQuestionPair = (question) => {
                console.log("TCL: KBHome -> saveQuestionPair -> question", question)
                const { add } = this.state;
                console.log("TCL: KBHome -> saveQuestionPair -> add", add)

                // set question id 
                question.localID = add.qnaList.length + 1;

                add.qnaList.push(question);
                
                this.setState({
                    add: add
                })

                console.log("TCL: KBHome -> saveQuestionPair -> add", add)


            }


            // ?--------------------------------------
            // ? Update New Answer Value
            // ?--------------------------------------
            updateNewAnswerValue = (itemID, newAnswer) => {
                console.log("TCL: KBHome -> updateNewAnswerValue -> itemID", itemID)
                console.log("TCL: KBHome -> updateNewAnswerValue -> newAnswer", newAnswer)

                const {add} = this.state;
                const {qnaList} = add;

                // ? Update Answer on the item to use
                let newQnaDataItem = qnaList.find((qnaItem) => { return qnaItem.localID === itemID })
                
                    newQnaDataItem.answer = newAnswer;

                if (!qnaList || qnaList.length <= 0) {

                    // ? Add the item to the update array

                    let newAddList = Object.assign({}, add, { qnaList: [newQnaDataItem] });
                    console.log("TCL: KBHome -> updateNewAnswerValue -> newAddList", newAddList)
                    this.setState({ update: newAddList })
                }

                // ? The item already has items
                else {


                    // ? Check if the Item is in the array and updated it
                    let newQnaAddList = [...qnaList];
                    console.log("TCL: KBHome -> updateQnaDataQuestions -> newQnaAddList", newQnaAddList)
                    let addedIds = qnaList.map(qnaItem => qnaItem.localID);


                    newQnaAddList.forEach((qnaListItem) => {
                        console.log("TCL: KBHome -> updateNewAnswerValue -> qnaListItem", qnaListItem)

                        // ? Update the questions data
                        if ((addedIds.includes(itemID))) {
                        

                            if (qnaListItem.localID === itemID ) {
                                // ? Change Answer
                                qnaListItem.answer = newAnswer
                            }
                        }
                        else {
                            // ? Add New item to the list

                            console.log("TCL: KBHome -> updateQnaAnswer -> qnaListItem", qnaListItem)
                    
                            addedIds.push(itemID)

                            newQnaAddList.push(newQnaDataItem)
                        }



                    })


                    let newUpdateList = Object.assign({}, add, { qnaList: newQnaAddList })
                    console.log("TCL: KBHome -> updateQnaAnswer -> newUpdateList", newUpdateList)
                    

                    this.setState({ update: { qnaList: newQnaAddList } })


                }

                
            }





            // ?--------------------------------------
            // ? Remove Question Row Item from State
            // ? And add id to delete to the delete array    
            // ?--------------------------------------
            onRemoveItem = (itemToDelete, source) => {

                const deleteArray = this.state.delete
                deleteArray.ids.push(itemToDelete);

                this.setState({
                    delete: deleteArray,
                }, console.log('delete array', this.state.delete))

            }



            // ?--------------------------------------
            // ? Update QnA Item Answer
            // ?--------------------------------------
            updateQnaAnswer = (itemID, newAnswer) => {
                const {qnaData, update} = this.state;
                const {qnaList} = update;

                // ? Update Answer on the item to use
                let newQnaDataItem = qnaData.find((qnaItem) => { return qnaItem.id === itemID })
                    newQnaDataItem.answer = newAnswer;

                if (!qnaList || qnaList.length <= 0) {

                    // ? Add the item to the update array

                    let newUpdateList = Object.assign({}, update, { qnaList: [newQnaDataItem] });


                    console.log("TCL: KBHome -> updateQnaAnswer -> newUpdateList", newUpdateList)
             


                    this.setState({ update: newUpdateList })
                }

                else {

                    console.log("TCL: KBHome -> updateQnaDataQuestions -> this.state", this.state)

                    // ? Check if the Item is in the array and updated it
                    let newQnaUpdateList = qnaList;
                    console.log("TCL: KBHome -> updateQnaDataQuestions -> newQnaUpdateList", newQnaUpdateList)
                    let addedIds = qnaList.map(qnaItem => qnaItem.id);


                    newQnaUpdateList.forEach((qnaListItem) => {

                        // ? Update the questions data
                        if ((addedIds.includes(itemID))) {
                        

                            if (qnaListItem.id === itemID ) {
                                // ? Change Answer
                                qnaListItem.answer = newAnswer
                            }
                        }
                        else {
                            // ? Add New item to the list

                            console.log("TCL: KBHome -> updateQnaAnswer -> qnaListItem", qnaListItem)
                    
                            addedIds.push(itemID)

                            newQnaUpdateList.push(newQnaDataItem)
                        }



                    })


                    let newUpdateList = Object.assign({}, update, { qnaList: newQnaUpdateList })
                    console.log("TCL: KBHome -> updateQnaAnswer -> newUpdateList", newUpdateList)
                    

                    this.setState({ update: { qnaList: newQnaUpdateList } })


                }

            }



            // ?--------------------------------------
            // ? Update questions Data for 
            // ? For each answer    
            // ?--------------------------------------
            updateQnaDataQuestions = (newQnaDataItem, action) => {



                // ? Update Questions
                const { update, qnaData } = this.state;
                const { qnaList } = update;
                let newUpdateList = []
                let idToSearch = newQnaDataItem.questionID ? newQnaDataItem.questionID : newQnaDataItem.id
                console.log("TCL: KBHome -> updateQnaDataQuestions -> qnaList", qnaList)

                // ? Find item to edit on the list

                let questionToEdit = qnaData.find((qnaItem) => { return qnaItem.id === idToSearch })

                console.log("TCL: KBHome -> updateQnaDataQuestions -> questionToEdit", questionToEdit)


                if (!qnaList || qnaList.length <= 0) {

                    if (action === 'addQuestions')
                        // ? Store questions on the Add key
                        questionToEdit.questions.add = [newQnaDataItem.newQuestion];

                    else if (action === 'removeQuestions')
                        // ? Store questions on the delete array
                        questionToEdit.questions.delete = [newQnaDataItem.question];

                    else if (action === 'updateQuestions') {
                        const { questionToReplace } = newQnaDataItem;


                        console.log("TCL: KBHome -> updateQnaDataQuestions -> questionToReplace", questionToReplace)
                     
                        const newQuestionArray = this.compareQuestionsArray(questionToEdit, newQnaDataItem)
                            
                        console.log("TCL: KBHome -> updateQnaDataQuestions -> newQuestionArray", newQuestionArray)


                        questionToEdit.questions = newQuestionArray;
                        
                    }

                    // else {
                    //     // ? Edit Current Questions, spread the 
                    //     questionToEdit = newQnaDataItem;
                    //     console.log("TCL: KBHome -> updateQnaDataQuestions -> newQnaDataItem", newQnaDataItem);

                    // }

                    console.log("TCL: KBHome -> updateQnaDataQuestions -> questionToEdit", questionToEdit)


                    //? Validate that there is a question beign updated
                    if (questionToEdit) {

                        newUpdateList = Object.assign({}, update, { qnaList: [questionToEdit] })
                        console.log("TCL: KBHome -> updateQnaDataQuestions -> newUpdateList", newUpdateList)


                        this.setState({ update: newUpdateList })
                        // this.setState({ update: {newUpdateList} }, console.log('qnaList on empty', this.state.update))
                    }


                }

                else {

                    console.log("TCL: KBHome -> updateQnaDataQuestions -> this.state", this.state)

                    // ? Check if the Item is in the array and updated it
                    let newQnaUpdateList = qnaList;
                    console.log("TCL: KBHome -> updateQnaDataQuestions -> newQnaUpdateList", newQnaUpdateList)
                    let addedIds = qnaList.map(qnaItem => qnaItem.id);
                    let questionsToAdd = {}


                    newQnaUpdateList.forEach((qnaListItem) => {



                        // ? Update the questions data
                        if ((questionToEdit && addedIds.includes(questionToEdit.id))) {
                        

                            if (questionToEdit.id === qnaListItem.id) {

                                console.log("TCL: KBHome -> updateQnaData -> qnaListItem", qnaListItem)

                                // Check if edit, add or delete question
                                if (action === 'addQuestions') {
                                    // ? Store questions on the Add key


                                    (questionToEdit.questions.add && Array.isArray(questionToEdit.questions.add))
                                        ? questionToEdit.questions.add.push(newQnaDataItem.newQuestion)
                                        : questionToEdit.questions.add = [newQnaDataItem.newQuestion];


                                    qnaListItem = Object.assign({}, questionToEdit)


                                }
                                else if (action === 'removeQuestions') {
                                    // ? Store questions on the delete array

                                    console.log("TCL: KBHome -> updateQnaDataQuestions -> newQnaDataItem", newQnaDataItem)

                                    // ? If the questions exists on the original questions array, delete both
                                    // ? Otherwise just removeit from the delete array

                                    // ? the question comes from the DB
                                    if (questionToEdit.questions.includes(newQnaDataItem.question) === true) {
                                        (questionToEdit.questions.delete && Array.isArray(questionToEdit.questions.delete))
                                            ? questionToEdit.questions.delete.push(newQnaDataItem.question)
                                            : questionToEdit.questions.delete = [newQnaDataItem.question];
                                    }

                                    else if (questionToEdit.questions.add.includes(newQnaDataItem.question) === true) {
                                        // ? The question to remove is inside the add array
                                        const { add } = questionToEdit.questions;
                                        questionToEdit.questions.add = add.filter((addItem) => addItem !== newQnaDataItem.question)
                                    }

                                    else {
                                        return;
                                    }


                                    // (questionToEdit.questions.delete && Array.isArray(questionToEdit.questions.delete))
                                    //     ? questionToEdit.questions.delete.push(newQnaDataItem.question)
                                    //     : questionToEdit.questions.delete = [newQnaDataItem.question];



                                    qnaListItem = Object.assign({}, questionToEdit)

                                }
                                else if (action === 'updateQuestions') {
                                    const { questionToReplace } = newQnaDataItem;
                                    console.log("TCL: KBHome -> updateQnaDataQuestions -> questionToReplace", questionToReplace)
                                    console.log("TCL: KBHome -> updateQnaDataQuestions -> newQnaDataItem", newQnaDataItem)

                                    const newQuestionArray = this.compareQuestionsArray(questionToEdit, newQnaDataItem)
                                    questionToEdit.questions = newQuestionArray;

                                    qnaListItem = Object.assign({}, questionToEdit)




                                }



                            }


                            console.log("TCL: KBHome -> updateQnaDataQuestions -> qnaListItem FInal", qnaListItem)


                        }
                        // ? Add New item to the list
                        else {
                         
                            let newListItemtoAdd = null;

                            console.log("TCL: KBHome -> updateQnaDataQuestions -> questionToEdit", questionToEdit)

                              // Check if edit, add or delete question
                                if (action === 'addQuestions') {
                                    // ? Store questions on the Add key


                                    (questionToEdit.questions.add && Array.isArray(questionToEdit.questions.add))
                                        ? questionToEdit.questions.add.push(newQnaDataItem.newQuestion)
                                        : questionToEdit.questions.add = [newQnaDataItem.newQuestion];


                                    newListItemtoAdd = Object.assign({}, questionToEdit)


                                }
                                else if (action === 'removeQuestions') {
                                    // ? Store questions on the delete array

                                    console.log("TCL: KBHome -> updateQnaDataQuestions -> newQnaDataItem", newQnaDataItem)

                                    // ? If the questions exists on the original questions array, delete both
                                    // ? Otherwise just removeit from the delete array

                                    // ? the question comes from the DB
                                    if (questionToEdit.questions.includes(newQnaDataItem.question) === true) {
                                        (questionToEdit.questions.delete && Array.isArray(questionToEdit.questions.delete))
                                            ? questionToEdit.questions.delete.push(newQnaDataItem.question)
                                            : questionToEdit.questions.delete = [newQnaDataItem.question];
                                    }

                                    else if (questionToEdit.questions.add.includes(newQnaDataItem.question) === true) {
                                        // ? The question to remove is inside the add array
                                        const { add } = questionToEdit.questions;
                                        questionToEdit.questions.add = add.filter((addItem) => addItem !== newQnaDataItem.question)
                                    }

                                    else {
                                        return;
                                    }

                                    newListItemtoAdd = Object.assign({}, questionToEdit)

                                }
                                else if (action === 'updateQuestions') {
                                    const { questionToReplace } = newQnaDataItem;
                                    console.log("TCL: KBHome -> updateQnaDataQuestions -> questionToReplace", questionToReplace)
                                    console.log("TCL: KBHome -> updateQnaDataQuestions -> newQnaDataItem", newQnaDataItem)

                                    const newQuestionArray = this.compareQuestionsArray(questionToEdit, newQnaDataItem)
                                    questionToEdit.questions = newQuestionArray;

                                    newListItemtoAdd = Object.assign({}, questionToEdit)

                                }

                            // ? Update IDs Array  && the Update List

                            addedIds.push(questionToEdit.id);
                            newQnaUpdateList.push(newListItemtoAdd);
                        }



                    })



                    console.log("TCL: KBHome -> updateQnaDataQuestions -> questionsToAdd", questionsToAdd)
                    console.log("TCL: KBHome -> updateQnaData -> newQnaUpdateList", newQnaUpdateList)

                    newUpdateList = Object.assign({}, update, { qnaList: newQnaUpdateList })
                    console.log("TCL: KBHome -> updateQnaData -> newUpdateList", newUpdateList)

                    this.setState({ update: { qnaList: newQnaUpdateList } })


                }



                





            }



            // ?--------------------------------------
            // ? Compare original questions with 
            // ? With the ones edited
            // ? The new Questions doest keep the 
            // ? ADD or Delete keys
            // ?--------------------------------------
            compareQuestionsArray(questionToEdit, newQuestionsEdited) {
                console.log("TCL: KBHome -> compareQuestionsArray -> newQuestionsEdited", newQuestionsEdited)
                console.log("TCL: KBHome -> compareQuestionsArray -> questionToEdit", questionToEdit)


                // ? Original Question Item
                const { questions } = questionToEdit;

                // ? Changes made on the question item
                const { questionToReplace, newQuestionValue } = newQuestionsEdited;
                let newAddQuestions, newDeletedQuestions = [];



                // ? Added Questions
                if (questions.add && questions.add.length > 0) {
                    console.log("TCL: KBHome -> compareQuestionsArray -> questions", questions)

                    newAddQuestions = questions.add.map((addQ) => {
                        console.log("TCL: KBHome -> compareQuestionsArray -> addQ", addQ)

                        // ? Check if the question is in the new questions array and in questionToReplace value

                        if (newQuestionsEdited.questions.includes(addQ) === true && questionToReplace === addQ)
                            return newQuestionValue;

                        else if (newQuestionsEdited.questions.includes(newQuestionValue) === true && questionToReplace === addQ)
                            return newQuestionValue
                        else
                            return addQ;
                    })
                    console.log("TCL: KBHome -> compareQuestionsArray -> newAddQuestions", newAddQuestions)



                }

                // ? Delete Questions
                if (questions.delete && questions.delete.length > 0) {
                    console.log("TCL: KBHome -> compareQuestionsArray -> questions", questions)

                    newDeletedQuestions = questions.delete.map((delQ) => {
                        console.log("TCL: KBHome -> compareQuestionsArray -> delQ", delQ)

                        // ? Check if the question is in the new questions array and in questionToReplace value

                        if (newQuestionsEdited.questions.includes(delQ) === true && questionToReplace === delQ) {
                            let editedValue = newQuestionValue
                            return editedValue;
                        }
                        else if (newQuestionsEdited.questions.includes(newQuestionValue) === true && questionToReplace === delQ)
                            return newQuestionValue

                        else
                            return delQ;
                    })
                    console.log("TCL: KBHome -> compareQuestionsArray -> newDeletedQuestions", newDeletedQuestions)



                }



                console.log("TCL: KBHome -> compareQuestionsArray -> questions", questions)

                // ? Replace Normal question Content

                const newQuestionsData = questions.map((questionItem) => {


                    if (questionItem === questionToReplace) {
                        questionItem = newQuestionValue
                    }

                    return questionItem;


                })


                console.log("TCL: KBHome -> compareQuestionsArray -> newQuestionsData", newQuestionsData)

                if (newAddQuestions && newAddQuestions.length > 0)
                    newQuestionsData.add = newAddQuestions;

                if (newAddQuestions && newAddQuestions.length > 0)
                    newQuestionsData.delete = newDeletedQuestions;


                return newQuestionsData;

            }




            // ?--------------------------------------
            // ? Update Qna Data Page after each
            // ? QnA Item Action
            // ?--------------------------------------
            updateQnaData = (newQnaDataItem, action, followUpDataToRemove = null) => {


                console.log("TCL: KBHome -> updateQnaData -> newQnaDataItem", newQnaDataItem)

                // ? Update KB Data
                const { update } = this.state;
                console.log("TCL: KBHome -> updateQnaData -> this.state", this.state)
                const { qnaList } = update;
                console.log("TCL: KBHome -> updateQnaData -> qnaList", qnaList)


                let removedFollowUpsIds = [];



                // ? Add Follow Ups and update data content

                let newUpdateList = []

                if (!qnaList || qnaList.length <= 0) {
                    newUpdateList = Object.assign({}, update, { qnaList: [newQnaDataItem] })
                    console.log("TCL: KBHome -> updateQnaData -> newUpdateList", newUpdateList)
                    removedFollowUpsIds = { questionID: newQnaDataItem.id, followUpRemoved: newQnaDataItem.context.promptsToDelete[0] }
                    this.setState({ update: newUpdateList })
                    console.log("TCL: KBHome -> updateQnaData -> removedFollowUpsIds", removedFollowUpsIds)
                }


                else {

                    // ? Check if the Item is in the array and updated it
                    let newQnaUpdateList = qnaList;
                    let addedIds = qnaList.map(qnaItem => qnaItem.id);

                    console.log("TCL: KBHome -> updateQnaData -> removedFollowUpsIds", removedFollowUpsIds)

                    qnaList.forEach((qnaListItem, index) => {


                        // addedIds.push(qnaListItem.id)

                        // ? Update the Cotext Prop if theres a new folow up on the same question
                        if (addedIds.includes(newQnaDataItem.id)) {

                            if (newQnaDataItem.id === qnaListItem.id) {

                                console.log("TCL: KBHome -> updateQnaData -> qnaListItem", qnaListItem)


                                console.log("TCL: KBHome -> updateQnaData -> newQnaUpdateList[index]", newQnaUpdateList[index])

                                // ? Get New Item Context Values
                                const { context } = newQnaDataItem;
                                const { promptsToAdd, promptsToDelete, prompts } = context;
                                console.log("TCL: KBHome -> updateQnaData -> promptsToDelete", promptsToDelete)


                                // ? Filter to get new Prompt Questions for the current answer
                                const newPromptsToAdd = this.validatePromptToAdd(qnaListItem.context.promptsToAdd, promptsToAdd);
                                let newPromptsToDelete = [];


                                console.log("TCL: KBHome -> updateQnaData -> newPromptsToDelete", newPromptsToDelete)

                                console.log("TCL: KBHome -> updateQnaData -> newPromptsToAdd", newPromptsToAdd)



                                // ? Update Item Context Props
                                qnaListItem.context.promptsToAdd = newPromptsToAdd;

                                if (action === 'removeFollowUp') {


                                    // TODO : Set Diff between local and API Promopts TO REMOVE
                                    if (prompts.length > 0 || prompts.includes()) {
                                        newPromptsToDelete = this.validatePromptToDelete(qnaListItem.context.promptsToDelete, promptsToDelete, addedIds)
                                        qnaListItem.context.promptsToDelete = newPromptsToDelete;
                                    }

                                    else {
                                        newPromptsToDelete = this.removePrompsToAdd(newQnaDataItem, qnaListItem.context.promptsToAdd, followUpDataToRemove);

                                        // ? Update Item Context Props
                                        qnaListItem.context.promptsToAdd = newPromptsToDelete;

                                    }
                                }





                            }


                        }

                        // ? Add follow up to a new  question
                        else {

                            // if()

                            if (!addedIds.includes(newQnaDataItem.id)) {
                                console.log("TCL: KBHome -> updateQnaData -> newQnaDataItem", newQnaDataItem)
                                newQnaUpdateList.push(newQnaDataItem)

                                addedIds.push(newQnaDataItem.id)
                            }


                        }

                    })

                    console.log("TCL: KBHome -> updateQnaData -> newQnaUpdateList", newQnaUpdateList)

                    newUpdateList = Object.assign({}, update, { qnaList: newQnaUpdateList })
                    console.log("TCL: KBHome -> updateQnaData -> newUpdateList", newUpdateList)

                    this.setState({ update: { qnaList: newQnaUpdateList } })


                }

            }


            // ?--------------------------------------
            // ? Update Qna Data Page after each
            // ? QnA Item Action
            // ? For New Questions with ID 0
            // ?--------------------------------------
            updateQnaDataPromptsNewQuestions = (newQnaDataItem, action, followUpDataToRemove = null) => {
                console.log("TCL: KBHome -> updateQnaDataPromptsNewQuestions -> action", action)
                console.log("TCL: KBHome -> updateQnaDataPromptsNewQuestions -> newQnaDataItem", newQnaDataItem)

                const {add} = this.state;
                const {qnaList} = add;

                let newQuestionID = newQnaDataItem.id ? newQnaDataItem.id : newQnaDataItem.questionID;

                const itemToLook = (newQnaDataItem.localID && newQuestionID === 0) ? newQnaDataItem.localID : newQuestionID;

                // ? Check if the item to add is already on the array
                // ? Since all the new questions have the same ID(0), filter by localID
                if(qnaList.length > 0) {
                    const newQnaList = qnaList.map((qnaItem) => {
                        console.log("TCL: KBHome -> updateQnaDataPromptsNewQuestions -> qnaItem", qnaItem)
                        if(qnaItem.localID === itemToLook) {
                            
                          switch(action)  {
                                case 'addQuestions' : 

                                        console.log("TCL: KBHome -> updateQnaDataPromptsNewQuestions -> qnaItem.questions", qnaItem.questions)
                                        qnaItem.questions.push(newQnaDataItem.newQuestion)
                                        
                                        return qnaItem;
                                        break;

                                case 'updateQuestions' : 
                                        const {questionToReplace, newQuestionValue} = newQnaDataItem;
                                        if(qnaItem.questions.includes(questionToReplace) === true)
                                            qnaItem.questions[qnaItem.questions.indexOf(questionToReplace)] = newQuestionValue;
                                            
                                        console.log("TCL: KBHome -> updateQnaDataPromptsNewQuestions -> qnaItem", qnaItem)
                                        return qnaItem;
                                        break;
                                        
                                case 'removeQuestions':

                                        let newQnaItemQuestions = qnaItem.questions.filter((question) => {
                                            console.log("TCL: KBHome -> updateQnaDataPromptsNewQuestions -> question", question)
                                            return question !== newQnaDataItem.question
                                        });
                                        
                                            console.log("TCL: KBHome -> updateQnaDataPromptsNewQuestions -> newQnaItemQuestions", newQnaItemQuestions)

                                        qnaItem.questions = newQnaItemQuestions;
                                        return qnaItem;

                                        break;


                                default : return qnaItem;


                           
                                
                            }

                            
                            
                        }
                    })
                    


                   
                    let newAddList = Object.assign({}, add, { qnaList: newQnaList })
                    console.log("TCL: KBHome -> updateQnaDataPromptsNewQuestions -> newAddList", newAddList)
                    

                    this.setState({ add: newAddList })



                    
                }
                


               
            
            

            }








            // ?--------------------------------------
            // ? Check for Repeated DisplayText
            // ? Prop on Context follow ups
            // ? Initialize as empty arrays when data is undefined
            // ?--------------------------------------
            validatePromptToAdd(currentArrayPrompt = [], newArrayPrompt = []) {

                let currentPromptTexts = currentArrayPrompt.map((currentPrompt, currentIndex) => { return currentPrompt.displayText });
                let currentPromptsCopy = currentArrayPrompt;
                // ? Iterate both arrays to compare each item
                newArrayPrompt.forEach((newPromptItem, index) => {

                    if (!currentPromptTexts.includes(newPromptItem.displayText)) {
                        currentPromptsCopy.push(newPromptItem)
                        currentPromptTexts.push(newPromptItem.displayText)
                    }
                })




                const updatedPrompts = Object.assign([], currentPromptsCopy);

                return updatedPrompts;



            }


            // ?--------------------------------------
            // ? Check for Repeated DisplayText
            // ? Prop on Context follow ups
            // ?--------------------------------------
            validatePromptToDelete(currentArrayPrompt, newArrayPrompt) {
                let currentPromptIds = new Set(currentArrayPrompt);
                currentPromptIds.add(newArrayPrompt[0]);


                console.log("TCL: KBHome -> validatePromptToDelete -> currentPromptIds", currentPromptIds)
                return Array.from(currentPromptIds);


            }


            // ?--------------------------------------
            // ? Remove Local Prompts 
            // ?--------------------------------------
            removePrompsToAdd(selectedPrompt, currentPrompts, followUpDataToRemove) {
                console.log("TCL: KBHome -> removePrompsToAdd -> followUpDataToRemove", followUpDataToRemove)
                console.log("TCL: KBHome -> removePrompsToAdd -> currentPrompts", currentPrompts)
                console.log("TCL: KBHome -> removePrompsToAdd -> selectedPrompt", selectedPrompt)

                // ? Filter Propmpts
                const newPromptsToAdd = currentPrompts.filter(prompt => prompt.displayText !== followUpDataToRemove.displayText)
                console.log("TCL: KBHome -> removePrompsToAdd -> newPromptsToAdd", newPromptsToAdd)

                return newPromptsToAdd;

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
                    effect: 'slide',
                    timeout: 2000
                });
            }

            // --------------------------------------
            // Top Alert
            // --------------------------------------
            createErrorAlertTop = (message) => {
                Alert.error(message, {
                    position: 'bottom',
                    effect: 'slide',
                    timeout: 2000
                });
            }


            // --------------------------------------
            // Show Sucess Message
            // --------------------------------------
            createSuccessAlert = (message) => {

                Alert.info(message, {
                    position: 'top',
                    effect: 'slide',
                    timeout: 2000

                });
            }



            // --------------------------------------
            // Render Loader
            // --------------------------------------
            renderLoader(isTransparent) {
                return <div> <AppLoader isTransparent={isTransparent} /> </div>
            }


            // --------------------------------------
            // Add New Question
            // Render Container
            // --------------------------------------
            addNewQuestion() {
                return (
                    <NewQnaQuestion 
                        saveQuestionPair={this.saveQuestionPair} 
                        showAnswer={true} 
                        onRemoveItem={this.onRemoveItem} 
                        updateAnswer = {this.updateNewAnswerValue}/>
                )
            }


            // --------------------------------------
            // Render Questions to Save
            // --------------------------------------
            renderQuestionstoSave(questionsData) {
                console.log("TCL: KnowledgeBase -> renderQuestionstoSave -> questionsData", questionsData.qnaList)
                return (
                    <div className="bot-questionsContainer">

                        <QnaContainer 
                            updateQnaItemData = {this.updateQnaDataPromptsNewQuestions}
                            qnaData={questionsData.qnaList} 
                            updateAnswer = {this.updateNewAnswerValue}/>


                    </div>
                )
            }



            // --------------------------------------
            // Render KBHome
            // --------------------------------------
            renderKBHome() {

                const { isLoaded, qnaData, qnaSources, addNewQuestion, add } = this.state;
                console.log("TCL: KBHome -> renderKBHome -> qnaData", qnaData)
                const deleteArray = this.state.delete;
                let showSaveButton = false;

                if (add.qnaList.length > 0 || deleteArray.ids.length > 0)
                    showSaveButton = true
                else
                    showSaveButton = false;




                return (
                    <Fragment>

                        <div className="container-fluid">
                            <div className="row bot-headerContainer">
                                <div className="col-md-4">
                                    <h1> My Knowledge Base   </h1>
                                </div>
                            </div>


                            {

                                !isLoaded
                                    ? this.renderLoader(false)
                                    :
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <QnAContextProvider qnaData={qnaData} >
                                                <div className="bot-tableContainer">
                                                    {
                                                        qnaSources && qnaSources.map((source, index) => {


                                                            let currentSource = this.setQnaDataBySource(source)


                                                            let allowEdit = source === 'Editorial' ? true : false


                                                            return (
                                                                <KBTable
                                                                    source={source}
                                                                    qnaData={currentSource}
                                                                    onRemoveItem={this.onRemoveItem}
                                                                    key={`${source}-${index}`}
                                                                    updateQnaData={this.updateQnaData}
                                                                    updateQnaDataQuestions={this.updateQnaDataQuestions}
                                                                    updateAnswer = {this.updateQnaAnswer}
                                                                    allQnaData={qnaData}
                                                                    header={<TableHeader
                                                                        onClickAddNewQuestion={this.onClickAddNewQuestion}
                                                                        saveNewQuestions={this.saveNewQuestions}
                                                                        saveQuestionPair={this.saveQuestionPair}
                                                                        showButtons={allowEdit}
                                                                        showSaveButton={showSaveButton}
                                                                        qnaDataLength={qnaData.length}
                                                                        addNewQuestionClicked={this.state.addNewQuestion}
                                                                        hideNewQuestion={this.hideNewQuestion}
                                                                        source={source}
                                                                    />
                                                                    }
                                                                >





                                                                    {

                                                                        //? Add New Pair Question
                                                                        
                                                                        addNewQuestion && source === 'Editorial' && this.addNewQuestion()
                                                                    }

                                                                    {
                                                                        // ? Show New Questions List
                                                                        add.qnaList.length > 0  && source === 'Editorial'  && this.renderQuestionstoSave(add)
                                                                    }


                                                                </KBTable>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </QnAContextProvider>

                                        </div>
                                    </div>
                            }

                        </div>

                    </Fragment>
                )
            }



            // --------------------------------------
            // Render Component
            // --------------------------------------
            render() {

                return this.renderKBHome()
            }
    }
// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 



// --------------------------------------
// Export Component
// --------------------------------------
export default KBHome;