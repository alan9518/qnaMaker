/* ==========================================================================
** Pagination Component
** 28/02/2019
** Alan Medina Silva
** ========================================================================== */
    import React from 'react';
    import {PaginationButton} from '../../components';
    import PropTypes from 'prop-types';
    import './styles.css'


// --------------------------------------
// Create Layuot Component
// --------------------------------------
const ListPagination = (props) => {
    const {currentPage, numberOfPages,  nextPage, previousPage, firstPage, lastPage } = props;
    // if (projectsCount <= itemsPerPage) {
    //     return null;
    // }


    // --------------------------------------
    // Render Component
    // --------------------------------------


    return (
        <nav>
            <ul className="bot-pagination">
                
                <li className = "bot-page-item" onClick = {firstPage}> <PaginationButton  buttonClass = "page-link" name = "first"   buttonIcon = {'fa fa-angle-double-left'} /> </li>
                { currentPage > 1 && <li className = "bot-page-item" onClick = {previousPage} >  <PaginationButton  buttonClass = "page-link" name = "previous"  buttonIcon = {'fas fa-angle-left'} />  </li>}

                <li className = "bot-page-item">  Page {currentPage} of {numberOfPages}  </li>

                {   currentPage < numberOfPages && <li className = "bot-page-item" onClick = {nextPage}> <PaginationButton  buttonClass = "page-link" name = "next"   buttonIcon = {'fa fa-angle-right'} />  </li> }
                <li className = "bot-page-item" onClick = {lastPage}> <PaginationButton  buttonClass = "page-link" name = "last"   buttonIcon = {'fa fa-angle-double-right'} /> </li>
            </ul>
        </nav>
    )

};




// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
    ListPagination.propTypes = {
        currentPage : PropTypes.number,
        numberOfPages : PropTypes.number,
        nextPage : PropTypes.func,
        previousPage : PropTypes.func,
        firstPage : PropTypes.func,
        lastPage : PropTypes.func
    };


// --------------------------------------
// Export Component
// --------------------------------------
    export default ListPagination;