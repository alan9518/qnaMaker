/* ==========================================================================
** Endpoints Definition File
** 19/03/2019
** Alan Medina Silva
** ========================================================================== */


// --------------------------------------
// Define Constants
// --------------------------------------
    // const path = 'https://qnaapi.azurewebsites.net/knowledge-base'
    // const localPath = 'http://localhost:5000/knowledge-base';

    const path = process.env.REACT_APP_API_PATH || process.env.REACT_APP_API_LOCAL_PATH


// --------------------------------------
// Create Endpoints Object
// --------------------------------------

    export const Endpoints = {

    /* ==========================================================================
     *  WebService EndPoints
     ========================================================================== */

        /* ==========================================================================
         *  GET Methods
        ========================================================================== */
            // --------------------------------------
            // GET all Questios && Answers
            // --------------------------------------
                getBaseData : `${path}/items`,

            // --------------------------------------
            // GET all Questios && Answers
            // --------------------------------------
                getBaseDataBySource : `${path}/items/source`,


            // --------------------------------------
            // GET KB Sources
            // --------------------------------------
                getBaseDetails : `${path}/details`,


            // --------------------------------------
            // GET KB Sources
            // --------------------------------------
                getBaseSources : `${path}/sources`,


            // --------------------------------------
            // Update Knowledge Base
            // --------------------------------------
                updateKB : 'https://westus.api.cognitive.microsoft.com/qnamaker/v4.0/knowledgebases/4aca82bb-ba9c-46a4-99ae-b873c5db42ee',


            // --------------------------------------
            // Update Knowledge Base
            // --------------------------------------
                publishKB : `${path}/publish`


    }